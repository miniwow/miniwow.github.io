import {
  DISCORD_CLIENT,
  DISCORD_SECRET,
  DOMAIN,
  DISCORD_BOT_TOKEN,
} from "./args.js"
import { GET, POST, boom, serve, json, redirect } from "./serve.js"
import { curl, mapEntries } from "./lib.js"

const scope = "identify guilds.join"
const apiUrl = "https://discord.com/api"
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
const rand = () => Math.random().toString(36).slice(3, 12).padStart(9, '0')
GET("/id", ({ login }) => users[login])

const goto = view => redirect(`https://miniwow.github.io/#${view}`)
POST("/authorize", ({ login, password }) => {
  if (login && users[login]) return goto('already-taken')

  const state = rand()
  sessions.set(state, { login, password })
  return redirect(`${apiUrl}/oauth2/authorize?${new URLSearchParams({
    client_id: DISCORD_CLIENT,
    redirect_uri: `${DOMAIN}/discord`,
    response_type: "code",
    scope,
    state,
  })}`)
})

GET("/discord", async ({ code, state }) => {
  const session = sessions.get(state)
  if (!session) return goto('missing-session')
  sessions.delete(state)

  const { access_token, token_type } = await curl(`${apiUrl}/oauth2/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: {
      client_id: DISCORD_CLIENT,
      client_secret: DISCORD_SECRET,
      grant_type: "authorization_code",
      redirect_uri: `${DOMAIN}/discord`,
      scope,
      code,
    },
  })

  const { id } = await curl(`${apiUrl}/users/@me`, {
    headers: { Authorization: `${token_type} ${access_token}` },
  })

  if (!users[id]) {
    if (!session.login || users[session.login]) {
      return goto('invalid-login')
    }

    nicks[id] = session.login
    users[session.login] = id
    // TODO: register to the game server
    await Deno.writeTextFile("./nicks.json", JSON.stringify(nicks))
  } else {
    session.password // TODO: change password
  }

  await curl(`${apiUrl}/guilds/${discordGuildId}/members/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      "content-type": "application/json",
    },
    body: {
      access_token,
      nick: users[id],
      roles: ["766288504690442240"],
    },
  })

  return goto('success')
})

await serve()
