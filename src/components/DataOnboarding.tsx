import React, { useState } from 'react';
import { useFarmerStore } from '../store';
import { ClipboardCopy, CheckCircle2, ArrowRight, User, Map, Leaf, Plus, Trash2 } from 'lucide-react';
import { FarmerData } from '../types';

interface DataOnboardingProps {
  onProceed: (id: string) => void;
}

export default function DataOnboarding({ onProceed }: DataOnboardingProps) {
  const addFarmer = useFarmerStore((state) => state.addFarmer);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    district: '',
    state: '',
    primaryCropType: 'Wheat',
    tillagePractice: 'Conventional'
  });

  const [landRecords, setLandRecords] = useState<{ id: string; type: string; referenceNumber: string }[]>([]);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddRecord = () => {
    setLandRecords(prev => [
      ...prev,
      { id: Math.random().toString(36).substr(2, 9), type: 'Khasra', referenceNumber: '' }
    ]);
  };

  const handleRecordChange = (id: string, field: string, value: string) => {
    setLandRecords(prev => prev.map(rec => rec.id === id ? { ...rec, [field]: value } : rec));
  };

  const handleRemoveRecord = (id: string) => {
    setLandRecords(prev => prev.filter(rec => rec.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return alert("Please fill required fields");
    
    // Generate an ID like FID-PU-260909-1884
    const stateCode = formData.state.substring(0, 2).toUpperCase() || 'XX';
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `FID-${stateCode}-${dateStr}-${randomSuffix}`;
    
    const newFarmer: FarmerData = {
      uniqueId: newId,
      ...formData,
      landRecords,
      status: 'Draft',
      createdAt: new Date().toISOString()
    };
    
    addFarmer(newFarmer);
    setGeneratedId(newId);
  };

  const handleCopy = () => {
    if (generatedId) {
      navigator.clipboard.writeText(generatedId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (generatedId) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] p-6 max-w-md mx-auto">
        <div className="bg-white border border-stone-200/80 rounded-3xl p-8 text-center shadow-sm w-full animate-in zoom-in-95 duration-500">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-emerald-600 text-white rounded-full p-4 flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5px]" />
            </div>
          </div>
          
          <h2 className="text-2xl font-serif text-slate-900 mb-2">Record Saved</h2>
          <p className="text-stone-500 text-sm font-medium mb-6">Farmer entity successfully written to registry.</p>
          
          <div className="inline-flex items-center gap-3 bg-stone-50 text-slate-800 font-mono font-medium px-5 py-3 rounded-2xl mb-6 border border-stone-200/80 shadow-sm">
            <span className="tracking-wider text-[15px]">{generatedId}</span>
            <div className="w-px h-5 bg-stone-200"></div>
            <button 
              onClick={handleCopy} 
              className={`p-1.5 rounded-lg transition-colors ${copied ? 'text-emerald-600' : 'text-stone-400 hover:text-stone-600'}`}
            >
              {copied ? <CheckCircle2 className="w-5 h-5" /> : <ClipboardCopy className="w-5 h-5" />}
            </button>
          </div>
          
          <button 
            onClick={() => onProceed(generatedId)}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            Map Plot Boundary <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 pt-8 max-w-md mx-auto">
      <header className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="bg-stone-200/70 text-stone-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-stone-300/50">Draft Mode</span>
        </div>
        <h1 className="text-3xl font-serif text-slate-900 tracking-tight mb-2">Data Onboarding</h1>
        <p className="text-stone-500 text-sm font-medium">Register a new farmer entity.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Personal Info Card */}
        <section className="bg-white rounded-3xl p-7 border border-stone-200/60 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
            <div className="p-2 bg-stone-50 text-emerald-700 rounded-full border border-stone-100">
              <User className="w-5 h-5 stroke-[1.5px]" />
            </div>
            <h2 className="text-xl font-serif text-slate-900">Personal Info</h2>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Full Name</label>
              <input 
                name="fullName" value={formData.fullName} onChange={handleInputChange} 
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all font-medium" 
                placeholder="e.g. Rajesh Sharma"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Phone Number</label>
              <input 
                name="phone" value={formData.phone} onChange={handleInputChange} 
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all font-medium" 
                placeholder="+91 98765 43210"
                required
              />
            </div>
          </div>
        </section>

        {/* Location & Land Tenure Card */}
        <section className="bg-white rounded-3xl p-7 border border-stone-200/60 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
            <div className="p-2 bg-stone-50 text-sky-700 rounded-full border border-stone-100">
              <Map className="w-5 h-5 stroke-[1.5px]" />
            </div>
            <h2 className="text-xl font-serif text-slate-900">Land Tenure</h2>
          </div>
          
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">State</label>
                <input 
                  name="state" value={formData.state} onChange={handleInputChange} 
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600 outline-none transition-all font-medium" 
                  placeholder="e.g. Punjab"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">District</label>
                <input 
                  name="district" value={formData.district} onChange={handleInputChange} 
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-sky-600/20 focus:border-sky-600 outline-none transition-all font-medium" 
                  placeholder="e.g. Ludhiana"
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">Document References</label>
                <button type="button" onClick={handleAddRecord} className="text-sky-700 text-xs font-semibold flex items-center gap-1 hover:text-sky-800 transition-colors">
                  <Plus className="w-4 h-4" /> Add Doc
                </button>
              </div>
              
              <div className="space-y-3">
                {landRecords.length === 0 ? (
                  <div className="border-2 border-dashed border-stone-200/70 rounded-2xl p-6 text-center text-stone-400 bg-stone-50/50">
                    <p className="text-xs font-medium">No documents attached.</p>
                  </div>
                ) : (
                  landRecords.map((rec) => (
                    <div key={rec.id} className="bg-stone-50/50 border border-stone-200 rounded-2xl p-3 flex items-center gap-3">
                      <select 
                        value={rec.type}
                        onChange={(e) => handleRecordChange(rec.id, 'type', e.target.value)}
                        className="bg-white border border-stone-200 text-slate-700 text-sm font-medium rounded-xl py-2 px-3 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                      >
                        <option>Khasra</option>
                        <option>Patta</option>
                        <option>Title Deed</option>
                      </select>
                      <input 
                        type="text"
                        value={rec.referenceNumber}
                        onChange={(e) => handleRecordChange(rec.id, 'referenceNumber', e.target.value)}
                        className="flex-1 bg-white border border-stone-200 text-slate-700 text-sm font-mono rounded-xl py-2 px-3 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
                        placeholder="Ref Number"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveRecord(rec.id)}
                        className="p-2 rounded-xl text-rose-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Agronomy Card */}
        <section className="bg-white rounded-3xl p-7 border border-stone-200/60 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
            <div className="p-2 bg-stone-50 text-amber-600 rounded-full border border-stone-100">
              <Leaf className="w-5 h-5 stroke-[1.5px]" />
            </div>
            <h2 className="text-xl font-serif text-slate-900">Agronomy</h2>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Primary Crop Type</label>
              <select 
                name="primaryCropType" value={formData.primaryCropType} onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-medium"
              >
                <option>Wheat</option>
                <option>Rice</option>
                <option>Soybean</option>
                <option>Maize</option>
                <option>Cotton</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Tillage Practice</label>
              <select 
                name="tillagePractice" value={formData.tillagePractice} onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-medium"
              >
                <option>Conventional</option>
                <option>Minimum Till</option>
                <option>No-Till (Zero)</option>
              </select>
            </div>
          </div>
        </section>

        <button 
          type="submit" 
          className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 mb-8"
        >
          Submit Record
        </button>

      </form>
    </div>
  );
}
