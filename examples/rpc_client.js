// make sure you start grenache-grape:
// grape --dp 20001 --apw 30001 --aph 40001 --bn "127.0.0.1:20002,127.0.0.1:20003"

'use strict'

const Grenache = require('./../')
const Link = Grenache.Link
const Peer = Grenache.PeerRPCClient

const link = new Link({
  grape: 'ws://127.0.0.1:30001'
})
link.start()

const peer = new Peer(link, {})
peer.init()

const reqs = 100000
let reps = 0

setTimeout(() => {
  const d1 = new Date()
  for (let i = 0; i < reqs; i++) {
    peer.request('rpc_test', 'hello', { timeout: 10000 }, (err, data) => {
      if (err) {
        console.error(err)
        process.exit(-1)
      }
      // console.log(data)
      if (++reps === reqs) {
        const d2 = new Date()
        console.log(d2 - d1)
      }
    })
  }
}, 2000)
