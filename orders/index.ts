import Server from "./src/server";
const port = 4100;
const server = new Server(port);

server.connectDatabase();
server.listen();
