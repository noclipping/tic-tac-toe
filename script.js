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
            return('X')
        }else{
            return('O')
        }
    }
    return{Increment,Input}
})();

/*
const player = (playerName,playerSelection) => {

    }
    return{playerName}
}
*/



let theBoard = document.querySelector(".gameboard")

theBoard.addEventListener("click", e=>{

    let tileSelect = e.target.getAttribute('data-index')
        if(Array.from(e.target.textContent).length < 1 ){

            console.log("div data-index: ",tileSelect);

            

            gameBoard.addTile(gameState.Input(),tileSelect);

            console.log(gameBoard.getArray())

            gameState.Increment();
        }else{
            console.log("stolen!")}

})
