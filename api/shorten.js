const fs = require("fs");
const path = require("path");

const linksFile = path.join(__dirname, "../links.json");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      const { url, short } = JSON.parse(body);
      let links = {};
      if (fs.existsSync(linksFile)) {
        links = JSON.parse(fs.readFileSync(linksFile, "utf-8"));
      }
      links[short] = url;
      fs.writeFileSync(linksFile, JSON.stringify(links, null, 2));
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Short link created", short }));
    });
  } else {
    res.statusCode = 405;
    res.end("Method Not Allowed");
  }
};
