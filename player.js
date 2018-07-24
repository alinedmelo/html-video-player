(function(){
    // Global scope variables
    const video = document.querySelector('video');
    const playButton = document.querySelector('.play-button');
    const progressContainer = document.querySelector('.progress');
    const pbar = document.querySelector('.progress-bar');
    const timeField = document.querySelector('.time-field');
    const soundButton = document.querySelector('.sound-button');
    const soundContainer = document.querySelector('.sound');
    const soundBar = document.querySelector('.sound-bar');
    const fullScreen = document.querySelector('.fullscreen-button');

    // Init do player    
    video.addEventListener('canplay', function() {

        playButton.addEventListener('click', playOrPause);
        progressContainer.addEventListener('click', skipPlayer);
        soundButton.addEventListener('click', muteOrUnmute);
        soundContainer.addEventListener('click', volumeControl);
        fullScreen.addEventListener('click', setFullscreen);

        updatePlayer();
    });
    video.load();

    // definindo os métodos
    function playOrPause() {
        
        if(video.paused) {
            video.play();
            playButton.classList.remove('flaticon-play-button');
            playButton.classList.remove('flaticon-circular-arrow');
            playButton.classList.add('flaticon-pause');
            
            update = setInterval(updatePlayer, 30);
            
        } else {
            video.pause();
            playButton.classList.remove('flaticon-pause');
            playButton.classList.remove('flaticon-circular-arrow');
            playButton.classList.add('flaticon-play-button');
            window.clearInterval(update);
        }
        
    }

    function updatePlayer() {
        
        let percentage = (video.currentTime / video.duration) * 100;
        pbar.style.width = percentage + '%';

        timeField.innerHTML = formatTime(video.currentTime) + ' / '  + formatTime(video.duration);
        
        if(video.ended) {
            playButton.classList.remove('flaticon-pause');
            playButton.classList.remove('flaticon-play-button');
            playButton.classList.add('flaticon-circular-arrow');
            window.clearInterval(update);
        }

    }

    function skipPlayer(ev) {
        
        // pega a posição do mouse onde rolou o evento de click
        let mouseX = ev.pageX - progressContainer.offsetLeft;
        
        // pega largura da barra  e transoforma em number
        let pbarWidth = window.getComputedStyle(progressContainer).getPropertyValue('width');
        pbarWidth = parseFloat(pbarWidth.substr(0, pbarWidth.length - 2));

        // skip da barra para o momento do video
        video.currentTime = (mouseX / pbarWidth) * video.duration;

        updatePlayer();
    }

    function muteOrUnmute() {

        if(!video.muted) {
            video.muted = true;
            soundButton.classList.add('flaticon-speaker'); //sound off
            soundButton.classList.remove('flaticon-speaker-1'); //sound on
            soundBar.style.display = 'none';
        } else {
            video.muted = false;
            soundButton.classList.add('flaticon-speaker-1'); //sound on
            soundButton.classList.remove('flaticon-speaker'); //sound off
            soundBar.style.display = 'block';
        }
    }

    function volumeControl(ev) {

        let mouseX = ev.pageX - soundContainer.offsetLeft;

        let sbarWidth = window.getComputedStyle(soundContainer).getPropertyValue('width');
        sbarWidth = parseFloat(sbarWidth.substr(0, sbarWidth.length - 2));

        video.volume = (mouseX / sbarWidth);
        soundBar.style.width = (mouseX / sbarWidth)  * 100 + '%';

        video.muted = false;
        soundButton.classList.add('flaticon-speaker-1'); //sound on
        soundButton.classList.remove('flaticon-speaker'); //sound off
        soundBar.style.display = 'block';
    }

    function setFullscreen() {

        if(video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        }
    }

    function formatTime(timeToFormat) {

        // formatando o tempo do vídeo
        let seconds = Math.round(timeToFormat);
        let minutes = Math.floor(timeToFormat/60);
        let hours = Math.floor(timeToFormat/60) * 60;

        // formata corretamente
        if(minutes > 0) seconds -= minutes*60;
        if(hours > 0) hours -= minutes*60;
        
        //formata os segundos
        if(seconds.toString().length === 1) seconds = '0' + seconds;

        return (hours > 0) ? hours + ':' + minutes + ':' + seconds : minutes + ':' + seconds;
    }

})();