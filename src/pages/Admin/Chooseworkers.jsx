import { useEffect, useState } from 'react'
import { ArrowDown, ArrowLeft, BriefcaseBusiness, ChevronRight, FileText, Globe2, Info, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import portalIllustration from '../../assets/signin-portal-illustration.svg'
import { loadWorkerAccounts, WORKER_DIRECTORY_KEY } from '../../utils/profileStorage.js'

const workerFields = [
  { key: 'name', label: 'Full Name', Icon: UserRound },
  { key: 'nationality', label: 'Nationality', Icon: Globe2 },
  { key: 'email', label: 'Email Address', Icon: Mail },
  { key: 'position', label: 'Position', Icon: BriefcaseBusiness },
  { key: 'phone', label: 'Phone Number', Icon: Phone },
  { key: 'location', label: 'Residential Address', Icon: MapPin },
  { key: 'bio', label: 'About', Icon: FileText, wide: true },
]

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function Chooseworkers() {
  const [workers, setWorkers] = useState(loadWorkerAccounts)
  const [selectedWorkerId, setSelectedWorkerId] = useState('')
  const selectedWorker = workers.find((worker) => worker.id === selectedWorkerId)

  useEffect(() => {
    const refreshWorkers = (event) => {
      if (event.key === null || event.key === WORKER_DIRECTORY_KEY) {
        setWorkers(loadWorkerAccounts())
      }
    }

    window.addEventListener('storage', refreshWorkers)
    return () => window.removeEventListener('storage', refreshWorkers)
  }, [])

  if (selectedWorker) {
    return (
      <section className="relative mx-auto w-[min(84%,980px)] flex-1 pb-16 text-ink max700:w-[88%] max600:w-[90%] max460:w-[94%]" aria-labelledby="selected-worker-name">
        <button
          className="mb-6 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border-0 bg-transparent p-0 text-[14px] font-semibold text-[#53647b] transition-colors hover:text-blue focus-visible:outline-2 focus-visible:outline-blue/40 focus-visible:outline-offset-4"
          type="button"
          onClick={() => setSelectedWorkerId('')}
        >
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Back to workers</span>
        </button>

        <header className="mb-8 flex items-center gap-5 border-b border-line pb-6 max460:mb-6 max460:gap-4">
          <span className="grid size-[68px] shrink-0 place-items-center rounded-full bg-[#e7efff] font-display text-[20px] font-extrabold text-blue max460:size-[58px]" aria-hidden="true">
            {getInitials(selectedWorker.name)}
          </span>
          <div className="min-w-0">
            <h2 id="selected-worker-name" className="m-0 font-display text-[25px] font-extrabold leading-[1.2] text-[#203247] max460:text-[22px]">
              {selectedWorker.name}
            </h2>
            <p className="mt-1 mb-0 text-[14px] font-semibold text-blue">Worker account profile</p>
          </div>
        </header>

        <dl className="m-0 grid grid-cols-2 gap-x-8 gap-y-5 max600:grid-cols-1 max600:gap-y-4">
          {workerFields.map(({ key, label, Icon, wide }) => (
            <div className={`grid min-w-0 gap-2 ${wide ? 'col-span-2 max600:col-span-1' : ''}`} key={key}>
              <dt className="text-[13px] font-semibold text-[#52637a]">{label}</dt>
              <dd className="m-0 flex min-h-[54px] min-w-0 items-center gap-3 rounded-lg bg-field px-4 py-3 text-[14px] leading-[1.45] text-[#344356] [overflow-wrap:anywhere]">
                <Icon className="shrink-0 text-blue" size={19} aria-hidden="true" />
                <span>{selectedWorker[key] || 'Not provided'}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    )
  }

  return (
    <section className="admin-home-reveal relative mx-auto flex w-[min(92%,1340px)] flex-1 flex-col justify-center px-2 py-4 max700:py-6 max480:py-4" aria-label="Choose a worker account">
      <div className="grid w-full grid-cols-[minmax(340px,480px)_minmax(360px,1fr)] items-center justify-between gap-[clamp(24px,5vw,84px)] max900:grid-cols-[minmax(300px,420px)_minmax(300px,1fr)] max700:grid-cols-1 max700:gap-8">
        <div className="flex flex-col justify-center pl-[clamp(24px,4vw,54px)] max700:pl-0">
          <nav className="grid w-full max-w-[400px] gap-3.5 max700:max-w-none" aria-label="Worker accounts">
            {workers.map((worker) => (
              <button
                className="group flex min-h-[52px] w-full cursor-pointer items-center justify-between gap-4 rounded-xl border-0 bg-blue px-6 text-left text-[15px] font-semibold text-white shadow-[0_4px_14px_rgb(18_96_245_/_18%)] transition-[background,transform,box-shadow] duration-[160ms] hover:-translate-y-px hover:bg-blue-dark hover:shadow-[0_6px_20px_rgb(18_96_245_/_26%)] focus-visible:outline-2 focus-visible:outline-blue/45 focus-visible:outline-offset-2 max700:min-h-[48px] max700:px-5 max700:text-[14px] max480:min-h-[46px]"
                type="button"
                key={worker.id}
                aria-label={`View ${worker.name} account`}
                onClick={() => setSelectedWorkerId(worker.id)}
              >
                <span>{worker.name}</span>
                <ChevronRight className="shrink-0 transition-transform duration-[160ms] group-hover:translate-x-1" size={20} strokeWidth={2.4} aria-hidden="true" />
              </button>
            ))}
          </nav>

          <a
            className="mt-8 inline-flex items-center gap-2.5 text-[14px] text-[#203247] transition-colors duration-[160ms] hover:text-blue max700:mt-6"
            href="#create-account"
          >
            <Info className="shrink-0 text-blue" size={19} fill="#1260f5" stroke="white" strokeWidth={2.4} aria-hidden="true" />
            <span>Create new <strong className="font-semibold text-blue hover:underline">workers account</strong></span>
          </a>
        </div>

        <div className="admin-home-reveal-delay flex min-w-0 items-center justify-center max700:hidden">
          <img className="block h-auto max-h-[min(540px,65vh)] w-full max-w-[620px] object-contain drop-shadow-[0_12px_32px_rgba(18,96,245,0.06)] max900:max-h-[420px]" src={portalIllustration} alt="Administrator portal with worker account documents" />
        </div>
      </div>

      <a className="absolute right-0 bottom-2 grid size-10 place-items-center text-[#3c4043] transition-transform duration-[180ms] hover:translate-y-1" href="#create-account" aria-label="Create a new workers account" title="Create new account">
        <ArrowDown className="size-7" size={28} strokeWidth={3} aria-hidden="true" />
      </a>
    </section>
  )
}

export default Chooseworkers