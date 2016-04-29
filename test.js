const SSE = require("."),
      http = require("http");
    
server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.setHeader("Content-type", "text/html");
        return res.end("<script>var ev=new EventSource('/sse');ev.onmessage=function(event){console.log(event.data)};ev.addEventListener('event',function(event){console.log(event.type+': '+event.data)})</script>200 OK");
    }
    
    if (req.url === "/favicon.ico") return res.end();
    
    // SSE
    const client = SSE(res, {
        padding: true,
        ping: 10000
    });    
    
    client.send("test!", "event");
    client.send("start");
    client.onClose(() => console.log('req.url: ' + req.url));
});

server.listen(8080, '127.0.0.1', () => console.log('Server started on port 8080'));