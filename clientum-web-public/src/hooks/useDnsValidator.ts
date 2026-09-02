import { useState, useEffect, useCallback } from 'react';
import { DiagnosticResult } from '../components/common/DomainCloudflareManager';

export interface UseDnsValidatorOptions {
  domain: string;
  autoRun?: boolean;
  expectedCname?: string;
}

export function useDnsValidator({ domain, autoRun = true, expectedCname = 'proxy.clientum.com.ar' }: UseDnsValidatorOptions) {
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateDns = useCallback(async (targetDomain?: string) => {
    const domainToTest = (targetDomain || domain || '').trim();
    if (!domainToTest) return;

    setIsValidating(true);
    setError(null);

    try {
      const res = await fetch('/api/domain/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domainToTest, expectedCname })
      });
      const data = await res.json();
      if (res.ok && data.diagnostic) {
        setDiagnostic(data.diagnostic);
      } else {
        setError(data.error || 'Error al validar registros DNS con Cloudflare');
      }
    } catch (err: any) {
      setError(err?.message || 'Error de conexión con el servicio de diagnóstico DNS');
    } finally {
      setIsValidating(false);
    }
  }, [domain, expectedCname]);

  useEffect(() => {
    if (autoRun && domain) {
      validateDns(domain);
    }
  }, [domain, autoRun, validateDns]);

  return {
    diagnostic,
    isValidating,
    error,
    validateDns,
    isConnected: diagnostic?.status === 'connected',
    isCnameCorrect: diagnostic?.isCnameCorrect ?? false
  };
}
