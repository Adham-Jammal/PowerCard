// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

// const { createServer } = require("https");
// const { parse } = require("url");
// const next = require("next");
// const fs = require("fs");
// const port = 443;
// const dev = false;
// const app = next({ dev });
// const handle = app.getRequestHandler();

// const httpsOptions = {
//     key: fs.readFileSync('../../ssl/keys/d0c28_0e751_1413c338e2f87cbe9ef5fe89eca3c59b.key'),
//     cert: fs.readFileSync('../../ssl/certs/mohraapp_com_d0c28_0e751_1697785321_38616f953c8770d7d292d99cd4b84204.crt')
// };

// app.prepare().then(() => {
//     createServer(httpsOptions, (req, res) => {
//         const parsedUrl = parse(req.url, true);
//         handle(req, res, parsedUrl);
//     }).listen(port, (err) => {
//         if (err) throw err;
//         console.log("ready - started server on url: https://localhost:" + port);
//     });
// });
