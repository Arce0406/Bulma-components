import * as Controller from "./Controller.js";

let isStreaming = false;

async function start() {
  //
  stop();
  //
  const audioSource = Controller.audioInputSelect?.value;
  const videoSource = Controller.videoSelect?.value;
  const constraints = {
    audio: {
      deviceId: audioSource ? { exact: audioSource } : undefined,
      channelCount: { ideal: 1 },
      autoGainControl: false,
      echoCancellation: false,
      googAutoGainControl: false,
      noiseSuppression: false,
    },
    video: {
      deviceId: videoSource ? { exact: videoSource } : undefined,
      width: { min: 640, ideal: 1280, max: 1920 },
      height: { min: 360, ideal: 720, max: 1080 },
      aspectRatio: { ideal: 1.7777777778 },
    },
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // const videoTracks = stream.getVideoTracks();
    // console.log("Got stream with constraints:", constraints);
    // console.log(`Using video device: ${videoTracks[0].label}`);
    window.stream = stream; // make variable available to browser console
    Controller.videoElement.srcObject = stream;
    Controller.videoElement.addEventListener("play", (event) => {
      isStreaming = true;
    });
    Controller.videoElement.addEventListener("pause", (event) => {
      isStreaming = false;
    });

    Controller.videoElement.play();
  } catch (error) {
    if (error.name === "OverconstrainedError") {
      const v = constraints.video;
      Controller.errorMsg(
        `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
      );
    } else if (error.name === "NotAllowedError") {
      Controller.errorMsg(
        "Permissions have not been granted to use your camera and microphone, you need to allow the page access to your devices in order for the demo to work."
      );
    }
    Controller.errorMsg(`getUserMedia error: ${error.name}`, error);
  }
}

function stop() {
  if (window.stream) {
    window.stream.getTracks().forEach((track) => {
      track.stop();
    });
    // Controller.videoElement.srcObject = null;
  }
  isStreaming = false;
}

/**
 * Trigger when selection change
 */
function onAudioDestinationChange() {
  if (typeof Controller.videoElement.sinkId == "undefined") {
    console.warn("Browser does not support output device selection.");
  }

  if (!audioOutputSelect.value) return;

  Controller.videoElement
    .setSinkId(audioOutputSelect.value)
    .then(() => {
      console.log(`Success, audio output device attached: ${audioDestination}`);
    })
    .catch((error) => {
      let errorMessage = error;
      if (error.name === "SecurityError") {
        errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
      }
      console.error(errorMessage);
      // Jump back to first output device in the list as it's the default.
      audioOutputSelect.selectedIndex = 0;
    });
}

export { isStreaming, start, stop, onAudioDestinationChange };
