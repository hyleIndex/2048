// number of the cell
const CELL_SIZE = 80;
const marg = Math.floor(CELL_SIZE / 10);
const MOVE_TIME = 200;
let WIDTH = 4; HEIGHT = 4;

let board = new Array();
let score = 0;
let maxScore = 0;

window.onload = function() {
    let n = this.prompt("HEIGHT:")
    HEIGHT = n
    let m = this.prompt("WIDTH:")
    WIDTH = m
    init();
    updateScreen();
    creatRandomCell();
    creatRandomCell();
}

window.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37: moveLeft(); break;
        case 39: moveRight(); break;
        case 38: moveUp(); break;
        case 40: moveDown(); break;
    }

    if (isOver()) {
        this.alert('Game Over');
    }
}

function restart() {
    let n = this.prompt("HEIGHT:")
    HEIGHT = n
    let m = this.prompt("WIDTH:")
    WIDTH = m
    $('.cell').remove();
    score = 0;
    $('.now').text(score);
    board = new Array();
    init();
    updateScreen();
    creatRandomCell();
    creatRandomCell();
}

function updateScore() {
    maxScore = Math.max(maxScore, score);
    $('.now').text(score);
    $('.best').text(maxScore);
}

function canMoveDown() {
    for (let i = HEIGHT - 2; i >= 0; i--) {
        for (let j = 0; j < WIDTH; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }                
            }
        }
    }
    return false;
}

function moveDown() {
    if (!canMoveDown()) {
        return false;
    }
    for (let i = HEIGHT - 2; i >= 0; i--) {
        for (let j = 0; j < WIDTH; j++) {
            if (board[i][j] == 0) {
                continue;
            }
            for (let k = HEIGHT - 1; k > i; k--) {
                if (!cleenOnCol(j, i, k))
                    continue;
                if (board[i][j] == board[k][j]) {
                    board[k][j] *= 2;
                    board[i][j] = 0;
                    score += board[k][j];
                    updateScore(score);
                    moveCell(i, j, k, j);
                }
                if (board[k][j] == 0) {
                    board[k][j] = board[i][j];
                    board[i][j] = 0;
                    moveCell(i, j, k, j);
                }
            }
        }
    }
    setTimeout('updateScreen()', MOVE_TIME);
    setTimeout('creatRandomCell()', MOVE_TIME);
    return true;
}

function canMoveUp() {
    for (let i = 1; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i][j] == board[i - 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function moveUp() {
    if (!canMoveUp()) {
        return false;
    }
    for (let i = 1; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if (board[i][j] == 0) {
                continue;
            }
            for (let k = 0; k < i; k++) {
                if (!cleenOnCol(j, k, i))
                    continue;
                if (board[i][j] == board[k][j]) {
                    board[k][j] *= 2;
                    board[i][j] = 0;
                    score += board[k][j];
                    updateScore(score);
                    moveCell(i, j, k, j);
                }
                if (board[k][j] == 0) {
                    board[k][j] = board[i][j];
                    board[i][j] = 0;
                    moveCell(i, j, k, j);
                }
            }
        }
    }
    setTimeout('updateScreen()', MOVE_TIME);
    setTimeout('creatRandomCell()', MOVE_TIME);
    return true;
}

function canMoveRight() {
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = WIDTH - 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function moveRight() {
    if (!canMoveRight()) {
        return false;
    }
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = WIDTH - 2; j >= 0; j--) {
            if (board[i][j] == 0) {
                continue;
            }
            for (let k = WIDTH - 1; k > j; k--) {
                if (!cleenOnRow(i, j, k))
                    continue;
                if (board[i][j] == board[i][k]) {
                    board[i][k] *= 2;
                    board[i][j] = 0;
                    score += board[i][k];
                    updateScore(score);
                    moveCell(i, j, i, k);
                }
                if (board[i][k] == 0) {
                    board[i][k] = board[i][j];
                    board[i][j] = 0;
                    moveCell(i, j, i, k);
                }
            }
        }
    }
    setTimeout('updateScreen()', MOVE_TIME);
    setTimeout('creatRandomCell()', MOVE_TIME);
    return true;
}

function canMoveLeft() {
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 1; j < WIDTH; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function moveLeft() {
    if (!canMoveLeft()) {
        return false;
    }
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 1; j < WIDTH; j++) {
            if (board[i][j] == 0) {
                continue;
            }
            for (let k = 0; k < j; k++) {
                if (!cleenOnRow(i, k, j))
                    continue;
                if (board[i][j] == board[i][k]) {
                    board[i][k] *= 2;
                    board[i][j] = 0;
                    score += board[i][k];
                    updateScore(score);
                    moveCell(i, j, i, k);
                }
                if (board[i][k] == 0) {
                    board[i][k] = board[i][j];
                    board[i][j] = 0;
                    moveCell(i, j, i, k);
                }
            }
        }
    }
    setTimeout('updateScreen()', MOVE_TIME);
    setTimeout('creatRandomCell()', MOVE_TIME);
    return true;
}

