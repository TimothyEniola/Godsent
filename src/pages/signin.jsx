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
    <section className="relative mx-auto mt-4 grid w-[min(86%,1200px)] flex-1 grid-cols-[minmax(280px,.95fr)_minmax(300px,1.05fr)] content-start items-center gap-x-[clamp(32px,4vw,64px)] px-[26px] pb-[72px] max700:w-[84%] max700:grid-cols-[minmax(240px,.9fr)_minmax(230px,1fr)] max700:gap-6 max700:px-5 max600:mt-[18px] max600:w-[min(88%,440px)] max600:grid-cols-1 max600:gap-2 max600:px-0 max600:pb-16 max380:mt-1 max380:w-[88%]" aria-labelledby="signin-heading">
      <div className="relative z-[1]">
        <h1 id="signin-heading" className="m-0 font-display text-[clamp(34px,3.5vw,42px)] font-extrabold leading-[1.1] tracking-[-.06em] text-[#1e2f42] max600:text-[clamp(32px,8vw,40px)]">Login Details</h1>
        <p className="mt-2 mb-7 text-[15px] leading-[1.4] text-blue max600:mb-6">Access your account to continue</p>

        <form className="flex w-full max-w-[440px] flex-col max600:max-w-none" onSubmit={handleSubmit} ref={formRef}>
          <label className="mb-2 text-[13px] font-medium text-[#58687e]" htmlFor="signin-email">Email Address</label>
          <div className="flex h-14 w-full items-center gap-3 rounded-lg border border-transparent bg-field px-4 transition-[border-color,box-shadow,background] duration-[180ms] focus-within:border-[#8ab0ff] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgb(18_96_245_/_9%)]">
            <Mail className="shrink-0 text-blue" size={20} strokeWidth={2.2} aria-hidden="true" />
            <input className="h-full min-w-0 w-full border-0 bg-transparent p-0 text-[15px] text-[#566278] outline-hidden" id="signin-email" name="email" type="email" autoComplete="username" defaultValue="godsentprojectteam@gmail.com" required />
          </div>

          <label className="mt-4 mb-2 text-[13px] font-medium text-[#58687e]" htmlFor="signin-password">Password</label>
          <div className="flex h-14 w-full items-center gap-3 rounded-lg border border-transparent bg-field px-4 transition-[border-color,box-shadow,background] duration-[180ms] focus-within:border-[#8ab0ff] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgb(18_96_245_/_9%)]">
            <LockKeyhole className="shrink-0 text-blue" size={20} strokeWidth={2.2} aria-hidden="true" />
            <input className="h-full min-w-0 w-full border-0 bg-transparent p-0 text-[15px] text-[#566278] outline-hidden" id="signin-password" name="password" type={passwordVisible ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••••••" required />
            <button className="grid shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-1 text-[#303742]" type="button" aria-label={passwordVisible ? 'Hide password' : 'Show password'} onClick={() => setPasswordVisible((visible) => !visible)}>
              {passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button className="mt-8 min-h-14 w-full cursor-pointer rounded-lg border-0 bg-blue text-[16px] font-bold text-white transition-[background,transform,box-shadow] duration-[180ms] hover:-translate-y-px hover:bg-blue-dark hover:shadow-[0_6px_16px_rgb(18_96_245_/_20%)]" type="submit">Login</button>
        </form>

        <p className="mt-7 mb-0 flex items-center gap-3 text-[14px] text-[#344356] max380:text-[13px]"><Info className="shrink-0 text-[#1546af]" size={18} fill="currentColor" stroke="white" strokeWidth={2.5} aria-hidden="true" /><span>Forget password <a className="text-blue hover:underline" href="mailto:godsentprojectteam@gmail.com?subject=Password%20help">contact admin</a></span></p>
        {statusMessage && <p className="mt-4 mb-0 text-[14px] text-success" role="status">{statusMessage}</p>}
      </div>

      <div className="flex min-w-0 items-center justify-center max600:order-[-1] max600:mx-auto max600:mb-2 max600:h-auto max600:max-h-[230px] max600:w-[min(100%,380px)] max600:overflow-hidden max380:max-h-[188px]">
        <img className="block max-h-[380px] w-full max-w-[520px] translate-x-[4%] scale-[1.2] object-contain min1100:max-h-[480px] max600:max-h-[230px] max600:translate-x-0 max600:scale-100 max380:max-h-[188px]" src={portalIllustration} alt="A person using a phone beside secure account documents" />
      </div>

      <button className="absolute right-[-56px] bottom-10 grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-[#3e4145] transition-transform duration-[180ms] hover:translate-y-[3px] max700:right-[-30px] max600:right-[3px] max600:bottom-6" type="button" aria-label="Return to login form" title="Login details" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
        <ArrowDown className="size-7" size={28} strokeWidth={3.1} aria-hidden="true" />
      </button>
    </section>
  )
}

export default SignIn
