
export const rand = n => Math.random().toString(36).slice(2, n + 2).padStart(n, '0')
export const mapEntries = (obj, fn) => Object.fromEntries(Object.entries(obj).map(fn))
export const mapValues = (obj, fn) => mapEntries(obj, ([k, v]) => [k, fn(v, k, obj)])
export const curl = async (url, params) => {
  if (params.body && typeof params.body !== 'string') {
    const headers = params.headers || (params.headers = {})
    const type = headers['content-type'] || headers['Content-Type']
    if (type === "application/x-www-form-urlencoded") {
      params.body = String(new URLSearchParams(params.body))
    } else  {
      type || (headers['content-type'] = 'application/json')
      params.body = JSON.stringify(params.body)
    }
  }
  const res = await fetch(url, params)
  // TODO: check the response headers
  // to see if I should attempt JSON parsing
  let response = await res.text()
  try { response = JSON.parse(response) } catch {}
  if (!res.ok) {
    const err = Error(res.statusText)
    err.response = response
    console.log(res)
    console.log(response)
    throw err
  }
  return response
}
