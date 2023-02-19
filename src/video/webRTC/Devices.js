import * as Controller from "./Controller.js";

function listenStart() {
  updateSupportMimeType();
  updateCameraList();
  updateAudioInput();
  updateAudioOutput();
  // Listen for changes to media devices and update the list accordingly
  navigator.mediaDevices.addEventListener("devicechange", (event) => {
    updateCameraList();
    updateAudioInput();
    updateAudioOutput();
  });
}

// Fetch an array of devices of a certain type
async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === type);
}

async function updateCameraList() {
  const cameras = await getConnectedDevices("videoinput");
  //
  while (Controller.videoSelect.firstChild) {
    Controller.videoSelect.removeChild(Controller.videoSelect.firstChild);
  }
  //
  cameras.forEach((camera) => {
    const option = document.createElement("option");
    option.label = camera.label || "unknown camera/video-input device";
    option.value = camera.deviceId;
    Controller.videoSelect.appendChild(option);
  });
}

async function updateAudioInput() {
  const audios = await getConnectedDevices("audioinput");
  //
  while (Controller.audioInputSelect.firstChild) {
    Controller.audioInputSelect.removeChild(
      Controller.audioInputSelect.firstChild
    );
  }
  //
  audios.forEach((audio) => {
    const option = document.createElement("option");
    option.label = audio.label || "unknown microphone device";
    option.value = audio.deviceId;
    Controller.audioInputSelect.appendChild(option);
  });
}

async function updateAudioOutput() {
  const audios = await getConnectedDevices("audiooutput");
  //
  while (Controller.audioOutputSelect.firstChild) {
    Controller.audioOutputSelect.removeChild(
      Controller.audioOutputSelect.firstChild
    );
  }
  //
  audios.forEach((audio) => {
    const option = document.createElement("option");
    option.label = audio.label || "unknown speaker device";
    option.value = audio.deviceId;
    Controller.audioOutputSelect.appendChild(option);
  });
}

function updateSupportMimeType() {
  const videoTypes = ["webm", "ogg", "mp4", "x-matroska"];
  const audioTypes = ["webm", "ogg", "mp3", "x-matroska"];
  const codecs = [
    "should-not-be-supported",
    "vp9",
    "vp9.0",
    "vp8",
    "vp8.0",
    "avc1",
    "av1",
    "h265",
    "h.265",
    "h264",
    "h.264",
    "opus",
    "pcm",
    "aac",
    "mpeg",
    "mp4a",
  ];

  function getSupportedMimeTypes(media, types, codecs) {
    const isSupported = MediaRecorder.isTypeSupported;
    const supported = [];
    types.forEach((type) => {
      const mimeType = `${media}/${type}`;

      if (isSupported(mimeType)) supported.push(mimeType);

      codecs.forEach((codec) =>
        [
          `${mimeType};codecs=${codec}`,
          `${mimeType};codecs=${codec.toUpperCase()}`,
        ].forEach((variation) => {
          if (isSupported(variation)) supported.push(variation);
        })
      );
    });
    return supported;
  }

  const supportedVideos = getSupportedMimeTypes("video", videoTypes, codecs);
  // const supportedAudios = getSupportedMimeTypes("audio", audioTypes, codecs);

  supportedVideos.forEach((mimeType) => {
    const option = document.createElement("option");
    option.innerText = option.value = mimeType;
    Controller.codecPreferences.appendChild(option);
  });
}

// export * from "./Controller.js";

export { listenStart };
