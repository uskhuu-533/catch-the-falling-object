const gameCont = document.createElement("div");
document.getElementById("container").appendChild(gameCont);
gameCont.classList.add("gameCont");
gameCont.id = "gameCont"

//Fruits

const fruitContainer = document.createElement("div");
fruitContainer.classList.add("fruitCont");
gameCont.appendChild(fruitContainer);

let apple = [],
  strawberry = [],
  cherry = [],
  banana = [],
  arr = [];

const poo = document.createElement("div");
fruitContainer.appendChild(poo);
poo.classList.add("pooImage");

//Basket
const basket = document.createElement("div");
basket.innerHTML = `<img src="basket.png" alt="Basket">`;
gameCont.appendChild(basket);
basket.classList.add("basket");

//Start button
const start = document.createElement("button");
document.getElementById("gameCont").appendChild(start);
start.classList.add("startButton");
start.innerHTML = "Start";
start.addEventListener("click", gameStart);

//Score & Live
let score = 0;
let lives = 3;
let highestScore = 0;
const sideBar = document.createElement("div")
sideBar.id = "sideBar"
sideBar.classList.add("sideBar")
document.getElementById("container").appendChild(sideBar);
const pointer = document.createElement("div");
const livesCont = document.createElement("div");
livesCont.classList.add("liveCont");
livesCont.id = "liveCont";
const liveIcon1 = document.createElement("div");
const liveIcon2 = document.createElement("div");
const liveIcon3 = document.createElement("div");
liveIcon1.classList.add("liveIcon");
liveIcon2.classList.add("liveIcon");
liveIcon3.classList.add("liveIcon");
pointer.classList.add("pointer");
pointer.id = "pointer";
sideBar.appendChild(pointer);
sideBar.appendChild(livesCont);
livesCont.appendChild(liveIcon1);
livesCont.appendChild(liveIcon2);
livesCont.appendChild(liveIcon3);
pointer.innerHTML = "score:" + score;

let firstInt = null;
let secondInt = null;

// difficulty selector
const difficultySelector = document.createElement("div");
difficultySelector.classList.add("difficultySelector");
gameCont.appendChild(difficultySelector);

difficultySelector.innerHTML = `
  <h3>Select Difficulty:</h3>
  <select id="difficultyLevel">
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
    <option value="diehard">Diehard</option>
  </select>
`;

// // default falling speed
let timeInt = 2000;

// adjust speed based on difficulty
function adjustDifficulty() {
  const difficulty = document.getElementById("difficultyLevel").value;
  switch (difficulty) {
    case "easy":
      timeInt = 2000;
      break;
    case "medium":
      
      timeInt = 1500;
      break;
    case "hard":
      timeInt = 1000;
      break;
    case "diehard":
      timeInt = 500;
      break;
  }
}

