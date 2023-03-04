document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('main-video');
    const btn_setting = document.getElementById('setting');
    const btn_play_pause = document.getElementById('play_pause');
    const btn_screenShot = document.getElementById('screenshot');
    const btn_recording = document.getElementById('recording');
    const btn_fullScreen = document.getElementById('fullscreen');
    const btn_volume = document.getElementById('volume');
    // const btn_fastForward = document.getElementById('');
    // const btn_fastRewind = document.getElementById('');
    const btn_camera = document.getElementById('camera');
    const btn_mic = document.getElementById('mic');

    btn_play_pause.addEventListener('click', function (e) {
        if (e.currentTarget.firstElementChild.textContent === 'play_arrow') {
            e.currentTarget.firstElementChild.textContent = 'pause';
        }
        else {
            e.currentTarget.firstElementChild.textContent = 'play_arrow';
        }
    });
    btn_volume.addEventListener('click', function () { });
    btn_recording.addEventListener('click', function (e) {

    });
    btn_screenShot.addEventListener('click', function (e) { });
    btn_fullScreen.addEventListener('click', function (e) { });

    btn_setting.addEventListener('click', function (e) { });
    btn_camera.addEventListener('click', function (e) {
        if (e.currentTarget.firstElementChild.textContent === 'videocam') {
            e.currentTarget.firstElementChild.textContent = 'videocam_off';
        }
        else {
            e.currentTarget.firstElementChild.textContent = 'videocam';
        }
    });
    btn_mic.addEventListener('click', function (e) {
        if (e.currentTarget.firstElementChild.textContent === 'mic') {
            e.currentTarget.firstElementChild.textContent = 'mic_off';
        }
        else {
            e.currentTarget.firstElementChild.textContent = 'mic';
        }
    });

    // btn_playlist.addEventListener('click', function () { });
    // btn_fastForward.addEventListener('click', function () { });
    // btn_fastRewind.addEventListener('click', function () { });
});