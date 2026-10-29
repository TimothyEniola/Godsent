import { useState } from 'react'
import { ArrowDown, CircleCheck, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import portalIllustration from '../../assets/signin-portal-illustration.svg'

function Createaccount() {
  const [email, setEmail] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setStatusMessage('Account created successfully')
  }

  return (
    <section className="relative mx-auto grid w-[min(86%,1200px)] flex-1 grid-cols-[minmax(220px,.9fr)_minmax(250px,1.1fr)] items-center gap-x-[clamp(24px,4vw,56px)] px-[22px] pb-10 max700:w-[88%] max620:grid-cols-1 max620:gap-6 max620:px-0 max620:pb-14 max480:w-[90%]" aria-labelledby="create-account-title">
      <div className="relative z-[1] w-full max-w-[400px]">
        <h1 id="create-account-title" className="m-0 font-display text-[26px] font-extrabold leading-[1.15] tracking-[-.04em] text-[#1e2f42] min1100:text-[28px]">Create Account</h1>
        <p className="mt-1 mb-5 text-[14px] font-semibold leading-[1.4] text-blue min1100:text-[15px] min1100:font-bold">Create New Worker Account</p>

        <form className="flex w-full max-w-[400px] flex-col" onSubmit={handleSubmit}>
          <label className="mb-[7px] text-[10px] font-medium text-[#58687e] min1100:text-[12px] min1100:font-bold" htmlFor="create-worker-email">Email Address</label>
          <div className="flex h-[38px] w-full items-center gap-[10px] rounded-md border border-transparent bg-field px-[10px] transition-[border-color,box-shadow,background] duration-[160ms] focus-within:border-[#8ab0ff] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgb(18_96_245_/_9%)]">
            <Mail className="shrink-0 text-blue" size={15} fill="currentColor" stroke="white" aria-hidden="true" />
            <input
              className="h-full min-w-0 w-full border-0 bg-transparent p-0 text-[11px] text-[#626c79] outline-hidden placeholder:text-[#98a4b6] min1100:text-[13px] min1100:font-semibold"
              id="create-worker-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="godsentprojectteam@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <label className="mt-3 mb-[7px] text-[10px] font-medium text-[#58687e] min1100:text-[12px] min1100:font-bold" htmlFor="create-worker-password">Password</label>
          <div className="flex h-[38px] w-full items-center gap-[10px] rounded-md border border-transparent bg-field px-[10px] transition-[border-color,box-shadow,background] duration-[160ms] focus-within:border-[#8ab0ff] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgb(18_96_245_/_9%)]">
            <LockKeyhole className="shrink-0 text-blue" size={15} fill="currentColor" aria-hidden="true" />
            <input
              className="h-full min-w-0 w-full border-0 bg-transparent p-0 text-[11px] text-[#626c79] outline-hidden placeholder:text-[#98a4b6] min1100:text-[13px] min1100:font-semibold"
              id="create-worker-password"
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••••••"
              minLength={8}
              required
            />
            <button
              className="grid size-7 shrink-0 cursor-pointer place-items-center rounded border-0 bg-transparent p-0 text-[#303742] hover:text-blue focus-visible:outline-2 focus-visible:outline-blue/40"
              type="button"
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              onClick={() => setPasswordVisible((visible) => !visible)}
            >
              {passwordVisible ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          </div>

          <button className="mt-6 min-h-[38px] w-full max-w-[400px] cursor-pointer rounded-md border-0 bg-blue text-[15px] font-bold text-white transition-[background,transform,box-shadow] duration-[160ms] hover:-translate-y-px hover:bg-blue-dark hover:shadow-[0_5px_14px_rgb(18_96_245_/_20%)]" type="submit">
            Create Account
          </button>
        </form>

        <p className="mt-7 mb-0 flex min-h-5 items-center gap-2 text-[12px] text-[#263446] min1100:text-[14px] min1100:font-semibold" id="account-feedback" role="status" aria-live="polite">
          {statusMessage && <><span>{statusMessage}</span><CircleCheck className="shrink-0 text-[#27c66f]" size={15} fill="currentColor" stroke="white" strokeWidth={2.5} aria-hidden="true" /></>}
        </p>
      </div>

      <div className="flex min-w-0 items-center justify-center max620:hidden">
        <img className="block h-auto max-h-[360px] w-full max-w-[500px] object-contain" src={portalIllustration} alt="A person using a phone beside secure account documents" />
      </div>

      <a className="absolute right-0 bottom-2 grid size-10 place-items-center text-[#3e4145] transition-transform duration-[180ms] hover:translate-y-[3px]" href="#account-feedback" aria-label="Scroll to account status" title="Scroll down">
        <ArrowDown className="size-7" size={28} strokeWidth={3.1} aria-hidden="true" />
      </a>
    </section>
  )
}

export default Createaccount