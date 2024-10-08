import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Shitcoin Simulator";

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Price multiplier
const priceIncreaseFactor = 1.15;

let currentAdd: number = 1;
let counter: number = 0;
let upgradesBought = { upgrade1: 0, upgrade2: 0, upgrade3: 0 }; // Track number of items bought
let upgradePrices = { upgrade1: 10, upgrade2: 100, upgrade3: 1000 }; // Track number of items bought
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
itemsBoughtDiv.innerText = `Bought: NVIDIA GTX 1650: ${upgradesBought.upgrade1}, AMD Radeon RX 580: ${upgradesBought.upgrade2}, NVIDIA RTX 4090: ${upgradesBought.upgrade3}`;

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

// Create the upgrade buttons
const button2 = document.createElement('button');
button2.id = "upgrade";
button2.innerHTML = `Upgrade: +0.1 ${upgradePrices["upgrade1"]}`;
document.body.appendChild(button2);
button2.style.padding = '10px 20px';
button2.style.fontSize = '16px';
button2.style.cursor = 'pointer';

const button3 = document.createElement('button');
button3.id = "upgrade";
button3.innerHTML = `Upgrade: +2.0 ${upgradePrices["upgrade2"]}`;
document.body.appendChild(button3);
button3.style.padding = '10px 20px';
button3.style.fontSize = '16px';
button3.style.cursor = 'pointer';

const button4 = document.createElement('button');
button4.id = "upgrade";
button4.innerHTML = `Upgrade: +50.0 ${upgradePrices["upgrade3"]}`;
document.body.appendChild(button4);
button4.style.padding = '10px 20px';
button4.style.fontSize = '16px';
button4.style.cursor = 'pointer';

// Function to perform upgrades and track items bought
const performUpgrades = (addValue: number, upgradeKey: keyof typeof upgradesBought) => {
    let cost: number = upgradePrices[upgradeKey]
    if (counter >= cost) {
        counter -= cost;
        currentAdd += addValue;
        upgradesBought[upgradeKey]++; // Increment the number of items bought
        upgradePrices[upgradeKey] *= priceIncreaseFactor;
        counterDiv.innerText = `${counter} launches 🚀`;
        growthRateDiv.innerText = `Current Shitcoin Mining Rate: ${currentAdd.toFixed(1)} 🪙/click`;
        itemsBoughtDiv.innerText = `NVIDIA GTX 1650: ${upgradesBought.upgrade1}, AMD Radeon RX 580: ${upgradesBought.upgrade2}, NVIDIA RTX 4090: ${upgradesBought.upgrade3}`;

        button2.innerHTML = `Upgrade: +0.1 ${upgradePrices["upgrade1"].toFixed(1)}`;
        button3.innerHTML = `Upgrade: +2.0 ${upgradePrices["upgrade2"].toFixed(1)}`;
        button4.innerHTML = `Upgrade: +50.0 ${upgradePrices["upgrade3"].toFixed(1)}`;
    }
};

// Add event listeners to upgrade buttons
button2.addEventListener('click', () => performUpgrades(0.1, 'upgrade1'));  // Costs 10 points, adds 0.1
button3.addEventListener('click', () => performUpgrades(2.0, 'upgrade2')); // Costs 100 points, adds 2.0
button4.addEventListener('click', () => performUpgrades(50.0, 'upgrade3')); // Costs 1000 points, adds 50.0

// Check upgrade availability
const checkUpgradeAvailability = () => {
    button2.disabled = counter < upgradePrices["upgrade1"];
    button3.disabled = counter < upgradePrices["upgrade2"];
    button4.disabled = counter < upgradePrices["upgrade3"];
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
