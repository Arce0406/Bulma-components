import * as Controller from "./Controller.js";
import * as Devices from "./Devices.js";
import * as Streamer from "./Streamer.js";
import * as Recorder from "./Recorder.js";

window.addEventListener("load", function () {
  Devices.listenStart();
  init();
});

function init() {
  Controller.streamButton.addEventListener("click", function () {
    // console.log("stream");
    if (Streamer.isStreaming) {
      if (Recorder.isRecording) stop_recording();
      stop_streaming();
    } else start_streaming();
  });
  Controller.recordButton.addEventListener("click", function () {
    // console.log("record");
    if (Recorder.isRecording) stop_recording();
    else start_recording();
  });
  Controller.downloadButton.addEventListener("click", function () {
    Recorder.download();
  });
}

function start_streaming() {
  Controller.audioInputSelect.onchange = Streamer.start;
  Controller.audioOutputSelect.onchange = Streamer.onAudioDestinationChange;
  Controller.videoSelect.onchange = Streamer.start;
  Controller.recordButton.disabled = false;
  Controller.codecPreferences.disabled = false;
  Controller.streamButton.textContent = "停止擷取";
  Streamer.start();
}

function stop_streaming() {
  Controller.audioInputSelect.onchange = null;
  Controller.audioOutputSelect.onchange = null;
  Controller.videoSelect.onchange = null;
  Controller.streamButton.textContent = "開始擷取";
  Streamer.stop();
}

function start_recording() {
  Recorder.start();
  Controller.recordButton.textContent = "停止錄影";
  //   playButton.disabled = true;
  Controller.downloadButton.disabled = true;
  Controller.codecPreferences.disabled = true;
}

function stop_recording() {
  Recorder.stop();
  Controller.recordButton.textContent = "開始錄影";
  //   playButton.disabled = false;
  Controller.downloadButton.disabled = false;
  Controller.codecPreferences.disabled = false;
}
