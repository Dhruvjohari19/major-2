import { songsList } from '../data/songs.js'
import Playinfo from '../modules/play-info.js';
import TrackBar from './track-bar.js';

const Playlist = (_=> {

    //data
    let songs = songsList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url);

    //cache the DOM
    const playListEl = document.querySelector(".playlist");
    const nextButtonEl = document.querySelector('.next');
    const previousButtonEl = document.querySelector('.previous');
    const TrackBarEl = document.querySelector('.track-bar');
    const TrackBarGhostEl = document.querySelector('.track-bar__ghost');
    const thumbNail = document.querySelector('.player__img');
    const headerEl = document.querySelector('.player__name');

    const exportIndex = _ => {
        return {
            index: currentlyPlayingIndex + 1
        }
    }

    const init = _=> {
        render();
        listeners();
        Playinfo.setState({
            isPlaying: !currentSong.paused,
            songsLength: songs.length
        });
    }

    const flip = _=> {
        toggleplayPause();
        render();
    }


    const toggleplayPause = _=> {
        return currentSong.paused ? currentSong.play() : currentSong.pause();
    }

    const changeAudioSrc =  _=> {
        currentSong.src = songs[currentlyPlayingIndex].url;
    }

    const scrollToSong = _=> {
        let songToScrollTo = [...playListEl.children][currentlyPlayingIndex];
        songToScrollTo.scrollIntoView({behavior: 'smooth'});
        window.scroll(0, 0);
    }

    const playNextSong = _ => {
        currentlyPlayingIndex++;
        if (currentlyPlayingIndex >= songs.length) {
            currentlyPlayingIndex = 0;
        }
        scrollToSong();
        changeAudioSrc();
        mainPlay(currentlyPlayingIndex);
        render();
    }

    const playPreviousSong = _=> {
        if (currentlyPlayingIndex === 0) {
            currentlyPlayingIndex = songs.length -1;
        } else {
            currentlyPlayingIndex--;
        }
        scrollToSong();
        changeAudioSrc();
        mainPlay(currentlyPlayingIndex);
        render();
    }

    const mainPlay = (clickedIndex) => {
        if (clickedIndex === currentlyPlayingIndex) {
            toggleplayPause();

        } else {
            currentlyPlayingIndex = clickedIndex;
            scrollToSong();
            changeAudioSrc();
            toggleplayPause();
        }

        Playinfo.setState({
            isPlaying: !currentSong.paused,
            songsLength: songs.length
        });
    }

    const listeners = _=> {
        // 1. Get the index of the li tag
        playListEl.addEventListener('click', (e)=> {
            if (e.target && e.target.matches('.fa')) {
                const listElem = e.target.parentNode.parentNode;
                const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
                mainPlay(listElemIndex);
                thumbNail.setAttribute('src', songs[currentlyPlayingIndex].image);
                render();
            };
        })

        // 2. Change the currentlyPlayingIndex to index of li tag

        // 3. play or pause

        // 4. If it's not hte same song, then change the src to that new song after changing the currentlyPlayingIndex index

        currentSong.addEventListener('ended', _ => {
            playNextSong();
            thumbNail.setAttribute('src', songs[currentlyPlayingIndex].image);
        })

        nextButtonEl.addEventListener('click', () => {
            playNextSong();
            thumbNail.setAttribute('src', songs[currentlyPlayingIndex].image);
        })

        previousButtonEl.addEventListener('click', () => {
            playPreviousSong();
            thumbNail.setAttribute('src', songs[currentlyPlayingIndex].image);
        })

        currentSong.addEventListener('timeupdate', ()=> {
            TrackBar.setState(currentSong);

            // Render remaining time
            const timeInfo = [...playListEl.children][currentlyPlayingIndex].lastElementChild;

            let rawSeconds = Math.floor(currentSong.duration - currentSong.currentTime);
            let rawMinutes = Math.floor(rawSeconds/60);

            let minutes = rawMinutes % 60;
            let seconds = rawSeconds % 60;

            if (seconds < 10) {
                 seconds = '0' + seconds;
            }

            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            timeInfo.innerHTML = `-${minutes}:${seconds}`;
        })

        TrackBarEl.addEventListener('click', (e)=> {
            // Let user change time of track when clicking the bar
            let barClickX = e.clientX;
            let barWidth = TrackBarEl.clientWidth;

            let percentage = barClickX/barWidth;
            let duration = currentSong.duration;

            let newTime = duration * percentage;

            currentSong.currentTime = newTime;
        })

        TrackBarEl.addEventListener('mousemove', (e)=> {
            let mousePositionX = e.clientX;
            let barWidth = TrackBarEl.clientWidth;

            let percentage = Math.floor(mousePositionX/barWidth * 100) +'%';

            TrackBarGhostEl.style.width = percentage;
        })

        TrackBarEl.addEventListener('mouseleave', ()=> {
            TrackBarGhostEl.style.width = 0;
        })
    }


    const render = _=> {

        let artist = songs[currentlyPlayingIndex].artist;
        let title = songs[currentlyPlayingIndex].title;
        headerEl.innerHTML = artist +'<br>'+ title;

        let markup = '';

        const toggleIcon = itemIndex => {
            if (currentlyPlayingIndex === itemIndex) {
                return currentSong.paused ? 'fa-play' : 'fa-pause';
            } else {
                return 'fa-play';
            }
        }

        songs.forEach((songObj, index) => {
            markup += `
            <li class="playlist__song ${index === currentlyPlayingIndex ? 'playlist__song--active' : ''}">
                <div class="play-pause">
                    <i class="fa ${toggleIcon(index)} pp-icon"></i>
                </div>
                <div class="playlist__song-details">
                    <span class="playlist__song-name">${songObj.title}</span>
                    <br>
                    <span class="playlist__song-artist">${songObj.artist}</span>
                </div>
                <div class="playlist__song-duration">
                    ${songObj.time}
                </div>
            </li>`;
        })

        let footer = '<li class="footer"><p>Music from https://filmmusic.io \"'+songs[currentlyPlayingIndex].title +'\" by Kevin MacLeod (https://incompetech.com)<br>License: CC BY (http://creativecommons.org/licenses/by/4.0/)</p></li>';

        markup += footer;
        playListEl.innerHTML = markup;
    }
    return {
        init,
        flip,
        exportIndex
    }
})();

export default Playlist;