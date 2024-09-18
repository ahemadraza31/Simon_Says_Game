let gameSeq = [];
let userSeq = [];
let btns = ["yellow","red","purple","green"];
let started= false;
let level = 0;
let highestScore = localStorage.getItem("highestScore") ? parseInt(localStorage.getItem("highestScore")) : 0; // Retrieve highest score from localStorage if it exists
let h2 = document.querySelector("h2");

document.getElementById("highest-score").innerText = highestScore;

document.addEventListener("keypress" ,function(){
   if(started == false){
    console.log("game started");
    started = true;
    levelUP();
   }
});
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
     btn.classList.remove("flash");
    },250);

};
function gameFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
     btn.classList.remove("userflash");
    },250);
};
function levelUP(){
    userSeq=[];
    level++;
    h2.innerText = `Level${level}`;
    let ranIdx = Math.floor(Math.random()*3);
    let randColor = btns[ranIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    /* console.log(ranIdx); */
    /* console.log(randColor); */
    /* console.log(randBtn); */
   gameSeq.push(randColor);
   console.log(gameSeq);
   btnFlash(randBtn );
  
};

 function checkAns(idx){
  //console.log("curr level:",level);
  
  if(userSeq[idx]=== gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
        setTimeout(levelUP,1000);
    }
  }else{
    if (level > highestScore) {
        highestScore = level;
        localStorage.setItem("highestScore", highestScore); // Store the highest score in localStorage
        document.getElementById("highest-score").innerText = highestScore;  // Update display in HTML
 
    }
    h2.innerHTML =`Game over! Your score was <b> ${level}<br/> <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "white";
    },150);
    reset();
  }

 };
function btnPress(){
    console.log(this);
   let btn = this;
  gameFlash(btn);
 userColor = btn.getAttribute("id");
 userSeq.push(userColor); 
 console.log(userSeq);
 checkAns(userSeq.length-1);
  
};
let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click" , btnPress);
};
function reset(){
    started = false;
    gameSeq =[];
    userSeq = [];
    level =0;
};