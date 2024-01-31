const modal = document.getElementById("gameOverModal");
const guessInput = document.getElementById("guessInput");
const scoreBoard = document.getElementById("score");
const movieImage = document.getElementById("movieImage");
const modalContent = document.querySelector(".modal-content");

const movies = [
  {
    name: "Interstellar",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/07916d0a-fd67-43d2-a99f-8dcf71d4ca15"
  },
  {
    name: "Avatar",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/af70749e-d002-43bc-818e-f72f8c20dd63"
  },
  {
    name: "Titanic",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/abb85de4-f016-4912-abe5-8d0a6ec951d5"
  },
  {
    name: "The Matrix",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/13527860-094e-494d-b366-cae122cb9856"
  },
  {
    name: "Joker",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/04b9139a-57c5-4a50-a2b2-d66c6f27c0ba"
  },
  {
    name: "The Godfather",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/015215b8-1a0b-4aa5-80c4-6a603d19f599"
  },
  {
    name: "Forrest Gump",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5c79bac1-a2ff-4b46-8e1d-5e73b34994b1"
  },
  {
    name: "Ice Age",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/2d961d9c-0c9d-46f6-a2ef-7ef04cb387b0"
  },
  {
    name: "Gone Girl",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/f542ecd2-70eb-49a9-8c81-b1d6ccc6b1fa"
  },
  {
    name: "The Truman Show",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/6e2ee9cd-a95d-4b93-8be1-f87022cfe207"
  },
  {
    name: "La La Land",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/77e07cf8-bc00-4f0c-83c8-b35848a07516"
  },
  {
    name: "Oppenheimer",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/1d265010-4da3-4e0a-96bb-d7b703f8189f"
  },
  {
    name: "Toy Story",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/a985ab14-1e40-4ede-8138-9894f38428e9"
  },
  {
    name: "Whiplash",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/13924a52-c41b-4156-84e5-9cc145e84b1c"
  },
  {
    name: "A Beautiful Mind",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/438df8df-05cf-4ddf-a77f-1d75b0257959"
  },
  {
    name: "Black Swan",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/0382d213-f62f-44b9-ac58-90f1e498b85a"
  },
  {
    name: "The Intouchables",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/6bf93068-9775-43e5-83aa-4f62adcdbf3e"
  },
  {
    name: "Inception",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/18ebca87-f107-4139-b451-84e8aa6de3cb"
  },
  {
    name: "The Shawshank Redemption",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/61300255-9235-4994-8907-34d789562f74"
  },
  {
    name: "Edward Scissorhands",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/28d04861-c9b9-4e42-92ee-ee663873335c"
  },
  {
    name: "Ratatouille",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/ed15ec67-abc2-450b-8839-07ef0f133d54"
  },
  {
    name: "The Father",
    image:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/404e7eef-85d7-4821-a23e-b7b5c2d60352"
  }
];

let score;
let currentMovieIndex;
let warningShown = false;

function preloadImages() {
  movies.forEach((movie) => {
    const img = new Image();
    img.src = movie.image;
  });
}

function startGame() {
  score = 0;
  updateScore();
  currentMovieIndex = 0;
  getNextMovie();
}

//! Function to get a random movie
function getNextMovie() {
  const currentMovie = movies[currentMovieIndex];
  movieImage.src = currentMovie.image;
}

//! Function to check the user's guess
function checkGuess() {
  const userGuess = guessInput.value.trim().toLowerCase();
  const currentMovie = movies[currentMovieIndex];

  if (userGuess === currentMovie.name.toLowerCase()) {
    movieImage.style.boxShadow = "-1px 1px 25px 14px #52ffa880";
    movieImage.style.outline = "3px solid #52ffa9";

    setTimeout(() => {
      score++;
      updateScore();
      currentMovieIndex++;
      guessInput.value = "";
      resetStyles();
      scoreBoard.classList.add("animation");

      if (score < movies.length) {
        getNextMovie();
      } else {
        showWinGameModal();
      }
    }, 800);
  } else if (userGuess === "") {
    if (!warningShown) {
      showWarningMessage();
      warningShown = true;
    }
  } else {
    movieImage.style.boxShadow = "-1px 1px 25px 16px #a20927";
    movieImage.style.outline = "3px solid #a20927";
    scoreBoard.classList.remove("animation");

    if (!warningShown) {
      currentMovieIndex++;
    }
    showGameOverModal();
  }
}

//! Function to update the score display
function updateScore() {
  scoreBoard.textContent = `Score: ${score}`;
}

//! Function to show the warning message
function showWarningMessage() {
  modalContent.innerHTML = `
    <p class="message">Please enter a movie name! 👀</p>
    <button class="btn" onclick="closeModal()">Close</button>
  `;

  modal.style.display = "flex";
  document.addEventListener("keyup", closeModalOnEnter);
}

//! Function to show the game over modal
function showGameOverModal() {
  modalContent.innerHTML = `
    <p class="message">Game Over! 😔</p>
    <p>Total Score: ${score}</p>
    <button class="btn" onclick="closeModal()">Close</button>
  `;

  modal.style.display = "flex";
  document.addEventListener("keyup", closeModalOnEnter);
}

//! Function to show the modal when the user win the game
function showWinGameModal() {
  modalContent.innerHTML = `
    <p class="message">You won the game! 🎉</p>
    <p>Total Score: ${score}</p>
    <button class="btn" onclick="closeModal()">Close</button>
  `;

  modal.style.display = "flex";
  scoreBoard.classList.remove("animation");
  document.addEventListener("keyup", closeModalOnEnter);
}

//! Function to close the modal on Enter key press
function closeModalOnEnter(e) {
  if (e.key === "Enter" && modal.style.display === "flex") {
    modal.style.display = "none";
    modalContent.innerHTML = "";
    guessInput.value = "";
    resetStyles();
    document.removeEventListener("keyup", closeModalOnEnter);

    if (!warningShown) {
      startGame();
    } else {
      warningShown = false;
    }
  }
}

//! Function to close the modal by clicking "OK" button
function closeModal() {
  modal.style.display = "none";
  modalContent.innerHTML = "";
  guessInput.value = "";
  resetStyles();
  document.removeEventListener("keyup", closeModalOnEnter);

  if (!warningShown) {
    startGame();
  } else {
    warningShown = false;
  }
}

//! Event listener for the Enter key to automatically check the guess
document.addEventListener("keyup", function (e) {
  if (e.key === "Enter" && modal.style.display !== "flex") {
    checkGuess();
  }
});

//! Function to focus on input
function focusOnInput() {
  guessInput.focus();
}

//! Function to reset the styles
function resetStyles() {
  movieImage.style.boxShadow = "";
  movieImage.style.outline = "";
}

//! Get the cursor position in the input
guessInput.addEventListener("keyup", (e) => {
  console.log("Caret at: ", e.target.selectionStart);
});

//! Start the game when the page loads
window.onload = startGame;

particlesJS("particles-js", {
  particles: {
    number: {
      value: 140,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#673fd7", "#f0f8ff", "#861246"]
    },
    shape: {
      type: ["star", "circle"]
    },
    size: {
      value: 6,
      random: true,
      anim: {
        enable: true,
        speed: 3,
        size_min: 2,
        sync: false
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 0.4,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "bounce",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  retina_detect: true
});
