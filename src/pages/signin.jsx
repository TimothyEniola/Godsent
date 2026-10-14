import { useRef, useState } from 'react'
import { ArrowDown, Eye, EyeOff, Info, LockKeyhole, Mail } from 'lucide-react'
import portalIllustration from '../assets/signin-portal-illustration.svg'

function SignIn() {
  const formRef = useRef(null)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setStatusMessage('Sign-in details submitted.')
  }

  return (
    <section className="signin-content" aria-labelledby="signin-heading">
      <div className="signin-form-column">
        <h1 id="signin-heading">Login Details</h1>
        <p className="signin-subtitle">Access your account to continue</p>

        <form className="signin-form" ref={formRef} onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="signin-email">Email Address</label>
          <div className="input-shell">
            <Mail className="field-icon" size={14} strokeWidth={2.2} aria-hidden="true" />
            <input id="signin-email" name="email" type="email" autoComplete="username" defaultValue="godsentprojectteam@gmail.com" required />
          </div>

          <label className="field-label password-label" htmlFor="signin-password">Password</label>
          <div className="input-shell">
            <LockKeyhole className="field-icon" size={14} strokeWidth={2.2} aria-hidden="true" />
            <input id="signin-password" name="password" type={passwordVisible ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••••••" required />
            <button className="password-toggle" type="button" aria-label={passwordVisible ? 'Hide password' : 'Show password'} onClick={() => setPasswordVisible((visible) => !visible)}>
              {passwordVisible ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          </div>

          <button className="login-button" type="submit">Login</button>
        </form>

        <p className="forgot-password"><Info size={13} fill="currentColor" stroke="white" strokeWidth={2.5} aria-hidden="true" /><span>Forget password <a href="mailto:godsentprojectteam@gmail.com?subject=Password%20help">contact admin</a></span></p>
        {statusMessage && <p className="signin-status" role="status">{statusMessage}</p>}
      </div>

      <div className="signin-illustration-column">
        <img src={portalIllustration} alt="A person using a phone beside secure account documents" />
      </div>

      <button className="scroll-cue" type="button" aria-label="Return to login form" title="Login details" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
        <ArrowDown size={21} strokeWidth={3.1} aria-hidden="true" />
      </button>
    </section>
  )
}

export default SignIn
