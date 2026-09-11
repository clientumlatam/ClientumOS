import React, { useEffect, useState } from "react";
import { Check, CreditCard, ExternalLink, Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import { useCRM } from "../../context/CRMContext";
import { getClientumAuthJsonHeaders } from "../../lib/api";

type Plan = { id: string; name: string; amount: number };
type Checkout = {
  checkoutId: string;
  planId: string;
  amount: string | number;
  currency: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  createdAt: string;
};

const statusLabel: Record<Checkout["status"], string> = {
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
  cancelled: "Cancelado",
};

export const PlatformBillingView: React.FC = () => {
  const { currentUser, showToast } = useCRM();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [checkouts, setCheckouts] = useState<Checkout[]>([]);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);

  const loadBilling = async () => {
    setLoading(true);
    try {
      const [plansResponse, statusResponse] = await Promise.all([
        fetch("/api/billing/plans"),
        fetch("/api/billing/status", { headers: await getClientumAuthJsonHeaders(currentUser) }),
      ]);
      const plansPayload = await plansResponse.json();
      const statusPayload = await statusResponse.json();
      if (!plansResponse.ok) throw new Error(plansPayload.error || "No se pudieron cargar los planes.");
      if (!statusResponse.ok) throw new Error(statusPayload.error || "No se pudo cargar tu facturación.");
      setPlans(plansPayload.plans || []);
      setCheckouts(statusPayload.checkouts || []);
      setConfigured(Boolean(statusPayload.configured));
    } catch (error) {
      showToast(error instanceof Error ? error.message : "No se pudo cargar la facturación.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBilling();
  }, [currentUser.id]);

  const startCheckout = async (planId: string) => {
    setCheckoutPlan(planId);
    try {
      const response = await fetch("/api/billing/mercadopago/checkout", {
        method: "POST",
        headers: await getClientumAuthJsonHeaders(currentUser),
        body: JSON.stringify({ planId, payerEmail: currentUser.email }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.checkoutUrl) throw new Error(payload.error || "No se pudo abrir la suscripción de Mercado Pago.");
      window.open(payload.checkoutUrl, "_blank", "noopener,noreferrer");
      showToast("Suscripción creada. Completa el primer pago en Mercado Pago.", "success");
      await loadBilling();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "No se pudo iniciar el pago.", "error");
    } finally {
      setCheckoutPlan(null);
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[11px] font-semibold text-blue-300">
            <ShieldCheck className="h-3.5 w-3.5" /> Suscripción de ClientumCRM
          </div>
          <h1 className="text-2xl font-bold text-white">Elige tu plan</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">
            Pagos seguros con Mercado Pago. Este módulo cobra el acceso a Clientum, no a los clientes de tu workspace.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadBilling()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Actualizar
        </button>
      </div>

      {configured === false && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
          Mercado Pago todavía no está configurado. Agrega `PLATFORM_MERCADOPAGO_ACCESS_TOKEN` en Replit Secrets antes de cobrar.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {loading && !plans.length ? (
          <div className="col-span-full flex items-center justify-center py-16 text-slate-400">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cargando planes…
          </div>
        ) : plans.map((plan, index) => (
          <article key={plan.id} className={`rounded-2xl border p-5 ${index === 1 ? "border-blue-500 bg-blue-500/10" : "border-slate-700 bg-slate-900/60"}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">{plan.name}</h2>
              {index === 1 && <span className="rounded-full bg-blue-500 px-2 py-1 text-[10px] font-bold text-white">Recomendado</span>}
            </div>
            <div className="mt-4 text-2xl font-extrabold text-white">
              ${Number(plan.amount).toLocaleString("es-AR")} <span className="text-xs font-medium text-slate-400">ARS / mes</span>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> Workspace persistente en Neon</li>
              <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> Acceso autenticado con Clerk</li>
              <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" /> Soporte de la plataforma</li>
            </ul>
            <button
              type="button"
              onClick={() => void startCheckout(plan.id)}
              disabled={checkoutPlan !== null || configured === false}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {checkoutPlan === plan.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
              Suscribirme con Mercado Pago
            </button>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
          <CreditCard className="h-4 w-4 text-blue-400" /> Historial de pagos
        </div>
        {!checkouts.length ? (
          <p className="text-xs text-slate-500">Todavía no hay checkouts asociados a tu cuenta.</p>
        ) : (
          <div className="space-y-2">
            {checkouts.map((checkout) => (
              <div key={checkout.checkoutId} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 px-3 py-2.5 text-xs">
                <div>
                  <span className="font-semibold text-slate-200">{checkout.planId}</span>
                  <span className="ml-2 text-slate-500">{new Date(checkout.createdAt).toLocaleString("es-AR")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-200">${Number(checkout.amount).toLocaleString("es-AR")} {checkout.currency}</span>
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-slate-300">{statusLabel[checkout.status]}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};