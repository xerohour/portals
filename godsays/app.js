let words = [];

// Load the words from Happy.TXT
async function loadWords() {
    try {
        const response = await fetch('Happy.TXT');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        words = text.split(/\r?\n/).filter(word => word.trim() !== '');
        
        const output = document.getElementById('output');
        output.textContent = "Oracle is ready. Awaiting your command.";
    } catch (error) {
        console.error("Failed to load Happy.TXT:", error);
        document.getElementById('output').textContent = "Failed to load sacred texts (Happy.TXT).";
    }
}

function speak() {
    if (words.length === 0) return;

    const countInput = document.getElementById('word-count');
    let amount = parseInt(countInput.value, 10);
    
    if (isNaN(amount) || amount < 1) amount = 16;
    if (amount > 100) amount = 100;

    const selectedWords = [];
    for (let i = 0; i < amount; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        selectedWords.push(words[randomIndex]);
    }

    const outputElement = document.getElementById('output');
    
    // Animate the transition
    outputElement.classList.remove('fade-in');
    outputElement.classList.add('fade-out');
    
    setTimeout(() => {
        outputElement.textContent = selectedWords.join(' ');
        outputElement.classList.remove('fade-out');
        outputElement.classList.add('fade-in');
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    loadWords();
    
    const btn = document.getElementById('speak-btn');
    btn.addEventListener('click', speak);
});
