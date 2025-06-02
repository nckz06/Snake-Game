// Variáveis GLOBAIS
let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right';
let fruit = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let score = 0
let maxScore = 0
let spanMaxScore = document.getElementById('max-score')
let spanScore = document.getElementById('score')

/* Áreas das Funções */
// Cria background para o canvas
function criarBG() {
    context.fillStyle = 'lightgreen'
    context.fillRect(0, 0, 16 * box, 16 * box)
}

// Cria a cobrinha
function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = 'green'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function update(event) {
    if (event.key == 'ArrowRight' && direction != 'left') {
        direction = 'right'
    } else if (event.key == 'ArrowLeft' && direction != 'right') {
        direction = 'left'
    } else if (event.key == 'ArrowUp' && direction != 'down') {
        direction = 'up'
    } else if (event.key == 'ArrowDown' && direction != 'up') {
        direction = 'down'
    }
}

document.addEventListener('keydown', update)

function drawFruit() {
    context.fillStyle = 'red'
    context.fillRect(fruit.x, fruit.y, box, box)
}

// Chama as funções para funcionalidade do jogo
function startGame() {
    // verifica se a cabeça da cobra colidiu com o corpo
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo)
            alert('Game Over!')
        }
    }

    // reposiona a cobra de acordo com sua posição no canvas
    if (snake[0].x > 15 * box && direction == 'right') {
        snake[0].x = 0
    } else if (snake[0].x < 0 && direction == 'left') {
        snake[0].x = 16 * box
    } else if (snake[0].y > 15 * box && direction == 'down') {
        snake[0].y = 0
    } else if (snake[0].y < 0 && direction == 'up') {
        snake[0].y = 16 * box
    }

    // chama as funcionalidades do jogo
    criarBG()
    criarCobrinha()
    drawFruit()

    // define as direções da cobra
    let snakeX = snake[0].x 
    let snakeY = snake[0].y

    if (direction == 'right') {
        snakeX += box
    } else 
    if (direction == 'left') {
        snakeX -= box
    } else 
    if (direction == 'up') {
        snakeY -= box
    } else 
    if (direction == 'down') {
        snakeY += box
    }

    // condição para aumentar o tamanho da cobra ou permanecer igual
    if (snakeX != fruit.x || snakeY != fruit.y) {
        snake.pop();
    } 
    else {
        fruit.x = Math.floor(Math.random() * 15 + 1) * box
        fruit.y = Math.floor(Math.random() * 15 + 1) * box
        score++;
        spanScore.innerHTML = `Pontuação: ${score}`
    }

    // redesenha a cobra sobre os novos moldes
    let newHead = {x: snakeX, y: snakeY}
    snake.unshift(newHead)
}

function gameOver() {
    if (score > maxScore) {
        maxScore = score
        spanMaxScore.innerHTML = `Maior Pontuação: ${maxScore}`
        save(maxScore)
    }

    score = 0;
    snake = []
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    }
    direction = 'right'
    spanScore.innerHTML = `Pontuação: ${score}`
    fruit = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }

    jogo = setInterval(startGame, 100)
}

function save(maxScore) {
    if (window.localStorage) {
        localStorage.snake_maxScore = maxScore
    }
}

// tenta restaurar os campos de entrada automaticamente quando o documento é carregado pela primeira vez
window.onload = function() {
    // se o navegador suporta localStorage e temos alguns dados armazenados
    if (window.localStorage && localStorage.snake_maxScore) {
        maxScore = localStorage.snake_maxScore
        spanMaxScore.innerHTML = `Maior Pontuação: ${maxScore}`
    }
}

let jogo = setInterval(startGame, 100);