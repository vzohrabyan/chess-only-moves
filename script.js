let blackCrown = "./Assets/crownBlack.png",
    whiteCrown = "./Assets/crownWhite.png",
    blackQueen = "./Assets/queenBlack.png",
    whiteQueen = "./Assets/queenWhite.png",
    blackRook = "./Assets/rookBlack.png",
    whiteRook = "./Assets/rookWhite.png",
    blackStrategy = "./Assets/strategyBlack.png",
    whiteStrategy = "./Assets/strategyWhite.png",
    blackPawn = "./Assets/pawnBlack.png",
    whitePawn = "./Assets/pawnWhite.png",
    blackBishop = "./Assets/bishopBlack.png",
    whiteBishop = "./Assets/bishopWhite.png";
    isChecked = false;
    

let turn = true;
let whiteFigures = [];
let blackFigures = [];

const board = [
    [[blackRook],[blackStrategy],[blackBishop],[blackQueen],[blackCrown],[blackBishop],[blackStrategy],[blackRook]],
    [[blackPawn],[blackPawn],[blackPawn],[blackPawn],[blackPawn],[blackPawn],[blackPawn],[blackPawn]],
    [[null],[null],[null],[null],[null],[null],[null],[null]],
    [[null],[null],[null],[null],[null],[null],[null],[null]],
    [[null],[null],[null],[null],[null],[null],[null],[null]],
    [[null],[null],[null],[null],[null],[null],[null],[null]],
    [[whitePawn],[whitePawn],[whitePawn],[whitePawn],[whitePawn],[whitePawn],[whitePawn],[whitePawn]],
    [[whiteRook],[whiteStrategy],[whiteBishop],[whiteQueen],[whiteCrown],[whiteBishop],[whiteStrategy],[whiteRook]]
];

function drawBoard () {
    const boardUI = document.querySelector(".playing-board");
    boardUI.innerHTML = "";
    for (let i = 0; i < board.length; i++) {
    const row = document.createElement('div');
    boardUI.appendChild(row);
    row.classList = `row-${i}`;
    row.style.display = "flex";
    for (let j = 0; j < board[i].length; j++) {
        const field = document.createElement('div');
        field.classList = 'field';
        field.setAttribute('data-row', i);
        field.setAttribute('data-col', j);
        row.appendChild(field);
            if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
                field.style.backgroundColor = "white"; 
            } else {
                field.style.backgroundColor = "gray";
            }
        switch (board[i][j][0]) {
            case blackPawn:
                field.innerHTML = `<img onclick="blackPawnMove(event)" src=${blackPawn} />`
                field.id = "black";
                break;
            case whitePawn:
                field.id = "white";
                field.innerHTML = `<img onclick="whitePawnMove(event)"  src=${whitePawn} />`
                break;
            case blackRook:
                field.id = "black";
                field.innerHTML = `<img src=${blackRook} onclick="blackRookMove(event)" />`
                break;
            case whiteRook:
                field.id = "white";
                field.innerHTML = `<img src=${whiteRook} onclick="whiteRookMove(event)" />`
                break;
            case blackBishop:
                field.id = "black";
                field.innerHTML = `<img src=${blackBishop} onclick="blackBishopMove(event)" />`
                break;
            case whiteBishop:
                field.id = "white";
                field.innerHTML = `<img src=${whiteBishop} onclick="whiteBishopMove(event)" />`
                break;            
            case blackCrown:
                field.id = "black";
                field.classList += " blackCrown"
                field.innerHTML = `<img src=${blackCrown} onclick="blackCrownMove(event)" />`
                break;
            case whiteCrown:
                field.id = "white";
                field.innerHTML = `<img src=${whiteCrown} onclick="whiteCrownMove(event)" />`
                field.classList += " whiteCrown"
                break;
            case blackQueen:
                field.id = "black";
                field.innerHTML = `<img src=${blackQueen} onclick="blackQueenMove(event)" />`;
                break;
            case whiteQueen:
                field.id = "white";
                field.innerHTML = `<img src=${whiteQueen} onclick="whiteQueenMove(event)" />`
                    break;
            case blackStrategy:
                field.id = "black";
                field.innerHTML = `<img src=${blackStrategy} onclick="blackStrategyMove(event)"/>`
                break;
            case whiteStrategy:
                field.id = "white";
                field.innerHTML = `<img src=${whiteStrategy} onclick="whiteStrategyMove(event)" />`
                    break;
            case null:
                    field.innerHTML = ``
                    break;
            default:
                break;
        }
    }
}
whiteCheck()
}

