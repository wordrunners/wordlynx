import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite';
dotenv.config()
import { proxy } from './src/middleware/proxy'
import { CLIENT_API } from './src/data'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { createClientAndConnect } from './db';
import { router } from './src/Router'
import helmet from 'helmet'


const port = Number(process.env.SERVER_PORT) || 3001

async function createServer(isDev = process.env.NODE_ENV === 'development') {
  await createClientAndConnect();
  const app = express()
  app.disable('x-powered-by').enable('trust proxy')
  app.use(cors())

  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        scriptSrc: [`'self'`, `'unsafe-inline'`],
        connectSrc: [`'self'`, 'ws://localhost:*']
      },
    })
  )

  app.use(helmet.xssFilter())
  app.use(function (_, res, next) {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  let vite: ViteDevServer | undefined;
  const srcPath = path.dirname(require.resolve('client'))

  // Only resolve dist path if not in dev mode
  const distPath = !isDev ? path.dirname(require.resolve('client/dist/index.html')) : ''
  const ssrClientPath = !isDev ? require.resolve('client/ssr-dist/ssr.cjs') : ''

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)
  }

  if (!isDev) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(router);
  app.use(CLIENT_API, proxy);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;
      let render;
      let store

      if (!isDev) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8',
        )
        render = (await import(ssrClientPath)).render
        store = (await import(ssrClientPath)).store
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8',
        )
        template = await vite!.transformIndexHtml(url, template)
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'src/ssr.tsx'))).render;
        store = (await vite!.ssrLoadModule(path.resolve(srcPath, 'src/ssr.tsx'))).store;
      }

      const appHtml = await render(url)

      const state = store.getState()

      const preloadedState = `<script>window.__PRELOADED_STATE__  = ${JSON.stringify(
        state
      )}</script>`

      const html = template.replace(`<!--ssr-outlet-->`, appHtml + preloadedState)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  return { app }
}

createServer().then(({ app }) => app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on http://localhost:${port}`)
}))
