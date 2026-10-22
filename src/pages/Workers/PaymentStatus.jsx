import { useState } from 'react'
import { ArrowDown, ChevronRight, Info } from 'lucide-react'

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
]

function PaymentStatus() {
  const [selectedMonth, setSelectedMonth] = useState('January')

  return (
    <main className="relative mx-auto mt-[-7px] flex w-[min(91%,1160px)] flex-1 flex-col pb-8 text-ink max600:w-[92%] max600:pb-6 print:w-full print:pb-0" aria-labelledby="payment-status-title">
      <h1 id="payment-status-title" className="m-0 mb-[8px] text-center font-display text-[24px] font-extrabold leading-[1.25] tracking-[-.05em] text-[#203247]">
        Payment <span className="text-blue">Status</span>
      </h1>

      <section aria-labelledby="payment-month-title">
        <h2 id="payment-month-title" className="mb-[8px] mt-0 text-[13px] font-bold leading-[1.3] text-[#182940]">Select a Month</h2>
        <div className="grid grid-cols-4 gap-x-[clamp(12px,6.4vw,44px)] gap-y-[8px] max600:grid-cols-3 max460:grid-cols-2 max460:gap-x-3">
          {months.map((month) => (
            <button
              key={month}
              className="flex min-h-[31px] cursor-pointer items-center justify-between rounded-[5px] border-0 bg-blue px-[11px] text-left text-[12px] font-medium text-white transition-[background,transform] duration-[160ms] hover:-translate-y-px hover:bg-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              type="button"
              aria-pressed={selectedMonth === month}
              onClick={() => setSelectedMonth(month)}
            >
              <span>{month}</span>
              <ChevronRight size={17} strokeWidth={2} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <section className="mt-[19px]" aria-labelledby="payment-record-month">
        <h2 id="payment-record-month" className="mb-[9px] mt-0 text-[13px] font-bold leading-[1.3] text-[#203247]">{selectedMonth}</h2>
        <div className="grid min-h-[119px] grid-cols-[minmax(42px,.45fr)_minmax(130px,1.05fr)_minmax(90px,.8fr)_minmax(145px,1fr)] items-start gap-x-3 rounded-[5px] bg-field px-[clamp(16px,4.6vw,32px)] py-[19px] text-[12px] max600:grid-cols-[42px_minmax(0,1fr)_minmax(76px,.7fr)] max600:gap-x-3 max600:px-4 max600:py-4 max460:grid-cols-[30px_minmax(0,1fr)_minmax(74px,.75fr)] max460:gap-x-2 max460:px-3" role="group" aria-label={`${selectedMonth} payment record`}>
          <div>
            <h3 className="mb-[5px] mt-0 text-[12px] font-extrabold uppercase text-blue">#</h3>
            <p className="m-0 text-[#5c5c5c]">1</p>
          </div>
          <div>
            <h3 className="mb-[5px] mt-0 text-[12px] font-extrabold uppercase text-blue">Project Name</h3>
            <p className="m-0 text-[#30343a]">Focus Level 3</p>
            <p className="m-0 whitespace-nowrap text-[#5c5c5c] max460:whitespace-normal">(20k X 9) = 180,000</p>
          </div>
          <div>
            <h3 className="mb-[5px] mt-0 text-[12px] font-extrabold uppercase text-blue">Amount</h3>
            <p className="m-0 whitespace-nowrap text-[#5c5c5c]"># 50,000</p>
            <p className="m-0 whitespace-nowrap text-[#5c5c5c]"># 100,000</p>
          </div>
          <dl className="col-span-1 m-0 mt-[55px] flex justify-between gap-4 max600:col-span-3 max600:mt-4 max600:justify-end max460:gap-6">
            <div>
              <dt className="font-extrabold uppercase text-blue">Total</dt>
              <dd className="m-0 whitespace-nowrap text-[#5c5c5c]">#150,000</dd>
            </div>
            <div>
              <dt className="font-extrabold uppercase text-blue">Balance</dt>
              <dd className="m-0 whitespace-nowrap text-[#5c5c5c]">#30,000</dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="mt-[22px] flex items-center justify-between gap-5 max600:items-start max600:gap-4 max460:flex-col print:hidden">
        <p className="m-0 flex items-center gap-[10px] text-[12px] leading-[1.4] text-[#182940]">
          <Info className="shrink-0 text-[#1546af]" size={16} fill="currentColor" stroke="white" aria-hidden="true" />
          <span>Click here to <a className="text-blue hover:underline" href="#edit-profile">update payment details</a></span>
        </p>
        <button
          className="inline-flex min-h-[31px] shrink-0 cursor-pointer items-center justify-center rounded-[5px] border-0 bg-blue px-[15px] text-[12px] font-bold text-white transition-colors duration-[160ms] hover:bg-blue-dark max600:min-h-10 max460:w-full"
          type="button"
          onClick={() => window.print()}
        >
          Print Payment Receipt
        </button>
      </footer>
      <button className="absolute right-[-29px] bottom-1 grid size-8 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-[#414448] transition-transform duration-[180ms] hover:translate-y-0.5 max700:right-[-8px] max600:right-[-3px] max600:bottom-0 print:hidden" type="button" aria-label="Scroll to the bottom of payment status" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <ArrowDown size={24} fill="currentColor" strokeWidth={2.5} aria-hidden="true" />
      </button>
    </main>
  )
}

export default PaymentStatus