let particles = [];
let numParticles;
let noiseScale = 0.01;
const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)

let amt, startColor, newColor;

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('myContainer');
    canvas.mousePressed(doStuff);
    
    if (isMobileDevice) {
        numParticles = 2500;
    } else {
        numParticles = 1500;
    }
    for (let i = 0; i < numParticles; i++) {
        particles.push(createVector(random(width), random(height)));
    }

    startColor = color(255, 255, 255);
    newColor = color(random(255), random(255), random(255));
    amt = 0;
}

function doStuff() {
    noiseSeed(millis());
}

function checkOffScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}


//when press enter key, generate new particle
function keyPressed() {
    if (key == ' ') {
        generateNewParticle();
    }
}

//create new particle and push to particles array
function generateNewParticle() {
    if (particles.length < 10000) { // limit the amout of particles to 10k, after that it starts to slow down.
        particles.push(createVector(mouseX, mouseY));
    }
}

function smoothstep(edge0, edge1, x) {
    x = constrain((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return x * x * (3 - 2 * x);
}

function draw() {
    //adds alpha, can see what is being drawn behind the border. sliderValue comes from slider.js, deafault 10
    background(0, sliderValue/1); // I have no idea, but dividing by 1 makes it work, without it its broken??
    strokeWeight(weightValue);
    noiseScale = seed;
    
    if (document.getElementById('myCheck').checked) {
        stroke(lerpColor(startColor, newColor, smoothstep(0.3, 0.7, amt)));
        amt += 0.01;
        if (amt >= 1) {
            amt = 0.0;
            startColor = newColor;
            newColor = color(random(255), random(255), random(255));
        }
    } else {
//        stroke('rgb(0,255,0)'); //green
//        stroke('rgba(0, 255, 0, 1.0)');// green, opactity value
        stroke('rgb(255,255,255)'); //white

    }

    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        point(particle.x, particle.y);
        let n = noise(particle.x * noiseScale, particle.y * noiseScale);
        let mapNoise = TAU * n; // map between 0 and 2pi, TAU is 2pi
        particle.x += cos(mapNoise);
        particle.y += sin(mapNoise);

        if (!checkOffScreen(particle)) { // if the particles moves off screen, comes back in at random point.
            particle.x = random(width);
            particle.y = random(height);
        }
    }
}
