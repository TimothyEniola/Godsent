import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  Megaphone,
  Paperclip,
  Send,
  Smile,
  UsersRound,
  X,
} from 'lucide-react'

const workers = [
  { id: 'sarah', name: 'Sarah Johnson', role: 'Worker', avatar: 'https://i.pravatar.cc/96?u=sarah-johnson', online: true },
  { id: 'igho', name: 'Igho Godsent', role: 'Worker', avatar: 'https://i.pravatar.cc/96?u=igho-godsent', online: true },
  { id: 'isaac', name: 'Isaac kolawole', role: 'Worker', avatar: 'https://i.pravatar.cc/96?u=isaac-kolawole', online: true },
]

const initialConversations = {
  team: [
    { id: 'team-sarah-1', senderId: 'sarah', senderName: 'Sarah Johnson', avatar: workers[0].avatar, time: '10:12 AM', text: 'Good morning team! 🔔 How are we all doing? Hope we all had a good night rest?' },
    { id: 'team-igho-1', senderId: 'igho', senderName: 'Igho Godsent', avatar: workers[1].avatar, time: '10:12 AM', text: 'Good morning Sarah! 🔔 My night was great, I hope yours was great also?' },
    { id: 'team-me-1', senderId: 'me', senderName: 'You', avatar: 'https://i.pravatar.cc/96?u=godsent-user', time: '11:10 AM', text: 'Good Morning!\nMy night was splendid, thank you!\nAny update for today?' },
  ],
  sarah: [
    { id: 'sarah-direct-1', senderId: 'sarah', senderName: 'Sarah Johnson', avatar: workers[0].avatar, time: '10:12 AM', text: 'Good morning! Let me know if you need anything for today.' },
  ],
  igho: [
    { id: 'igho-direct-1', senderId: 'igho', senderName: 'Igho Godsent', avatar: workers[1].avatar, time: '10:12 AM', text: 'Good morning! I am online and ready for today.' },
  ],
  isaac: [
    { id: 'isaac-direct-1', senderId: 'isaac', senderName: 'Isaac kolawole', avatar: workers[2].avatar, time: '10:12 AM', text: 'Hello team, hope everyone is having a good day.' },
  ],
}

const quickEmojis = ['🙂', '👋', '👍', '🎉', '❤️']

