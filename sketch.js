
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

    var back, back2, resume, resumeImg;

var start=0;
let gamestate=start;
var play=1, win = 2, loss = 3;
    var b1;
var flowerAnime = [];
var fspritedata, fspritesheet;
var flower1;
var playBtn;

let sad;

var score=0;
var nonScore=0;
//sound
    var bg_sound;
    var doremon;

//var girl, girlImg;
var bubble, bubbleImg;

//CHOCOLATES
var candy1, candy2, candy3, candy4;
var candy;
var candies;

//VIRUSES
var v1, v2, v3, v4, v5;
let enemy;
var enemies;

//CONTAINER
let container, conImg;
let donut, dImg

//CUPCAKE
var cake;

//AFTER-WIN
swalImg;
//AFTER-WIN SOUND
winSng;

function preload()
{
  back=loadImage("img/back.jpg");
  resumeImg=loadImage("img/resume.png");
  back2=loadImage("img/back2.png");
  swalImg = loadImage("img/swal_img.jpg");
  cake=loadImage("img/cake1.png");
  bubbleImg=loadImage("img/bubble1.png");
  candy1 = loadImage("img/candy1.png");
  candy2 = loadImage("img/candy2.png");
  candy3 = loadImage("img/candy3.png");
  candy4 = loadImage("img/candy4.png");

  v1= loadImage("img/v1.png");
  v2= loadImage("img/v2.png");
  v3= loadImage("img/v3.png");
  v4= loadImage("img/v4.png");
  v5= loadImage("img/v5.png");

  conImg = loadImage("img/rock.png");
  dImg= loadImage("img/donut1.png");
 // fIMg=loadAnimation("img/f1.png","img/f2.png","img/f3.png");
  fspritesheet=loadImage("f1/f1.png");
  fspritedata=loadJSON("f1/f1.json");
  bg_sound=loadSound("bgSong.mp3");
  doremon= loadSound("doremon.mp3");
  winSng = loadSound("win.mp3");
  sad = loadSound("sad.wav");
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  engine = Engine.create();
  world = engine.world;
  candies= createGroup();
  enemies= createGroup();
  container= createSprite(width/2,height/1.6);
  container.addImage("con",conImg);
  container.visible=false;
  donut = createSprite(container.x,container.y-20);
  donut.x=mouseX;
  donut.visible=false;

  
  //The start button
  // Flower Animation
 /* var f_frames= fspritedata.frames;
  for(var i=0; i<flowerAnime.length; i++)
  {
    var pos=f_frames[i].position;
    var img1= fspritesheet.get(pos.x, pos.y, pos.w, pos.h);
    flowerAnime.push(img1);
  }*/
  
  //flower1= new Flower(width/2,height/2,50,50,flowerAnime);
 
 /*{ //flower

  flower=createSprite(width/2,height/2);
  //flower.addAnimation("fImg",fImg);
  flower.scale=0.5;
  flower.visible=false;}*/
  bubble=createSprite(width/15,height/1.4);
  bubble.addImage("bubble",bubbleImg);
  bubble.scale=1;
 
}


