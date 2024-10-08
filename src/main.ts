import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Vincent Fu";
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

// Function to update the counter display
const updateCounterDisplay = () => {
    counterDiv.innerText = `${counter.toFixed(2)} launches 🚀`;
};

// Add an event listener to the button to update the counter on click
button.addEventListener('click', () => {
    counter += 1;
    updateCounterDisplay();
});

let lastFrameTime = performance.now(); // Initialize with the time of the first frame

// Function to increment the counter based on elapsed time
const growCounter = (currentTime: DOMHighResTimeStamp) => {
    const timeElapsed = currentTime - lastFrameTime; // Calculate time elapsed since last frame
    lastFrameTime = currentTime;
    
    // Calculate the fraction to increment based on elapsed time
    counter += timeElapsed / 1000; // Since we want to increase by 1 unit per second

    updateCounterDisplay();

    // Request the next frame
    requestAnimationFrame(growCounter);
};

// Start the animation loop
requestAnimationFrame(growCounter);