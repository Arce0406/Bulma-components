import * as FullScreenAPI from './fullscreen.js'

/**
 * https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Video_player_styling_basics
 */
document.addEventListener('DOMContentLoaded', function () {
    FullScreenAPI.fullscreenInit();

    
});

class MediaPlayer {
    constructor() { 
        this.video = document.getElementById('main-video');
        this.progress = document.getElementById('video-progress');
        this.btn_play_pause = document.getElementById('play_pause');
        this.btn_volume = document.getElementById('volume');
        this.volume_range = document.getElementById('volume-range');
        this.btn_video_file = document.getElementById('video-file');
        this.btn_setting = document.getElementById('setting');
        this.btn_fullScreen = document.getElementById('fullscreen');
        this.timeInfo = document.querySelector('.time-info span');
        this.statusInfo = document.querySelector('.status-info');
    }

    currentTime(t){}

    play(){}
    pause(){}
    stop(){}
    muted(){}
    volumeUp(v){}
    volumeDown(v){}
    fastForward(){}
    fastRewind(){}
}