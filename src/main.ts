import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string; // Added description field
}

// Available items array with descriptions
const availableItems: Item[] = [
  { name: "NVIDIA GTX 1650", cost: 10, rate: 0.1, description: "A budget graphics card that speeds up Shitcoin mining." },
  { name: "AMD Radeon RX 580", cost: 100, rate: 2, description: "A reliable graphics card for efficient Shitcoin production." },
  { name: "NVIDIA RTX 4090", cost: 1000, rate: 50, description: "A top-of-the-line card for serious Shitcoin miners!" },
  { name: "High-Power Supercomputer", cost: 5000, rate: 200, description: "A powerful beast that accelerates Shitcoin mining to new heights." },
  { name: "Quantum Computer", cost: 15000, rate: 500, description: "A futuristic setup that maximizes your Shitcoin output." },
];

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Shitcoin Simulator";
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Price multiplier
const PRICE_INCREASE_FACTOR = 1.15;

let currentNumPerClick: number = 1;
let counter: number = 0;

interface UpgradesBought {
  [key: string]: number; // Allow any string as a key with a number value
}

let upgradesBought: UpgradesBought = {
  "NVIDIA GTX 1650": 0,
  "AMD Radeon RX 580": 0,
  "NVIDIA RTX 4090": 0,
  "High-Power Supercomputer": 0,
  "Quantum Computer": 0,
};

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
growthRateDiv.innerText = `Current Shitcoin Mining Rate: ${currentNumPerClick} 🪙/click`;

// Create display for items bought
const itemsBoughtDiv = document.createElement('div');
itemsBoughtDiv.id = 'itemsBoughtDisplay';
itemsBoughtDiv.style.textAlign = 'center';
itemsBoughtDiv.style.marginTop = '10px';
itemsBoughtDiv.style.fontSize = '16px';
document.body.appendChild(itemsBoughtDiv);
itemsBoughtDiv.innerText = `Bought: NVIDIA GTX 1650: ${upgradesBought["NVIDIA GTX 1650"]}, AMD Radeon RX 580: ${upgradesBought["AMD Radeon RX 580"]}, NVIDIA RTX 4090: ${upgradesBought["NVIDIA RTX 4090"]}, High-Power Supercomputer: ${upgradesBought["High-Power Supercomputer"]}, Quantum Computer: ${upgradesBought["Quantum Computer"]}`;

// Function to update the counter
const updateCounter = () => {
  counter += currentNumPerClick;
  counterDiv.innerText = `${counter} Shitcoins 🚀`;
};

// Create the clickable PNG button
const button = document.createElement('img');

// Set the PNG image source
button.src = "https://s2.coinmarketcap.com/static/img/coins/200x200/17228.png";

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

const updateUIAfterUpgrade = () => {
  counterDiv.innerText = `${counter} Shitcoins 🚀`;
  growthRateDiv.innerText = `Current Shitcoin Mining Rate: ${currentNumPerClick.toFixed(1)} 🪙/click`;
  itemsBoughtDiv.innerText = `Bought: NVIDIA GTX 1650: ${upgradesBought["NVIDIA GTX 1650"]}, AMD Radeon RX 580: ${upgradesBought["AMD Radeon RX 580"]}, NVIDIA RTX 4090: ${upgradesBought["NVIDIA RTX 4090"]}, High-Power Supercomputer: ${upgradesBought["High-Power Supercomputer"]}, Quantum Computer: ${upgradesBought["Quantum Computer"]}`;

  updateUpgradeButtons();
};

const performUpgrades = (item: Item) => {
  const cost = item.cost;
  if (counter >= cost) {
    counter -= cost;
    currentNumPerClick += item.rate;
    upgradesBought[item.name]++;
    item.cost *= PRICE_INCREASE_FACTOR;

    updateUIAfterUpgrade();
  }
};

// Function to create upgrade buttons dynamically
const createUpgradeButton = (item: Item) => {
  const button = document.createElement('button');
  button.innerHTML = `Upgrade: +${item.rate} ${item.cost.toFixed(1)}<br>${item.description}`;
  button.style.padding = '10px 20px';
  button.style.fontSize = '16px';
  button.style.cursor = 'pointer';
  button.style.width = '100%'; // Ensure button takes full width

  // Add event listener for the upgrade
  button.addEventListener('click', () => performUpgrades(item));

  return button;
};

// Create upgrade container for vertical layout
const upgradeContainer = document.createElement('div');
upgradeContainer.id = 'upgradeContainer';
document.body.appendChild(upgradeContainer);

// Create all upgrade buttons from available items and append them to the container
availableItems.forEach(item => {
  const button = createUpgradeButton(item);
  upgradeContainer.appendChild(button);
});

// Function to update the text on upgrade buttons after a purchase
const updateUpgradeButtons = () => {
  upgradeContainer.querySelectorAll('button').forEach((button, index) => {
    const item = availableItems[index];
    button.innerHTML = `Upgrade: +${item.rate} ${item.cost.toFixed(1)}<br>${item.description}`;
  });
};

// Check upgrade availability and disable buttons
const checkUpgradeAvailability = () => {
  upgradeContainer.querySelectorAll('button').forEach((button, index) => {
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
