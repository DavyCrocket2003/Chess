

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
        squares[ij].ctx.fillStyle = ((i+j)%2===0) ? "#04AA6D" : "#FFFFFF"
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



    // Function that gives you a pieces object
    function Pieces() {

        let squares = {}
        squares.turn = "white"
        for (let i=1; i<9; i++) {
            for (let j=1; j<9; j++) {
                let ij = `${i}${j}`
                squares[ij] = {
                    "piece": "_",
                    "candidates": [],
                    "legal": []
                }
            }
        }

        function getCandidates() {      // Return an array of canditate moves based on board state
            // const split = (s) => [Math.floor(s/10),s%10]
            const color = (piece) => {  // Returns color of piece
                if (piece==='_' || piece===undefined) {
                    return false
                } else if ( 'PLMNBRSQUK'.test(piece)) {
                    return 'white'
                } else if ( 'plmnbrsquk'.test(piece)) {
                    return 'black'
                } else {
                    console.log('Piece error')
                    return false
                }
            }
            const moveable = (y,x,c) => {//Returns if the indexed square is empty or of the given color(c)
                return (squares[`${y}${x}`]==='_'||color(squares[`${y}${x}`])===c)
            }
            const diagonal = (y,x,c) => {//Returns results of diagonally moving piece that captures color(c)
                const direction = (dy,dx) => {
                    let res = []
                    let [Y,X] = [y+dy,x+dx]
                    if moveable(Y,X,c) {
                        res.push(`${Y}${X}`])
                    }
                    while (squares[`${Y}${X}`].piece==='_') {
                        [Y,X] = [Y+dy,X+dx]
                        if moveable(Y,X,c) {
                            res.push(`${Y}${X}`)
                        }
                    }
                    return res
                }
                return [...direction(1,1)...direction(-1,1)...direction(1,-1)...direction(-1,-1)]
            }
            const straight = (y,x,c) => {//Returns moves of straight moving piece that captures color c
                const dir = (dy,dx) => {
                    let res = []
                    let [Y,X] = [y+dy,x+dx]
                    if moveable(Y,X,c) {
                        res.push(`${Y}${X}`)
                    }
                    while (squares[`${Y}${X}`].piece==='_') {
                        [Y,X] = [Y+dy,X+dx]
                        if (moveable(Y,X,c)) {
                            res.push(`${Y}${X}`)
                        }
                    }
                    return res
                }
                return [...dir(1,0)...dir(-1,0)...dir(0,1)...dir(0,-1)]
            }
            const move__ = (y,x) => {   // Empty Square
                return []
            }
            const move_P = (y,x) => {   // Regular White Pawn
                result = []
                if (squares[`${y+1}${x}`].piece === '_') {
                    result.push(`${y+1}${x}`)
                }
                if (y===2 && squares[`${y+2}${x}`].piece==='_') {
                    result.push(`${y+2}${x}`)
                }
                if (color(squares[`${y+1}${x-1}`].piece)==='black') {
                    result.push(`${y+1}${x-1}`)
                }
                if (color(squares[`${y+1}${x+1}`].piece)==='black') {
                    result.push(`${y+1}${x+1}`)
                }
            }
            const move_p = (y,x) => {   // Regular Black Pawn
                result = []
                if (squares[`${y-1}${x}`].piece === '_') {
                    result.push(`${y-1}${x}`)
                }
                if (y===7 && squares[`${y-2}${x}`].piece==='_') {
                    result.push(`${y-2}${x}`)
                }
                if (color(squares[`${y-1}${x-1}`].piece)==='white') {
                    result.push(`${y-1}${x-1}`)
                }
                if (color(squares[`${y-1}${x+1}`].piece)==='white') {
                    result.push(`${y-1}${x+1}`)
                }
            }
            const move_L = (y,x) => {   // White En Pawn capturing Left
                return move_P(y,x).push(`6${x-1}`)
            }
            const move_l = (y,x) => {   // Black En Pawn capturing Left
                return move_p(y,x).push(`3${x+1}`)
            }
            const move_M = (y,x) => {   // White En Pawn capturing right
                return move_P(y,x).push(`6${x+1}`)
            }
            const move_m = (y,x) => {   // Black En Pawn capturing right
                return move_p(y,x).push(`3${x-1}`)
            }
            const move_N = (y,x) => {   // White kNight
                let result = [
                    `${y+2}{x-1}`,
                    `${y+2}{x+1}`,
                    `${y+1}{x-2}`,
                    `${y-1}{x-2}`,
                    `${y-2}{x+1}`,
                    `${y-2}{x-1}`,
                    `${y-1}{x-2}`,
                    `${y+1}{x-2}`
                ]
                return result.filter((square) => {
                    return (squares[square].piece==='_' || color(squares[square].piece)==='black')
                })
            }
            const move_n = (y,x) => {   // Black kNight
                let result = [
                    `${y+2}{x-1}`,
                    `${y+2}{x+1}`,
                    `${y+1}{x-2}`,
                    `${y-1}{x-2}`,
                    `${y-2}{x+1}`,
                    `${y-2}{x-1}`,
                    `${y-1}{x-2}`,
                    `${y+1}{x-2}`
                ]
                return result.filter((square) => {
                    return (squares[square].piece==='_' || color(squares[square].piece)==='white')
                })
            }
            const move_B = (y,x) => {   // White Bishop
                return diagonal(y,x,'black')
            }
            const move_b = (y,x) => {   // Black Bishop
                return diagonal(y,x,'white')
            }
            const move_S = (y,x) => {   // White Unmoved Rook
                return straight(y,x,'black')
            }
            const move_s = (y,x) => {   // Black Unmoved Rook
                return straight(y,x,'white')
            }
            const move_R = (y,x) => {   // White moved Rook
                return straight(y,x,'black')
            }
            const move_r = (y,x) => {   // Black moved ROok
                return straight(y,x,'white')
            }
            const move_Q = (y,x) => {   // White Queen
                return [...diagonal(y,x,'black')...straight(y,x,'black')]
            }
            const move_q = (y,x) => {   // Black Queen
                return [...diagonal(y,x,'white')...straight(y,x,'white')]
            }
            const move_U = (y,x) => {   // White Unmoved King
                let results = move_K(y,x)
                if (squares['11'].piece==='S' && squares['12'].piece==='_' && squares['13'].piece==='_' && squares['14'].piece==='_' && squares['13'].attackedBlack===false && squares['14'].attackedBlack===false && squares['15'].attackedBlack===false) {
                    results.push('13')
                }
                if (squares['18'].piece==='S' && squares['16'].piece==='_' && squares['17'].piece==='_' && squares['15'].attackedBlack===false && squares['16'].attackedBlack===false && squares['17'].attackedBlack===false) {
                    results.push('17')
                }
                return results
            }
            const move_u = (y,x) => {
                let results = move_k(y,x)
                if (squares['81'].piece==='s' && squares['82'].piece==='_' && squares['83'].piece==='_' && squares['84'].piece==='_' && squares['83'].attackedWhite===false && squares['84'].attackedWhite===false && squares['85'].attackedWhite===false) {
                    results.push('83')
                }
                if (squares['88'].piece==='s' && squares['86'].piece==='_' && squares['87'].piece==='_' && squares['85'].attackedWhite===false && squares['86'].attackedWhite===false && squares['87'].attackedWhite===false) {
                    results.push('87')
                }
                return results
            }
            const move_K = (y,x) => {   // White moved King
                let options = [[y+1,x+1],[y-1,x],[y+1,x-1],[y,x-1],[y-1,x-1],[y-1,x],[y-1,x+1],[y,x+1]]
                options = options.filter((yx) => {moveable(yx[0],yx[1], 'black')})
                return options.map((yx) => `${yx[0]}${yx[1]}`)
            }
            const move_k = (y,x) => {
                let options = [[y+1,x+1],[y-1,x],[y+1,x-1],[y,x-1],[y-1,x-1],[y-1,x],[y-1,x+1],[y,x+1]]
                options = options.filter((yx) => {moveable(yx[0],yx[1], 'white')})
                return options.map((yx) => `${yx[0]}${yx[1]}`)
            }

        }   // End of getCandidates




        piecesObj = {
            "squares": {},
            "getMoves": () => {},
            "load": () => {},

        }
    }


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





    

    return gameObj
    
}





  // Object for controlling the game state
  const myGame = Game()
  myGame.start()


  
  ```When move is made```
// Update Pieces
    //  


