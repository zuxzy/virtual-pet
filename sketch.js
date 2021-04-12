var dog, happyDog, deadDog, database, foodS, foodStock;
var doggo, doggo1, doggo2;
var hungerLevel, hungerL;
var feed, addFood
var fedTime, lastFed
var foodObj
var dogState = "normal";
var dogName45

function preload(){
    dog = loadImage("images/dogimg.png");
    happyDog = loadImage("images/dogimg1.png");
    deadDog = loadImage("istockphoto-951307888-612x612.jpg");
}

function setup(){
    database = firebase.database();
    createCanvas(1000,500);

    doggo = createSprite(250, 250, 10, 10);
    doggo.addImage("normalDog", dog);
    doggo1 = createSprite(250, 250, 10, 10);
    doggo1.addImage("happy", happyDog);
    doggo2 = createSprite(250, 250, 10, 10);
    doggo2.addImage("dead", deadDog);
    doggo.scale = 0.3;
    doggo1.scale = 0.3;

    foodStock=database.ref("food");
    foodStock.on("value", readStock);

    hungerLevel=database.ref("hunger");
    hungerLevel.on("value", readHunger);

    feed = createButton("Feed the dog");
    feed.position(525, 95);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(625, 95);
    addFood.mousePressed(addFoods);

    foodObj = new Food();

    fill("blue");
    dogName = prompt("Please enter your dog's name.");
}

function draw(){
    background("rgb(46, 139, 87)");
    textSize(20);

    text(dogName, 250, 140);
    textSize(15);

    foodObj.display();
    foodObj.getFoodStock();

    fedTime = database.ref('FeedTime');
    fedTime.on("value", function(data){
        lastFed=data.val();
    });

    if(dogState === "normal"){
        doggo.visible = true;
        doggo1.visible = false;
        doggo2.visible = false;
        if(World.frameCount%60 === 0){
            writeHunger(hungerL)
        }
        if(hungerL > 900){
            dogState = "happy";
        }
        if(hungerL === 0){
            dogState = "dead";
        }
    }

    if(dogState === "happy"){
        doggo.visible = false;
        doggo1.visible = true;
        doggo2.visible = false;
        if(World.frameCount%60 === 0){
            writeHunger(hungerL)
        }
        if(hungerL < 900 && hungerL > 0){
            dogState = "normal";
        }
    }

    if(dogState === "dead"){
        doggo.visible = false;
        doggo1.visible = false;
        doggo2.visible = true;
    }
    drawSprites();
    fill("blue");
    text("Food Left: " + foodS, 225, 30);
    text("Hunger: " + hungerL, 225, 470);

    textSize(15);
    if(lastFed>=12){
        text("Last Fed : "+ lastFed%12 + " PM", 350, 30);
    }else if(lastFed===0){
        text("Last Fed : 12 AM", 350, 30);
    }else{
        text("Last Fed : "+ lastFed + " AM", 350, 30);
    }
}

    
function readStock(data){
   foodS=data.val();
}

function readHunger(data){
   hungerL = data.val();
}

function writeStock(x){

    if(x<=0){
        x=0;
    } else {
        x = x-1;
    }
    database.ref('/').update({
        food:x
    })
}

function addStock(z){

    if(z>=0){
        z=z+1;
    } 
    database.ref('/').update({
        food:z
    })
}


function writeHunger(y){

    if(y<=0){
        y=0;
    } else {
        y = y-1;
    }
    database.ref('/').update({
        hunger:y
    })
}

function feedDog(){
    if(hungerL <= 900){
        writeStock(foodS);
        hungerL = hungerL + 100;
    }
    database.ref('/').update({
        FeedTime:hour()
    })
}

function addFoods(){
    addStock(foodS);
}


function showError(){
    console.log("Error Occurred. Please Fix It You Idiot.");
}


