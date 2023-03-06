/**
 * 
 * @param {HTMLElement} video 
 */
async function start(video) {
    stop(video);
    try {
        const constraints = { video: true, audio: false };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        window.stream = stream;
        video.srcObject = stream;
        await video.play();
    } catch (error) {
        if (error.name === "OverconstrainedError") {
            console.log(`The resolution ${video.width.exact}x${video.height.exact} px is not supported by your device.`);
        } else if (error.name === "NotAllowedError") {
            console.log("Permissions have not been granted to use your camera and microphone, you need to allow the page access to your devices in order for the demo to work.");
        } else {
            console.log(`getUserMedia error: ${error.name}`, error);
        }
    }
}

/**
 * 
 * @param {HTMLElement} video 
 */
async function stop(video) {
    if (!window.stream) return;
    await video.pause();
    window.stream.getTracks().forEach((track) => { track.stop(); });
    video.srcObject = null;
}


export { start, stop }