const eatenBoard = () => {
    const blackFiguresBoard = document.querySelector(".blackFigures");
    const whiteFiguresBoard = document.querySelector(".whiteFigures");
    blackFiguresBoard.innerHTML = ``;
    whiteFiguresBoard.innerHTML = ``;
    blackFigures.forEach(figure => {
        if (figure) {
            blackFiguresBoard.innerHTML += `
                <img src=${figure} />
            `;
        }
    })
    whiteFigures.forEach(figure => {
        if (figure) {
            whiteFiguresBoard.innerHTML += `
                <img src=${figure} />
            `;
        }
    })
}

const whiteCheck = () => {
    if (turn) {
        const whiteCrownField = document.querySelector(".whiteCrown");
        let pawnRow = whiteCrownField.getAttribute("data-row");
        let pawnCol = whiteCrownField.getAttribute("data-col");
    } else {
        const blackCrownField = document.querySelector(".blackCrown");
        let pawnRow = blackCrownField.getAttribute("data-row");
        let pawnCol = blackCrownField.getAttribute("data-col");
        if (board[pawnRow][pawnCol][1]) {
            alert("check!!!!!")
        }
    }
}


const blackPawnMove = (event) => {
    if (!turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
    let pawnCol = event.target.parentNode.getAttribute("data-col");
    const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
        return !field.innerHTML;
    });
        emptyFields.forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.getAttribute("data-row");
        let moveCol = event.target.getAttribute("data-col");
            if (moveRow > pawnRow && pawnCol == moveCol && (Number(pawnRow) + 1) == moveRow) {
                board[moveRow][moveCol][0] = blackPawn;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                drawBoard()
            } else if (moveRow > pawnRow && pawnCol == moveCol && pawnRow == 1 && (Number(pawnRow) + 2) >= moveRow) {
                board[moveRow][moveCol][0] = blackPawn;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                drawBoard()
            } 
        })
    })
    document.querySelectorAll("#white").forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.parentNode.getAttribute("data-row");
        let moveCol = event.target.parentNode.getAttribute("data-col");
            if ((((Number(pawnRow)) + 1) == moveRow) && (((Number(pawnCol)) + 1) == moveCol) || (((Number(pawnRow)) + 1) == moveRow) && (((Number(pawnCol)) - 1) == moveCol)) {
                whiteFigures.push(board[moveRow][moveCol][0])
                board[moveRow][moveCol][0] = blackPawn;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                eatenBoard();
                drawBoard();
            }
        })
    })
    }
}

const whitePawnMove = (event) => {
    if (turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
    let pawnCol = event.target.parentNode.getAttribute("data-col");
    const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
        return !field.innerHTML;
    });
        emptyFields.forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.getAttribute("data-row");
        let moveCol = event.target.getAttribute("data-col");
            if (moveRow < pawnRow && pawnCol == moveCol && (Number(pawnRow) - 1) == moveRow) {
                board[moveRow][moveCol][0] = whitePawn;
                board[pawnRow][pawnCol][0] = null;
                turn = false;
                drawBoard()
            } else if (moveRow < pawnRow && pawnCol == moveCol && pawnRow == 6 && (Number(pawnRow) - 2) <= moveRow) {
                board[moveRow][moveCol][0] = whitePawn;
                board[pawnRow][pawnCol][0] = null;
                turn = false;
                drawBoard()
            } 
        })
    })
    document.querySelectorAll("#black").forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.parentNode.getAttribute("data-row");
        let moveCol = event.target.parentNode.getAttribute("data-col");
            if ((((Number(pawnRow)) - 1) == moveRow) && (((Number(pawnCol)) + 1) == moveCol) || (((Number(pawnRow)) - 1) == moveRow) && (((Number(pawnCol)) - 1) == moveCol)) {
                blackFigures.push(board[moveRow][moveCol][0])
                board[moveRow][moveCol][0] = whitePawn;
                board[pawnRow][pawnCol][0] = null;
                turn = false;
                eatenBoard();
                drawBoard()
            }
        })
    })
    }
}

