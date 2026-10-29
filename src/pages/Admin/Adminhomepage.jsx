import { ArrowDown, ChevronRight, Info } from 'lucide-react'
import portalIllustration from '../../assets/signin-portal-illustration.svg'

const adminLinks = [
  { label: 'Create Workers Account', href: '#create-account' },
  { label: 'Workers Project Portal', href: '#workers-project-portal' },
  { label: 'Meeting Room', href: '#meeting-room' },
  { label: 'Chat Room', href: '#meeting-chat' },
  { label: 'Payment Status', href: '#payment-status' },
]

function Adminhomepage() {
  return (
    <section
      className="admin-home-reveal relative mx-auto flex w-[min(92%,1340px)] flex-1 flex-col justify-center px-2 py-4 max700:py-6 max480:py-4"
      aria-label="Administrator portal home"
    >
      <div className="grid w-full grid-cols-[minmax(340px,480px)_minmax(360px,1fr)] items-center justify-between gap-[clamp(24px,5vw,84px)] max900:grid-cols-[minmax(300px,420px)_minmax(300px,1fr)] max700:grid-cols-1 max700:gap-8">
        {/* Left Column: Navigation Actions - Indented to align with the 'M' in the JM logo */}
        <div className="flex flex-col justify-center pl-[clamp(24px,4vw,54px)] max700:pl-0">
          <nav className="grid w-full max-w-[400px] gap-3.5 max700:max-w-none" aria-label="Admin portal destinations">
            {adminLinks.map(({ label, href }) => (
              <a
                className="group flex min-h-[52px] items-center justify-between gap-4 rounded-xl bg-blue px-6 text-[15px] font-semibold text-white shadow-[0_4px_14px_rgb(18_96_245_/_18%)] transition-[background,transform,box-shadow] duration-[160ms] hover:-translate-y-px hover:bg-blue-dark hover:shadow-[0_6px_20px_rgb(18_96_245_/_26%)] focus-visible:outline-2 focus-visible:outline-blue/45 focus-visible:outline-offset-2 max700:min-h-[48px] max700:px-5 max700:text-[14px] max480:min-h-[46px]"
                href={href}
                key={label}
              >
                <span>{label}</span>
                <ChevronRight
                  className="shrink-0 transition-transform duration-[160ms] group-hover:translate-x-1"
                  size={20}
                  strokeWidth={2.4}
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          <a
            id="existing-workers-account"
            className="mt-8 inline-flex items-center gap-2.5 text-[14px] text-[#203247] transition-colors duration-[160ms] hover:text-blue max700:mt-6"
            href="#choose-workers"
          >
            <Info
              className="shrink-0 text-blue"
              size={19}
              fill="#1260f5"
              stroke="white"
              strokeWidth={2.4}
              aria-hidden="true"
            />
            <span>
              View existing <strong className="font-semibold text-blue hover:underline">workers account</strong>
            </span>
          </a>
        </div>

        {/* Right Column: Hero Illustration */}
        <div className="admin-home-reveal-delay flex min-w-0 items-center justify-center max700:hidden">
          <img
            className="block h-auto max-h-[min(540px,65vh)] w-full max-w-[620px] object-contain drop-shadow-[0_12px_32px_rgba(18,96,245,0.06)] max900:max-h-[420px] max700:max-h-[300px] max480:max-h-[220px]"
            src={portalIllustration}
            alt="Administrator Portal Illustration"
          />
        </div>
      </div>

      {/* Bottom Right Scroll Indicator / Action */}
      <button
        className="absolute right-0 bottom-2 grid size-10 cursor-pointer place-items-center rounded-full text-[#3c4043] transition-transform duration-[180ms] hover:translate-y-1 focus-visible:outline-2 focus-visible:outline-blue max700:right-0 max700:bottom-0"
        type="button"
        aria-label="Scroll to bottom"
        title="Scroll down"
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
      >
        <ArrowDown className="size-7" size={28} strokeWidth={3} aria-hidden="true" />
      </button>
    </section>
  )
}

export default Adminhomepage
