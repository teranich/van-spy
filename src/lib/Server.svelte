<script lang="ts">
  import Peer from 'peerjs';
  import { getPeerId } from './utils';

  const peerId = getPeerId();
  const peer = new Peer(peerId);
  console.log('before log connection', peerId, peer)
  peer.on('connection', (conn) => {
    console.log('connected', conn)
    conn.on('data', (data) => {
      console.log('data=', data, conn.peer);
    });
    conn.on('open', () => {
      conn.send('hello!');
    });
    peer.on('call', function (call) {
      setTimeout(() => {
        answer(call);
      }, 2000);
    });
  });
  const answer = (peercall) => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true }) //{ facingMode: { exact: "environment" } }
      .then(function (mediaStream) {
        var video = document.getElementById('myVideo');
        video.srcObject = mediaStream

        peercall.answer(mediaStream);
        
      })
      .catch(function (err) {
        console.log(err.name + ': ' + err.message);
      });
  };
</script>

<div>{peerId}</div>
<video id="myVideo" width="400px" height="auto" autoPlay />
