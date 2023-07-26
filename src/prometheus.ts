import { Hono } from 'hono';
import * as promClient from 'prom-client';
export const initPrometheus = (server: Hono) => {
  const register = new promClient.Registry();
  register.setDefaultLabels({
    app: 'buntes',
  });
  server.get('/metrics', async (c) => {
    c.header('Content-Type', register.contentType);
    return c.text(await register.metrics());
  });
  register.registerMetric(httpRequestTimer);
};

export const httpRequestTimer = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'url', 'code'],
  // buckets for response time from 0.1ms to 1s
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000],
});
