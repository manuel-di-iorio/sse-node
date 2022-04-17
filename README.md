# NOTICE: Unmaintained repository

# Server-sent events for Node.js
Send data to the clients in real time with SSE technology

### Install it with:
  
    npm install sse-node
    or
    git clone https://github.com/manuel-di-iorio/sse-node.git
    
### Example with HTTP server:

```javascript
const SSE = require("sse-node"),
      http = require("http");

http.createServer((req, res) => {
    if (req.url !== "/sse") return res.end();
    
    // This will open a SSE connection on the request and will send the message to the client.
    // On disconnection, a message is logged.
    const client = SSE(req, res);
    client.send("Hello world!");
    client.onClose(() => console.log("Bye client!"));
})
.listen(80);
```

### Example with Express.js:

```javascript
const SSE = require("sse-node"),
      app = require("express")();

app.get("/sse", (req, res) => {
    const client = SSE(req, res);
    client.send("Hello world!");
    client.onClose(() => console.log("Bye client!"));
});

app.listen(80);
```

### Example with Koa.js:

```javascript
const SSE = require("sse-node"),
      app = require("koa")();

app.use(function *(next) { // Also compatible with Koa 2, see the doc for the changes
    if (this.url !== "/sse") return;
    
    const client = SSE(this.req, this.res);
    client.send("Hello world!");
    client.onClose(() => console.log("Bye client!"));
});

app.listen(80);
```

---
**On the client side, just connect with javascript to the server with:**
```javascript
var es = new EventSource("/sse");
es.onmessage = function(ev) {
    alert(ev.data); //will output 'Hello world!'
};

// You can also listen other events with .addEventListener()
```

---
## API

```javascript
SSE(request, response, [options])
```

    Wrap a HTTP request/response object with this function to create a SSE connection for the incoming request.
    
    *Options* can have the following properties:
    
        `ping`: When to send a ping to the client each X seconds (by default is disabled)
        `retry`: After how many millisecons to retry the connection (by default is 3000)
        `padding`: Some older browsers require to write a 2KB padding when the SSE connection starts.
          By default this is disabled.

This function returns a object with the following methods:
```javascript
.send(data, [event])
```
    *Data* can be anything. Objects will get serialized

    *Event*: You can send a message to a specific event and listen to it on the client side
      with ev.addEventListener("eventName", function). By default, all messages are sent to the 'message' event

---
```javascript
.onClose([callback])
```
    When the client disconnects, will call the specified callback. The param is optional because this function
      also clears the ping interval when set.
    
    
### Test with:

    node test
Then navigate with your browser to `http://localhost:9090` and open the javascript console
