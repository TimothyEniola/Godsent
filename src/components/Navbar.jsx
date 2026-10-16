import { useState } from 'react'
import { Box, Menu, Sparkles, X } from 'lucide-react'

const navLinks = [
  { label: 'Profile', href: '#profile' },
  { label: 'Project Portal', href: '#project-portal' },
  { label: 'Meeting/Chat Room', href: '#meeting-room' },
  { label: 'Payment Status', href: '#payment-status' },
  { label: 'Sign In', href: '#signin', signIn: true },
]

function AiToolsMenu({ open, onToggle, pageTitle }) {
  return (
    <div className={`relative ${pageTitle ? 'justify-self-end' : 'max600:px-2 max600:py-[5px]'}`}>
      <button
        className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-blue px-[18px] text-[14px] font-bold text-white shadow-[0_2px_8px_rgb(18_96_245_/_18%)] transition-[background,transform] duration-[180ms] hover:-translate-y-px hover:bg-blue-dark max600:min-h-[44px] max600:w-full"
        type="button"
        aria-expanded={open}
        aria-controls="ai-tools-popover"
        onClick={onToggle}
      >
        <Box size={17} strokeWidth={2.4} aria-hidden="true" />
        <span>AI Tools</span>
      </button>
      {open && (
        <div id="ai-tools-popover" className="absolute top-[calc(100%+10px)] right-0 z-10 flex w-[280px] items-center gap-3 whitespace-normal rounded-lg border border-line bg-white p-4 text-[14px] leading-[1.5] text-[#44536a] shadow-[0_12px_32px_rgb(34_49_75_/_14%)] max600:top-[calc(100%+4px)] max600:right-2" role="status">
          <Sparkles className="shrink-0 text-blue" size={19} aria-hidden="true" />
          <span>AI tools are ready for your workspace.</span>
        </div>
      )}
    </div>
  )
}

function Navbar({ currentPath = '#signin', pageTitle }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)

  return (
    <header className={`relative z-[5] mx-auto flex min-h-[120px] w-[min(90%,1280px)] items-center justify-between gap-6 min1100:min-h-[124px] max700:min-h-[112px] max700:w-[89%] max600:min-h-[76px] ${pageTitle ? 'min-h-[120px] w-[min(92%,1280px)] max600:min-h-[112px] max600:w-[92%] max380:min-h-[92px]' : ''}`}>
      <a className="inline-flex shrink-0 items-center gap-2" href="#signin" aria-label="JM home">
        <span className="grid size-[32px] place-items-center rounded-full bg-blue text-[19px] leading-none text-white max600:size-[32px]" aria-hidden="true"><span className="-rotate-12">✦</span></span>
        <span className="font-display text-[22px] font-extrabold leading-none tracking-[-.05em] text-[#25364a]">JM</span>
      </a>

      {pageTitle ? (
        <>
          <h1 id="worker-upload-title" className="absolute left-1/2 m-0 -translate-x-1/2 whitespace-nowrap font-display text-[30px] font-extrabold leading-[1.12] tracking-[-.05em] text-[#203247] max600:text-[20px] max460:text-[16px] max380:text-[13px]">
            {pageTitle.split(' ').map((word, index) => (
              <span className={index === 2 ? 'text-blue' : undefined} key={`${word}-${index}`}>{index ? ' ' : ''}{word}</span>
            ))}
          </h1>
          <AiToolsMenu open={toolsOpen} onToggle={() => setToolsOpen((open) => !open)} pageTitle={pageTitle} />
        </>
      ) : (
        <>
          <button
            className="hidden size-[44px] place-items-center rounded-lg border border-line bg-white text-ink max600:ml-auto max600:grid max600:h-11 max600:w-11"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav
            id="primary-navigation"
            className={`flex items-center justify-end gap-[clamp(20px,2.8vw,40px)] whitespace-nowrap text-[14px] font-bold text-muted max700:gap-[clamp(14px,2vw,22px)] max700:text-[13px] max600:absolute max600:top-[64px] max600:right-0 max600:left-0 max600:items-stretch max600:gap-0 max600:rounded-xl max600:border max600:border-line max600:bg-white max600:p-3 max600:text-[14px] max600:shadow-[0_14px_34px_rgb(34_49_75_/_14%)] ${menuOpen ? 'max600:flex max600:flex-col' : 'max600:hidden'}`}
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors duration-[180ms] hover:text-blue max600:p-[12px] ${link.signIn ? 'text-[#1f2d40]' : ''} ${currentPath === link.href ? 'text-blue' : ''}`.trim()}
                aria-current={currentPath === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
            <AiToolsMenu open={toolsOpen} onToggle={() => setToolsOpen((open) => !open)} />
          </nav>
        </>
      )}
    </header>
  )
}

export default Navbar
