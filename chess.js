

// const myBoard = ChessBoard()


// Function for generating the ChessBoard object
// ChessBoard object accepts moves as an ordered pair of indices myBoard.move(25, 45)
function ChessBoard(gameObj) {
    
    // Load Piece images
    const images = {}
    {
    images.wp = new Image()
    images.wp.src = "pieces/pawn.png"
    images.bp = new Image()
    images.bp.src = "pieces/pawn1.png"
    images.wn = new Image()
    images.wn.src = "pieces/knight.png"
    images.bn = new Image()
    images.bn.src = "pieces/knight1.png"
    images.wb = new Image()
    images.wb.src = "pieces/bishop.png"
    images.bb = new Image()
    images.bb.src = "pieces/bishop1.png"
    images.wr = new Image()
    images.wr.src = "pieces/rook.png"
    images.br = new Image()
    images.br.src = "pieces/rook1.png"
    images.wk = new Image()
    images.wk.src = "pieces/king.png"
    images.bk = new Image()
    images.bk.src = "pieces/king1.png"
    images.wq = new Image()
    images.wq.src = "pieces/queen.png"
    images.bq = new Image()
    images.bq.src = "pieces/queen1.png"
    setTimeout(() => gameObj.start(), 50)
    }
    // Initialize square information object
    const squares = {}
    const newSetup = [
        [["wr"], ["wn"], ["wb"], ["wq"], ["wk"], ["wb"], ["wn"], ["wr"]],
        [["wp"], ["wp"], ["wp"], ["wp"], ["wp"], ["wp"], ["wp"], ["wp"]],
        [[""], [""], [""], [""], [""], [""], [""], [""]],
        [[""], [""], [""], [""], [""], [""], [""], [""]],
        [[""], [""], [""], [""], [""], [""], [""], [""]],
        [[""], [""], [""], [""], [""], [""], [""], [""]],
        [["bp"], ["bp"], ["bp"], ["bp"], ["bp"], ["bp"], ["bp"], ["bp"]],
        [["br"], ["bn"], ["bb"], ["bq"], ["bk"], ["bb"], ["bn"], ["br"]]
    ]

    
    // Build squares object
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
          const ij = `${i}${j}`
          const canvasVariable = document.getElementById(`${ij}`)
          squares[ij] = Object()
          squares[ij].sprite = newSetup[i-1][j-1][0]
          squares[ij].cnv = canvasVariable
        //   console.log(canvasVariable)
          squares[ij].ctx = canvasVariable.getContext('2d')
          squares[ij].cnv.addEventListener("click", () => gameObj.click(ij))
          squares[ij].ctx.fillStyle = ((i+j)%2===0) ? "#8D6E41" : "#99CC66"
        }
    }
    
    // Clear a square
    const clearSquare = (s) => {
        squares[s].ctx.fillRect(0, 0, squares[s].cnv.width, squares[s].cnv.height)
    }
    
    const boardObj = {
        'start': () => {
            // console.log(squares)
            for (let s in squares) {
                clearSquare(s)
                if (squares[s].sprite !== "") {
                    squares[s].ctx.drawImage(images[squares[s].sprite], 0, 0, squares[s].cnv.width, squares[s].cnv.height)
                }
            
            }
        },  
        'move': (s1, s2) => {
            squares[s2].sprite = squares[s1].sprite
            clearSquare(s1)
            clearSquare(s2)
            squares[s2].ctx.drawImage(images[squares[s2].sprite], 0, 0, squares[s2].cnv.width, squares[s2].cnv.height)
            },
        'game': gameObj,
        'squares': () => console.log(squares),
        'print': () => console.log(this)
      }
    
    return boardObj
  }

  // Function for generating game object
  // Game object accepts clicks as a square index myGame.click(25)
  function Game() {
  
      let pieceInHand = false
      let originSquare
  
      const gameObj = {
        "start": () => board.start(),
        "click": (square) => {
            if (pieceInHand) {
                console.log(originSquare, square)
                board.move(originSquare, square)
            } else {
                originSquare = square
            }
            pieceInHand = !pieceInHand
        },
        "print": () => console.log(this),
        "printBoard": () => console.log(board),
        "squares": () => board.squares()
      }
      const board = ChessBoard(gameObj)
    //   gameObj.board = board
  
      return gameObj
  
  
  
  
  
  
      
  }





  // Object for controlling the game state
  const myGame = Game()
  myGame.start()


