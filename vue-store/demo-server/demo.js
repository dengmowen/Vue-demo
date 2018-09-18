let http = require('http');
let url = require('url');
let util = require('util');
let server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/pain; charset=utf-8');
  res.end(util.inspect(url.parse(req.url))); // 调试作用
});

server.listen(3000, '127.0.0.1', () => {
  console.log('服务器已经运行~127.0.0.1:3000');
});
