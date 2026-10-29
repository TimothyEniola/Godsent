export const PROFILE_STORAGE_KEY = 'godsent-profile-preview'
export const WORKER_DIRECTORY_KEY = 'godsent-worker-directory-preview'

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

const EMPTY_WORKER_PROFILE = Object.freeze({
  nationality: '',
  email: '',
  position: '',
  phone: '',
  location: '',
  bio: '',
})

const DEFAULT_WORKERS = [
  { id: 'igho-godsent', ...DEFAULT_PROFILE },
  { id: 'sarah-johnson', ...EMPTY_WORKER_PROFILE, name: 'Sarah Johnson' },
  { id: 'kolawole-isaac', ...EMPTY_WORKER_PROFILE, name: 'Kolawole Isaac' },
  { id: 'chidima-ruth', ...EMPTY_WORKER_PROFILE, name: 'Chidima Ruth' },
  { id: 'peace-edafe', ...EMPTY_WORKER_PROFILE, name: 'Peace Edafe' },
]

function readWorkerDirectory() {
  const savedValue = window.localStorage.getItem(WORKER_DIRECTORY_KEY)
  if (savedValue === null) return DEFAULT_WORKERS.map((worker) => ({ ...worker }))

  const parsedValue = JSON.parse(savedValue)
  if (!Array.isArray(parsedValue)) throw new TypeError('Saved worker directory is invalid.')

  return DEFAULT_WORKERS.map((defaultWorker) => {
    const savedWorker = parsedValue.find((worker) => worker?.id === defaultWorker.id)
    if (!savedWorker || typeof savedWorker !== 'object') return { ...defaultWorker }

    return PROFILE_FIELDS.reduce((worker, field) => {
      if (typeof savedWorker[field] === 'string') worker[field] = savedWorker[field]
      return worker
    }, { ...defaultWorker })
  })
}

export function loadWorkerAccounts() {
  const workers = readWorkerDirectory()

  try {
    const savedProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY)
    if (savedProfile === null) return workers

    const parsedProfile = JSON.parse(savedProfile)
    const savedWorkerProfile = normalizeProfile(parsedProfile)
    return workers.map((worker) => worker.id === 'igho-godsent'
      ? { ...worker, ...savedWorkerProfile }
      : worker)
  } catch {
    return workers
  }
}

export function normalizeProfile(profile) {
  return PROFILE_FIELDS.reduce((normalized, field) => {
    normalized[field] = typeof profile[field] === 'string' ? profile[field].trim() : ''
    return normalized
  }, {})
}

export function saveProfile(profile) {
  const normalizedProfile = normalizeProfile(profile)

  try {
    const workers = readWorkerDirectory()
    const synchronizedWorkers = workers.map((worker) => worker.id === 'igho-godsent'
      ? { ...worker, ...normalizedProfile }
      : worker)

    window.localStorage.setItem(WORKER_DIRECTORY_KEY, JSON.stringify(synchronizedWorkers))
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
