import Playlist from '../modules/playlist.js';

const Playinfo = (_=> {

    const state = {
        songsLength: 0,
        isPlaying: false
    }

    // cache the DOM
    const playerCountEl = document.querySelector('.player__count');
    const playerTriggerEl = document.querySelector('.player__trigger');

    const init = _=> {
        render();
        listeners();
    }

    const listeners = _=> {
        playerTriggerEl.addEventListener('click', ()=> {
            state.isPlaying = state.isPlaying ? false : true;
            Playlist.flip();
            render();
        })
    }

    const setState = (obj) => {
        state.songsLength = obj.songsLength;
        state.isPlaying = obj.isPlaying;
        render();
    };

    const render = _=> {
        playerCountEl.innerHTML = `Song ${Playlist.exportIndex().index} of ${state.songsLength}`;
        playerTriggerEl.innerHTML = state.isPlaying ? '<span><i class="fa fa-pause pp-icon"></i></span>' : '<span><i class="fa fa-play pp-icon"></i></span>';
    }
    return {
        init,
        setState
    }
})();

export default Playinfo;