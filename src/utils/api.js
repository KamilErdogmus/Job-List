import axios from "axios";

export default axios.create({
  baseURL: "https://https://job-list-bice.vercel.app/",
});

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = (req, res) => {
  server(req, res);
};
