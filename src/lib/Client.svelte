<script lang="ts">
  import Peer from 'peerjs';
  import { createEmptyVideoTrack, getServerID, getClientID } from './utils';

  const peerId = getClientID();
  const peer = new Peer(peerId);
  const serverId = getServerID()
  let pingMessage = ''

  const ping = () => {
    try {
    
      pingMessage = '...'
      const conn = peer.connect(serverId)
      conn.on('data', (data: string) => {
        pingMessage = data
      })
      conn.on('open', () => {
        conn.send('hi!')
      })

    } catch (e) {
      console.error(e)
    }
  }

  const call = () => {
    const videoTrack = createEmptyVideoTrack({ width: 0, height: 0 });
    const mediaStream = new MediaStream([videoTrack]);
    const peercall = peer.call(serverId, mediaStream);
    
    peercall.on('stream', function (stream) {
      setTimeout(function () {
        document.getElementById('remVideo').srcObject = peercall.remoteStream;
      }, 1500);
    });
  };
</script>
<div>ClientID: {peerId}</div>
<div>ServerID: {serverId}</div>
<video
    id="remVideo"
    width="400px"
    height="auto"
    autoPlay
    />
<div>

    <button on:click={ping}>ping </button>
    <button on:click={call}>call</button>
</div>
<div>{pingMessage}</div>

