var player, zombie1, zombie2, zombie3, ground;
var zombie1img,zombie2img,zombie3img,playerimg;
var obst1,obst2,obstimg1,obstimg2;
var backgrd,backgrdimg;
var time;

function preload()
{
  playerimg = loadImage("images/runner.PNG");
  zombie1img = loadImage("images/zombie.PNG");
  zombie2img = loadImage("images/zombie2.PNG");
  zombie3img = loadImage("images/zombie3.PNG");
  backgrdimg = loadImage("images/forest.PNG");
  obstimg1 = loadImage("images/obst1.PNG");
  obstimg2 = loadImage("images/obst2.PNG");
}

function setup()
{
  createCanvas(windowWidth,windowHeight);

  backgrd = createSprite(displayWidth/2 + 300,displayHeight - 200);
  backgrd.addImage("background",backgrdimg);
  backgrd.scale = 3;
  backgrd.velocityX = 3;
    
  ground = createSprite(displayWidth,displayHeight/4 + 910,displayWidth,20);
  ground.visibility = false;

  player = createSprite(displayWidth/4 + 1000,displayHeight/4 + 890,10,10);
  player.addImage("victim",playerimg);
  player.velocityX = -3;
  player.scale = 0.6;
  

  zombie1 = createSprite(displayWidth/4 + 1430,displayHeight/4 + 890,10,10);
  zombie1.addImage("zombie",zombie1img);
  zombie1.velocityX = -3;
  zombie1.scale = 0.6;

    
  /*zombie2 = createSprite(displayWidth/4 + 1230,displayHeight/4 + 590,10,10);
  zombie2.addImage("zombie",zombie2img);
  zombie2.velocityX = -3;
  zombie2.scale = 0.5;

  zombie3 = createSprite(displayWidth/4 + 1030,displayHeight/4 + 590,10,10);
  zombie3.addImage("zombie",zombie3img);
  zombie3.velocityX = -3;
  zombie3.scale = 0.5;*/

}


function draw()
{
  background("black");

  camera.position.x = player.x;
  ground.x = camera.position.x;
  player.velocityY = player.velocityY  + 0.5;

  player.collide(ground);

  Backgrd();
  spawnobst();

  drawSprites();
}

 function spawnobst()
{
  var n = Math.round(random(1,2));
  if(World.frameCount % 70 === 0)
    {
      if(n === 1)
        {
          var obst1 = createSprite(displayWidth-1000,displayHeight/4 + 800,10,10);
          obst1.addImage("obstacle1",obstimg1);
          obst1.velocityX = 4;
          obst1.scale = 0.3;
        }

      if(n === 2)
        {
          var obst2 = createSprite(displayWidth-1000,displayHeight/4 + 800,10,10);
          obst2.addImage("obstacle2",obstimg2);
          obst2.velocityX = 4;
          obst2.scale = 0.2 ;
        }
    }
}

function Backgrd()
{
  if(backgrd.x >= camera.position.x)
    {
      backgrd.x = camera.position.x-1000;
    }
}

function keyPressed()
{
  if (keyCode === 32)
    {
      player.velocityY = -15;
    }  
}

/*function keyReleased()
{
  player.velocityY = player.velocityY + 0.8;
}


function survivalTime()
{
  stroke();
  textSize(20);
  fill("white");
  time = (frameCount/frameRate());
  text("Survival Time: " + time, 100,50);
}*/