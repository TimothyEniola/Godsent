export const ASSIGNED_PROJECTS_KEY = 'godsent-assigned-projects'

export function readAssignedProjects() {
  try {
    const savedValue = window.localStorage.getItem(ASSIGNED_PROJECTS_KEY)
    if (!savedValue) return []

    const projects = JSON.parse(savedValue)
    if (!Array.isArray(projects)) return []

    return projects.filter((project) => (
      project
      && typeof project.id === 'string'
      && typeof project.name === 'string'
      && Number.isInteger(project.learners)
      && typeof project.date === 'string'
      && typeof project.fileName === 'string'
    ))
  } catch {
    return []
  }
}

export function saveAssignedProject(project) {
  const savedProject = {
    id: `assigned-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: project.projectDetails.trim(),
    learners: Number(project.learners),
    date: project.date,
    duration: project.duration.trim(),
    paymentAccount: project.paymentAccount.trim(),
    fileName: project.file.name,
    fileSize: project.file.size,
    status: 'pending',
    assignedAt: new Date().toISOString(),
  }

  const projects = readAssignedProjects()

  try {
    window.localStorage.setItem(ASSIGNED_PROJECTS_KEY, JSON.stringify([savedProject, ...projects]))
  } catch (error) {
    throw new Error('The project could not be saved in this browser.', { cause: error })
  }

  return savedProject
}

export function loadWorkerAssignedProjects(defaultProjects) {
  const assignedProjects = readAssignedProjects().map((project) => ({
    ...project,
    amount: project.paymentAccount || '—',
  }))
  const assignedNames = new Set(assignedProjects.map((project) => project.name.trim().toLowerCase()))

  return [
    ...assignedProjects,
    ...defaultProjects.filter((project) => !assignedNames.has(project.name.trim().toLowerCase())),
  ]
}