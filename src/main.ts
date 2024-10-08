import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Vincent Fu";

let currentAdd: number = 1;
document.title = gameName;
let counter: number = 0;
const counterDiv = document.createElement('div');
counterDiv.id = 'counterDisplay';
counterDiv.style.textAlign = 'center'; // Center-align the text within the div
counterDiv.style.marginTop = '20px'; // Add margin to separate from the button
counterDiv.style.fontSize = '18px'; // Set a larger font size for visibility
document.body.appendChild(counterDiv);

// Set initial counter text
counterDiv.innerText = `${counter} launches 🚀`;

// Create a new button element
const button = document.createElement('button');

// Set the inner text or HTML of the button
button.innerHTML = "🚀 My button";

// Optionally set an ID or class if you need to style it later
button.id = "funButton";

// Append the button to the body (or to any other container)
document.body.appendChild(button);
button.style.position = 'absolute';
button.style.top = '70%';
button.style.left = '50%';
button.style.transform = 'translate(-50%, -50%)';
button.style.padding = '10px 20px';  // Add some padding for a nicer appearance
button.style.fontSize = '16px';      // Adjust font size
button.style.cursor = 'pointer';  

// Function to update the counter
const updateCounter = () => {
    counter += currentAdd;
    counterDiv.innerText = `${counter} launches 🚀`;
  };
  
  // Add an event listener to the button to update the counter on click
button.addEventListener('click', updateCounter);

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);


let lastTime = 0;

function incrementCounter(currentTime: number) {
    if (lastTime !== 0) {
        const deltaTime = currentTime - lastTime;  
        counter += deltaTime / 1000;              
        counterDiv.innerText = `${counter.toFixed(0)} launches 🚀`;
        
        checkUpgradeAvailability();
        
    }
    lastTime = currentTime;                        
    requestAnimationFrame(incrementCounter);     
}
requestAnimationFrame(incrementCounter);


// Create a new button element
const button2 = document.createElement('button');
// Optionally set an ID or class if you need to style it later
button2.id = "upgrade";
button2.innerHTML = "Upgrade";

// Append the button to the body (or to any other container)
document.body.appendChild(button2);
button2.style.position = 'absolute';
button2.style.top = '90%';
button2.style.left = '50%';
button2.style.transform = 'translate(-50%, -50%)';
button2.style.padding = '10px 20px';  // Add some padding for a nicer appearance
button2.style.fontSize = '16px';      // Adjust font size
button2.style.cursor = 'pointer';  

button2.disabled = true;

const checkUpgradeAvailability = () => {
    if (counter>=10) {
        button2.disabled = false;
        button2.style.cursor = 'pointer';
        button2.style.backgroundColor = ''; // Restore default color
    }
    if(counter<10){
        button2.disabled = true;
    }
};

const performUpgrades = () =>{
    counter-=10;
    currentAdd+=1;

}

button2.addEventListener('click', performUpgrades);

