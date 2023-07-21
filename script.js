var c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var promotionInProgress = false;

var ctx = c.getContext("2d");

var fullScreenIcon = new Image();
var exitFullScreenIcon = new Image();

fullScreenIcon.src = 'Icons/fullscreen.png';
exitFullScreenIcon.src = 'Icons/exitfullscreen.png';

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // You might want to redraw your canvas content after the resize here.
}
window.addEventListener('resize', resizeCanvas);
function drawHexagon(x, y, sideLength, rotation) {
  ctx.beginPath();

  const vertices = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + rotation;
    const vertexX = x + sideLength * Math.cos(angle);
    const vertexY = y + sideLength * Math.sin(angle);
    vertices.push({ x: vertexX, y: vertexY });
  }

  ctx.moveTo(vertices[0].x, vertices[0].y);

  for (let i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }

  ctx.closePath();

  ctx.fill();
}

function drawFullScreenIcon() {
  var iconSize = 50;  // Adjust this value to change the size of the icon
  var margin = 10;  // Margin from the bottom right corner
  var icon = document.fullscreenElement ? exitFullScreenIcon : fullScreenIcon;
  var rectX = c.width - iconSize - margin;
  var rectY = c.height - iconSize - margin;
  var radius = 5;  // Adjust this value to change the roundness of the corners

  // Draw the background rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';  // Semi-transparent black
  ctx.beginPath();
  ctx.roundRect(rectX + 5, rectY + 5, iconSize - 10, iconSize - 10, radius);
  ctx.fill();

  // Draw the icon
  ctx.beginPath()
  ctx.fillStyle = 'rgba(255,255,255,1)'
  ctx.drawImage(icon, rectX, rectY, iconSize, iconSize);
}

hexpositions = []
bS = 40 //boardSize

function drawBoard() {
  hexpositions = []
  bS = 40
  var adjustment = 0.3 //moves the board up and down, 0.3 keeps it mostly centered
  ctx.fillStyle = '#bbb'
  ctx.rect(0,0,c.width,c.height)
  ctx.fill()
    for(var j = 0; j <= 10; j++) {
    hexpositions.push([])
    var firstcolor = j % 3;
    if(j <= 5) {
      for(var i = 0; i < 6+j; i++) {
        columnX = (c.width/2)-(((bS*1.5)-0.5)*(5-j))
        startingY = (c.height/2)-(bS*(4+adjustment))-(((bS*Math.sqrt(3))/2)*j)
        color = (firstcolor + i) % 3
        if(color == 0) {
          ctx.fillStyle = 'white'
        } else if(color == 1) {
          ctx.fillStyle = 'gray'
        } else {
          ctx.fillStyle = 'black'
        }
        drawHexagon(columnX,startingY+(i*(bS*Math.sqrt(3))),bS,0)
        hexpositions[j].push([columnX,startingY+(i*(bS*Math.sqrt(3)))])
      }
    } else {
      for (var i = 0; i < 16-j; i++) {
        columnX = (c.width / 2) + (((bS*1.5)-0.5)*(j-5))
        startingY = (c.height / 2) - (bS*(12.6666666+adjustment)) + (((bS*Math.sqrt(3))/2) * (6 + (j - 6)));
        if(i == 0) {
          color = (firstcolor + i) % 3
          if(color == 0) {
            ctx.fillStyle = 'gray'
          } else if(color == 1) {
            ctx.fillStyle = 'white'
          } else {
            ctx.fillStyle = 'black'
          }
        } else {
          color = (firstcolor + i + j) % 3
          if(color == 0) {
            ctx.fillStyle = 'gray'
          } else if(color == 1) {
            ctx.fillStyle = 'black'
          } else {
            ctx.fillStyle = 'white'
          }
        }
        drawHexagon(columnX, startingY + (i * (bS*Math.sqrt(3))), bS, 0);
        hexpositions[j].push([columnX,startingY+(i*(bS*Math.sqrt(3)))])
      }
    }
  }
} //draws background color and hexagonal board pieces
drawBoard()

//0 empty
//1 white pawn
//2 black pawn
//3 white bishop
//4 black bishop
//5 white knight
//6 black knight
//7 white rook
//8 black rook
//9 white queen
//10 black queen
//11 white king
//12 black king

boardState = []
function createInitialBoardState() {
  for(var i = 0; i <= 10; i++) {
    boardState.push([])
  }
  boardState[0] = [0,0,0,0,0,0]
  boardState[1] = [2,0,0,0,0,0,1]
  boardState[2] = [8,2,0,0,0,0,1,7]
  boardState[3] = [6,0,2,0,0,0,1,0,5]
  boardState[4] = [10,0,0,2,0,0,1,0,0,9]
  boardState[5] = [4,4,4,0,2,0,1,0,3,3,3]
  boardState[6] = [12,0,0,2,0,0,1,0,0,11]
  boardState[7] = [6,0,2,0,0,0,1,0,5]
  boardState[8] = [8,2,0,0,0,0,1,7]
  boardState[9] = [2,0,0,0,0,0,1]
  boardState[10] = [0,0,0,0,0,0]

  /* Check In One Scenario */
  
  /* boardState[0] = [0,0,0,0,0,0]
  boardState[1] = [0,0,1,0,0,0,2]
  boardState[2] = [0,0,0,1,0,2,0,0]
  boardState[3] = [0,0,0,0,1,0,2,12,0]
  boardState[4] = [11,0,4,0,0,0,0,6,0,0]
  boardState[5] = [0,0,0,0,1,0,0,6,0,0,0]
  boardState[6] = [0,0,10,0,1,2,3,0,0,0]
  boardState[7] = [0,0,0,0,0,0,0,0,0]
  boardState[8] = [0,0,0,0,0,0,0,0]
  boardState[9] = [0,0,0,0,0,2,0]
  boardState[10] = [0,0,0,5,0,0] */
  
}
createInitialBoardState()

