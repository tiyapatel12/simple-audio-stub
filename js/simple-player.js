// audio control objects
const audio = new Audio("audio/queencard.mp3");
const playPauseButton = document.getElementById("play-pause-button");

// display info objects
const totalTime = document.getElementById("total-time");
const trackTime = document.getElementById("current-time");
const seekBar = document.getElementById("seek-bar");
const songTitle = document.getElementById("song-title");
const volumeSlider = document.getElementById('volume-slider');
const outputContainer = document.getElementById('volume-output');

// buttons to change songs
const previousSongButton = document.getElementById('previous-song');
const nextSongButton = document.getElementById("next-song");

// Stores current song playing
let songPlaying = 0;

// Store whether the user is currently dragging the seek bar
let seeking = false;

//things to happen at audio load
audio.onloadedmetadata = (event) => {
    totalTime.innerHTML = formatTime(audio.duration);
    seekBar.max = Math.floor(audio.duration);
    playPauseButton.src = 'images/play.svg';
}

// things to happen as a live event
audio.ontimeupdate = (event) => {
    trackTime.innerHTML = formatTime(audio.currentTime);
    // Only update seekbar when user is not dragging seek bar knob
  if (!seeking) {
    seekBar.value = Math.floor(audio.currentTime);
}
}

// Detect when audio finishes playing and restart all necessary values
audio.onended = (event) => {
    button.src = "images/play.svg";
    trackTime.innerHTML = formatTime(0);
    seekBar.value = 0;
}


// if the audio is paused then button will make it play, but if it is playing then the audio will pause
playPauseButton.onclick = (event) => {
    if(audio.paused) {
        audio.play();
    }
    else{
        audio.pause();
    }
}

// My own Function that can be used in next song button and previous song button, gives each song a number
const changeSong = () => {
    if(songPlaying == 0) {
        audio.src = "audio/queencard.mp3";
        songTitle.innerHTML = "Queencard - G Idle";
    }

    if(songPlaying == 1) {
        audio.src = "audio/supershy.mp3";
        songTitle.innerHTML = "Super Shy - New Jeans";
    }

    if(songPlaying == 2) {
        audio.src = "audio/fearless.mp3";
        songTitle.innerHTML = "Fearless - Le Sserafim";
    }
}

// in this case, 0 is song 1, 1 is song 2 and 2 is song 3
// 0 is classed as the first number
// uses if statement to say that if the song is on the 3rd one, when next button is pressed it will go back to the 1st song
nextSongButton.onclick = (event) => {
    songPlaying++;
    if(songPlaying > 2) {
        songPlaying = 0;
    }

    changeSong();
}

previousSongButton.onclick  = (event) => {
    songPlaying--;
    if(songPlaying < 0) {
        songPlaying = 2;
    }

    changeSong();
}

volumeSlider.addEventListener('input', (event) => {
    const value = event.target.value;
  
    outputContainer.textContent = value;
    audio.volume = value / 100;
  });

// audio.onplay is an event that is triggered every time the audio starts to play
audio.onplay = (event) => {
    // change the button image
    playPauseButton.src = "images/pause.svg";
}

// audio.onpause is an event that is triggered every time the audio starts to pause
audio.onpause = (event) => {
    playPauseButton.src = "images/play.svg";
}

// On seekBar input (i.e. when user clicks on the seek bar knob), set seeking to true
seekBar.oninput = (event) => {
    seeking = true;
  };
  
  // On seekBar change (i.e., when the user releases the knob to set a new point in the track), update audio player and set seeking to false
  seekBar.onchange = (event) => {
    
    // Update the audio current time to match the seekBar value that the user has set
    audio.currentTime = seekBar.value;
    
    // If the audio is not currently playing, play it
    if (!audio.paused) {
      audio.play();
    }
  
    // Set seeking to false
    seeking = false;
  };

/**
 * This formatTime function will format time from seconds to a human readable time.
 * This funciton has been given to you and you don't need to understand how it works.
 * @param {number} secs 
 * @returns {string} a string with hours:minutes:seconds OR minutes:seconds if we're at the hour 00. 
 */
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}