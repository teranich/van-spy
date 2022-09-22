<script lang="ts">
  import Peer from 'peerjs';
  import { createEmptyVideoTrack, getPeerId, MASTER_PEER_ID } from './utils';

  const peerId = getPeerId();
  const peer = new Peer(peerId);

  peer.on('connection', (conn) => {
      conn.on('data', (data) => {
      })
      conn.on('open', () => {
        conn.send('hello!')
      })
      peer.on('call', function (call) {
      })
    })
  const ping = () => {
    try {
      const master = MASTER_PEER_ID
      
      const conn = peer.connect(master)
      console.log('before connect', master, peerId, conn)
      conn.on('open', () => {
        conn.send('hi!')
      })
    } catch (e) {
      console.error(e)
    }
  }

  const call = () => {
    const master = MASTER_PEER_ID
    console.log('calling', master, peer)
    const videoTrack = createEmptyVideoTrack({ width: 0, height: 0 });
    const mediaStream = new MediaStream([videoTrack]);
    const peercall = peer.call(master, mediaStream);
    
    peercall.on('stream', function (stream) {
      setTimeout(function () {
        document.getElementById('remVideo').srcObject = peercall.remoteStream;
      }, 1500);
    });
  };
</script>
<div>{peerId}</div>
<video
  id="remVideo"
  width="400px"
  height="auto"
  autoPlay
/>
<div>
    <button on:click={ping}>ping</button>
    <button on:click={call}>call</button>
</div>

