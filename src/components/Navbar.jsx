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
    <header className="site-header">
      <a className="brand" href="#signin" aria-label="JM home">
        <span className="brand-mark" aria-hidden="true"><span>✦</span></span>
        <span className="brand-name">JM</span>
      </a>

      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={19} /> : <Menu size={19} />}
      </button>

      <nav id="primary-navigation" className={`primary-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`${link.signIn ? 'nav-sign-in' : ''} ${currentPath === link.href ? 'is-current' : ''}`.trim()}
            aria-current={currentPath === link.href ? 'page' : undefined}
          >
            {link.label}
          </a>
        ))}
        <div className="ai-tools-wrap">
          <button className="ai-tools-button" type="button" aria-expanded={toolsOpen} onClick={() => setToolsOpen((open) => !open)}>
            <Box size={13} strokeWidth={2.4} aria-hidden="true" />
            <span>AI Tools</span>
          </button>
          {toolsOpen && (
            <div className="ai-tools-popover" role="status">
              <Sparkles size={15} aria-hidden="true" />
              <span>AI tools are ready for your workspace.</span>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
