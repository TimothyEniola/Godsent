import { useRef, useState } from 'react'
import { ArrowDown, Check, CloudUpload } from 'lucide-react'
import { WorkerSupervisorPanel } from '../components/Shared.jsx'
import { portalStyles as styles } from '../components/portalStyles.js'

const MAX_FILE_SIZE = 100 * 1024 * 1024
const ACCEPTED_EXTENSIONS = new Set(['pdf', 'docx', 'zip', 'jpg', 'jpeg', 'png'])

const initialDetails = {
  projectDetails: '',
  learners: '',
  dateAssigned: '',
  projectDuration: '',
  paymentAmount: '',
}

const projectFields = [
  { name: 'projectDetails', label: '1. Project Details', type: 'text', wide: true },
  { name: 'learners', label: '2. Learners', type: 'number', min: '1' },
  { name: 'dateAssigned', label: '3. Date Assigned', type: 'text', inputMode: 'numeric' },
  { name: 'projectDuration', label: '4. Project Duration', type: 'text' },
  { name: 'paymentAmount', label: '5. Project Payment Amount', type: 'text', inputMode: 'decimal' },
]

function WorkersProjectPortal4() {
  const fileInputRef = useRef(null)
  const [details, setDetails] = useState(initialDetails)
  const [selectedFile, setSelectedFile] = useState(null)
  const [stagedUpload, setStagedUpload] = useState(null)
  const [notice, setNotice] = useState(null)

  function handleDetailsChange(event) {
    const { name, value } = event.target
    setDetails((current) => ({ ...current, [name]: value }))
  }

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
      setNotice({ type: 'error', message: 'Please choose a file no larger than 100 MB.' })
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

    setStagedUpload({ file: selectedFile, details: { ...details } })
    setNotice({
      type: 'success',
      message: `${selectedFile.name} and the project details are staged in this preview. No server upload was made.`,
    })
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <section className={`${styles.workerUploadPage} ${styles.workerUploadPageWidth}`} aria-label="Upload Workers Projects">
      <div className={styles.workerUploadGrid}>
        <WorkerSupervisorPanel />

        <div className="min-w-0" aria-labelledby="worker-upload-title">
          <div className={styles.workerUploadForm} role="group" aria-label="Project details">
            {projectFields.map((field) => (
              <label className={`${styles.workerUploadField} ${field.wide ? styles.workerUploadWideField : ''}`} htmlFor={`worker-upload-${field.name}`} key={field.name}>
                <span className={styles.workerUploadLabel}>{field.label}</span>
                <input
                  className={styles.workerUploadInput}
                  id={`worker-upload-${field.name}`}
                  name={field.name}
                  type={field.type}
                  inputMode={field.inputMode}
                  min={field.min}
                  value={details[field.name]}
                  onChange={handleDetailsChange}
                />
              </label>
            ))}
          </div>

          <div className={styles.workerUploadBox}>
            <CloudUpload className="shrink-0" size={25} strokeWidth={1.8} aria-hidden="true" />
            <div className={styles.uploadCopy}>
              <strong className={styles.uploadTitle}>{selectedFile ? selectedFile.name : stagedUpload ? `Staged: ${stagedUpload.file.name}` : 'Upload Completed Project'}</strong>
              <span className={styles.uploadHelp}>Supported formats PDF, DOCX, ZIP, JPG, PNG (Max 100MB)</span>
            </div>
            <input
              ref={fileInputRef}
              className={styles.fileInput}
              type="file"
              accept=".pdf,.docx,.zip,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              aria-label="Choose a completed project file"
            />
            <button className={styles.chooseFile} type="button" onClick={handleUpload}>
              {selectedFile ? 'Upload File' : 'Choose File'}
            </button>
          </div>

          {notice && (
            <p className={`${styles.notice} ${notice.type === 'error' ? styles.errorNotice : ''}`} role={notice.type === 'error' ? 'alert' : 'status'}>
              {notice.type !== 'error' && <Check className="shrink-0" size={13} aria-hidden="true" />}
              {notice.message}
            </p>
          )}
        </div>
      </div>

      <button
        className={styles.workerUploadScrollCue}
        type="button"
        aria-label="Scroll to the bottom of the page"
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
      >
        <ArrowDown size={19} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}

export default WorkersProjectPortal4
