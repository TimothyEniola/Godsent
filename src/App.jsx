import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import SignIn from './pages/Workers/signin.jsx'
import Portal4 from './pages/Workers/Portal4.jsx'
import Portal5 from './pages/Workers/Portal5.jsx'
import Portal6 from './pages/Workers/Portal6.jsx'
import ChatRoom from './pages/Workers/ChatRoom.jsx'
import Meetingroom from './pages/Workers/Meetingroom.jsx'
import CompleteOrPendingWorkersProject from './pages/Admin/completeorpendingworkersproject.jsx'
import WorkersProjectPortal3 from './pages/Admin/workersprojectportal3.jsx'
import WorkersComplaintNote from './pages/Admin/Workerscomplaintnote.jsx'
import EditProfilePage from './pages/Workers/EditProfilePage.jsx'
import Profile from './pages/Workers/Profile.jsx'
import PaymentStatus from './pages/Workers/PaymentStatus.jsx'

function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.hash || '#signin')

  useEffect(() => {
    if (!window.location.hash) window.location.hash = '#signin'

    const syncRoute = () => setCurrentPath(window.location.hash || '#signin')
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  const normalizedPath = currentPath.toLowerCase()
  const isPortal4Route = ['#project-portal', '#portal4', '#projects'].includes(normalizedPath)
  const isPortal5Route = normalizedPath === '#portal5'
  const isPortal6Route = normalizedPath === '#portal6'
  const isChatRoomRoute = normalizedPath === '#meeting-chat'
  const isMeetingRoomRoute = normalizedPath === '#meeting-room'
  const isWorkerProjectsRoute = ['#completeorpendingworkersproject', '#complete-or-pending-workers-project'].includes(normalizedPath)
  const isWorkerUploadRoute = ['#workersprojectportal4', '#upload-workers-projects'].includes(normalizedPath)
  const isWorkerUploadSuccessRoute = ['#workersprojectportal3', '#upload-workers-projects-success'].includes(normalizedPath)
  const isWorkerComplaintRoute = ['#workerscomplaintnote', '#workers-complaint-note'].includes(normalizedPath)
  const isProfileRoute = normalizedPath === '#profile'
  const isEditProfileRoute = normalizedPath === '#edit-profile'
  const isPaymentStatusRoute = normalizedPath === '#payment-status'
  const isProjectsRoute = isPortal4Route || isPortal5Route || isPortal6Route || isWorkerProjectsRoute || isWorkerUploadRoute || isWorkerUploadSuccessRoute || isWorkerComplaintRoute

  return (
    <main className={`grid min-h-svh justify-items-center items-stretch p-[12px] max600:p-[8px] ${isProjectsRoute ? 'p-2' : ''} ${isWorkerUploadRoute || isWorkerUploadSuccessRoute || isWorkerComplaintRoute ? 'bg-canvas' : ''}`}>
      <div className={`relative flex min-h-[calc(100svh-24px)] w-[min(1440px,100%)] flex-col overflow-hidden rounded-2xl bg-surface max600:min-h-[calc(100svh-16px)] max600:rounded-xl ${isProjectsRoute ? 'min-h-[calc(100svh-16px)]' : ''}`}>
        <Navbar key={currentPath} currentPath={isProjectsRoute ? '#project-portal' : isProfileRoute || isEditProfileRoute ? '#profile' : currentPath} pageTitle={isWorkerComplaintRoute ? 'Workers Complaint Portal' : isWorkerUploadRoute || isWorkerUploadSuccessRoute ? 'Upload Workers Projects' : undefined} />
        {isPaymentStatusRoute ? <PaymentStatus /> : isProfileRoute ? <Profile /> : isEditProfileRoute ? <EditProfilePage /> : isWorkerComplaintRoute ? <WorkersComplaintNote /> : isWorkerUploadSuccessRoute || isWorkerUploadRoute ? <WorkersProjectPortal3 /> : isWorkerProjectsRoute ? <CompleteOrPendingWorkersProject /> : isMeetingRoomRoute ? <Meetingroom /> : isChatRoomRoute ? <ChatRoom /> : isPortal6Route ? <Portal6 /> : isPortal5Route ? <Portal5 /> : isPortal4Route ? <Portal4 /> : <SignIn />}
      </div>
    </main>
  )
}

export default App
