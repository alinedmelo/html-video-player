const video = document.querySelector('video');
const playButton = document.querySelector('.play-button');
const pbar = document.querySelector('.progress-bar');

playButton.addEventListener('click', () => playOrPause());

let playOrPause = function() {

    if(video.paused) {
        video.play();
        playButton.classList.remove('flaticon-play-button');
        playButton.classList.remove('flaticon-circular-arrow');
        playButton.classList.add('flaticon-pause');

        update = setInterval(updateStatus, 30);
        
    } else {
        video.pause();
        playButton.classList.remove('flaticon-pause');
        playButton.classList.remove('flaticon-circular-arrow');
        playButton.classList.add('flaticon-play-button');
        window.clearInterval(update);
    }
    
};
let updateStatus = function() {

    let percentage = (video.currentTime / video.duration) * 100;
    pbar.style.width = percentage + '%';

    if(video.ended) {
        playButton.classList.remove('flaticon-pause');
        playButton.classList.remove('flaticon-play-button');
        playButton.classList.add('flaticon-circular-arrow');
        window.clearInterval(update);
    }

};