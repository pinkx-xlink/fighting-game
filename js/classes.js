class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale,
        this.framesMax = framesMax,
        this.framesCurrent = 0,
        this.framesElapsed = 0,
        this.framesHold = 10
    }

    // 0, 0, this.image.width, & this.image.height are the
    // arguments used to crop a long strip of Sprites to be
    // used in an animation;
    // we divide by 6 b/c there are 6 images in the animation
    // so this will make all "frames" the same
    draw() {
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        )
    }

    update() {
        this.draw();
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }  
    }
}

class Fighter extends Sprite {
    constructor({ 
        position, 
        velocity, 
        color = 'pink', 
        offset, 
        imageSrc, 
        scale = 1, 
        framesMax = 1 
    }) {
        super({
            position,
            imageSrc,
            framesMax
        })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0,
        this.framesElapsed = 0,
        this.framesHold = 10
    }

   
    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y;

        // prevents from falling below canvas
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
        } else this.velocity.y += gravity;
    }
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}
