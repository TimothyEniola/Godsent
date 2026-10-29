import { useRef, useState } from 'react'
import { ArrowDown, BadgePlus, Check, Clock3, FileText, Info, UserRound, X } from 'lucide-react'
import { readAssignedProjects, saveAssignedProject } from '../../utils/assignedProjects.js'

const MAX_FILE_SIZE = 100 * 1024 * 1024
const ACCEPTED_EXTENSIONS = new Set(['pdf', 'docx', 'zip', 'jpg', 'jpeg', 'png'])

const initialDetails = {
  projectDetails: '',
  learners: '',
  dateAssigned: '',
  projectDuration: '',
  paymentAccount: '',
}

const supervisorViews = [
  { id: 'assign', label: 'Assign New Project', Icon: BadgePlus },
  { id: 'all', label: 'View All Projects', Icon: FileText },
  { id: 'pending', label: 'View Pending Projects', Icon: Clock3 },
]

function displayDate(date) {
  const [year, month, day] = date.split('-')
  return year && month && day ? `${day}-${month}-${year}` : date
}

function formatFileSize(size) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

function Workersprojectportal() {
  const fileInputRef = useRef(null)
  const formRef = useRef(null)
  const [details, setDetails] = useState(initialDetails)
  const [selectedFile, setSelectedFile] = useState(null)
  const [assignedProjects, setAssignedProjects] = useState(readAssignedProjects)
  const [activeView, setActiveView] = useState('assign')
  const [message, setMessage] = useState(null)

  const visibleProjects = activeView === 'pending'
    ? assignedProjects.filter((project) => project.status === 'pending')
    : assignedProjects

  function updateDetails(event) {
    setDetails((current) => ({ ...current, [event.target.name]: event.target.value }))
    setMessage(null)
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !ACCEPTED_EXTENSIONS.has(extension)) {
      setSelectedFile(null)
      setMessage({ type: 'error', text: 'Choose a PDF, DOCX, ZIP, JPG, or PNG file.' })
      event.target.value = ''
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null)
      setMessage({ type: 'error', text: 'Choose a file no larger than 100 MB.' })
      event.target.value = ''
      return
    }

    setSelectedFile(file)
    setMessage(null)
  }

  function handleRemoveFile() {
    setSelectedFile(null)
    setMessage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleSendFile() {
    if (!selectedFile) {
      fileInputRef.current?.click()
      return
    }

    if (!formRef.current?.reportValidity()) return

    try {
      const savedProject = saveAssignedProject({
        ...details,
        date: displayDate(details.dateAssigned),
        duration: details.projectDuration,
        file: selectedFile,
      })
      setAssignedProjects((current) => [savedProject, ...current])
      setMessage({ type: 'success', text: 'Project updated successfully' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'The project could not be saved.' })
    }
  }

  function changeView(view) {
    setActiveView(view)
    setMessage(null)
  }

  return (
    <section className="relative mx-auto mt-0 w-[min(94%,1200px)] flex-1 pb-12 text-[#15283f] max760:w-[min(90%,640px)] max460:w-[94%]" aria-label="Workers project portal">
      <div className="grid grid-cols-[clamp(190px,22vw,250px)_minmax(0,1fr)] items-start gap-[clamp(24px,4vw,48px)] max760:grid-cols-1 max760:gap-6">
        <aside className="min-h-[420px] rounded-xl bg-portal-panel px-5 py-5 max760:order-2 max760:min-h-0" aria-labelledby="project-supervisor-title">
          <h2 id="project-supervisor-title" className="mt-0 mb-5 font-display text-[14px] font-extrabold uppercase leading-[1.2] text-[#0753de]">Supervisor Panel</h2>
          <div className="flex items-center gap-3 px-1 pb-5">
            <span className="grid size-[50px] shrink-0 place-items-center rounded-full bg-blue text-white" aria-hidden="true"><UserRound size={22} fill="white" /></span>
            <span><strong className="block text-[13px] font-bold uppercase text-[#1a2c41]">Abimbola</strong><small className="mt-0.5 block text-[11px] uppercase text-[#697c9b]">Supervisor</small></span>
          </div>

          <nav className="mt-1 mb-6 grid gap-1" aria-label="Supervisor project views">
            {supervisorViews.map(({ id, label, Icon }) => (
              <button
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border-0 px-2 text-left text-[13px] transition-colors ${activeView === id ? 'bg-white font-semibold text-blue shadow-[0_2px_8px_rgb(18_96_245_/_8%)]' : 'bg-transparent text-[#152b46] hover:bg-white hover:text-blue'}`}
                type="button"
                key={id}
                aria-pressed={activeView === id}
                onClick={() => changeView(id)}
              >
                <Icon className="shrink-0 text-blue" size={18} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div>
            <h3 className="mt-0 mb-[10px] text-[12px] font-semibold uppercase text-[#798ba6]">Supervisor Note</h3>
            <p className="m-0 min-h-[112px] rounded-lg bg-white p-3 text-[12px] leading-[1.6] text-[#607089]">Good morning. Please confirm project details and attach the project file before sending.</p>
          </div>
        </aside>

        <main className="min-w-0 max760:order-1" aria-live="polite">
          {activeView === 'assign' ? (
            <>
              <form ref={formRef} className="grid grid-cols-2 gap-x-7 gap-y-[18px] max460:grid-cols-1 max460:gap-y-4" onSubmit={(event) => event.preventDefault()}>
                <label className="col-span-2 grid min-w-0 gap-2 max460:col-span-1" htmlFor="admin-project-details">
                  <span className="font-display text-[13px] font-extrabold leading-[1.2] text-blue">1. Project Details</span>
                  <input className="h-[50px] w-full min-w-0 rounded-lg border-0 bg-field px-4 text-[14px] text-[#203247] outline-hidden focus-visible:outline-2 focus-visible:outline-blue/40" id="admin-project-details" name="projectDetails" value={details.projectDetails} onChange={updateDetails} placeholder="Enter project name or details" maxLength={120} required />
                </label>

                <label className="grid min-w-0 gap-2" htmlFor="admin-project-learners">
                  <span className="font-display text-[13px] font-extrabold leading-[1.2] text-blue">2. Learners</span>
                  <input className="h-[50px] w-full min-w-0 rounded-lg border-0 bg-field px-4 text-[14px] text-[#203247] outline-hidden focus-visible:outline-2 focus-visible:outline-blue/40" id="admin-project-learners" name="learners" type="number" min="1" step="1" value={details.learners} onChange={updateDetails} placeholder="Number of learners" required />
                </label>

                <label className="grid min-w-0 gap-2" htmlFor="admin-project-date">
                  <span className="font-display text-[13px] font-extrabold leading-[1.2] text-blue">3. Date Assigned</span>
                  <input className="h-[50px] w-full min-w-0 rounded-lg border-0 bg-field px-4 text-[14px] text-[#203247] outline-hidden focus-visible:outline-2 focus-visible:outline-blue/40" id="admin-project-date" name="dateAssigned" type="date" value={details.dateAssigned} onChange={updateDetails} required />
                </label>

                <label className="grid min-w-0 gap-2" htmlFor="admin-project-duration">
                  <span className="font-display text-[13px] font-extrabold leading-[1.2] text-blue">4. Project Duration</span>
                  <input className="h-[50px] w-full min-w-0 rounded-lg border-0 bg-field px-4 text-[14px] text-[#203247] outline-hidden focus-visible:outline-2 focus-visible:outline-blue/40" id="admin-project-duration" name="projectDuration" value={details.projectDuration} onChange={updateDetails} placeholder="e.g. 2 Month" maxLength={40} required />
                </label>

                <label className="grid min-w-0 gap-2" htmlFor="admin-project-payment">
                  <span className="font-display text-[13px] font-extrabold leading-[1.2] text-blue">5. Project Payment Account</span>
                  <input className="h-[50px] w-full min-w-0 rounded-lg border-0 bg-field px-4 text-[14px] text-[#203247] outline-hidden focus-visible:outline-2 focus-visible:outline-blue/40" id="admin-project-payment" name="paymentAccount" value={details.paymentAccount} onChange={updateDetails} placeholder="#27 X 5 = 135K" maxLength={80} required />
                </label>
              </form>

              <div className="mt-10 grid min-h-[92px] grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-field px-5 py-4 text-blue max460:mt-6 max460:grid-cols-[24px_minmax(0,1fr)] max460:gap-2 max460:px-3">
                <FileText className="shrink-0" size={28} fill="currentColor" stroke="white" aria-hidden="true" />
                <div className="grid min-w-0 gap-1">
                  <span className="flex min-w-0 items-center gap-2">
                    <strong className="block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-bold text-[#0753de]">{selectedFile ? `${selectedFile.name} (${formatFileSize(selectedFile.size)})` : 'Choose a project file'}</strong>
                    {selectedFile && <button className="grid size-6 shrink-0 cursor-pointer place-items-center rounded border-0 bg-[#111827] p-0 text-white hover:bg-[#39465b]" type="button" aria-label={`Remove ${selectedFile.name}`} onClick={handleRemoveFile}><X size={14} aria-hidden="true" /></button>}
                  </span>
                  <span className="text-[12px] leading-[1.35] text-[#8190a8]">{selectedFile ? 'Ready to send' : 'PDF, DOCX, ZIP, JPG, PNG · Max 100MB'}</span>
                </div>
                <input ref={fileInputRef} className="sr-only" type="file" accept=".pdf,.docx,.zip,.jpg,.jpeg,.png" onChange={handleFileChange} aria-label="Choose a project file" />
                <button className="min-h-[46px] min-w-[108px] cursor-pointer rounded-lg border-0 bg-blue px-5 text-[13px] font-bold text-white transition-colors hover:bg-blue-dark focus-visible:outline-2 focus-visible:outline-blue/40 focus-visible:outline-offset-2 max460:col-start-2 max460:min-w-[100px] max460:justify-self-end max460:px-3" type="button" onClick={handleSendFile}>
                  {selectedFile ? 'Send File' : 'Choose File'}
                </button>
              </div>

              {message && (
                <p className={`mt-6 mb-0 flex min-h-6 items-center justify-center gap-2 text-[14px] ${message.type === 'error' ? 'text-[#bb3441]' : 'text-[#203247]'}`} role={message.type === 'error' ? 'alert' : 'status'}>
                  {message.type === 'success' ? <><span>Project updated <strong className="font-semibold text-blue">successfully</strong></span><Check className="shrink-0 text-success" size={20} strokeWidth={3} aria-hidden="true" /></> : <span>{message.text}</span>}
                </p>
              )}
              <p className="mt-3 mb-0 flex items-start gap-2 text-[11px] leading-[1.45] text-[#73829a] max460:text-[12px]">
                <Info className="mt-0.5 shrink-0 text-blue" size={14} aria-hidden="true" />
                <span>Assignments are saved in this browser preview. The selected file itself is not uploaded to a server.</span>
              </p>
            </>
          ) : (
            <section aria-labelledby="assigned-projects-title">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 id="assigned-projects-title" className="m-0 font-display text-[20px] font-extrabold text-[#203247]">{activeView === 'pending' ? 'Pending Projects' : 'All Projects'}</h2>
                  <p className="mt-1 mb-0 text-[13px] text-[#73829a]">{visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}</p>
                </div>
                <button className="min-h-10 cursor-pointer rounded-lg bg-blue px-4 text-[13px] font-bold text-white hover:bg-blue-dark" type="button" onClick={() => changeView('assign')}>Assign New Project</button>
              </div>

              {visibleProjects.length ? (
                <div className="overflow-x-auto rounded-lg border border-line">
                  <table className="w-full min-w-[560px] border-collapse text-left">
                    <thead><tr className="bg-[#f5f8ff] text-[12px] font-semibold text-[#61728a]"><th className="px-4 py-3">Project</th><th className="px-4 py-3">Learners</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th></tr></thead>
                    <tbody>
                      {visibleProjects.map((project) => (
                        <tr className="border-t border-line text-[13px] text-[#203247]" key={project.id}>
                          <td className="px-4 py-3 font-semibold">{project.name}</td>
                          <td className="px-4 py-3">{project.learners}</td>
                          <td className="px-4 py-3">{project.date}</td>
                          <td className="px-4 py-3"><span className="inline-flex rounded-full bg-[#e8f8ef] px-3 py-1 text-[11px] font-semibold text-[#16825b]">{project.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="m-0 rounded-lg bg-field px-4 py-8 text-center text-[14px] text-[#73829a]">No projects here yet. Use Assign New Project to create the first one.</p>
              )}
            </section>
          )}
        </main>
      </div>

      <button className="absolute right-[-16px] bottom-3 grid size-10 cursor-pointer place-items-center rounded-full text-[#3c4043] transition-transform hover:translate-y-1 focus-visible:outline-2 focus-visible:outline-blue max760:right-0" type="button" aria-label="Scroll to the bottom of the project portal" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown className="size-7" size={28} strokeWidth={3} aria-hidden="true" />
      </button>
    </section>
  )
}

export default Workersprojectportal