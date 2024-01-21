const myBoard = ChessBoard()


// Block of code for the board
{
function clearSquare() {
    cnvCtx.clearRect(0, 0, canvas.width, canvas.height)
}
function drWP() {
    clearSquare()
    const whitePawnImage = new Image()
    whitePawnImage.src = "pieces/pawn.png"
    whitePawnImage.addEventListener("load", () => {
        cnvCtx.drawImage(whitePawnImage, 0, 0, 50, 50)
    })

}
function drBP() {
    clearSquare()
    const blackPawnImage = new Image()
    blackPawnImage.src = "pieces/pawn.png"
    blackPawnImage.addEventListener("load", () => {
        cnvCtx.drawImage(blackPawnImage, 0, 0, 50, 50)
    })
}
function drWN() {
    clearSquare()
    const whiteKnightImage = new Image()
    whiteKnightImage.src = "pieces/knight.png"
    whiteKnightImage.addEventListener("load", () => {
        cnvCtx.drawImage(whiteKnightImage, 0, 0, 50, 50)
    })

}
function drBN() {
    clearSquare()
    const blackKnightImage = new Image()
    blackKnightImage.src = "pieces/knight1.png"
    blackKnightImage.addEventListener("load", () => {
        cnvCtx.drawImage(blackKnightImage, 0, 0, 50, 50)
    })

}
function drWB() {
    clearSquare()
    const whiteBishopImage = new Image()
    whiteBishopImage.src = "pieces/bishop.png"
    whiteBishopImage.addEventListener("load", () => {
        cnvCtx.drawImage(whiteBishopImage, 0, 0, 50, 50)
    })

}
function drBB() {
    clearSquare()
    const blackBishopImage = new Image()
    blackBishopImage.src = "pieces/bishop1.png"
    blackBishopImage.addEventListener("load", () => {
        cnvCtx.drawImage(blackBishopImage, 0, 0, 50, 50)
    })

}
function drWR() {
    clearSquare()
    const whiteRookImage = new Image()
    whiteRookImage.src = "pieces/rook.png"
    whiteRookImage.addEventListener("load", () => {
        cnvCtx.drawImage(whiteRookImage, 0, 0, 50, 50)
    })
}
function drBR() {
    clearSquare()
    const blackRookImage = new Image()
    blackRookImage.src = "pieces/rook1.png"
    blackRookImage.addEventListener("load", () => {
        cnvCtx.drawImage(blackRookImage, 0, 0, 50, 50)
    })

}
function drWQ() {
    clearSquare()
    const whiteQueenImage = new Image()
    whiteQueenImage.src = "pieces/queen.png"
    whiteQueenImage.addEventListener("load", () => {
        cnvCtx.drawImage(whiteQueenImage, 0, 0, 50, 50)
    })

}
function drBQ() {
    clearSquare()
    const blackQueenImage = new Image()
    blackQueenImage.src = "pieces/queen1.png"
    blackQueenImage.addEventListener("load", () => {
        cnvCtx.drawImage(blackQueenImage, 0, 0, 50, 50)
    })

}
function drWK() {
  clearSquare()
  const whiteKingImage = new Image()
  whiteKingImage.src = 'pieces/king.png'
  whiteKingImage.addEventListener("load", () => {
    cnvCtx.drawImage(whiteKingImage, 0, 0, 50, 50)
  })
}
function drBK() {
  clearSquare()
  const blackKingImage = new Image()
  blackKingImage.src = 'pieces/king1.png'
  blackKingImage.addEventListener("load", () => {
    cnvCtx.drawImage(blackKingImage, 0, 0, 50, 50)
  })
}
}








function ChessBoard() {
    // Load Piece images
    const images = {}
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
    // Initialize square information matrix
    const squares = [
        [["wr"], ["wn"], ["wb"], ["wq"], ["wk"], ["wb"], ["wn"], ["wr"]],
        [["wp"], ["wp"], ["wp"], ["wp"], ["wp"], ["wp"], ["wp"], ["wp"]],
        [[""], [""], [""], [""], [""], [""], [""], [""]],
        [[""], [""], [""], [""], [""], [""], [""], [""]],
        [[""], [""], [""], [""], [""], [""], [""], [""]],
        [[""], [""], [""], [""], [""], [""], [""], [""]],
        [["bp"], ["bp"], ["bp"], ["bp"], ["bp"], ["bp"], ["bp"], ["bp"]],
        [["br"], ["bk"], ["bb"], ["bq"], ["bk"], ["bb"], ["bn"], ["br"]]
      ]
    // Grab canvases and contexts
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
          const canvasId = `${i}${j}`
          const canvasVariable = document.getElementById(`${canvasId}`)
          squares[i-1][j-1].push(canvasVariable,canvasVariable.getContext('2d'))
        }
      }
    
    //fnc to split digits
    const split = (num) => [Math.floor(num/10), num%10]

    // Clear a square
    const clearSquare = (index) => {
        let [x, y] = split(index)
        squares[y][x][2].clearRect(0, 0, canvas.width, canvas.height)
    }

    // // Takes in a move and updates the board
    // function move(s1, s2) {
    //     let [x1,y1] = split(s1)
    //     let [x2,y2] = split(s2)
    //     squares[y2][x2][0] = squares[y1][x1][0]
    //     clearSquare(y1,x1)
    //     squares[y2][x2][2].drawImage(images[squares[y2][x2][0]], 0, 0, canvas.width, canvas.height)

    // }
  
    // Public methods and properties
    return {
      
  
      move: (s1, s2) => {
        let [x1,y1] = split(s1)
        let [x2,y2] = split(s2)
        squares[y2][x2][0] = squares[y1][x1][0]
        clearSquare(y1,x1)
        squares[y2][x2][2].drawImage(images[squares[y2][x2][0]], 0, 0, canvas.width, canvas.height)

        }
    }
  }