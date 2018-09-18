let http = require('http');
let util = require('util');
http.get('http://www.dengmowen.cn', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    let result = JSON.parse(data);
    console.log('result.msg ----', util.inspect(result));
  });
});
