import React, { useState } from 'react';
import {
  Users2,
  Mail,
  Phone,
  Building2,
  MapPin,
  Globe,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { Person } from '../../types';
import { SavedViewsBar } from '../common/SavedViewsBar';

export const PeopleView: React.FC = () => {
  const {
    people,
    deletePerson,
    setSelectedRecord,
    openNewRecordModal,
    openAICopilot,
    filterState,
    t,
    language,
    showToast,
  } = useCRM();

  const [viewStyle, setViewStyle] = useState<'cards' | 'table'>('cards');

  const filteredPeople = people.filter((person) => {
    if (filterState.search) {
      const q = filterState.search.toLowerCase();
      const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
      const matchEmail = person.email.toLowerCase().includes(q);
      const matchCompany = (person.companyName || '').toLowerCase().includes(q);
      const matchJob = person.jobTitle.toLowerCase().includes(q);
      if (!fullName.includes(q) && !matchEmail && !matchCompany && !matchJob) {
        return false;
      }
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Customer':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Contacted':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Lead':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div id="clientum-people-view" className="flex-1 flex flex-col h-full bg-[#0a0c10] overflow-y-auto select-none">
      <SavedViewsBar target="people" />
      <div className="p-4 flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-white">{t('people')}</h2>
          <p className="text-xs text-slate-400">
            {filteredPeople.length} {t('records')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#141822] p-0.5 rounded-md border border-[#232838] flex items-center text-xs">
            <button
              onClick={() => setViewStyle('cards')}
              className={`px-2 py-1 rounded transition-all ${
                viewStyle === 'cards' ? 'bg-[#202636] text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('boardView')}
            </button>
            <button
              onClick={() => setViewStyle('table')}
              className={`px-2 py-1 rounded transition-all ${
                viewStyle === 'table' ? 'bg-[#202636] text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('tableView')}
            </button>
          </div>

          <button
            id="add-person-btn"
            onClick={() => openNewRecordModal('person')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {t('newPerson')}
          </button>
        </div>
      </div>

      {/* Cards View */}
      {viewStyle === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredPeople.map((person) => (
            <div
              key={person.id}
              id={`person-card-${person.id}`}
              onClick={() => setSelectedRecord({ type: 'person', id: person.id })}
              className="bg-[#12151d] hover:bg-[#161a24] border border-[#1e2330] hover:border-[#2d3548] p-4 rounded-xl shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Top Profile Bar */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={
                        person.avatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${person.firstName}-${person.lastName}`
                      }
                      alt={`${person.firstName} ${person.lastName}`}
                      className="w-10 h-10 rounded-full object-cover border border-[#2b3345] shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-white group-hover:text-blue-400 transition-colors truncate">
                        {person.firstName} {person.lastName}
                      </h3>
                      <p className="text-xs text-slate-400 truncate">{person.jobTitle}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getStatusBadge(person.status)}`}>
                    {person.status}
                  </span>
                </div>

                {/* Company Link */}
                {person.companyName && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-3 bg-[#171b26] px-2.5 py-1.5 rounded-lg border border-[#222736]">
                    <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="font-medium truncate">{person.companyName}</span>
                  </div>
                )}

                {/* Contact details */}
                <div className="space-y-1.5 text-[11px] text-slate-400 mb-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="text-slate-300 truncate">{person.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="text-slate-300 truncate">{person.phone}</span>
                  </div>
                  {person.city && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="text-slate-300 truncate">
                        {person.city}, {person.country || ''}
                      </span>
                    </div>
                  )}
                </div>

                {person.notes && (
                  <p className="text-[11px] text-slate-400 italic line-clamp-2 bg-[#10121a] p-2 rounded border border-[#1b202c]">
                    "{person.notes}"
                  </p>
                )}
              </div>

              {/* Footer Actions */}
              <div className="mt-3 pt-2.5 border-t border-[#1a1f2c] flex items-center justify-between text-xs text-slate-400">
                <span className="text-[10px] text-slate-400">
                  Rep: {person.assignedTo.split(' ')[0]}
                </span>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    id={`person-ai-email-${person.id}`}
                    onClick={() =>
                      openAICopilot({
                        type: 'person',
                        id: person.id,
                        name: `${person.firstName} ${person.lastName}`,
                        initialPrompt: language === 'es'
                          ? `Redacta un correo de prospección comercial personalizado y de alta conversión para ${person.firstName} (${person.jobTitle} en ${person.companyName || 'su empresa'}).`
                          : language === 'pt'
                          ? `Redija um e-mail de prospecção comercial personalizado e de alta conversão para ${person.firstName} (${person.jobTitle} na ${person.companyName || 'sua empresa'}).`
                          : `Draft a personalized, high-conversion sales outreach email to ${person.firstName} (${person.jobTitle} at ${person.companyName || 'their company'}).`,
                      })
                    }
                    className="p-1 rounded text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors"
                    title="Draft AI Email"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  <button
                    id={`delete-person-${person.id}`}
                    onClick={() => {
                      if (confirm(`Delete ${person.firstName} ${person.lastName}?`)) {
                        deletePerson(person.id);
                      }
                    }}
                    className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-[#11141c] border border-[#1e2330] rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#141822] text-slate-400 border-b border-[#1e2330]">
              <tr>
                <th className="px-3 py-2.5 font-semibold text-slate-300">Name</th>
                <th className="px-3 py-2.5 font-semibold text-slate-300">Title</th>
                <th className="px-3 py-2.5 font-semibold text-slate-300">Company</th>
                <th className="px-3 py-2.5 font-semibold text-slate-300">Email</th>
                <th className="px-3 py-2.5 font-semibold text-slate-300">Status</th>
                <th className="px-3 py-2.5 font-semibold text-slate-300">Owner</th>
                <th className="w-16 px-3 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#191e2a]">
              {filteredPeople.map((p) => (
                <tr
                  key={p.id}
                  id={`person-row-${p.id}`}
                  onClick={() => setSelectedRecord({ type: 'person', id: p.id })}
                  className="hover:bg-[#161a24] cursor-pointer transition-colors"
                >
                  <td className="px-3 py-2.5 font-semibold text-white flex items-center gap-2">
                    <img
                      src={
                        p.avatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.firstName}-${p.lastName}`
                      }
                      alt=""
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="hover:text-blue-400">
                      {p.firstName} {p.lastName}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-slate-300">{p.jobTitle}</td>
                  <td className="px-3 py-2.5 text-slate-300">{p.companyName || '—'}</td>
                  <td className="px-3 py-2.5 text-slate-400 font-mono text-[11px]">{p.email}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getStatusBadge(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-slate-400">{p.assignedTo}</td>
                  <td className="px-3 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      id={`table-delete-person-${p.id}`}
                      onClick={() => {
                        if (confirm(`Delete ${p.firstName}?`)) deletePerson(p.id);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};
