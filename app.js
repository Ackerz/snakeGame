document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('.score');
    const start = document.querySelector('.start');

    const width = 10;
    let indexAt = 0; // primeira div do grid
    let appleIndex = 0;
    let snakeAt = [2,1,0];
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;
    generateNewApple()

    function startGame(){
        generateNewApple()
        snakeAt.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0
        direction = 1;
        scoreDisplay.innerText = score
        intervalTime = 1000;
        snakeAt = [2,1,0];
        indexAt = 0;
        snakeAt.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime);
    }

    function moveOutcomes(){
        if((snakeAt[0] + width >= (width * width) && direction == width) ||
         (snakeAt[0] % width === width -1 && direction === 1) ||
         (snakeAt[0] % width === 0 && direction === -1) ||
         (snakeAt[0] - width < 0 && direction === -width) ||
         squares[snakeAt[0] + direction].classList.contains('snake')
        ){
            return clearInterval(interval)
        }
        const tail = snakeAt.pop();
        squares[tail].classList.remove('snake');
        snakeAt.unshift(snakeAt[0] + direction)
        
        if(squares[snakeAt[0]].classList.contains('apple')){
            squares[snakeAt[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            snakeAt.push(tail);
            score++
            generateNewApple()
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }
        squares[snakeAt[0]].classList.add('snake')
    }


    function generateNewApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake'))

        squares[appleIndex].classList.add('apple')
    }

    function control(e){
        squares[indexAt].classList.remove('snake');

        switch(e.keyCode) {
            case 39:
                direction = 1
            break;

            case 38:
                direction = -width
            break;
            case 37:
                direction = -1
            break;
            case 40:
                direction = +width
            break;
            default:
                console.log("Tecla incorreta")
                break;
        }
    }

    document.addEventListener('keyup', control)
    start.addEventListener('click', startGame)
})