const blackStrategyMove = (event) => {
    if (!turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
        let pawnCol = event.target.parentNode.getAttribute("data-col");
        let allMoves = [
            [+pawnRow + 1,+pawnCol - 2],
            [+pawnRow + 1,+pawnCol + 2],
            [+pawnRow + 2,+pawnCol + 1],
            [+pawnRow + 2,+pawnCol - 1],
            [+pawnRow - 2,+pawnCol - 1],
            [+pawnRow - 2,+pawnCol + 1],
            [+pawnRow - 1,+pawnCol - 2],
            [+pawnRow - 1,+pawnCol + 2],
        ];
    const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
        return !field.innerHTML;
    });
        emptyFields.forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.getAttribute("data-row");
        let moveCol = event.target.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                board[moveRow][moveCol][0] = blackStrategy;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                drawBoard()
            }
        })
        })
    })
    document.querySelectorAll("#white").forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.parentNode.getAttribute("data-row");
        let moveCol = event.target.parentNode.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                whiteFigures.push(board[moveRow][moveCol][0])
                board[moveRow][moveCol][0] = blackStrategy;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                eatenBoard()
                drawBoard()
            }
        })
        })
    })
    }
}

const whiteStrategyMove = (event) => {
    if (turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
        let pawnCol = event.target.parentNode.getAttribute("data-col");
        let allMoves = [
            [+pawnRow + 1,+pawnCol - 2],
            [+pawnRow + 1,+pawnCol + 2],
            [+pawnRow + 2,+pawnCol + 1],
            [+pawnRow + 2,+pawnCol - 1],
            [+pawnRow - 2,+pawnCol - 1],
            [+pawnRow - 2,+pawnCol + 1],
            [+pawnRow - 1,+pawnCol - 2],
            [+pawnRow - 1,+pawnCol + 2],
        ];
    const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
        return !field.innerHTML;
    });
        emptyFields.forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.getAttribute("data-row");
        let moveCol = event.target.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                board[moveRow][moveCol][0] = whiteStrategy;
                board[pawnRow][pawnCol][0] = null;
                turn = false;
                drawBoard()
            }
        })
        })
    })
    document.querySelectorAll("#black").forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.parentNode.getAttribute("data-row");
        let moveCol = event.target.parentNode.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                blackFigures.push(board[moveRow][moveCol][0])
                board[moveRow][moveCol][0] = whiteStrategy;
                board[pawnRow][pawnCol][0] = null;
                turn = false;
                eatenBoard();
                drawBoard()
            }
        })
        })
    })
    }
}