function draw() 
{
  background(0);
  Engine.update(engine);
  console.log(gamestate);

  
  //flower1.display();

 // var fl=image(flowerAnime,0,0,flower.width,flower.height);
 // console.log("flowerAnime"+fl.position.x,fl.position.y);
  //console.log("flower.body"+flower1.body.position.x,flower1.body.position.y);

  if(gamestate===start)
  {

   b1=image(back,0,0,width,height);
   //resume.visible=true;
   if(!bg_sound.isPlaying())
   {
     bg_sound.play();
   }
  /* else{
     bg_sound.stop();
   }*/
   swal(
    {
        title: `WELCOME TO THE SWEET LAND`,
        imageUrl:"https://m.psecn.photoshelter.com/img-get/I0000MtZIO4LqP1o/s/850/850/The-Land-of-the-Sweets.jpg",
        imageSize: "350x350",
        confirmButtonColor:"#1A73E8",
        confirmButtonText: "Play"

    },
      function(isConfirm)
      {
        if (isConfirm) 
        {
          setTimeout(()=>
          {
            gamestate=play;
          },
          10
          );
        }
      }
    );
   setTimeout(()=>
   {
    textSize(60);
    stroke("hotPink");
    fill("red");
    strokeWeight(5);
   text("Welcome To Sweet Land",width/4,height/5);
   },
   300
   );
   
    //flower.visible=false;
  }

 
  
  if(gamestate===play)
  {
    
     bg_sound.stop();
    image(back2,0,0,width,height);
    drawSprites();

    // b1=null;
    candy= createSprite(width/2,height-1000);
   
    choco();
   
    virus();
    if(!doremon.isPlaying())
    {
      doremon.play();
      doremon.loop=true;
    }
    var img;

    if(candies.isTouching(donut))
   {
     console.log("+1 candy");
     candies.destroyEach();
      score+=1;
      img=createSprite(bubble.x,bubble.y-20);
     { 
      //img.addImage("candy",candy1);
      img.scale=0.15;
     // img.x=mouseX;
      img.visible=true;
      img.addImage("candy", candy3);
     }
     
    
   }
   
   if(enemies.isTouching(donut))
   {
    nonScore+=1;
    enemies.destroyEach();
   }

   if(score===10)
   {
    winSng.play();

      setTimeout
      (
        ()=>
        {
          gamestate=win
        },
        10
      )
   }

   if(nonScore===2)
   {
     sad.play();
     setTimeout
     (
       ()=>
       {
         gamestate=loss;
       },
       1
     )
   }

  //img.x=mouseX;
    textSize(30);
    stroke("deepPink");
    fill("violet");
    text("Candies :"+score, width/1.2, height/10);

    textSize(30);
    stroke("red");
    strokeWeight(2);
    fill("black");
    text("Germs :"+nonScore, width/9.2, height/10);
  }
  if(gamestate===win)
  {
  
    imageMode(CENTER);
    image(swalImg,width/2,height/2,width,height);
    image(cake,width/2,height/1.6,200,200);

    doremon.stop();
    reset();
  }
  if(gamestate===loss)
  {
    enemies.destroyEach();
    candies.destroyEach();
    score=0;
    nonScore=0;
    doremon.stop();
    swal(
      {
        title: "Cake can't be made out of so many germs",
        text: "Please refine it",
        imageUrl: "data:image/jpeg;base64,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",
        imageSize: "300x300",
        confirmButtonColor:"#1A73E8",
        confirmButtonText: "REFINE"
      },
      function(isConfirm)
      {
        if(isConfirm)
        {enemies.destroyEach();
          candies.destroyEach();
          score=0;
          gamestate=start;
         
        }
      }
    );
  }
}

function choco()
{
   //Candy
   container.scale= 1.4;
  container.x = mouseX;
  container.visible= true;
  console.log(container.x);

  donut.addImage("donut1",dImg);
  donut.visible=true;
  donut.scale=0.9;
  donut.x= mouseX;
  
   if(frameCount%50===0)

   {
      candy= createSprite(width/2,height-1000);
      candy.x=Math.round(random(width/100,width/1.1));
      candy.velocityY=9;
      candy.velocityY+=10;
      candy.lifetime = 300;
      
      var r=Math.round(random(1,4));
      candy.visible=false;
      candy.scale=0.2;
          
       switch(r)
      {
        case 1: candy.addImage("candy1",candy1);
                console.log(candy.x,candy.y);
                candy.visible=true;
        break;

        case 1: candy.addImage("candy2",candy2);
        candy.visible=true;

        break;

        case 3: candy.addImage("candy3",candy3);
        candy.visible=true;

        break;
        
        case 4: candy.addImage("candy4",candy4);
        candy.visible=true;

        break;
      }
      candies.add(candy);
     
   }
   

}

function virus()
{
  if(frameCount%100===0)
  {

    enemy= createSprite(20,20);
    enemy.x= random(20,width-20);
    enemy.velocityY = 9;
    enemy.velocityY+=10;
    enemy.scale = 0.2;
    enemy.lifetime = 300;

    var r = Math.round(random(1,5));
    switch(r)
    {
      case 1: enemy.addImage("v1",v1);
      break;

      case 2: enemy.addImage("v2",v2);
      break;

      case 3:  enemy.addImage("v3",v3);
      break;

      case 4: enemy.addImage("v4",v4);
      break;

      case 5: enemy.addImage("v5",v5);
      break;

      
    }
    enemies.add(enemy);
  }
}

function reset()
{
  candies.destroyEach();
  enemies.destroyEach();
  score=0;
  nonScore=0;
  swal(
  {
    title: "Yeah! you got a cup cake",
    imageUrl:"https://www.chefspencil.com/wp-content/uploads/C8C826CA-E7FB-446D-A8CD-D906C134057A-400x400.jpeg",   
    confirmButtonColor: "#1A73E8",
    confirmButtonText : "Play Again"
  },
  function(isConfirm)
  {
    if(isConfirm)
    {
      setTimeout
      ( ()=>
        {
          gamestate=start
        },
        100
      )
    }
  }

  )
}

