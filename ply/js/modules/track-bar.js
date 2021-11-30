const TrackBar = (_ => {
    // state
    const state = {
        currentTrackTime: 0,
        fullTrackTime: 0,
        fillWidth: 0
    }

    // cache the DOM
    const TrackBarFillEl = document.querySelector('.track-bar__fill');

    const init = _=> {
        render();
    }

    const render = _=> {
        TrackBarFillEl.style.width = state.fillWidth + '%';
    }

    const getPercent = (current, full) => {
        return (current/full) *100;
    }

    const setState = obj => {
        state.currentTrackTime = obj.currentTime;
        state.fullTrackTime = obj.duration;
        state.fillWidth = getPercent(obj.currentTime, obj.duration);
        render();
    }

    return {
        init,
        setState
    }
})();

export default TrackBar;