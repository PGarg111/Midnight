const passages = {
    "30": [
        { name: "Golden Dusk", text: "The sun slipped behind the hills, painting the sky in gentle shades of gold and violet. A breeze carried the scent of pine and distant rain"},
        {name: "The Rhythm of Typing", text: "Typing is more than speed-it's rhythm, focus, and flow. Every keystroke builds confidence, one word at a time."}
    ],
    "60": [
        { name: "Whispers Between the Shelves", text: "The library was silent except for the faint rustle of turning pages. Dust motes drifted in the sunlight that spilled through tall windows. Each shelf was a portal, holding worlds waiting to be explored. A student sat at the far end, lost in thought, her pencil tapping softly as she wrote notes in the margins. Outside, the world rushed on—but in here, time slowed, and imagination ruled."},
        {name: "The Spark of Curiosity", text: "Technology changes faster than most can keep up with. What feels new today might be forgotten tomorrow. Yet, behind every innovation is the same spark: curiosity. It drives us to explore, to question, to create something better than before. Progress isn’t just invention—it’s persistence, imagination, and courage to keep learning."}
    ],    
    "120": [
        { name: "Echoes in the Forest", text: "It began as a whisper among the trees, a wind carrying stories from long ago. Travelers who passed through the valley said the forest could remember voices. Every leaf trembled with old secrets, every root clung to memories buried beneath the soil. When the moon rose, the forest shimmered faintly, as though caught between dreaming and waking. A boy once followed that glow, chasing the sound of laughter that seemed to echo from nowhere. No one knows what he found, but sometimes, if you stand still enough, you can almost hear footsteps in the distance, fading gently with the wind."},
        {name: "City Morning Symphony", text: "Morning light spilled across the horizon, touching rooftops and rivers alike. The city stirred slowly, stretching into motion. Buses rumbled down narrow streets, shopkeepers lifted shutters, and early risers filled the sidewalks with quiet determination. For a moment, the world seemed to move in perfect sync—each person part of a grand routine. Yet within every routine lives a story, a dream, or a quiet rebellion waiting to begin."}
    ],
    "180": [
        { name: "Stargazer's Solitude", text: "In the heart of a distant desert stood a solitary observatory. It wasn’t large, but its telescope pointed endlessly toward the stars, searching for patterns in the infinite. The astronomer who worked there lived alone, surrounded by silence and sky. Every night, he tracked faint trails of light, recording data in careful handwriting. He knew most people would never see what he saw, yet that didn’t matter. His joy came from discovery—the thrill of realizing that even the smallest observation could unlock a secret of the universe. On quiet nights, when the stars shone especially bright, he would step outside and just look up, forgetting the world below. The desert wind hummed softly, and the stars seemed to whisper back. Out there, under the endless dark, time itself felt small."}
    ]
};

const target = document.getElementById("target");
const mode = document.getElementById("selected-passage");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const typedInput = document.getElementById("typed");
const timeDisplay = document.getElementById("time-display");
const wpmDisplay = document.getElementById("wpm");
const accDisplay = document.getElementById("accuracy");
const finalWpm = document.getElementById("final-wpm");
const finalAcc = document.getElementById("final-acc");

let time;
let timeLeft = 0;
let startTime;
let passageText = "";
let keystrokes = 0;

function getRandomPassageByTime(seconds){
    const options = passages[seconds];
    return options[Math.floor(Math.random() * options.length)];
}



startBtn.addEventListener("click", () => {
    const selectedOption = modeSelect.options[modeSelect.selectedIndex].text;
    if(selectedOption.includes("1 minute")) timeLeft = 60;
    else if(selectedOption.includes("2 minutes")) timeLeft = 120;
    else if(selectedOption.includes("3 minutes")) timeLeft = 180;
    else timeLeft = 30;

    const chosen = getRandomPassageByTime(timeLeft);
    target.textContent = `${chosen.name}\n\n${chosen.text}`;
    passageText = chosen.text;

    typedInput.value = "";
    typedInput.disabled = false;
    typedInput.focus();
    wpmDisplay.textContent = "0";
    accDisplay.textContent = "100%";
    keystrokes = 0;

    startTimer();

});

function startTimer() {
    clearInterval(timer);
    startTime = Date.now();

    timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - starttime) / 1000)
        const remaining = timeLeft - elapsed;
        timeDisplay.textContent = `${remaining}s`;

        
    })
}



