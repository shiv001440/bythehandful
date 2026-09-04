import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { SlidingWindowRateLimiter, assertRateLimit, getClientIp } from "../rate-limiter";

describe("SlidingWindowRateLimiter", () => {
  let limiter: SlidingWindowRateLimiter;

  beforeEach(() => {
    vi.useFakeTimers();
    limiter = new SlidingWindowRateLimiter();
  });

  afterEach(() => {
    limiter.destroy();
    vi.useRealTimers();
  });

  it("allows requests under the limit", () => {
    const key = "test:user:1";
    for (let i = 0; i < 5; i++) {
      const res = limiter.check(key, 5, 60_000);
      expect(res.allowed).toBe(true);
      expect(res.remaining).toBe(4 - i);
    }
  });

  it("blocks requests that exceed the limit within the sliding window", () => {
    const key = "test:user:2";
    // Fire 5 requests
    for (let i = 0; i < 5; i++) {
      limiter.check(key, 5, 60_000);
    }

    // 6th request should be blocked
    const blocked = limiter.check(key, 5, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("allows new requests after sliding window expires", () => {
    const key = "test:user:3";
    for (let i = 0; i < 5; i++) {
      limiter.check(key, 5, 60_000);
    }

    expect(limiter.check(key, 5, 60_000).allowed).toBe(false);

    // Fast forward 61 seconds
    vi.advanceTimersByTime(61_000);

    const allowedAfterWindow = limiter.check(key, 5, 60_000);
    expect(allowedAfterWindow.allowed).toBe(true);
    expect(allowedAfterWindow.remaining).toBe(4);
  });

  it("isolates different keys correctly", () => {
    const keyA = "test:user:A";
    const keyB = "test:user:B";

    for (let i = 0; i < 5; i++) {
      limiter.check(keyA, 5, 60_000);
    }

    expect(limiter.check(keyA, 5, 60_000).allowed).toBe(false);
    expect(limiter.check(keyB, 5, 60_000).allowed).toBe(true);
  });

  it("prunes old records correctly", () => {
    const key = "test:user:prune";
    limiter.check(key, 5, 60_000);

    // Advance 11 minutes
    vi.advanceTimersByTime(660_000);
    limiter.prune(600_000);

    // After prune, should have clean state
    const res = limiter.check(key, 5, 60_000);
    expect(res.allowed).toBe(true);
    expect(res.remaining).toBe(4);
  });
});

describe("getClientIp", () => {
  it("resolves x-forwarded-for first IP", () => {
    const req = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.195, 70.41.3.18" },
    });
    expect(getClientIp(req)).toBe("203.0.113.195");
  });

  it("resolves cf-connecting-ip", () => {
    const req = new Request("http://localhost", {
      headers: { "cf-connecting-ip": "198.51.100.42" },
    });
    expect(getClientIp(req)).toBe("198.51.100.42");
  });

  it("falls back to default when headers absent", () => {
    const req = new Request("http://localhost");
    expect(getClientIp(req)).toBe("127.0.0.1");
  });
});

describe("assertRateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("throws error when rate limit exceeded", () => {
    const key = "test:assert:1";
    for (let i = 0; i < 3; i++) {
      assertRateLimit({ key, limit: 3, windowMs: 60_000 });
    }

    expect(() => {
      assertRateLimit({ key, limit: 3, windowMs: 60_000 });
    }).toThrow(/Too many requests/);
  });
});
