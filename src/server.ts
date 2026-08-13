import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const indexHtml = existsSync(resolve(browserDistFolder, 'index.csr.html'))
  ? resolve(browserDistFolder, 'index.csr.html')
  : (existsSync(resolve(browserDistFolder, 'index.server.html'))
      ? resolve(browserDistFolder, 'index.server.html')
      : resolve(browserDistFolder, 'index.html'));

const app = express();
const commonEngine = new CommonEngine({
  allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', '*'],
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  const { protocol, originalUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

if (process.env['PORT'] || process.env['NODE_ENV'] !== 'test') {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
