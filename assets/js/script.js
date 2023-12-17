/*
The general script for the all the pages.
Used init bootstrap tooltips, popovers and modals throughout the site.
*/

/*
FIXME: Change to bootstrap modal
const rulesButton = document.getElementById("rulesButton");
const rulesModal = document.getElementById("rulesModal");

rulesButton.addEventListener("click", openModal);

function openModal() {
  rulesModal.style.display = "block";
}
function closeModal() {
  rulesModal.style.display = "none";
}

window.addEventListener("click", (event) => {
  if (event.target === rulesModal) {
    closeModal();
  }
});
*/

import {
  setDifficulty,
  getAvailableTopics,
  setCurrentTopicByName,
} from "./game-storage.js";
import { displayAvailableTopics } from "./game-display.js";

document.addEventListener("DOMContentLoaded", function () {
  // Sound
  const music = document.getElementById("background-music");
  const soundWrapper = document.getElementById("sound-wrapper");

  if (localStorage.getItem("sound") !== null) {
    // If the sound is set to off, pause the music
    let soundStatus = localStorage.getItem("sound");
    if (soundStatus === "off") {
      music.pause();
      soundWrapper.innerHTML = `<i class="fas fa-l fa-volume-up" style="color: #17bf07;"></i>`;
    } else {
      music.play();
      soundWrapper.innerHTML = `<i class="fas fa-l fa-volume-mute" style="color: #17bf07;"></i>`;
    }
  } else {
    // If the sound is not set, set it to off
    localStorage.setItem("sound", "off");
    music.pause();
    soundWrapper.innerHTML = `<i class="fas fa-l fa-volume-up" style="color: #17bf07;"></i>`;
  }

  soundWrapper.addEventListener("click", function () {
    // Toggle between play and pause when the sound icon is clicked
    if (music.paused) {
      soundWrapper.innerHTML = `<i class="fas fa-l fa-volume-mute" style="color: #17bf07;"></i>`;
      music.play();
      // Set the sound to on in local storage
      localStorage.setItem("sound", "on");
    } else {
      soundWrapper.innerHTML = `<i class="fas fa-l fa-volume-up" style="color: #17bf07;"></i>`;
      music.pause();
      // Set the sound to off in local storage
      localStorage.setItem("sound", "off");
    }
  });
  // ./Sound

  // Get the difficulty buttons
  const difficultyButtons = document.querySelectorAll(".difficulty-btn");

  // Set the difficulty level in local storage when a button is clicked
  difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Clear local storage before starting a new game
      localStorage.clear();
      const difficulty = button.dataset.difficulty;
      setDifficulty(difficulty);
    });
  });

  displayAvailableTopics(getAvailableTopics());

  // Get the topic buttons
  const topicButtons = document.querySelectorAll(".topicBtn");

  // Set the topic in local storage when a button is clicked
  topicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const topicName = button.dataset.topic;
      setCurrentTopicByName(topicName);
      // Redirect to the game page
      window.location.href = "game.html";
    });
  });
});
