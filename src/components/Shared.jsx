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
      <nav className={styles.workerUploadSupervisorActions} aria-label="Project navigation">
        <a className={styles.workerUploadSupervisorAction} href="#portal5"><BadgePlus className={styles.supervisorActionIcon} size={20} aria-hidden="true" /><span>Assign New Project</span></a>
        <a className={styles.workerUploadSupervisorAction} href="#portal5"><FileText className={styles.supervisorActionIcon} size={18} fill="currentColor" aria-hidden="true" /><span>View All Projects</span></a>
        <a className={styles.workerUploadSupervisorAction} href="#portal6"><FileText className={styles.supervisorActionIcon} size={18} fill="currentColor" aria-hidden="true" /><span>View Pending Projects</span></a>
      </nav>
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
