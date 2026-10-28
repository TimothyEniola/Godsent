import { useEffect, useRef, useState } from 'react'
import { ArrowDown, BriefcaseBusiness, Camera, Globe2, Info, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { portalStyles as styles } from '../../components/portalStyles.js'
import { loadProfile, normalizeProfile, PROFILE_FIELDS, saveProfile } from '../../utils/profileStorage.js'

const MAX_PHOTO_SIZE = 5 * 1024 * 1024

const profileFields = [
  { key: 'name', label: 'Name', Icon: UserRound, autoComplete: 'name', maxLength: 100, required: true },
  { key: 'nationality', label: 'Nationality', Icon: Globe2, autoComplete: 'country-name', maxLength: 80 },
  { key: 'email', label: 'Email Address', Icon: Mail, type: 'email', autoComplete: 'email', maxLength: 254, required: true },
  { key: 'position', label: 'Position', Icon: BriefcaseBusiness, maxLength: 80 },
  { key: 'phone', label: 'Phone Number', Icon: Phone, type: 'tel', autoComplete: 'tel', maxLength: 32 },
  { key: 'location', label: 'Residential Address', Icon: MapPin, autoComplete: 'street-address', maxLength: 160 },
]

function EditProfilePage() {
  const photoInputRef = useRef(null)
  const [initialState] = useState(loadProfile)
  const [savedProfile, setSavedProfile] = useState(initialState.profile)
  const [draft, setDraft] = useState(initialState.profile)
  const [isSaved, setIsSaved] = useState(initialState.isSaved)
  const [feedback, setFeedback] = useState(initialState.error ? { type: 'error', message: initialState.error } : null)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [photoError, setPhotoError] = useState('')

  const isDirty = PROFILE_FIELDS.some((field) => draft[field] !== savedProfile[field])

  useEffect(() => {
    if (!avatarUrl) return undefined
    return () => URL.revokeObjectURL(avatarUrl)
  }, [avatarUrl])

  function updateDraft(event) {
    const { name, value } = event.target
    setDraft((current) => ({ ...current, [name]: value }))
    setFeedback(null)
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setPhotoError('Choose an image file for your profile photo.')
      event.target.value = ''
      return
    }

    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError('Choose a profile photo smaller than 5 MB.')
      event.target.value = ''
      return
    }

    try {
      setAvatarUrl(URL.createObjectURL(file))
      setPhotoError('')
    } catch {
      setPhotoError('This image could not be previewed in your browser.')
    }

    event.target.value = ''
  }

  function handleSave(event) {
    event.preventDefault()

    const normalizedDraft = normalizeProfile(draft)
    if (!normalizedDraft.name || !normalizedDraft.email) {
      setFeedback({ type: 'error', message: 'Enter a full name and email address before saving.' })
      return
    }

    const result = saveProfile(normalizedDraft)
    if (!result.isSaved) {
      setFeedback({ type: 'error', message: 'Could not save in this browser. Your changes are still in the form.' })
      return
    }

    setDraft(result.profile)
    setSavedProfile(result.profile)
    setIsSaved(true)
    setFeedback({ type: 'success', message: 'Saved in this browser for preview only. Your account profile was not updated.' })
  }

  function handleDiscard() {
    setDraft({ ...savedProfile })
    setFeedback(null)
  }

  return (
    <section className={styles.profilePage} aria-labelledby="edit-profile-title">
      <header className={styles.profileIntro}>
        <h1 id="edit-profile-title" className={styles.profileTitle}>Edit <span className="text-blue">Profile</span></h1>
        <input
          ref={photoInputRef}
          className="sr-only"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          aria-label="Choose a profile photo"
        />
        <button
          className={styles.profileAvatarButton}
          type="button"
          aria-label="Choose a profile photo"
          title="Choose a profile photo"
          onClick={() => photoInputRef.current?.click()}
        >
          {avatarUrl ? <img className={styles.profileAvatarImage} src={avatarUrl} alt="Local profile photo preview" /> : <Camera size={34} fill="currentColor" strokeWidth={2.2} aria-hidden="true" />}
        </button>
      </header>

      <form onSubmit={handleSave}>
        <div className={styles.profileDetails} role="group" aria-label="Editable profile details">
          {profileFields.map(({ key, label, Icon, type = 'text', autoComplete, maxLength, required }) => (
            <label className={styles.profileField} htmlFor={`edit-profile-${key}`} key={key}>
              <span className={styles.profileLabel}>{label}</span>
              <span className={styles.editProfileControl}>
                <Icon className={styles.profileFieldIcon} size={20} fill={key === 'nationality' ? 'currentColor' : 'none'} aria-hidden="true" />
                <input
                  className={styles.editProfileControlInput}
                  autoComplete={autoComplete}
                  id={`edit-profile-${key}`}
                  name={key}
                  type={type}
                  value={draft[key]}
                  onChange={updateDraft}
                  onFocus={(event) => event.currentTarget.select()}
                  maxLength={maxLength}
                  required={required}
                />
              </span>
            </label>
          ))}
        </div>

        <footer className={styles.profileFooter}>
          <div className={styles.editProfileActionGroup}>
            <button className={styles.editProfileSavePrompt} type="submit">
              <Info className="shrink-0 text-[#1546af]" size={18} fill="currentColor" stroke="white" aria-hidden="true" />
              <span>Click here to <strong className={styles.profileEditLink}>save</strong></span>
            </button>
            {isDirty && <button className={styles.editProfileDiscardLink} type="button" onClick={handleDiscard}>Discard changes</button>}
          </div>
          {feedback && <p className={`${styles.editProfileFeedback} ${feedback.type === 'error' ? styles.editProfileError : styles.editProfileSuccess}`} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.message}</p>}
          {!isSaved && !feedback && <p className={styles.profileSaveError} role="status">Profile changes are not saved in this browser.</p>}
        </footer>
      </form>

      {photoError && <p className={styles.profilePhotoError} role="alert">{photoError}</p>}

      <button className={styles.profileScrollCue} type="button" aria-label="Scroll to the bottom of the profile" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={28} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}

export default EditProfilePage
