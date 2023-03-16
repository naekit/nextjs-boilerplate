// const { createProxyMiddleware } = require('http-proxy-middleware');

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
