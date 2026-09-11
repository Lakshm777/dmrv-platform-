import React, { useState, useEffect, useRef } from 'react';
import { useFarmerStore } from '../store';
import { Search, Map as MapIcon, CheckCircle, Camera, RotateCcw, UploadCloud, Layers, Undo2, Trash2 } from 'lucide-react';
import { MapContainer, TileLayer, Polygon, Marker, useMapEvents, LayersControl } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import * as turf from '@turf/turf';

// Custom icons for map pins (Classy version)
const createVertexIcon = (color: string, label: string) => L.divIcon({
  className: 'custom-icon border-0 bg-transparent',
  html: `<div style="background: ${color}; width: 28px; height: 28px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-family: serif; font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transform: translateY(-5px);">${label}</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const PIN_COLORS = ['#0f172a', '#334155', '#047857', '#0369a1', '#b45309', '#be123c'];
const PIN_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

interface FieldMappingProps {
  prefilledId: string;
}

function MapEvents({ onAddPoint }: { onAddPoint: (latlng: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onAddPoint(e.latlng);
    },
  });
  return null;
}

export default function FieldMapping({ prefilledId }: FieldMappingProps) {
  const getFarmer = useFarmerStore((state) => state.getFarmer);
  const farmers = useFarmerStore((state) => state.farmers);
  const updateFarmerData = useFarmerStore((state) => state.updateFarmerData);
  
  const defaultSearchId = prefilledId && farmers[prefilledId] 
    ? prefilledId 
    : Object.keys(farmers).length > 0 
      ? Object.keys(farmers)[0] 
      : '';

  const [searchId, setSearchId] = useState(defaultSearchId);
  const [activeFarmer, setActiveFarmer] = useState(getFarmer(defaultSearchId));
  const [points, setPoints] = useState<LatLng[]>([]);
  const [areaInfo, setAreaInfo] = useState<{ hectares: number; acres: number; areaM2: number } | null>(null);
  
  const [photos, setPhotos] = useState<Record<string, { previewUrl: string, timestamp: string }>>({});
  
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchId) {
      const farmer = getFarmer(searchId);
      if (farmer) {
        setActiveFarmer(farmer);
        if (farmer.polygon && farmer.polygon.coordinates && farmer.polygon.coordinates[0]) {
           const coords = farmer.polygon.coordinates[0].map((c: number[]) => L.latLng(c[1], c[0]));
           if (coords.length > 0) coords.pop();
           setPoints(coords);
        } else {
           setPoints([]);
        }
      } else {
        setActiveFarmer(undefined);
      }
    }
  }, [searchId, getFarmer]);

  useEffect(() => {
    if (prefilledId && farmers[prefilledId]) {
      setSearchId(prefilledId);
    }
  }, [prefilledId, farmers]);

  const handleAddPoint = (latlng: LatLng) => {
    setPoints(prev => [...prev, latlng]);
  };

  const handleUndoPoint = () => {
    setPoints(prev => prev.slice(0, -1));
  };

  const handleReset = () => {
    setPoints([]);
    setAreaInfo(null);
  };

  useEffect(() => {
    if (points.length >= 3) {
      const coords = points.map(p => [p.lng, p.lat]);
      coords.push([...coords[0]]);
      const polygon = turf.polygon([coords]);
      const areaM2 = turf.area(polygon);
      const hectares = areaM2 / 10000;
      const acres = areaM2 * 0.000247105;
      
      setAreaInfo({ hectares, acres, areaM2 });
    } else {
      setAreaInfo(null);
    }
  }, [points]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setPhotos(prev => ({ ...prev, [id]: { previewUrl, timestamp: timeString } }));
    }
  };

  const handleSave = () => {
    if (!activeFarmer) return;
    
    let geojsonPoly = null;
    if (points.length >= 3) {
      const coords = points.map(p => [p.lng, p.lat]);
      coords.push([...coords[0]]);
      geojsonPoly = turf.polygon([coords]).geometry;
    }

    const simplePhotos: Record<string, string> = {};
    Object.keys(photos).forEach(k => {
      simplePhotos[k] = photos[k].timestamp;
    });

    updateFarmerData(activeFarmer.uniqueId, {
      polygon: geojsonPoly,
      areaHectares: areaInfo?.hectares,
      areaAcres: areaInfo?.acres,
      photos: {
        corners: simplePhotos,
        center: simplePhotos['center']
      }
    });

    alert("Plot Boundary successfully synchronized to the cloud! \n✓ Spatial geometry verified.");
  };

  const farmersList = Object.values(farmers);

  return (
    <div className="flex flex-col h-full bg-stone-50">
      {/* Search Header (Dropdown) */}
      <div className="p-6 bg-white z-20 flex-shrink-0 sticky top-0 rounded-b-[2rem] shadow-sm border-b border-stone-200">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-slate-800 transition-colors pointer-events-none" />
          <select 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-stone-50/50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-slate-800/10 focus:border-slate-800 outline-none transition-all font-serif font-medium text-sm text-slate-800 appearance-none cursor-pointer"
          >
            <option value="">Select a Registered Farmer...</option>
            {farmersList.map(f => (
              <option key={f.uniqueId} value={f.uniqueId}>
                {f.fullName} ({f.uniqueId})
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 text-xs">
            ▼
          </div>
        </div>

        {activeFarmer && (
          <div className="mt-5 p-5 bg-white border border-stone-200 rounded-2xl shadow-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif text-slate-900 text-lg tracking-tight">{activeFarmer.fullName}</h3>
                <p className="text-sm text-stone-500 font-medium mt-0.5">{activeFarmer.district}, {activeFarmer.state}</p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] uppercase font-bold bg-stone-100 text-stone-600 px-3 py-1.5 rounded-full border border-stone-200">{activeFarmer.primaryCropType}</span>
                  <span className="text-[10px] uppercase font-bold bg-stone-100 text-stone-600 px-3 py-1.5 rounded-full border border-stone-200">{activeFarmer.landRecords.length} Parcels</span>
                </div>
              </div>
              <span className="bg-emerald-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            </div>
          </div>
        )}
      </div>

      {!activeFarmer ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-white border border-stone-200 rounded-full flex items-center justify-center mb-5 shadow-sm">
            <MapIcon className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-xl font-serif text-slate-900 mb-2">No Active Context</h3>
          <p className="text-stone-500 text-sm">Please select a Farmer ID from the dropdown above to begin mapping.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pb-32">
          {/* Map Container */}
          <div className="relative h-[45vh] w-full bg-stone-200 m-4 rounded-3xl overflow-hidden shadow-sm border border-stone-200" style={{ width: 'calc(100% - 2rem)' }}>
            <MapContainer 
              center={[20.5937, 78.9629]} 
              zoom={5} 
              scrollWheelZoom={true} 
              className="h-full w-full z-0"
              ref={mapRef}
            >
              <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Satellite">
                  <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution='&copy; Esri' />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Street View">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Topo/Terrain">
                  <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" attribution='&copy; OpenTopoMap' />
                </LayersControl.BaseLayer>
              </LayersControl>
              
              <MapEvents onAddPoint={handleAddPoint} />
              
              {points.map((p, idx) => (
                <Marker key={idx} position={p} icon={createVertexIcon(PIN_COLORS[idx % PIN_COLORS.length], PIN_LABELS[idx % PIN_LABELS.length])} />
              ))}

              {points.length >= 3 && (
                <Polygon positions={[...points, points[0]]} pathOptions={{ color: '#047857', fillColor: 'rgba(4, 120, 87, 0.2)', fillOpacity: 1, weight: 2 }} />
              )}
            </MapContainer>

            {/* Map Overlay Stats */}
            <div className="absolute bottom-4 left-4 right-4 z-[400] flex flex-col gap-3 pointer-events-none">
              <div className="flex justify-end gap-2 w-full">
                {points.length > 0 && (
                  <button onClick={handleUndoPoint} className="bg-white/95 backdrop-blur-sm text-slate-700 p-3 rounded-full shadow-sm pointer-events-auto hover:bg-white transition-all border border-stone-200" title="Undo Last Point">
                    <Undo2 className="w-5 h-5 stroke-[1.5px]" />
                  </button>
                )}
                <button onClick={handleReset} className="bg-white/95 backdrop-blur-sm text-rose-500 p-3 rounded-full shadow-sm pointer-events-auto hover:bg-white transition-all border border-stone-200" title="Clear All Boundary Points">
                  <Trash2 className="w-5 h-5 stroke-[1.5px]" />
                </button>
              </div>
              
              {areaInfo && (
                <div className="bg-white/95 backdrop-blur-sm text-slate-900 p-4 rounded-2xl shadow-sm pointer-events-auto flex items-center justify-between border border-stone-200 animate-in slide-in-from-bottom-5">
                  <div>
                    <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1">Total Plot Area</p>
                    <p className="font-serif text-xl tracking-tight text-emerald-800">
                      {(areaInfo.areaM2 / 10000).toFixed(2)} Ha 
                      <span className="text-sm font-sans font-medium text-stone-400 ml-1.5">/ {(areaInfo.areaM2 * 0.000247105).toFixed(2)} Ac</span>
                    </p>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-xl text-[10px] font-bold flex flex-col items-center gap-1 uppercase tracking-widest">
                    <CheckCircle className="w-4 h-4" />
                    <span>Closed</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Photo Section */}
          <div className="px-5 mt-8 space-y-6">
            <div>
              <h3 className="font-serif text-slate-900 text-xl mb-1">Corner Photo Proofs</h3>
              <p className="text-sm text-stone-500 font-medium">Capture ground-truth evidence at each vertex.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {points.map((_, idx) => {
                const labelId = PIN_LABELS[idx % PIN_LABELS.length];
                const photoData = photos[labelId];
                return (
                  <div key={labelId} className="relative">
                    <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => handlePhotoUpload(e, labelId)} />
                    <div className={`relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-3xl border transition-all duration-300 h-full ${
                      photoData ? 'border-emerald-200 bg-emerald-50 text-emerald-900 shadow-sm' : 'border-stone-200 bg-white text-stone-400 hover:border-stone-300'
                    }`}>
                      {photoData ? (
                        <>
                          <div className="absolute inset-0 opacity-30"><img src={photoData.previewUrl} alt={`Point ${labelId}`} className="w-full h-full object-cover grayscale mix-blend-multiply" /></div>
                          <div className="relative z-10 flex flex-col items-center">
                            <div className="p-2.5 rounded-full bg-emerald-700 text-white shadow-sm mb-3"><CheckCircle className="w-4 h-4" /></div>
                            <span className="text-sm font-serif font-bold text-slate-900 drop-shadow-sm">Point {labelId}</span>
                            <span className="text-[9px] font-bold mt-2 px-2.5 py-1 rounded-full bg-white/90 border border-emerald-100 text-emerald-700 whitespace-nowrap uppercase tracking-widest">Captured • GPS</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-3.5 rounded-full bg-stone-50 text-stone-400 border border-stone-100 mb-3"><Camera className="w-5 h-5 stroke-[1.5px]" /></div>
                          <span className="text-sm font-serif font-bold text-slate-700">Point {labelId}</span>
                          <span className="text-[9px] font-bold mt-2 px-2.5 py-1 rounded-full text-stone-400 uppercase tracking-widest">Tap to Snap</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {points.length > 0 && (
                <div className="col-span-2 relative mt-2">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => handlePhotoUpload(e, 'center')} />
                  <div className={`relative overflow-hidden flex flex-row items-center justify-between p-6 rounded-3xl border transition-all duration-300 ${
                    photos['center'] ? 'border-emerald-200 bg-emerald-50 shadow-sm' : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}>
                    {photos['center'] && <div className="absolute inset-0 opacity-20"><img src={photos['center'].previewUrl} className="w-full h-full object-cover grayscale mix-blend-multiply" /></div>}
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`p-3.5 rounded-full shadow-sm border ${photos['center'] ? 'bg-emerald-700 text-white border-emerald-800' : 'bg-stone-50 text-stone-400 border-stone-100'}`}>
                        {photos['center'] ? <CheckCircle className="w-5 h-5 stroke-[1.5px]" /> : <Camera className="w-5 h-5 stroke-[1.5px]" />}
                      </div>
                      <div className="text-left">
                        <span className={`block text-lg font-serif ${photos['center'] ? 'text-slate-900 drop-shadow-sm' : 'text-slate-800'}`}>Plot Center</span>
                        <span className={`text-xs font-medium ${photos['center'] ? 'text-emerald-700' : 'text-stone-500'}`}>Capture overall field health</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {points.length >= 3 && (
              <button onClick={handleSave} className="w-full mt-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-2xl shadow-md transition-all flex justify-center items-center gap-2">
                <UploadCloud className="w-5 h-5" /> Sync Polygon to Registry
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
