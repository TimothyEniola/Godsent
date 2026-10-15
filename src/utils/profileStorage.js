export const PROFILE_STORAGE_KEY = 'godsent-profile-preview'

export const DEFAULT_PROFILE = Object.freeze({
  name: 'Igho Godsent',
  nationality: 'Nigeria',
  email: 'godsentprojectteam@gmail.com',
  position: 'Worker',
  phone: '+234 808 937 3464',
  location: '53, Ikeja, Lagos State, Nigeria',
  bio: '',
})

export const PROFILE_FIELDS = Object.keys(DEFAULT_PROFILE)

export function normalizeProfile(profile) {
  return PROFILE_FIELDS.reduce((normalized, field) => {
    normalized[field] = typeof profile[field] === 'string' ? profile[field].trim() : ''
    return normalized
  }, {})
}

export function saveProfile(profile) {
  const normalizedProfile = normalizeProfile(profile)

  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(normalizedProfile))
    return { profile: normalizedProfile, isSaved: true, error: null }
  } catch {
    return {
      profile: normalizedProfile,
      isSaved: false,
      error: 'Could not save the profile in this browser.',
    }
  }
}

export function loadProfile() {
  try {
    const savedValue = window.localStorage.getItem(PROFILE_STORAGE_KEY)
    if (savedValue === null) return saveProfile(DEFAULT_PROFILE)

    const parsedValue = JSON.parse(savedValue)
    if (!parsedValue || typeof parsedValue !== 'object' || Array.isArray(parsedValue)) {
      throw new TypeError('Saved profile data is invalid.')
    }

    const profile = PROFILE_FIELDS.reduce((merged, field) => {
      if (typeof parsedValue[field] === 'string') merged[field] = parsedValue[field]
      return merged
    }, { ...DEFAULT_PROFILE })

    return { profile, isSaved: true, error: null }
  } catch {
    return {
      profile: { ...DEFAULT_PROFILE },
      isSaved: false,
      error: 'Could not load the profile from this browser.',
    }
  }
}
