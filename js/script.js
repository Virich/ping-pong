var comp=false, 
    mouse=false, 
    key=false;
//инициализация всех функций
function init(){
    game = new rect('green', 0, 0, 500, 300);
    player2 = new rect("red", 10, game.height/2-25, 10, 50);
    player = new rect("blue", game.width-20, game.height/2-25, 10, 50);
    ball = new rect('grey', game.width/2-5, game.height/2-5, 10 ,10);
    ball.vX=10;
    ball.vY=10;
    player2.score=0;
    player.score=0;	
    canvas = document.getElementById('pong');
    canvas.width=game.width;
    canvas.height=game.height;
    contex=canvas.getContext('2d');
    draw();
    document.body.onkeydown=playerMove;
    if (mouse == true){
        document.body.onmousemove=moveMouse;
    }
    setInterval(play, 100);
}
//прорисовка объектов
function draw(){
    game.draw();
    contex.textAlign='center';
    contex.textBaseline='top';
    contex.fillStyle='lightgreen';    
	contex.font = "bold 150px Arial";
	contex.fillText(player.score, game.width-120, 70);
    contex.fillText(player2.score, 120, 70);	
    for (var i=0; i<game.height; i+=40){
        contex.fillStyle='grey';
        contex.fillRect(game.width/2-1, i, 2, 30)
    }
    player2.draw();
    player.draw();
    ball.draw();
}
//создание объектов
function rect(color, x, y, width, height){
    this.color=color;
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.draw=function(){
        contex.fillStyle=color;
        contex.fillRect(this.x, this.y, this.width, this.height);
    }
}
//проверка попадания по ракетке
function touch(objA, objB){
    if (objA.x+objA.width>objB.x && objA.x<objB.x+objB.width &&
        objA.y+objA.height>objB.y && objA.y<objB.y+objB.height){
        return true;
    } else {
        return false;
    }
}
//подсчет результатов попадания
function update(){
    if (ball.y<0 || ball.y+ball.height >game.height){
        ball.vY=-ball.vY
    }
    if (ball.x<0 ){
        ball.vX=-ball.vX;
        player.score++
    }
    if (ball.x+ball.width>game.width){
        ball.vX=-ball.vX;
        player2.score++
    }
    if((touch(player2, ball)&&ball.vX<0)||(touch(player, ball)&&ball.vX>0)){
        ball.vX=-ball.vX;
    }
    ball.x+=ball.vX;
    ball.y+=ball.vY;
    if (comp == true){
        moveAi();
    }
}
//движение игрока справа
function playerMove(e){
    if(e==undefined) window.Event;
    if(e.keyCode==40) {
        if (player.y>=game.height-50){
            player.y=game.height-50
        } else {
            player.y=player.y+20;
        }
    }
    if(e.keyCode==38) {
        if (player.y<=0) {
            player.y=0
        } else {
           player.y=player.y-20; 
        }
    }
    if (key == true){
        if(e.keyCode==83) {
            if (player2.y>=game.height-50){
                player2.y=game.height-50
            } else {
                player2.y=player2.y+20;
            }
        }
        if(e.keyCode==87) {
            if (player2.y<=0) {
                player2.y=0
            } else {
               player2.y=player2.y-20; 
            }
        }
    }
}
//движение игрока слева
function moveAi(){
    var y, vY;
    vY=Math.abs(ball.vY)-2;
    if(ball.y<player2.y+player2.height/2){
        y=player2.y-vY
    } else {
         y=player2.y+vY
    }
    if(0<y && y<game.height){
        player2.y = y;
    }
}
function moveMouse(e){
    var y = e.clientY-game.height/2-50;        
    if (0<y && y<game.height-player2.height){        
		player2.y = y;		
    }	
}
function play(){
    draw();
    update();
}
function resetGame(){
    window.location.reload();
}
function playAi(){	    
    document.getElementById('startWindow').style.display='none';
    comp=true;
	init();    
}
function playMouse(){    
    document.getElementById('startWindow').style.display='none';
    mouse=true;
    init();
}
function playKey(){    
    document.getElementById('startWindow').style.display='none';
    key=true;
    init();
}

document.getElementById('comp').onclick=playAi;
document.getElementById('mouse').onclick=playMouse;
document.getElementById('key').onclick=playKey;
document.getElementById('reset').onclick=resetGame;