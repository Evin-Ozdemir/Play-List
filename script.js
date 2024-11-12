/* In order to make interventions on the elements in HTML, we must first access them in JavaScript.  */
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");

// index order
let index;
// Loop
let loop = true;

// When the screen is first turned on
window.onload = () => {
  index = 0;
  setSong(index);
  puaseAudio();
  initializePlayList();
};

// Song List
const songsList = [
  {
    name: "Li Rübare Dergule",
    link: "assets/mem_ararat.mp3",
    artist: "Mem Ararat",
    image: "assets/mem-ararat.jpeg",
  },
  {
    name: "Ax Eman",
    link: "assets/rewsan_celiker.mp3",
    artist: "Rewsan Celiker",
    image: "assets/rewsan-celiker.jpeg",
  },
  {
    name: "Tu li ku yi ",
    link: "assets/xece_herdem.mp3",
    artist: "Xece Herdem",
    image: "assets/xece-herdem.jpeg",
  },
  {
    name: "Ari Jan",
    link: "assets/ari_jan.mp3",
    artist: "Ari Jan & Nirmeen",
    image: "assets/ari-jan.jpg",
  },
  {
    name: "Şiire Gazele",
    link: "assets/ahmet_kaya.mp3",
    artist: "Ahmet Kaya",
    image: "assets/ahmet-kaya.jpg",
  },
];

// Song Submission Process
const setSong = (arrayIndex) => {
  console.log(arrayIndex);
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadedmetadata = () => {
    // Time Settings
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playAudio();
  playListContainer.classList.add("hide");
};

// How to Play the Song
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

// How to Stop a Song
const puaseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

// Switch to Previous Song Operation
const previousSong = () => {
  puaseAudio();
  if (index > 0) {
    index -= 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
  playAudio();
};

// Skip to Next Song Operation
const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
  playAudio();
};

// Operation When the Song Reaches the End
audio.onended = () => {
  nextSong();
};

// Action when click on mixer
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
  } else {
    shuffleButton.classList.add("active");
    loop = false;
  }
});

// Operation when the Button is clicked again
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    loop = false;
  } else {
    repeatButton.classList.add("active");
    loop = true;
  }
});

// Time format creation process
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

// Total Seconds Processing in Instant Song
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

// Progress Area Calculation Process
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;
  console.log(coordStart);

  let coordEnd = event.clientX;
  console.log(coordEnd);

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
  currentProgress.style.width = progress * 100 + "%";
  audio.currentTime = progress * audio.duration;
  playAudio();
});

// Automatic Time Counter Operation
setInterval(() => {
  console.log(audio.duration.toFixed(3));
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

// Create List Process
const initializePlayList = () => {
  for (let i in songsList) {
    playListSongs.innerHTML += `
      <li class="playlistSong" onclick="setSong(${i})"> 
        <div class="playlist-image-container">
          <img src="${songsList[i].image}" />
        </div>
        <div class="playlist-song-details">
          <span id="playlist-song-name">${songsList[i].name}</span>
          <span id="playlist-song-artist-album">${songsList[i].artist}</span>
        </div>
      </li>`;
  }
};

// Action When Clicking to Close the List
closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

// Action When Clicking to Open List
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

// Action When Clicking the Play Button
playButton.addEventListener("click", playAudio);

// Operation When Clicking the Stop Button
pauseButton.addEventListener("click", puaseAudio);

// Operation When Clicking Skip to Next Song Button
nextButton.addEventListener("click", nextSong);

// Action When Clicking the Back Button
prevButton.addEventListener("click", previousSong);