const blackBishopMove = (event) => {
    if (!turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
        let pawnCol = event.target.parentNode.getAttribute("data-col");
        let allMoves = [];
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol - i;
            if (newRow >= 0 && newCol >= 0 ) {
                allMoves.push([newRow, newCol]);
                if ( board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow + i;
            let newCol = +pawnCol + i;
            if (newRow < 8 && newCol < 8 ) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol + i;
            if (newRow >= 0 && newCol < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            newRow = +pawnRow + i;
            newCol = +pawnCol - i;
            if (newRow < 8 && newCol >= 0) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
    const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
        return !field.innerHTML;
    });
        emptyFields.forEach(field => {
        field.addEventListener("click", (event) => {
            whiteCrownBoard.blackBishop = [
                [[false],[false],[false],[false],[false],[false],[false],[false]],
                [[false],[false],[false],[false],[false],[false],[false],[false]],
                [[false],[false],[false],[false],[false],[false],[false],[false]],
                [[false],[false],[false],[false],[false],[false],[false],[false]],
                [[false],[false],[false],[false],[false],[false],[false],[false]],
                [[false],[false],[false],[false],[false],[false],[false],[false]],
                [[false],[false],[false],[false],[false],[false],[false],[false]],
                [[false],[false],[false],[false],[false],[false],[false],[false]]
            ]
            console.log(whiteCrownBoard.blackBishop);
        let moveRow = event.target.getAttribute("data-row");
        let moveCol = event.target.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                for (let i = 1; i <= 7; i++) {
                    let newRow = +(moveRow) - i;
                    let newCol = +(moveCol) - i;
                    if (newRow >= 0 && newCol >= 0 ) {
                        whiteCrownBoard.blackBishop[newRow][newCol][0] = true;
                    }
                }
                for (let i = 1; i <= 7; i++) {
                    let newRow = +(moveRow) + i;
                    let newCol = +(moveCol) + i;
                    if (newRow < 8 && newCol < 8 ) {
                        whiteCrownBoard.blackBishop[newRow][newCol][0] = true;
                    }
                }
                for (let i = 1; i <= 7; i++) {
                    let newRow = +(moveRow) - i;
                    let newCol = +(moveCol) + i;
                    if (newRow >= 0 && newCol < 8) {
                        whiteCrownBoard.blackBishop[newRow][newCol][0] = true;
                    }
                }
                for (let i = 1; i <= 7; i++) {
                    newRow = +(moveRow) + i;
                    newCol = +(moveCol) - i;
                    if (newRow < 8 && newCol >= 0) {
                        whiteCrownBoard.blackBishop[newRow][newCol][0] = true;
                    }
                }
                board[moveRow][moveCol][0] = blackBishop;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                drawBoard();
            }
        })
        })
    })
    document.querySelectorAll("#white").forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.parentNode.getAttribute("data-row");
        let moveCol = event.target.parentNode.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                whiteFigures.push(board[moveRow][moveCol][0])
                board[moveRow][moveCol][0] = blackBishop;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                eatenBoard()
                drawBoard()
            }
        })
        })
    })
    }
}

function whiteBishopMove(event) {
    if (turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
        let pawnCol = event.target.parentNode.getAttribute("data-col");
        let allMoves = [];
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol - i;
            if (newRow >= 0 && newCol >= 0) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow + i;
            let newCol = +pawnCol + i;
            if (newRow < 8 && newCol < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol + i;
            if (newRow >= 0 && newCol < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            newRow = +pawnRow + i;
            newCol = +pawnCol - i;
            if (newRow < 8 && newCol >= 0) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
            return !field.innerHTML;
        });
        emptyFields.forEach(field => {
            field.addEventListener("click", (event) => {
                let moveRow = event.target.getAttribute("data-row");
                let moveCol = event.target.getAttribute("data-col");
                allMoves.forEach(([row, col]) => {
                    board[row][col][1] = false;
                });
                allMoves.forEach(move => {
                    if (move[0] == moveRow && move[1] == moveCol) {
                        board[moveRow][moveCol][0] = whiteBishop;
                        board[pawnRow][pawnCol][0] = null;
                        turn = false;
                        drawBoard();
                    }
                });
            });
        });
        document.querySelectorAll("#black").forEach(field => {
            field.addEventListener("click", (event) => {
                let moveRow = event.target.parentNode.getAttribute("data-row");
                let moveCol = event.target.parentNode.getAttribute("data-col");
                allMoves.forEach(move => {
                    if (move[0] == moveRow && move[1] == moveCol) {
                        blackFigures.push(board[moveRow][moveCol][0]);
                        board[moveRow][moveCol][0] = whiteBishop;
                        board[pawnRow][pawnCol][0] = null;
                        turn = false;
                        eatenBoard();
                        drawBoard();
                    }
                });
            });
        });
    }
}

const blackRookMove = (event) => {
    if (!turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
        let pawnCol = event.target.parentNode.getAttribute("data-col");
        let allMoves = [];
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow;
            let newCol = +pawnCol - i;
            if (newCol >= 0) {
                allMoves.push([newRow, newCol]);
                if ( board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow;
            let newCol = +pawnCol + i;
            if (newCol < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol;
            if (newRow >= 0) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            newRow = +pawnRow + i;
            newCol = +pawnCol;
            if (newRow < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
    const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
        return !field.innerHTML;
    });
        emptyFields.forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.getAttribute("data-row");
        let moveCol = event.target.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                board[moveRow][moveCol][0] = blackRook;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                drawBoard()
            }
        })
        })
    })
    document.querySelectorAll("#white").forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.parentNode.getAttribute("data-row");
        let moveCol = event.target.parentNode.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                whiteFigures.push(board[moveRow][moveCol][0])
                board[moveRow][moveCol][0] = blackRook;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                eatenBoard()
                drawBoard()
            }
        })
        })
    })
    }
}

