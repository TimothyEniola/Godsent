import { useState } from 'react'
import { Box, Menu, Sparkles, X } from 'lucide-react'

const navLinks = [
  { label: 'Profile', href: '#profile' },
  { label: 'Project Portal', href: '#project-portal' },
  { label: 'Meeting/Chat Room', href: '#meeting-room' },
  { label: 'Payment Status', href: '#payment-status' },
  { label: 'Sign In', href: '#signin', signIn: true },
]

function Navbar({ currentPath = '#signin' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)

  return (
    <header className="relative z-[5] mx-auto flex min-h-[98px] w-[min(89%,1270px)] items-center justify-between gap-6 min1100:min-h-[100px] max700:min-h-[96px] max700:w-[88%] max600:min-h-[61px]">
      <a className="inline-flex shrink-0 items-center gap-[5px]" href="#signin" aria-label="JM home">
        <span className="grid size-[21px] place-items-center rounded-full bg-blue text-[13px] leading-none text-white max600:size-[22px]" aria-hidden="true"><span className="-rotate-12">✦</span></span>
        <span className="font-display text-[15px] font-extrabold leading-none tracking-[-.055em] text-[#25364a]">JM</span>
      </a>

      <button
        className="hidden size-[34px] place-items-center rounded-[5px] border border-line bg-white text-ink max600:ml-auto max600:grid max600:h-8 max600:w-[34px]"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={19} /> : <Menu size={19} />}
      </button>

      <nav
        id="primary-navigation"
        className={`flex items-center justify-end gap-[clamp(15px,2.8vw,35px)] whitespace-nowrap text-[10px] font-bold text-muted max700:gap-[clamp(12px,2vw,18px)] max700:text-[9px] max600:absolute max600:top-[54px] max600:right-0 max600:left-0 max600:items-stretch max600:gap-0 max600:rounded-lg max600:border max600:border-line max600:bg-white max600:p-2 max600:shadow-[0_10px_24px_rgb(34_49_75_/_12%)] ${menuOpen ? 'max600:flex max600:flex-col' : 'max600:hidden'}`}
        aria-label="Main navigation"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`transition-colors duration-[180ms] hover:text-blue max600:p-[10px] ${link.signIn ? 'text-[#1f2d40]' : ''} ${currentPath === link.href ? 'text-blue' : ''}`.trim()}
            aria-current={currentPath === link.href ? 'page' : undefined}
          >
            {link.label}
          </a>
        ))}
        <div className="relative max600:px-2 max600:py-[5px]">
          <button
            className="inline-flex min-h-[29px] cursor-pointer items-center justify-center gap-[6px] rounded-[4px] border-0 bg-blue px-3 text-[10px] font-bold text-white shadow-[0_2px_5px_rgb(18_96_245_/_16%)] transition-[background,transform] duration-[180ms] hover:-translate-y-px hover:bg-blue-dark max600:min-h-[34px] max600:w-full"
            type="button"
            aria-expanded={toolsOpen}
            onClick={() => setToolsOpen((open) => !open)}
          >
            <Box size={13} strokeWidth={2.4} aria-hidden="true" />
            <span>AI Tools</span>
          </button>
          {toolsOpen && (
            <div className="absolute top-[calc(100%+8px)] right-0 z-10 flex w-[214px] items-center gap-2 whitespace-normal rounded-lg border border-line bg-white p-[11px] text-[11px] text-[#44536a] shadow-[0_8px_24px_rgb(34_49_75_/_12%)] max600:top-[calc(100%+4px)] max600:right-2" role="status">
              <Sparkles className="shrink-0 text-blue" size={15} aria-hidden="true" />
              <span>AI tools are ready for your workspace.</span>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
