import { useRef, useState } from 'react'
import {
  ArrowDown,
  Bell,
  Check,
  CloudUpload,
  FileText,
  BadgePlus,
  Info,
  UserRound,
} from 'lucide-react'

const initialProjects = [
  { id: 'focus-3', name: 'Focus Level Learner 3', learners: 3, date: '25-07-2026' },
  { id: 'jamal-autism', name: 'Jamal Autism', learners: 5, date: '26-07-2026' },
  { id: 'jamal-disability', name: 'Jamal Disability', learners: 4, date: '15-08-2026' },
  { id: 'focus-2', name: 'Focus Level Learner 2', learners: 3, date: '20-08-2026' },
]

function Portal4() {
  const fileInputRef = useRef(null)
  const projectNameRef = useRef(null)
  const [projects, setProjects] = useState(initialProjects)
  const [assignedProjectTotal, setAssignedProjectTotal] = useState(3)
  const [uploadedProjectTotal, setUploadedProjectTotal] = useState(4)
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [assignFormOpen, setAssignFormOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [notice, setNotice] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (file && file.size > 100 * 1024 * 1024) {
      setSelectedFile(null)
      event.target.value = ''
      setNotice('Please choose a file smaller than 100 MB.')
      return
    }
    setSelectedFile(file || null)
    if (file) setNotice(`${file.name} is ready to upload.`)
  }

  function handleUpload() {
    if (!selectedFile) {
      fileInputRef.current?.click()
      return
    }
    setNotice(`${selectedFile.name} was added to your completed project uploads.`)
    setUploadedProjectTotal((total) => total + 1)
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
      date: new Intl.DateTimeFormat('en-GB').format(new Date()).replaceAll('/', '-'),
    }
    setProjects((current) => [project, ...current])
    setAssignedProjectTotal((total) => total + 1)
    setNewProjectName('')
    setAssignFormOpen(false)
    setNotice(`${name} was added to your projects.`)
  }

  function handleDeleteProject(project) {
    setProjects((current) => current.filter((item) => item.id !== project.id))
    if (selectedProject?.id === project.id) setSelectedProject(null)
    setNotice(`${project.name} was removed from your project list.`)
  }

  function openAssignForm() {
    setAssignFormOpen(true)
    window.setTimeout(() => projectNameRef.current?.focus(), 0)
  }

  return (
    <section className="portal4-page" aria-labelledby="portal4-title">
      <header className="portal4-heading">
        <div>
          <h1 id="portal4-title">Hello, <span>Godsent!</span></h1>
          <p>Manage your assigned learners and uploaded projects.</p>
        </div>
        <div className="portal4-notification-wrap">
          <button
            className="portal4-notification"
            type="button"
            aria-label={notificationsOpen ? 'Hide notifications' : 'Show notifications, one unread'}
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((open) => !open)}
          >
            <Bell size={16} fill="currentColor" aria-hidden="true" />
            <span>1</span>
          </button>
          {notificationsOpen && <div className="portal4-notification-popover" role="status">You have one new supervisor update.</div>}
        </div>
      </header>

      <div className="portal4-main-grid">
        <div className="portal4-primary-column">
          <div className="portal4-stat-grid" aria-label="Project totals">
            <article className="portal4-stat-card portal4-stat-highlight">
              <FileText size={13} fill="white" stroke="var(--blue)" aria-hidden="true" />
              <span>Total Assigned projects</span>
              <strong>{assignedProjectTotal}</strong>
            </article>
            <article className="portal4-stat-card">
              <FileText size={13} fill="white" stroke="var(--blue)" aria-hidden="true" />
              <span>Total Uploaded projects</span>
              <strong>{uploadedProjectTotal}</strong>
            </article>
          </div>

          <section className="portal4-project-section" aria-labelledby="uploaded-projects-title">
            <div className="portal4-section-heading">
              <h2 id="uploaded-projects-title">My Uploaded Projects</h2>
              <span>{projects.length} projects</span>
            </div>
            <div className="portal4-project-table-wrap">
              <table className="portal4-project-table">
                <thead>
                  <tr><th scope="col">Project Name</th><th scope="col">Learners</th><th scope="col">Date</th><th scope="col"><span className="visually-hidden">Project actions</span></th></tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td><span className="portal4-project-name"><FileText size={12} fill="currentColor" stroke="white" aria-hidden="true" />{project.name}</span></td>
                      <td>{project.learners} Learners</td>
                      <td>{project.date}</td>
                      <td><div className="portal4-row-actions"><button type="button" className="portal4-view-button" onClick={() => setSelectedProject(project)}>View</button><button type="button" className="portal4-delete-button" onClick={() => handleDeleteProject(project)}>Delete</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {assignFormOpen && (
            <form className="portal4-assign-form" onSubmit={handleAddProject}>
              <label htmlFor="portal4-new-project">New project name</label>
              <input id="portal4-new-project" ref={projectNameRef} value={newProjectName} onChange={(event) => setNewProjectName(event.target.value)} placeholder="Enter project name" required />
              <button type="submit">Add project</button>
              <button className="portal4-cancel-button" type="button" onClick={() => setAssignFormOpen(false)}>Cancel</button>
            </form>
          )}

          <div className="portal4-upload-box">
            <CloudUpload size={25} strokeWidth={1.8} aria-hidden="true" />
            <div className="portal4-upload-copy">
              <strong>{selectedFile ? selectedFile.name : 'Upload Completed Project'}</strong>
              <span>Supported formats PDF, DOCX, ZIP, JPG, PNG (Max 100MB)</span>
            </div>
            <input ref={fileInputRef} className="portal4-file-input" type="file" accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png" onChange={handleFileChange} aria-label="Choose a completed project file" />
            <button type="button" className="portal4-choose-file" onClick={handleUpload}>{selectedFile ? 'Upload File' : 'Choose File'}</button>
          </div>

          {selectedProject && (
            <div className="portal4-project-detail" role="status">
              <div><strong>{selectedProject.name}</strong><span>{selectedProject.learners} assigned learners · Due {selectedProject.date}</span></div>
              <button type="button" aria-label="Close project details" onClick={() => setSelectedProject(null)}>×</button>
            </div>
          )}
          {notice && <p className="portal4-notice" role="status"><Check size={13} aria-hidden="true" />{notice}</p>}

          <a className="portal4-contact" href="mailto:supervisor@godsent.com?subject=Project%20support"><Info size={13} fill="currentColor" stroke="white" aria-hidden="true" /> <span>Click here to <strong>contact your supervisor</strong></span></a>
        </div>

        <aside className="portal4-supervisor-panel" aria-labelledby="supervisor-title">
          <h2 id="supervisor-title">Supervisor Panel</h2>
          <div className="portal4-supervisor-profile">
            <span className="portal4-supervisor-avatar"><UserRound size={15} fill="white" aria-hidden="true" /></span>
            <span><strong>Abimbola</strong><small>Supervisor</small></span>
          </div>
          <nav className="portal4-supervisor-actions" aria-label="Supervisor actions">
            <button type="button" onClick={openAssignForm}><BadgePlus size={16} aria-hidden="true" /><span>Assign New Project</span></button>
            <button type="button" onClick={() => document.getElementById('uploaded-projects-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}><FileText size={15} fill="currentColor" aria-hidden="true" /><span>View All Projects</span></button>
          </nav>
          <div className="portal4-supervisor-note">
            <h3>Supervisor Note</h3>
            <p>Good Morning Godsent please, submit all pending project tomorrow.</p>
          </div>
        </aside>
      </div>

      <button className="portal4-scroll-cue" type="button" aria-label="Scroll to the bottom of the portal" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={19} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}

export default Portal4
