(function() {
    "use strict";

    window.addEventListener("load", init);

    let readyToRoll = true; // This variable tracks whose turn it is to roll.
    var result; // This will be the totals of both rolls together. 
    let humanSlotFull = [false, false, false, false, false, false]; // This will keep track of which human slot is available. As the game continues, these will start turning to true. 
    let compSlotFull = [false, false, false, false, false, false]; // Like the row above, this keeps track of which computer slots are available.
    var status; // This will hold the message displaying the status of the game, such as the results of each roll.
    let computerTurn = false; // This helps keep track of whose turn it is.
    let roundNum = 0; // At the start of each round, this will be increased by 1.
    let humanScore = 0; // This is the human's total score.
    let compScore = 0; // This is the computer's total score.
    let humanValue = []; // This array keeps track of the numbers recorded in each of the human's boxes, and this will be compared to the compValue.
    let compValue = []; // This array keeps track of the numbers recorded in each of the computer's boxes. This will be compared to the humanValue to determine who wins each row.

    

    function init() {
        const rollButton = id('roll');
        rollButton.addEventListener('click', rollDie);

        for (var i = 1; i < 6; i++){
            const enterButton = id('enter' + i);
            enterButton.addEventListener('click', liClick);
        }

        
    }

    function rollDie(){
        status = id('status');
        
        if(readyToRoll == true){
            var roll1 = Math.floor(Math.random()*6)+1;
            var roll2 = Math.floor(Math.random()*6)+1;
            result = roll1 + roll2;

            status.textContent = `${roll1} + ${roll2} = ${result}`;

            readyToRoll = false;
        } else {
            status.textContent = status.textContent + "!";
        }
        
    }

    
    function liClick(event){ 
        const status2 = id('status');

        // Human rolls and chooses an empty slot
        if(readyToRoll == false){
            let clicked = event.currentTarget;
            var rowNumber = clicked.id[5];

            const humanSlot = id('user'+ rowNumber);
            
            if(humanSlot.value == ""){
                humanSlot.value = result;
                humanSlotFull[rowNumber] = true; 

                computerTurn = true;
            } else {
                
                
                computerTurn = false;
                status.textContent = status.textContent + "!";
            }
            
            
             
            
            // Computer Player rolls and chooses an empty slot
            while(computerTurn == true){
                var randomRowNum = Math.floor(Math.random()*5)+1;
                var roll1 = Math.floor(Math.random()*6)+1;
                var roll2 = Math.floor(Math.random()*6)+1;
                const cResult = roll1 + roll2;
                status2.textContent = "Computer: " + `${roll1} + ${roll2} = ${cResult}`;
                const computerSlot = id('computer' + randomRowNum);

               
                if(computerSlot.value == ""){
                    
                    computerSlot.value = cResult;
                    
                    compSlotFull[randomRowNum] = true;
                    readyToRoll = true;
                    roundNum = roundNum + 1;
                    computerTurn = false;

                    if(roundNum == 5){
                        gameOver();
                    }
                } else {
                    randomRowNum = Math.floor(Math.random()*5)+1;
                }
                
            }
            
            
            
            

        } else {
            status2.textContent = status2.textContent + "!";
        }
    }

    function gameOver(){
        for (var i = 1; i < 6; i++) {
            humanValue[i]= id('user' + i);
            compValue[i] = id('computer' + i)

            if (Number(humanValue[i].value) > Number(compValue[i].value)){
                humanScore = humanScore + i;
                compScore = compScore + 0;
            } else if(Number(compValue[i].value) > Number(humanValue[i].value)){
                compScore = compScore + i;
                humanScore = humanScore + 0;
            } else {
                humanScore = humanScore + 0;
                compScore = compScore + 0;
            }

        }

       if(humanScore > compScore){
            status.textContent = 'You win: ' + humanScore + '-' + compScore;
       } else if(compScore > humanScore){
            status.textContent = 'Computer wins: ' + compScore + '-' + humanScore;
       } else {
            status.textContent = 'Its a tie: ' + humanScore + '-' + compScore;
       }
        
       readyToRoll = false;
       computerTurn = false;
        
    }
    
    
    /////////////////////////////////////////////////////////////////////
    // Helper functions
    function id(id) {
        return document.getElementById(id);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
})();