
class Ship {
  constructor() {
    this.pos = new Vector(100, height / 2);
    this.r = 10;
    this.heading = 0;
    this.rotation = 0;
    this.vel = new Vector(0, 0);
    this.isBoosting = false;
    this.mass = 0.05;
    this.isDead = false;
    this.color = color(233, 62, 62);
  }
  boosting(b) {
    this.isBoosting = b;
  };
  update() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  };
  boost() {
    var force = Vector.fromAngle(this.heading);
    force.mult(0.15);
    this.vel.add(force);
  };
  render() {
    push();
    stroke(this.color);
    strokeWeight(1);
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    fill(this.color);
    beginShape();
    vertex(this.r, 0);
    vertex(-this.r, -this.r + 2);
    vertex(-this.r, this.r - 2)
    if (this.isBoosting) {
      line(0, 0, -this.r * 2, 0)
    }
    endShape(CLOSE)
    // triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  };
  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }
    else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    }
    else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  };
  setRotation(a) {
    this.rotation = a;
  };
  turn() {
    this.heading += this.rotation;
  };
}
