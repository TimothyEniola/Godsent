import { useState } from 'react'
import { ArrowRight, BadgePlus, FileText, UserRound } from 'lucide-react'
import { portalStyles as styles } from './portalStyles.js'

function WorkerSupervisorPanel({ noteTitle = 'Supervisor Note' }) {
  const [noteOpen, setNoteOpen] = useState(false)

  return (
    <aside className={`${styles.supervisor} max620:min-h-0`} aria-labelledby="worker-upload-supervisor-title">
      <h2 id="worker-upload-supervisor-title" className={styles.workerUploadSupervisorTitle}>Supervisor Panel</h2>
      <div className={styles.workerUploadSupervisorProfile}>
        <span className={styles.supervisorAvatar}>
          <UserRound size={22} fill="white" aria-hidden="true" />
        </span>
        <span>
          <strong className={styles.supervisorName}>Abimbola</strong>
          <small className={styles.supervisorRole}>Supervisor</small>
        </span>
      </div>
      <div className={styles.workerUploadSupervisorActions} role="group" aria-label="Supervisor actions, display only">
        <div className={styles.workerUploadSupervisorStaticAction}><BadgePlus className={styles.supervisorActionIcon} size={20} aria-hidden="true" /><span>Assign New Project</span></div>
        <div className={styles.workerUploadSupervisorStaticAction}><FileText className={styles.supervisorActionIcon} size={18} fill="currentColor" aria-hidden="true" /><span>View All Projects</span></div>
        <div className={styles.workerUploadSupervisorStaticAction}><FileText className={styles.supervisorActionIcon} size={18} fill="currentColor" aria-hidden="true" /><span>View Pending Projects</span></div>
      </div>
      <section aria-labelledby="worker-upload-note-title">
        <h3 id="worker-upload-note-title" className={styles.noteTitle}>{noteTitle}</h3>
        <div className={`${styles.note} relative`} aria-label="Supervisor note">
          <p className="sr-only">No supervisor note is currently displayed.</p>
          <button
            className={styles.workerUploadNoteButton}
            type="button"
            aria-label={noteOpen ? 'Close supervisor note details' : 'Open supervisor note details'}
            aria-expanded={noteOpen}
            onClick={() => setNoteOpen((open) => !open)}
          >
            <ArrowRight size={14} aria-hidden="true" />
          </button>
          {noteOpen && <span className={styles.workerUploadNotePopover} role="status">No supervisor note has been posted yet.</span>}
        </div>
      </section>
    </aside>
  )
}

export { WorkerSupervisorPanel }
