 function restart(){
    ball.x=can.width/2;
    ball.y=can.height/2;
    ball.velX= -ball.velX;
    ball.speed=5;

 }

 canvas.addEventListener("mousemove",getMousePos);

 function getMousePos(evt){
    let rect=can.getBoundingClientRect();
    user.y=evt.clientY-rect.top - user.
 }


