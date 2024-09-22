const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
  connection.write("+PONG\r\n");
  connection.on("data", (data) => {
    const connections = data.toString().split("PING");

    console.log(connections);

    let res = "+PONG\r\n";
    Array.from({ length: connections.length - 2 }).forEach((_, index) => {
      res += "+PONG\r\n";
    });

    connection.write(res);
  });
});

server.listen(6379, "127.0.0.1", () => {
  console.log("Server is running on port 6379");
});
