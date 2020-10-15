import { parse } from "https://deno.land/std@0.74.0/flags/mod.ts"

const vars = (defaults, ...key) => key.reduce(getFlag, defaults)
const flags = parse(Deno.args)
const getFlag = (value, key) =>
  (/A-Z/.test(key) ? Deno.env.get(key) : flags[key]) || value

export const PORT = vars(8181, "PORT", "port", "p")
export const DOMAIN = vars('localhost', 'DOMAIN', 'domain', 'd')
export const DISCORD_SECRET = vars("some-secret", 'DISCORD_SECRET', 'secret', 's')
export const DISCORD_CLIENT = vars("766251453337436170", 'DISCORD_CLIENT', 'client', 'c')
export const DISCORD_BOT_TOKEN = vars('some-bot-token', 'DISCORD_BOT_TOKEN', 'token', 't')
