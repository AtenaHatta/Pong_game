const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;


//paddle1's position---------------------------------------------------
let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0
};

//paddle2's position---------------------------------------------------
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,  //paddle2 should be opposite to paddle1
  y: gameHeight - 100  //paddle2 should be opposite to paddle1
};


//---------------------------------------------------------------------

window.addEventListener("keydown", changeDirection); //pressed keybutton→Direction is changed
resetBtn.addEventListener("click", resetGame);//click→Game reset

gameStart();

function gameStart(){
  createBall();
  nextTick();
};

function nextTick(){
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
 }, 10)
};


// inside of gameBoard's "background"---------------------------------------------------
function clearBoard(){
   ctx.fillStyle = boardBackground; //background color "forestgreen"
   ctx.fillRect(0,0, gameWidth,gameHeight); //background color "width and height"
};


// paddle1 and paddle2------------------------------------------------------------------
function drawPaddles(){
  ctx.strokeStyle = paddleBorder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height); // rectangle's inside of color position
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height); //rectangle's outside of color position

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height); // rectangle's inside of color position
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);//rectangle's outside of color position
};


//ball----------------------------------------------------------------------------------
function createBall(){
  ballSpeed = 1;

  //boll"X"============================================================
    //if random number is "1", the ball move to the "right" side
    if(Math.round(Math.random()) == 1){
      ballXDirection = 1;
    //if random number is NOT "1", the ball move to the "left" side
    }else{
      ballXDirection = -1;
    }

  //boll"Y"============================================================
    //if random number is "1", the ball move to the "right" side
    if(Math.round(Math.random()) == 1){
      ballYDirection = Math.random() * 1; //more random directions
    //if random number is NOT "1", the ball move to the "left" side
    }else{
      ballYDirection =  Math.random() * -1; //more random directions;
    }

  //boll"XY" position====================================================
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
};


//animation of the ball-------------------------------------------------------------------
function moveBall(){
  ballX += (ballSpeed * ballXDirection); 
  ballY += (ballSpeed * ballYDirection); 
};


//ball------------------------------------------------------------------------------------
function drawBall(ballX, ballY){
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI)
  ctx.stroke();
  ctx.fill();
};


//the ball bounces-----------------------------------------------------------------------
function checkCollision(){
  //when the ball goes up, the ball bounces
  if(ballY <= 0 + ballRadius){
     ballYDirection *= -1;
  }
  //when the ball goes down, the ball bounces
  if(ballY >= gameHeight - ballRadius){
    ballYDirection *= -1;
  }
  //when the ball goes away to "left side", new ball shows up
  if(ballX <= 0){
    player2Score += 1;
    updateScore();
    createBall();
    return;
  }
  //when the ball goes away to "right side", new ball shows up
  if(ballX >= gameWidth){
    player1Score += 1;
    updateScore();
    createBall();
    return;
  }
  //when the ball attcks to paddle, the ball bounces
  if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
    if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
      ballX = (paddle1.x + paddle1.width) + ballRadius; // if the ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
  //when the ball attcks to paddle, the ball bounces
  if(ballX >= (paddle2.x - ballRadius)){
    if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
      ballX = paddle2.x - ballRadius; // if the ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
};


//animation-----------------------------------------------------------------------
function changeDirection(event){
  const keyPressed = event.keyCode;
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch(keyPressed){
    //paddle1 ======================================
    //press "w" paddle1 goes up↑
    case(paddle1Up): 
      //paddle1 can't go up more than height
      if(paddle1.y > 0){ 
         paddle1.y -= paddleSpeed;
        }
        break;

    //press "s" paddle1 goes down↓
    case(paddle1Down): 
      //paddle1 can't go down more than height
      if(paddle1.y < gameHeight - paddle1.height){
         paddle1.y += paddleSpeed;
        }
        break;

    //paddle2 ======================================
    //press "↑" paddle2 goes up↑
    case(paddle2Up): 
     //paddle2 can't go up more than height
      if(paddle2.y > 0){ 
         paddle2.y -= paddleSpeed;
        }
        break;

    //press "↓" paddle2 goes down↓
    case(paddle2Down): 
      //paddle2 can't go down more than height
      if(paddle2.y < gameHeight - paddle2.height){
         paddle2.y += paddleSpeed;
      }
      break;
    }
  };


//count score ---------------------------------------------------------------------
function updateScore(){
  scoreText.textContent = `${player1Score} : ${player2Score}`;
};


//Reset----------------------------------------------------------------------------
function resetGame(){
  player1Score = 0;
  player2Score = 0;
  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
  };

  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100  
  };

  ballSpeed = 1;
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
  gameStart();
};
