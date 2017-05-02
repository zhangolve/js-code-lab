var net=require('net');
var http=require('http');
var server = net.createServer((socket) => {
  socket.end('goodbye\n');
}).on('error', (err) => {
  // handle errors here
  throw err;
});

// grab a random port.
// server.listen(() => {
//   console.log('opened server on', server.address());
// });
//

server.listen({
	port:8080,
	host:"localhost"
},()=>{console.log('running')})