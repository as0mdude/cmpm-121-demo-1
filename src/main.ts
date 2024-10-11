import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  amount: number;  // New field for tracking the number of items bought
}

// Available items array
const availableItems: Item[] = [
  { name: "NVIDIA GTX 1650", cost: 10, rate: 0.1, amount: 0 },
  { name: "AMD Radeon RX 580", cost: 100, rate: 2, amount: 0 },
  { name: "NVIDIA RTX 4090", cost: 1000, rate: 50, amount: 0 },
];

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Shitcoin Simulator";

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Price multiplier
const priceIncreaseFactor = 1.15;

let currentAdd: number = 1;
let counter: number = 0;
document.title = "Shitcoin Simulator";

// Create display for counter
const counterDiv = document.createElement('div');
counterDiv.id = 'counterDisplay';
counterDiv.style.textAlign = 'center';
counterDiv.style.marginTop = '20px';
counterDiv.style.fontSize = '18px';
document.body.appendChild(counterDiv);
counterDiv.innerText = `${counter} Shitcoins 🚀`;

// Create display for current growth rate
const growthRateDiv = document.createElement('div');
growthRateDiv.id = 'growthRateDisplay';
growthRateDiv.style.textAlign = 'center';
growthRateDiv.style.marginTop = '10px';
growthRateDiv.style.fontSize = '16px';
document.body.appendChild(growthRateDiv);
growthRateDiv.innerText = `Current Shitcoin Mining Rate: ${currentAdd} 🪙`;

// Create display for items bought
const itemsBoughtDiv = document.createElement('div');
itemsBoughtDiv.id = 'itemsBoughtDisplay';
itemsBoughtDiv.style.textAlign = 'center';
itemsBoughtDiv.style.marginTop = '10px';
itemsBoughtDiv.style.fontSize = '16px';
document.body.appendChild(itemsBoughtDiv);
itemsBoughtDiv.innerText = `Bought: NVIDIA GTX 1650: ${availableItems[0].amount}, AMD Radeon RX 580: ${availableItems[1].amount}, NVIDIA RTX 4090: ${availableItems[2].amount}`;

// Function to update the counter
const updateCounter = () => {
  counter += currentAdd;
  counterDiv.innerText = `${counter} Shitcoins 🚀`;
};

// Create the clickable PNG button
const button = document.createElement('img');

// Set the PNG image source
button.src = "src/17228.png"; // Replace with the actual path to your PNG

// Set the button's styling to make it big and position it at the top
button.style.width = '300px';  // Adjust width as needed for size
button.style.height = 'auto';  // Keep the aspect ratio
button.style.position = 'absolute'; // Use absolute positioning
button.style.top = '20px';     // Set distance from the top of the screen
button.style.left = '50%';     // Center horizontally
button.style.transform = 'translateX(-50%)'; // Adjust to center properly
button.style.cursor = 'pointer';  // Make it clickable

// Add the click event listener
button.addEventListener('click', updateCounter);

// Append the image to the body
document.body.appendChild(button);

// Function to perform upgrades and track items bought
const performUpgrades = (item: Item) => {
  let cost = item.cost;
  if (counter >= cost) {
    counter -= cost;
    currentAdd += item.rate;
    item.amount++;  // Increment the number of items bought
    item.cost *= priceIncreaseFactor;  // Increase cost for the next purchase

    counterDiv.innerText = `${counter} launches 🚀`;
    growthRateDiv.innerText = `Current Shitcoin Mining Rate: ${currentAdd.toFixed(1)} 🪙`;
    itemsBoughtDiv.innerText = `Bought: NVIDIA GTX 1650: ${availableItems[0].amount}, AMD Radeon RX 580: ${availableItems[1].amount}, NVIDIA RTX 4090: ${availableItems[2].amount}`;

    updateUpgradeButtons();
  }
};

// Function to create upgrade buttons dynamically
const createUpgradeButton = (item: Item) => {
  const button = document.createElement('button');
  button.innerHTML = `Upgrade: +${item.rate} (${item.cost})`;
  button.style.padding = '10px 20px';
  button.style.fontSize = '16px';
  button.style.cursor = 'pointer';

  // Add event listener for the upgrade
  button.addEventListener('click', () => performUpgrades(item));

  document.body.appendChild(button);
  return button;
};

// Create all upgrade buttons from available items
availableItems.forEach(createUpgradeButton);

// Function to update the text on upgrade buttons after a purchase
const updateUpgradeButtons = () => {
  document.querySelectorAll('button').forEach((button, index) => {
    const item = availableItems[index];
    button.innerHTML = `Upgrade: +${item.rate} (${item.cost.toFixed(1)})`;  // Update cost and rate
  });
};

// Check upgrade availability and disable buttons
const checkUpgradeAvailability = () => {
  document.querySelectorAll('button').forEach((button, index) => {
    const item = availableItems[index];
    button.disabled = counter < item.cost;
  });
};

// Call `checkUpgradeAvailability` during each game loop
let lastTime = 0;
function incrementCounter(currentTime: number) {
  if (lastTime !== 0) {
    const deltaTime = currentTime - lastTime;
    counter += deltaTime / 1000;
    counterDiv.innerText = `${counter.toFixed(1)} Shitcoins 🚀`;
    checkUpgradeAvailability();
  }
  lastTime = currentTime;
  requestAnimationFrame(incrementCounter);
}
requestAnimationFrame(incrementCounter);
