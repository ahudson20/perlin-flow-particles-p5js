let particles = [];
const numParticles = 100;
const noiseScale = 0.01;

//var onlongtouch;
var timer;
var touchduration = 1000; //length of time we want the user to touch before we do something
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // check if browser is mobile

function touchStarted() {
    if (isMobile) {
        console.log("isMobile, touchStarted, generateNewParticle, start timer for alter noise seed");
        generateNewParticle();
        timer = setTimeout(onlongtouch, touchduration);
    }
}

function touchEnded() {
    //stops short touches from firing the event
    if (isMobile) {
        if (timer) {
            clearTimeout(timer); // clearTimeout, not cleartimeout..
        }
    }
}

function onlongtouch() {
    //    generateNewParticle();
    if (isMobile) {
        console.log("longtouch noiseseed");
        noiseSeed(millis());
    }
}

// meh it works but kinda not smooth.
function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < numParticles; i++) {
        particles.push(createVector(random(width), random(height)));
    }
    stroke(255);
    // For a cool effect try uncommenting this line
    // And comment out the background() line in draw
    //     stroke(255, 10);
}

function checkOffScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

// when the mouse clicks on screen, randomly changes the seed value for the noise function.
function mouseReleased() {
    if (!isMobile) {
        console.log("!isMobile, noise seed");
        noiseSeed(millis());
    }
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

function draw() {
    background(0, 10); //adds alpha, can see what is being drawn behind the border.

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
