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
    event.target.pauseVideo();
}


function stopVideo() {
    player.stopVideo();
    videoPlayed = true;
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

// SIGNATURE PROGRESS

function moveAllProgressBars() {
    console.log("Move all progress bars")
        $('.progress:visible').each(function() {
            var progressPercent = $(this).data('progress-percent');
            var progressBar = $(this).find('.progress-bar');

            var getPercent = progressPercent / 100;
            var getProgressWrapWidth = $(this).width();
            var progressTotal = getPercent * getProgressWrapWidth;
            var animationLength = 2000;

            // Set the initial state of the progress bar to 0
            progressBar.css('left', 0);

            // on page load, animate percentage bar to data percentage length
            // .stop() used to prevent animation queueing
            progressBar.stop().animate({
                left: progressTotal
            }, animationLength);
        });
    }


// Your JavaScript function to be executed when both classes are added
function handleClassChange(mutationsList, observer) {
    const targetElement = document.querySelector('.skills');

    // Check if both classes are present
    if (targetElement.classList.contains('section--is-active')) {
        // Your code here
        moveAllProgressBars()
    }
}

// Set up the Mutation Observer
const targetElement = document.querySelector('.skills');
const observer = new MutationObserver(handleClassChange);

// Start observing changes in the class attribute
observer.observe(targetElement, { attributes: true, attributeFilter: ['class'] });
