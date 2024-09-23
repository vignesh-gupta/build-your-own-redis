const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
  connection.write("+PONG\r\n");
  connection.on("data", (data) => {
    if (data.toString() === "*1\r\n$4\r\nPING\r\n") {
      connection.write("+PONG\r\n");
    }
    connection.end();
  });
});

server.listen(6379, "127.0.0.1", () => {
  console.log("Server is running on port 6379");
});
