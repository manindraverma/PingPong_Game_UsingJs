let can = document.getElementById("table");
let draw=can.getContext('2d');


const ball={
    x: can.width/2,
    y:can.height/2,
    radius:10,
    velX:5,
    velY:5,
    speed:5,
    color:"green"
}


const user={
    x:0,
    y: (can.height -100)/2,
    width: 10,
    height: 100,
    score:0,
    color: "red"
}

const cpu={
    x:can.width-10,
    y:(can.height-100)/2,
    width:10,
    height:100,
    score:0,
    color:"blue"
}

const sep={
    x:(can.width-2)/2,
    y:0,
    height:10,
    width:2,
    color:"orange"
}

function drawRectangle(x,y,w,h,color){
    draw.fillStyle=color;
    draw.fillRect(x,y,w,h);

}

function drawCircle(x,y,r,color){
    draw.fillStyle=color;
    draw.beginPath();
    draw.arc(x,y,r,0,Math.PI*2,true);
    draw.closePath();
    draw.fill();

}

function drawScore(text,x,y){
    draw.fillStyle="white";
    draw.font="60px Arial";
    draw.fillText(text,x,y);
}

function drawSeparator(){
    for(let i=0;i<= can.height; i+=20){
        drawRectangle(sep.x,sep.y+i,sep.width,sep.height,sep.color);
    }
}

function restart(){
    ball.x=can.width/2;
    ball.y=can.height/2;
    ball.velX= -ball.velX;
    ball.speed=5;

 }

 function detect_collison(ball,player){
    player.top=player.y;
    player.bottom=player.y+player.height;
    player.left=player.x;
    player.right=player.x+player.width;

    ball.top=ball.y-ball.radius;
    ball.bottom=ball.y+ball.radius;
    ball.left=ball.x-ball.radius;
    ball.right=ball.x+ball.radius;

    return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
 }

 canvas.addEventListener("mousemove",getMousePos);

 function getMousePos(evt){
    let rect=can.getBoundingClientRect();
    user.y=evt.clientY- rect.top - user.
 }

 function cpu_movement(){
    if(cpu.y<ball.y)
        cpu.y+=5;
    else
        cpu.y-=5;

 }

function helper(){
    drawRectangle(0,0,can.width/4,can.height/5,"black");
    drawScore(0,can.width/4,can.height/5);
    drawScore(0,3*can.width/4,can.height/5);
    drawSeparator();
    drawRectangle(user.x,user.y,user.width,user.height,user.color);
    drawRectangle(cpu.x,cpu.y,cpu.width,cpu.height,cpu.color);
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
}

function updates(){
    if(ball.x - ball.radius<0){
        cpu.score++;
        restart();
    }
    else if(ball.x + ball.radius > can.width){
    user.score++;
    restart();
    }

    ball.x += ball.velX;
    ball.y += ball.velY;

    cpu_movement();

    //top and bottom
    if(ball.y- ball.radius <0 || ball.y +ball.radius >can.height){
        ball.velY = -ball.velY;
    }
    let player = (ball.x + ball.radius < can.width/2) ? user : cpu;

    if(detect_collison(ball,player)){
        //we check where the ball hits the paddle 
        let collidePoint =( ball.y - (player.y + player.height/2));
        //normalize  the value of collidePoint, we need to get numbers
        //-player.height/2 < collidePoint < player.height/2
        collidePoint= collidePoint / ( player.height/2);
        //when the ball hit the top of a paddle we want the ball,
        //when the ball hit the center of the paddle
        //whent the ball hits the bottom of the paddle
        //Math.PI/4 = 45degrees
        let angleRad= (Math.PI/4) * collidePoint;

        //change the x and y direction
        let direction = (ball.x + ball.radius < can.width)
        ball.velX= direction * ball.speed * Math.cos(angleRad);
        ball.velY= ball.speed * Math.sin(angleRad);


        ball.speed+=1;

    }

}
function callBack(){
    //updates();
    helper();

}

let fps=50;
let looper=setInterval(callBack,1000/fps);
