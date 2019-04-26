class Boid {

  constructor(x, y, radius) {
    this.pos = new Vector(x, y);
    this.acc = new Vector(0, 0);
    this.vel = new Vector.random2D(0, 0);
    // this.vel.mult(10);

    this.radius = radius || 5;
    this.maxSpeed = 5;
    this.maxForce = 0.05;
    this.mass = 1;
    this.theta = 0;
    this.isDead = false;

    this.flock = new Flock(this);
    this.flockMultiplier = {
      separate: 3.0,
      align: 2.2,
      cohesion: 1.7,
      wander: 0.8
    };


    let names = [
      'hanna', 'mona', 'cutie',
      'sweety', 'sofia', 'rose',
      'laisy', 'daisy', 'mia',
      'joe', 'jim', 'kim',
      'keo', 'shaun', 'morgan',
      'jery', 'tom', 'anu',
      'brian', 'ninja', 'daniel'
    ];

    this.name = names[floor(random(names.length))];


  }
  

  /**
   * @method update()
   * updates velocity, position, and acceleration
   */
  update() {
    this.vel.add(this.acc);
    // this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  /**
   * @method applyForce()
   * @param {Number} f 
   * applies force to acceleration
   */
  applyForce(f) { this.acc.add(f) }


  /**
   * @method boundaries()
   * check boundaries and limit agents within screen
   */
  boundaries() {
    let d = 100;
    let desire = null;
    if (this.pos.x < d) {
      desire = new Vector(this.maxSpeed, this.vel.y);
    }
    else if (this.pos.x > width - d) {
      desire = new Vector(-this.maxSpeed, this.vel.y);
    }
    if (this.pos.y < d) {
      desire = new Vector(this.vel.x, this.maxSpeed);
    }
    else if (this.pos.y > height - d) {
      desire = new Vector(this.vel.x, -this.maxSpeed);
    }
    if (desire !== null) {
      desire.normalize();
      desire.mult(this.maxSpeed);
      let steer = Vector.sub(desire, this.vel);
      steer.limit(0.10);
      this.applyForce(steer);
    }
  }


  /**
   * @method applyFlock()
   * @param {*} agents 
   * calculates all the flocking code apply it to the acceleration
   */
  applyFlock(agents) {
    let sep = this.flock.separate(agents);
    let ali = this.flock.align(agents);
    let coh = this.flock.cohesion(agents);
    let wander = this.flock.wander();

    sep.mult(this.flockMultiplier.separate);
    ali.mult(this.flockMultiplier.align);
    coh.mult(this.flockMultiplier.cohesion);
    wander.mult(this.flockMultiplier.wander);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
    this.applyForce(wander);
  }


  renderNames() {
    noStroke();
    fill(35);
    textAlign(CENTER);
    textSize(10)
    text(this.name, this.pos.x - this.radius, this.pos.y - this.radius - 5)
  }
  /**
   * Render Agent
   * @param {CanvasRenderingContext2D} ctx
   */
  render() {
    let angle = this.vel.heading();
    noStroke()
    fill(0, 100, 155);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    beginShape();
    vertex(this.radius, 0);
    vertex(-this.radius, -this.radius + 2);
    vertex(-this.radius, this.radius - 4)
    endShape(CLOSE)
    pop();

  }
}
