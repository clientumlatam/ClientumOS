import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicWebsite from './components/PublicWebsite';
import { AboutUs } from './components/AboutUs';

export default function App() {
  const publicWebsiteElement = (
    <div className="w-screen min-h-screen bg-slate-900 overflow-y-auto">
      <PublicWebsite onBackToEditor={() => {}} />
    </div>
  );

  return (
    <Routes>
      <Route path="/about" element={<div className="w-screen min-h-screen bg-slate-900 overflow-y-auto"><AboutUs /></div>} />
      <Route path="*" element={publicWebsiteElement} />
    </Routes>
  );
}
