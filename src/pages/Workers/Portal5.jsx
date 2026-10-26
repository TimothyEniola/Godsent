import { useRef, useState } from 'react'
import { ArrowDown, BadgePlus, Bell, Check, Clock3, CloudUpload, FileText, Info, UserRound } from 'lucide-react'
import { portalStyles as s } from '../../components/portalStyles.js'
import { readProjectUploads } from '../../utils/projectUploads.js'

const initialProjects = [
  { id: 'focus-level-learner-3', name: 'Focus Level Learner 3', learners: 3, date: '05-02-2026', amount: '+86,000', status: 'pending' },
  { id: 'jamal-autism', name: 'Jamal Autism', learners: 5, date: '06-04-2026', amount: '+105,000', status: 'pending' },
  { id: 'jamal-disability', name: 'Jamal Disability', learners: 4, date: '06-05-2026', amount: '+84,000', status: 'pending' },
]
const formatDate = (date) => new Intl.DateTimeFormat('en-GB').format(date).replace(/\//g, '-')
const csvCell = (value) => {
  const text = String(value)
  const safeText = /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text
  return `"${safeText.replace(/"/g, '""')}"`
}

function Portal5() {
  const projectNameRef = useRef(null)
  const [initialUploadState] = useState(() => {
    try {
      return { uploads: readProjectUploads(), error: '' }
    } catch (error) {
      return { uploads: [], error: error instanceof Error ? error.message : 'Saved project submissions could not be loaded.' }
    }
  })
  const [projects, setProjects] = useState(initialProjects)
  const [projectUploads] = useState(initialUploadState.uploads)
  const [uploadStorageError] = useState(initialUploadState.error)
  const [newProjectName, setNewProjectName] = useState('')
  const [assignFormOpen, setAssignFormOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState('all')
  const [notice, setNotice] = useState(null)
  const submittedProjectNames = new Set(projectUploads.map((upload) => upload.name.trim().toLowerCase()))
  const projectsWithStatus = projects.map((project) => ({
    ...project,
    status: submittedProjectNames.has(project.name.trim().toLowerCase()) ? 'complete' : 'pending',
  }))
  const pendingCount = projectsWithStatus.filter((project) => project.status === 'pending').length
  const visibleProjects = projectFilter === 'pending' ? projectsWithStatus.filter((project) => project.status === 'pending') : projectsWithStatus
  function handleAddProject(event) {
    event.preventDefault()
    const name = newProjectName.trim()
    if (!name) return
    setProjects((current) => [{ id: `project-${Date.now()}`, name, learners: 1, date: formatDate(new Date()), amount: '—', status: 'pending' }, ...current])
    setProjectFilter('all'); setNewProjectName(''); setAssignFormOpen(false); setNotice({ type: 'success', message: `${name} was added to assigned projects.` })
  }
  function openAssignForm() { setAssignFormOpen(true); window.setTimeout(() => projectNameRef.current?.focus(), 0) }
  function handleDownload(project) {
    try {
      const csv = [['Project Name', 'Learners', 'Date', 'Amount', 'Status'], [project.name, `${project.learners} Learners`, project.date, project.amount, project.status]].map((row) => row.map(csvCell).join(',')).join('\r\n')
      const fileUrl = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }))
      const link = document.createElement('a')
      const safeName = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project'
      link.href = fileUrl; link.download = `${safeName}-summary.csv`; link.hidden = true; document.body.appendChild(link); link.click(); link.remove()
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000); setNotice({ type: 'success', message: `Downloaded the local summary for ${project.name}.` })
    } catch { setNotice({ type: 'error', message: 'The project summary could not be downloaded.' }) }
  }
  function setFilter(filter, message) { setProjectFilter(filter); setNotice({ type: 'success', message }) }

  return (
    <section className={s.page} aria-labelledby="portal5-title">
      <header className={s.heading}>
        <h1 id="portal5-title" className={s.title}>Hello, <span className={s.titleAccent}>Godsent!</span></h1>
        <div className={s.notificationWrap}>
          <button className={s.notification} type="button" aria-label={notificationsOpen ? 'Hide notifications' : 'Show notifications, one unread'} aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}><Bell size={20} fill="currentColor" aria-hidden="true" /><span className={s.notificationCount}>1</span></button>
          {notificationsOpen && <div className={s.notificationPopover} role="status">You have one new supervisor update.</div>}
        </div>
      </header>
      <div className={s.mainGrid}>
        <div className={s.primary}>
          <div className={s.statGrid} aria-label="Project totals">
            {[
              { key: 'all', label: 'Total Assigned projects', value: projects.length },
              { key: 'pending', label: 'Total Pending projects', value: pendingCount },
            ].map((item) => (
              <button className={`${s.statCard} ${projectFilter === item.key ? 'ring-2 ring-[#ff322c]' : ''}`} key={item.key} type="button" aria-pressed={projectFilter === item.key} onClick={() => setFilter(item.key, item.key === 'pending' ? 'Showing pending projects.' : 'Showing all assigned projects.') }>
                <FileText className={s.statIcon} size={22} fill="white" aria-hidden="true" />
                <span className={s.statLabel}>{item.label}</span>
                <strong className={s.statValue}>{item.value}</strong>
              </button>
            ))}
          </div>
          <section className={s.projectSection} aria-labelledby="portal5-projects-title">
            <h2 id="portal5-projects-title" className={s.sectionTitle}>{projectFilter === 'pending' ? 'Projects Pending' : 'Projects Assigned'}</h2>
            <div className={s.tableWrap} role="region" aria-label="Assigned projects" tabIndex="0">
              <table className={s.table}><colgroup><col className="w-[30%]" /><col className="w-[15%]" /><col className="w-[14%]" /><col className="w-[17%]" /><col className="w-[12%]" /><col className="w-[12%]" /></colgroup>
                <thead><tr><th className={s.tableHead} scope="col">Project Name</th><th className={s.tableHead} scope="col">Learners</th><th className={s.tableHead} scope="col">Date</th><th className={s.tableHead} scope="col"><span className="sr-only">Download summary</span></th><th className={s.tableHead} scope="col">Status</th><th className={`${s.tableHead} text-right`} scope="col">Amount</th></tr></thead>
                <tbody>{visibleProjects.length ? visibleProjects.map((project) => <tr key={project.id}>
                  <td className={`${s.tableCell} ${s.projectName}`} title={project.name}>{project.name}</td><td className={s.tableCell}>{project.learners} Learners</td><td className={s.tableCell}>{project.date}</td>
                  <td className={s.tableCell}><button className={s.downloadButton} type="button" onClick={() => handleDownload(project)} aria-label={`Download project summary for ${project.name}`}>Download</button></td><td className={s.tableCell}><span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${project.status === 'complete' ? 'bg-[#e7f8f0] text-[#16825b]' : 'bg-[#fff6df] text-[#927000]'}`}>{project.status === 'complete' ? 'Submitted' : 'Pending'}</span></td><td className={`${s.tableCell} text-right`}>{project.amount}</td>
                </tr>) : <tr><td className={`${s.tableCell} !text-center !text-[#74839a]`} colSpan="6">No pending projects right now.</td></tr>}</tbody>
              </table>
            </div>
          </section>
          {assignFormOpen && <form className={s.assignForm} onSubmit={handleAddProject}>
            <label className={s.assignLabel} htmlFor="portal5-project-name">New project name</label>
            <input className={s.assignInput} id="portal5-project-name" ref={projectNameRef} value={newProjectName} onChange={(event) => setNewProjectName(event.target.value)} placeholder="Enter project name" maxLength={80} required />
            <button className={s.assignButton} type="submit">Add Project</button>
            <button className={s.cancelButton} type="button" onClick={() => { setAssignFormOpen(false); setNewProjectName('') }}>Cancel</button>
          </form>}
          <div className={s.uploadBox}><CloudUpload className={s.uploadIcon} size={36} strokeWidth={1.8} aria-hidden="true" /><div className={s.uploadCopy}><strong className={s.uploadTitle}>Upload Completed Project</strong><span className={s.uploadHelp}>Add project details and choose a document (Max 100MB)</span></div>
            <button className={s.chooseFile} type="button" onClick={() => { window.location.hash = '#ucp?returnTo=portal5' }}>Choose File</button>
          </div>
          {uploadStorageError && <p className={`${s.notice} ${s.errorNotice}`} role="alert">{uploadStorageError}</p>}
          {notice && <p className={`${s.notice} ${notice.type === 'error' ? s.errorNotice : ''}`} role={notice.type === 'error' ? 'alert' : 'status'}>{notice.type === 'error' ? null : <Check className="shrink-0" size={18} aria-hidden="true" />}{notice.message}</p>}
          <a className={s.contact} href="mailto:supervisor@godsent.com?subject=Assigned%20projects%20support"><Info className={s.contactIcon} size={18} fill="currentColor" stroke="white" aria-hidden="true" /><span>Click here to <strong className={s.contactLink}>contact your supervisor</strong></span></a>
        </div>
        <aside className={s.supervisor} aria-labelledby="portal5-supervisor-title">
          <h2 id="portal5-supervisor-title" className={s.supervisorTitle}>Supervisor Panel</h2>
          <div className={s.supervisorProfile}><span className={s.supervisorAvatar}><UserRound size={22} fill="white" aria-hidden="true" /></span><span><strong className={s.supervisorName}>Abimbola</strong><small className={s.supervisorRole}>Supervisor</small></span></div>
          <nav className={s.supervisorActions} aria-label="Supervisor project actions">
            <button className={s.supervisorAction} type="button" aria-expanded={assignFormOpen} onClick={openAssignForm}><BadgePlus className={s.supervisorActionIcon} size={20} aria-hidden="true" /><span>Assign New Project</span></button>
            <button className={s.supervisorAction} type="button" aria-pressed={projectFilter === 'all'} onClick={() => setFilter('all', 'Showing all assigned projects.')}><FileText className={s.supervisorActionIcon} size={18} fill="currentColor" aria-hidden="true" /><span>View All Projects</span></button>
            <button className={s.supervisorAction} type="button" aria-pressed={projectFilter === 'pending'} onClick={() => setFilter('pending', 'Showing pending projects.')}><Clock3 className={s.supervisorActionIcon} size={18} aria-hidden="true" /><span>View Pending Projects</span></button>
          </nav>
          <section aria-labelledby="portal5-note-title"><h3 id="portal5-note-title" className={s.noteTitle}>Supervisor Note</h3><div className={`${s.note} max620:min-h-[60px]`} aria-label="Supervisor note, currently blank" /></section>
        </aside>
      </div>
      <button className={s.scrollCue} type="button" aria-label="Scroll to the bottom of the portal" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}><ArrowDown size={28} fill="currentColor" strokeWidth={2.5} aria-hidden="true" /></button>
    </section>
  )
}

export default Portal5
