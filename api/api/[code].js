const fs = require("fs");
const path = require("path");

const linksFile = path.join(__dirname, "../links.json");

module.exports = (req, res) => {
  const code = req.query.code; // short code from URL
  if (fs.existsSync(linksFile)) {
    const links = JSON.parse(fs.readFileSync(linksFile, "utf-8"));
    if (links[code]) {
      res.writeHead(302, { Location: links[code] });
      res.end();
      return;
    }
  }
  res.statusCode = 404;
  res.end("Short link not found");
};
