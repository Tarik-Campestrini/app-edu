
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const actionLog = document.getElementById('action-log'); // Novo elemento para exibir as ações
const codeLog = document.getElementById('code-log'); // Novo elemento para exibir o código
let x = canvas.width / 2;
let y = canvas.height / 2;
let angle = 0;
let drawing = true; // O personagem desenha ao se mover
let color = '#000000';

function drawCircle() {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI); // Desenha um círculo de raio 10
    ctx.fill();
}

function drawLine(newX, newY) {
    if (drawing) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(newX, newY);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1; // Linha fina
        ctx.stroke();
    }
    x = newX;
    y = newY;
    drawCircle(); // Desenha o personagem na nova posição
}

function moveForward(pixels) {
    const newX = x + pixels * Math.cos(angle);
    const newY = y + pixels * Math.sin(angle);
    if (isWithinBounds(newX, newY)) {
        drawLine(newX, newY);
        logAction(`Moveu para frente ${pixels} pixels`);
        logCode(`moveForward(${pixels});`);
    } else {
        alert('Você atingiu a borda do canvas!');
    }
}

function moveBackward(pixels) {
    const newX = x - pixels * Math.cos(angle);
    const newY = y - pixels * Math.sin(angle);
    if (isWithinBounds(newX, newY)) {
        drawLine(newX, newY);
        logAction(`Moveu para trás ${pixels} pixels`);
        logCode(`moveBackward(${pixels});`);
    } else {
        alert('Você atingiu a borda do canvas!');
    }
}

function turnLeft(degrees) {
    angle -= degrees * Math.PI / 180;
    logAction(`Virou à esquerda ${degrees} graus`);
    logCode(`turnLeft(${degrees});`);
}

function turnRight(degrees) {
    angle += degrees * Math.PI / 180;
    logAction(`Virou à direita ${degrees} graus`);
    logCode(`turnRight(${degrees});`);
}

function changeColor(newColor) {
    color = newColor;
    const colorName = getColorName(newColor);
    logAction(`Mudou a cor para ${newColor} (${colorName})`);
    logCode(`changeColor('${newColor}');`);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x = canvas.width / 2;
    y = canvas.height / 2;
    angle = 0;
    drawCircle(); // Redesenha o personagem na posição inicial
    logAction('Canvas limpo e personagem reposicionado');
    logCode('clearCanvas();');
}

function isWithinBounds(newX, newY) {
    return newX >= 10 && newX <= canvas.width - 10 && newY >= 10 && newY <= canvas.height - 10;
}

function executeCommand() {
    const command = document.getElementById('command').value.trim();
    const parts = command.split(' ');

    for (let i = 0; i < parts.length; i++) {
        const action = parts[i];
        const value = parts[i + 1];

        switch(action) {
            case 'pf':
                moveForward(parseInt(value));
                i++;
                break;
            case 'pt':
                moveBackward(parseInt(value));
                i++;
                break;
            case 'pe':
                turnLeft(parseInt(value));
                i++;
                break;
            case 'pd':
                turnRight(parseInt(value));
                i++;
                break;
            case 'cor':
                changeColor(value);
                i++;
                break;
            case 'apague':
                if (value === 'tudo') {
                    clearCanvas();
                    i++;
                } else {
                    alert('Comando desconhecido');
                }
                break;
            default:
                alert('Comando desconhecido');
        }
    }
}

function logAction(action) {
    const actionElement = document.createElement('p');
    actionElement.textContent = action;
    actionLog.appendChild(actionElement);
}

function logCode(code) {
    const codeElement = document.createElement('pre');
    codeElement.textContent = code;
    codeLog.appendChild(codeElement);
}

function getColorName(hex) {
    const colors = {
        '#000000': 'Preto',
        '#FFFFFF': 'Branco',
        '#FF0000': 'Vermelho',
        '#00FF00': 'Verde',
        '#0000FF': 'Azul',
        '#FFFF00': 'Amarelo',
        '#FFA500': 'Laranja',
        '#800080': 'Roxo',
        '#00FFFF': 'Ciano',
        '#FFC0CB': 'Rosa',
        '#A52A2A': 'Marrom',
        '#808080': 'Cinza',
        '#008000': 'Verde Escuro',
        '#800000': 'Vermelho Escuro',
        '#808000': 'Oliva',
        '#ADD8E6': 'Azul Claro',
        '#F08080': 'Coral Claro',
        '#FFD700': 'Dourado',
        '#DAA520': 'Dourado Escuro',
        '#4B0082': 'Índigo'
    };
    return colors[hex.toUpperCase()] || 'Cor desconhecida';
}

// Desenha o personagem na posição inicial
drawCircle();


