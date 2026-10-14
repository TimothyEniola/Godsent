import { ArrowDown, MonitorSmartphone, UserRound, Video } from 'lucide-react'

const MEETING_URL = 'https://meet.google.com/abc-123-def'

function Meetingroom() {
  return (
    <main className="meeting-room-page" aria-labelledby="meeting-room-title">
      <header className="meeting-room-title-row">
        <span className="meeting-room-video-icon" aria-hidden="true">
          <Video size={17} fill="currentColor" />
        </span>
        <h1 id="meeting-room-title">Meeting <span>Information</span></h1>
      </header>

      <div className="meeting-room-announcer-row">
        <div className="meeting-room-announcer">
          <span className="meeting-room-announcer-avatar" aria-hidden="true">
            <UserRound size={17} fill="white" />
          </span>
          <span className="meeting-room-announcer-copy">
            <span>Announced by</span>
            <strong>Abimbola James</strong>
            <small>Supervisor</small>
          </span>
        </div>
        <span className="meeting-room-device-art" aria-hidden="true">
          <MonitorSmartphone size={42} strokeWidth={1.7} />
        </span>
      </div>

      <p className="meeting-room-description">
        This is a quick update that, there would be a general meeting for all workers. Please make it a priority to attend, come prepared and be punctual.
      </p>

      <section className="meeting-room-information" aria-labelledby="meeting-room-information-title">
        <h2 id="meeting-room-information-title">Meeting Information</h2>
        <dl className="meeting-room-details">
          <div>
            <dt>Date</dt>
            <dd><time dateTime="2026-11-25">Nov-25-2026</time></dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd><time dateTime="2026-11-25T10:00:00Z">10:00AM UTC</time></dd>
          </div>
          <div>
            <dt>Join Link</dt>
            <dd>
              <a href={MEETING_URL} target="_blank" rel="noopener noreferrer" aria-label="Join Google Meet meeting, opens in a new tab">
                {MEETING_URL}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <a className="meeting-room-chat-link" href="#meeting-chat">Chat Room</a>

      <button
        className="meeting-room-scroll-cue"
        type="button"
        aria-label="Scroll to the bottom of the meeting information"
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
      >
        <ArrowDown size={19} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </main>
  )
}

export default Meetingroom
