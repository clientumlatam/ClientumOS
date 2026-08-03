import React from 'react';
export function CommandPalette(props: any) {
  if (!props.isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-24 z-50" onClick={props.onClose}>
    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-4" onClick={e => e.stopPropagation()}>
      <input className="w-full p-3 border rounded-lg text-lg" placeholder="Type a command..." autoFocus />
    </div>
  </div>;
}
