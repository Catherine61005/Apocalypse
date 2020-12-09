var player, zombie1, zombie2, zombie3, ground;
var zombie1img,zombie2img,zombie3img,playerimg;
var obst1,obst2,obstimg1,obstimg2;
var backgrd1,backgrd2,backgrdimg1,backgrdimg2;
var timecount = 0;
var obstaclegrp1, obstaclegrp2;
var visibility;
var plyrx,plyry;
var playerXY = [];
var gameState = 0;

function preload()
{
  playerimg = loadImage("images/runner.PNG");
  //zombie1img = loadAnimation("zombieGif1.png","zombieGif2.png","zombieGif3.png");
  zombie1img = loadImage("images/zombie.PNG");
  zombie2img = loadImage("images/zombie2.PNG");
  zombie3img = loadImage("images/zombie3.PNG");
  backgrdimg1 = loadImage("images/forest.PNG");
  backgrdimg2 = loadImage("images/finalzombie.PNG");
  obstimg1 = loadImage("images/obst1.PNG");
  obstimg2 = loadImage("images/obst2.PNG");
}

function setup()
{
  createCanvas(windowWidth,windowHeight);

  backgrd1 = createSprite(displayWidth/2 + 300,displayHeight - 200);
  backgrd1.addImage("background",backgrdimg1);
  backgrd1.scale = 3;
  backgrd1.velocityX = 3;

  backgrd2 = createSprite(displayWidth/2 + 200,displayHeight - 100);
  backgrd2.addImage("background",backgrdimg2);
  backgrd2.scale = 3.5;
  backgrd2.visible = false;
    
  ground = createSprite(displayWidth,displayHeight/4 + 910,displayWidth,20);
  ground.visible = false;

  player = createSprite(displayWidth/4 + 1000,displayHeight/4 + 890,10,10);
  player.addImage("victim",playerimg);
  player.velocityX = -3;
  player.scale = 0.6;
  

  zombie1 = createSprite(displayWidth/4 + 1430,displayHeight/4 + 800,10,10);
  zombie1.addImage("zombie",zombie1img);
  zombie1.velocityX = -3;
  zombie1.scale = 0.4;

  player.debug = false;
  player.setCollider("rectangle",0,0,200,200);

  obstaclegrp1 = new Group();
  obstaclegrp2 = new Group();

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

  if(gameState === 0)
  {
      camera.position.x = player.x;
      ground.x = camera.position.x;
      player.velocityY = player.velocityY  + 0.5;

      player.collide(ground);

      if (player.isTouching(obstaclegrp1) || player.isTouching(obstaclegrp2))
          {
            gameState = 1;
          }  

      Backgrd();
      spawnobst();
  }    

  else if(gameState === 1)
    {
      Colliding();
    }
    
    drawSprites();
    survivalTime();
}

 function spawnobst()
{
  var n = Math.round(random(1,2));
  if(World.frameCount % 120 === 0)
    {
      if(n === 1)
        {
          var obst1 = createSprite(player.x - 900,displayHeight/4 + 850,10,10);
          obst1.addImage("obstacle1",obstimg1);
          obst1.velocityX = 4;
          obst1.scale = 0.3;
          obstaclegrp1.add(obst1);
        }

      if(n === 2)
        {
          var obst2 = createSprite(player.x - 900,displayHeight/4 + 850,10,10);
          obst2.addImage("obstacle2",obstimg2);
          obst2.velocityX = 4;
          obst2.scale = 0.2 ;
          obstaclegrp2.add(obst2)
        }
    }
    

}

function Backgrd()
{
  if(backgrd1.x >= camera.position.x)
    {
      backgrd1.x = camera.position.x-1000;
    }
}

function keyPressed()
{
  if (keyCode === 32 && player.y >= 972 )
    {
      player.velocityY = -15;
    }  
}

function Colliding()
{    
    player.velocityX = 0;
    player.visible = false;
    zombie1.velocityX = 0;
    zombie1.destroy();
    obstaclegrp1.setVelocityXEach(0);
    // obstaclegrp1.destroyEach();
    obstaclegrp2.setVelocityXEach(0);
    //obstaclegrp2.destroyEach();
    backgrd1.velocityX = 0;
    backgrd2.visible = true;
     
}

function survivalTime()
{
  stroke('red');
  textSize(40);
  fill("white");
  timecount = Math.round((frameCount/frameRate()));
  text("Survival Time: " + timecount, 150,70);

}