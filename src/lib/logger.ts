/**
 * Structured logging facade with per-request correlation IDs.
 *
 * Usage in server.ts:
 *   import { requestLogger, createLogger } from './src/lib/logger';
 *   app.use(requestLogger);          // adds req.id and logs each request
 *   const log = createLogger('auth'); // scoped logger for a module
 *   log.info('login ok', { userId: 1 });
 */

import crypto from 'crypto';

// ── Types ────────────────────────────────────────────────────────────────────

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  ts: string;
  level: LogLevel;
  component: string;
  msg: string;
  reqId?: string;
  data?: Record<string, unknown>;
}

// ── Request ID middleware ─────────────────────────────────────────────────────

/** Express middleware that assigns a unique correlation ID to each request. */
export function requestLogger(
  req: any,
  res: any,
  next: () => void
) {
  const id = (req.headers['x-request-id'] as string) || crypto.randomUUID();
  req.id = id;
  res.setHeader('X-Request-Id', id);

  const start = Date.now();
  const origEnd = res.end;

  // Log when the response finishes
  res.end = function (...args: any[]) {
    const duration = Date.now() - start;
    const entry: LogEntry = {
      ts: new Date().toISOString(),
      level: res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info',
      component: 'http',
      msg: `${req.method} ${req.originalUrl || req.url}`,
      reqId: id,
      data: {
        status: res.statusCode,
        durationMs: duration,
        method: req.method,
      },
    };
    process.stdout.write(JSON.stringify(entry) + '\n');
    return origEnd.apply(res, args);
  } as any;

  next();
}

// ── Component-scoped logger ──────────────────────────────────────────────────

export interface Logger {
  debug(msg: string, data?: Record<string, unknown>): void;
  info(msg: string, data?: Record<string, unknown>): void;
  warn(msg: string, data?: Record<string, unknown>): void;
  error(msg: string, data?: Record<string, unknown>): void;
}

/**
 * Create a scoped logger for a specific component.
 * Output is structured JSON lines (one per log entry).
 */
export function createLogger(component: string): Logger {
  const minLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';
  const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
  const minIdx = levels.indexOf(minLevel);

  function write(level: LogLevel, msg: string, data?: Record<string, unknown>, reqId?: string) {
    if (levels.indexOf(level) < minIdx) return;
    const entry: LogEntry = {
      ts: new Date().toISOString(),
      level,
      component,
      msg,
      ...(reqId ? { reqId } : {}),
      ...(data ? { data } : {}),
    };
    const stream = level === 'error' ? process.stderr : process.stdout;
    stream.write(JSON.stringify(entry) + '\n');
  }

  return {
    debug: (msg, data?) => write('debug', msg, data),
    info: (msg, data?) => write('info', msg, data),
    warn: (msg, data?) => write('warn', msg, data),
    error: (msg, data?) => write('error', msg, data),
  };
}
