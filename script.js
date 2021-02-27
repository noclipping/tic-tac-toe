const gameBoard = ( ()=>{
    let boardTiles = document.querySelectorAll('[data-index]')
    const tiles = ['','','','','','','','','']

    const addTile = (playerInput, position) =>{
        tiles.splice(position,1,playerInput);
        boardTiles[position].textContent=playerInput;
    }
    const getArray = () => {return tiles}

    return{addTile, getArray};

})();

const gameState = (()=>{
    let counter = 1
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
    return{Increment,Input,getCounter}
})();


const player = (input) => {
    const playerBoard = ['','','','','','','','','']
    const getBoard = () => {return playerBoard};
    const addTile = (position) => {playerBoard.splice(position,1,'X');}
    return {getBoard, input, addTile}
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
const verifyWin = (player) =>{

    const DOMboard = document.querySelector('.gameboard')
    const winScreen = document.createElement('p');
    winScreen.classList.add("winscreen")
    winScreen.textContent = `${player.input} WINS!!!`
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
        DOMboard.parentNode.replaceChild(winScreen, DOMboard);
        
    }else if(gameState.getCounter() === 9){
        winScreen.textContent = `TIE!`
        DOMboard.parentNode.replaceChild(winScreen, DOMboard);
        
    }
}




const playerOne = player('X');

const playerTwo = player('O');



let theBoard = document.querySelector(".gameboard")

theBoard.addEventListener("click", e=>{

    let tileSelect = e.target.getAttribute('data-index')
        console.log(gameState.Input())
        if(Array.from(e.target.textContent).length < 1 ){

            console.log("div data-index: ",tileSelect);

            gameBoard.addTile(gameState.Input(),tileSelect);
            
            console.log(gameBoard.getArray())
            
            if(gameState.Input()==="X"){
                console.log("player 1 moved");
                playerOne.addTile(tileSelect);
                console.log(playerOne.getBoard());
                verifyWin(playerOne);

            } else if(gameState.Input() === "O"){
                console.log("player 2 moved");
                playerTwo.addTile(tileSelect);
                console.log(playerTwo.getBoard());
                verifyWin(playerTwo);
            }

            gameState.Increment();


        }else{
            console.log("stolen!")}

})
