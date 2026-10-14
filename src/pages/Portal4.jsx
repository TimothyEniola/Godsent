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
    <section className="relative mx-auto mt-[-7px] w-[min(90%,1120px)] flex-1 pb-[38px] pl-[30px] text-[#15283f] max760:mt-[-5px] max760:w-[min(88%,600px)] max760:pb-11 max760:pl-[23px] max460:w-[92%] max460:pl-[18px]" aria-labelledby="portal4-title">
      <header className="relative flex min-h-8 items-start justify-between">
        <div>
          <h1 id="portal4-title" className="m-0 font-display text-[22px] font-extrabold leading-[1.12] tracking-[-.065em] text-[#203247] max460:text-xl">Hello, <span className="text-blue">Godsent!</span></h1>
          <p className="m-0 text-[0px]">Manage your assigned learners and uploaded projects.</p>
        </div>
        <div className="absolute top-[-11px] right-[-5px] z-[2] max760:right-[-8px]">
          <button className="relative grid size-[23px] cursor-pointer place-items-center rounded-full border-0 bg-blue text-white" type="button" aria-label={notificationsOpen ? 'Hide notifications' : 'Show notifications, one unread'} aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}>
            <Bell size={16} fill="currentColor" aria-hidden="true" />
            <span className="absolute top-[-3px] right-[-2px] grid size-[11px] place-items-center rounded-full bg-[#f12b32] text-[7px] font-extrabold text-white">1</span>
          </button>
          {notificationsOpen && <div className="absolute top-[30px] right-0 w-[190px] rounded-md border border-[#e1e8f4] bg-white px-[11px] py-[9px] text-[10px] text-[#42536c] shadow-[0_6px_18px_rgb(22_41_72_/_12%)]" role="status">You have one new supervisor update.</div>}
        </div>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)_175px] items-start gap-[clamp(24px,6.3vw,42px)] max760:grid-cols-1 max760:gap-4 max460:gap-[13px]">
        <div className="min-w-0">
          <div className="mb-4 grid grid-cols-2 gap-[22px] max460:gap-[9px]" aria-label="Project totals">
            {[assignedProjectTotal, uploadedProjectTotal].map((total, index) => (
              <article className={`grid h-[50px] min-w-0 grid-cols-[18px_minmax(0,1fr)] grid-rows-[17px_18px] content-center items-center gap-x-[7px] rounded border border-transparent bg-blue px-[13px] py-[5px] text-white max460:gap-x-[5px] max460:px-2 ${index === 0 ? 'portal4-stat-highlight border-2 border-[#ff322c]' : ''}`} key={index}>
                <FileText className="row-span-2 size-[13px]" size={13} fill="white" stroke="var(--blue)" aria-hidden="true" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[10px] leading-[1.1] max460:text-[8px]">Total {index === 0 ? 'Assigned' : 'Uploaded'} projects</span>
                <strong className="font-display text-[15px] font-extrabold leading-none">{total}</strong>
              </article>
            ))}
          </div>

          <section className="min-w-0" aria-labelledby="uploaded-projects-title">
            <div className="mb-[6px] flex items-center justify-between">
              <h2 id="uploaded-projects-title" className="m-0 font-display text-[10px] font-extrabold uppercase leading-[1.2] text-[#061f45]">My Uploaded Projects</h2>
              <span className="text-[8px] text-[#75839a]">{projects.length} projects</span>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[335px] table-auto border-collapse font-body">
                <thead><tr><th className="h-[26px] border-0 px-[3px] py-[3px] text-left text-[8px] font-medium text-[#7a8da9] first:pl-0.5" scope="col">Project Name</th><th className="h-[26px] border-0 px-[3px] py-[3px] text-left text-[8px] font-medium text-[#7a8da9]" scope="col">Learners</th><th className="h-[26px] border-0 px-[3px] py-[3px] text-left text-[8px] font-medium text-[#7a8da9]" scope="col">Date</th><th className="h-[26px] border-0 px-[3px] py-[3px] text-left text-[8px] font-medium text-[#7a8da9]" scope="col"><span className="sr-only">Project actions</span></th></tr></thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td className="h-[26px] border-0 px-[3px] py-[3px] text-left text-[9px] whitespace-nowrap first:pl-0.5"><span className="inline-flex max-w-full items-center gap-[6px] overflow-hidden text-ellipsis whitespace-nowrap text-[9px]"><FileText className="shrink-0 text-[#102744]" size={12} fill="currentColor" stroke="white" aria-hidden="true" />{project.name}</span></td>
                      <td className="h-[26px] border-0 px-[3px] py-[3px] text-left text-[9px] whitespace-nowrap">{project.learners} Learners</td>
                      <td className="h-[26px] border-0 px-[3px] py-[3px] text-left text-[9px] whitespace-nowrap">{project.date}</td>
                      <td className="h-[26px] border-0 px-[3px] py-[3px] text-left text-[9px] whitespace-nowrap"><div className="flex items-center gap-2"><button className="h-[21px] min-w-[55px] cursor-pointer rounded border-0 bg-blue px-2 text-[9px] text-white transition-colors duration-[160ms] hover:bg-[#0d50d3]" type="button" onClick={() => setSelectedProject(project)}>View</button><button className="cursor-pointer border-0 bg-transparent py-1 text-[9px] text-[#27364b] hover:text-[#d52638] hover:underline" type="button" onClick={() => handleDeleteProject(project)}>Delete</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {assignFormOpen && (
            <form className="mt-[9px] grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-[7px] rounded-[5px] border border-[#e2eafb] bg-[#fbfcff] p-[9px] max460:grid-cols-[minmax(0,1fr)_auto]" onSubmit={handleAddProject}>
              <label className="col-span-full text-[9px] text-[#64758e]" htmlFor="portal4-new-project">New project name</label>
              <input className="h-[27px] min-w-0 rounded border border-[#dce5f3] px-2 text-[9px]" id="portal4-new-project" ref={projectNameRef} value={newProjectName} onChange={(event) => setNewProjectName(event.target.value)} placeholder="Enter project name" required />
              <button className="h-[27px] cursor-pointer rounded border-0 bg-blue px-[9px] text-[9px] text-white hover:bg-[#0d50d3]" type="submit">Add project</button>
              <button className="h-[27px] cursor-pointer rounded border border-[#dce5f3] bg-white px-[9px] text-[9px] text-[#52647d] max460:col-start-2" type="button" onClick={() => setAssignFormOpen(false)}>Cancel</button>
            </form>
          )}

          <div className="mt-4 flex min-h-[66px] items-center gap-3 rounded-[5px] bg-[#f1f6ff] px-[13px] py-[10px] text-blue max760:mt-[26px] max460:gap-[7px] max460:px-2">
            <CloudUpload className="shrink-0" size={25} strokeWidth={1.8} aria-hidden="true" />
            <div className="grid min-w-0 flex-1 gap-[3px]">
              <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-bold">{selectedFile ? selectedFile.name : 'Upload Completed Project'}</strong>
              <span className="whitespace-nowrap text-[7px] text-[#8190a8] max460:whitespace-normal">Supported formats PDF, DOCX, ZIP, JPG, PNG (Max 100MB)</span>
            </div>
            <input ref={fileInputRef} className="sr-only" type="file" accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png" onChange={handleFileChange} aria-label="Choose a completed project file" />
            <button className="h-[30px] min-w-[74px] cursor-pointer rounded border-0 bg-blue px-[10px] text-[9px] font-bold text-white hover:bg-[#0d50d3] max460:min-w-[66px] max460:px-[7px]" type="button" onClick={handleUpload}>{selectedFile ? 'Upload File' : 'Choose File'}</button>
          </div>

          {selectedProject && (
            <div className="mt-[9px] flex items-center justify-between gap-[10px] rounded-[5px] border border-[#dfe8f7] bg-white px-[10px] py-[9px]" role="status">
              <div><strong className="block text-[10px]">{selectedProject.name}</strong><span className="mt-[3px] block text-[8px] text-[#73829a]">{selectedProject.learners} assigned learners · Due {selectedProject.date}</span></div>
              <button className="cursor-pointer border-0 bg-transparent text-lg text-[#73829a]" type="button" aria-label="Close project details" onClick={() => setSelectedProject(null)}>×</button>
            </div>
          )}
          {notice && <p className="mt-2 mb-0 flex items-center gap-[6px] text-[9px] text-[#16825b]" role="status"><Check size={13} aria-hidden="true" />{notice}</p>}

          <a className="mt-[18px] inline-flex items-center gap-[9px] text-[10px] text-[#172b44] max460:text-[9px]" href="mailto:supervisor@godsent.com?subject=Project%20support"><Info className="shrink-0 text-[#144caf]" size={13} fill="currentColor" stroke="white" aria-hidden="true" /> <span>Click here to <strong className="font-medium text-blue">contact your supervisor</strong></span></a>
        </div>

        <aside className="min-h-[280px] rounded-[5px] bg-portal-panel px-[13px] py-3 text-[#102541] max760:min-h-0" aria-labelledby="supervisor-title">
          <h2 id="supervisor-title" className="mt-0 mb-[13px] font-display text-[10px] font-extrabold uppercase leading-[1.2] text-[#0753de]">Supervisor Panel</h2>
          <div className="flex items-center gap-[9px] px-[5px] pb-[13px]">
            <span className="grid size-[33px] shrink-0 place-items-center rounded-full bg-blue text-white"><UserRound size={15} fill="white" aria-hidden="true" /></span>
            <span><strong className="block text-[8px] font-bold uppercase text-[#1a2c41]">Abimbola</strong><small className="mt-0.5 block text-[7px] uppercase text-[#697c9b]">Supervisor</small></span>
          </div>
          <nav className="mb-[17px] mt-px grid" aria-label="Supervisor actions">
            <button className="flex min-h-[33px] cursor-pointer items-center gap-[10px] border-0 bg-transparent px-[3px] text-left text-[9px] text-[#152b46] hover:text-blue" type="button" onClick={openAssignForm}><BadgePlus className="shrink-0 text-blue" size={16} aria-hidden="true" /><span>Assign New Project</span></button>
            <button className="flex min-h-[33px] cursor-pointer items-center gap-[10px] border-0 bg-transparent px-[3px] text-left text-[9px] text-[#152b46] hover:text-blue" type="button" onClick={() => document.getElementById('uploaded-projects-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}><FileText className="shrink-0 text-blue" size={15} fill="currentColor" aria-hidden="true" /><span>View All Projects</span></button>
          </nav>
          <div>
            <h3 className="mt-0 mb-[6px] text-[8px] font-medium uppercase text-[#798ba6]">Supervisor Note</h3>
            <p className="m-0 min-h-[83px] bg-white px-[11px] py-[15px] text-[8px] leading-[1.6] text-[#607089]">Good Morning Godsent please, submit all pending project tomorrow.</p>
          </div>
        </aside>
      </div>

      <button className="absolute right-[-4px] bottom-7 grid size-6 cursor-pointer place-items-center border-0 bg-transparent text-[#414448] hover:translate-y-0.5 max760:right-0 max760:bottom-3" type="button" aria-label="Scroll to the bottom of the portal" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={19} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}

export default Portal4