document.getElementById("difficultyLevel").addEventListener("change", adjustDifficulty);
// game over flag key for stopping all logic when game is over 
let isGameOver = false
// background music
const backgroundMusic = document.createElement("audio")
backgroundMusic.src = "audio.mp3"
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
//Start
function gameStart() {
  // play background music
  backgroundMusic.play();

  // basket placement
  basket.style.top = "930px";
  // remove start button
  start.style.display = "none";
  //remove difficulty Selector
  difficultySelector.style.display = "none"

  //All fruits that will be used in game
  let apple_c = 0, cherry_c = 0, strawberry_c = 0, banana_c = 0;
  for (let i = 0; i <= 400; i++) {
    let ri = Math.floor(Math.random() * 4);
    switch (ri) {
      case 0:
        apple[apple_c] = document.createElement("div");
        fruitContainer.appendChild(apple[apple_c]);
        apple[apple_c].classList.add("fruit");
        apple[apple_c].classList.add("apple");
        apple_c++; break;
      case 1:
        strawberry[strawberry_c] = document.createElement("div");
        fruitContainer.appendChild(strawberry[strawberry_c]);
        strawberry[strawberry_c].classList.add("fruit");
        strawberry[strawberry_c].classList.add("strawberry");
        strawberry_c++; break;
      case 2:
        banana[banana_c] = document.createElement("div");
        fruitContainer.appendChild(banana[banana_c]);
        banana[banana_c].classList.add("fruit");
        banana[banana_c].classList.add("banana");
        banana_c++; break;
      case 3:
        cherry[cherry_c] = document.createElement("div");
        fruitContainer.appendChild(cherry[cherry_c]);
        cherry[cherry_c].classList.add("fruit");
        cherry[cherry_c].classList.add("cherry");
        cherry_c++; break;
    }
  }

  const fruits = document.getElementsByClassName("fruit");


  //First interval: animates fruit fall
  let i = 0,
    j = 0,
    // timeInt = 1500;
    firstInt = setInterval(firstFunction, timeInt);



  function firstFunction() {
    // if game is over stop this function
    if (isGameOver) {
      return
    }
    // munkh delger's logic
    let ran = Math.floor(Math.random() * 940);
    fruits[i].style.left = ran + "px";
    fruits[i].style.top = "-100px";
    fruits[i].classList.add("animate");
    i++;
    arr.push(ran);
    console.log("First function " + timeInt);
  }

  //Second interval: At the end of fall checks coordinates, grants score
  setTimeout(() => {
    secondInt = setInterval(secondFunction, timeInt);
  }, 2900);

  function secondFunction() {
    // if game is over stop this function 
    if (isGameOver) {
      return
    }
    console.log(arr[j]);
    score_check(arr[j]);
    j++;
    console.log("Second function " + timeInt);
  }

  // Score audio

  const scoreAudio = document.createElement("audio");
  scoreAudio.src = "score.mp3";
  scoreAudio.volume = 0.3;

  // basket animation function when score

  function shakeBasket() {
    basket.classList.add("shake");

    setTimeout(() => {
      basket.classList.remove("shake");
    }, 500);
  }

  let lvl = 0;
  function score_check(ran) {
    console.log(position);
    let leftEdge = position.left - 30;
    let rightEdge = leftEdge + 75;
    if (leftEdge <= ran && rightEdge >= ran) {
      score += 1;
      document.getElementById("pointer").innerHTML = "score:" + score;
      // score sound
      scoreAudio.pause();
      scoreAudio.currentTime = 0
      scoreAudio.play();
      // basket shake animation
      shakeBasket();
    } else {
      lives = live_u(lives);
    }
  }

  // losing live sound

  const loseLifeSound = document.createElement("audio");
  loseLifeSound.src = "Losing_live.wav";
  loseLifeSound.volume = 0.5;

  // lives logic

  function live_u(lives) {
    lives -= 1;
    console.log(lives);
    if (lives == 2) {
      document.getElementById("liveCont").removeChild(liveIcon2);
    } else if (lives == 1) {
      document.getElementById("liveCont").removeChild(liveIcon3);
    } else if (lives == 0) {
      document.getElementById("liveCont").removeChild(liveIcon1);
      gameOver();
    }

    loseLifeSound.pause()
    loseLifeSound.currentTime = 0
    loseLifeSound.play();

    return lives;
  }

  //move Basket with Arrow
  let modifier = 80;

  let position = { left: 450 };

  basket.style.left = position.left + "px";

  const containerWidth = gameCont.offsetWidth;

  function moveBasket(event) {
    const basketWidth = basket.offsetWidth;
    switch (event.key) {
      case "ArrowLeft":
        position.left = Math.max(0, position.left - modifier);
        break;
      case "ArrowRight":
        position.left = Math.min(
          containerWidth - basketWidth,
          position.left + modifier
        );
        break;
    }
    basket.style.left = position.left + "px";
  }

  document.addEventListener("keydown", moveBasket);

  // move Basket with Mouse

  function moveBasketWithMouse(event) {
    const basketWidth = basket.offsetWidth;

    const mouseX = event.clientX - gameCont.offsetLeft;
    position.left = Math.min(
      Math.max(0, mouseX - basketWidth / 2),
      containerWidth - basketWidth
    );

    basket.style.left = position.left + "px";
  }

  gameCont.addEventListener("mousemove", moveBasketWithMouse);
}

// game over sound

const gameOverSound = new Audio("game_over.mp3");
gameOverSound.volume = 1;

// game over and restart

function gameOver() {
  // remove intervals

  // clearInterval(firstInt);
  // clearInterval(secondInt);

  // togloom duussaniig tumend tugee !!
  isGameOver = true

  // stop animation of all fking fruit
  // const fruits = document.getElementsByClassName("fruit");
  // for (let i of fruits) {
  //   // console.log(i)
  //   console.log(i.classList)
  //   i.classList.remove("animate"); 
  //   i.style.top = "-100px"
  // }

  // remove basket 
  gameCont.removeChild(basket)
  /////


  // firstInt = null
  // secondInt = null

  // play game over sound
  gameOverSound.play();


  // game over text

  const gameOverMessage = document.createElement("div");
  gameOverMessage.className = "gameOverMessage";
  gameOverMessage.innerHTML = `
  <h1>Game Over</h1>
  <p>Your score: ${score}</p>
  `;
  gameCont.appendChild(gameOverMessage);
  // stop background music 
  backgroundMusic.pause()


  // restart the game

  gameOverMessage.addEventListener("click", () => {
    window.location.reload();
  });
}
