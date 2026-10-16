import { useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { WorkerSupervisorPanel } from '../../components/Shared.jsx'
import { portalStyles as styles } from '../../components/portalStyles.js'

function WorkersComplaintNote() {
  const [complaint, setComplaint] = useState('')

  return (
    <section className={styles.workerComplaintPage} aria-label="Workers complaint portal">
      <div className={styles.workerComplaintLayout}>
        <WorkerSupervisorPanel noteTitle="Respond" />

        <div className="min-w-0" aria-labelledby="workers-complaint-title">
          <h2 id="workers-complaint-title" className={styles.workerComplaintHeading}>Workers Complaint Note</h2>
          <textarea
            className={styles.workerComplaintField}
            aria-label="Workers complaint note"
            value={complaint}
            onChange={(event) => setComplaint(event.target.value)}
            maxLength={2000}
          />
        </div>
      </div>

      <button className={styles.workerUploadScrollCue} type="button" aria-label="Scroll to the bottom of the page" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={28} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}

export default WorkersComplaintNote
