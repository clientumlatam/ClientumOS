import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicWebsite from './components/PublicWebsite';

export default function App() {
  const publicWebsiteElement = (
    <div className="w-screen min-h-screen bg-slate-900 overflow-y-auto">
      <PublicWebsite onBackToEditor={() => {}} />
    </div>
  );

  return (
    <Routes>
      <Route path="*" element={publicWebsiteElement} />
    </Routes>
  );
}
