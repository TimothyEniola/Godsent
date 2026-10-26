const PROJECT_UPLOADS_KEY = 'godsent-project-uploads'

export function readProjectUploads() {
  try {
    const serializedUploads = window.localStorage.getItem(PROJECT_UPLOADS_KEY)
    if (!serializedUploads) return []

    const uploads = JSON.parse(serializedUploads)
    if (!Array.isArray(uploads) || uploads.some((upload) => (
      !upload
      || typeof upload.id !== 'string'
      || typeof upload.name !== 'string'
      || !Number.isInteger(upload.learners)
      || typeof upload.date !== 'string'
      || typeof upload.fileName !== 'string'
    ))) {
      throw new Error('Saved project submissions are not in the expected format.')
    }
    return uploads
  } catch (error) {
    if (error instanceof Error && error.message === 'Saved project submissions are not in the expected format.') {
      throw error
    }
    throw new Error('Saved project submissions could not be read from this browser.', { cause: error })
  }
}

export function saveProjectUpload(upload) {
  const uploads = readProjectUploads()
  const savedUpload = {
    ...upload,
    id: `upload-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    submittedAt: new Date().toISOString(),
  }

  try {
    window.localStorage.setItem(PROJECT_UPLOADS_KEY, JSON.stringify([savedUpload, ...uploads]))
  } catch (error) {
    throw new Error('The project submission could not be saved in this browser.', { cause: error })
  }

  return savedUpload
}

export function deleteProjectUpload(uploadId) {
  const uploads = readProjectUploads()
  const remainingUploads = uploads.filter((upload) => upload.id !== uploadId)

  try {
    window.localStorage.setItem(PROJECT_UPLOADS_KEY, JSON.stringify(remainingUploads))
  } catch (error) {
    throw new Error('The project submission could not be removed from this browser.', { cause: error })
  }

  return remainingUploads
}
