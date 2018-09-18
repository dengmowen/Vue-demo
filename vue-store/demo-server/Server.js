let http = require('http');
let url = require('url');
let fs = require('fs');
let server = http.createServer((req, res) => {
  var pathname = url.parse(req.url).pathname;
  console.log('path--', pathname.substring(1));
  fs.readFile(pathname.substring(1), (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data.toString());
    }
    res.end(); // 调试作用
  });
});

server.listen(3000, '127.0.0.1', () => {
  console.log('服务器已经运行~127.0.0.1:3000');
});
