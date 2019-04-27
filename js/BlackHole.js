/**
 * @author <https://anuraghazra.github.io>
 * @class BlackHole
 */
class BlackHole {
  constructor(x, y, mass) {
    this.pos = new Vector(x, y);
    this.mass = mass;
    this.rs = (2 * config.G * this.mass) / (config.C * config.C);
  }

  swallow(boid) {
    if (Vector.dist(this.pos, boid.pos) < 10) {
      return true;
    }
    return false;
  }

  pull(boid) {
    const force = Vector.sub(this.pos, boid.pos);
    let r = force.mag();
    let fg = config.G * boid.mass*this.mass / (r * r);
    force.normalize();
    force.setMag(fg);
    
    boid.vel.add(force);
    boid.vel.limit(config.C);
    if (r <= this.rs + 0.5) {
      boid.isDead = true;
    }

    // new
    // const force = Vector.sub(this.pos, boid.pos);
    // const theta = force.heading();
    // const r = force.mag();
    // let fg = G * this.mass / (r * r);
    // let deltaTheta = -fg * (dt / C) * sin(boid.theta - theta);
    // deltaTheta /= abs(1.0 - 2.0 * G * this.mass / (r * C * C));
    // boid.theta += deltaTheta;
    // boid.vel = Vector.fromAngle(boid.theta);
    // boid.vel.setMag(C);
    // if (r <= this.rs + 0.5) {
    //   boid.isDead = true;
    // }
  }

  render() {
    this.rs = (2 * config.G * this.mass) / (config.C * config.C);

    fill(0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rs);

    noFill();
    stroke(100, 50);
    strokeWeight(64);
    ellipse(this.pos.x, this.pos.y, this.rs * 3 + 32);

    stroke(100, 230, 165, 155);
    strokeWeight(32);
    ellipse(this.pos.x, this.pos.y, this.rs * 1.5 + 16);
  }
}