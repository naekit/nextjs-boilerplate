// const { createProxyMiddleware } = require('http-proxy-middleware');

// Here I tried setting up a proxy to get around CORS issues but google drive does not allow these headers to be set
// module.exports = function (app) {
//   app.use(
//     '/proxy',
//     createProxyMiddleware({
//       target: 'https://drive.google.com',
//       changeOrigin: true,
//       onProxyReq: function(proxyReq, req, res) {
//         proxyReq.setHeader('Origin', 'http://localhost:3000'); 
//       },
//       pathRewrite: {
//         '^/proxy': '/uc', 
//       },
//     })
//   );
// };