function ChatRoom() {
  const [activeConversation, setActiveConversation] = useState('team')
  const [conversations, setConversations] = useState(initialConversations)
  const [draft, setDraft] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const [announcementOpen, setAnnouncementOpen] = useState(false)
  const [announcementNotice, setAnnouncementNotice] = useState('')
  const fileInputRef = useRef(null)
  const messageListRef = useRef(null)
  const endOfMessagesRef = useRef(null)
  const closeAnnouncementRef = useRef(null)

  const messages = conversations[activeConversation] || []
  const activeWorker = workers.find((worker) => worker.id === activeConversation)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [activeConversation, messages.length])

  useEffect(() => {
    if (!announcementOpen) return undefined

    closeAnnouncementRef.current?.focus()
    function handleEscape(event) {
      if (event.key === 'Escape') setAnnouncementOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [announcementOpen])

  function formatTime() {
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date())
  }

  function handleSend(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text && !attachment) return

    const message = {
      id: `message-${Date.now()}`,
      senderId: 'me',
      senderName: 'You',
      avatar: 'https://i.pravatar.cc/96?u=godsent-user',
      time: formatTime(),
      text,
      attachmentName: attachment?.name || '',
    }

    setConversations((current) => ({
      ...current,
      [activeConversation]: [...(current[activeConversation] || []), message],
    }))
    setDraft('')
    setAttachment(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    setEmojiPickerOpen(false)
  }

  function handleComposerKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setAttachment(file)
    setAnnouncementNotice(`${file.name} is attached to your next message.`)
  }

  function chooseWorker(workerId) {
    setActiveConversation(workerId)
    setDraft('')
    setAttachment(null)
    setAnnouncementNotice('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function insertEmoji(emoji) {
    setDraft((current) => `${current}${emoji}`)
    setEmojiPickerOpen(false)
  }

  function openAnnouncement() {
    setAnnouncementNotice('')
    setAnnouncementOpen(true)
  }

  return (
    <section className="relative mx-auto mt-[-18px] mb-5 min-h-[max(520px,calc(100svh-150px))] w-[min(96%,1280px)] flex-1 bg-[#f3f7ff] px-5 pt-5 pb-16 text-[#1d2e43] max700:min-h-[max(560px,calc(100svh-150px))] max700:w-[min(96%,760px)] max700:px-5 max480:mt-[-14px] max480:min-h-[max(600px,calc(100svh-120px))] max480:w-[96%] max480:px-3 max480:pt-4 max480:pb-16" aria-labelledby="chatroom-title">
      <div className="grid h-full min-h-[440px] grid-cols-[minmax(0,1fr)_230px] gap-[clamp(28px,4vw,44px)] max700:grid-cols-1 max700:gap-5 max480:gap-4">
        <section className="flex min-h-0 min-w-0 flex-col max700:min-h-[440px] max480:min-h-[460px]" aria-label="Team conversation">
          <header className="grid flex-[0_0_60px] content-start justify-items-center text-center max480:flex-[0_0_56px]">
            <h1 id="chatroom-title" className="m-0 font-display text-[30px] font-extrabold leading-[1.15] tracking-[-.05em] text-[#1d2e43]">{activeWorker ? activeWorker.name : <>Team <span className="text-blue">Chat</span></>}</h1>
            {activeWorker && <p className="mt-1 mb-0 text-[13px] text-[#73829a]">Direct conversation</p>}
          </header>

          <div className="flex min-h-0 flex-1 flex-col gap-[22px] overflow-y-auto overscroll-contain px-4 pt-5 pb-4 [scrollbar-width:thin] [scrollbar-color:#d7e2f4_transparent] max480:gap-5 max480:px-1 max480:pt-4 max480:pb-3" ref={messageListRef} role="log" aria-label={`${activeWorker ? `${activeWorker.name} conversation` : 'Team conversation'} messages`} aria-live="polite" aria-relevant="additions">
            {messages.map((message) => {
              const isOutgoing = message.senderId === 'me'
              return (
                <article className={`grid w-[min(72%,440px)] grid-cols-[38px_minmax(0,1fr)] items-start gap-[10px] ${isOutgoing ? 'w-[min(58%,380px)] grid-cols-[minmax(0,1fr)_38px] self-end' : 'self-start'} max480:w-[min(90%,420px)] max480:grid-cols-[34px_minmax(0,1fr)] max480:gap-2 ${isOutgoing ? 'max480:w-[min(82%,360px)] max480:grid-cols-[minmax(0,1fr)_34px]' : ''}`} key={message.id}>
                  <img className={`size-[34px] rounded-full bg-[#dbe6fa] object-cover max480:size-[32px] ${isOutgoing ? 'col-[2] row-[1]' : ''}`} src={message.avatar} alt="" loading="lazy" />
                  <div className="min-w-0">
                    <div className={`flex min-h-[18px] items-start justify-between gap-2 pb-1 text-[11px] leading-[1.2] text-[#8a97aa] ${isOutgoing ? 'justify-end pr-1' : ''}`}>
                      {!isOutgoing && <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-bold text-[#1c2c42]">{message.senderName}</strong>}
                      <time className="shrink-0">{message.time}</time>
                    </div>
                    <div className={`min-w-0 wrap-anywhere rounded-2xl px-4 py-[12px] text-[15px] leading-[1.5] ${isOutgoing ? 'bg-blue text-white' : 'bg-white text-[#647187]'} max480:px-4 max480:py-[11px] max480:text-[14px]`}>
                      {message.text && <p className="m-0 whitespace-pre-line">{message.text}</p>}
                      {message.attachmentName && (
                        <span className={`mt-2 inline-flex max-w-full items-center gap-2 wrap-anywhere rounded-lg px-3 py-2 text-[12px] ${isOutgoing ? 'bg-white/15' : 'bg-[#f1f5fc]'}`}><Paperclip size={15} aria-hidden="true" />{message.attachmentName}</span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
            <div ref={endOfMessagesRef} aria-hidden="true" />
          </div>

          {attachment && (
            <div className="mx-5 mb-2 flex min-w-0 items-center gap-2 rounded-lg border border-line bg-white px-4 py-2 text-[13px] text-[#475a73]" role="status">
              <Paperclip size={16} aria-hidden="true" />
              <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap" title={attachment.name}>{attachment.name}</span>
              <button className="grid size-8 place-items-center rounded-md bg-transparent text-[#60718b] hover:bg-[#fff0f1] hover:text-[#b52f3a]" type="button" aria-label="Remove attached file" onClick={() => {
                setAttachment(null)
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}>
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          )}

          <form className="relative flex flex-[0_0_auto] items-center gap-3 mx-5 max480:gap-2 max480:mx-0" onSubmit={handleSend}>
            <input ref={fileInputRef} className="sr-only" type="file" aria-label="Attach a file to your message" onChange={handleFileChange} />
            <button className="grid h-12 w-9 shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0 text-[#27364a]" type="button" aria-label="Attach file" title="Attach file" onClick={() => fileInputRef.current?.click()}>
              <Paperclip size={22} aria-hidden="true" />
            </button>
            <div className="flex min-h-[52px] min-w-0 flex-1 items-center gap-2 rounded-xl border border-transparent bg-white py-1 pr-3 pl-4 transition-[border-color,box-shadow] duration-[160ms] focus-within:border-[#aac5ff] focus-within:shadow-[0_0_0_3px_rgb(18_96_245_/_8%)] max480:min-h-[52px] max480:pr-2 max480:pl-3">
              <label className="sr-only" htmlFor="chatroom-message">Message</label>
              <textarea className="max-h-[120px] min-h-[24px] min-w-0 flex-1 resize-none border-0 bg-transparent py-1 text-[15px] leading-[1.4] text-[#304258] outline-hidden placeholder:text-[#9aa5b5]" id="chatroom-message" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={handleComposerKeyDown} placeholder="Type a message..." rows={1} maxLength={2000} />
              <div className="relative shrink-0">
                <button className="grid size-9 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-[#8793a4] hover:bg-[#f1f5fc] hover:text-blue" type="button" aria-label={emojiPickerOpen ? 'Close emoji picker' : 'Add emoji'} aria-expanded={emojiPickerOpen} title="Add emoji" onClick={() => setEmojiPickerOpen((open) => !open)}>
                  <Smile size={20} aria-hidden="true" />
                </button>
                {emojiPickerOpen && (
                  <div className="absolute right-[-4px] bottom-[calc(100%+10px)] z-[7] flex gap-1 rounded-xl border border-line bg-white p-2 shadow-[0_12px_32px_rgb(34_49_75_/_14%)]" role="group" aria-label="Choose an emoji">
                    {quickEmojis.map((emoji) => (
                      <button className="grid size-10 cursor-pointer place-items-center rounded-lg border-0 bg-transparent text-xl hover:bg-[#eff4ff]" type="button" key={emoji} aria-label={`Insert ${emoji}`} onClick={() => insertEmoji(emoji)}>{emoji}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-xl border-0 bg-blue text-white transition-[background,transform] duration-[160ms] hover:-translate-y-px hover:bg-blue-dark active:scale-[.97]" type="submit" aria-label="Send message" title="Send message">
              <Send size={22} fill="currentColor" aria-hidden="true" />
            </button>
          </form>
          <p className="mt-2 mr-6 mb-0 ml-12 text-right text-[11px] text-[#a0aaba] max480:mr-6 max480:ml-11">Press Enter to send · Shift+Enter for a new line</p>
        </section>

        <aside className="flex min-w-0 flex-col gap-4 max700:grid max700:grid-cols-[minmax(0,1fr)_minmax(180px,.42fr)] max700:items-stretch max480:grid-cols-1" aria-label="Team members and announcements">
          <section className="min-h-[300px] rounded-xl bg-white px-5 pt-5 pb-5 max700:min-h-24 max700:p-4 max480:min-h-0" aria-labelledby="online-workers-title">
            <h2 id="online-workers-title" className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#f5f8ff] text-[14px] font-semibold text-blue"><UsersRound size={18} fill="currentColor" aria-hidden="true" />Online Workers</h2>
            <ul className="mt-4 mb-0 grid list-none gap-2 p-0 max700:mt-3 max700:grid-cols-3 max700:gap-2 max480:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] max480:gap-2">
              {workers.map((worker) => (
                <li className="min-w-0" key={worker.id}>
                  <button className={`flex min-h-[52px] w-full cursor-pointer items-center gap-3 rounded-lg border border-transparent bg-transparent px-2 py-1 text-left text-[#1e3048] hover:bg-[#f6f8fc] focus-visible:outline-2 focus-visible:outline-blue/35 focus-visible:outline-offset-1 max700:min-h-12 max700:gap-2 max700:p-1 max480:min-h-[56px] max480:px-2 ${activeConversation === worker.id ? 'border-[#dce8ff] bg-[#f3f7ff]' : ''}`} type="button" aria-label={`${worker.name}, ${worker.role}, online`} aria-pressed={activeConversation === worker.id} onClick={() => chooseWorker(worker.id)}>
                    <span className="relative size-[34px] shrink-0">
                      <img className="block size-[34px] rounded-full bg-[#dbe6fa] object-cover" src={worker.avatar} alt="" loading="lazy" />
                      {worker.online && <span className="absolute right-[-1px] bottom-[-1px] size-[10px] rounded-full border-2 border-white bg-[#16bf62]" aria-hidden="true" />}
                    </span>
                    <span className="grid min-w-0 gap-0.5">
                      <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-bold text-[#172a43] max700:text-[13px]">{worker.name}</strong>
                      <span className="text-[12px] leading-[1.15] text-[#697993] max700:text-[11px]">{worker.role} <span className="text-[#188b56]">· Online</span></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <button className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue px-4 py-3 text-[14px] font-bold text-white transition-colors duration-[160ms] hover:bg-blue-dark max700:min-h-12 max700:self-start max480:min-h-12" type="button" onClick={openAnnouncement}>
            <Megaphone size={18} aria-hidden="true" />
            <span>View Announcement</span>
          </button>
        </aside>
      </div>

      <button className="absolute right-5 bottom-5 grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-[#414448] hover:translate-y-0.5 max700:right-3 max700:bottom-3" type="button" aria-label="Scroll to the bottom of the conversation" onClick={() => messageListRef.current?.scrollTo({ top: messageListRef.current.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={28} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>

      {announcementOpen && (
        <div className="fixed inset-0 z-20 grid place-items-center bg-[#122037]/[.34] p-5" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setAnnouncementOpen(false)
        }}>
          <section className="w-[min(100%,440px)] rounded-2xl border border-line bg-white p-6 shadow-[0_20px_60px_rgb(18_32_55_/_22%)]" role="dialog" aria-modal="true" aria-labelledby="chatroom-announcement-title" onKeyDown={(event) => {
            if (event.key === 'Escape') setAnnouncementOpen(false)
          }}>
            <div className="flex items-center justify-between gap-3">
              <h2 id="chatroom-announcement-title" className="m-0 flex items-center gap-3 font-display text-xl font-extrabold leading-[1.2] text-[#1d2e43]"><Megaphone className="text-blue" size={22} aria-hidden="true" />Team Announcement</h2>
              <button className="grid size-9 place-items-center rounded-lg border-0 bg-transparent text-[#65758b] hover:bg-[#f1f5fb]" ref={closeAnnouncementRef} type="button" aria-label="Close announcement" onClick={() => setAnnouncementOpen(false)}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-5 mb-1 text-[15px] text-[#728099]">No announcement has been posted yet.</p>
          </section>
        </div>
      )}
      {announcementNotice && !announcementOpen && <span className="sr-only" role="status">{announcementNotice}</span>}
    </section>
  )
}

export default ChatRoom
