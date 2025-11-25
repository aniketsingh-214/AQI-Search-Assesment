const { CACHE_TTL_MS, CACHE_MAX_ENTRIES } = require('../config/env');

class LRUCache {
  constructor(maxEntries, ttlMs) {
    this.maxEntries = maxEntries;
    this.ttlMs = ttlMs;
    this.map = new Map(); 
  }

  _isExpired(entry) {
    return entry.expiresAt <= Date.now();
  }

  get(key) {
    const entry = this.map.get(key);
    if (!entry) return null;
    if (this._isExpired(entry)) {
      this.map.delete(key);
      return null;
    }
  
    this.map.delete(key);
    this.map.set(key, entry);
    return entry.value;
  }

  set(key, value) {
    const expiresAt = Date.now() + this.ttlMs;

    if (this.map.has(key)) {
      this.map.delete(key);
    }

    this.map.set(key, { value, expiresAt });

    if (this.map.size > this.maxEntries) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}

const aqiCache = new LRUCache(CACHE_MAX_ENTRIES, CACHE_TTL_MS);

module.exports = { aqiCache };
