var test = 0;
class Food {
    constructor(){
        this.foodStock = 20,
        this.image = loadImage("images/Milk.png");
    }
    getFoodStock(){
        database.ref("food").on("value", function(data){
            test = data.val();
        });
        this.foodStock = test;
    }
    display(){
        var x=80, y=100;

        imageMode(CENTER);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=580;
                    y=y+50;
                }
                image(this.image, x, y, 50, 50);
                x=x+30;
            }
        }
    }
} 