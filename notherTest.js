
const canvas = document.getElementById('myCanvas')
const cnvCtx = canvas.getContext('2d')

// Function to draw a chess king symbol using an image

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

