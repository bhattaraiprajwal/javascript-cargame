class Car {
  #name;
  constructor(carName) {
    this.#name = carName;
    this._speed = 0;
  }

  get speed() {
    console.log("GET SPEED");
    return this._speed;
  }

  set speed(newValue) {
    console.log("SET SPEED");
    this._speed = newValue;
  }

  accelerate(amount) {
    this.speed += amount; // speed = speed + amount;
    this.showSpeed();
  }

  brake(speedReduction) {
    this.speed = this.speed < speedReduction ? 0 : this.speed - speedReduction;
    this.showSpeed();
  }

  showSpeed() {
    alert(`${this.#name} is going ${this.speed * 10} miles per hour.`);
  }
}
const ROAD = "|                             |";
let CAR_SYMBOL = "V";

// Control keys
const LEFT = "a";
const STRAIGHT = "s";
const RIGHT = "d";
const ACCELERATE = "w";
const BRAKE = "x";
const INFO = "i";
const QUIT = "q";

// Directions
const DIRECTION_LEFT = -1;
const DIRECTION_STRAIGHT = 0;
const DIRECTION_RIGHT = 1;

let accelerationFactor = 0;
let carPosition = 15;

let batmobile = new Car("The Batmobile");
let outputDiv = getOutputDiv();

// Instructions
const INSTRUCTIONS = `Welcome to the Console Grand Prix <br>
                Control your car by pressing Left button to go left, and Right button to go right. Straight button will go straight.<br>
                The faster your car's going, the further down the track, it
                will travel in the chosen direction.  Watch out for the bends!
                Choose the acceleration/deceleration factor by pressing a number key.<br>
                You can press accelerate and enter amount by which car will accelerate, Press brake and enter amount, car will brake by that amount.<br>
                Your car starts off stationary, so you'll need to accelerate before you can move.
                Press info to find out your current speed.'q' will quit.`;

outputDiv.innerHTML = INSTRUCTIONS;

function accelerate() {
  accelerationFactor = parseInt(
    prompt("Enter amount by which you wish to accelerate")
  );
  batmobile.accelerate(accelerationFactor);
}

function stillOnTrack(position, road) {
  return position < road.length && road[position] == " ";
  // if ((position < road.length) && road[position] == ' ') {
  //     return true;
  // } else{
  //     return false;
  // }
}

function letsDrive(speed, direction) {
  if (accelerationFactor == 0) {
    alert(`Please start the car`);
  } else {
    for (let i = 0; i < speed; i++) {
      carPosition = carPosition - direction;
      if (stillOnTrack(carPosition, ROAD)) {
        drawRoad(carPosition);
      } else {
        alert("Oops! You've crashed! Game over.");
        break;
      }
    }
  }
}

function drive(control) {
  switch (control) {
    case LEFT:
      letsDrive(batmobile.speed, DIRECTION_LEFT);
      break;
    case STRAIGHT:
      letsDrive(batmobile.speed, DIRECTION_STRAIGHT);
      break;
    case RIGHT:
      letsDrive(batmobile.speed, DIRECTION_RIGHT);
      break;
    case BRAKE:
      accelerationFactor = parseInt(
        prompt("Enter amount by which you wish to brake")
      );
      batmobile.brake(accelerationFactor);
      console.log(accelerationFactor);
      break;
    case INFO:
      batmobile.showSpeed();
      break;
    case ACCELERATE:
      accelerationFactor = parseInt(
        prompt("Enter amount by which you wish to accelerate")
      );
      batmobile.accelerate(accelerationFactor);
      break;
    case QUIT:
      break;
  }
}

function drawRoad(carPosition) {
  roadLine = ROAD.slice(0, carPosition) + CAR_SYMBOL + ROAD.slice(carPosition);
  //console.log(roadLine);
  outputDiv.innerHTML += `<pre>${roadLine}</pre>`;
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

function getOutputDiv() {
  return document.getElementById("car-output");
}
