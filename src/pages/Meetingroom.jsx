import { ArrowDown, MonitorSmartphone, UserRound, Video } from 'lucide-react'

const MEETING_URL = 'https://meet.google.com/abc-123-def'

function Meetingroom() {
  return (
    <main className="relative mx-auto mt-[-22px] mb-[18px] flex min-h-[max(360px,calc(100svh-126px))] w-[min(86%,1080px)] flex-1 flex-col pb-[18px] text-ink max700:min-h-[max(380px,calc(100svh-126px))] max560:mt-[-15px] max560:min-h-0 max560:w-[90%] max560:pb-[42px]" aria-labelledby="meeting-room-title">
      <header className="flex min-h-[37px] items-center justify-center gap-[10px] max560:min-h-9">
        <span className="grid size-[29px] shrink-0 place-items-center rounded-full bg-blue text-white" aria-hidden="true">
          <Video size={17} fill="currentColor" />
        </span>
        <h1 id="meeting-room-title" className="m-0 font-display text-[clamp(22px,4vw,28px)] font-extrabold leading-[1.12] tracking-[-.065em] text-[#203247] max560:text-[clamp(21px,6vw,26px)]">Meeting <span className="text-blue">Information</span></h1>
      </header>

      <div className="my-[9px] mb-[13px] flex min-h-[55px] items-center justify-between gap-[18px] max560:mt-[13px] max560:mb-[14px]">
        <div className="flex min-w-0 items-center gap-[9px]">
          <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-blue text-white" aria-hidden="true">
            <UserRound size={17} fill="white" />
          </span>
          <span className="grid text-[9px] uppercase leading-[1.08] text-[#182940]">
            <span>Announced by</span>
            <strong className="text-[9px] font-bold">Abimbola James</strong>
            <small className="text-[8px] text-[#526782]">Supervisor</small>
          </span>
        </div>
        <span className="grid h-12 w-16 shrink-0 place-items-center text-blue" aria-hidden="true">
          <MonitorSmartphone size={42} strokeWidth={1.7} />
        </span>
      </div>

      <p className="m-0 flex min-h-[98px] items-start rounded-[4px] bg-field px-[17px] py-[19px] text-[11px] leading-[1.55] text-[#647187] max560:min-h-[90px] max560:px-[13px] max560:py-4 max560:text-[10px]">
        This is a quick update that, there would be a general meeting for all workers. Please make it a priority to attend, come prepared and be punctual.
      </p>

      <section className="mt-7 max560:mt-[23px]" aria-labelledby="meeting-room-information-title">
        <h2 id="meeting-room-information-title" className="mt-0 mb-[11px] font-display text-[10px] font-extrabold uppercase leading-[1.2] text-blue">Meeting Information</h2>
        <dl className="m-0 grid grid-cols-3 gap-[18px] max700:gap-3 max560:grid-cols-1 max560:gap-[13px]">
          <div className="min-w-0">
            <dt className="mb-[3px] text-[8px] font-bold uppercase leading-[1.2] text-[#182a42] max560:text-[9px]">Date</dt>
            <dd className="m-0 text-[10px] leading-[1.4] text-[#5e6e84] max560:text-[11px]"><time dateTime="2026-11-25">Nov-25-2026</time></dd>
          </div>
          <div className="min-w-0">
            <dt className="mb-[3px] text-[8px] font-bold uppercase leading-[1.2] text-[#182a42] max560:text-[9px]">Time</dt>
            <dd className="m-0 text-[10px] leading-[1.4] text-[#5e6e84] max560:text-[11px]"><time dateTime="2026-11-25T10:00:00Z">10:00AM UTC</time></dd>
          </div>
          <div className="min-w-0">
            <dt className="mb-[3px] text-[8px] font-bold uppercase leading-[1.2] text-[#182a42] max560:text-[9px]">Join Link</dt>
            <dd className="m-0 break-words text-[10px] leading-[1.4] text-[#5e6e84] max560:text-[11px]">
              <a className="text-blue hover:underline" href={MEETING_URL} target="_blank" rel="noopener noreferrer" aria-label="Join Google Meet meeting, opens in a new tab">
                {MEETING_URL}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <a className="mt-auto inline-flex min-h-9 min-w-[99px] self-end items-center justify-center rounded-[4px] bg-blue px-[15px] text-[10px] font-bold text-white transition-[background,transform] duration-[160ms] hover:-translate-y-px hover:bg-blue-dark max560:mt-7 max560:min-h-10" href="#meeting-chat">Chat Room</a>

      <button className="absolute right-[-25px] bottom-[18px] grid size-6 cursor-pointer place-items-center border-0 bg-transparent p-0 text-[#414448] transition-transform duration-[180ms] hover:translate-y-0.5 max700:right-[-7px] max560:right-[-3px] max560:bottom-2" type="button" aria-label="Scroll to the bottom of the meeting information" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={19} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </main>
  )
}

export default Meetingroom
