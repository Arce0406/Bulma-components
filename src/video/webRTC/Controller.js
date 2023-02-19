// let stream; =>  window.stream
// Buttons
const streamButton = document.getElementById("btn_stream");
const recordButton = document.getElementById("btn_record");
const downloadButton = document.getElementById("btn_download");

// Video
const videoElement = document.querySelector("video");

// Select
const audioInputSelect = document.querySelector("select#audioSource");
const audioOutputSelect = document.querySelector("select#audioOutput");
audioOutputSelect.disabled = !("sinkId" in HTMLMediaElement.prototype);
const videoSelect = document.querySelector("select#videoSource");
const codecPreferences = document.querySelector("select#codecPreferences");

// Messages
const errorElement = document.querySelector("#errorMsg");


function errorMsg(msg, error) {
  if (Controller.errorElement) {
    errorElement.innerHTML += `<p>${msg}</p>`;
  } else {
    console.log(msg);
  }

  if (typeof error !== "undefined") {
    console.error(error);
  }
}

export {
  streamButton,
  recordButton,
  downloadButton,
  videoElement,
  audioInputSelect,
  audioOutputSelect,
  videoSelect,
  codecPreferences,
  errorMsg
};