function cleenOnRow(r, l1, l2) {
    for (let i = l1 + 1; i < l2; i++) {
        if (board[r][i] != 0){
            return false;
        }
    }
    return true;
}

function cleenOnCol(l, r1, r2) {
    for (let i = r1 + 1; i < r2; i++) {
        if (board[i][l] != 0){
            return false;
        }
    }
    return true;
}

function isOver() {
    return !(canMoveUp() || canMoveDown() || canMoveRight() || canMoveLeft()); 
}

function getTopDis(i, j) {
    return i * (CELL_SIZE + marg) + marg;
}

function getLeftDis(i, j) {
    return j * (CELL_SIZE + marg) + marg;
}

function init() {
    $('#game').css('width', WIDTH * (CELL_SIZE + marg) + marg);
    $('#game').css('height', HEIGHT * (CELL_SIZE + marg) + marg);
    for (let i  = 0; i < HEIGHT; i++) {
        board[i] = new Array()
        for (let j = 0; j < WIDTH; j++) {
            board[i][j] = 0;
            $('#game').append('<div class = "cell-init" id = "init-' + i + '-' + j +'"></div');
            $('#init-' + i + '-' + j).css('width', CELL_SIZE);
            $('#init-' + i + '-' + j).css('height', CELL_SIZE);
            $('#init-' + i + '-' + j).css('top', getTopDis(i, j));
            $('#init-' + i + '-' + j).css('left', getLeftDis(i, j));
        }
    }
    score = 0;
}

function updateScreen() {
    $('.cell').remove();
    for (let i  = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            $('#game').append('<div class = "cell" id = "c-' + i + '-' + j +'"></div');
            if (board[i][j] == 0) {
                $('#c-' + i + '-' + j).css('width', 0);
                $('#c-' + i + '-' + j).css('height', 0);
                $('#c-' + i + '-' + j).css('top', getTopDis(i, j) + CELL_SIZE / 2);
                $('#c-' + i + '-' + j).css('left', getLeftDis(i, j) + CELL_SIZE / 2);
            } else {
                $('#c-' + i + '-' + j).css('width', CELL_SIZE);
                $('#c-' + i + '-' + j).css('height', CELL_SIZE);
                $('#c-' + i + '-' + j).css('top', getTopDis(i, j));
                $('#c-' + i + '-' + j).css('left', getLeftDis(i, j));
                $('#c-' + i + '-' + j).css('font-size', CELL_SIZE / 2.5);
                $('#c-' + i + '-' + j).css('line-height', CELL_SIZE + 'px');
                $('#c-' + i + '-' + j).css('background-color', getColor(board[i][j]));
                $('#c-' + i + '-' + j).text(board[i][j]);
            }
        }
    }
}

function moveCell(i, j, i1, j1) {
    $('#c-' + i + '-' + j).animate({
        top : getTopDis(i1, j1),
        left : getLeftDis(i1, j1),
    }, MOVE_TIME)
}

function getColor(number) {
    switch (number) {
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#9c0"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#09c"; break;
        case 4096: return "#a6c"; break;
        case 8192: return "#93c"; break;
        default: return 'break';
    }
}

function creatRandomCell() {
    let i, j;
    let times = 0
    while (times < HEIGHT * WIDTH * 100) {
        i = Math.floor(Math.random() * HEIGHT);
        j = Math.floor(Math.random() * WIDTH);
        if (board[i][j] == 0) {
            board[i][j] = Math.random() < 0.5 ? 2 : 4;
            $('#c-' + i + '-' + j).css('font-size', CELL_SIZE / 2.5);
            $('#c-' + i + '-' + j).css('line-height', CELL_SIZE + 'px');
            $('#c-' + i + '-' + j).css('background-color', getColor(board[i][j]));
            $('#c-' + i + '-' + j).text(board[i][j]);
            $('#c-' + i + '-' + j).animate({
                width: CELL_SIZE,
                height: CELL_SIZE,
                top: getTopDis(i, j),
                left: getLeftDis(i, j),
            }, MOVE_TIME)
            break;
        }
        times++;
    }
    if (times == HEIGHT * WIDTH * 100) {
        for (i = 0; i < HEIGHT; i++) {
            for (j = 0; j < WIDTH; j++) {
                if (board[i][j] == 0) {
                    board[i][j] = Math.random() < 0.5 ? 2 : 4;
                    $('#c-' + i + '-' + j).css('font-size', CELL_SIZE / 2.5);
                    $('#c-' + i + '-' + j).css('line-height', CELL_SIZE + 'px');
                    $('#c-' + i + '-' + j).css('background-color', getColor(board[i][j]));
                    $('#c-' + i + '-' + j).text(board[i][j]);
                    $('#c-' + i + '-' + j).animate({
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        top: getTopDis(i, j),
                        left: getLeftDis(i, j),
                    }, MOVE_TIME)
                    break;
                }
            }
        }
    }
}