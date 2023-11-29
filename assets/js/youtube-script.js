const playlist = [
    'OY6tSCH6eJA', //NOC
    'MPSXoJAIowY', //Oxy
    'uIWguvQXT2Y', //ReVive
    'ZYIrz1wd1xg' //OLNG
    
]; // Replace with your youtube ID
var player;
var currentVideoIndex = 0;

function initializeYouTubePlayer() {
    player = new YT.Player('youtube-player', {
        height: '460',
        width: '940',
        loop: 0,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        fs: 0,
        videoId: 'OY6tSCH6eJA',
        mute: 1,
        events: {
            'onReady': function (event) {
                onPlayerReady(event);
            },
            'onStateChange': onPlayerStateChange
        }
    });

    // Add click event listener to the div
    document.getElementById('youtube-prev').addEventListener('click', function () {
        playPrevVideo();
    });
    
    // Add click event listener to the div
    document.getElementById('youtube-next').addEventListener('click', function () {
        playNextVideo();
    });
}

function onPlayerReady(event) {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                player.playVideo();
            } else {
                player.pauseVideo();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(player.getIframe());
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        // Video ended, play the next video in the playlist
        playNextVideo();
    }
}

function playPrevVideo() {
    currentVideoIndex--;
    // If you want the playlist to loop back to the end when it reaches the beginning
    if (currentVideoIndex < 0) {
        currentVideoIndex = playlist.length - 1;
    }

    // Load and play the previous video in the playlist
    player.loadVideoById(playlist[currentVideoIndex], 0, 'default');
}

function playNextVideo() {
    currentVideoIndex++;
    // If you want the playlist to loop back to the beginning when it reaches the end
    if (currentVideoIndex >= playlist.length) {
        currentVideoIndex = 0;
    }

    // Load and play the next video in the playlist
    player.loadVideoById(playlist[currentVideoIndex], 0, 'default');
}

// Check if the YT object is defined, indicating that the API script has loaded
if (typeof YT !== 'undefined' && YT.loaded) {
    // API is ready, initialize the player
    initializeYouTubePlayer();
} else {
    // API is not ready, listen for the onYouTubeIframeAPIReady event
    window.onYouTubeIframeAPIReady = function () {
        // API is ready, initialize the player
        initializeYouTubePlayer();
    };
}