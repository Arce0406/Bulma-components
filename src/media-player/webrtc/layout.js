import * as WebRTCAPI from './webrtc.js'

const layout1 = "left-and-right";   // .switch-bar
const layout2 = "up-and-down";
const layout3 = "normal-and-drag";

function webrtc_video() {
    const video = document.getElementById('webrtc-video');
    const btn_play_pause = document.getElementById('play_pause');
    btn_play_pause.addEventListener('click', async function (e) {
        /**
         * From MDN docs:
         * Note: The value of event.currentTarget is only available while the event is being handled. 
         * If you console.log() the event object, storing it in a variable, 
         * and then look for the currentTarget key in the console, its value will be null.
         */
        const target = e.currentTarget;
        if (video.paused || video.ended) {
            // await drag_video.play();
            WebRTCAPI.start(video);
            target.firstElementChild.textContent = 'pause';
        } else {
            // await drag_video.pause();
            WebRTCAPI.stop(video);
            target.firstElementChild.textContent = 'play_arrow';
        }
    });
}

function sub_video() {
    const drag_video = document.getElementById('drag-video');
    const btn_drag_play_pause = document.getElementById('drag_play_pause');
    btn_drag_play_pause.addEventListener('click', async function (e) {
        const target = e.currentTarget;
        if (drag_video.paused || drag_video.ended) {
            await drag_video.play();
            target.firstElementChild.textContent = 'pause';
        } else {
            await drag_video.pause();
            target.firstElementChild.textContent = 'play_arrow';
        }
    });
}

function changeLayout() {
    const drag_controll = Drag();
    const wrapper = document.querySelector(".video-wrapper");
    const btn = document.getElementById("layout_customize");
    btn.addEventListener("click", change);

    function reset() {
        wrapper.classList.remove(layout1);
        wrapper.classList.remove(layout2);
        wrapper.classList.remove(layout3);
    }

    function change() {
        if (wrapper.classList.contains(layout1)) {
            reset();
            drag_controll.release();
            wrapper.classList.add(layout2);
        }
        else if (wrapper.classList.contains(layout2)) {
            reset();
            wrapper.classList.add(layout3);
            drag_controll.set();
        }
        else if (wrapper.classList.contains(layout3)) {
            reset();
            drag_controll.release();
            wrapper.classList.add(layout1);
        }
    }

    function set() {
        if (wrapper.classList.contains(layout1)) {
        }
        else if (wrapper.classList.contains(layout2)) {
        }
        else if (wrapper.classList.contains(layout3)) {
            drag_controll.set();
        }
    }
    set();
}



/**
 * Drag Events
 */

function Drag() {

    const drag_layout = document.querySelector(".video-wrapper > .video-container:last-child");
    if (!drag_layout) return;

    function dragLayoutSet() {
        if (!drag_layout?.parentElement?.classList.contains("normal-and-drag")) return;

        // Start drag
        drag_layout.addEventListener('mousedown', onDragStart);
        // End drag
        drag_layout.addEventListener('mouseup', onDragEnd);
        drag_layout.addEventListener('mouseleave', onDragEnd);
        window.addEventListener('mouseup', onDragEnd);
        // Window resize
        window.addEventListener('resize', onResize);
    }

    function dragLayoutRelease() {        
        drag_layout.style.left = '0px';
        drag_layout.style.top = '0px';
        drag_layout.removeEventListener('mousedown', onDragStart);
        drag_layout.removeEventListener('mouseup', onDragEnd);
        drag_layout.removeEventListener('mouseleave', onDragEnd);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('resize', onResize);
    }

    function onDragStart() {
        drag_layout.addEventListener('mousemove', onDrag);
    }

    function onDrag({ movementX, movementY }) {
        const { top: box_top, left: box_left, bottom: box_bottom, right: box_right } = document.documentElement.getBoundingClientRect();
        const { width: video_width, height: video_height, left: video_left, top: video_top } = window.getComputedStyle(drag_layout);
        const right_limit = box_right - parseInt(video_width);
        const bottom_limit = box_bottom - parseInt(video_height);
        const current_left = parseInt(video_left) + movementX;
        const current_top = parseInt(video_top) + movementY;
        const next_Left = (current_left >= box_left) ? ((current_left <= right_limit) ? current_left : right_limit) : 0;
        const next_Top = (current_top >= box_top) ? ((current_top <= bottom_limit) ? current_top : bottom_limit) : 0;
        drag_layout.style.left = `${next_Left}px`;
        drag_layout.style.top = `${next_Top}px`;
    }

    function onDragEnd() {
        drag_layout.removeEventListener('mousemove', onDrag);
    }

    function onResize() {
        const { height, width, top, left } = window.getComputedStyle(drag_layout);
        const edge_right = parseInt(left) + parseInt(width);
        const edge_bottom = parseInt(top) + parseInt(height);
        // console.log(edge_bottom, edge_right);
        if (window.innerHeight < edge_bottom) {
            drag_layout.style.top = `${window.innerHeight - parseInt(height)}px`;
        }
        if (top < 0) {
            drag_layout.style.top = '0px';
        }

        if (window.innerWidth < edge_right) {
            drag_layout.style.left = `${window.innerWidth - parseInt(width)}px`;
        }
        if (left < 0) {
            drag_layout.style.left = '0px';
        }
    }

    return { set: dragLayoutSet, release: dragLayoutRelease };
}

function init() {
    webrtc_video();
    sub_video();
    changeLayout();
}

init();

export { init }