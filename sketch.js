var player,  stack,  coin, coin1,  rb,  gb,  zombie, obstacle, bg, invisible, invisible2, invisible3, smoke ;
var playerImg, stackImg, coinImg, rbImg, gbImg, zombieImg,obstacleImg, bgImg, smokeImg;
var tplayer;
var tImg;
var transparency = 5;
var gun, gunImg;
var bullet, bulletImg;
var score = 0;
var CoinGroup, Coin1Group, ZombieGroup, BulletGroup;
var zk = 15;
var lives = 15;
var lifeImg, life, coino, coinoImg, invi, inviImg, zkk, zkkImg, fight, fightImg;

function preload(){
 playerImg = loadAnimation("images/boy1.png", "images/boy2.png", "images/boy3.png", "images/boy4.png", "images/boy5.png", "images/boy6.png", "images/boy7.png","images/boy8.png");
 coinImg = loadAnimation("images/coin1.png", "images/coin2.png", "images/coin3.png", "images/coin4.png", "images/coin5.png","images/coin6.png", "images/coin7.png", "images/coin8.png", "images/coin9.png", "images/coin10.png");
 tImg = loadAnimation("images/t1.png","images/t2.png","images/t3.png","images/t4.png","images/t5.png","images/t6.png","images/t7.png","images/t8.png");

 stackImg = loadImage("images/bstone.png");
 rbImg = loadImage("images/red booster.png");
 gbImg = loadImage("images/green booster.png");
 zombieImg = loadImage("images/zombie.png");
 obstacleImg = loadImage("images/obstacle.png");
 bgImg = loadImage("images/bg.jpeg");
 smokeImg = loadImage("images/smoke1.png");
 gunImg = loadImage("images/gun.png");
 bulletImg = loadImage("images/bullet.png");
 lifeImg = loadImage("images/life.png");
 coinoImg = loadImage("images/coino.png");
 inviImg = loadImage("images/invisibleImg.jpg");
 zkkImg = loadImage("images/zombiek.png");
 fightImg = loadImage("images/fight.png");
}

function setup() {
  createCanvas(displayWidth-20,displayHeight-30);

  
  bg = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight );
  bg.addImage("bg", bgImg);
  bg.scale = 1.34;
  //bg.velocity.y = 3;

  life = createSprite(displayWidth/2-600, displayHeight/2-400);
  life.addImage("life", lifeImg);
  life.scale = 0.4;

  coino = createSprite(displayWidth/2-450, displayHeight/2-400);
  coino.addImage("co", coinoImg);
  coino.scale = 0.2;

  invi = createSprite(displayWidth/2-600, displayHeight/2-350);
  invi.addImage("in", inviImg);
  invi.scale = 0.1;

  zkk = createSprite(displayWidth/2 -450, displayHeight/2 - 350 );
  zkk.addImage("zk", zkkImg);
  zkk.scale = 0.1;
  
  player = createSprite(displayWidth/2+2, displayHeight/2+20, 50, 50);
  player.addAnimation("plr", playerImg);

  invisible = createSprite(displayWidth/2+2, displayHeight/2+30, displayWidth, 10);
  invisible.visible = false;

  tplayer = createSprite(player.x, player.y, 50, 50);
  tplayer.addAnimation("t",tImg);
  tplayer.visible = false;

  invisible2 = createSprite(displayWidth/2+2, displayHeight/2- 400, displayWidth, 3 );
  invisible2.visible = false;

  gun = createSprite(displayWidth/2 + 500, displayHeight/2, 10, 10);
  gun.addImage("gun", gunImg);
  gun.scale = 0.3;


  CoinGroup=new Group();
  Coin1Group = new Group();
  ZombieGroup = new Group();
  BulletGroup = new Group();
}

