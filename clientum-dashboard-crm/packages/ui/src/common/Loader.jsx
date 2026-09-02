/**
 * Loader/Spinner component.
 */

import { Loader2 } from 'lucide-react';

const Loader = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      {text && <p className="text-slate-400 text-sm animate-pulse">{text}</p>}
    </div>
  );
};

export default Loader;
