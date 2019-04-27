
/**
 * FlockingBlackHole
 * Inspired by Daniel Shiffman's
 * Coding Challenges: CC 144 | Black Hole Simulation
 * @author <https://github.com/anuraghazra>
 * @demo <https://anuraghazra.github.io/FlockingBlackHole>
 */

let boids = [];
let blackholes = [];
let ship;

const config = {
  G: 6.5,
  C: 10,
  "Show Names": false,
  separate: 3.0,
  align: 2.2,
  cohesion: 1.7,
  wander: 0.8,
}
let canvas;

function setup() {
  canvas = createCanvas(windowWidth - 5, windowHeight - 5);
  ellipseMode(RADIUS);

  ship = new Ship();
  blackholes.push(new BlackHole(width / 2, height / 2, 100))

  for (let i = 0; i < 200; i++) {
    boids.push(new Boid(random(width), random(height)))
  }

  let gui = new dat.GUI();
  gui.add(config, 'Show Names');
  gui.add(config, 'G', 0, 50, 0.01);
  gui.add(config, 'C', 0, 50, 0.01);
  gui.add(config, 'separate', 0, 10, 0.1);
  gui.add(config, 'align', 0, 10, 0.1);
  gui.add(config, 'cohesion', 0, 10, 0.1);
  gui.add(config, 'wander', 0, 10, 0.1);


  canvas.elt.addEventListener('mousedown', function () {
    blackholes.push(new BlackHole(mouseX, mouseY, 100))
  })
}

function draw() {
  background(255);

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  ship.rotation = 0;
  ship.boosting(false)
  if (keyIsDown(RIGHT_ARROW)) {
    ship.setRotation(0.1);
  }
  if (keyIsDown(LEFT_ARROW)) {
    ship.setRotation(-0.1);
  }
  if (keyIsDown(UP_ARROW)) {
    ship.boosting(true);
  }

  
  for (const b of blackholes) {
    b.render();
  }

  if (boids.length < 200) {
    boids.push(new Boid(random(width), random(height)))
  }

  for (let i = boids.length - 1; i >= 1; i--) {
    if (boids[i]) {
      for (const b of blackholes) {
        b.pull(boids[i]);
        b.pull(ship);
      }

      boids[i].flockMultiplier = {
        separate: config.separate,
        align: config.align,
        cohesion: config.cohesion,
        wander: config.wander
      };
      boids[i].update()
      boids[i].boundaries()
      boids[i].applyFlock(boids)
      boids[i].render()
      config["Show Names"] && boids[i].renderNames()

    }

    for (const b of blackholes) {
      if (b.swallow(ship)) {
        ship.pos.x = 100;
        ship.vel.mult(0);
      }
      if (boids[i] && b.swallow(boids[i])) {
        boids.splice(i, 1);
      }
    }


  }
}