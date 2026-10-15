import { useRef, useState } from 'react'
import { ArrowDown, BadgePlus, Bell, Check, Clock3, CloudUpload, FileText, Info, UserRound } from 'lucide-react'
import { portalStyles as s } from '../components/portalStyles.js'

const MAX_FILE_SIZE = 100 * 1024 * 1024
const ACCEPTED_EXTENSIONS = new Set(['pdf', 'docx', 'zip', 'jpg', 'jpeg', 'png'])
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
  const fileInputRef = useRef(null)
  const projectNameRef = useRef(null)
  const [projects, setProjects] = useState(initialProjects)
  const [selectedFile, setSelectedFile] = useState(null)
  const [newProjectName, setNewProjectName] = useState('')
  const [assignFormOpen, setAssignFormOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState('all')
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
          <button className={s.notification} type="button" aria-label={notificationsOpen ? 'Hide notifications' : 'Show notifications, one unread'} aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}><Bell size={15} fill="currentColor" aria-hidden="true" /><span className={s.notificationCount}>1</span></button>
          {notificationsOpen && <div className={s.notificationPopover} role="status">You have one new supervisor update.</div>}
        </div>
      </header>
      <div className={s.mainGrid}>
        <div className={s.primary}>
          <div className={s.statGrid} aria-label="Project totals">
            <article className={s.statCard}><FileText className={s.statIcon} size={13} fill="white" aria-hidden="true" /><span className={s.statLabel}>Total Assigned projects</span><strong className={s.statValue}>{projects.length}</strong></article>
            <article className={s.statCard}><FileText className={s.statIcon} size={13} fill="white" aria-hidden="true" /><span className={s.statLabel}>Total Pending projects</span><strong className={s.statValue}>{pendingCount}</strong></article>
          </div>
          <section className={s.projectSection} aria-labelledby="portal5-projects-title">
            <h2 id="portal5-projects-title" className={s.sectionTitle}>{projectFilter === 'pending' ? 'Projects Pending' : 'Projects Assigned'}</h2>
            <div className={s.tableWrap} role="region" aria-label="Assigned projects" tabIndex="0">
              <table className={s.table}><colgroup><col className="w-[35%]" /><col className="w-[18%]" /><col className="w-[15%]" /><col className="w-[18%]" /><col className="w-[14%]" /></colgroup>
                <thead><tr><th className={s.tableHead} scope="col">Project Name</th><th className={s.tableHead} scope="col">Learners</th><th className={s.tableHead} scope="col">Date</th><th className={s.tableHead} scope="col"><span className="sr-only">Download summary</span></th><th className={`${s.tableHead} text-right`} scope="col">Amount</th></tr></thead>
                <tbody>{visibleProjects.length ? visibleProjects.map((project) => <tr key={project.id}>
                  <td className={`${s.tableCell} ${s.projectName}`} title={project.name}>{project.name}</td><td className={s.tableCell}>{project.learners} Learners</td><td className={s.tableCell}>{project.date}</td>
                  <td className={s.tableCell}><button className={s.downloadButton} type="button" onClick={() => handleDownload(project)} aria-label={`Download project summary for ${project.name}`}>Download</button></td><td className={`${s.tableCell} text-right`}>{project.amount}</td>
                </tr>) : <tr><td className={`${s.tableCell} !text-center !text-[#74839a]`} colSpan="5">No pending projects right now.</td></tr>}</tbody>
              </table>
            </div>
          </section>
          {assignFormOpen && <form className={s.assignForm} onSubmit={handleAddProject}>
            <label className={s.assignLabel} htmlFor="portal5-project-name">New project name</label>
            <input className={s.assignInput} id="portal5-project-name" ref={projectNameRef} value={newProjectName} onChange={(event) => setNewProjectName(event.target.value)} placeholder="Enter project name" maxLength={80} required />
            <button className={s.assignButton} type="submit">Add Project</button>
            <button className={s.cancelButton} type="button" onClick={() => { setAssignFormOpen(false); setNewProjectName('') }}>Cancel</button>
          </form>}
          <div className={s.uploadBox}><CloudUpload className={s.uploadIcon} size={25} strokeWidth={1.8} aria-hidden="true" /><div className={s.uploadCopy}><strong className={s.uploadTitle}>{selectedFile ? selectedFile.name : 'Upload Completed Project'}</strong><span className={s.uploadHelp}>Supported formats PDF, DOCX, ZIP, JPG, PNG (Max 100MB)</span></div>
            <input ref={fileInputRef} className={s.fileInput} type="file" accept=".pdf,.docx,.zip,.jpg,.jpeg,.png" onChange={handleFileChange} aria-label="Choose a completed project file" /><button className={s.chooseFile} type="button" onClick={handleUpload}>{selectedFile ? 'Upload File' : 'Choose File'}</button>
          </div>
          {notice && <p className={`${s.notice} ${notice.type === 'error' ? s.errorNotice : ''}`} role={notice.type === 'error' ? 'alert' : 'status'}>{notice.type === 'error' ? null : <Check className="shrink-0" size={13} aria-hidden="true" />}{notice.message}</p>}
          <a className={s.contact} href="mailto:supervisor@godsent.com?subject=Assigned%20projects%20support"><Info className={s.contactIcon} size={13} fill="currentColor" stroke="white" aria-hidden="true" /><span>Click here to <strong className={s.contactLink}>contact your supervisor</strong></span></a>
        </div>
        <aside className={s.supervisor} aria-labelledby="portal5-supervisor-title">
          <h2 id="portal5-supervisor-title" className={s.supervisorTitle}>Supervisor Panel</h2>
          <div className={s.supervisorProfile}><span className={s.supervisorAvatar}><UserRound size={15} fill="white" aria-hidden="true" /></span><span><strong className={s.supervisorName}>Abimbola</strong><small className={s.supervisorRole}>Supervisor</small></span></div>
          <nav className={s.supervisorActions} aria-label="Supervisor project actions">
            <button className={s.supervisorAction} type="button" aria-expanded={assignFormOpen} onClick={openAssignForm}><BadgePlus className={s.supervisorActionIcon} size={16} aria-hidden="true" /><span>Assign New Project</span></button>
            <button className={s.supervisorAction} type="button" aria-pressed={projectFilter === 'all'} onClick={() => setFilter('all', 'Showing all assigned projects.')}><FileText className={s.supervisorActionIcon} size={15} fill="currentColor" aria-hidden="true" /><span>View All Projects</span></button>
            <button className={s.supervisorAction} type="button" aria-pressed={projectFilter === 'pending'} onClick={() => setFilter('pending', 'Showing pending projects.')}><Clock3 className={s.supervisorActionIcon} size={15} aria-hidden="true" /><span>View Pending Projects</span></button>
          </nav>
          <section aria-labelledby="portal5-note-title"><h3 id="portal5-note-title" className={s.noteTitle}>Supervisor Note</h3><div className={`${s.note} max620:min-h-[60px]`} aria-label="Supervisor note, currently blank" /></section>
        </aside>
      </div>
      <button className={s.scrollCue} type="button" aria-label="Scroll to the bottom of the portal" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}><ArrowDown size={19} fill="currentColor" strokeWidth={2.5} aria-hidden="true" /></button>
    </section>
  )
}

export default Portal5
