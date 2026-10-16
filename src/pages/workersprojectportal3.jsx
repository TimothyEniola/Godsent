import { useRef, useState } from 'react'
import { ArrowDown, CircleCheck, FileArchive, X } from 'lucide-react'
import { WorkerSupervisorPanel } from '../components/Shared.jsx'
import { portalStyles as styles } from '../components/portalStyles.js'

const MAX_FILE_SIZE = 100 * 1024 * 1024
const ACCEPTED_EXTENSIONS = new Set(['pdf', 'docx', 'zip', 'jpg', 'jpeg', 'png'])
const sampleDetails = {
  projectDetails: 'Jamal Autism',
  learners: '5 Learners',
  dateAssigned: '6-04-2026',
  projectDuration: '2 Month',
  paymentAmount: '#27 X 5 = 135K',
}
const sampleFile = { name: 'Jamal Autism.zip', size: 1024 }

function formatFileSize(size) {
  if (size < 1024) return `${size} B`
  return `${Math.round(size / 1024)}K`
}

function WorkersProjectPortal3() {
  const fileInputRef = useRef(null)
  const [details, setDetails] = useState(sampleDetails)
  const [selectedFile, setSelectedFile] = useState(null)
  const [stagedUpload, setStagedUpload] = useState({ file: sampleFile, details: sampleDetails })
  const [isUploaded, setIsUploaded] = useState(true)
  const [localPreviewSent, setLocalPreviewSent] = useState(false)
  const [error, setError] = useState('')

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
      setStagedUpload(null)
      setIsUploaded(false)
      setLocalPreviewSent(false)
      setError('Choose a PDF, DOCX, ZIP, JPG, or PNG file.')
      event.target.value = ''
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null)
      setStagedUpload(null)
      setIsUploaded(false)
      setLocalPreviewSent(false)
      setError('Please choose a file no larger than 100 MB.')
      event.target.value = ''
      return
    }

    setSelectedFile(file)
    setStagedUpload(null)
    setIsUploaded(false)
    setLocalPreviewSent(false)
    setError('')
  }

  function handleRemoveFile() {
    setSelectedFile(null)
    setStagedUpload(null)
    setIsUploaded(false)
    setLocalPreviewSent(false)
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleSendFile() {
    if (!selectedFile) {
      fileInputRef.current?.click()
      return
    }

    setStagedUpload({ file: selectedFile, details: { ...details } })
    setIsUploaded(true)
    setLocalPreviewSent(true)
    setError('')
  }

  const fileToDisplay = selectedFile || stagedUpload?.file

  return (
    <section className={`${styles.workerUploadPage} ${styles.workerUploadSuccessPage}`} aria-label="Upload Workers Projects">
      <div className={styles.workerUploadSuccessGrid}>
        <WorkerSupervisorPanel />

        <div className="min-w-0" aria-labelledby="worker-upload-title">
          <div className={styles.workerUploadForm} role="group" aria-label="Project details">
            <label className={`${styles.workerUploadField} ${styles.workerUploadWideField}`} htmlFor="worker-upload-success-project">
              <span className={styles.workerUploadLabel}>1. Project Details</span>
              <input className={styles.workerUploadInput} id="worker-upload-success-project" name="projectDetails" value={details.projectDetails} onChange={handleDetailsChange} />
            </label>
            <label className={styles.workerUploadField} htmlFor="worker-upload-success-learners">
              <span className={styles.workerUploadLabel}>2. Learners</span>
              <input className={styles.workerUploadInput} id="worker-upload-success-learners" name="learners" inputMode="numeric" value={details.learners} onChange={handleDetailsChange} />
            </label>
            <label className={styles.workerUploadField} htmlFor="worker-upload-success-date">
              <span className={styles.workerUploadLabel}>3. Date Assigned</span>
              <input className={styles.workerUploadInput} id="worker-upload-success-date" name="dateAssigned" inputMode="numeric" value={details.dateAssigned} onChange={handleDetailsChange} />
            </label>
            <label className={styles.workerUploadField} htmlFor="worker-upload-success-duration">
              <span className={styles.workerUploadLabel}>4. Project Duration</span>
              <input className={styles.workerUploadInput} id="worker-upload-success-duration" name="projectDuration" value={details.projectDuration} onChange={handleDetailsChange} />
            </label>
            <label className={styles.workerUploadField} htmlFor="worker-upload-success-amount">
              <span className={styles.workerUploadLabel}>5. Project Payment Amount</span>
              <input className={styles.workerUploadInput} id="worker-upload-success-amount" name="paymentAmount" inputMode="decimal" value={details.paymentAmount} onChange={handleDetailsChange} />
            </label>
          </div>

          <div className={styles.workerUploadSuccessBox}>
            <FileArchive className="shrink-0" size={30} fill="currentColor" aria-hidden="true" />
            <div className={styles.workerUploadFileMeta}>
              <span className={styles.workerUploadFileRow}>
                <strong className={styles.workerUploadFileName}>{fileToDisplay ? `${fileToDisplay.name} (${formatFileSize(fileToDisplay.size)})` : 'Choose a project file'}</strong>
                {fileToDisplay && (
                  <button className={styles.workerUploadRemoveButton} type="button" aria-label={`Remove ${fileToDisplay.name}`} onClick={handleRemoveFile}>
                    <X size={16} aria-hidden="true" />
                  </button>
                )}
              </span>
              <span className={styles.workerUploadFileStatus}>{isUploaded ? 'successfully uploaded' : fileToDisplay ? 'ready to send' : 'PDF, DOCX, ZIP, JPG, PNG · Max 100MB'}</span>
            </div>
            <input ref={fileInputRef} className={styles.fileInput} type="file" accept=".pdf,.docx,.zip,.jpg,.jpeg,.png" onChange={handleFileChange} aria-label="Choose a completed project file" />
            <button className={styles.workerUploadSendButton} type="button" onClick={handleSendFile}>Send File</button>
          </div>

          {error ? (
            <p className={styles.workerUploadError} role="alert">{error}</p>
          ) : isUploaded ? (
            <p className={styles.workerUploadSuccessNotice} role="status">
              <span>Project uploaded and <strong className="font-semibold text-blue">successfully</strong></span>
              <CircleCheck className="shrink-0 text-success" size={20} fill="currentColor" stroke="white" strokeWidth={2.5} aria-hidden="true" />
              {!localPreviewSent && <span className="sr-only">This is a local preview; no server upload was made.</span>}
            </p>
          ) : null}
          {stagedUpload && <span className="sr-only" aria-live="polite">{stagedUpload.file.name} and its project details are staged locally.</span>}
          {localPreviewSent && <p className={styles.workerUploadPreviewNotice} role="status">This is a local preview only; no server upload was made.</p>}
        </div>
      </div>

      <button className={styles.workerUploadScrollCue} type="button" aria-label="Scroll to the bottom of the page" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={28} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}

export default WorkersProjectPortal3
