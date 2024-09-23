const net = require("net");
const Parser = require("redis-parser");

const store = {};

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
  connection.write("+PONG\r\n");
  connection.on("data", (data) => {
    const parser = new Parser({
      returnReply: (reply) => {
        const command = reply[0].toUpperCase();

        switch (command) {
          case "SET":
            {
              const key = reply[1];
              const value = reply[2];
              store[key] = value;
              connection.write("+OK\r\n");
            }
            break;

          case "GET":
            {
              const key = reply[1];
              const value = store[key];
              if (!value) connection.write("$-1\r\n");
              else connection.write(`$${value.length}\r\n${value}\r\n`);
            }
            break;
        }
      },
      returnError: (err) => {
        console.log(err);
      },
    });

    parser.execute(data);
  });
});

server.listen(6379, "127.0.0.1", () => {
  console.log("Server is running on port 6379");
});
