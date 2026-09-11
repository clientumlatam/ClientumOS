import React, { useState } from "react";
import { SignIn, SignUp } from "@clerk/react";
import { X } from "lucide-react";
import { useCRM } from "../../context/CRMContext";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useCRM();
  const [mode, setMode] = useState<"login" | "register">("login");

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-[440px] overflow-y-auto rounded-2xl border border-[#222a3d] bg-[#111520] shadow-2xl">
        <button
          type="button"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Cerrar autenticación"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-3 pt-7">
          {mode === "login" ? (
            <SignIn
              routing="hash"
              appearance={{ elements: { card: "!bg-transparent !shadow-none !border-0" } }}
            />
          ) : (
            <SignUp
              routing="hash"
              appearance={{ elements: { card: "!bg-transparent !shadow-none !border-0" } }}
            />
          )}
        </div>
        <div className="border-t border-[#222a3d] px-6 py-4 text-center text-xs text-slate-400">
          {mode === "login" ? "¿Todavía no tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            {mode === "login" ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};