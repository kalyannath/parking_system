// server.js
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
// Use the HOST and PORT from the .env file
const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, hostname, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