const whiteRookMove = (event) => {
    if (turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
        let pawnCol = event.target.parentNode.getAttribute("data-col");
        let allMoves = [];
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow;
            let newCol = +pawnCol - i;
            if (newCol >= 0) {
                allMoves.push([newRow, newCol]);
                if ( board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow;
            let newCol = +pawnCol + i;
            if (newCol < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol;
            if (newRow >= 0) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            newRow = +pawnRow + i;
            newCol = +pawnCol;
            if (newRow < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
    const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
        return !field.innerHTML;
    });
        emptyFields.forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.getAttribute("data-row");
        let moveCol = event.target.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                board[moveRow][moveCol][0] = whiteRook;
                board[pawnRow][pawnCol][0] = null;
                turn = false;
                drawBoard()
            }
        })
        })
    })
    document.querySelectorAll("#black").forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.parentNode.getAttribute("data-row");
        let moveCol = event.target.parentNode.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                blackFigures.push(board[moveRow][moveCol][0]);
                board[moveRow][moveCol][0] = whiteRook;
                board[pawnRow][pawnCol][0] = null;
                turn = false;
                eatenBoard()
                drawBoard()
            }
        })
        })
    })
    }
}

const blackQueenMove = (event) => {
    if (!turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
        let pawnCol = event.target.parentNode.getAttribute("data-col");
        let allMoves = [];
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow;
            let newCol = +pawnCol - i;
            if (newCol >= 0) {
                allMoves.push([newRow, newCol]);
                if ( board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow;
            let newCol = +pawnCol + i;
            if (newCol < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol;
            if (newRow >= 0) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            newRow = +pawnRow + i;
            newCol = +pawnCol;
            if (newRow < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol - i;
            if (newRow >= 0 && newCol >= 0 ) {
                allMoves.push([newRow, newCol]);
                if ( board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow + i;
            let newCol = +pawnCol + i;
            if (newRow < 8 && newCol < 8 ) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol + i;
            if (newRow >= 0 && newCol < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            newRow = +pawnRow + i;
            newCol = +pawnCol - i;
            if (newRow < 8 && newCol >= 0) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
    const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
        return !field.innerHTML;
    });
        emptyFields.forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.getAttribute("data-row");
        let moveCol = event.target.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                board[moveRow][moveCol][0] = blackQueen;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                drawBoard()
            }
        })
        })
    })
    document.querySelectorAll("#white").forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.parentNode.getAttribute("data-row");
        let moveCol = event.target.parentNode.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                whiteFigures.push(board[moveRow][moveCol][0])
                board[moveRow][moveCol][0] = blackQueen;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                eatenBoard()
                drawBoard()
            }
        })
        })
    })
    }
}

