

function setup() {


  dTime = 0
  timer = 0
  deltaTimer = 0
  speed = 2;
  appleCollected = 1
  side = 20
  margin = 1
  sideMargin = 4
  menuMargin = 40
  width = 400 + sideMargin * 2;
  height = 400 + sideMargin * 2 + menuMargin;
  variable = [];

  x = 114;
  y = 134;
  direction = null
  coor = []
  gameStarted = false

  apples = []
  
  for (var i = 0; i < 1; i++) {
    apples[i] = new Apple(rand(0), rand(1));
  }


  createCanvas(width, height);
  background(0);
  rectMode(CENTER)
  dead = false
}

function draw() {
  
  clear();
  background(0);
  
  if (!dead) {
    menu();
    move();

    for (a of apples) {
      a.appleCheck()
    }

    snake = new Snake(x, y, appleCollected, side);
    snake.cor();
    snake.addSnake();

    
    canMove();
    if (dead) {
      gameOver();
  
    }
  }   
  
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    variable.push(1);
  }
  if (keyCode === RIGHT_ARROW) {
      variable.push(2);
  }
  if (keyCode === UP_ARROW) {
      variable.push(3);
  }
  if (keyCode === DOWN_ARROW) {
      variable.push(4);
  }
  if (dead && keyCode === 32) {
    setup()
    draw()
    loop()
  }
  if (direction !== null) {
    gameStarted = true
  }
}


function move() {
  if (direction === 1) {
    if (x === side / 2 + sideMargin) {
      dead = true;
    }
    if (x > side / 2 + sideMargin) { 
      x -= speed;
    }
  }
  if (direction === 2) {
    if (x === width - side / 2 - sideMargin) {
      dead = true;
    }
    if (x < width - side / 2 - sideMargin) { 
      x += speed;
    }
  }
  if (direction === 3) {
    if (y === menuMargin +side / 2 + sideMargin) {
      dead = true;
    }
    if (y >  menuMargin + side / 2 + sideMargin) {
      y -= speed;
    }
  }
  if (direction === 4) {
    if (y === height - side / 2 - sideMargin) {
      dead = true;
    }
    if (y < height - side / 2 - sideMargin) {
      y += speed;
    }
  }
}

function rand(z) {
  xx = round(random(1, (width - sideMargin / 2) / side)) * side + sideMargin - side / 2;
  yy = round(random(1, (width - sideMargin / 2) / side)) * side + menuMargin + sideMargin - side / 2;

  // for (let i = 0; i < 3; i++) {
  //   for (a of apples) {
  //     if ((a.randx === xx && a.randy === yy) || (xx === x && yy === y)) {
  //       xx = round(random(1, (width - sideMargin / 2) / side)) * side + sideMargin - side / 2;
  //       yy = round(random(1, (height - menuMargin - sideMargin / 2) / side)) * side + menuMargin + sideMargin - side / 2;
  //     }
  //   }



  if (z === 0) {
    return xx;
  }
  if (z === 1) {
    return yy;
  }
}


class Apple {
  constructor(randX, randY) {
    this.randx = randX
    this.randy = randY
  }



  appleCheck() {
    if (x - margin < this.randx && x + margin > this.randx && y - margin < this.randy && y + margin > this.randy) {
      appleCollected += 1
      this.randx = round(random(1, (width - sideMargin / 2) / side)) * side + sideMargin - side / 2;     
      this.randy = round(random(1, (height - menuMargin - sideMargin / 2) / side)) * side + sideMargin + menuMargin - side / 2;
      }

    // for (let i = 0; i < apples; i++) {
    //   for (a of apples) {
    //     if ((a.randx === xx && a.randy === yy) || (xx === x && yy === y)) {
    //       xx = round(random(1, (width - sideMargin / 2) / side)) * side + sideMargin - side / 2;
    //       yy = round(random(1, (height - menuMargin - sideMargin / 2) / side)) * side + menuMargin + sideMargin - side / 2;
    //     }
    //   }
    // }

    fill('red');
    circle(this.randx, this.randy, side/2);
    }
  }

function canMove() {
  
  if ((x - sideMargin + side / 2) % side === 0 && (y - sideMargin + side / 2) % side === 0) {
    if (variable.length !== 0) {
      direction = variable[0];
    }
    variable = [];
    return true
  } else {
    return false
  }
}

class Snake {
  constructor(snakeX,snakeY,apples,side) {
    this.snakeX = snakeX;
    this.snakeY = snakeY;
    this.apples = apples;
    this.side = side;
    
  }

  cor() {

    let coordinate = [this.snakeX,this.snakeY]


    for (let i in coor) {

      if (coor[i][0] == coordinate[0] && coor[i][1] == coordinate[1] && gameStarted === true) {
        dead = true
      }
      
    }

    coor.push(coordinate);
    if (coor.length > this.apples + 1) {
      coor.splice(0,1)
    }
  }



  addSnake() {
    
    for (let i = 0; i < this.apples; i++) {
      fill(random(0,256),random(0,256),random(0,256))
      // console.log(coor, i, coor[i], this.apples)
      
      if (coor[i][0] == undefined || coor[i][1] == undefined) {
        square(x, y, this.side);
      } else {
        square(coor[i][0], coor[i][1], this.side);
      }
    } 
  }
}

function menu() {
  dTime = deltaTime/1000

  if (dTime < 1 && direction !== null) {
    deltaTimer += dTime;

    timer = deltaTimer.toString().split('.')[0]
  }

  fill('grey')
  rect(width/2, 20, width, menuMargin)
  fill('white')
  text(`Apples = ${appleCollected-1}`,width/2-25 ,15)
  text(`Time Alive = ${timer}`, width/2-35,35)
}

function gameOver() {
  dead = true

  noLoop()
  clear()
  background(0)
  fill('pink')
  text('You hit something!',width/2-55,height/2-20)
  text(`You ate ${appleCollected-1} apples.`,width/2-50, height/2)
  text(`You stayed alive for ${timer} seconds.`,width/2-80, height/2 + 20)
}

