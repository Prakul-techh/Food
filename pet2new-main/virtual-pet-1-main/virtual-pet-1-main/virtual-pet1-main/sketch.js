//Create variables here
var dog,sadDog,happyDog,garden,washroom;
var food,feedstock;
var feed,addFood;
var fedTime,lastFed,currentTime;
var foodObj;
var database;
var gameState,readState;

function preload()
{
sadDog=loadImage("images/Dog.png")
happyDog=loadImage("images/happy dog.png")
garden=loadImage("images/Garden.png")
washroom=loadImage("images/Wash Room.png")
bedroom=loadImage("images/Bed Room.png")
}

function setup() {
 
  database=firebase.database();
  createCanvas(400, 500);

  foodObj=new Food();

  feedStock=database.ref('Food');
  feedStock.on("value",readStock);

  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })

  dog=createSprite(400,400,50,50)
  dog.addImage(sadDog);
  dog.scale=0.15;
 

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFood)

 

  
}

function fedTime(){


}


function draw() {  
  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry")
    foodObj.display();
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  drawSprites();


}
function readStock(data){
  food=data.val();
  foodObj.updateFoodStock(food)
}

function feedDog(){
  dog.addImage(happyDog)

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }

  
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    fedTime: hour ()
  })
}

function addFood(){
  food++;
  database.ref('/').update({
    food:foodS
  })
}


function writeStock(x){
  if(x<=0)
  {x=0}
  else
  {x=x-1;}
  database.ref('/').update({Food:x})

}





