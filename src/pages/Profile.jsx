import { useEffect, useRef, useState } from 'react'
import { ArrowDown, BriefcaseBusiness, Camera, CircleCheck, Globe2, Info, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { portalStyles as styles } from '../components/portalStyles.js'
import { loadProfile } from '../utils/profileStorage.js'

const MAX_PHOTO_SIZE = 5 * 1024 * 1024

const profileFields = [
  { key: 'name', label: 'Name', Icon: UserRound },
  { key: 'nationality', label: 'Nationality', Icon: Globe2 },
  { key: 'email', label: 'Email Address', Icon: Mail },
  { key: 'position', label: 'Position', Icon: BriefcaseBusiness },
  { key: 'phone', label: 'Phone Number', Icon: Phone },
  { key: 'location', label: 'Residential Address', Icon: MapPin },
]

function Profile() {
  const photoInputRef = useRef(null)
  const [profileState] = useState(loadProfile)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [photoError, setPhotoError] = useState('')

  useEffect(() => {
    if (!avatarUrl) return undefined
    return () => URL.revokeObjectURL(avatarUrl)
  }, [avatarUrl])

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

  return (
    <section className={styles.profilePage} aria-labelledby="profile-page-title">
      <header className={styles.profileIntro}>
        <h1 id="profile-page-title" className={styles.profileTitle}>My Profile</h1>
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
          {avatarUrl ? <img className={styles.profileAvatarImage} src={avatarUrl} alt="Local profile photo preview" /> : <Camera size={23} fill="currentColor" strokeWidth={2.2} aria-hidden="true" />}
        </button>
      </header>

      <dl className={styles.profileDetails}>
        {profileFields.map(({ key, label, Icon }) => (
          <div className={styles.profileField} key={key}>
            <dt className={styles.profileLabel}>{label}</dt>
            <dd className={styles.profileValue}>
              <Icon className={styles.profileFieldIcon} size={14} fill={key === 'nationality' ? 'currentColor' : 'none'} aria-hidden="true" />
              <span className={styles.profileFieldText}>{profileState.profile[key] || '—'}</span>
            </dd>
          </div>
        ))}
      </dl>

      <footer className={styles.profileFooter}>
        <p className={styles.profileEditPrompt}>
          <Info className="shrink-0 text-[#1546af]" size={13} fill="currentColor" stroke="white" aria-hidden="true" />
          <span>Click here to <a className={styles.profileEditLink} href="#edit-profile">edit profile</a></span>
        </p>
        {profileState.isSaved ? (
          <p className={styles.profileSaved} role="status">
            <span>Profile <strong>saved</strong></span>
            <CircleCheck size={14} fill="currentColor" stroke="white" strokeWidth={2.5} aria-hidden="true" />
            <span className="sr-only">This profile is saved in this browser preview only.</span>
          </p>
        ) : (
          <p className={styles.profileSaveError} role="alert">{profileState.error || 'Profile is not saved in this browser.'}</p>
        )}
      </footer>
      {photoError && <p className={styles.profilePhotoError} role="alert">{photoError}</p>}
      <button className={styles.profileScrollCue} type="button" aria-label="Scroll to the bottom of the profile" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={19} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}

export default Profile
