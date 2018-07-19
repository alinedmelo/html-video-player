const video = document.querySelector('video');
const playButton = document.querySelector('.play-button');

playButton.addEventListener('click', () => playOrPause());

let playOrPause = function() {

    if(video.paused) {
        video.play();
        playButton.classList.remove('flaticon-play-button');
        playButton.classList.add('flaticon-pause');
        playButton.classList.add('_playing');
    } else {
        video.pause();
        console.log('pause');
        playButton.classList.remove('flaticon-pause');
        playButton.classList.add('flaticon-play-button');
        playButton.classList.add('_paused');
    }
    
};