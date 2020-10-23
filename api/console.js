
export const exec = cmd => Deno.run({
  cmd: [
    'screen',
    '-S', 'worldserver',
    '-p', '0',
    '-X', 'stuff',
    `${cmd}\r\n`,
  ],
}).status()
