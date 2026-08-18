import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeolocatedProspect } from './GeolocatedProspectingTab';
import { Building2, Star, Phone, Globe, ExternalLink, Sparkles, Plus, CheckCircle2 } from 'lucide-react';

const createCustomIcon = (isSelected: boolean, status: string) => {
  const bgColor = isSelected
    ? '#10b981' // emerald-500
    : status === 'En Pipeline' || status === 'Exportado'
    ? '#6366f1' // indigo-500
    : '#0f172a'; // slate-900

  const borderColor = isSelected ? '#ffffff' : '#38bdf8';

  const html = `
    <div style="
      background-color: ${bgColor};
      width: ${isSelected ? '32px' : '26px'};
      height: ${isSelected ? '32px' : '26px'};
      border-radius: 50%;
      border: 2.5px solid ${borderColor};
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.35);
      cursor: pointer;
      transition: all 0.2s ease;
    ">
      <svg width="${isSelected ? '16' : '13'}" height="${isSelected ? '16' : '13'}" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    </div>
  `;

  return L.divIcon({
    className: 'custom-map-pin',
    html,
    iconSize: isSelected ? [32, 32] : [26, 26],
    iconAnchor: isSelected ? [16, 16] : [13, 13],
    popupAnchor: [0, -16],
  });
};

function ChangeMapView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}

interface ProspectMapProps {
  prospects: GeolocatedProspect[];
  selectedProspect: GeolocatedProspect | null;
  onSelectProspect: (prospect: GeolocatedProspect) => void;
  onAddToCrm: (prospect: GeolocatedProspect) => void;
  onEnrichAi: (prospect: GeolocatedProspect) => void;
}

export const ProspectMap: React.FC<ProspectMapProps> = ({
  prospects,
  selectedProspect,
  onSelectProspect,
  onAddToCrm,
  onEnrichAi,
}) => {
  const defaultCenter: [number, number] = selectedProspect
    ? [selectedProspect.lat, selectedProspect.lng]
    : prospects.length > 0
    ? [prospects[0].lat, prospects[0].lng]
    : [-38.9516, -68.0591]; // Neuquén fallback

  const currentCenter: [number, number] = selectedProspect
    ? [selectedProspect.lat, selectedProspect.lng]
    : defaultCenter;

  const currentZoom = selectedProspect ? 13 : 6;

  return (
    <div className="w-full h-full min-h-[380px] rounded-xl overflow-hidden relative border border-slate-700/80 shadow-inner z-0">
      <MapContainer
        center={currentCenter}
        zoom={currentZoom}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', minHeight: '380px', backgroundColor: '#0f172a' }}
      >
        <ChangeMapView center={currentCenter} zoom={currentZoom} />
        
        {/* Dark & High Tech CartoDB Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {prospects.map((prospect) => {
          const isSelected = selectedProspect?.id === prospect.id;
          const icon = createCustomIcon(isSelected, prospect.crmStatus);

          return (
            <Marker
              key={prospect.id}
              position={[prospect.lat, prospect.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onSelectProspect(prospect),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1 space-y-2 max-w-[240px] text-slate-800 font-sans">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                      {prospect.category}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 mt-1 leading-snug">
                      {prospect.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{prospect.address}</p>
                  </div>

                  <div className="text-[11px] space-y-1 text-slate-600 border-t border-slate-100 pt-1.5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 font-bold text-amber-600">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {prospect.rating} ({prospect.reviewsCount})
                      </span>
                      <span className="font-bold text-indigo-700">
                        ~${(prospect.estimatedRevenueUsd / 1000000).toFixed(1)}M USD
                      </span>
                    </div>
                    {prospect.phone && (
                      <p className="text-[11px] text-slate-600">{prospect.phone}</p>
                    )}
                  </div>

                  {prospect.geminiAnalysis && (
                    <div className="bg-indigo-50 border border-indigo-100 p-1.5 rounded-lg text-[10px] text-indigo-900">
                      <p className="font-bold flex items-center gap-1 text-indigo-700">
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        Decisor Sugerido:
                      </p>
                      <p className="line-clamp-2">{prospect.geminiAnalysis.suggestedDecisionMaker}</p>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
                    {prospect.crmStatus === 'No Contactado' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCrm(prospect);
                        }}
                        className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        title="Guardar empresa y contacto en la base de datos del CRM"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Guardar Lead en CRM</span>
                      </button>
                    ) : (
                      <div className="w-full py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-[10px] font-extrabold flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Guardado en DB &amp; Pipeline CRM</span>
                      </div>
                    )}

                    {!prospect.geminiAnalysis && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEnrichAi(prospect);
                        }}
                        className="w-full py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg border border-indigo-200 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                        title="Enriquecer con Gemini IA (SWOT & Decisor)"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>Obtener Decisor e Inteligencia IA</span>
                      </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
