import { v4 as uuid } from 'uuid'

export const getServerID = () => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    
    return params.get('s')
}

export const getClientID = () => uuid();

export const isServer = () => {
    const search = window.location.search
    const params = new URLSearchParams(search)

    return typeof params.get('m') === 'string'
}

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