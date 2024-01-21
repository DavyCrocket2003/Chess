const myBoard = ChessBoard()



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
        [["br"], ["bn"], ["bb"], ["bq"], ["bk"], ["bb"], ["bn"], ["br"]]
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
      'start': () => {
        for (let row of squares) {
            for (let square of row) {
                if (square[0] !== "") {
                    square[2].drawImage(images[square[0]], 0, 0, square[1].width, square[1].height)
                }
            }
        }
      },  
      'move': (s1, s2) => {
        let [x1,y1] = split(s1)
        let [x2,y2] = split(s2)
        squares[y2][x2][0] = squares[y1][x1][0]
        clearSquare(y1,x1)
        squares[y2][x2][2].drawImage(images[squares[y2][x2][0]], 0, 0, images[squares[y2][x2][1]].width, images[squares[y2][x2][1]].height)

        }
    }
  }






  