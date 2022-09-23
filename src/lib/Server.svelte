<script lang="ts">
  import Peer from 'peerjs';
  import { getServerID } from './utils';

  const serverID = getServerID();
  const peer = new Peer(serverID);
  let lastClientId = ''

  peer.on('connection', (conn) => {
    lastClientId = conn.peer
    conn.on('data', (data) => {
    });
    conn.on('open', () => {
      conn.send('pong!');
    });
    peer.on('call', function (call) {
      setTimeout(() => {
        answer(call);
      }, 2000);
    });
  });

  const answer = (peercall) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true }) //{ facingMode: { exact: "environment" } }
      .then(function (mediaStream) {
        var video = document.getElementById('myVideo');
        video.srcObject = mediaStream

        peercall.answer(mediaStream);        
        lastClientId = peercall.peer

        setTimeout(function() {
	        document.getElementById('remVideo').srcObject = peercall.remoteStream; 
	      },1500);	

      })
      .catch(function (err) {
        console.log(err.name + ': ' + err.message);
      });
  };
</script>

<div>ServerID: {serverID}</div>
{#if lastClientId}
    <div>Last ClientID: {lastClientId}</div>
{/if}

<video id="myVideo" width="400px" height="auto" autoPlay />

<video
    id="remVideo"
    width="400px"
    
    height="auto"
    autoPlay
    />
