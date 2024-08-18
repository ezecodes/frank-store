import Server from "./src/server";
const port = 4200;
const server = new Server(port);

server.connectDatabase();
server.listen();
