 
 var START=0;
 var PLAY=1;
 var END=2;

 var gamestate=START;

 var arcimage;
 var spaceship;

 var soundblast;
 var music1;
 var soundstart;
 var soundrocktouch;
////
 var score=0;
 var gameover;
 var Restart
 localStorage["HeighestScore"]=0;

 //.......................................................................................................
 
 function preload(){
    slide1=loadImage("asset/1STSLIDE.PNG")
    intro1=loadImage("asset/INTRO1.PNG")
    intro2=loadImage("asset/intro2.PNG")
    arcImage=loadImage("asset/rightarrowkey.PNG")
  
    level1=loadImage("asset/level1.jpeg")
    spaceship=loadImage("asset/spaceship2.png")

    rockImage=loadImage("asset/rock.png")
    rock2Image=loadImage("asset/rock2.png")
    blast=loadImage("asset/blastimage.png")

    gameoverImg=loadImage("asset/one.png");
    restartImage=loadImage("asset/restart.png");

   music=loadSound("music/spaceship-playstate.mp3")
   music2=loadSound("music/blast.wav")
   music3=loadSound("music/startmusic.mp3")
   music4=loadSound("music/touchesrock.mp3")
   
   
   }
 //.......................................................................................................
 function setup(){
  
   createCanvas(windowWidth,windowHeight)

   bg=createSprite(width/2,height/2,width,height)
   bg.addImage("slide1",slide1)
   bg.addImage("intro1",intro1)
   bg.addImage("intro2",intro2)
   bg.lifetime=250
   blacklevel=createSprite(width/2,height/2,width,height)
   blacklevel.addImage("bl",level1)
   blacklevel.visible=false

   button=createImg("asset/START.PNG")
   button.position(700,400)
 
   arckey=createSprite(700,400)
   arckey.addImage("arckey",arcImage)
   arckey.visible=false
   arckey.lifetime=250

   space=createSprite(width/2,height-100)
   space.addImage("space",spaceship)
   space.visible=false
   space.scale=0.2

   gameoverImage=createSprite(300,100);
   gameoverImage.addImage(gameoverImg);
   gameoverImage.visible=false

   restartImg=createSprite(300,140);
   restartImg.addImage(restartImage);
   restartImg.visible=false

   rockGroup=new Group()
     blasting=createSprite(space.x,space.y)
     blasting.addImage("blast",blast)
     blasting.visible=false
     blasting.scale=0.1

     music3.setVolume(0.001)
     music.setVolume(0.1)

 }
 //.....................................................................................
 function draw(){
   background("black")
   text("Score: "+ score, 500,50);

   if(gamestate===START){
    music3.play()
    
    
     button.mouseClicked(slide)
     if(mousePressedOver(arckey)){
     gamestate=PLAY
     music3.stop()
     }

   }
   else if(gamestate===PLAY){
     bg.visible=false
     blacklevel.visible=true
     arckey.visible=false
     blacklevel.velocityY=1
     space.visible=true
    music.play();
    score = score + 5;
     rocks()

  if(blacklevel.y>height/2+100){
 blacklevel.y=height/2
 
  }

  if(keyDown(UP_ARROW)){
 space.y=space.y-2
  }
  if(keyDown(DOWN_ARROW)){
   space.y=space.y+2
  }
  if(keyDown(LEFT_ARROW)){
    space.x=space.x-2
  }
  if(keyDown(RIGHT_ARROW)){
    space.x=space.x+2
  }
  if(space.isTouching(rockGroup)){
    space.visible=false
    blasting.visible=true
    music.stop()
    music4.play();
  }

  }
//.............NEW.................
  if(gamestate===END){
    gameover.visible=true;
     restart.visible=true;
    space.changeAnimation("collide",blasting)
    rockGroup.setLifetimeEach(-1);
   // music2.play();
    if(mousePressedOver(restart)) {
      music4.stop()
      reset();
    }
  }


///////////////////////////////////////////////////////////////////////////////////////////
  drawSprites()
 }
 //.....................................................................................................

 function slide(){
  button.hide()
  bg.changeImage("intro1",intro1)
  //arckey=createImg("asset/rightarrowkey.PNG")
  //arckey.position(700,400)
  //arckey.mouseClicked(slide1)
  arckey.visible=true
 }
 //...................................................................................................

 function rocks(){
  if(frameCount%100===0){
 rock=createSprite(34,0,13,13)
 rock.velocityY=2
 rock.x=Math.round(random(50,width-100))
 var rand=Math.round(random(1,2))
 switch(rand){
  case 1:rock.addImage(rockImage)
  break;
  case 2:rock.addImage(rock2Image)
  break;
  default:break
 }
 rock.scale=0.1
 rockGroup.add(rock)
 rockGroup.setLifetimeEach(100)
  }
 }
////////////new
 /*function reset(){
  gameState = PLAY;
  gameover.visible=false;
  restart.visible=false;
  
  rockGroup.destroyEach();
  
  
  space.changeAnimation("boom",blasting);*/
/////this
  function reset(){
    gameState = PLAY;
    gameover.visible = false;
    restart.visible = false;
    if (rockGroup) { rockGroup.destroyEach(); }
    if (space) { space.changeAnimation("boom",blasting); }
    return true;

    if(localStorage["HighestScore"]<score){
      localStorage["HighestScore"] =score;
    }
    console.log(localStorage["HighestScore"]);
    
    score = 0;
}
  



 //......................................................................................................