function draw() {
  background("violet"); 

  if(player.y < displayHeight - 30){
  
  camera.position.x = displayWidth/2;
  camera.position.y = player.y;

  }

  tplayer.x = player.x;
  tplayer.y = player.y;


  if(keyDown("space" )) {
    player.velocityY = -10;
  }

  if(CoinGroup.isTouching(player)){
    CoinGroup.destroyEach();
    score = score+5;
  }

  if(Coin1Group.isTouching(player)){
    Coin1Group.destroyEach();
    score = score+5;
  }


  if(transparency > 0 && transparency <= 5){

  if(keyDown("k")){
    player.visible = false;
    tplayer.visible = true;
  }

  if(keyWentUp("k")){
    player.visible = true;
    tplayer.visible = false;
    transparency = transparency - 1;
  }
}



if(ZombieGroup.isTouching(BulletGroup)){
  ZombieGroup.destroyEach();
  BulletGroup.destroyEach();
  console.log(zk);
}

if(ZombieGroup.isTouching(player) && player.visible === true){
  ZombieGroup.destroyEach();
  lives = lives-1;
}

if(CoinGroup.isTouching(BulletGroup)){
  CoinGroup.destroyEach();
  BulletGroup.destroyEach();
  score = score+3;
}

if(Coin1Group.isTouching(BulletGroup)){
  Coin1Group.destroyEach();
  BulletGroup.destroyEach();
  score = score+3;
}

if(lives === 0){
  player.velocityX = -7;
  
  if(player.x < -80){
    player.destroy();
    createfight();
  }
}

if(ZombieGroup.isTouching(tplayer)){
  ZombieGroup.destroyEach();
}

if(ZombieGroup.y>displayHeight-5){
  lives = lives-1;
}

if(lives>0){

if(player.x <= displayWidth - 320) {


  if (keyDown(RIGHT_ARROW)) {
    player.x = player.x + 20;
  }
}

if(player.x >= displayWidth - 1000) {

  if (keyDown(LEFT_ARROW)) {
    player.x = player.x - 20;
  }
}

}

if(gun.y >= 0){

  if(keyDown (UP_ARROW)){
    gun.y = gun.y-50;
  }
  }
  
  if(gun.y <= displayHeight-200){
  
  if(keyDown (DOWN_ARROW)){
    gun.y = gun.y+50;
  }
  }


spawncoin();
spawncoin1();
spawnzombie();
  
    player.velocityY = player.velocityY + 0.8 
    player.collide(invisible);
    player.collide(invisible2);


    textSize(30);
    fill("black");
    
console.log(player.x);
  drawSprites();

  text("        " + lives, displayWidth/2 - 640, displayHeight/2 - 390);
  text("        " + score , displayWidth/2 - 490, displayHeight/2 -390);
  text("        " + transparency, displayWidth/2 - 625, displayHeight/2 -340 );
  text("        " + zk, displayWidth/2-490, displayHeight/2-340);

}

function keyPressed () {

if(keyCode === 76){
bulletFire();
}


  
}

  
function spawncoin (){
  if (frameCount % 170 === 0) {
  var coin = createSprite(displayWidth/2, -80, 20,20);
  coin.addAnimation("coin",coinImg);
  coin.x = Math.round(random(displayWidth-1000, displayWidth-300));
  coin.velocityY = 3;
  coin.scale = 0.3;
  coin.depth = player.depth-1;
  CoinGroup.add(coin);
}
}  

function spawncoin1 (){
  if (frameCount % 260 === 0) {
  var coin1 = createSprite(displayWidth/2, -80, 20,20);
  coin1.addAnimation("coin",coinImg);
  coin1.x = Math.round(random(displayWidth-1000, displayWidth-300));
  coin1.velocityY = 3;
  coin1.scale = 0.3;
  coin1.depth = player.depth-1;
  Coin1Group.add(coin1);
}
} 

function spawnzombie (){
  if (frameCount %  250 === 0) {
  var zombie = createSprite(displayWidth/2, -80, 20,20);
  zombie.addImage("coin",zombieImg);
  zombie.x = Math.round(random(displayWidth-1000, displayWidth-300));
  zombie.velocityY = 3;
  zombie.scale = 0.2;
  zombie.depth = player.depth-1;
  ZombieGroup.add(zombie);
}
}  

function bulletFire(){
   var bullet = createSprite(gun.x-30, gun.y-25, 20, 20);
   bullet.addImage("bul", bulletImg);
   bullet.velocityX = -20;
   bullet.scale = 0.1;
   bullet.depth = gun.depth-1;
   BulletGroup.add(bullet);
  }

  function createfight(){
    var fight = createSprite(displayWidth/2-500, displayHeight/2+20, 20, 20);
    fight.addImage("fi", fightImg);
    fight.scale = 0.8;
  }
