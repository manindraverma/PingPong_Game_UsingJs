
//selecting the canvas
let can = document.getElementById("table");
let draw = can.getContext('2d');

//drawing shapes

// draw.fillStyle="black";
// draw.fillRect(0,0,can.width,can.height);//used to draw rectangle

draw.fillStyle="red";
draw.fillRect(100,100,30,30);

draw.fillStyle="orange";
draw.beginPath();
draw.arc(200,200,10,0,Math.PI*2,false);
draw.closePath();
draw.fill();


