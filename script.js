

    let boardTiles = document.querySelectorAll('[data-index]')

    const gameBoard = ( ()=>{
    let tiles = ['','','','','','','','','']

    const addTile = (playerInput, position) =>{
        tiles.splice(position,1,playerInput);
        boardTiles[position].textContent=playerInput;
    }
    const getArray = () => {return tiles}
    const resetBoard = () =>{tiles=['','','','','','','','','']}
    return{addTile, getArray, resetBoard};

})();

const gameState = (()=>{
    let counter = 1
    let initialcounter = 1;
    const Increment = () =>{
        counter+=1;
    }
    const Input = () =>{
        if(counter%2 > 0){
            return(playerOne.input)
        }else{
            return(playerTwo.input)
        }
    }
    const getCounter =()=>{
        return(counter)
    }
    const counterReset = () => {
        if(initialcounter===1){counter = 0; initialcounter=0;}
        else if (initialcounter===0){counter = 1; initialcounter=1;}
       
    }
    return{Increment,Input,getCounter,counterReset,initialcounter}
})();


const player = (input, name) => {
    let playerBoard = ['','','','','','','','','']
    const getBoard = () => {return playerBoard};
    const addTile = (position) => {playerBoard.splice(position,1,'X');}
    boardReset = () => playerBoard = ['','','','','','','','',''];
    return {getBoard, input, addTile, name, boardReset}
}

const winCheck= (()=>{
    
})();

/*
[0] | [1] | [2]
____|_____|_____
[3] | [4] | [5]
____|_____|_____
[6] | [7] | [8]
    |     |
*/
const DOMboard = document.querySelector('.gameboard')
const winScreen = document.createElement('p');
const body = document.querySelector('body');
winScreen.classList.add("winscreen")
const resetButton = document.createElement('button');
resetButton.classList.add('reset')
resetButton.textContent = "RESET"


const verifyWin = (player) =>{


    winScreen.textContent = `${player.name} WINS!!!`


    const pA = player.getBoard();
    const win = 'XXX'
    const h1 = pA[0]+pA[1]+pA[2];
    const h2 = pA[3]+pA[4]+pA[5];
    const h3 = pA[6]+pA[7]+pA[8];
    const v1 = pA[0]+pA[3]+pA[6];
    const v2 = pA[1]+pA[4]+pA[7];
    const v3 = pA[2]+pA[5]+pA[8];
    const d1 = pA[0]+pA[4]+pA[8];
    const d2 = pA[2]+pA[4]+pA[6];
  /*
    if(JSON.stringify(playerArray) === JSON.stringify(['','','','','','','X','X','X'])){
        console.log(player.input, "wins");
        return true;
    }
    */
    if(h1 === win | h2 === win | h3 === win | v1 === win | v2 === win | v3 === win | d1 === win | d2 === win){
        console.log(player.input, "wins")
        //DOMboard.parentNode.replaceChild(winScreen, DOMboard);
        body.appendChild(resetButton);
        body.appendChild(winScreen);
        
    }else if(gameState.getCounter() === 9){
        winScreen.textContent = `TIE!`
        //DOMboard.parentNode.replaceChild(winScreen, DOMboard);
        body.appendChild(resetButton);
        body.appendChild(winScreen);
        
    }
}


oneName = document.querySelector(".inputone").value;
twoName = document.querySelector(".inputtwo").value;
console.log(twoName)

const playerOne = player('X',oneName);

const playerTwo = player('O',twoName);



let theBoard = document.querySelector(".gameboard")

theBoard.addEventListener("click", e=>{

    let tileSelect = e.target.getAttribute('data-index')
        console.log(gameState.Input())
        if(Array.from(e.target.textContent).length < 1 ){

            console.log("div data-index: ",tileSelect);

            gameBoard.addTile(gameState.Input(),tileSelect);
            
            console.log(gameBoard.getArray())
            
            if(gameState.Input()==="X"){
                playerOne.name = document.querySelector(".inputone").value;
                console.log("player 1 moved");
                playerOne.addTile(tileSelect);
                console.log(playerOne.getBoard());
                verifyWin(playerOne);

            } else if(gameState.Input() === "O"){
                playerTwo.name = document.querySelector(".inputtwo").value;
                console.log("player 2 moved");
                playerTwo.addTile(tileSelect);
                console.log(playerTwo.getBoard());
                verifyWin(playerTwo);
            }

            gameState.Increment();


        }else{
            console.log("stolen!")}

})

resetButton.addEventListener("click", e=>{
    body.removeChild(resetButton);
    body.removeChild(winScreen);
    playerOne.boardReset();
    playerTwo.boardReset();
    gameState.counterReset();
    gameBoard.resetBoard();
    boardTiles.forEach((tile)=>{
        tile.textContent=""
    })
})