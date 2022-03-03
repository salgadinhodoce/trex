var trex;
var treximagem;
var solo;
var soloimagem;
var soloinvisivel;
var nuvens;
var nuvemimagem;
var obstaculos;
var obstaculos1;
var obstaculos2;
var obstaculos3;
var obstaculos4;
var obstaculos5;
var obstaculos6;
var jogar=1;
var fim=0;
var estadodejogo=jogar;
var pontos=0;
var grupodenuvens;
var grupodeobstaculos;
var trexfim;
var gameover;
var imagemgameover;
var recomecar;
var imagemrecomecar;

function preload(){

//animação trex
treximagem=loadAnimation("trex1.png","trex3.png","trex4.png");
obstaculos1=loadImage("obstacle1.png");
obstaculos2=loadImage("obstacle2.png");
obstaculos3=loadImage("obstacle3.png");
obstaculos4=loadImage("obstacle4.png");
obstaculos5=loadImage("obstacle5.png");
obstaculos6=loadImage("obstacle6.png");
trexfim=loadAnimation("trex_collided.png");
imagemgameover=loadImage("gameOver.png");
imagemrecomecar=loadImage("restart.png");



//imagem solo
soloimagem=loadImage("ground2.png");
//imagem nuvem
nuvemimagem=loadImage("cloud.png");
}


function setup(){

createCanvas(600,200);
trex=createSprite(50,160,20,50);
trex.scale=0.5;
trex.addAnimation("correndo",treximagem);
trex.addAnimation("colidindo",trexfim);
trex.changeAnimation("correndo");

solo=createSprite(200,180,400,20);
solo.addImage(soloimagem);


soloinvisivel=createSprite(200,190,600,10);
soloinvisivel.visible=false;

grupodeobstaculos=createGroup();
grupodenuvens=createGroup();


gameover=createSprite(300,100);
gameover.addImage(imagemgameover);
gameover.scale=0.5;

recomecar=createSprite(300,120);
recomecar.addImage(imagemrecomecar);
recomecar.scale=0.4;


}

function draw(){

background("white");

//raio colisor
trex.debug=false;
trex.setCollider("circle",0,0,40);


text ("pontos  : "+pontos,500,50);

//ESTADO DE JOGO JOGAR
if(estadodejogo===jogar){

solo.velocityX=-5;

//pontos
pontos=pontos+Math.round(frameCount/60);

//redefinir solo
if(solo.x<0){
    solo.x=solo.width/2;

}

//pulo
if(keyDown("space")&&trex.y>130){

trex.velocityY=-5;

}

//gravidade
trex.velocityY=trex.velocityY+0.5;

gerarobstaculos();
gerarnuvens();

if(grupodeobstaculos.isTouching(trex)){

    estadodejogo=fim
}

gameover.visible=false;
recomecar.visible=false;

}


//ESTADO DE JOGO FIM
else if(estadodejogo===fim){

solo.velocityX=0;
trex.velocityY=0;
grupodeobstaculos.setVelocityXEach(0);
grupodenuvens.setVelocityXEach(0);

//vida infinta
grupodenuvens.setLifetimeEach(-1);
grupodeobstaculos.setLifetimeEach(-1);

trex.changeAnimation("colidindo");

gameover.visible=true;
recomecar.visible=true;




}

//colidir
trex.collide(soloinvisivel);

drawSprites();



}

function gerarnuvens(){
    if(frameCount%60===0){
    nuvem=createSprite(600,100,40,10);
    nuvem.velocityX=-5;
    nuvem.addImage(nuvemimagem);
nuvem.y=Math.round(random(20,100))
nuvem.scale=0.5;
nuvem.lifetime=130;
nuvem.depth=trex.depth;
trex.depth=trex.depth+1;
console.log(trex.depth);   
console.log(nuvem.depth);
grupodenuvens.add(nuvem);

}
    

}

function gerarobstaculos(){

if(frameCount%60===0){
 
    obstaculos=createSprite(400,165,10,40);
    obstaculos.velocityX=-5;
    obstaculos.scale=0.4;
    obstaculos.lifetime=130;
      
    grupodeobstaculos.add(obstaculos);
    obstaculos.debug=false; 
    var value=Math.round(random(1,6));
     switch(value){
         case 1:
            obstaculos.addImage(obstaculos1);
            break;
         case 2:
            obstaculos.addImage(obstaculos2);
            break;
         case 3:
            obstaculos.addImage(obstaculos3);
            break;
        case 4:
            obstaculos.addImage(obstaculos4);
            obstaculos.setCollider("circle",0,0,15)
            break;
        case 5:
            obstaculos.addImage(obstaculos5);
            break;
        case 6:
            obstaculos.addImage(obstaculos6);
            obstaculos.setCollider("circle",0,0,15);
            break;
            default:
            break;
     }  
    }

}
