import { serve as httpServe } from "https://deno.land/std@0.74.0/http/server.ts"
import { Status } from "https://deno.land/std@0.74.0/http/http_status.ts"
import { green, cyan, bold } from "https://deno.land/std@0.74.0/fmt/colors.ts"

import { mapValues } from "./lib.js"
import { PORT } from "./args.js"

const routes = {}
const contentTypeHeader = type => {
  const headers = new Headers()
  headers.set("content-type", type)
  return headers
}

export const boom = mapValues(Status, s => err => {
  err.status = s
  throw err
})

export const json = data => ({
  headers: contentTypeHeader("application/json"),
  body: JSON.stringify(data),
})

export const redirect = to => {
  const headers = new Headers()
  headers.set("location", to)
  return { headers, body: "", status: 301 }
}

export const getIp = req =>
  req.headers.get("x-forwarded-for") ||
  req.headers.get("x-real-ip") ||
  req.conn.remoteAddr.hostname

export const getUser = req => {
  try {
    return atob(req.headers.get("authorization").split(" ")[1]).split(":")[0]
  } catch {
    return ""
  }
}

const dec = new TextDecoder()
const readBodyStr = async req => dec.decode(await Deno.readAll(req.body))
const readBody = async req => {
  const contentType = req.headers.get("content-type")
  if (!req.body || !contentType) return

  try {
    if (contentType === "text/plain") return await readBodyStr(req)
    if (contentType === "application/json") {
      return JSON.parse(await readBodyStr(req))
    }

    if (contentType === "application/x-www-form-urlencoded") {
      const bodyStr = await readBodyStr(req)
      const params = new URLSearchParams(decodeURIComponent(bodyStr))
      return Object.fromEntries(params)
    }
  } catch (err) {
    boom.BadRequest(err)
  }
}

const handleRequest = async (req, routes) => {
  const { pathname, searchParams } = new URL(`http://localhost${req.url}`)
  console.log(green(req.method), pathname, {
    user: getUser(req),
    ip: getIp(req),
  })
  const handler = routes[req.method]?.[pathname]
  if (!handler) {
    boom.NotFound(Error(`no handlers for ${req.method} ${pathname}`))
  }
  const params = (await readBody(req)) || Object.fromEntries(searchParams)
  return handler(params, req)
}

const addRoute = method => {
  const r = (routes[method] = {})
  return (path, handler, { ignoreAlreadyExposed } = {}) => {
    const key = path.endsWith("/") ? path.slice(0, -1) : path
    if (r[key]) {
      if (ignoreAlreadyExposed) return
      throw Error(`${key} already exposed`)
    }
    r[key] = r[`${key}/`] = handler
    console.log(cyan("Expose"), method, key || "/")
    return route
  }
}

export const DELETE = addRoute("DELETE")
export const PATCH = addRoute("PATCH")
export const POST = addRoute("POST")
export const PUT = addRoute("PUT")
export const GET = addRoute("GET")
export const route = { DELETE, PATCH, POST, PUT, GET }

export const serve = async () => {
  console.log(cyan(bold("Listen")), `http://localhost:${PORT}`)
  for await (const req of httpServe({ port: PORT })) {
    handleRequest(req, routes).then(
      body =>
        req.respond(
          (typeof body === "string" ? { body } : body) || { body: "" },
        ),
      err => {
        console.error(err)
        const status = err.status || Status.InternalServerError
        req.respond({ body: err.message, status })
      },
    ).catch(err => console.log('wtf', err))
  }
}
