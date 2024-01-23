

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
    function Pieces(gameObj) {

        let squares = {}
        for (let i=1; i<9; i++) {
            for (let j=1; j<9; j++) {
                let ij = `${i}${j}`
                squares[ij] = {
                    "piece": "_",
                    "candidates": [],
                    "legalMoves": [],
                    "inCheck": {'white': false, 'black': false}
                }
            }
        }
        
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
        const Kk = (sqObj) => {      // Function to find the King and king
            let [K, k]
            Object.values(sqObj).forEach((idx) => {
                if (sqObj[idx].piece==='K' || sqObj[idx].piece==='U') {
                    K = idx
                }
                if (sqObj[idx].piece==='k' || sqObj[idx].piece==='u') {
                    k = idx
                }
            })
            return [K, k]
        }

        function getCandidates(squaresObj = squares) {  //Return a squares updating candidate moves and attacked squares
            // const split = (s) => [Math.floor(s/10),s%10]
            const moveable = (y,x,c) => {//Returns if the indexed square is empty or of the given color(c)
                return (squaresObj[`${y}${x}`]==='_'||color(squares[`${y}${x}`])===c)
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
            let attacks = {   // An object of function elements that return attacks for different pieces
            "_": (y,x) => {   // Empty Square
                return []
            },
            "P": (y,x) => {   // Regular White Pawn
                result = []
                if (color(squaresObj[`${y+1}${x-1}`].piece)==='black') {
                    result.push(`${y+1}${x-1}`)
                }
                if (color(squaresObj[`${y+1}${x+1}`].piece)==='black') {
                    result.push(`${y+1}${x+1}`)
                }
            },
            "p": (y,x) => {   // Regular Black Pawn
                result = []
                if (color(squaresObj[`${y-1}${x-1}`].piece)==='white') {
                    result.push(`${y-1}${x-1}`)
                }
                if (color(squaresObj[`${y-1}${x+1}`].piece)==='white') {
                    result.push(`${y-1}${x+1}`)
                }
            },
            "L": (y,x) => {   // White En Pawn capturing Left
                return attacks['P'](y,x).push(`6${x-1}`)
            },
            'l': (y,x) => {   // Black En Pawn capturing Left
                return attacks['p'](y,x).push(`3${x+1}`)
            },
            'M': (y,x) => {   // White En Pawn capturing right
                return attacks['P'](y,x).push(`6${x+1}`)
            },
            'm': (y,x) => {   // Black En Pawn capturing right
                return attacks['p'](y,x).push(`3${x-1}`)
            },
            "N": (y,x) => {   // White kNight
                let options = [
                    [y+2,x-1],
                    [y+2,x+1],
                    [y+1,x-2],
                    [y-1,x-2],
                    [y-2,x+1],
                    [y-2,x-1],
                    [y-1,x-2],
                    [y+1,x-2]
                ]
                return options.filter((yx) => moveable(yx[0],yx[1],'black')).map((yx) => `${yx[0]}${yx[1]}`)
            },
            'n': (y,x) => {   // Black kNight
                let options = [
                    [y+2,x-1],
                    [y+2,x+1],
                    [y+1,x-2],
                    [y-1,x-2],
                    [y-2,x+1],
                    [y-2,x-1],
                    [y-1,x-2],
                    [y+1,x-2]
                ]
                return options.filter((yx) => moveable(yx[0],yx[1],'black')).map((yx) => `${yx[0]}${yx[1]}`)
            },
            'B': (y,x) => {   // White Bishop
                return diagonal(y,x,'black')
            },
            'b': (y,x) => {   // Black Bishop
                return diagonal(y,x,'white')
            },
            'S': (y,x) => {   // White Unmoved Rook
                return straight(y,x,'black')
            },
            's': (y,x) => {   // Black Unmoved Rook
                return straight(y,x,'white')
            },
            'R': (y,x) => {   // White moved Rook
                return straight(y,x,'black')
            },
            'r': (y,x) => {   // Black moved Rook
                return straight(y,x,'white')
            },
            'Q': (y,x) => {   // White Queen
                return [...diagonal(y,x,'black')...straight(y,x,'black')]
            },
            'q': (y,x) => {   // Black Queen
                return [...diagonal(y,x,'white')...straight(y,x,'white')]
            },
            'U': (y,x) => {   // White Unmoved King
                let results = attacks['K'](y,x)


                if (squaresObj['11'].piece==='S' && squaresObj['12'].piece==='_' && squaresObj['13'].piece==='_' && squaresObj['14'].piece==='_' && squaresObj['13'].inCheck.white && squaresObj['14'].inCheck.white && squaresObj['15'].inCheck.white) {
                    results.push('13')
                }
                if (squaresObj['18'].piece==='S' && squaresObj['16'].piece==='_' && squaresObj['17'].piece==='_' && squaresObj['15'].inCheck.white===false && squaresObj['16'].inCheck.white && squaresObj['17'].inCheck.white) {
                    results.push('17')
                }
                return results
            },
            'u': (y,x) => {   // Black Unmoved King
                let results = attacks['k'](y,x)
                if (squaresObj['81'].piece==='s' && squaresObj['82'].piece==='_' && squaresObj['83'].piece==='_' && squaresObj['84'].piece==='_' && squaresObj['83'].inCheck.black && squaresObj['84'].inCheck.black && squaresObj['85'].inCheck.black) {
                    results.push('83')
                }
                if (squares['88'].piece==='s' && squaresObj['86'].piece==='_' && squaresObj['87'].piece==='_' && squaresObj['85'].inCheck.black && squaresObj['86'].inCheck.black && squaresObj['87'].inCheck.black) {
                    results.push('87')
                }
                return results
            },
            'K': (y,x) => {   // White moved King
                let options = [[y+1,x+1],[y-1,x],[y+1,x-1],[y,x-1],[y-1,x-1],[y-1,x],[y-1,x+1],[y,x+1]]
                options = options.filter((yx) => {moveable(yx[0],yx[1], 'black')})
                return options.map((yx) => `${yx[0]}${yx[1]}`)
            },
            'k': (y,x) => {   // Black moved King
                let options = [[y+1,x+1],[y-1,x],[y+1,x-1],[y,x-1],[y-1,x-1],[y-1,x],[y-1,x+1],[y,x+1]]
                options = options.filter((yx) => {moveable(yx[0],yx[1], 'white')})
                return options.map((yx) => `${yx[0]}${yx[1]}`)
            }
            }
            for (let square in squaresObj){     // Reset "inCheck" values to false
                squaresObj[square].inCheck = {'white': false, 'black': false}
            }
            for (let square in squaresObj) {    //Update candidate moves and attacked squares
                // Take the list of attacks and add them to the list of available moves for that piece
                squaresObj[square].candidates = attacks[squaresObj[square].piece](Number(square[0]),Number(square[1]))
                // Iterate through attacked squares and document
                let c = (color(squaresObj[square].piece)==='white') ? 0 : 1
                for (let candidate of squaresObj[square].candidates) {
                    squaresObj[candidate][c] = true
                }
            }
            // Append the non aggressive pawn moves to candidate moves
            for (let i=1; i<9; i++) {
                for (let j=1; j<9; j++) {
                    let ij = `${i}${j}`
                    if (squaresObj[ij]==='P') {     // Nonaggressive white pawn moves
                        if (squaresObj[`${i+1}${j}`].piece==='_') {
                            squaresObj[ij].candidates.push(`${i+1}${j}`)
                            if (i===2 && squaresObj[`${i+2}${j}`].piece==='_') {
                                squaresObj[ij].candidates.push(`${i+2}${j}`)
                            }
                        }
                    }
                    if (squaresObj[ij]==='p') {     // Nonaggressive black pawn moves
                        if (squaresObj[`${i-1}${j}`].piece==='_') {
                            squaresObj[ij].candidates.push(`${i-1}${j}`)
                            if (i===7 && squaresObj[`${i-2}${j}`].piece==='_') {
                                squaresObj[ij].candidates.push(`${i-2}${j}`)
                            }
                        }
                    }
                }
            }
            return squaresObj
        }   // End of getCandidates

        function getLegals(squaresObj = squares) {      // Tests "candidates" for legal moves
            
            const writeLegalMoves = (legalTestSquare) => {   // For the given square test all it's candidate moves for legality
                let p = squaresObj[legalTestSquare].piece  // What kind of piece is it
                let c = color(p)==='white' ? 0 : 1      // What color is the piece (represent as an index)
                let king = Kk(squaresObj)[c]            //Where is the king
                if (king!==legalTestSquare) {
                    //Write a filter for candidates of legalTestSquare to place in legalMoves
                    squaresObj[legalTestSquare].legalMoves = squaresObj[legalTestSquare].candidates.filter((testCandidate) => {
                        // Filter should return true if candidate move does not leave the king in check
                        testSquares = JSON.parse(JSON.stringify(squaresObj))//Generate NEW squares object to make test moves on
                        testSquares[legalTestSquare].piece = '_'
                        testSquares[testCandidate].piece = p
                        testSquares = getCandidates(testSquares)    // Compute attacked squares
                        return (!testSquares[king].inCheck[c])
                    })


                }
                    
            }

            for (let i=1; i<9; i++) {           // Write the legal moves for each square
                for (let j=1; j<9; j++) {
                    let ij = `${i}${j}`
                    writeLegalMoves(ij)
                }
            }
            return squaresObj
            
        }

        function compressState(turn, squaresObj = squares) {
            let result = ''
            for (let i=0; i<9; i++) {
                for (let j=0; j<9; j++) {
                    let ij = `${i}${j}`
                    result += squaresObj[ij].piece
                }
            }
            return result + turn
        }

        function transformPieces(s1,s2,squareObj=squares) { //Function to take care of piece changes
            let [y1,x1,y2,x2] = [Number(s1[0]),Number(s1[1]),Number(s2[0]),Number(s2[1])]
            let result = ''
            if (squareObj[s2].piece==='U') {    //Unmoved King to King
                squareObj[s2].piece = 'K'
            }
            if (squareObj[s2].piece==='u') {    //Unmoved king to king
                squareObj[s2].piece = 'k'
            }
            if (squareObj[s2].piece==='S') {    //Unmoved Rook to Rook
                squareObj[s2].piece = 'R'
            }
            if (squareObj[s2].piece==='s') {    //Unmoved rook to rook
                squareObj[s2].piece = 'r'
            }
            if ('LM'.test(squareObj[s2].piece)) {//En Pawn to Pawn
                squareObj[s2].piece = 'P'
            }
            if ('lm'.test(squareObj[s2].piece)) {//en pawn to pawn
                squareObj[s2].piece = 'p'
            }
            if (squareObj[s2].piece==='P' && y2-y1===2) {//Create En Pawn
                if (squareObj[`4${x-1}`].piece==='p') {
                    squareObj[`4${x-1}`].piece = 'l'
                }
                if (squareObj[`4${x+1}`].piece==='p') {
                    squareObj[`4${x+1}`].piece = 'm'
                } 
            }
            if (squareObj[s2].piece==='p' && y1-y2===2) {//Create en pawn
                if (squareObj[`5${x-1}`].piece==='P') {
                    squareObj[`5${x-1}`].piece = 'M'
                }
                if (squareObj[`5${x+1}`].piece==='P') {
                    squareObj[`5${x+1}`].piece = 'L'
                } 
            }
            if (squareObj[s2].piece==='P' && y2===8) {
                let choice = ''
                while (!'QRBN'.test(choice)) {
                    choice = prompt("Choose a piece— Q, R, B, or N: ", 'Q')
                }
                squareObj[s2].piece = choice
                result += `=${choice}`
            }
            if (squareObj[s2].piece==='p' && y2===1) {
                let choice = ''
                while (!'QRBN'.test(choice)) {
                    choice = prompt("Choose a piece— Q, R, B, or N: ", 'Q')
                    result += `=${choice}`
                }
                squareObj[s2].piece = choice.toLowerCase()
            }
            return result
        }




        // Build piecesObj
        let piecesObj = {
            "turn": 'white',
            "game": gameObj,
            "gameState": 'normal',
            "history": [compressState('T')],
            "squares": () => {squares},
            "getMoves": (yx) => {squares[yx].legalMoves},
            "load": (gameStateString) => {
                let pieceArray = []
                for (let i=0; i<gameStateString.length; i++) {
                    pieceArray.push(gameStateString[i])
                }
                piecesObj.turn = ('T'===pieceArray.pop()) ? 'white' : 'black'
                for (let i=0; i<9; i++) {
                    for (let j=0; j<9; j++) {
                        squares[`${i}${j}`].piece = pieceArray.shift()
                        getCandidates()
                        return getLegals()
                    }
                }
            },
            "setMove": (s1,s2) => {
                let pieceCaptured = (squares[s2].piece!=='_') 
                squares[s2].piece = squares[s1].piece
                squares[s1].piece = '_'
                let entry = ['A','B','C','D','E','F','G','H'][Number(s1[0])] + {true:'x',false:''}[pieceCaptured] + s1[1] + ['A','B','C','D','E','F','G','H'][Number(s2[0])] + s2[1]
                entry += transformPieces(s1,s2)
                getCandidates()
                getLegals()
                let c = {'white': 0, 'black': 1}[color(squares[s2].piece)]
                let king = Kk(squares)[c]
                let inCheck = squares[king].inCheck[c]
                let moveTotal = 0
                Object.keys(squares).forEach((square) => {
                    moveTotal += square.legalMoves.length
                })
                piecesObj.gameState = 'normal'
                if inCheck {
                    piecesObj.gameState = 'inCheck'
                }
                if (moveTotal===0) {
                    if (inCheck) {
                        piecesObj.gameState = 'checkmate'
                    } else {
                        piecesObj.gameState = 'stalemate'
                    }
                }
                entry += {'inCheck':'+','checkmate':'#','stalemate':'='}
                piecesObj.history.push(compressState(piecesObj.turn))
                piecesObj.turn = (piecesObj.turn === 'white') ? 'black' : 'white'
                return entry

                }
                
            }

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
        "squares": () => board.squares(),
        "pieces": Pieces(),
        "board": board,
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


