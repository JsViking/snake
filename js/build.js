var timer = 0;
var direct = 0;
var directX = 0;
var score = 0;

var direction = {
    axisX: [0,1],
    axisY: [1,0], 
} 

var field = {
    //размер поля
    fieldSizeX: 20,
    fieldSizeY: 20,

    //cоздание поля
    makeField: function() {
        for (let i =0; i < this.fieldSizeX; i++) {
            let column = document.createElement('div');
            document.body.appendChild(column);
            column.setAttribute("class", "table");

            for (let j = 0; j < this.fieldSizeY; j++) {
                let cell = document.createElement('div');
                column.appendChild(cell);
                cell.setAttribute("class", "cell");
                cell.id = i+','+j;
            }      
        }

        snake.makeSnake();
        food();
    }
};

var snake = {
    speed: 300,
    length: 3,
    snakeBody: [[8,1], [8,2], [8,3]],

    //Создание змейки на поле
    makeSnake: function() {
        for (let i = 0; i < this.length; i++) {
            let snakePart = this.snakeBody[i];
            snakePart = snakePart.toString();
            document.getElementById(snakePart).className = "cell snake";
        }
    },

    moveSnake: function() {
        direct = directX;
        let body = this.snakeBody;
        let head = body[this.length - 1];
        head = head.toString();
        let step = nextStep(head, direct);
        gameCore(step, body);
        return step;
    }
};

function gameCore(step, body) {
    let location = document.getElementById(step);

    if  (location == null || location.className == "cell snake") {
        clearInterval(timer);
        document.getElementById("menu-wrapper").className = "";
        document.getElementById("endGameScore").innerHTML = "Очки: " + score;

    } else if (location.className == "cell food") {
        location.className ="cell";
        snake.length++;
        body.push(step);
        document.getElementById(step).className = "cell snake";
        food();
        score++;
        snake.speed = snake.speed - 10;
        document.getElementById("score").innerHTML = "Очки: " + score;

    } else if (location != null && location.className == "cell") {
        let deleteBody = body.shift();
        body.push(step);
        document.getElementById(deleteBody.toString()).className = "cell";
        document.getElementById(step).className = "cell snake";
    }
};

//Расчет следующкго шага в зависимости от направления direction, заданнаго нажатием клавиш в переменной direct
function nextStep(head, direct) {
    if (direct == 0) {
        let headStrX = parseInt(head);
        let headStrY = parseInt(head.substring((head.indexOf(",")+1), (head.length)));
        let right = direction.axisX.toString();
        let rightX = parseInt(right);
        let rightY = parseInt(right.substring((right.indexOf(",")+1), (right.length)));

        return (headStrX + rightX) + "," +(headStrY + rightY);

    } else if (direct == 1) {

        let headStrX = parseInt(head);
        let headStrY = parseInt(head.substring((head.indexOf(",")+1), (head.length)));
        let down = direction.axisY.toString();
        let downX = parseInt(down);
        let downY = parseInt(down.substring((down.indexOf(",")+1), (down.length)));

        return (headStrX + downX) + "," +(headStrY + downY);

    } else if (direct == 2) {

        let headStrX = parseInt(head);
        let headStrY = parseInt(head.substring((head.indexOf(",")+1), (head.length)));
        let left = direction.axisX.toString();
        let leftX = parseInt(left);
        let leftY = parseInt(left.substring((left.indexOf(",")+1), (left.length)));

        return (headStrX + leftX) + "," +(headStrY - leftY);       
    } else if (direct == 3) {

        let headStrX = parseInt(head);
        let headStrY = parseInt(head.substring((head.indexOf(",")+1), (head.length)));
        let up = direction.axisY.toString();
        let upX = parseInt(up);
        let upY = parseInt(up.substring((up.indexOf(",")+1), (up.length)));

        return (headStrX - upX) + "," +(headStrY + upY);
    }
};

function food() {
    let x = Math.floor(Math.random() * field.fieldSizeX);
    let y = Math.floor(Math.random() * field.fieldSizeY);
    let xy = x+','+y;
    let elem = document.getElementById(xy);
    if (elem.className == "cell") {
        elem.className = "cell food";
    } else {
        food();
    }
};

function buttonReload() {
    let elem = document.getElementById("button");
    elem.addEventListener("click", function() {
        window.location.reload();
    });
}

function keyHandler(event) {
    switch (event.keyCode) {
        case 37: //влево
            if (direct != 0) {
                directX = 2;
            }     
            break;
        case 39: //вправо
            if (direct != 2) {
                directX = 0;
            }
            break;
        case 38: //вверх
            if (direct != 1) {
                directX = 3;
            }
            break;
        case 40: //вниз
            if (direct != 3) {
                directX = 1;
            }
            break;
        default :
            return;
    }
};



function run() {
    timer = setInterval(function(){
        snake.moveSnake();
    }, snake.speed);
};

function init() {
    buttonReload();
    window.addEventListener('keydown', keyHandler, false);
    keyHandler(event);
    field.makeField();
    run();
};


window.onload = init;