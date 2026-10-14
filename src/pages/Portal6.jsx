import { useRef, useState } from 'react'
import {
  ArrowDown,
  BadgePlus,
  Bell,
  Check,
  CloudUpload,
  FileText,
  Info,
  UserRound,
} from 'lucide-react'

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
  const visibleProjects = projectFilter === 'pending'
    ? projects.filter((project) => project.status === 'pending')
    : projects

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

    setNotice({
      type: 'success',
      message: `${selectedFile.name} was staged in this preview. Connect an upload service to submit it.`,
    })
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleAddProject(event) {
    event.preventDefault()
    const name = newProjectName.trim()
    if (!name) return

    const project = {
      id: `project-${Date.now()}`,
      name,
      learners: 1,
      date: new Intl.DateTimeFormat('en-GB').format(new Date()).replace(/\//g, '-'),
      status: 'pending',
    }

    setProjects((current) => [project, ...current])
    setProjectFilter('pending')
    setNewProjectName('')
    setAssignFormOpen(false)
    setNotice({ type: 'success', message: `${name} was added to pending projects.` })
  }

  function openAssignForm() {
    setAssignFormOpen(true)
    window.setTimeout(() => projectNameRef.current?.focus(), 0)
  }

  function showAllProjects() {
    setProjectFilter('all')
    setNotice({ type: 'success', message: 'Showing all assigned projects.' })
  }

  function showPendingProjects() {
    setProjectFilter('pending')
    setNotice({ type: 'success', message: 'Showing pending projects.' })
  }

  return (
    <section className="portal5-page portal6-page" aria-labelledby="portal6-title">
      <header className="portal5-heading">
        <h1 id="portal6-title">Hello, <span>Godsent!</span></h1>
        <div className="portal5-notification-wrap">
          <button
            className="portal5-notification"
            type="button"
            aria-label={notificationsOpen ? 'Hide notifications' : 'Show notifications, one unread'}
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((open) => !open)}
          >
            <Bell size={15} fill="currentColor" aria-hidden="true" />
            <span>1</span>
          </button>
          {notificationsOpen && (
            <div className="portal5-notification-popover" role="status">
              You have one new supervisor update.
            </div>
          )}
        </div>
      </header>

      <div className="portal5-main-grid">
        <div className="portal5-primary-column">
          <div className="portal5-stat-grid" aria-label="Project totals">
            <article className="portal5-stat-card">
              <FileText size={13} fill="white" aria-hidden="true" />
              <span>Total Assigned projects</span>
              <strong>{projects.length}</strong>
            </article>
            <article className="portal5-stat-card">
              <FileText size={13} fill="white" aria-hidden="true" />
              <span>Total Pending projects</span>
              <strong>{pendingCount}</strong>
            </article>
          </div>

          <section className="portal5-project-section" aria-labelledby="portal6-projects-title">
            <h2 id="portal6-projects-title">
              {projectFilter === 'pending' ? 'Pending Project' : 'Projects Assigned'}
            </h2>
            <div className="portal5-table-wrap" role="region" aria-label="Pending projects" tabIndex="0">
              <table className="portal5-project-table portal6-project-table">
                <thead>
                  <tr>
                    <th scope="col">Project Name</th>
                    <th scope="col">Learners</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProjects.length ? visibleProjects.map((project) => (
                    <tr key={project.id}>
                      <td className="portal5-project-name" title={project.name}>{project.name}</td>
                      <td>{project.learners} Learners</td>
                      <td>{project.date}</td>
                      <td>
                        <span className={`portal6-status-pill ${project.status === 'pending' ? 'is-pending' : ''}`}>
                          {project.status === 'pending' ? 'Pending' : 'Complete'}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td className="portal5-empty-state" colSpan="4">No pending projects right now.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {assignFormOpen && (
            <form className="portal5-assign-form" onSubmit={handleAddProject}>
              <label htmlFor="portal6-project-name">New project name</label>
              <input
                id="portal6-project-name"
                ref={projectNameRef}
                value={newProjectName}
                onChange={(event) => setNewProjectName(event.target.value)}
                placeholder="Enter project name"
                maxLength={80}
                required
              />
              <button type="submit">Add Project</button>
              <button
                className="portal5-cancel-button"
                type="button"
                onClick={() => {
                  setAssignFormOpen(false)
                  setNewProjectName('')
                }}
              >
                Cancel
              </button>
            </form>
          )}

          <div className="portal5-upload-box">
            <CloudUpload size={25} strokeWidth={1.8} aria-hidden="true" />
            <div className="portal5-upload-copy">
              <strong>{selectedFile ? selectedFile.name : 'Upload Completed Project'}</strong>
              <span>Supported formats PDF, DOCX, ZIP, JPG, PNG (Max 100MB)</span>
            </div>
            <input
              ref={fileInputRef}
              className="portal5-file-input"
              type="file"
              accept=".pdf,.docx,.zip,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              aria-label="Choose a completed project file"
            />
            <button type="button" className="portal5-choose-file" onClick={handleUpload}>
              {selectedFile ? 'Upload File' : 'Choose File'}
            </button>
          </div>

          {notice && (
            <p className={`portal5-notice ${notice.type === 'error' ? 'is-error' : ''}`} role={notice.type === 'error' ? 'alert' : 'status'}>
              {notice.type === 'error' ? null : <Check size={13} aria-hidden="true" />}
              {notice.message}
            </p>
          )}

          <a className="portal5-contact" href="mailto:supervisor@godsent.com?subject=Pending%20projects%20support">
            <Info size={13} fill="currentColor" stroke="white" aria-hidden="true" />
            <span>Click here to <strong>contact your supervisor</strong></span>
          </a>
        </div>

        <aside className="portal5-supervisor-panel" aria-labelledby="portal6-supervisor-title">
          <h2 id="portal6-supervisor-title">Supervisor Panel</h2>
          <div className="portal5-supervisor-profile">
            <span className="portal5-supervisor-avatar"><UserRound size={15} fill="white" aria-hidden="true" /></span>
            <span><strong>Abimbola</strong><small>Supervisor</small></span>
          </div>
          <nav className="portal5-supervisor-actions" aria-label="Supervisor project actions">
            <button type="button" aria-expanded={assignFormOpen} onClick={openAssignForm}>
              <BadgePlus size={16} aria-hidden="true" />
              <span>Assign New Project</span>
            </button>
            <button type="button" aria-pressed={projectFilter === 'all'} onClick={showAllProjects}>
              <FileText size={15} fill="currentColor" aria-hidden="true" />
              <span>View All Projects</span>
            </button>
            <button type="button" aria-pressed={projectFilter === 'pending'} onClick={showPendingProjects}>
              <FileText size={15} fill="currentColor" aria-hidden="true" />
              <span>View Pending Projects</span>
            </button>
          </nav>
          <section className="portal5-supervisor-note" aria-labelledby="portal6-note-title">
            <h3 id="portal6-note-title">Supervisor Note</h3>
            <div aria-label="Supervisor note, currently blank" />
          </section>
        </aside>
      </div>

      <button
        className="portal5-scroll-cue"
        type="button"
        aria-label="Scroll to the bottom of the portal"
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
      >
        <ArrowDown size={19} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}

export default Portal6
