const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 8000;

server.use("/api/v1", middlewares);
server.use("/api/v1", router);
server.listen(PORT, () => {
    console.log("JSON Server is running");
});
