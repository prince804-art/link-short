import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { code } = req.query;
  const filePath = path.join(process.cwd(), "links.json");
  const links = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (links[code]) {
    res.writeHead(302, { Location: links[code] });
    res.end();
  } else {
    res.status(404).send("Short link not found");
  }
}
