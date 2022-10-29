// using local storage to access name on the next page
function player() {
    var name = document.getElementById("player").value;
    localStorage.setItem("player-name", name)
}
function name() {
    document.getElementById("player-name").innerHTML = localStorage.getItem("player-name");
}
let box = document.getElementById("container");
let list =document.getElementById("numbers");
//extracting the level user wants to play at
//user level is to be store in one elemenat array
var userLevel = [];
function myLevel() {   
    let userLevels = document.getElementsByName("level");
    for(i = 0; i < 3; i++) {
        if(userLevels[i].checked) {
            userLevel.length =0;
            userLevel.push(Number(userLevels[i].value));             
    }
    if (userLevel[0]  == 9){
        list.setAttribute("class","nine");
    }
    }   
}

//function returning an array with random integers 1-100
var randomNumbers=[];
function random() { 
    var numbers = [];
    for (let z = 0; z < userLevel[0]; z++) {
        let x = Math.floor((Math.random() * 100) + 1);
        numbers.push(x);
    randomNumbers = numbers;
   
}
    return numbers; 

}
//function appending HTML list elements
function appendList() {
    for (let i = 0; i < randomNumbers.length; i++) {
        //new element of the list 
        let newElement = document.createElement("div");
        //newElement.innerHTML = numbers[i];
        list.appendChild(newElement);
        //child to the new element which is an <input> field
        let userInput = document.createElement("input");
        newElement.appendChild(userInput);
        userInput.setAttribute("class", "user");
        userInput.setAttribute("inputmode", "numeric"); 
        userInput.setAttribute("placeholder", randomNumbers[i]);
        //input has to be disabled so player cannot input answers when random
        // numbers are visible
        userInput.disabled = true; 
    }
    function createConfirm(){
        let userSubmit = document.createElement("input");
        box.appendChild(userSubmit);
        userSubmit.setAttribute("onclick", "comparing(); disableBtn()");
        userSubmit.setAttribute("type", "submit");
        userSubmit.setAttribute("Value", "Confirm");
        userSubmit.setAttribute("id", "confirm");  
    }
    //removing visibility of random nubers by removing placeholder
    function removePlaceholder() {
        for (let i = 0; i < randomNumbers.length; i++)
        document.getElementsByClassName("user")[i].removeAttribute("placeholder");      
    } 
    // when the random numbers disappear player should be able
    // to provide input
    function enableInput() {
        for (let i = 0; i < randomNumbers.length; i++)
        document.getElementsByClassName("user")[i].disabled=false;
    }
    setTimeout(removePlaceholder, 6000);
    setTimeout(createConfirm, 6000);
    setTimeout(enableInput, 6000);
}
function disableBtn(){
    document.getElementById('confirm').disabled = true;
}
// adding input element to an array
function userArray() {

    let userInput =[];
    for (let j = 0; j < randomNumbers.length; j++) {
        userInput.push(document.getElementsByClassName("user")[j].value)
    }
    return userInput
}
// compering two arrays in order  for player to win 
// both arrays have to be exactly the same i.e values and sequence
function comparing() {
    let userInput = userArray();6
    var result ="Well done you've won";
    for (let i = 0; i < randomNumbers.length; i++){
        if (randomNumbers[i] != userInput[i]) {
            result="You've lost the correct numbers are";
            break;
        }
    }
    let playAgain = document.createElement("input");
    box.appendChild(playAgain);
    playAgain.setAttribute("onclick", "location.reload()");
    playAgain.setAttribute("type", "submit");
    playAgain.setAttribute("Value", "Play Again");
    let playerResult = document.createElement("p");
    box.appendChild(playerResult);
    playerResult.setAttribute("Id", "result");
    document.getElementById("result").innerHTML = result 
    if (result =="You've lost the correct numbers are") {
        let rightAnswer = document.createElement("p");
        box.appendChild(rightAnswer);
        rightAnswer.setAttribute("id", "right");
        document.getElementById("right").innerHTML = randomNumbers.join(" ")
    }
}
// function removing intro from the page after player
// picks the level and starts the game
function removeIntro() {
    let element = document.getElementById("intro");
    element.remove()
}