import { ArrowDown, MonitorSmartphone, UserRound, Video } from 'lucide-react'

const MEETING_URL = 'https://meet.google.com/abc-123-def'

function Meetingroom() {
  return (
    <main className="relative mx-auto mt-[-18px] mb-[18px] flex min-h-[max(420px,calc(100svh-150px))] w-[min(88%,1160px)] flex-1 flex-col pb-[18px] text-ink max700:min-h-[max(440px,calc(100svh-150px))] max560:mt-[-12px] max560:min-h-0 max560:w-[92%] max560:pb-[42px]" aria-labelledby="meeting-room-title">
      <header className="flex min-h-[52px] items-center justify-center gap-3 max560:min-h-11">
        <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-blue text-white" aria-hidden="true">
          <Video size={24} fill="currentColor" />
        </span>
        <h1 id="meeting-room-title" className="m-0 font-display text-[clamp(30px,4vw,40px)] font-extrabold leading-[1.12] tracking-[-.06em] text-[#203247] max560:text-[clamp(26px,6vw,32px)]">Meeting <span className="text-blue">Information</span></h1>
      </header>

      <div className="my-4 mb-5 flex min-h-[76px] items-center justify-between gap-6 max560:mt-4 max560:mb-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-[48px] shrink-0 place-items-center rounded-full bg-blue text-white" aria-hidden="true">
            <UserRound size={24} fill="white" />
          </span>
          <span className="grid text-[14px] uppercase leading-[1.15] text-[#182940]">
            <span>Announced by</span>
            <strong className="text-[15px] font-bold">Abimbola James</strong>
            <small className="text-[13px] text-[#526782]">Supervisor</small>
          </span>
        </div>
        <span className="grid h-16 w-20 shrink-0 place-items-center text-blue" aria-hidden="true">
          <MonitorSmartphone size={56} strokeWidth={1.7} />
        </span>
      </div>

      <p className="m-0 flex min-h-[120px] items-start rounded-lg bg-field px-6 py-6 text-[15px] leading-[1.6] text-[#647187] max560:min-h-[110px] max560:px-5 max560:py-5 max560:text-[14px]">
        This is a quick update that, there would be a general meeting for all workers. Please make it a priority to attend, come prepared and be punctual.
      </p>

      <section className="mt-9 max560:mt-7" aria-labelledby="meeting-room-information-title">
        <h2 id="meeting-room-information-title" className="mt-0 mb-4 font-display text-[14px] font-extrabold uppercase leading-[1.2] tracking-[.01em] text-blue">Meeting Information</h2>
        <dl className="m-0 grid grid-cols-3 gap-6 max700:gap-4 max560:grid-cols-1 max560:gap-5">
          <div className="min-w-0">
            <dt className="mb-1 text-[13px] font-bold uppercase leading-[1.2] text-[#182a42] max560:text-[13px]">Date</dt>
            <dd className="m-0 text-[15px] leading-[1.4] text-[#5e6e84] max560:text-[15px]"><time dateTime="2026-11-25">Nov-25-2026</time></dd>
          </div>
          <div className="min-w-0">
            <dt className="mb-1 text-[13px] font-bold uppercase leading-[1.2] text-[#182a42] max560:text-[13px]">Time</dt>
            <dd className="m-0 text-[15px] leading-[1.4] text-[#5e6e84] max560:text-[15px]"><time dateTime="2026-11-25T10:00:00Z">10:00AM UTC</time></dd>
          </div>
          <div className="min-w-0">
            <dt className="mb-1 text-[13px] font-bold uppercase leading-[1.2] text-[#182a42] max560:text-[13px]">Join Link</dt>
            <dd className="m-0 break-words text-[15px] leading-[1.4] text-[#5e6e84] max560:text-[15px]">
              <a className="text-blue hover:underline" href={MEETING_URL} target="_blank" rel="noopener noreferrer" aria-label="Join Google Meet meeting, opens in a new tab">
                {MEETING_URL}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <a className="mt-auto inline-flex min-h-12 min-w-[132px] self-end items-center justify-center rounded-lg bg-blue px-6 text-[14px] font-bold text-white transition-[background,transform] duration-[160ms] hover:-translate-y-px hover:bg-blue-dark max560:mt-7 max560:min-h-12" href="#meeting-chat">Chat Room</a>

      <button className="absolute right-[-52px] bottom-[10px] grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-[#414448] transition-transform duration-[180ms] hover:translate-y-0.5 max700:right-[-7px] max560:right-[-3px] max560:bottom-2" type="button" aria-label="Scroll to the bottom of the meeting information" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={28} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </main>
  )
}

export default Meetingroom
