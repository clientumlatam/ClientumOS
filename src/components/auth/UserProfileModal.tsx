import React, { useState } from 'react';
import { User, Mail, Shield, Key, LogOut, CheckCircle2, X, Camera, Lock, Building } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

export const UserProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { currentUser, updateCurrentUser, logout, showToast } = useCRM();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [role, setRole] = useState(currentUser.role);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      role,
      avatar,
    });
    showToast('Perfil de usuario actualizado correctamente', 'success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Por favor completa las contraseñas', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
    showToast('Las contraseñas nuevas no coinciden', 'error');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Contraseña restablecida con éxito', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-[#131722] border border-[#222a3d] rounded-2xl shadow-2xl overflow-hidden text-xs text-slate-300">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#181d2a] border-b border-[#222a3d] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Perfil de Usuario y Seguridad</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#222a3d] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Avatar & Basic Info */}
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={avatar}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/50 shadow-md"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#131722]" />
              </div>
              <div className="flex-1 space-y-1">
                <label className="block text-[11px] font-semibold text-slate-400">URL del Avatar / Foto</label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-[#0a0c10] border border-[#222a3d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a0c10] border border-[#222a3d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0c10] border border-[#222a3d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Rol / Cargo Comercial</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#0a0c10] border border-[#222a3d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors shadow-md cursor-pointer"
              >
                Guardar Cambios de Perfil
              </button>
            </div>
          </form>

          <hr className="border-[#222a3d]" />

          {/* Change Password / Reestablecer Contraseña */}
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Seguridad y Restablecimiento de Contraseña</span>
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Contraseña Actual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0a0c10] border border-[#222a3d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Nueva Contraseña</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0a0c10] border border-[#222a3d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Confirmar Contraseña</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0a0c10] border border-[#222a3d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-xl transition-colors shadow-md cursor-pointer"
              >
                Actualizar Contraseña
              </button>
            </div>
          </form>

          <hr className="border-[#222a3d]" />

          {/* Logout */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-white font-medium block">Cerrar Sesión</span>
              <span className="text-[11px] text-slate-400">Finaliza tu sesión actual en este dispositivo.</span>
            </div>
            <button
              onClick={() => {
                logout();
                onClose();
                showToast('Has cerrado sesión correctamente', 'info');
              }}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-medium rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
