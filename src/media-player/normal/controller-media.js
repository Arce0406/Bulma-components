import * as FullScreenAPI from './fullscreen.js'
import * as ModalAPI from '../../modal/modal.js'

function setting() {
    FullScreenAPI.fullscreenInit();
    ModalAPI.modalLoaded();

    const video = document.getElementById('main-video');
    const progress = document.getElementById('video-progress');
    const btn_play_pause = document.getElementById('play_pause');
    const btn_volume = document.getElementById('volume');
    const volume_range = document.getElementById('volume-range');
    const btn_video_file = document.getElementById('video-file');
    const btn_fullScreen = document.getElementById('fullscreen');
    const timeInfo = document.querySelector('.time-info span');
    const statusInfo = document.querySelector('.status-info');

    /**
     * Play、Pause
     */
    video.addEventListener("play", changeButtonState, false);
    video.addEventListener("pause", changeButtonState, false);
    btn_play_pause.addEventListener('click', function (e) {
        togglePlay();
    });
    video.addEventListener('mouseup', (e) => {
        togglePlay();
    });
    async function togglePlay() {
        if (video.paused || video.ended) {
            await video.play();
        } else {
            await video.pause();
        }
    }
    function changeButtonState() {
        // Play/Pause button
        if (video.paused || video.ended) {
            btn_play_pause.setAttribute("data-state", "play");
            btn_play_pause.firstElementChild.textContent = 'play_arrow';
        } else {
            btn_play_pause.setAttribute("data-state", "pause");
            btn_play_pause.firstElementChild.textContent = 'pause';
        }
    }

    /**
     * 音量
     */
    video.addEventListener("volumechange", checkVolume, false);
    btn_volume.addEventListener('mouseenter', function (e) {
        document.getElementById('volume-slider').classList.toggle('is-active');
    });
    btn_volume.addEventListener('mouseleave', function (e) {
        document.getElementById('volume-slider').classList.toggle('is-active');
    });
    volume_range.addEventListener('change', (e) => {
        checkVolume(volume_range.value);
    });
    function checkVolume(dir) {
        // Volume +/-
        if (dir) {
            video.volume = (dir / 100);
            video.muted = (video.volume <= 0);
        }

        // Change volume icon
        if (video.muted) {
            btn_volume.firstElementChild.textContent = 'volume_mute';
        }
        else if (video.volume >= 1) {
            btn_volume.firstElementChild.textContent = 'volume_up';
        }
        else {
            btn_volume.firstElementChild.textContent = 'volume_down';
        }
    }

    /**
     * Open media file source
     */
    btn_video_file.addEventListener('change', function (e) {
        videoReset();
        try {
            const file = btn_video_file.files[0];
            // console.log(file);
            if (!file.type.includes('video/')) {
                statusInfo.textContent = `不支援的檔案類型：${file.type}.`
                return;
            }

            statusInfo.textContent = file.name;
            video.setAttribute("src", URL.createObjectURL(file));
        } catch (error) {
            console.error(error);
            statusInfo.textContent = error.message;
        }
    });
    async function videoReset() {
        if (video) await video.pause();
    }

    /**
     * Video progress bar
     */
    video.addEventListener("timeupdate", () => {
        changeProgress(video.currentTime);
    });
    progress.addEventListener("click", (e) => {
        const pos = (e.pageX - progress.offsetLeft - progress.offsetParent.offsetLeft) / progress.offsetWidth;
        video.currentTime = pos * video.duration;
    });
    function changeProgress(n) {
        if (video.duration) {
            progress.max = video.duration;
        }
        else {
            progress.value = 0;
        }

        if (n) {
            const seconds = Math.round(n);
            progress.value = seconds;
            timeInfo.textContent = new Date(1000 * seconds).toISOString().substring(11, 19);
        }
    }

    /**
     * Full screen
     */
    btn_fullScreen.addEventListener('click', function (e) { FullScreenAPI.toggleFullScreen(); });

    /**
     * Fast forward、Fast rewind
     */
    document.addEventListener('keyup', (e) => {
        if (e.key == "ArrowRight") {
            if (video) video.currentTime += 5;
        }
        else if (e.key == "ArrowLeft") {
            if (video) video.currentTime -= 5;
        }
    });
}

export { setting }