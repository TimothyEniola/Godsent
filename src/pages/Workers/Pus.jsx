import { CircleCheck, FileArchive } from 'lucide-react'
import { readProjectUploads } from '../../utils/projectUploads.js'

function getReturnPath() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  const returnTo = params.get('returnTo')
  return ['portal5', 'portal6'].includes(returnTo) ? `#${returnTo}` : '#project-portal'
}

function Pus() {
  const returnPath = getReturnPath()
  let latestUpload = null
  let loadError = ''

  try {
    latestUpload = readProjectUploads()[0] || null
  } catch (error) {
    loadError = error instanceof Error ? error.message : 'The saved submission could not be read.'
  }

  return (
    <section className="relative mx-auto flex min-h-[max(440px,calc(100svh-170px))] w-[min(92%,1000px)] flex-1 flex-col items-center justify-center px-4 pb-14 pt-6 text-center text-[#203247] max620:min-h-[max(400px,calc(100svh-140px))] max620:w-[90%] max460:w-[94%]" aria-labelledby="pus-title">
      {loadError ? (
        <>
          <h1 id="pus-title" className="m-0 font-display text-[28px] font-extrabold text-[#203247] max460:text-2xl">Submission status unavailable</h1>
          <p className="mt-4 max-w-lg text-[14px] leading-[1.6] text-[#bb3441]" role="alert">{loadError}</p>
        </>
      ) : latestUpload ? (
        <>
          <h1 id="pus-title" className="m-0 font-display text-[30px] font-extrabold leading-[1.12] tracking-[-.05em] max460:text-2xl">Hello, <span className="text-blue">Godsent!</span></h1>
          <CircleCheck className="mt-7 text-success" size={82} strokeWidth={1.8} aria-hidden="true" />
          <div className="mt-6 w-full max-w-md rounded-xl bg-blue px-5 py-5 text-white shadow-sm">
            <h2 className="m-0 text-[16px] font-bold">Project submission saved</h2>
            <p className="mt-2 mb-0 text-[13px] leading-[1.5] text-white/90">{latestUpload.name} was added to your project portal.</p>
          </div>
          <div className="mt-5 flex w-full max-w-md items-center gap-3 rounded-xl bg-field px-4 py-4 text-left">
            <FileArchive className="shrink-0 text-blue" size={24} aria-hidden="true" />
            <div className="min-w-0">
              <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-semibold">{latestUpload.fileName}</p>
              <p className="mt-1 mb-0 text-[12px] text-[#73829a]">{latestUpload.learners} learners · Uploaded {latestUpload.date}</p>
            </div>
          </div>
          <p className="mt-4 mb-0 max-w-lg text-[12px] leading-[1.5] text-[#73829a]">This preview saves the submission details in this browser. The document itself has not been sent to an admin server.</p>
        </>
      ) : (
        <>
          <h1 id="pus-title" className="m-0 font-display text-[28px] font-extrabold text-[#203247] max460:text-2xl">No recent submission</h1>
          <p className="mt-3 text-[14px] text-[#73829a]">Choose a project file and complete its details before sending.</p>
        </>
      )}

      <a className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue px-5 text-[14px] font-bold text-white transition-colors hover:bg-blue-dark" href={returnPath}>Return to Project Portal</a>
    </section>
  )
}

export default Pus
