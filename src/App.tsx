import React, { useState } from 'react';
import { MapPin, ClipboardList, Globe2 } from 'lucide-react';
import DataOnboarding from './components/DataOnboarding';
import FieldMapping from './components/FieldMapping';
import ImpactGuide from './components/ImpactGuide';

function App() {
  const [activeTab, setActiveTab] = useState<'impact' | 'onboarding' | 'mapping'>('impact');
  const [prefilledId, setPrefilledId] = useState<string>('');

  const handleProceedToMapping = (id: string) => {
    setPrefilledId(id);
    setActiveTab('mapping');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-stone-50 text-slate-800 font-sans flex flex-col relative overflow-hidden shadow-2xl sm:border-x border-stone-200">
      
      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-10 pb-28">
        <div className="animate-in fade-in duration-300 h-full">
          {activeTab === 'impact' && <ImpactGuide />}
          {activeTab === 'onboarding' && <DataOnboarding onProceed={handleProceedToMapping} />}
          {activeTab === 'mapping' && <FieldMapping prefilledId={prefilledId} />}
        </div>
      </main>

      {/* Elegant Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-stone-200 px-6 py-3 flex justify-between items-center z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] pb-safe">
        
        <button
          onClick={() => setActiveTab('impact')}
          className={`flex flex-col items-center py-2 px-6 rounded-2xl transition-all duration-300 ease-out relative ${
            activeTab === 'impact' 
              ? 'text-emerald-800 bg-emerald-50/50' 
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <Globe2 className={`w-5 h-5 mb-1 ${activeTab === 'impact' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[10px] font-semibold tracking-widest uppercase">Impact</span>
        </button>

        <button
          onClick={() => setActiveTab('onboarding')}
          className={`flex flex-col items-center py-2 px-6 rounded-2xl transition-all duration-300 ease-out relative ${
            activeTab === 'onboarding' 
              ? 'text-emerald-800 bg-emerald-50/50' 
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <ClipboardList className={`w-5 h-5 mb-1 ${activeTab === 'onboarding' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[10px] font-semibold tracking-widest uppercase">Registry</span>
        </button>
        
        <button
          onClick={() => setActiveTab('mapping')}
          className={`flex flex-col items-center py-2 px-6 rounded-2xl transition-all duration-300 ease-out relative ${
            activeTab === 'mapping' 
              ? 'text-emerald-800 bg-emerald-50/50' 
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          <MapPin className={`w-5 h-5 mb-1 ${activeTab === 'mapping' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[10px] font-semibold tracking-widest uppercase">Mapping</span>
        </button>

      </nav>
    </div>
  );
}

export default App;
