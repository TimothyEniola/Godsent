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
    <section className="relative mx-auto mt-2 grid w-[min(84%,1120px)] flex-1 grid-cols-[minmax(220px,.95fr)_minmax(245px,1.05fr)] content-start items-center gap-x-[clamp(22px,3.2vw,46px)] px-[26px] pb-[66px] max700:w-[82%] max700:grid-cols-[minmax(205px,.9fr)_minmax(210px,1fr)] max700:gap-5 max700:px-5 max600:mt-[14px] max600:w-[min(84%,390px)] max600:grid-cols-1 max600:gap-[6px] max600:px-0 max600:pb-14 max380:mt-1 max380:w-[86%]" aria-labelledby="signin-heading">
      <div className="relative z-[1]">
        <h1 id="signin-heading" className="m-0 font-display text-[clamp(25px,3.5vw,28px)] font-extrabold leading-[1.12] tracking-[-.07em] text-[#1e2f42] max600:text-[clamp(26px,8vw,32px)]">Login Details</h1>
        <p className="mt-[3px] mb-[21px] text-[11px] leading-[1.4] text-blue max600:mb-[18px]">Access your account to continue</p>

        <form className="flex w-full max-w-[360px] flex-col max600:max-w-none" onSubmit={handleSubmit} ref={formRef}>
          <label className="mb-[5px] text-[8px] font-medium text-[#58687e]" htmlFor="signin-email">Email Address</label>
          <div className="flex h-9 w-full items-center gap-[9px] rounded-[5px] border border-transparent bg-field px-[10px] transition-[border-color,box-shadow,background] duration-[180ms] focus-within:border-[#8ab0ff] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgb(18_96_245_/_9%)]">
            <Mail className="shrink-0 text-blue" size={14} strokeWidth={2.2} aria-hidden="true" />
            <input className="h-full min-w-0 w-full border-0 bg-transparent p-0 text-[9px] text-[#566278] outline-hidden" id="signin-email" name="email" type="email" autoComplete="username" defaultValue="godsentprojectteam@gmail.com" required />
          </div>

          <label className="mt-2 mb-[5px] text-[8px] font-medium text-[#58687e]" htmlFor="signin-password">Password</label>
          <div className="flex h-9 w-full items-center gap-[9px] rounded-[5px] border border-transparent bg-field px-[10px] transition-[border-color,box-shadow,background] duration-[180ms] focus-within:border-[#8ab0ff] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgb(18_96_245_/_9%)]">
            <LockKeyhole className="shrink-0 text-blue" size={14} strokeWidth={2.2} aria-hidden="true" />
            <input className="h-full min-w-0 w-full border-0 bg-transparent p-0 text-[9px] text-[#566278] outline-hidden" id="signin-password" name="password" type={passwordVisible ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••••••" required />
            <button className="grid shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0.5 text-[#303742]" type="button" aria-label={passwordVisible ? 'Hide password' : 'Show password'} onClick={() => setPasswordVisible((visible) => !visible)}>
              {passwordVisible ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          </div>

          <button className="mt-[25px] min-h-9 w-full cursor-pointer rounded-[5px] border-0 bg-blue text-[13px] font-bold text-white transition-[background,transform,box-shadow] duration-[180ms] hover:-translate-y-px hover:bg-blue-dark hover:shadow-[0_5px_12px_rgb(18_96_245_/_18%)]" type="submit">Login</button>
        </form>

        <p className="mt-[23px] mb-0 flex items-center gap-[9px] text-[10px] text-[#344356] max380:text-[9px]"><Info className="shrink-0 text-[#1546af]" size={13} fill="currentColor" stroke="white" strokeWidth={2.5} aria-hidden="true" /><span>Forget password <a className="text-blue hover:underline" href="mailto:godsentprojectteam@gmail.com?subject=Password%20help">contact admin</a></span></p>
        {statusMessage && <p className="mt-3 mb-0 text-[10px] text-success" role="status">{statusMessage}</p>}
      </div>

      <div className="flex min-w-0 items-center justify-center max600:order-[-1] max600:mx-auto max600:mb-1 max600:h-auto max600:max-h-[190px] max600:w-[min(100%,330px)] max600:overflow-hidden max380:max-h-[158px]">
        <img className="block max-h-[300px] w-full max-w-[460px] translate-x-[4%] scale-[1.2] object-contain min1100:max-h-[410px] max600:max-h-[190px] max600:translate-x-0 max600:scale-100 max380:max-h-[158px]" src={portalIllustration} alt="A person using a phone beside secure account documents" />
      </div>

      <button className="absolute right-[-56px] bottom-[34px] grid size-[26px] cursor-pointer place-items-center border-0 bg-transparent p-0 text-[#3e4145] transition-transform duration-[180ms] hover:translate-y-[3px] max700:right-[-30px] max600:right-[3px] max600:bottom-5" type="button" aria-label="Return to login form" title="Login details" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
        <ArrowDown className="size-5" size={21} strokeWidth={3.1} aria-hidden="true" />
      </button>
    </section>
  )
}

export default SignIn
