import { useRef, useState } from 'react'
import { ArrowDown, FileArchive, Info, Send, UserRound, X } from 'lucide-react'
import { saveProjectUpload } from '../../utils/projectUploads.js'

const MAX_FILE_SIZE = 100 * 1024 * 1024
const ACCEPTED_EXTENSIONS = new Set(['pdf', 'docx', 'zip', 'jpg', 'jpeg', 'png'])
const WORKER_NOTE_KEY = 'godsent-worker-note'

function getReturnPath() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  const returnTo = params.get('returnTo')
  return ['portal5', 'portal6'].includes(returnTo) ? `#${returnTo}` : '#project-portal'
}

function Ucp() {
  const fileInputRef = useRef(null)
  const [projectDetails, setProjectDetails] = useState('')
  const [learners, setLearners] = useState('')
  const [uploadedDate, setUploadedDate] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [notice, setNotice] = useState('')
  const [workerNote, setWorkerNote] = useState('')
  const [noteNotice, setNoteNotice] = useState('')
  const returnPath = getReturnPath()

  function handleSendNote() {
    const note = workerNote.trim()
    if (!note) {
      setNoteNotice('Write a note before sending.')
      return
    }

    try {
      window.localStorage.setItem(WORKER_NOTE_KEY, note)
      setWorkerNote(note)
      setNoteNotice('Note saved.')
    } catch (error) {
      setNoteNotice(error instanceof Error ? `The note could not be saved: ${error.message}` : 'The note could not be saved in this browser.')
    }
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !ACCEPTED_EXTENSIONS.has(extension)) {
      setSelectedFile(null)
      event.target.value = ''
      setNotice('Choose a PDF, DOCX, ZIP, JPG, or PNG file.')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null)
      event.target.value = ''
      setNotice('Choose a file smaller than 100 MB.')
      return
    }

    setSelectedFile(file)
    setNotice('')
  }

  function handleRemoveFile() {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!selectedFile) {
      fileInputRef.current?.click()
      return
    }

    const learnerCount = Number(learners)
    if (!Number.isInteger(learnerCount) || learnerCount < 1) {
      setNotice('Enter a valid number of learners.')
      return
    }

    try {
      saveProjectUpload({
        name: projectDetails.trim(),
        learners: learnerCount,
        date: new Intl.DateTimeFormat('en-GB').format(new Date(`${uploadedDate}T00:00:00`)).replaceAll('/', '-'),
        fileName: selectedFile.name,
      })
      window.location.hash = `#pus?returnTo=${encodeURIComponent(returnPath.slice(1))}`
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'The project submission could not be saved.')
    }
  }

  const fieldClassName = 'h-[50px] w-full min-w-0 rounded-lg border border-transparent bg-field px-4 text-[14px] text-[#203247] placeholder:text-[#98a4b6] focus:border-[#8ab0ff] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue/15'

  return (
    <section className="relative mx-auto mt-[-8px] w-[min(92%,1200px)] flex-1 pb-14 text-[#15283f] max620:mt-[-4px] max620:w-[90%] max620:pb-12 max460:w-[94%]" aria-labelledby="ucp-title">
      <header className="mb-7">
        <h1 id="ucp-title" className="m-0 font-display text-[30px] font-extrabold leading-[1.12] tracking-[-.05em] text-[#203247] max460:text-2xl">Hello, <span className="text-blue">Godsent!</span></h1>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)_clamp(220px,24vw,300px)] items-start gap-[clamp(32px,5vw,56px)] max620:grid-cols-1 max620:gap-6">
        <form className="min-w-0" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-7 gap-y-5 max460:grid-cols-1 max460:gap-y-4">
            <label className="col-span-2 grid min-w-0 gap-2 max460:col-span-1" htmlFor="ucp-project-details">
              <span className="pl-1 font-display text-[13px] font-extrabold leading-[1.2] text-blue">1. Project Details</span>
              <input className={fieldClassName} id="ucp-project-details" name="projectDetails" value={projectDetails} onChange={(event) => setProjectDetails(event.target.value)} placeholder="Enter project details" maxLength={100} required />
            </label>
            <label className="grid min-w-0 gap-2" htmlFor="ucp-learners">
              <span className="pl-1 font-display text-[13px] font-extrabold leading-[1.2] text-blue">2. Learners</span>
              <input className={fieldClassName} id="ucp-learners" name="learners" type="number" min="1" step="1" inputMode="numeric" value={learners} onChange={(event) => setLearners(event.target.value)} placeholder="Enter number of learners" required />
            </label>
            <label className="grid min-w-0 gap-2" htmlFor="ucp-date-uploaded">
              <span className="pl-1 font-display text-[13px] font-extrabold leading-[1.2] text-blue">3. Date Uploaded</span>
              <input className={fieldClassName} id="ucp-date-uploaded" name="dateUploaded" type="date" value={uploadedDate} onChange={(event) => setUploadedDate(event.target.value)} required />
            </label>
          </div>

          <div className="mt-[clamp(48px,12vh,100px)] flex min-h-[96px] min-w-0 items-center gap-4 rounded-xl bg-field px-6 py-5 text-blue max620:mt-10 max460:gap-3 max460:px-3">
            <FileArchive className="shrink-0" size={30} fill="currentColor" aria-hidden="true" />
            <div className="grid min-w-0 flex-1 gap-1">
              <div className="flex min-w-0 items-center gap-2">
                <strong className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-bold">{selectedFile?.name || 'Choose a project document'}</strong>
                {selectedFile && <button className="grid size-5 shrink-0 cursor-pointer place-items-center rounded border-0 bg-[#172b44] p-0 text-white hover:bg-blue" type="button" aria-label={`Remove ${selectedFile.name}`} onClick={handleRemoveFile}><X size={14} aria-hidden="true" /></button>}
              </div>
              <span className="text-[12px] text-[#8190a8]">{selectedFile ? 'Ready to send' : 'PDF, DOCX, ZIP, JPG, PNG · Max 100 MB'}</span>
            </div>
            <input ref={fileInputRef} className="sr-only" type="file" accept=".pdf,.docx,.zip,.jpg,.jpeg,.png" onChange={handleFileChange} aria-label="Choose project document" />
            <button className="min-h-[46px] min-w-[120px] shrink-0 cursor-pointer rounded-lg border-0 bg-blue px-5 text-[13px] font-bold text-white transition-[background,transform] hover:-translate-y-px hover:bg-blue-dark focus-visible:outline-2 focus-visible:outline-blue/40 focus-visible:outline-offset-2 max460:min-w-[96px] max460:px-3" type={selectedFile ? 'submit' : 'button'} onClick={!selectedFile ? () => fileInputRef.current?.click() : undefined}>{selectedFile ? 'Send File' : 'Choose File'}</button>
          </div>
          {notice && <p className="mt-3 mb-0 text-[13px] leading-[1.4] text-[#bb3441]" role="alert">{notice}</p>}
          <p className="mt-3 mb-0 flex items-start gap-2 text-[12px] leading-[1.5] text-[#73829a]"><Info className="mt-0.5 shrink-0 text-blue" size={15} aria-hidden="true" />This prototype saves submission details in this browser. Sending the document to the admin requires a server upload service.</p>
        </form>

        <aside className="min-h-[272px] rounded-xl bg-portal-panel px-6 py-5 text-[#102541] max620:min-h-0" aria-labelledby="ucp-worker-panel-title">
          <h2 id="ucp-worker-panel-title" className="mt-0 mb-5 font-display text-[14px] font-extrabold uppercase leading-[1.2] text-[#0753de]">Worker’s Panel</h2>
          <div className="flex items-center gap-3 px-1 pb-5">
            <span className="grid size-[50px] shrink-0 place-items-center rounded-full bg-blue text-white"><UserRound size={22} fill="white" aria-hidden="true" /></span>
            <span><strong className="block text-[13px] font-bold uppercase text-[#1a2c41]">Godsent</strong><small className="mt-0.5 block text-[11px] uppercase text-[#697c9b]">Worker</small></span>
          </div>
          <h3 className="mt-0 mb-[10px] text-[12px] font-semibold uppercase text-[#798ba6]">Worker’s Note</h3>
          <div className="relative">
            <textarea className="m-0 min-h-[116px] w-full resize-y rounded-lg border border-transparent bg-white p-4 pr-12 text-[13px] leading-[1.6] text-[#607089] focus:border-[#8ab0ff] focus:outline-none focus:ring-2 focus:ring-blue/15" aria-label="Worker’s note to the supervisor" value={workerNote} onChange={(event) => { setWorkerNote(event.target.value); setNoteNotice('') }} maxLength={500} />
            <button className="absolute right-3 bottom-3 grid size-[26px] cursor-pointer place-items-center rounded-md border-0 bg-blue p-0 text-white transition-colors hover:bg-blue-dark focus-visible:outline-2 focus-visible:outline-blue/50 focus-visible:outline-offset-2" type="button" aria-label="Send worker’s note" onClick={handleSendNote}>
              <Send size={14} fill="currentColor" aria-hidden="true" />
            </button>
          </div>
          {noteNotice && <p className={`mt-2 mb-0 text-[12px] ${noteNotice === 'Note saved.' ? 'text-success' : 'text-[#bb3441]'}`} role={noteNotice === 'Note saved.' ? 'status' : 'alert'}>{noteNotice}</p>}
        </aside>
      </div>

      <button className="absolute right-[-20px] bottom-8 grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-[#414448] transition-transform hover:translate-y-0.5 max620:right-0 max620:bottom-1" type="button" aria-label="Scroll to the bottom of the upload form" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={28} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}

export default Ucp
