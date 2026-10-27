import { useState } from 'react'
import { ArrowDown, BadgePlus, Bell, CloudUpload, FileText, Info, UserRound } from 'lucide-react'
import { portalStyles as s } from '../../components/portalStyles.js'
import { readProjectUploads } from '../../utils/projectUploads.js'

const initialProjects = [
  { id: 'focus-level-learner-3', name: 'Focus Level Learner 3', learners: 3, date: '05-02-2026', status: 'pending' },
  { id: 'jamal-autism', name: 'Jamal Autism', learners: 5, date: '06-04-2026', status: 'pending' },
  { id: 'jamal-disability', name: 'Jamal Disability', learners: 4, date: '06-05-2026', status: 'pending' },
]

function Portal6() {
  const [initialUploadState] = useState(() => {
    try {
      return { uploads: readProjectUploads(), error: '' }
    } catch (error) {
      return { uploads: [], error: error instanceof Error ? error.message : 'Saved project submissions could not be loaded.' }
    }
  })
  const [projects] = useState(initialProjects)
  const [projectUploads] = useState(initialUploadState.uploads)
  const [uploadStorageError] = useState(initialUploadState.error)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const submittedProjectNames = new Set(projectUploads.map((upload) => upload.name.trim().toLowerCase()))
  const projectsWithStatus = projects.map((project) => ({
    ...project,
    status: submittedProjectNames.has(project.name.trim().toLowerCase()) ? 'complete' : 'pending',
  }))
  const pendingCount = projectsWithStatus.filter((project) => project.status === 'pending').length
  const visibleProjects = projectsWithStatus.filter((project) => project.status === 'pending')
  return (
    <section className={s.projectPortalPage} aria-labelledby="portal6-title">
      <header className={s.projectPortalHeading}>
        <h1 id="portal6-title" className={s.title}>Hello, <span className={s.titleAccent}>Godsent!</span></h1>
        <div className={s.projectPortalNotificationWrap}>
          <button className={s.notification} type="button" aria-label={notificationsOpen ? 'Hide notifications' : 'Show notifications, one unread'} aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}><Bell size={20} fill="currentColor" aria-hidden="true" /><span className={s.notificationCount}>1</span></button>
          {notificationsOpen && <div className={s.notificationPopover} role="status">You have one new supervisor update.</div>}
        </div>
      </header>
      <div className={s.projectPortalGrid}>
        <div className={s.primary}>
          <div className={s.statGrid} aria-label="Project totals">
            {[
              { key: 'all', label: 'Total Assigned projects', value: projects.length },
              { key: 'pending', label: 'Total Pending projects', value: pendingCount },
            ].map((item) => (
              <button className={`${s.statCard} cursor-pointer text-left transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_10px_20px_rgb(18_96_245_/_14%)] ${item.key === 'pending' ? 'ring-2 ring-[#ff322c]' : ''}`} key={item.key} type="button" aria-pressed={item.key === 'pending'} onClick={() => {
                if (item.key === 'all') window.location.hash = '#portal5'
              }}>
                <FileText className={s.statIcon} size={22} fill="white" aria-hidden="true" />
                <span className={s.statLabel}>{item.label}</span>
                <strong className={s.statValue}>{item.value}</strong>
              </button>
            ))}
          </div>
          <section className={s.projectSection} aria-labelledby="portal6-projects-title">
            <h2 id="portal6-projects-title" className={s.sectionTitle}>Projects Pending</h2>
            <div className={s.tableWrap} role="region" aria-label="Pending projects" tabIndex="0">
              <table className={s.table}><colgroup><col className="w-[40%]" /><col className="w-[22%]" /><col className="w-[20%]" /><col className="w-[18%]" /></colgroup>
                <thead><tr><th className={s.tableHead} scope="col">Project Name</th><th className={s.tableHead} scope="col">Learners</th><th className={s.tableHead} scope="col">Date</th><th className={s.tableHead} scope="col">Status</th></tr></thead>
                <tbody>{visibleProjects.length ? visibleProjects.map((project) => <tr key={project.id}>
                  <td className={`${s.tableCell} ${s.projectName}`} title={project.name}>{project.name}</td><td className={s.tableCell}>{project.learners} Learners</td><td className={s.tableCell}>{project.date}</td>
                  <td className={s.tableCell}><span className={`${s.portal6Status} ${project.status === 'pending' ? 'bg-portal-status' : 'bg-blue'}`}>{project.status === 'pending' ? 'Pending' : 'Complete'}</span></td>
                </tr>) : <tr><td className={`${s.tableCell} !text-center !text-[#74839a]`} colSpan="4">No pending projects right now.</td></tr>}</tbody>
              </table>
            </div>
          </section>
          <div className={s.projectPortalUploadBox}>
            <CloudUpload className={s.uploadIcon} size={36} strokeWidth={1.8} aria-hidden="true" /><div className={s.uploadCopy}><strong className={s.uploadTitle}>Upload Completed Project</strong><span className={s.uploadHelp}>Add project details and choose a document (Max 100MB)</span></div>
            <button className={s.chooseFile} type="button" onClick={() => { window.location.hash = '#ucp?returnTo=portal6' }}>Choose File</button>
          </div>
          {uploadStorageError && <p className={`${s.notice} ${s.errorNotice}`} role="alert">{uploadStorageError}</p>}
          <a className={s.contact} href="mailto:supervisor@godsent.com?subject=Pending%20projects%20support"><Info className={s.contactIcon} size={18} fill="currentColor" stroke="white" aria-hidden="true" /><span>Click here to <strong className={s.contactLink}>contact your supervisor</strong></span></a>
        </div>
        <aside className={s.projectPortalSupervisor} aria-labelledby="portal6-supervisor-title">
          <h2 id="portal6-supervisor-title" className={s.supervisorTitle}>Supervisor Panel</h2>
          <div className={s.supervisorProfile}><span className={s.supervisorAvatar}><UserRound size={22} fill="white" aria-hidden="true" /></span><span><strong className={s.supervisorName}>Abimbola</strong><small className={s.supervisorRole}>Supervisor</small></span></div>
          <div className={s.supervisorActions} role="group" aria-label="Supervisor actions, display only">
            <div className={s.workerStaticSupervisorAction}><BadgePlus className={s.supervisorActionIcon} size={20} aria-hidden="true" /><span>Assign New Project</span></div>
            <div className={s.workerStaticSupervisorAction}><FileText className={s.supervisorActionIcon} size={18} fill="currentColor" aria-hidden="true" /><span>View All Projects</span></div>
            <div className={s.workerStaticSupervisorAction}><FileText className={s.supervisorActionIcon} size={18} fill="currentColor" aria-hidden="true" /><span>View Pending Projects</span></div>
          </div>
          <section aria-labelledby="portal6-note-title"><h3 id="portal6-note-title" className={s.noteTitle}>Supervisor Note</h3><div className={`${s.note} max620:min-h-[60px]`} aria-label="Supervisor note, currently blank" /></section>
        </aside>
      </div>
      <button className={s.scrollCue} type="button" aria-label="Scroll to the bottom of the portal" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}><ArrowDown size={28} fill="currentColor" strokeWidth={2.5} aria-hidden="true" /></button>
    </section>
  )
}

export default Portal6
