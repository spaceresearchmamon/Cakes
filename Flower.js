/*class Flower
{
    constructor(x,y,w,h,flowerAnime)
    {
        this.x=mouseX;
        this.y=y;
        this.w=w;
        this.h=h; 
        this.speed= 0.5;
        

        this.animation=flowerAnime;

        this.body= Bodies.rectangle(x,y,w,h);

        World.add(engine.world, this.body);
    }

    display()
    {
        var pos= this.body.position;
        var angle= this.body.angle;
        var index = floor(this.speed % this.animation.length);


        push();
                translate(pos.x, pos.y);
                rotate(angle);
                imageMode(CENTER);
                image(flowerAnime[index], 0, 0, 60, 60);
        pop();
    }
}*/