pieces = []
function createPieceReferences() {
  var pieceNames = ['WhitePawn', 'BlackPawn', 'WhiteBishop', 'BlackBishop', 'WhiteKnight', 'BlackKnight', 'WhiteRook', 'BlackRook', 'WhiteQueen', 'BlackQueen', 'WhiteKing', 'BlackKing'];

  var loadedImages = 0; // Keep track of the number of loaded images

  for (var i = 0; i < pieceNames.length; i++) {
    var piece = new Image();
    piece.src = 'ChessPiece/' + pieceNames[i] + '.png';

    piece.onload = function() {
      this.aspectRatio = this.width / this.height; // Calculate and store the aspect ratio
      loadedImages++; // Increment the count when an image is loaded

      // If all images are loaded, draw the board state
      if (loadedImages === pieceNames.length) {
        drawBoardState();
      }
    };

    pieces.push(piece);
  }
} //note this also calls the initial drawBoardState()

var hoveredTile = null; // Add this variable to track the hovered tile
function drawBoardState() {
  var pieceSizeRatio = 0.8; // Adjust this value to change the size of the pieces
  ctx.clearRect(0, 0, c.width, c.height); // Clear the canvas before redrawing
  drawBoard();
  for (var i = 0; i <= 10; i++) {
    for (var j = 0; j < boardState[i].length; j++) {
      if (boardState[i][j] != 0) {
        var piece = pieces[boardState[i][j] - 1];
        var sizeRatio = pieceSizeRatio;

        // Check if the mouse is over this tile
        if (hoveredTile && hoveredTile[0] == i && hoveredTile[1] == j) {
          // Check if the piece is the correct color for the current turn
          if ((turn === "white" && boardState[i][j] % 2 === 1) || (turn === "black" && boardState[i][j] % 2 === 0)) {
            sizeRatio = 1; // Adjust this value to change the size of the hovered piece
          }
        }

        var pieceSize = bS * sizeRatio; // Calculate the size of the pieces
        var height = pieceSize / piece.aspectRatio; // Calculate the height based on the aspect ratio
        var centerX = hexpositions[i][j][0] - pieceSize / 2;
        var centerY = hexpositions[i][j][1] - height / 2;
        ctx.drawImage(piece, centerX, centerY, pieceSize, height);
      }
    }
  }
  calculateAndDrawValidMoves()
  drawFullScreenIcon();
}

