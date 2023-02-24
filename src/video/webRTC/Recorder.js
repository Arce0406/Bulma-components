// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/mimeType
/**
 * 0kb/毀損的影片檔案：
 * 根據 https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder/dataavailable_event
 * 裡面的範例寫到了 "data available after MediaRecorder.stop() called."
 * 也就是download如果太早觸發，在stop之前，會導致blob不完整，因此檔案結構被判定毀損，從而產出0kb的影片檔
 */

import * as Controller from "./Controller.js";
import * as DB from "./idb.js";

// Recording object
let mediaRecorder;
let chunks;
let isRecording = false;
let startTime;
let duration;

const recordMimeType = "video/webm;codecs=vp9,opus";

async function dbSetting() {
  const { dbPromise, videoStored } = await DB.init();
  let keys = await videoStored.keys(); // 取出key值來確認 db 是否有cache資料了
  if (keys.length) {
    console.log(keys);
  }
}

function start() {
  if (!window.stream || (window.stream && !window.stream.active)) {
    Controller.errorMsg("No such stream！");
    return;
  }

  chunks = [];
  const mimeType =
    Controller.codecPreferences.options[codecPreferences.selectedIndex].value;
  const options = { mimeType };

  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
    mediaRecorder.addEventListener("start", function (event) {
      startTime = Date.now();
      isRecording = true;
    });
    mediaRecorder.addEventListener("stop", function (event) {
      // console.log("Recorder stopped: ", event);
      // console.log("Recorded Blobs: ", chunks);
      duration = Date.now() - startTime;
      isRecording = false;
      saveVideo();
    });
    // mediaRecorder.addEventListener("pause", function (event) {});
    // mediaRecorder.addEventListener("resume", function (event) {});
    mediaRecorder.addEventListener("dataavailable", (event) => {
      // console.log("handleDataAvailable: ", event);
      if (event.data && event.data.size > 0) {
        chunks.push(event.data);
      }
    });
    mediaRecorder.addEventListener("error", function (event) {
      console.log("Recorder error: ", event);
    });

    mediaRecorder.start();
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e);
    Controller.errorMsg(
      `<p>Exception while creating MediaRecorder: ${JSON.stringify(e)}</p>`
    );
    return;
  }
}

function stop() {
  if (mediaRecorder) mediaRecorder.stop();
  isRecording = false;
}

function download(videoBlobData, mimeType) {
  const data = videoBlobData ? videoBlobData : chunks;
  const options = {
    type: mimeType ? mimeType : "video/webm",
  };

  if (data === chunks && isRecording) return;

  const blob = new Blob(data, options);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "test.webm";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}

function saveVideo(videoBlobData, mimeType) {
  const data = videoBlobData ? videoBlobData : chunks;
  const options = {
    type: mimeType ? mimeType : "video/webm",
  };

  if (data === chunks && isRecording) return;

  const blob = new Blob(data, options);
  // DB.addVideo("test", blob);
}

function replay(replayElement) {
  const mimeType = codecPreferences.options[
    codecPreferences.selectedIndex
  ].value.split(";", 1)[0];
  const superBuffer = new Blob(chunks, mimeType);

  replayElement.src = null;
  replayElement.srcObject = null;
  replayElement.src = window.URL.createObjectURL(superBuffer);
  replayElement.controls = true;
  replayElement.play();
}

export { isRecording, dbSetting, start, stop, download, replay };
