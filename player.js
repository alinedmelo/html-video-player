window.addEventListener('load', function(){

    let video = this.document.querySelector('video');
    let playButton = this.document.querySelector('.play-button');

    playButton.addEventListener('click', () => playOrPause());

}, false);

let playOrPause = function() {

    video.paused ? video.play() : video.pause();
    
};