/**
 * In-Memory Sliding Window Rate Limiter
 *
 * Provides sub-millisecond, zero-dependency rate limiting with automated TTL cleanup
 * to prevent memory leaks in Node.js / SSR runtimes.
 */

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number; // Unix timestamp in ms
  retryAfterSeconds: number;
}

export class SlidingWindowRateLimiter {
  // Map of key -> array of timestamp hits (in ms)
  private hits = new Map<string, number[]>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(cleanupIntervalMs = 60_000) {
    // Periodically prune stale keys to keep memory footprint bounded
    if (typeof setInterval !== "undefined") {
      this.cleanupInterval = setInterval(() => this.prune(), cleanupIntervalMs);
      if (this.cleanupInterval.unref) {
        this.cleanupInterval.unref();
      }
    }
  }

  /**
   * Evaluates if a request for the given key is allowed under the rate limit.
   *
   * @param key Unique identifier (e.g., `auth:signin:192.168.1.1` or `order:usr_123`)
   * @param limit Maximum allowed requests within the time window
   * @param windowMs Duration of the sliding window in milliseconds (default: 60,000ms = 1 min)
   */
  public check(key: string, limit: number, windowMs = 60_000): RateLimitResult {
    const now = Date.now();
    const windowStart = now - windowMs;

    const timestamps = this.hits.get(key) || [];
    // Retain only hits inside the active sliding window
    const validTimestamps = timestamps.filter((ts) => ts > windowStart);

    if (validTimestamps.length >= limit) {
      const oldestInWindow = validTimestamps[0] ?? now;
      const resetTime = oldestInWindow + windowMs;
      const retryAfterSeconds = Math.max(1, Math.ceil((resetTime - now) / 1000));

      return {
        allowed: false,
        limit,
        remaining: 0,
        resetTime,
        retryAfterSeconds,
      };
    }

    validTimestamps.push(now);
    this.hits.set(key, validTimestamps);

    const oldestInWindow = validTimestamps[0] ?? now;
    const resetTime = oldestInWindow + windowMs;
    const retryAfterSeconds = 0;

    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - validTimestamps.length),
      resetTime,
      retryAfterSeconds,
    };
  }

  /**
   * Resets rate limit records for a given key (e.g., upon successful password reset or test teardown).
   */
  public reset(key: string): void {
    this.hits.delete(key);
  }

  /**
   * Clears all stored records (useful for testing).
   */
  public clear(): void {
    this.hits.clear();
  }

  /**
   * Removes expired keys where all timestamps are older than 10 minutes.
   */
  public prune(maxAgeMs = 600_000): void {
    const threshold = Date.now() - maxAgeMs;
    for (const [key, timestamps] of this.hits.entries()) {
      const active = timestamps.filter((ts) => ts > threshold);
      if (active.length === 0) {
        this.hits.delete(key);
      } else {
        this.hits.set(key, active);
      }
    }
  }

  public destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

// Global shared singleton instance for the server runtime
export const globalRateLimiter = new SlidingWindowRateLimiter();

/**
 * Extracts the real client IP from incoming web Request headers across CDNs and proxies.
 */
export function getClientIp(request?: Request | null): string {
  if (!request?.headers) return "127.0.0.1";

  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  const fastlyClientIp = request.headers.get("fastly-client-ip");
  if (fastlyClientIp) return fastlyClientIp.trim();

  return "127.0.0.1";
}

/**
 * Asserts rate limit, throwing an error with retry duration if limit is exceeded.
 */
export function assertRateLimit(options: {
  key: string;
  limit: number;
  windowMs?: number;
  errorMessage?: string;
}): RateLimitResult {
  const { key, limit, windowMs = 60_000, errorMessage } = options;
  const result = globalRateLimiter.check(key, limit, windowMs);

  if (!result.allowed) {
    const isAuth = key.startsWith("auth:");
    const eventType = isAuth ? "AUTH_RATE_LIMIT_EXCEEDED" : "CHECKOUT_RATE_LIMIT_EXCEEDED";

    // Standardized log output
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: "WARN",
      category: "SECURITY_AUDIT",
      event: eventType,
      message: `Rate limit threshold of ${limit} requests per ${windowMs / 1000}s exceeded`,
      key,
      retryAfterSeconds: result.retryAfterSeconds,
      statusCode: 429,
    };
    console.warn(JSON.stringify(logEntry));

    const msg =
      errorMessage ||
      `Too many requests. Please wait ${result.retryAfterSeconds}s before trying again.`;
    const error = new Error(msg);
    // Attach standard rate limit properties
    (error as Error & { status?: number; retryAfter?: number }).status = 429;
    (error as Error & { status?: number; retryAfter?: number }).retryAfter =
      result.retryAfterSeconds;
    throw error;
  }

  return result;
}
