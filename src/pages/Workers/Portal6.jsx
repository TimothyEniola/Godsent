import { useRef, useState } from 'react'
import { ArrowDown, BadgePlus, Bell, Check, CloudUpload, FileText, Info, UserRound } from 'lucide-react'
import { portalStyles as s } from '../../components/portalStyles.js'

const MAX_FILE_SIZE = 100 * 1024 * 1024
const ACCEPTED_EXTENSIONS = new Set(['pdf', 'docx', 'zip', 'jpg', 'jpeg', 'png'])
const initialProjects = [
  { id: 'focus-level-learner-3', name: 'Focus Level Learner 3', learners: 3, date: '05-02-2026', status: 'pending' },
  { id: 'jamal-autism', name: 'Jamal Autism', learners: 5, date: '06-04-2026', status: 'pending' },
  { id: 'jamal-disability', name: 'Jamal Disability', learners: 4, date: '06-05-2026', status: 'pending' },
]

function Portal6() {
  const fileInputRef = useRef(null)
  const projectNameRef = useRef(null)
  const [projects, setProjects] = useState(initialProjects)
  const [selectedFile, setSelectedFile] = useState(null)
  const [newProjectName, setNewProjectName] = useState('')
  const [assignFormOpen, setAssignFormOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState('pending')
  const [notice, setNotice] = useState(null)
  const pendingCount = projects.filter((project) => project.status === 'pending').length
  const visibleProjects = projectFilter === 'pending' ? projects.filter((project) => project.status === 'pending') : projects

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !ACCEPTED_EXTENSIONS.has(extension)) {
      setSelectedFile(null); event.target.value = ''; setNotice({ type: 'error', message: 'Choose a PDF, DOCX, ZIP, JPG, or PNG file.' }); return
    }
    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null); event.target.value = ''; setNotice({ type: 'error', message: 'Please choose a file smaller than 100 MB.' }); return
    }
    setSelectedFile(file); setNotice({ type: 'success', message: `${file.name} is ready to upload.` })
  }
  function handleUpload() {
    if (!selectedFile) { fileInputRef.current?.click(); return }
    setNotice({ type: 'success', message: `${selectedFile.name} was staged in this preview. Connect an upload service to submit it.` })
    setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''
  }
  function handleAddProject(event) {
    event.preventDefault()
    const name = newProjectName.trim()
    if (!name) return
    const date = new Intl.DateTimeFormat('en-GB').format(new Date()).replace(/\//g, '-')
    setProjects((current) => [{ id: `project-${Date.now()}`, name, learners: 1, date, status: 'pending' }, ...current])
    setProjectFilter('pending'); setNewProjectName(''); setAssignFormOpen(false); setNotice({ type: 'success', message: `${name} was added to pending projects.` })
  }
  function openAssignForm() { setAssignFormOpen(true); window.setTimeout(() => projectNameRef.current?.focus(), 0) }
  function showAllProjects() { setProjectFilter('all'); setNotice({ type: 'success', message: 'Showing all assigned projects.' }) }
  function showPendingProjects() { setProjectFilter('pending'); setNotice({ type: 'success', message: 'Showing pending projects.' }) }

  return (
    <section className={`${s.page} ${s.portal6Page}`} aria-labelledby="portal6-title">
      <header className={s.heading}>
        <h1 id="portal6-title" className={s.title}>Hello, <span className={s.titleAccent}>Godsent!</span></h1>
        <div className={s.notificationWrap}>
          <button className={s.notification} type="button" aria-label={notificationsOpen ? 'Hide notifications' : 'Show notifications, one unread'} aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}><Bell size={20} fill="currentColor" aria-hidden="true" /><span className={s.notificationCount}>1</span></button>
          {notificationsOpen && <div className={s.notificationPopover} role="status">You have one new supervisor update.</div>}
        </div>
      </header>
      <div className={s.mainGrid}>
        <div className={s.primary}>
          <div className={`${s.statGrid} ${s.portal6StatGrid}`} aria-label="Project totals">
            <article className={s.statCard}><FileText className={s.statIcon} size={22} fill="white" aria-hidden="true" /><span className={s.statLabel}>Total Assigned projects</span><strong className={s.statValue}>{projects.length}</strong></article>
            <article className={s.statCard}><FileText className={s.statIcon} size={22} fill="white" aria-hidden="true" /><span className={s.statLabel}>Total Pending projects</span><strong className={s.statValue}>{pendingCount}</strong></article>
          </div>
          <section className={s.projectSection} aria-labelledby="portal6-projects-title">
            <h2 id="portal6-projects-title" className={s.sectionTitle}>{projectFilter === 'pending' ? 'Pending Project' : 'Projects Assigned'}</h2>
            <div className={s.tableWrap} role="region" aria-label="Pending projects" tabIndex="0">
              <table className={`${s.table} ${s.portal6Table}`}><colgroup><col className="w-[40%]" /><col className="w-[22%]" /><col className="w-[20%]" /><col className="w-[18%]" /></colgroup>
                <thead><tr><th className={s.tableHead} scope="col">Project Name</th><th className={s.tableHead} scope="col">Learners</th><th className={s.tableHead} scope="col">Date</th><th className={s.tableHead} scope="col">Status</th></tr></thead>
                <tbody>{visibleProjects.length ? visibleProjects.map((project) => <tr key={project.id}>
                  <td className={`${s.tableCell} ${s.projectName}`} title={project.name}>{project.name}</td><td className={s.tableCell}>{project.learners} Learners</td><td className={s.tableCell}>{project.date}</td>
                  <td className={s.tableCell}><span className={`${s.portal6Status} ${project.status === 'pending' ? 'bg-portal-status' : 'bg-blue'}`}>{project.status === 'pending' ? 'Pending' : 'Complete'}</span></td>
                </tr>) : <tr><td className={`${s.tableCell} !text-center !text-[#74839a]`} colSpan="4">No pending projects right now.</td></tr>}</tbody>
              </table>
            </div>
          </section>
          {assignFormOpen && <form className={s.assignForm} onSubmit={handleAddProject}>
            <label className={s.assignLabel} htmlFor="portal6-project-name">New project name</label>
            <input className={s.assignInput} id="portal6-project-name" ref={projectNameRef} value={newProjectName} onChange={(event) => setNewProjectName(event.target.value)} placeholder="Enter project name" maxLength={80} required />
            <button className={s.assignButton} type="submit">Add Project</button>
            <button className={s.cancelButton} type="button" onClick={() => { setAssignFormOpen(false); setNewProjectName('') }}>Cancel</button>
          </form>}
          <div className={`${s.uploadBox} max620:mt-[26px] max460:gap-2 max460:px-2`}>
            <CloudUpload className={s.uploadIcon} size={36} strokeWidth={1.8} aria-hidden="true" /><div className={s.uploadCopy}><strong className={s.uploadTitle}>{selectedFile ? selectedFile.name : 'Upload Completed Project'}</strong><span className={s.uploadHelp}>Supported formats PDF, DOCX, ZIP, JPG, PNG (Max 100MB)</span></div>
            <input ref={fileInputRef} className={s.fileInput} type="file" accept=".pdf,.docx,.zip,.jpg,.jpeg,.png" onChange={handleFileChange} aria-label="Choose a completed project file" /><button className={s.chooseFile} type="button" onClick={handleUpload}>{selectedFile ? 'Upload File' : 'Choose File'}</button>
          </div>
          {notice && <p className={`${s.notice} ${notice.type === 'error' ? s.errorNotice : ''}`} role={notice.type === 'error' ? 'alert' : 'status'}>{notice.type === 'error' ? null : <Check className="shrink-0" size={18} aria-hidden="true" />}{notice.message}</p>}
          <a className={s.contact} href="mailto:supervisor@godsent.com?subject=Pending%20projects%20support"><Info className={s.contactIcon} size={18} fill="currentColor" stroke="white" aria-hidden="true" /><span>Click here to <strong className={s.contactLink}>contact your supervisor</strong></span></a>
        </div>
        <aside className={s.supervisor} aria-labelledby="portal6-supervisor-title">
          <h2 id="portal6-supervisor-title" className={s.supervisorTitle}>Supervisor Panel</h2>
          <div className={s.supervisorProfile}><span className={s.supervisorAvatar}><UserRound size={22} fill="white" aria-hidden="true" /></span><span><strong className={s.supervisorName}>Abimbola</strong><small className={s.supervisorRole}>Supervisor</small></span></div>
          <nav className={s.supervisorActions} aria-label="Supervisor project actions">
            <button className={s.supervisorAction} type="button" aria-expanded={assignFormOpen} onClick={openAssignForm}><BadgePlus className={s.supervisorActionIcon} size={20} aria-hidden="true" /><span>Assign New Project</span></button>
            <button className={s.supervisorAction} type="button" aria-pressed={projectFilter === 'all'} onClick={showAllProjects}><FileText className={s.supervisorActionIcon} size={18} fill="currentColor" aria-hidden="true" /><span>View All Projects</span></button>
            <button className={s.supervisorAction} type="button" aria-pressed={projectFilter === 'pending'} onClick={showPendingProjects}><FileText className={s.supervisorActionIcon} size={18} fill="currentColor" aria-hidden="true" /><span>View Pending Projects</span></button>
          </nav>
          <section aria-labelledby="portal6-note-title"><h3 id="portal6-note-title" className={s.noteTitle}>Supervisor Note</h3><div className={`${s.note} max620:min-h-[60px]`} aria-label="Supervisor note, currently blank" /></section>
        </aside>
      </div>
      <button className={s.scrollCue} type="button" aria-label="Scroll to the bottom of the portal" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}><ArrowDown size={28} fill="currentColor" strokeWidth={2.5} aria-hidden="true" /></button>
    </section>
  )
}

export default Portal6
