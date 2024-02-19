function resetGameStatus(){
    activePlayer = 0;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML = 'You Won, <span id="winner">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';


    let gameBoardIndex = 0;
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            gameData[i][j]=0;
            const gameBoardItemElement = gameboardElement.children[gameBoardIndex];
            gameboardElement.children[gamebBoardIndex].textContent = '';
            gameBoardItemElement.classList.remove('disabled');
            gamebBoardIndex++;
        }
    }
}




function startNewGame(){
    if(players[0].name === '' || players[1].name === ''){
        alert('Please set custom player names for both the players!')
        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = player[activePlayer].name;
    gameAreaElement.style.display='block';

}

function switchPlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
    }else{
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = player[activePlayer].name;
}
function selectGameField(event){
  
    if(event.target.tagName !==  'LI' || gameIsOver){
        return;
    }


    const selectedColumn = selectedField.dataset.col-1;
    const selectedColumn = selectedField.dataset.row-1;

    if(gameData[selectedRow][slectedColumn]>0){
        alert('please select an empty field!');
        return;
    }




    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');
    

    gameData[selectedRow][selectedColumn] = activePlayer + 1 ;
    console.log(gameData);

    const winnerId = checkForGameOver;
    //console.log(winnerId);//
    if(winnerId !== 0){
        endGame(winnerId);
    }


    currentRound++;

    



    switchPlayer();
}

function checkForGameOver(){
//checking rows for equality
    for(let i =0; i < 3; i++){
    if (gameData[i][0] > 0 && 
        gameData[i][0]=== gameData[i][1] && 
        gameData[i][1] === gameData[i][2]
        ){
        return gameData[0][0];
    }
}
//checking columns for equality
    for(let i = 0; i<3; i++){
    if(
        gameData[0][i] > 0 &&
        gameData[0][i] === gameData[1][i] &&
        gameData[0][i] === gameData[2][i]
    ){
        return gameData[0][i];
    }
}
    //Diagonal : top left to bottom right
    if(gameData[0][0] > 0 && gameData[0][0] === [1][1] &&
        gameData[1][1] === gameData[2][2]
        ){
            return gameData[0][0];
        }
    //Diagonal : bottom left to top right
    
    if(gameData[2][0] > 0 &&
        gameData[2][0] === [1][1] &&
        gameData[1][1] === gameData[0][2]
        ){
            return gameData[2][0];
        }

    return 0;

    if(currentRound === 9){
        return -1;
    }
    return 0;

    
}
function endGame(winnerId){
    gameOverElement.style.display = 'block';
    gameIsOver = true;

    if(winnerId>0){
        const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    }else{
        gameOverElement.firstElementChild.textContent = 'It\' a draw!'
    }
    
}