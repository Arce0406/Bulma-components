import * as WebRTCAPI from './webrtc.js'

document.addEventListener('DOMContentLoaded', function () {
    //
    draggable();

    //
    const drag_video = document.getElementById('drag-video');
    const video = document.getElementById('webrtc-video');
    // addEventListener("enterpictureinpicture", (event) => {});
    // addEventListener("leavepictureinpicture", (event) => {});

    //
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

        // e.currentTarget.firstElementChild.textContent =
        //     (e.currentTarget.firstElementChild.textContent === 'play_arrow')
        //         ? 'pause' : 'play_arrow';
    });

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
});

/**
 * 
 * @param {HTMLElement} video 
 */
function draggable() {
    const wrapper = document.querySelector('.draggable');

    if (!wrapper) return;

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
        wrapper.classList.remove('is-active');
        wrapper.removeEventListener('mousemove', onDrag);
    }

    wrapper.addEventListener('mousedown', () => {
        wrapper.classList.add('is-active');
        wrapper.addEventListener('mousemove', onDrag);
    });
    wrapper.addEventListener('mouseup', onDragEnd);
    wrapper.addEventListener('mouseleave', onDragEnd);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('resize', (e) => {
        // 設定到初始位置
        // console.log(window.innerHeight, window.innerWidth);
        const dom = window.getComputedStyle(wrapper);
        const edge_right = parseInt(dom.left) + parseInt(dom.width);
        const edge_bottom = parseInt(dom.top) + parseInt(dom.height);
        // console.log(edge_bottom, edge_right);
        if (window.innerHeight < edge_bottom) {
            wrapper.style.top = `${window.innerHeight - parseInt(dom.height)}px`;
        }
        if (dom.top < 0) {
            wrapper.style.top = '0px';
        }

        if (window.innerWidth < edge_right) {
            wrapper.style.left = `${window.innerWidth - parseInt(dom.width)}px`;
        }
        if (dom.left < 0) {
            wrapper.style.left = '0px';
        }

    });
}