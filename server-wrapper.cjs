// Render stability wrapper for the bundled TruthLens server.
// Keeps Node/Render connections alive and gives SerpApi more time to respond.
const http = require('http');

const originalFetch = global.fetch;
if (originalFetch) {
  global.fetch = (input, init = {}) => {
    let target = '';
    try {
      target = typeof input === 'string' ? input : input?.url || '';
    } catch (_) {}

    // The source server uses a 12s AbortSignal for SerpApi. Replace only that
    // signal with a 45s one so transient SerpApi slowness does not kill the
    // Render request prematurely. Other requests keep their original signal.
    if (target.includes('serpapi.com')) {
      const nextInit = { ...init, signal: AbortSignal.timeout(45000) };
      return originalFetch(input, nextInit);
    }
    return originalFetch(input, init);
  };
}

// Render documents intermittent connection-reset issues with Node services;
// these values keep the HTTP connection open while the AI/search pipeline runs.
const originalListen = http.Server.prototype.listen;
http.Server.prototype.listen = function (...args) {
  this.keepAliveTimeout = 120000;
  this.headersTimeout = 125000;
  this.requestTimeout = 120000;
  return originalListen.apply(this, args);
};

require('./dist/server.cjs');
