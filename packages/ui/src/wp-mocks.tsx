import React from 'react';
import { Loader2, Search, Check, ChevronDown } from 'lucide-react';

export const Spinner = () => <Loader2 className="animate-spin" />;

export const Button = ({ children, onClick, variant, className, ...props }: any) => (
  <button 
    onClick={onClick} 
    className={`px-4 py-2 rounded-md font-medium transition-colors ${
      variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const SelectControl = ({ label, value, options, onChange, ...props }: any) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-xs font-bold text-slate-400">{label}</label>}
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-sm text-slate-200"
      {...props}
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export const SearchControl = ({ label, value, onChange, placeholder }: any) => (
  <div className="relative">
    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || label}
      className="w-full bg-slate-900 border border-slate-700 rounded-md pl-8 pr-2 py-1 text-sm text-slate-200"
    />
  </div>
);

export const CheckboxControl = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-blue-600 border-blue-600' : 'bg-slate-900 border-slate-700'}`}>
      {checked && <Check className="w-3 h-3 text-white" />}
    </div>
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={(e) => onChange(e.target.checked)}
      className="hidden"
    />
    {label && <span className="text-sm text-slate-300">{label}</span>}
  </label>
);

export const Icon = ({ icon, size = 20, ...props }: any) => {
  if (!icon) return null;
  // This is a crude mock for WordPress icons which are usually SVG objects
  return <div style={{ width: size, height: size }} {...props}>{icon}</div>;
};

export const TextControl = ({ label, value, onChange, ...props }: any) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-xs font-bold text-slate-400">{label}</label>}
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200"
      {...props}
    />
  </div>
);

export const PanelBody = ({ title, children, initialOpen = true }: any) => {
  const [isOpen, setIsOpen] = React.useState(initialOpen);
  return (
    <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 flex items-center justify-between bg-slate-900/80 hover:bg-slate-900 transition-colors"
      >
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{title}</span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};
