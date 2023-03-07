import * as WebRTCAPI from './webrtc.js'

document.addEventListener('DOMContentLoaded', function () {
    //
    draggable();

    //
    const drag_video = document.getElementById('main-video');
    drag_video.addEventListener("play", (event) => { });
    drag_video.addEventListener("pause", (event) => { });

    //
    const video = document.getElementById('webrtc-video');
    video.addEventListener("play", (event) => { });
    video.addEventListener("pause", (event) => { });

    //
    const btn_play_pause = document.getElementById('play_pause');
    btn_play_pause.addEventListener('click', async function (e) {
        if (video.paused || video.ended) {
            WebRTCAPI.start(video);
            e.currentTarget.firstElementChild.textContent = 'pause';
        } else {
            WebRTCAPI.stop(video);
            e.currentTarget.firstElementChild.textContent = 'play_arrow';
        }

        // e.currentTarget.firstElementChild.textContent =
        //     (e.currentTarget.firstElementChild.textContent === 'play_arrow')
        //         ? 'pause' : 'play_arrow';
    });

});

/**
 * 
 * @param {HTMLElement} video 
 */
function draggable() {
    const wrapper = document.querySelector('.draggable');
    // console.log(document.documentElement.getBoundingClientRect());
    function onDrag({ movementX, movementY }) {
        const { top, left, bottom, right } = document.documentElement.getBoundingClientRect();
        const dom = window.getComputedStyle(wrapper);
        const edge_right = right - parseInt(dom.width);
        const edge_bottom = bottom - parseInt(dom.height);
        const pLeft = parseInt(dom.left) + movementX;
        const pTop = parseInt(dom.top) + movementY;
        const nLeft = pLeft >= left ? ((pLeft <= edge_right) ? pLeft : edge_right) : 0;
        const nTop = pTop >= top ? ((pTop <= edge_bottom) ? pTop : edge_bottom) : 0;
        wrapper.style.left = `${nLeft}px`;
        wrapper.style.top = `${nTop}px`;
    }

    function onDragEnd() {
        // console.log('mouseup');
        wrapper.classList.remove('is-active');
        wrapper.removeEventListener('mousemove', onDrag);
    }

    wrapper.addEventListener('mousedown', () => {
        // console.log('mousedown');
        wrapper.classList.add('is-active');
        wrapper.addEventListener('mousemove', onDrag);
    });
    wrapper.addEventListener('mouseup', onDragEnd);
    wrapper.addEventListener('mouseleave', onDragEnd);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('resize', () => { 
        // 設定到初始位置
    });
}