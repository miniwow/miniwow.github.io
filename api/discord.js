import {
  DISCORD_CLIENT,
  DISCORD_SECRET,
  DOMAIN,
  DISCORD_BOT_TOKEN,
} from "./args.js"
import { GET, POST, boom, serve, json, redirect } from "./serve.js"
import { exec } from "./console.js"
import { curl, rand, mapEntries } from "./lib.js"

const scope = "identify guilds.join"
const apiUrl = "https://discord.com/api"
const discordRoleId = "766288504690442240"
const discordGuildId = "766249759631343616"
const nicks = await Deno.readTextFile("./nicks.json")
  .then(JSON.parse)
  .catch(async err => {
    if (!(err instanceof Deno.errors.NotFound)) throw err
    await Deno.writeTextFile("./nicks.json", "{}")
    return {}
  })

const users = mapEntries(nicks, ([k,v]) => [v,k])
const sessions = new Map()
const CORS = new Headers()
CORS.set("Access-Control-Allow-Origin", 'https://miniwow.github.io')
GET("/id", ({ login }) => ({ headers: CORS, body: users[login] || '' }))

const go = view => redirect(`https://miniwow.github.io/#${view}`)
POST("/authorize", ({ login, password }) => {
  if (login && users[login]) return go('already-taken')
  const state = rand(9)
  sessions.set(state, { login, password })
  return redirect(`${apiUrl}/oauth2/authorize?${new URLSearchParams({
    client_id: DISCORD_CLIENT,
    redirect_uri: `https://${DOMAIN}/discord`,
    response_type: "code",
    scope,
    state,
  })}`)
})

GET("/discord", async ({ code, state }) => {
  const session = sessions.get(state)
  if (!session) return go('missing-session')
  sessions.delete(state)

  const { access_token, token_type } = await curl(`${apiUrl}/oauth2/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: {
      client_id: DISCORD_CLIENT,
      client_secret: DISCORD_SECRET,
      grant_type: "authorization_code",
      redirect_uri: `https://${DOMAIN}/discord`,
      scope,
      code,
    },
  })

  const { id } = await curl(`${apiUrl}/users/@me`, {
    headers: { Authorization: `${token_type} ${access_token}` },
  })

  const nick = nicks[id]
  if (!nick) {
    if (!session.login) return go('invalid-login')
    if (users[session.login]) return go('already-taken')

    nicks[id] = session.login
    users[session.login] = id
    await exec(`account create ${session.login} ${session.password}`)
    await Deno.writeTextFile("./nicks.json", JSON.stringify(nicks))
  } else {
    await exec(`account set password ${nick} ${session.password} ${session.password}`)
  }

  await curl(`${apiUrl}/guilds/${discordGuildId}/members/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      "content-type": "application/json",
    },
    body: {
      access_token,
      nick: nicks[id],
      roles: [discordRoleId],
    },
  })

  if (!session.login) return go('success')
  return nick ? go('already-created') : go('welcome')
})

await serve()
