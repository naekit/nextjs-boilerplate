// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/proxy',
//     createProxyMiddleware({
//       target: 'https://drive.google.com',
//       changeOrigin: true,
//       onProxyReq: function(proxyReq, req, res) {
//         proxyReq.setHeader('Origin', 'http://localhost:3000'); // Replace with your own domain
//       },
//       pathRewrite: {
//         '^/proxy': '/uc', // Use /uc instead of /file/d in the URL
//       },
//     })
//   );
// };
