let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highS = 0;
let btns = ["red","yellow","blue","purple"];

let startBtn = document.getElementById('start-quit');
let h3 = document.querySelector('h3');
let p = document.querySelector('p');

startBtn.addEventListener("click",function(){
    if(started==false){
        if(h3.innerHTML=="Start" || h3.innerHTML=="re-start"){
            h3.innerHTML = "Quit";
            startBtn.style.backgroundColor="red";
        }
        started = true;
        levelup(); 
    }
    else if(started==true && h3.innerHTML=="Quit") gameOver();
});


let h2 = document.querySelector('h2');

function btnFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },150);
}


function levelup(){
    userSeq =[];
    level++;
    if(highS < level) highS = level-1;
    p.innerHTML = `Highest Score - <b>${highS}</b>`;
    h2.innerText = `level ${level}`; 
    let randidx = Math.floor(Math.random()*btns.length);
    let randcolor = btns[randidx];
    let randBtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    btnFlash(randBtn);
    playSound(randcolor);
}

function btnPress(){
    if(h3.innerHTML=="Quit"){
        let btn = this ;
        btnFlash(btn);
        let usercolor = btn.getAttribute('id');
        userSeq.push(usercolor);
        checkAns(userSeq.length-1);
    }
}

let allbtn = document.querySelectorAll('.btn');
for(btn of allbtn){
    btn.addEventListener("click",btnPress);
}

function checkAns(idx){
    if(gameSeq[idx] == userSeq[idx]){
        playSound(gameSeq[idx]);
        if(userSeq.length == gameSeq.length) setTimeout(levelup,1000);
    }
    else {
        gameOver();
    }
}

function gameOver(){
    let showLevel = level<=0?0:level-1;
        h2.innerHTML = `<b>Game over!</b><p><b style="color: green;">Your Score is ${showLevel}</b>. Click re-start button to play again.</p>`;
        if(h3.innerHTML =="Quit"){
            h3.innerHTML = "re-start";
            startBtn.style.backgroundColor="rgb(56, 204, 56)"
        }
        document.querySelector("b").style.color = "red";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "blanchedalmond";
        },150);
        if(highS < level) highS = level-1;
        playSound('gameOver');
        reset();
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    p.innerHTML = `Highest Score - <b>${highS}</b>`;
}
    
// Sound Effects 
// https://s3.amazonaws.com/freecodecamp/simonSound4.mp3
var sounds = {
    red: new Audio("./sounds/simonSound1.mp3"),
    yellow: new Audio ("./sounds/simonSound2.mp3"),
    blue: new Audio('./sounds/simonSound3.mp3'),
    purple: new Audio("./sounds/simonSound4.mp3"),
    gameOver: new Audio("./sounds/gameOver.mp3")
};

// Function to play sound
function playSound(that) {
    var thisSound = sounds[that];
    thisSound.currentTime=0;
    thisSound.play();
}; 