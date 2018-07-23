(function(){

    // Global scope variables
    const video = document.querySelector('video');
    const playButton = document.querySelector('.play-button');

    const progressContainer = document.querySelector('.progress');
    const pbar = document.querySelector('.progress-bar');

    // Eventos do player
    playButton.addEventListener('click', playOrPause);
    progressContainer.addEventListener('click', skipPlayer);

    // definindo métodos
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
        
    };

    function updatePlayer() {
        
        let percentage = (video.currentTime / video.duration) * 100;
        pbar.style.width = percentage + '%';
        
        if(video.ended) {
            playButton.classList.remove('flaticon-pause');
            playButton.classList.remove('flaticon-play-button');
            playButton.classList.add('flaticon-circular-arrow');
            window.clearInterval(update);
        }

    };

    function skipPlayer(ev) {
        
        // pega a posição do mouse onde rolou o evento de click
        let mouseX = ev.pageX - progressContainer.offsetLeft;
        
        // pega largura da barra  e transoforma em number
        let pbarWidth = window.getComputedStyle(progressContainer).getPropertyValue('width');
        pbarWidth = parseFloat(pbarWidth.substr(0, pbarWidth.length - 2));

        // skip da barra para o momento do video
        video.currentTime = (mouseX / pbarWidth) * video.duration;

        updatePlayer();
    };

})();