const whiteQueenMove = (event) => {
    if (turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
        let pawnCol = event.target.parentNode.getAttribute("data-col");
        let allMoves = [];
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow;
            let newCol = +pawnCol - i;
            if (newCol >= 0) {
                allMoves.push([newRow, newCol]);
                if ( board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow;
            let newCol = +pawnCol + i;
            if (newCol < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol;
            if (newRow >= 0) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            newRow = +pawnRow + i;
            newCol = +pawnCol;
            if (newRow < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol - i;
            if (newRow >= 0 && newCol >= 0 ) {
                allMoves.push([newRow, newCol]);
                if ( board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow + i;
            let newCol = +pawnCol + i;
            if (newRow < 8 && newCol < 8 ) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            let newRow = +pawnRow - i;
            let newCol = +pawnCol + i;
            if (newRow >= 0 && newCol < 8) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
        for (let i = 1; i <= 7; i++) {
            newRow = +pawnRow + i;
            newCol = +pawnCol - i;
            if (newRow < 8 && newCol >= 0) {
                allMoves.push([newRow, newCol]);
                if (board[newRow][newCol][0] !== null) {
                    break;
                }
            }
        }
    const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
        return !field.innerHTML;
    });
        emptyFields.forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.getAttribute("data-row");
        let moveCol = event.target.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                board[moveRow][moveCol][0] = whiteQueen;
                board[pawnRow][pawnCol][0] = null;
                turn = false;
                drawBoard()
            }
        })
        })
    })
    document.querySelectorAll("#black").forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.parentNode.getAttribute("data-row");
        let moveCol = event.target.parentNode.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                blackFigures.push(board[moveRow][moveCol][0]);
                board[moveRow][moveCol][0] = whiteQueen;
                board[pawnRow][pawnCol][0] = null;
                turn = false;
                eatenBoard()
                drawBoard()
            }
        })
        })
    })
    }
}

const blackCrownMove = (event) => {
    if (!turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
        let pawnCol = event.target.parentNode.getAttribute("data-col");
        let allMoves = [
            [+pawnRow + 1,+pawnCol + 1],
            [+pawnRow - 1, +pawnCol - 1],
            [+pawnRow - 1, +pawnCol + 1],
            [+pawnRow + 1, +pawnCol - 1],
            [+pawnRow, +pawnCol + 1],
            [+pawnRow, +pawnCol - 1],
            [+pawnRow + 1, +pawnCol],
            [+pawnRow - 1, +pawnCol]
        ];
        allMoves = allMoves.filter(([row,col]) => {
            return row >= 0 &&
                col >= 0 &&
                row < 8 &&
                col < 8 &&
                (board[row][col][1] != true) 
        })
        
        const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
            return !field.innerHTML;
        });
        emptyFields.forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.getAttribute("data-row");
        let moveCol = event.target.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                board[moveRow][moveCol][0] = blackCrown;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                drawBoard()
            }
        })
        })
    })
    document.querySelectorAll("#white").forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.parentNode.getAttribute("data-row");
        let moveCol = event.target.parentNode.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                whiteFigures.push(board[moveRow][moveCol][0])
                board[moveRow][moveCol][0] = blackCrown;
                board[pawnRow][pawnCol][0] = null;
                turn = true;
                eatenBoard()
                drawBoard()
            }
        })
        })
    })
    }
}

const whiteCrownMove = (event) => {
    if (turn) {
        let pawnRow = event.target.parentNode.getAttribute("data-row");
        let pawnCol = event.target.parentNode.getAttribute("data-col");
        let allMoves = [
            [+pawnRow + 1,+pawnCol + 1],
            [+pawnRow - 1, +pawnCol - 1],
            [+pawnRow - 1, +pawnCol + 1],
            [+pawnRow + 1, +pawnCol - 1],
            [+pawnRow, +pawnCol + 1],
            [+pawnRow, +pawnCol - 1],
            [+pawnRow + 1, +pawnCol],
            [+pawnRow - 1, +pawnCol]
        ];
    const emptyFields = Array.from(document.querySelectorAll(".field")).filter((field) => {
        return !field.innerHTML;
    });
        emptyFields.forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.getAttribute("data-row");
        let moveCol = event.target.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                board[moveRow][moveCol][0] = whiteCrown;
                board[pawnRow][pawnCol][0] = null;
                turn = false;
                drawBoard()
            }
        })
        })
    })
    document.querySelectorAll("#black").forEach(field => {
        field.addEventListener("click", (event) => {
        let moveRow = event.target.parentNode.getAttribute("data-row");
        let moveCol = event.target.parentNode.getAttribute("data-col");
        allMoves.forEach(move => {
            if (move[0] == moveRow && move[1] == moveCol) {
                blackFigures.push(board[moveRow][moveCol][0])
                board[moveRow][moveCol][0] = whiteCrown;
                board[pawnRow][pawnCol][0] = null;
                turn = false;
                eatenBoard()
                drawBoard()
            }
        })
        })
    })
    }
}

drawBoard();