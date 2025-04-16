const http = require("http");

http.createServer((req, res) => {
    if (req.url === "/events") {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*" // ha szükséges
        });

        setInterval(() => {
            const now = new Date().toLocaleTimeString();
            res.write(`data: ${now}\n\n`);
        }, 1000);
    } else {
        res.writeHead(404);
        res.end();
    }
}).listen(3000, () => {
    console.log("✅ SSE szerver fut a http://localhost:3000/events címen");
});
