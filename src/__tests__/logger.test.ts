/**
 * @vitest-environment node
 * Tests for the structured logging facade.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createLogger, requestLogger, type LogEntry } from '../lib/logger';

describe('createLogger', () => {
  let stdoutSpy: ReturnType<typeof vi.spyOn>;
  let stderrSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    stdoutSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
  });

  it('writes a JSON log entry to stdout for info level', () => {
    const log = createLogger('test-component');
    log.info('hello world', { userId: 42 });

    expect(stdoutSpy).toHaveBeenCalledTimes(1);
    const raw = stdoutSpy.mock.calls[0][0] as string;
    const entry: LogEntry = JSON.parse(raw.trim());

    expect(entry.level).toBe('info');
    expect(entry.component).toBe('test-component');
    expect(entry.msg).toBe('hello world');
    expect(entry.data).toEqual({ userId: 42 });
    expect(entry.ts).toBeDefined();
  });

  it('writes error-level logs to stderr', () => {
    const log = createLogger('auth');
    log.error('login failed', { reason: 'bad password' });

    expect(stderrSpy).toHaveBeenCalledTimes(1);
    expect(stdoutSpy).not.toHaveBeenCalled();
    const raw = stderrSpy.mock.calls[0][0] as string;
    const entry: LogEntry = JSON.parse(raw.trim());

    expect(entry.level).toBe('error');
    expect(entry.component).toBe('auth');
  });

  it('respects LOG_LEVEL filtering', () => {
    process.env.LOG_LEVEL = 'warn';
    const log = createLogger('filtered');

    log.debug('should not appear');
    log.info('should not appear either');
    log.warn('this should appear');

    expect(stdoutSpy).toHaveBeenCalledTimes(1); // only warn
    const raw = stdoutSpy.mock.calls[0][0] as string;
    const entry: LogEntry = JSON.parse(raw.trim());
    expect(entry.level).toBe('warn');

    delete process.env.LOG_LEVEL;
  });
});

describe('requestLogger middleware', () => {
  it('assigns a request ID and sets response header', () => {
    const req: any = {
      headers: {},
      method: 'GET',
      originalUrl: '/api/auth/me',
    };
    const headers: Record<string, string> = {};
    const res: any = {
      setHeader: (key: string, val: string) => { headers[key] = val; },
      end: () => {},
      statusCode: 200,
    };
    const next = vi.fn();

    requestLogger(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.id).toBeDefined();
    expect(typeof req.id).toBe('string');
    expect(headers['X-Request-Id']).toBe(req.id);
  });

  it('preserves existing x-request-id from headers', () => {
    const req: any = {
      headers: { 'x-request-id': 'custom-id-123' },
      method: 'POST',
      originalUrl: '/api/agent/ai/multi',
    };
    const res: any = {
      setHeader: () => {},
      end: () => {},
      statusCode: 200,
    };
    const next = vi.fn();

    requestLogger(req, res, next);

    expect(req.id).toBe('custom-id-123');
  });
});
