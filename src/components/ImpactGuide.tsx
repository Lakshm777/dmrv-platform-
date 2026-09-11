import React from 'react';
import { Globe2, ShieldCheck, Sprout, ArrowRight, Database, Map as MapIcon, LineChart, Network, Wallet } from 'lucide-react';

export default function ImpactGuide() {
  return (
    <div className="p-5 pt-8 pb-32 max-w-md mx-auto">
      <header className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm border border-stone-200 mb-4">
          <Globe2 className="w-6 h-6 text-slate-800" />
        </div>
        <h1 className="text-3xl font-serif text-slate-900 tracking-tight mb-2">
          dMRV & Impact
        </h1>
        <p className="text-stone-500 text-sm font-medium">Understanding our contribution to nature.</p>
      </header>

      <div className="space-y-8">
        
        {/* Our System Architecture */}
        <section className="bg-white rounded-3xl p-7 shadow-sm border border-stone-200/60">
          <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
            <div className="p-2 bg-stone-50 text-indigo-700 rounded-full border border-stone-100">
              <Network className="w-5 h-5 stroke-[1.5px]" />
            </div>
            <h2 className="text-xl font-serif text-slate-900">System Architecture</h2>
          </div>
          
          <div className="mb-6 space-y-3">
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Digital Measurement, Reporting, and Verification (dMRV) platforms are the technological backbone of the modern voluntary carbon market.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              This application serves as the critical "first mile" of a broader, technology-agnostic ecosystem. Below is a high-level overview of how field data flows from remote farms all the way to global climate finance markets.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Layer 1 */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/50 relative">
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 mb-3 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">1</span> 
                Field Collection
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center justify-center h-16">
                  <span className="text-[9px] font-bold text-slate-700 leading-tight">Data Onboarding</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center justify-center h-16">
                  <span className="text-[9px] font-bold text-slate-700 leading-tight">Field Mapping</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center justify-center h-16">
                  <span className="text-[9px] font-bold text-slate-700 leading-tight">GPS Mapping & Data</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <span className="inline-block bg-white px-3 py-1 rounded-lg text-[9px] font-medium text-stone-500 border border-stone-200 shadow-sm">
                  ↓ Secure Local State Management
                </span>
              </div>
            </div>

            <div className="flex justify-center -my-2 relative z-10">
              <ArrowRight className="w-4 h-4 text-stone-300 rotate-90" />
            </div>

            {/* Layer 2 */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/50 relative">
              <div className="text-[10px] font-bold uppercase tracking-widest text-sky-700 mb-3 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center">2</span> 
                Data Processing Layer
              </div>
              <div className="space-y-2">
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3">
                  <Database className="w-4 h-4 text-sky-600" />
                  <span className="text-[10px] font-bold text-slate-700">Data Storage</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3">
                  <MapIcon className="w-4 h-4 text-sky-600" />
                  <span className="text-[10px] font-bold text-slate-700">Remote Sensing & Earth Obs.</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3">
                  <LineChart className="w-4 h-4 text-sky-600" />
                  <span className="text-[10px] font-bold text-slate-700">Plot Mgmt & Quantification</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-2 relative z-10">
              <ArrowRight className="w-4 h-4 text-stone-300 rotate-90" />
            </div>

            {/* Layer 3 */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/50 relative">
              <div className="text-[10px] font-bold uppercase tracking-widest text-purple-700 mb-3 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center">3</span> 
                Registry & Distribution
              </div>
              <div className="space-y-2">
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span className="text-[10px] font-bold text-slate-700">Standard Registry</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3">
                  <Globe2 className="w-4 h-4 text-purple-600" />
                  <span className="text-[10px] font-bold text-slate-700">Marketplace / Exchange</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3">
                  <Wallet className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-bold text-slate-700">Beneficiary Wallet (Payout)</span>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* The Carbon Market */}
        <section className="bg-white rounded-3xl p-7 shadow-sm border border-stone-200/60">
          <div className="flex items-center gap-3 mb-5 border-b border-stone-100 pb-4">
            <div className="p-2 bg-stone-50 text-emerald-700 rounded-full border border-stone-100">
              <Sprout className="w-5 h-5 stroke-[1.5px]" />
            </div>
            <h2 className="text-xl font-serif text-slate-900">The Carbon Market</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              The Carbon Market allows organizations to buy <span className="font-semibold text-emerald-800">Carbon Credits</span> to offset their unavoidable greenhouse gas emissions. One credit equals one metric ton of CO₂ removed from the atmosphere.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              By adopting sustainable practices (like No-Till farming or optimized Nitrogen usage), farmers sequester carbon in the soil and can sell these credits—creating a new revenue stream while healing the earth.
            </p>
          </div>
        </section>

        {/* Architecture & dMRV */}
        <section className="bg-white rounded-3xl p-7 shadow-sm border border-stone-200/60">
          <div className="flex items-center gap-3 mb-5 border-b border-stone-100 pb-4">
            <div className="p-2 bg-stone-50 text-slate-700 rounded-full border border-stone-100">
              <ShieldCheck className="w-5 h-5 stroke-[1.5px]" />
            </div>
            <h2 className="text-xl font-serif text-slate-900">What is dMRV?</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Historically, verifying carbon sequestration involved expensive, manual paper audits. <span className="font-semibold text-slate-900">digital Measurement, Reporting, and Verification (dMRV)</span> digitizes this trust.
          </p>
          
          <div className="bg-stone-50/50 rounded-2xl p-5 border border-stone-200/50">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-6 text-center">dMRV in Action</h3>
            
            <div className="space-y-6 relative">
              {/* Connecting Line */}
              <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-stone-200 z-0"></div>

              {/* Stage 1: Measurement */}
              <div className="relative z-10 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center flex-shrink-0 text-slate-800 font-serif text-lg">
                  M
                </div>
                <div className="flex-1 pt-1.5">
                  <span className="text-[11px] uppercase font-bold text-slate-800 tracking-widest block mb-1">Measurement</span>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">Quantifying environmental impact accurately in the field.</p>
                  <div className="bg-white text-[10px] text-stone-600 p-2.5 rounded-xl border border-stone-200 font-medium shadow-sm">
                    <span className="font-bold text-slate-800">Example:</span> Walking the farm perimeter to capture precise GPS boundaries and calculating exact Hectares offline using spatial mapping algorithms.
                  </div>
                </div>
              </div>

              {/* Stage 2: Reporting */}
              <div className="relative z-10 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center flex-shrink-0 text-slate-800 font-serif text-lg">
                  R
                </div>
                <div className="flex-1 pt-1.5">
                  <span className="text-[11px] uppercase font-bold text-slate-800 tracking-widest block mb-1">Reporting</span>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">Digitizing field data using mobile-first structured data collection forms.</p>
                  <div className="bg-white text-[10px] text-stone-600 p-2.5 rounded-xl border border-stone-200 font-medium shadow-sm">
                    <span className="font-bold text-slate-800">Example:</span> Agents log agronomic practices via structured survey inputs, compiling the data instantly into secure local state management.
                  </div>
                </div>
              </div>

              {/* Stage 3: Verification */}
              <div className="relative z-10 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center flex-shrink-0 text-slate-800 font-serif text-lg">
                  V
                </div>
                <div className="flex-1 pt-1.5">
                  <span className="text-[11px] uppercase font-bold text-slate-800 tracking-widest block mb-1">Verification</span>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">Proving without a doubt that the action actually occurred.</p>
                  <div className="bg-white text-[10px] text-stone-600 p-2.5 rounded-xl border border-stone-200 font-medium shadow-sm">
                    <span className="font-bold text-slate-800">Example:</span> Snapping corner photos embedded with exact GPS coordinates and timestamps as undeniable ground-truth evidence.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="bg-slate-900 rounded-3xl p-8 text-stone-50 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <Globe2 className="w-32 h-32 text-white" />
          </div>
          <h2 className="text-xl font-serif mb-5 flex items-center gap-2 relative z-10">
            Your Contribution <ArrowRight className="w-5 h-5 text-emerald-400" />
          </h2>
          <ul className="space-y-4 text-sm font-light text-stone-300 relative z-10 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-emerald-400 mt-0.5">•</span>
              <span><strong className="text-white font-medium">Empowering Farmers:</strong> Bringing climate finance to remote, rural communities by lowering audit costs.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 mt-0.5">•</span>
              <span><strong className="text-white font-medium">Preventing Greenwashing:</strong> Guaranteeing that bought credits represent real, cryptographically-proven environmental impact.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-400 mt-0.5">•</span>
              <span><strong className="text-white font-medium">Healing the Earth:</strong> Directly incentivizing the transition to regenerative agriculture.</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
