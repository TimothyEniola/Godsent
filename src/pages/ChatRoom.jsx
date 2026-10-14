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
    {
      id: 'team-sarah-1',
      senderId: 'sarah',
      senderName: 'Sarah Johnson',
      avatar: workers[0].avatar,
      time: '10:12 AM',
      text: 'Good morning team! 🔔 How are we all doing? Hope we all had a good night rest?',
    },
    {
      id: 'team-igho-1',
      senderId: 'igho',
      senderName: 'Igho Godsent',
      avatar: workers[1].avatar,
      time: '10:12 AM',
      text: 'Good morning Sarah! 🔔 My night was great, I hope yours was great also?',
    },
    {
      id: 'team-me-1',
      senderId: 'me',
      senderName: 'You',
      avatar: 'https://i.pravatar.cc/96?u=godsent-user',
      time: '11:10 AM',
      text: 'Good Morning!\nMy night was splendid, thank you!\nAny update for today?',
    },
  ],
  sarah: [
    {
      id: 'sarah-direct-1',
      senderId: 'sarah',
      senderName: 'Sarah Johnson',
      avatar: workers[0].avatar,
      time: '10:12 AM',
      text: 'Good morning! Let me know if you need anything for today.',
    },
  ],
  igho: [
    {
      id: 'igho-direct-1',
      senderId: 'igho',
      senderName: 'Igho Godsent',
      avatar: workers[1].avatar,
      time: '10:12 AM',
      text: 'Good morning! I am online and ready for today.',
    },
  ],
  isaac: [
    {
      id: 'isaac-direct-1',
      senderId: 'isaac',
      senderName: 'Isaac kolawole',
      avatar: workers[2].avatar,
      time: '10:12 AM',
      text: 'Hello team, hope everyone is having a good day.',
    },
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
    <section className="chatroom-page" aria-labelledby="chatroom-title">
      <div className="chatroom-layout">
        <section className="chatroom-conversation" aria-label="Team conversation">
          <header className="chatroom-conversation-header">
            <h1 id="chatroom-title">{activeWorker ? activeWorker.name : <>Team <span>Chat</span></>}</h1>
            {activeWorker && <p>Direct conversation</p>}
          </header>

          <div className="chatroom-message-list" ref={messageListRef} role="log" aria-label={`${activeWorker ? `${activeWorker.name} conversation` : 'Team conversation'} messages`} aria-live="polite" aria-relevant="additions">
            {messages.map((message) => {
              const isOutgoing = message.senderId === 'me'
              return (
                <article className={`chatroom-message ${isOutgoing ? 'is-outgoing' : 'is-incoming'}`} key={message.id}>
                  <img className="chatroom-message-avatar" src={message.avatar} alt="" loading="lazy" />
                  <div className="chatroom-message-body">
                    <div className="chatroom-message-meta">
                      {!isOutgoing && <strong>{message.senderName}</strong>}
                      <time>{message.time}</time>
                    </div>
                    <div className="chatroom-message-bubble">
                      {message.text && <p>{message.text}</p>}
                      {message.attachmentName && (
                        <span className="chatroom-attachment-label"><Paperclip size={12} aria-hidden="true" />{message.attachmentName}</span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
            <div ref={endOfMessagesRef} aria-hidden="true" />
          </div>

          {attachment && (
            <div className="chatroom-selected-attachment" role="status">
              <Paperclip size={13} aria-hidden="true" />
              <span title={attachment.name}>{attachment.name}</span>
              <button type="button" aria-label="Remove attached file" onClick={() => {
                setAttachment(null)
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}>
                <X size={13} aria-hidden="true" />
              </button>
            </div>
          )}

          <form className="chatroom-composer" onSubmit={handleSend}>
            <input
              ref={fileInputRef}
              className="chatroom-file-input"
              type="file"
              aria-label="Attach a file to your message"
              onChange={handleFileChange}
            />
            <button
              className="chatroom-attach-button"
              type="button"
              aria-label="Attach file"
              title="Attach file"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip size={17} aria-hidden="true" />
            </button>
            <div className="chatroom-composer-field">
              <label className="visually-hidden" htmlFor="chatroom-message">Message</label>
              <textarea
                id="chatroom-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder="Type a message..."
                rows={1}
                maxLength={2000}
              />
              <div className="chatroom-emoji-wrap">
                <button
                  className="chatroom-emoji-button"
                  type="button"
                  aria-label={emojiPickerOpen ? 'Close emoji picker' : 'Add emoji'}
                  aria-expanded={emojiPickerOpen}
                  title="Add emoji"
                  onClick={() => setEmojiPickerOpen((open) => !open)}
                >
                  <Smile size={15} aria-hidden="true" />
                </button>
                {emojiPickerOpen && (
                  <div className="chatroom-emoji-picker" role="group" aria-label="Choose an emoji">
                    {quickEmojis.map((emoji) => (
                      <button type="button" key={emoji} aria-label={`Insert ${emoji}`} onClick={() => insertEmoji(emoji)}>{emoji}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button className="chatroom-send-button" type="submit" aria-label="Send message" title="Send message">
              <Send size={17} fill="currentColor" aria-hidden="true" />
            </button>
          </form>
          <p className="chatroom-composer-hint">Press Enter to send · Shift+Enter for a new line</p>
        </section>

        <aside className="chatroom-sidebar" aria-label="Team members and announcements">
          <section className="chatroom-online-panel" aria-labelledby="online-workers-title">
            <h2 id="online-workers-title"><UsersRound size={13} fill="currentColor" aria-hidden="true" />Online Workers</h2>
            <ul className="chatroom-worker-list">
              {workers.map((worker) => (
                <li key={worker.id}>
                  <button
                    className={`chatroom-worker ${activeConversation === worker.id ? 'is-selected' : ''}`}
                    type="button"
                    aria-label={`${worker.name}, ${worker.role}, online`}
                    aria-pressed={activeConversation === worker.id}
                    onClick={() => chooseWorker(worker.id)}
                  >
                    <span className="chatroom-worker-avatar-wrap">
                      <img src={worker.avatar} alt="" loading="lazy" />
                      {worker.online && <span className="chatroom-online-dot" aria-hidden="true" />}
                    </span>
                    <span className="chatroom-worker-details">
                      <strong>{worker.name}</strong>
                      <span>{worker.role} <span className="chatroom-online-label">· Online</span></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <button className="chatroom-announcement-button" type="button" onClick={openAnnouncement}>
            <Megaphone size={14} aria-hidden="true" />
            <span>View Announcement</span>
          </button>
        </aside>
      </div>

      <button
        className="chatroom-scroll-cue"
        type="button"
        aria-label="Scroll to the bottom of the conversation"
        onClick={() => messageListRef.current?.scrollTo({ top: messageListRef.current.scrollHeight, behavior: 'smooth' })}
      >
        <ArrowDown size={19} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>

      {announcementOpen && (
        <div
          className="chatroom-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setAnnouncementOpen(false)
          }}
        >
          <section
            className="chatroom-announcement-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatroom-announcement-title"
            onKeyDown={(event) => {
              if (event.key === 'Escape') setAnnouncementOpen(false)
            }}
          >
            <div className="chatroom-dialog-heading">
              <h2 id="chatroom-announcement-title"><Megaphone size={17} aria-hidden="true" />Team Announcement</h2>
              <button ref={closeAnnouncementRef} type="button" aria-label="Close announcement" onClick={() => setAnnouncementOpen(false)}>
                <X size={17} aria-hidden="true" />
              </button>
            </div>
            <p>No announcement has been posted yet.</p>
          </section>
        </div>
      )}
      {announcementNotice && !announcementOpen && <span className="visually-hidden" role="status">{announcementNotice}</span>}
    </section>
  )
}

export default ChatRoom
