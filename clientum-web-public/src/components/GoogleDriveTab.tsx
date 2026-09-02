import React, { useState, useEffect } from 'react';
import { getAccessToken, googleSignIn, initAuth, logout } from '../lib/googleAuth';
import { User } from 'firebase/auth';

export function GoogleDriveTab() {
  const [needsAuth, setNeedsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setNeedsAuth(false);
        setUser(user);
        setToken(token);
        fetchFiles(token);
      },
      () => setNeedsAuth(true)
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        fetchFiles(result.accessToken);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fetchFiles = async (accessToken: string) => {
    setLoadingFiles(true);
    try {
      const res = await fetch('https://www.googleapis.com/drive/v3/files?pageSize=20&fields=files(id,name,mimeType)', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      console.error('Failed to fetch files', err);
    } finally {
      setLoadingFiles(false);
    }
  };

  if (needsAuth) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Connect Google Drive</h2>
        <p className="text-slate-600 mb-6">Authorize this app to access your Google Drive files.</p>
        <button onClick={handleLogin} disabled={isLoggingIn} className="gsi-material-button">
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper flex items-center bg-white border border-slate-300 rounded px-4 py-2 hover:bg-slate-50 transition-colors">
            <div className="gsi-material-button-icon mr-3">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{display: 'block', width: '24px', height: '24px'}}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span className="text-slate-700 font-semibold text-sm">Sign in with Google</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Google Drive Files</h2>
        <button onClick={() => { logout(); setNeedsAuth(true); }} className="text-sm text-slate-500 hover:text-slate-800">Disconnect</button>
      </div>
      
      {loadingFiles ? (
        <p className="text-slate-500 text-sm">Loading files...</p>
      ) : (
        <ul className="space-y-2">
          {files.map(f => (
            <li key={f.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-700">
              {f.name}
            </li>
          ))}
          {files.length === 0 && <p className="text-slate-500 text-sm">No files found.</p>}
        </ul>
      )}
    </div>
  );
}
