const fs = require("fs");
const http = require("http");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "public");
const {
  people,
  getData,
  getDetail,
  deleteData,
  getDataByUsername,
} = require("./people.js");

const port = 3000;
const onRequest = (req, res) => {
  const splitUrl = req.url.split("/")[2];
  const id = +splitUrl;

  const fileHtml = path.join(PUBLIC_DIR, "index.html");
  const html = fs.readFileSync(fileHtml, "utf8");

  if (req.url === "/people") getData(req, res);
  else if (req.url === "/home")
    res.setHeader("Content-Type", "text/html").end(html);
  else if (req.method === "GET" && id) getDetail(req, res, id);
  else if (req.method === "GET" && splitUrl)
    getDataByUsername(req, res, splitUrl);
  else if (req.method === "DELETE" && id) deleteData(req, res, id);
};

const server = http.createServer(onRequest);
server.listen(port, "localhost", () => {
  console.log(`Server running at http://localhost:${port}`);
});
