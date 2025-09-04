const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// === CONFIGURATION ===
// Set your target API here! For example, https://api.example.com
const TARGET_API = 'https://target-api.example.com'; // <-- CHANGE THIS!

// Proxy anything starting with /api
app.use('/api', createProxyMiddleware({
  target: TARGET_API,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix
  },
  onProxyReq: (proxyReq, req, res) => {
    // You can add custom headers or logging here if needed
  },
}));

// Optional: Health check or root endpoint
app.get('/', (req, res) => {
  res.send('Proxy server running!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server listening on http://localhost:${PORT}, forwarding /api to ${TARGET_API}`);
});