validmoves = []
function pawnBehaviour(x,y,arr,board) {
  if (turn === "white") {
    // Forward moves
    if(board[x][y-1] == 0) { 
      arr.push([x,y-1]);
      if(board[x][y-2] == 0 && y == 6) {
        arr.push([x,y-2]);
      }
    }
  
    // Diagonal capturing
    let leftMove, rightMove;
    if(x === 0) { // Leftmost column
      rightMove = [x+1, y];
    } else if(x === 10) { // Rightmost column
      leftMove = [x-1, y];
    } else if(x === 5) { // Middle column
      leftMove = [x-1, y-1];
      rightMove = [x+1, y-1];
    } else if(x < 5) { // Left chunk of columns
      leftMove = [x-1, y-1];
      rightMove = [x+1, y]
    } else if(x > 5) { // Right chunk of columns
      leftMove = [x-1, y];
      rightMove = [x+1, y-1];
    }
  
    // Check if the moves are valid and add to validmoves
    if(leftMove && board[leftMove[0]][leftMove[1]] !== 0 && board[leftMove[0]][leftMove[1]] % 2 == 0 && board[leftMove[0]][leftMove[1]] !== 12) {
      arr.push(leftMove);
    }
    if(rightMove && board[rightMove[0]][rightMove[1]] !== 0 && board[rightMove[0]][rightMove[1]] % 2 == 0) {
      arr.push(rightMove);
    }
  } else { // turn === "black"
    if(board[x][y+1] == 0) { 
      arr.push([x,y+1]);
      if(board[x][y+2] == 0 && board[x].length-y == 7) {
        arr.push([x,y+2]);
      }
    }
  
    // Diagonal capturing
    let leftMove, rightMove;
    if(x === 0) { // Leftmost column
      rightMove = [x+1, y+1];
    } else if(x === 10) { // Rightmost column
      leftMove = [x-1, y+1];
    } else if(x === 5) { // Middle column
      leftMove = [x-1, y];
      rightMove = [x+1, y];
    } else if(x < 5) { // Left chunk of columns
      leftMove = [x-1, y];
      rightMove = [x+1, y+1]
    } else if(x > 5) { // Right chunk of columns
      leftMove = [x-1, y+1];
      rightMove = [x+1, y];
    }
  
    // Check if the moves are valid and add to validmoves
    if(leftMove && board[leftMove[0]][leftMove[1]] !== 0 && board[leftMove[0]][leftMove[1]] % 2 == 1 && board[leftMove[0]][leftMove[1]] !== 11) {
      arr.push(leftMove);
    }
    if(rightMove && board[rightMove[0]][rightMove[1]] !== 0 && board[rightMove[0]][rightMove[1]] % 2 == 1) {
      arr.push(rightMove);
    }
  }
}
function knightBehaviour(x,y,arr,board) {
  if(turn == 'white') {
    tmod = 1 //detects black pieces
  } else {
    tmod = 0 //detects white peices
  }
  for(var i = 0; i < 12; i++) {
    if(i == 0) { //up 2 right 1
      if(x < 5 && y > 1) {
        if(board[x+1][y-2] % 2 !== tmod || board[x+1][y-2] == 0) {
          arr.push([x+1,y-2])
        }
      } else if(x < 10 && y > 2) {
        if(board[x+1][y-3] % 2 !== tmod || board[x+1][y-3] == 0) {
          arr.push([x+1,y-3])
        }
      }
    } else if(i == 1) { //up 2 left 1
      if(x > 5 && y > 1) {
        if(board[x-1][y-2] % 2 !== tmod || board[x-1][y-2] == 0) {
          arr.push([x-1,y-2])
        }
      } else if(x > 0 && y > 2) {
        if(board[x-1][y-3] % 2 !== tmod || board[x-1][y-3] == 0) {
          arr.push([x-1,y-3])
        }
      }
    } else if(i == 2) { //northeast 2 up 1
      if(x < 4 && y > 0) {
        if(board[x+2][y-1] % 2 !== tmod || board[x+2][y-1] == 0) {
          arr.push([x+2,y-1])
        }
      } else if(x == 4 && y > 1) {
        if(board[x+2][y-2] % 2 !== tmod || board[x+2][y-2] == 0) {
          arr.push([x+2,y-2])
        }
      } else if(x < 9 && y > 2) {
        if(board[x+2][y-3] % 2 !== tmod || board[x+2][y-3] == 0) {
          arr.push([x+2,y-3])
        }
      }
    } else if(i == 3) { //northwest 2 up 1
      if(x > 6 && y > 0) {
        if(board[x-2][y-1] % 2 !== tmod || board[x-2][y-1] == 0) {
          arr.push([x-2,y-1])
        }
      } else if(x == 6 && y > 1) {
        if(board[x-2][y-2] % 2 !== tmod || board[x-2][y-2] == 0) {
          arr.push([x-2,y-2])
        }
      } else if(x > 1 && y > 2) {
        if(board[x-2][y-3] % 2 !== tmod || board[x-2][y-3] == 0) {
          arr.push([x-2,y-3])
        }
      }
    } else if(i == 4) { //right 2 up 1
      if(x <= 2) {
        if(board[x+3][y+1] % 2 !== tmod || board[x+3][y+1] == 0) {
          arr.push([x+3,y+1])
        }
      } else if(x == 3) {
        if(board[x+3][y] % 2 !== tmod || board[x+3][y] == 0) {
          arr.push([x+3,y])
        }            
      } else if(x == 4 && y > 0) {
        if(board[x+3][y-1] % 2 !== tmod || board[x+3][y-1] == 0) {
          arr.push([x+3,y-1])
        }            
      } else if(x <= 7 && y > 1 && y < board[x].length-1) {
        if(board[x+3][y-2] % 2 !== tmod || board[x+3][y-2] == 0) {
          arr.push([x+3,y-2])
        }            
      }
    } else if(i == 5) { //right 2 down 1
      if(x <= 2) {
        if(board[x+3][y+2] % 2 !== tmod || board[x+3][y+2] == 0) {
          arr.push([x+3,y+2])
        }
      } else if(x == 3) {
        if(board[x+3][y+1] % 2 !== tmod || board[x+3][y+1] == 0) {
          arr.push([x+3,y+1])
        }            
      } else if(x == 4 && y < 9) {
        if(board[x+3][y] % 2 !== tmod || board[x+3][y] == 0) {
          arr.push([x+3,y])
        }            
      } else if(x <= 7 && y < board[x].length-2 && y > 0) {
        if(board[x+3][y-1] % 2 !== tmod || board[x+3][y-1] == 0) {
          arr.push([x+3,y-1])
        }            
      }
    } else if(i == 6) { //left 2 down 1
      if(x >= 8) {
        if(board[x-3][y+2] % 2 !== tmod || board[x-3][y+2] == 0) {
          arr.push([x-3,y+2])
        }
      } else if(x == 7) {
        if(board[x-3][y+1] % 2 !== tmod || board[x-3][y+1] == 0) {
          arr.push([x-3,y+1])
        }            
      } else if(x == 6 && y < 9) {
        if(board[x-3][y] % 2 !== tmod || board[x-3][y] == 0) {
          arr.push([x-3,y])
        }            
      } else if(x >= 3 && y < board[x].length-2 && y > 0) {
        if(board[x-3][y-1] % 2 !== tmod || board[x-3][y-1] == 0) {
          arr.push([x-3,y-1])
        }            
      }
    } else if(i == 7) { //left 2 up 1
      if(x >= 8) {
        if(board[x-3][y+1] % 2 !== tmod || board[x-3][y+1] == 0) {
          arr.push([x-3,y+1])
        }
      } else if(x == 7) {
        if(board[x-3][y] % 2 !== tmod || board[x-3][y ] == 0) {
          arr.push([x-3,y])
        }            
      } else if(x == 6 && y < 9) {
        if(board[x-3][y-1] % 2 !== tmod || board[x-3][y-1] == 0) {
          arr.push([x-3,y-1])
        }            
      } else if(x >= 3 && y < board[x].length-2 && y > 0) {
        if(board[x-3][y-2] % 2 !== tmod || board[x-3][y-2] == 0) {
          arr.push([x-3,y-2])
        }            
      }
    } else if(i == 8) { //southwest 2 down 1
      if(x > 6 && y < board[x].length-1) {
        if(board[x-2][y+3] % 2 !== tmod || board[x-2][y+3] == 0) {
          arr.push([x-2,y+3])
        }
      } else if(x == 6 && y < board[x].length-2) {
        if(board[x-2][y+2] % 2 !== tmod || board[x-2][y+2] == 0) {
          arr.push([x-2,y+2])
        }
      } else if(x > 1 && y < board[x].length-3) {
        if(board[x-2][y+1] % 2 !== tmod || board[x-2][y+1] == 0) {
          arr.push([x-2,y+1])
        }
      }
    } else if(i == 9) { //southeast 2 down 1
      if(x < 4 && y < board[x].length-1) {
        if(board[x+2][y+3] % 2 !== tmod || board[x+2][y+3] == 0) {
          arr.push([x+2,y+3])
        }
      } else if(x == 4 && y < board[x].length-2) {
        if(board[x+2][y+2] % 2 !== tmod || board[x+2][y+2] == 0) {
          arr.push([x+2,y+2])
        }
      } else if(x < 9 && y < board[x].length-3) {
        if(board[x+2][y+1] % 2 !== tmod || board[x+2][y+1] == 0) {
          arr.push([x+2,y+1])
        }
      }
    } else if(i == 10) { //down 2 left 1
      if(x > 5 && y < board[x].length-2) {
        if(board[x-1][y+3] % 2 !== tmod || board[x-1][y+3] == 0) {
          arr.push([x-1,y+3])
        }
      } else if(x > 0 && y < board[x].length-3) {
        if(board[x-1][y+2] % 2 !== tmod || board[x-1][y+2] == 0) {
          arr.push([x-1,y+2])
        }
      }
    } else if(i == 11) { //down 2 right 1
      if(x < 5 && y < board[x].length-2) {
        if(board[x+1][y+3] % 2 !== tmod || board[x+1][y+3] == 0) {
          arr.push([x+1,y+3])
        }
      } else if(x < 10 && y < board[x].length-3) {
        if(board[x+1][y+2] % 2 !== tmod || board[x+1][y+2] == 0) {
          arr.push([x+1,y+2])
        }
      }
    }
    if(arr.length > 0) {
      if(board[arr[arr.length-1][0]][arr[arr.length-1][1]] == 12 ||board[arr[arr.length-1][0]][arr[arr.length-1][1]] == 11) {
        arr.pop()
      }
    }
  }
}
function rookBehaviourAlteredForKing(x,y,arr,board) {
  for(var i = 0; i < 6; i++) {
    if(turn == 'white') {
      tmod = 1
    } else {
      tmod = 0
    }
    if(i == 0) { //straight up
      sx = x
      sy = y
      for(var j = 0; j < 1; j++) {
        if(sy < 0) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sy -= 1
        if(sy < 0) {
          continue
        }
        if(board[sx][sy] % 2 == tmod && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    } else if(i == 1) { //straight down
      sx = x
      sy = y
      for(var j = 0; j < 1; j++) {
        if(sy > board[x].length-1) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sy += 1
        if(sy > board[x].length-1) {
          continue
        }
        if(board[sx][sy] % 2 == tmod && (sx !== x || sy !== y)  && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    } else if(i == 2) { //northeast
      sx = x
      sy = y
      for(var j = 0; j < 1; j++) {
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sx += 1
        if(sx > 5) {
          sy -= 1 
        }
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] % 2 == tmod && (sx !== x || sy !== y) && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    } else if(i == 3) { //northwest
      sx = x
      sy = y
      for(var j = 0; j < 1; j++) {
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sx -= 1
        if(sx < 5) {
          sy -= 1 
        }
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] % 2 == tmod && (sx !== x || sy !== y) && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    } else if(i == 4) { //southwest
      sx = x
      sy = y
      for(var j = 0; j < 1; j++) {
        if(sy > board[x].length-2 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sx -= 1
        if(sx >= 5) {
          sy += 1 
        }
        if(sy > board[x].length-2 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] % 2 == tmod && (sx !== x || sy !== y) && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    } else if(i == 5) { //southeast
      sx = x
      sy = y
      for(var j = 0; j < 1; j++) {
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sx += 1
        if(sx <= 5) {
          sy += 1 
        }
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] % 2 == tmod && (sx !== x || sy !== y) && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    }
  } 
}
function rookBehaviour(x,y,arr,board) {
  for(var i = 0; i < 6; i++) {
    if(turn == 'white') {
      tmod = 1
    } else {
      tmod = 0
    }
    if(i == 0) { //straight up
      sx = x
      sy = y
      for(var j = 0; j < 12; j++) {
        if(sy < 0) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sy -= 1
        if(sy < 0) {
          continue
        }
        if(board[sx][sy] % 2 == tmod && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    } else if(i == 1) { //straight down
      sx = x
      sy = y
      for(var j = 0; j < 12; j++) {
        if(sy > board[x].length-1) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sy += 1
        if(sy > board[x].length-1) {
          continue
        }
        if(board[sx][sy] % 2 == tmod && (sx !== x || sy !== y) && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    } else if(i == 2) { //northeast
      sx = x
      sy = y
      for(var j = 0; j < 12; j++) {
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sx += 1
        if(sx > 5) {
          sy -= 1 
        }
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] % 2 == tmod && (sx !== x || sy !== y) && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    } else if(i == 3) { //northwest
      sx = x
      sy = y
      for(var j = 0; j < 12; j++) {
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sx -= 1
        if(sx < 5) {
          sy -= 1 
        }
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] % 2 == tmod && (sx !== x || sy !== y) && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    } else if(i == 4) { //southwest
      sx = x
      sy = y
      for(var j = 0; j < 12; j++) {
        if(sy > board[x].length-2 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sx -= 1
        if(sx >= 5) {
          sy += 1 
        }
        if(sy > board[x].length-2 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] % 2 == tmod && (sx !== x || sy !== y) && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    } else if(i == 5) { //southeast
      sx = x
      sy = y
      for(var j = 0; j < 12; j++) {
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if(board[sx][sy] !== 0 && (sx !== x || sy !== y)) {
          continue
        }
        sx += 1
        if(sx <= 5) {
          sy += 1 
        }
        if(sy > board[x].length-1 || sy < 0 || sx < 0 || sx > 10) {
          continue
        }
        if((board[sx][sy] % 2 == tmod && (sx !== x || sy !== y)) && board[sx][sy] !== 0) {
          continue
        }
        arr.push([sx,sy])
      }
    }
  } 
}
function bishopBehaviourAlteredForKing(x,y,arr,board) {
  for(i = 0; i < 6; i++) {
    sx = x
    sy = y
    for(j = 0; j < 1; j++) {
      if(sy < 0 || sx < 0 || sx > 10) {
        continue
      }
      if(sy >= board[sx].length) {
        continue;
      }
      if((sx !== x || sy !== y) && board[sx][sy] !== 0) {
        continue;
      }
      if(i == 0) { //going right
        if(sx < 4) {
          sx += 2
          sy += 1
        } else if(sx == 4) {
          sx += 2
        } 
        else if(sx >= 5) {
          sx += 2
          sy -= 1
        }
      } else if(i == 1) { //going left
        if(sx <= 5) {
          sx -= 2
          sy -= 1
        } else if(sx == 6) {
          sx -= 2
        } else {
          sx -= 2
          sy += 1
        }
      } else if(i == 2) { //going northeast
        if(sx <= 4) {
          sx += 1
          sy -= 1
        } else if(sx >= 5) {
          sx += 1
          sy -= 2
        }
      } else if(i == 3) { //going southeast
        if(sx <= 4) {
          sx += 1
          sy += 2
        } else if(sx >= 5) {
          sx += 1
          sy += 1
        }
      } else if(i == 4) { //going northwest
        if(sx <= 5) {
          sx -= 1
          sy -= 2
        } else if(sx >= 6) {
          sx -= 1
          sy -= 1
        }
      } else if(i == 5) { //going southwest
        if(sx <= 5) {
          sx -= 1
          sy += 1
        } else if(sx >= 6) {
          sx -= 1
          sy += 2
        }
      }
      if(sy < 0 || sx < 0 || sx > 10) {
        continue
      }
      if(sy >= board[sx].length) {
        continue;
      }
      if(turn == 'white') {
        if(board[sx][sy] % 2 == 1 || board[sx][sy] == 12) {
          continue
        } 
      } else {
        if((board[sx][sy] % 2 == 0 && board[sx][sy] !== 0) || board[sx][sy] == 11) {
          continue
        }
      }
      arr.push([sx,sy])
    }
  }
}
function bishopBehaviour(x,y,arr,board) {
  for(i = 0; i < 6; i++) {
    sx = x
    sy = y
    for(j = 0; j < 7; j++) {
      if(sy < 0 || sx < 0 || sx > 10) {
        continue
      }
      if(sy >= board[sx].length) {
        continue;
      }
      if((sx !== x || sy !== y) && board[sx][sy] !== 0) {
        continue;
      }
      if(i == 0) { //going right
        if(sx < 4) {
          sx += 2
          sy += 1
        } else if(sx == 4) {
          sx += 2
        } 
        else if(sx >= 5) {
          sx += 2
          sy -= 1
        }
      } else if(i == 1) { //going left
        if(sx <= 5) {
          sx -= 2
          sy -= 1
        } else if(sx == 6) {
          sx -= 2
        } else {
          sx -= 2
          sy += 1
        }
      } else if(i == 2) { //going northeast
        if(sx <= 4) {
          sx += 1
          sy -= 1
        } else if(sx >= 5) {
          sx += 1
          sy -= 2
        }
      } else if(i == 3) { //going southeast
        if(sx <= 4) {
          sx += 1
          sy += 2
        } else if(sx >= 5) {
          sx += 1
          sy += 1
        }
      } else if(i == 4) { //going northwest
        if(sx <= 5) {
          sx -= 1
          sy -= 2
        } else if(sx >= 6) {
          sx -= 1
          sy -= 1
        }
      } else if(i == 5) { //going southwest
        if(sx <= 5) {
          sx -= 1
          sy += 1
        } else if(sx >= 6) {
          sx -= 1
          sy += 2
        }
      }
      if(sy < 0 || sx < 0 || sx > 10) {
        continue
      }
      if(sy >= board[sx].length) {
        continue;
      }
      if(turn == 'white') {
        if(board[sx][sy] % 2 == 1 || board[sx][sy] == 12) {
          continue
        } 
      } else {
        if((board[sx][sy] % 2 == 0 && board[sx][sy] !== 0) || board[sx][sy] == 11) {
          continue
        }
      }
      arr.push([sx,sy])
    }
  }
}

function nullifyTakenKingSpots() {
  // Define the modulus operator based on the turn
  let tmod = (turn === 'white') ? 0 : 1;
  
  // Create an empty array for storing moves to be removed
  let movestoremove = [];
  tempBoardState = []
  for(var i = 0; i < 11; i++) {
    tempBoardState.push([])
    for(var j = 0; j < boardState[i].length; j++) {
      if(turn == 'black') {
        if(boardState[i][j] !== 12) {
          tempBoardState[i].push(boardState[i][j])
        } else {
          tempBoardState[i].push(0)
        }
      } else {
        if(boardState[i][j] !== 11) {
          tempBoardState[i].push(boardState[i][j])
        } else {
          tempBoardState[i].push(0)
        }
      }
    }
  }
  // Iterate over the game board
  for(let i = 0; i < 11; i++) {
    for(let j = 0; j < tempBoardState[i].length; j++) {
      
      // Check if the current cell contains a piece for the current player
      if(tempBoardState[i][j] % 2 === tmod && tempBoardState[i][j] !== 0) {
        
        // Store the type of the piece
        let type = tempBoardState[i][j];
        
        // Create an empty array for storing the new moves to be appended
        let newmovestoappend = [];

        // Call the appropriate behaviour function based on the piece type
        if(type === 1 || type === 2) { //pawn behavior
          pawnBehaviour(i, j, newmovestoappend,tempBoardState);
        }
        if(type === 3 || type === 4) { //bishop behavior
          bishopBehaviour(i, j, newmovestoappend,tempBoardState);
        }
        if(type === 5 || type === 6) { //knight behavior
          knightBehaviour(i, j, newmovestoappend,tempBoardState);
        }
        if(type === 7 || type === 8) { //rook behavior
          rookBehaviour(i, j, newmovestoappend,tempBoardState);
        }
        if(type === 9 || type === 10) { //queen behavior
          queenBehaviour(i, j, newmovestoappend,tempBoardState);
        }
        if(type === 11 || type === 12) { //king behavior
          kingBehaviour(i, j, newmovestoappend,tempBoardState);
        }

        // Concatenate the new moves to the list of moves to be removed
        movestoremove = movestoremove.concat(newmovestoappend);
      }
    }
  }

  // Clean and filter the moves
  cleanValidMoves(movestoremove);
  validmoves = filterValidMoves(movestoremove, validmoves);
}
function detectCheck(board) {
  let tmod = (turn === 'white') ? 0 : 1;
  
  // Create an empty array for storing moves to be removed
  movestocheck = []
  tempBoardState = []
  kingPos = []
  for(var i = 0; i < 11; i++) {
    tempBoardState.push([])
    for(var j = 0; j < board[i].length; j++) {
      if(turn == 'white') {
        if(board[i][j] !== 11) {
          tempBoardState[i].push(board[i][j])
        } else {
          kingPos = [i,j]
          tempBoardState[i].push(0)
        }
      } else {
        if(board[i][j] !== 12) {
          tempBoardState[i].push(board[i][j])
        } else {
          kingPos = [i,j]
          tempBoardState[i].push(0)
        }
      }
    }
  }
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      if(tempBoardState[i][j] % 2 === tmod && tempBoardState[i][j] !== 0) {
        
        // Store the type of the piece
        let type = tempBoardState[i][j];
        
        // Create an empty array for storing the new moves to be appended
        let newmovestocheck = [];

        // Call the appropriate behaviour function based on the piece type
        if(type === 1 || type === 2) { //pawn behavior
          pawnBehaviour(i, j, newmovestocheck,tempBoardState);
        }
        if(type === 3 || type === 4) { //bishop behavior
          bishopBehaviour(i, j, newmovestocheck,tempBoardState);
        }
        if(type === 5 || type === 6) { //knight behavior
          knightBehaviour(i, j, newmovestocheck,tempBoardState);
        }
        if(type === 7 || type === 8) { //rook behavior
          rookBehaviour(i, j, newmovestocheck,tempBoardState);
        }
        if(type === 9 || type === 10) { //queen behavior
          queenBehaviour(i, j, newmovestocheck,tempBoardState);
        }
        if(type === 11 || type === 12) { //king behavior
          kingBehaviour(i, j, newmovestocheck,tempBoardState);
        }

        // Concatenate the new moves to the list of moves to be removed
        movestocheck = movestocheck.concat(newmovestocheck);
      }
    }
  }
  return checkArrayInArray(movestocheck,kingPos)
}
function detectCheckmate(board) {
  let tmod = (turn === 'white') ? 1 : 0;
  allpossiblemoves = []
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      let possiblemoves = [];
      type = board[i][j]
      // Call the appropriate behaviour function based on the piece type
      if(type === 1 || type === 2 && type % 2 == tmod) { //pawn behavior
        pawnBehaviour(i, j, possiblemoves,board);
      }
      if(type === 3 || type === 4 && type % 2 == tmod) { //bishop behavior
        bishopBehaviour(i, j, possiblemoves,board);
      }
      if(type === 5 || type === 6 && type % 2 == tmod) { //knight behavior
        knightBehaviour(i, j, possiblemoves,board);
      }
      if(type === 7 || type === 8 && type % 2 == tmod) { //rook behavior
        rookBehaviour(i, j, possiblemoves,board);
      }
      if(type === 9 || type === 10 && type % 2 == tmod) { //queen behavior
        queenBehaviour(i, j, possiblemoves,board);
      }
      if(type === 11 || type === 12 && type % 2 == tmod) { //king behavior
        kingBehaviour(i, j, possiblemoves,board);
      }

      if(detectCheck(board)) {
        possiblemoves = filterMovementsInCheck(i,j,possiblemoves)
      }
      allpossiblemoves = allpossiblemoves.concat(possiblemoves);
    }
  }
  if(allpossiblemoves.length > 0) {
    return false
  } else {
    return true
  }
}
function filterValidMoves(movestoremove, validmoves) {
  return validmoves.filter(vm => {
    return !movestoremove.some(mr => {
      return mr.every((val, index) => val === vm[index]);
    });
  });
}
function filterMovementsInCheck(x,y,moves) {
  type = boardState[x][y]
  newmoves = []
  for(var i = 0; i < moves.length; i++) {
    newTempBoard = []
    for(var j = 0; j < boardState.length; j++) {
      newTempBoard.push([])
      for(var k = 0; k < boardState[j].length; k++) {
        newTempBoard[j].push(boardState[j][k])
      }
    }
    newTempBoard[moves[i][0]][moves[i][1]] = type
    newTempBoard[x][y] = 0
    if(!detectCheck(newTempBoard)) {
      newmoves.push(moves[i])
    }
  }
  return newmoves
}
// Here I've extracted the queen and king behaviors into separate functions for readability
function queenBehaviour(i, j, moves,board) {
  bishopBehaviour(i, j, moves,board);
  rookBehaviour(i, j, moves,board);
}

function kingBehaviour(i, j, moves,board) {
  rookBehaviourAlteredForKing(i, j, moves,board);
  bishopBehaviourAlteredForKing(i, j, moves,board);
}

function cleanValidMoves(arr) { //it would be better if the movement functions worked but i really dont want to go into that again
  for(j = 0; j < 10; j++) {
    for(i = 0; i < arr.length; i++) {
      mov = arr[i]
      if(mov[1] > boardState[mov[0]].length-1 || mov[1] < 0 || mov[0] < 0 || mov[0] > 10) {
        arr.splice(i,1)
        break;
      }
    }
  }
}
function calculateAndDrawValidMoves() {
  validmoves = []
  if(selectedPiece) {
    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // Semi-transparent green
    var x = selectedPiece[0];
    var y = selectedPiece[1];
    type = boardState[x][y]
    if(type == 1 || type == 2) { //pawn behavior
      pawnBehaviour(x,y,validmoves,boardState)
    } //pawn behaviour
    if(type == 3 || type == 4) {
      bishopBehaviour(x,y,validmoves,boardState);
    } //bishop behaviour
    if(type == 5 || type == 6) { //knight behaviour
      knightBehaviour(x,y,validmoves,boardState)
    } //knight behaviour
    if(type == 7 || type == 8) { //rook behaviour
      rookBehaviour(x,y,validmoves,boardState)
    } //rook behaviour
    if(type == 9 || type == 10) { //queen behaviour
      queenBehaviour(x,y,validmoves,boardState)
    } //queen behaviour
    if(type == 11 || type == 12) { //king behaviour
      kingBehaviour(x,y,validmoves,boardState)
      nullifyTakenKingSpots()
    } //king behaviour
    cleanValidMoves(validmoves)
    if(detectCheck(boardState)) {
      validmoves = filterMovementsInCheck(x,y,validmoves)
    }
    for(i = 0; i < validmoves.length; i++) {
      mov = validmoves[i]
      drawHexagon(hexpositions[mov[0]][mov[1]][0],hexpositions[mov[0]][mov[1]][1], bS, 0)
    }
  }
}
createPieceReferences()

function findTile(x, y) {
  for (var i = 0; i < hexpositions.length; i++) {
    for (var j = 0; j < hexpositions[i].length; j++) {
      var dx = x - hexpositions[i][j][0];
      var dy = y - hexpositions[i][j][1];
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < bS / 2) {
        return [i, j];
      }
    }
  }
  return null;
}

function checkArrayInArray(arr, farr){
    if(JSON.stringify(arr).includes(JSON.stringify(farr))) return true;
    return false;
}

tile = 0

c.addEventListener('mousemove', function(event) {
  var rect = c.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  hoveredTile = findTile(x, y); // Update the hovered tile

  // Check if the mouse is over a piece
  hoveredPiece = null;
  for (var i = 0; i < piecePositions.length; i++) {
    var piece = piecePositions[i];
    if (x >= piece.x && x <= piece.x + piece.width && y >= piece.y && y <= piece.y + piece.height) {
      // Mouse is over this piece
      hoveredPiece = piece.index;
      break;
    }
  }

  // Redraw the board to update the size of the hovered piece
  drawBoardState();
  var rectX = c.width - 50 - 10;
  var rectY = c.height - 50 - 10;
  if (x >= rectX && x <= rectX + 50 && y >= rectY && y <= rectY + 50) {
    // Mouse is over the full screen icon
    hoveredFullScreenIcon = true;
  } else {
    hoveredFullScreenIcon = false;
  }
});
c.addEventListener('click', function(event) {
  var rect = c.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  // Check if the click was on a promotion piece
  for (var i = 0; i < piecePositions.length; i++) {
    var piece = piecePositions[i];
    if (x >= piece.x && x <= piece.x + piece.width && y >= piece.y && y <= piece.y + piece.height) {
      // Click was on this piece
      console.log("You clicked on " + piece.name);
      // Clear all piece positions to remove the promotion choices
      piecePositions = [];
      promotionInProgress = false;

      // Find the pawn and update its position
      for (var j = 0; j < 10; j++) {
        if (boardState[j][0] == 1) {
          // Update the boardState to reflect the new piece
          boardState[j][0] = piece.index+1;
          break;
        } else if(boardState[j][boardState[j].length-1] == 2) {
          boardState[j][boardState[j].length-1] = piece.index + 1
          break;
        }
      }
      return;
    }
  }

  var tile = findTile(x, y);
  if(tile && !promotionInProgress) {
    if(checkArrayInArray(validmoves,tile)) {
      cx = selectedPiece[0]
      cy = selectedPiece[1]
      boardState[tile[0]][tile[1]] = boardState[cx][cy]
      boardState[cx][cy] = 0 
      if(turn == 'white') {
        turn = 'black'
      } else {
        turn = 'white'
      }
      selectedPiece = null;
    }
  }
  if (tile) {
    var piece = boardState[tile[0]][tile[1]];
    // Check if a piece of the correct color was clicked
    if (piece != 0 && ((turn == 'white' && piece % 2 == 1) || (turn == 'black' && piece % 2 == 0))) {
      selectedPiece = tile;
    } else {
      selectedPiece = null;
    }
  } else {
    selectedPiece = null;
  }
  if (hoveredFullScreenIcon) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      c.requestFullscreen().catch(console.log);
    }
    return;
  }
});
function drawCheckmateScreen() {
  if(detectCheckmate(boardState)) {
    ctx.beginPath()
    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // Semi-transparent green
    ctx.rect(0,0,c.width,c.height)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.font = "30px Arial"
    ctx.textAlign = "center"; // add this line
    ctx.textBaseline = "middle"; // add this line
    if(turn == 'white') {
      ctx.fillText('Black' + " won by checkmate", c.width / 2, c.height / 2)
    } else {
      ctx.fillText('White' + " won by checkmate", c.width / 2, c.height / 2)
    }
  }
}
var turn = "white";
var hoveredTile = null;
var selectedPiece = null;

var piecePositions = [];
var hoveredPiece = null;

function pawnPromotion() {
  // Array indexes for 'White Bishop', 'White Knight', 'White Rook', and 'White Queen'

  for(i = 0; i < 10; i++) {
    console.log(boardState[i][boardState[i].length-1])
    if(boardState[i][0] == 1) {
      var pieceIndexes = [2, 4, 6, 8];
      var pieceNames = ['White Bishop', 'White Knight', 'White Rook', 'White Queen']; 
      promotionInProgress = true;
      pawnToPromote = [i, 0];
      var rectX = hexpositions[i][0][0] - 65;
      var rectY = hexpositions[i][0][1] - 25;
      var rectWidth = 130;
      var rectHeight = 50;

      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.roundRect(hexpositions[i][0][0] - 85, rectY, 170, rectHeight, 5);
      ctx.fill();

      // Calculate the width of each piece to be drawn (divide rect width by 6) maintaining the aspect ratio
      var pieceWidth = rectWidth / 6;
      var pieceHeight;

      // Calculate the total width of all pieces plus gaps
      var totalWidth = pieceWidth * 4 + pieceWidth * (4 - 1);

      // Calculate the offset to center the images
      var xOffset = (rectWidth - totalWidth) / 1.8;

      piecePositions = []; // Clear the piece positions at the start of each frame

      for (var j = 0; j < 4; j++) {
        pieceHeight = pieceWidth / pieces[pieceIndexes[j]].aspectRatio; // Calculate height maintaining aspect ratio

        // Calculate the X position for each piece, spacing them evenly within the rect
        var pieceX = rectX + xOffset + j * (pieceWidth * 2); // Multiply by 2 to add a gap of pieceWidth between each piece
        var pieceY = rectY + (rectHeight - pieceHeight) / 2; // Center the image vertically within the rect

        // Determine whether to scale the piece based on whether it is being hovered over
        var scaleFactor = hoveredPiece === pieceIndexes[j] ? 1.2 : 1;
        var newWidth = pieceWidth * scaleFactor;
        var newHeight = pieceHeight * scaleFactor;
        var newX = pieceX - (newWidth - pieceWidth) / 2;
        var newY = pieceY - (newHeight - pieceHeight) / 2;

        // Draw the piece
        ctx.drawImage(pieces[pieceIndexes[j]], newX, newY, newWidth, newHeight);
        
        piecePositions.push({
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
          index: pieceIndexes[j],
          name: pieceNames[j]
        });
      }
    } else if(boardState[i][boardState[i].length-1] == 2) {
      var pieceIndexes = [3, 5, 7, 9];
      var pieceNames = ['Black Bishop', 'Black Knight', 'Black Rook', 'Black Queen']; 
      promotionInProgress = true;
      pawnToPromote = [i, 0];
      var rectX = hexpositions[i][boardState[i].length-1][0] - 65;
      var rectY = hexpositions[i][boardState[i].length-1][1] - 25;
      var rectWidth = 130;
      var rectHeight = 50;

      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.roundRect(hexpositions[i][boardState[i].length-1][0] - 85, rectY, 170, rectHeight, 5);
      ctx.fill();

      // Calculate the width of each piece to be drawn (divide rect width by 6) maintaining the aspect ratio
      var pieceWidth = rectWidth / 6;
      var pieceHeight;

      // Calculate the total width of all pieces plus gaps
      var totalWidth = pieceWidth * 4 + pieceWidth * (4 - 1);

      // Calculate the offset to center the images
      var xOffset = (rectWidth - totalWidth) / 1.8;

      piecePositions = []; // Clear the piece positions at the start of each frame

      for (var j = 0; j < 4; j++) {
        pieceHeight = pieceWidth / pieces[pieceIndexes[j]].aspectRatio; // Calculate height maintaining aspect ratio

        // Calculate the X position for each piece, spacing them evenly within the rect
        var pieceX = rectX + xOffset + j * (pieceWidth * 2); // Multiply by 2 to add a gap of pieceWidth between each piece
        var pieceY = rectY + (rectHeight - pieceHeight) / 2; // Center the image vertically within the rect

        // Determine whether to scale the piece based on whether it is being hovered over
        var scaleFactor = hoveredPiece === pieceIndexes[j] ? 1.2 : 1;
        var newWidth = pieceWidth * scaleFactor;
        var newHeight = pieceHeight * scaleFactor;
        var newX = pieceX - (newWidth - pieceWidth) / 2;
        var newY = pieceY - (newHeight - pieceHeight) / 2;

        // Draw the piece
        ctx.drawImage(pieces[pieceIndexes[j]], newX, newY, newWidth, newHeight);
        
        piecePositions.push({
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
          index: pieceIndexes[j],
          name: pieceNames[j]
        });
      }
    } 
  }
}
function gameloop() {
  drawBoardState()
  drawCheckmateScreen()
  pawnPromotion()
  requestAnimationFrame(gameloop)
}
gameloop()
