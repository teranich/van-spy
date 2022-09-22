export const MASTER_PEER_ID = 'master'


export const getPeerId = () => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const foo = params.get('id') || MASTER_PEER_ID
    return foo
  }

export const isServer = () => getPeerId() === MASTER_PEER_ID

export function createEmptyVideoTrack({ width, height }) {
    const canvas = Object.assign(document.createElement('canvas'), {
      width,
      height,
    });
    canvas.getContext('2d').fillRect(0, 0, width, height);

    const stream = canvas.captureStream();
    const track = stream.getVideoTracks()[0];

    return Object.assign(track, { enabled: false });
  }