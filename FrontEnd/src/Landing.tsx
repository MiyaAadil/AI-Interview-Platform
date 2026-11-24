import { Link } from "react-router-dom";

const Landing = () => (
  <main className="overflow-hidden bg-[#fbfaf7] text-[#20251f]">
    <section className="relative mx-auto grid min-h-[640px] w-[min(1180px,_calc(100%_-_40px))] items-center gap-8 py-14 sm:w-[min(1180px,_calc(100%_-_64px))] md:grid-cols-2 md:py-[68px]">
      <div className="z-10 max-w-[540px] pb-5">
        <div className="text-[10px] font-bold tracking-[1.65px] text-[#72776c]"><span className="mr-2 inline-block size-[7px] rounded-full bg-[#8dad44] align-[1px]" />YOUR NEXT INTERVIEW, BETTER PREPARED</div>
        <h1 className="mt-[22px] font-[Manrope] text-[46px] font-semibold leading-[1.08] tracking-[-2.8px] sm:text-[58px] sm:tracking-[-3.5px] lg:text-[66px]">Show up ready.<br /><span className="text-[#8caa4d]">Make your next move.</span></h1>
        <p className="mt-6 max-w-[430px] text-[13px] leading-[1.8] text-[#70736d] sm:text-[15px]">Turn your resume and a role you care about into focused interview practice. Build confidence one thoughtful question at a time.</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link className="inline-flex min-h-[52px] items-center justify-center gap-6 rounded-lg bg-[#222821] px-[22px] text-[13px] font-bold !text-white no-underline transition hover:-translate-y-0.5 hover:bg-[#364131]" to="/signup">Start practicing <span aria-hidden="true">→</span></Link>
          <a className="flex items-center gap-2 text-[13px] font-semibold text-[#555a52] no-underline hover:opacity-65" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
        </div>
        <div className="mt-12 flex items-center gap-3 text-[11px] text-[#70736d]">
          <span className="flex pl-1" aria-hidden="true"><i className="-ml-1 grid size-6 place-items-center rounded-full border-2 border-[#fbfaf7] bg-[#e8c5a7] text-[9px] font-bold not-italic text-[#563c30]">J</i><i className="-ml-1 grid size-6 place-items-center rounded-full border-2 border-[#fbfaf7] bg-[#ccd9be] text-[9px] font-bold not-italic text-[#4b5a3e]">M</i><i className="-ml-1 grid size-6 place-items-center rounded-full border-2 border-[#fbfaf7] bg-[#d8c5df] text-[9px] font-bold not-italic text-[#5f456a]">A</i></span>
          <span>Practice at your pace, on your terms.</span>
        </div>
      </div>

      <div className="relative mx-auto grid min-h-[390px] w-full max-w-[500px] place-items-center md:min-h-[450px]">
        <div className="absolute size-[290px] rounded-full border border-[#efeee8] sm:size-[370px]" />
        <div className="absolute size-[340px] rounded-full border border-dashed border-[#e9e8df] sm:size-[440px]" />
        <span className="absolute left-[8%] top-[12%] text-2xl text-[#a4bc72]">✳</span>
        <span className="absolute bottom-[12%] right-[6%] text-xl text-[#c4c3a9]">✦</span>
        <div className="relative z-10 w-[92%] rotate-[1.5deg] rounded-[14px] border border-[#eeeee8] bg-white px-4 py-4 shadow-[0_27px_70px_#2b301b18,0_4px_12px_#2b301b08] sm:w-[420px] sm:px-[23px] sm:py-[21px]">
          <div className="flex items-center gap-2 text-[8px] font-bold tracking-[1.2px] text-[#8b8e85]"><span className="grid size-5 place-items-center rounded-[6px_6px_6px_2px] bg-[#c7ef75] text-[11px] font-extrabold tracking-[-1px] text-[#26301c]">P</span>YOUR PRACTICE SPACE<span className="ml-auto size-1.5 rounded-full bg-[#9ac84d] ring-[3px] ring-[#eef7df]" /></div>
          <div className="mt-6 flex items-center gap-[11px]">
            <div className="grid size-[38px] place-items-center rounded-[10px] bg-[#f0f4e8] text-[17px] text-[#788e4e]">✦</div>
            <div><strong className="block text-xs">Product designer</strong><small className="mt-1 block text-[9px] text-[#92948d]">Personalized practice</small></div>
            <span className="ml-auto text-[11px] tracking-[2px] text-[#999b94]">•••</span>
          </div>
          <div className="my-[19px] h-px bg-[#eeeee9]" />
          <div className="flex justify-between text-[8px] font-bold tracking-[1.1px] text-[#82945f]"><span>QUESTION 01</span><span className="tracking-[.4px] text-[#9a9d94]">01 / 08</span></div>
          <p className="my-3 max-w-[330px] font-[Manrope] text-[16px] font-semibold leading-[1.45] tracking-[-.5px] sm:text-[18px]">Tell me about a project where you turned a complex problem into a simple experience.</p>
          <div className="flex min-h-[47px] items-center gap-2 rounded-lg border border-[#eeeee8] px-[11px] text-[9px] text-[#92958d]"><span className="text-sm text-[#93b44e]">◉</span><span>Take a moment to think it through...</span><span className="ml-auto flex h-5 items-center gap-0.5" aria-hidden="true"><i className="h-[5px] w-0.5 rounded bg-[#b0cb7a]"/><i className="h-[11px] w-0.5 rounded bg-[#b0cb7a]"/><i className="h-4 w-0.5 rounded bg-[#b0cb7a]"/><i className="h-[5px] w-0.5 rounded bg-[#b0cb7a]"/><i className="h-[11px] w-0.5 rounded bg-[#b0cb7a]"/><i className="h-4 w-0.5 rounded bg-[#b0cb7a]"/><i className="h-[5px] w-0.5 rounded bg-[#b0cb7a]"/></span></div>
          <div className="mt-4 flex justify-between text-[7px] text-[#95978f]"><span className="flex items-center gap-1"><i className="h-[3px] w-7 rounded bg-[linear-gradient(90deg,#9dbc5d_38%,#eceee7_38%)]"/>Session in progress</span><span>✨ &nbsp;Built around your experience</span></div>
        </div>
        <div className="absolute right-0 top-[5%] z-20 flex items-center gap-2 rounded-[10px] border border-[#eeeee8] bg-white p-2.5 shadow-[0_10px_30px_#2b301b13] sm:right-[-4px] sm:p-[11px_13px]"><span className="grid size-7 place-items-center rounded-lg bg-[#f0f5e6] text-sm text-[#6a8838]">↗</span><span><b className="block text-[9px]">Made for your goals</b><small className="mt-1 block text-[8px] text-[#95978f]">Your resume, your role</small></span></div>
        <div className="absolute bottom-[4%] left-0 z-20 flex items-center gap-2 rounded-[10px] border border-[#eeeee8] bg-white p-2.5 shadow-[0_10px_30px_#2b301b13] sm:bottom-[10%] sm:left-0 sm:p-[11px_13px]"><span className="grid size-7 place-items-center rounded-lg bg-[#8eaa53] text-sm text-white">✓</span><span><b className="block text-[9px]">A little better each time</b><small className="mt-1 block text-[8px] text-[#95978f]">Practice without the pressure</small></span></div>
      </div>
      <div className="absolute bottom-7 right-0 hidden items-center gap-2.5 text-[9px] tracking-[.5px] text-[#898c83] md:flex"><span className="font-bold text-[#9db469]">01</span>A calmer way to prepare<span className="h-px w-9 bg-[#d9d9ce]" /></div>
    </section>

    <section className="bg-[#f3f2ec] px-5 py-16 sm:px-8 sm:py-24" id="how-it-works">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid items-end gap-4 md:grid-cols-2">
          <div className="md:col-span-2"><div className="text-[10px] font-bold tracking-[1.65px] text-[#72776c]">A SIMPLE PLACE TO START</div><h2 className="mt-[18px] font-[Manrope] text-[40px] font-semibold leading-[1.1] tracking-[-2.8px] sm:text-[46px]">Practice that starts<br />with <span className="text-[#8caa4d]">you.</span></h2></div>
          <p className="max-w-[330px] text-[13px] leading-[1.8] text-[#72766e] md:justify-self-end">Make your preparation feel more like a plan and less like a guessing game.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          <article className="min-h-[310px] rounded-xl border border-[#e6e5dc] bg-[#fbfaf7] p-5 sm:p-[20px_22px_24px]"><div className="flex justify-between text-[9px] font-bold tracking-[1px] text-[#899175]">01 <span className="text-[13px] font-normal">↗</span></div><div className="relative mt-1 grid h-[125px] place-items-center"><div className="absolute size-[104px] rounded-full border border-[#e8eadf]"/><div className="relative z-10 flex h-[91px] w-[75px] rotate-[-5deg] flex-col gap-2 rounded-[5px] border border-[#e3e4dc] bg-white px-[11px] pt-[22px] shadow-[0_7px_16px_#22281a0b]"><i className="h-[7px] w-[26px] rounded bg-[#c9d7ad]"/><i className="h-[3px] rounded bg-[#e5e9dc]"/><i className="h-[3px] w-3/4 rounded bg-[#e5e9dc]"/><i className="h-[3px] rounded bg-[#e5e9dc]"/></div><div className="absolute z-20 ml-[70px] mt-[46px] grid size-[29px] place-items-center rounded-full border-[3px] border-[#f3f2ec] bg-[#91a95c] text-[7px] font-bold text-white">CV</div></div><h3 className="mt-3 font-[Manrope] text-sm font-bold tracking-[-.3px]">Bring your experience</h3><p className="mt-2 max-w-[300px] text-[11px] leading-[1.75] text-[#777a72]">Start with your resume and the role you have in mind. Your practice is shaped around what matters to you.</p></article>
          <article className="min-h-[310px] rounded-xl border border-[#e6e5dc] bg-[#fbfaf7] p-5 sm:p-[20px_22px_24px]"><div className="flex justify-between text-[9px] font-bold tracking-[1px] text-[#899175]">02 <span className="text-[13px] font-normal">↗</span></div><div className="relative mt-1 grid h-[125px] place-items-center bg-[radial-gradient(#dfe2d6_1px,transparent_1px)] bg-[size:15px_15px]"><div className="rotate-[-3deg] rounded-[10px_10px_10px_2px] border border-[#e6e8de] bg-white px-[17px] py-[13px] font-[Manrope] text-[13px] font-semibold leading-[1.5] shadow-[0_8px_20px_#25291d0b]">What would you<br/>do differently?</div><span className="absolute right-[20%] top-[18%] text-[22px] text-[#9bb66a]">✳</span></div><h3 className="mt-3 font-[Manrope] text-sm font-bold tracking-[-.3px]">Get focused questions</h3><p className="mt-2 max-w-[300px] text-[11px] leading-[1.75] text-[#777a72]">Work through relevant questions that help you connect your experience to the opportunity.</p></article>
          <article className="min-h-[310px] rounded-xl border border-[#e6e5dc] bg-[#fbfaf7] p-5 sm:p-[20px_22px_24px]"><div className="flex justify-between text-[9px] font-bold tracking-[1px] text-[#899175]">03 <span className="text-[13px] font-normal">↗</span></div><div className="relative grid h-[130px] place-items-center bg-[radial-gradient(circle,#f0f3e8_0,#f0f3e8_31%,transparent_31%)]"><div className="grid size-[60px] place-items-center rounded-full border border-[#cdd9b7] bg-[#fafff0] text-[27px] text-[#577633] shadow-[0_0_0_10px_#f3f6ec,0_0_0_11px_#e3e9d8]">✓</div><span className="absolute right-[23%] top-[16%] text-[21px] text-[#a6bc78]">✦</span><span className="absolute bottom-[15%] left-[23%] text-sm text-[#c3b98f]">✳</span></div><h3 className="mt-3 font-[Manrope] text-sm font-bold tracking-[-.3px]">Find your confidence</h3><p className="mt-2 max-w-[300px] text-[11px] leading-[1.75] text-[#777a72]">Practice at your own pace, revisit sessions, and walk into the real conversation feeling prepared.</p></article>
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-[#263126] px-6 py-14 text-[#f7f8f2] sm:px-10">
      <div className="mx-auto flex min-h-[188px] max-w-[1180px] flex-col justify-center gap-7 md:flex-row md:items-center md:justify-between">
        <div><div className="text-[10px] font-bold tracking-[1.65px] text-[#b1c394]">YOUR NEXT CHAPTER STARTS HERE</div><h2 className="mt-[15px] font-[Manrope] text-[39px] font-semibold leading-[1.08] tracking-[-2.5px] sm:text-[43px]">Let’s get you<br/><span className="text-[#c9eb8a]">ready for it.</span></h2></div>
        <Link className="z-10 inline-flex min-h-[52px] w-fit items-center justify-center gap-6 rounded-lg bg-[#d1f18d] px-[22px] text-[13px] font-bold text-white! no-underline transition hover:-translate-y-0.5 hover:bg-[#dcf7a7]" to="/signup">Create your free account <span aria-hidden="true">→</span></Link>
      </div>
      <div className="pointer-events-none absolute -bottom-[102px] right-[15%] text-[300px] leading-none text-white/[.03]" aria-hidden="true"></div>
    </section>

    <footer className="mx-auto flex min-h-[80px] w-[min(1180px,_calc(100%_-_40px))] flex-wrap items-center justify-between gap-4 py-5 text-[10px] text-[#85877f] sm:w-[min(1180px,_calc(100%_-_64px))]">
      <Link to="/" className="flex items-center gap-2.5 font-[Manrope] text-base font-extrabold tracking-[-1px] text-[#252a22] no-underline"><img className="size-6 object-contain" src="/interview-prep-logo.svg" alt="" aria-hidden="true" />prepwise</Link>
      <span className="max-sm:order-3 max-sm:w-full">Practice with purpose. Go in with confidence.</span><span>© {new Date().getFullYear()} Prepwise</span>
    </footer>
  </main>
);

export default Landing;
