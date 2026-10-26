import { useState } from 'react'
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
import { deleteProjectUpload, readProjectUploads } from '../../utils/projectUploads.js'

const initialProjects = [
  { id: 'focus-3', name: 'Focus Level Learner 3', learners: 3, date: '25-07-2026' },
  { id: 'jamal-autism', name: 'Jamal Autism', learners: 5, date: '26-07-2026' },
  { id: 'jamal-disability', name: 'Jamal Disability', learners: 4, date: '15-08-2026' },
  { id: 'focus-2', name: 'Focus Level Learner 2', learners: 3, date: '20-08-2026' },
]

function Portal4() {
  const [initialUploadState] = useState(() => {
    try {
      return { projects: readProjectUploads(), error: '' }
    } catch (error) {
      return { projects: [], error: error instanceof Error ? error.message : 'Saved project submissions could not be loaded.' }
    }
  })
  const [projects, setProjects] = useState(initialProjects)
  const [uploadedProjects, setUploadedProjects] = useState(initialUploadState.projects)
  const [uploadStorageError, setUploadStorageError] = useState(initialUploadState.error)
  const [selectedProject, setSelectedProject] = useState(null)
  const [projectOverview, setProjectOverview] = useState('uploaded')
  const [notice, setNotice] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  function handleDeleteProject(project) {
    setProjects((current) => current.filter((item) => item.id !== project.id))
    if (selectedProject?.id === project.id) setSelectedProject(null)
    setNotice(`${project.name} was removed from your project list.`)
    if (projects.length === 1) setProjectOverview('uploaded')
  }

  function handleDeleteUploadedProject(project) {
    try {
      setUploadedProjects(deleteProjectUpload(project.id))
      if (selectedProject?.id === project.id) setSelectedProject(null)
      setUploadStorageError('')
      setNotice(`${project.name} was removed from your uploaded projects.`)
    } catch (error) {
      setUploadStorageError(error instanceof Error ? error.message : 'The uploaded project could not be removed.')
    }
  }

  const assignedProjectTotal = projects.length
  const uploadedProjectTotal = uploadedProjects.length
  const projectOverviewLabel = projectOverview === 'assigned' ? 'Assigned Projects' : 'Uploaded Projects'
  const visibleProjects = projectOverview === 'assigned' ? projects : uploadedProjects
  const visibleProjectCount = visibleProjects.length

  return (
    <section className="relative mx-auto mt-[-8px] w-[min(92%,1200px)] flex-1 pb-14 pl-10 text-[#15283f] max760:mt-[-5px] max760:w-[min(90%,640px)] max760:pb-12 max760:pl-6 max460:w-[94%] max460:pl-4" aria-labelledby="portal4-title">
      <header className="relative flex min-h-12 items-start justify-between">
        <div>
          <h1 id="portal4-title" className="m-0 font-display text-[30px] font-extrabold leading-[1.12] tracking-[-.05em] text-[#203247] max460:text-2xl">Hello, <span className="text-blue">Godsent!</span></h1>
          <p className="m-0 text-[0px]">Manage your assigned learners and uploaded projects.</p>
        </div>
        <div className="absolute top-[-8px] right-0 z-[2] max760:right-1">
          <button className="relative grid size-[38px] cursor-pointer place-items-center rounded-full border-0 bg-blue text-white transition-transform duration-[160ms] hover:-translate-y-px" type="button" aria-label={notificationsOpen ? 'Hide notifications' : 'Show notifications, one unread'} aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}>
            <Bell size={20} fill="currentColor" aria-hidden="true" />
            <span className="absolute top-[-4px] right-[-3px] grid size-[18px] place-items-center rounded-full bg-[#f12b32] text-[10px] font-extrabold text-white">1</span>
          </button>
          {notificationsOpen && <div className="absolute top-[48px] right-0 w-[260px] rounded-lg border border-[#e1e8f4] bg-white px-4 py-3 text-[13px] leading-[1.5] text-[#42536c] shadow-[0_10px_30px_rgb(22_41_72_/_14%)]" role="status">You have one new supervisor update.</div>}
        </div>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)_clamp(230px,24vw,300px)] items-start gap-[clamp(32px,5vw,56px)] max760:grid-cols-1 max760:gap-6 max460:gap-5">
        <div className="min-w-0">
          <div className="mb-7 grid grid-cols-2 gap-[22px] max460:gap-3" aria-label="Project totals">
            {[
              { key: 'assigned', label: 'Total Assigned projects', total: assignedProjectTotal },
              { key: 'uploaded', label: 'Total Uploaded projects', total: uploadedProjectTotal },
            ].map((item) => (
              <button className={`grid h-[92px] min-w-0 cursor-pointer grid-cols-[24px_minmax(0,1fr)] grid-rows-[20px_36px] content-center items-center gap-x-[14px] rounded-xl border bg-blue px-6 py-2 text-left text-white transition-all duration-[160ms] hover:-translate-y-px hover:shadow-[0_10px_20px_rgb(18_96_245_/_14%)] max460:grid-cols-[20px_minmax(0,1fr)] max460:gap-x-[10px] max460:px-4 ${projectOverview === item.key ? 'border-2 border-[#ff322c]' : 'border border-transparent'}`} key={item.key} type="button" aria-pressed={projectOverview === item.key} onClick={() => setProjectOverview(item.key)}>
                <FileText className="row-span-2 size-[22px]" size={22} fill="white" stroke="#1260f5" aria-hidden="true" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-[1.2] max460:text-[12px]">{item.label}</span>
                <strong className="font-display text-[30px] font-extrabold leading-none">{item.total}</strong>
              </button>
            ))}
          </div>

          <section className="min-w-0" aria-labelledby="uploaded-projects-title">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="uploaded-projects-title" className="m-0 font-display text-[14px] font-extrabold uppercase leading-[1.2] tracking-[.01em] text-[#061f45]">{projectOverviewLabel}</h2>
              <span className="text-[13px] text-[#75839a]">{visibleProjectCount} projects</span>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[520px] table-auto border-collapse font-body">
                <thead><tr><th className="h-[42px] border-b border-line px-[14px] py-0 text-left text-[13px] font-semibold text-[#63768f] first:pl-0.5" scope="col">Project Name</th><th className="h-[42px] border-b border-line px-[14px] py-0 text-left text-[13px] font-semibold text-[#63768f]" scope="col">Learners</th><th className="h-[42px] border-b border-line px-[14px] py-0 text-left text-[13px] font-semibold text-[#63768f]" scope="col">Date</th><th className="h-[42px] border-b border-line px-[14px] py-0 text-left text-[13px] font-semibold text-[#63768f]" scope="col"><span className="sr-only">Project actions</span></th></tr></thead>
                <tbody>
                  {visibleProjects.length ? visibleProjects.map((project) => (
                    <tr key={project.id} className="transition-colors duration-[140ms] hover:bg-[#f7faff]">
                      <td className="h-[54px] border-b border-[#eef3fb] px-[14px] py-2 text-left text-[14px] whitespace-nowrap first:pl-0.5"><span className="inline-flex max-w-full items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-[14px]"><FileText className="shrink-0 text-[#102744]" size={16} fill="currentColor" stroke="white" aria-hidden="true" />{project.name}</span></td>
                      <td className="h-[54px] border-b border-[#eef3fb] px-[14px] py-2 text-left text-[14px] whitespace-nowrap">{project.learners} Learners</td>
                      <td className="h-[54px] border-b border-[#eef3fb] px-[14px] py-2 text-left text-[14px] whitespace-nowrap">{project.date}</td>
                      <td className="h-[54px] border-b border-[#eef3fb] px-[14px] py-2 text-left text-[14px] whitespace-nowrap"><div className="flex items-center gap-2"><button className="h-[38px] min-w-[72px] cursor-pointer rounded-lg border-0 bg-blue px-4 text-[13px] font-semibold text-white transition-colors duration-[160ms] hover:bg-[#0d50d3]" type="button" onClick={() => setSelectedProject(project)}>View</button><button className="cursor-pointer border-0 bg-transparent py-1 text-[13px] text-[#27364b] hover:text-[#d52638] hover:underline" type="button" onClick={() => projectOverview === 'uploaded' ? handleDeleteUploadedProject(project) : handleDeleteProject(project)}>Delete</button></div></td>
                    </tr>
                  )) : <tr><td className="h-[54px] border-b border-[#eef3fb] px-4 py-2 text-center text-[14px] text-[#75839a]" colSpan="4">{projectOverview === 'uploaded' ? 'No projects have been submitted yet.' : 'No assigned projects.'}</td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-8 flex min-h-[108px] items-center gap-4 rounded-xl bg-[#f1f6ff] px-6 py-5 text-blue max760:mt-6 max460:gap-3 max460:px-3">
            <CloudUpload className="shrink-0" size={36} strokeWidth={1.8} aria-hidden="true" />
            <div className="grid min-w-0 flex-1 gap-1">
              <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-bold">Upload Completed Project</strong>
              <span className="whitespace-nowrap text-[12px] text-[#8190a8] max460:whitespace-normal">Add project details and choose a document (Max 100MB)</span>
            </div>
            <button className="h-[46px] min-w-[120px] cursor-pointer rounded-lg border-0 bg-blue px-5 text-[13px] font-bold text-white hover:bg-[#0d50d3] max460:min-w-[100px] max460:px-3" type="button" onClick={() => { window.location.hash = '#ucp?returnTo=project-portal' }}>Choose File</button>
          </div>
          {uploadStorageError && <p className="mt-3 mb-0 text-[13px] text-[#bb3441]" role="alert">{uploadStorageError}</p>}

          {selectedProject && (
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[#dfe8f7] bg-white px-4 py-3" role="status">
              <div><strong className="block text-[14px]">{selectedProject.name}</strong><span className="mt-1 block text-[12px] text-[#73829a]">{selectedProject.learners} assigned learners · Due {selectedProject.date}</span></div>
              <button className="cursor-pointer border-0 bg-transparent text-2xl leading-none text-[#73829a]" type="button" aria-label="Close project details" onClick={() => setSelectedProject(null)}>×</button>
            </div>
          )}
          {notice && <p className="mt-3 mb-0 flex items-center gap-2 text-[13px] text-[#16825b]" role="status"><Check size={18} aria-hidden="true" />{notice}</p>}

          <a className="mt-6 inline-flex items-center gap-[10px] text-[14px] text-[#172b44] max460:text-[13px]" href="mailto:supervisor@godsent.com?subject=Project%20support"><Info className="shrink-0 text-[#144caf]" size={18} fill="currentColor" stroke="white" aria-hidden="true" /> <span>Click here to <strong className="font-semibold text-blue">contact your supervisor</strong></span></a>
        </div>

        <aside className="min-h-[420px] rounded-xl bg-portal-panel px-6 py-5 text-[#102541] max760:min-h-0" aria-labelledby="supervisor-title">
          <h2 id="supervisor-title" className="mt-0 mb-5 font-display text-[14px] font-extrabold uppercase leading-[1.2] text-[#0753de]">Supervisor Panel</h2>
          <div className="flex items-center gap-3 px-1 pb-5">
            <span className="grid size-[50px] shrink-0 place-items-center rounded-full bg-blue text-white"><UserRound size={22} fill="white" aria-hidden="true" /></span>
            <span><strong className="block text-[13px] font-bold uppercase text-[#1a2c41]">Abimbola</strong><small className="mt-0.5 block text-[11px] uppercase text-[#697c9b]">Supervisor</small></span>
          </div>
          <nav className="mb-6 mt-1 grid gap-1" aria-label="Supervisor actions">
            <div className="flex min-h-11 cursor-default items-center gap-3 rounded-lg border-0 bg-transparent px-2 text-left text-[14px] text-[#152b46] select-none"><BadgePlus className="shrink-0 text-blue" size={20} aria-hidden="true" /><span>Assign New Project</span></div>
            <div className="flex min-h-11 cursor-default items-center gap-3 rounded-lg border-0 bg-transparent px-2 text-left text-[14px] text-[#152b46] select-none"><FileText className="shrink-0 text-blue" size={18} fill="currentColor" aria-hidden="true" /><span>View All Projects</span></div>
          </nav>
          <div>
            <h3 className="mt-0 mb-[10px] text-[12px] font-semibold uppercase text-[#798ba6]">Supervisor Note</h3>
            <p className="m-0 min-h-[140px] rounded-lg bg-white p-4 text-[13px] leading-[1.6] text-[#607089]">Good Morning Godsent please, submit all pending project tomorrow.</p>
          </div>
        </aside>
      </div>

      <button className="absolute right-[-20px] bottom-10 grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-[#414448] hover:translate-y-0.5 max760:right-0 max760:bottom-3" type="button" aria-label="Scroll to the bottom of the portal" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={28} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}

export default Portal4
