import { useRef, useState } from 'react'
import { ArrowDown, Bell, Check, CloudUpload, FileText, Info, UserRound } from 'lucide-react'
import { portalStyles as styles } from '../components/portalStyles.js'

const MAX_FILE_SIZE = 100 * 1024 * 1024
const ACCEPTED_EXTENSIONS = new Set(['pdf', 'docx', 'zip', 'jpg', 'jpeg', 'png'])

const initialProjects = [
  { id: 'focus-level-learner-3', name: 'Focus Level Learner 3', learners: 3, date: '05-02-2026', status: 'pending' },
  { id: 'jamal-autism', name: 'Jamal Autism', learners: 5, date: '06-04-2026', status: 'completed' },
  { id: 'jamal-disability', name: 'Jamal Disability', learners: 4, date: '06-05-2026', status: 'pending' },
  { id: 'focus-level-learner-2', name: 'Focus Level Learner 2', learners: 3, date: '20-08-2026', status: 'completed' },
]

const filters = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
]

function CompleteOrPendingWorkersProject() {
  const fileInputRef = useRef(null)
  const [projects] = useState(initialProjects)
  const [projectFilter, setProjectFilter] = useState('all')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [notice, setNotice] = useState(null)

  const pendingCount = projects.filter((project) => project.status === 'pending').length
  const completedCount = projects.filter((project) => project.status === 'completed').length
  const visibleProjects = projectFilter === 'all'
    ? projects
    : projects.filter((project) => project.status === projectFilter)

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !ACCEPTED_EXTENSIONS.has(extension)) {
      setSelectedFile(null)
      event.target.value = ''
      setNotice({ type: 'error', message: 'Choose a PDF, DOCX, ZIP, JPG, or PNG file.' })
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null)
      event.target.value = ''
      setNotice({ type: 'error', message: 'Please choose a file smaller than 100 MB.' })
      return
    }

    setSelectedFile(file)
    setNotice({ type: 'success', message: `${file.name} is ready to upload.` })
  }

  function handleUpload() {
    if (!selectedFile) {
      fileInputRef.current?.click()
      return
    }

    setNotice({ type: 'success', message: `${selectedFile.name} is staged in this preview.` })
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function showFilter(filter) {
    setProjectFilter(filter)
  }

  return (
    <section className={`${styles.page} max620:mt-[-7px] max620:w-[min(88%,600px)] max620:pb-12 max620:pl-[14px] max460:w-[92%] max460:pl-3`} aria-labelledby="worker-projects-title">
      <header className={`${styles.heading} flex items-start justify-between`}>
        <div>
          <h1 id="worker-projects-title" className={styles.title}>Hello, <span className={styles.titleAccent}>Godsent!</span></h1>
          <p className="mt-[3px] mb-0 text-[9px] text-[#73829a]">Track completed and pending worker projects.</p>
        </div>
        <div className={styles.notificationWrap}>
          <button className={styles.notification} type="button" aria-label={notificationsOpen ? 'Hide notifications' : 'Show notifications, one unread'} aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}>
            <Bell size={15} fill="currentColor" aria-hidden="true" />
            <span className={styles.notificationCount}>1</span>
          </button>
          {notificationsOpen && <div className={styles.notificationPopover} role="status">You have one new supervisor update.</div>}
        </div>
      </header>

      <div className={styles.mainGrid}>
        <div className={styles.primary}>
          <div className={styles.statGrid} aria-label="Project totals">
            <article className={styles.statCard}>
              <FileText className={styles.statIcon} size={13} fill="white" aria-hidden="true" />
              <span className={styles.statLabel}>Total Projects</span>
              <strong className={styles.statValue}>{projects.length}</strong>
            </article>
            <article className={styles.statCard}>
              <FileText className={styles.statIcon} size={13} fill="white" aria-hidden="true" />
              <span className={styles.statLabel}>Pending Projects</span>
              <strong className={styles.statValue}>{pendingCount}</strong>
            </article>
            <article className="col-span-2 grid h-[49px] min-w-0 grid-cols-[15px_minmax(0,1fr)] grid-rows-[14px_16px] content-center items-center gap-x-[6px] rounded bg-blue px-[11px] py-1 text-white max460:grid-cols-[13px_minmax(0,1fr)] max460:gap-x-[5px] max460:px-[7px]">
              <Check className="row-span-2 size-[13px]" size={13} aria-hidden="true" />
              <span className={styles.statLabel}>Completed Projects</span>
              <strong className={styles.statValue}>{completedCount}</strong>
            </article>
          </div>

          <section className={styles.projectSection} aria-labelledby="worker-project-table-title">
            <div className="mb-[9px] flex flex-wrap items-center justify-between gap-2 max460:mb-2">
              <h2 id="worker-project-table-title" className="m-0 font-display text-[9px] font-extrabold uppercase leading-[1.2] text-[#061f45]">Worker Projects</h2>
              <div className="flex items-center gap-[3px] rounded-[5px] bg-[#f1f6ff] p-[3px]" role="group" aria-label="Filter projects by status">
                {filters.map((filter) => (
                  <button className={`min-h-[25px] cursor-pointer rounded px-[9px] text-[8px] font-semibold transition-colors duration-[160ms] focus-visible:outline-2 focus-visible:outline-blue/40 focus-visible:outline-offset-1 ${projectFilter === filter.id ? 'bg-blue text-white' : 'bg-transparent text-[#607089] hover:text-blue'}`} type="button" key={filter.id} aria-pressed={projectFilter === filter.id} onClick={() => showFilter(filter.id)}>
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.tableWrap} role="region" aria-label="Worker projects" tabIndex="0">
              <table className={styles.table}>
                <colgroup><col className="w-[40%]" /><col className="w-[22%]" /><col className="w-[20%]" /><col className="w-[18%]" /></colgroup>
                <thead>
                  <tr>
                    <th className={styles.tableHead} scope="col">Project Name</th>
                    <th className={styles.tableHead} scope="col">Learners</th>
                    <th className={styles.tableHead} scope="col">Date</th>
                    <th className={styles.tableHead} scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProjects.length ? visibleProjects.map((project) => (
                    <tr key={project.id}>
                      <td className={`${styles.tableCell} ${styles.projectName}`} title={project.name}>{project.name}</td>
                      <td className={styles.tableCell}>{project.learners} Learners</td>
                      <td className={styles.tableCell}>{project.date}</td>
                      <td className={styles.tableCell}>
                        <span className={`inline-flex min-h-[19px] min-w-[55px] items-center justify-center rounded px-[7px] text-[8px] leading-none text-white ${project.status === 'pending' ? 'bg-portal-status' : 'bg-blue'}`}>
                          {project.status === 'pending' ? 'Pending' : 'Completed'}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td className={`${styles.tableCell} !text-center !text-[#74839a]`} colSpan="4">No projects match this filter.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <div className={`${styles.uploadBox} max620:mt-[26px] max460:gap-2 max460:px-2`}>
            <CloudUpload className={styles.uploadIcon} size={25} strokeWidth={1.8} aria-hidden="true" />
            <div className={styles.uploadCopy}>
              <strong className={styles.uploadTitle}>{selectedFile ? selectedFile.name : 'Upload Completed Project'}</strong>
              <span className={styles.uploadHelp}>Supported formats PDF, DOCX, ZIP, JPG, PNG (Max 100MB)</span>
            </div>
            <input ref={fileInputRef} className={styles.fileInput} type="file" accept=".pdf,.docx,.zip,.jpg,.jpeg,.png" onChange={handleFileChange} aria-label="Choose a completed project file" />
            <button className={styles.chooseFile} type="button" onClick={handleUpload}>{selectedFile ? 'Upload File' : 'Choose File'}</button>
          </div>

          {notice && <p className={`${styles.notice} ${notice.type === 'error' ? styles.errorNotice : ''}`} role={notice.type === 'error' ? 'alert' : 'status'}>{notice.type === 'error' ? null : <Check className="shrink-0" size={13} aria-hidden="true" />}{notice.message}</p>}

          <a className={styles.contact} href="mailto:supervisor@godsent.com?subject=Worker%20project%20status%20support"><Info className={styles.contactIcon} size={13} fill="currentColor" stroke="white" aria-hidden="true" /><span>Click here to <strong className={styles.contactLink}>contact your supervisor</strong></span></a>
        </div>

        <aside className={`${styles.supervisor} max620:min-h-0`} aria-labelledby="worker-supervisor-title">
          <h2 id="worker-supervisor-title" className={styles.supervisorTitle}>Supervisor Panel</h2>
          <div className={styles.supervisorProfile}>
            <span className={styles.supervisorAvatar}><UserRound size={15} fill="white" aria-hidden="true" /></span>
            <span><strong className={styles.supervisorName}>Abimbola</strong><small className={styles.supervisorRole}>Supervisor</small></span>
          </div>
          <nav className={styles.supervisorActions} aria-label="Supervisor project actions">
            <button className={styles.supervisorAction} type="button" aria-pressed={projectFilter === 'all'} onClick={() => showFilter('all')}><FileText className={styles.supervisorActionIcon} size={15} fill="currentColor" aria-hidden="true" /><span>View All Projects</span></button>
            <button className={styles.supervisorAction} type="button" aria-pressed={projectFilter === 'pending'} onClick={() => showFilter('pending')}><FileText className={styles.supervisorActionIcon} size={15} aria-hidden="true" /><span>View Pending Projects</span></button>
            <button className={styles.supervisorAction} type="button" aria-pressed={projectFilter === 'completed'} onClick={() => showFilter('completed')}><Check className={styles.supervisorActionIcon} size={15} aria-hidden="true" /><span>View Completed Projects</span></button>
          </nav>
          <section aria-labelledby="worker-supervisor-note-title">
            <h3 id="worker-supervisor-note-title" className={styles.noteTitle}>Supervisor Note</h3>
            <div className={`${styles.note} max620:min-h-[60px]`} aria-label="Supervisor note, currently blank" />
          </section>
        </aside>
      </div>

      <button className={styles.scrollCue} type="button" aria-label="Scroll to the bottom of the projects page" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}><ArrowDown size={19} fill="currentColor" strokeWidth={2.5} aria-hidden="true" /></button>
    </section>
  )
}

export default CompleteOrPendingWorkersProject
