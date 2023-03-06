let customFullScreenElement = undefined;

function fullscreenInit() {
    document.addEventListener("fullscreenchange", (event) => {
        console.log('change');
    });
}

function toggleFullScreen() {
    if (!document.fullscreenEnabled) alert('This device does not allow full screen.')

    if (document.fullScreenElement || customFullScreenElement) {
        customFullScreenElement = undefined;
        document.exitFullscreen().catch((err) => console.error(err));
    } else {
        customFullScreenElement = document.documentElement;
        document.documentElement.requestFullscreen().catch((err) => console.error(err));
    }
}

export { fullscreenInit, toggleFullScreen };