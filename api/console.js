import { USERNAME, PASSWORD } from './args.js'

const connectCore = async () => {
  console.log('connecting...')
  const socket = await new Promise((s,f,c) => c=net.connect(3443, err => err ? f(err) : s(c)).on('error', f))
  socket.setEncoding('utf8')
  let q
  const exec = async (command, waitFor='\r\nmangos>') => {
    try { await q } finally {
      return q = new Promise(async (s, f) => {
        let d = ''
        const handler = data => {
          d += data
          if (d.endsWith(waitFor)) {
            socket.removeListener('data', handler)
            socket.removeListener('error', f)
            return s(d.slice(0, -waitFor.length))
          }
        }
        socket.on('data', handler)
        socket.once('error', f)
        command && socket.write(`${command}\r\n`)
      })
    }
  }

  await exec('', 'Username: ')
  await exec(username, 'Password: ')
  if (await exec(password) !== '+Logged in.') {
    throw Error('core: Unable to login')
  }

  return { socket, exec }
}
