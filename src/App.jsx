import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import SignIn from './pages/signin.jsx'
import Portal4 from './pages/Portal4.jsx'
import Portal5 from './pages/Portal5.jsx'
import Portal6 from './pages/Portal6.jsx'
import ChatRoom from './pages/ChatRoom.jsx'
import Meetingroom from './pages/Meetingroom.jsx'

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
  const isProjectsRoute = isPortal4Route || isPortal5Route || isPortal6Route

  return (
    <main className={`grid min-h-svh justify-items-center items-stretch p-[7px] max600:p-[5px] ${isProjectsRoute ? 'p-1' : ''}`}>
      <div className={`relative flex min-h-[calc(100svh-14px)] w-[min(1440px,100%)] flex-col overflow-hidden rounded-[15px] bg-surface max600:min-h-[calc(100svh-10px)] max600:rounded-xl ${isProjectsRoute ? 'min-h-[calc(100svh-8px)]' : ''}`}>
        <Navbar key={currentPath} currentPath={isProjectsRoute ? '#project-portal' : currentPath} />
        {isMeetingRoomRoute ? <Meetingroom /> : isChatRoomRoute ? <ChatRoom /> : isPortal6Route ? <Portal6 /> : isPortal5Route ? <Portal5 /> : isPortal4Route ? <Portal4 /> : <SignIn />}
      </div>
    </main>
  )
}

export default App
