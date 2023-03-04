/**
 * https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Video_player_styling_basics
 */
document.addEventListener('DOMContentLoaded', function () {

    const video = document.getElementById('main-video');
    const progress = document.getElementById('video-progress');
    video.addEventListener("play", changeButtonState, false);
    video.addEventListener("pause", changeButtonState, false);
    video.addEventListener("volumechange", checkVolume, false);
    video.addEventListener("timeupdate", () => {
        changeProgress(video.currentTime);
    });


    const btn_play_pause = document.getElementById('play_pause');
    const btn_volume = document.getElementById('volume');
    const volume_range = document.getElementById('volume-range');
    // const btn_fastForward = document.getElementById('');
    // const btn_fastRewind = document.getElementById('');
    const btn_video_file = document.getElementById('video-file');
    const btn_setting = document.getElementById('setting');
    const btn_fullScreen = document.getElementById('fullscreen');

    /**
     * 
     */

    btn_play_pause.addEventListener('click', function (e) {
        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    });
    btn_volume.addEventListener('mouseenter', function (e) {
        // hover bar
        document.getElementById('volume-slider').classList.toggle('is-active');
    });
    btn_volume.addEventListener('mouseleave', function (e) {
        // hover bar
        document.getElementById('volume-slider').classList.toggle('is-active');
    });
    volume_range.addEventListener('change', (e) => {
        // console.log(volume_range.value);
        checkVolume(volume_range.value);
    });

    btn_video_file.addEventListener('change', function (e) {
        const file = btn_video_file.files[0];
        const title = file.name;
        const videourl = URL.createObjectURL(file);
        video.setAttribute("src", videourl);
    });

    progress.addEventListener("click", (e) => {
        const pos = (e.pageX - progress.offsetLeft - progress.offsetParent.offsetLeft) / progress.offsetWidth;
        video.currentTime = pos * video.duration;
    });

    btn_fullScreen.addEventListener('click', function (e) { });

    btn_setting.addEventListener('click', function (e) { });

    /**
     * 
     */

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

    function changeProgress(n) {
        if (video.duration) {
            progress.max = video.duration;
        }
        else {
            progress.value = 0;
        }

        if (n) {
            progress.value = Math.round(n);
        }
    }

    function checkVolume(dir) {
        if (dir) {
            video.volume = (dir / 100);
            video.muted = (video.volume <= 0);
        }

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

});