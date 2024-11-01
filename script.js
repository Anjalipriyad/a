const crosswordData = [
    { word: 'Taj', clue: 'Famous mausoleum in Agra.', direction: 'across', start: { row: 0, col: 0 } },
    { word: 'Sari', clue: 'Traditional Indian garment for women.', direction: 'down', start: { row: 0, col: 1 } },
    { word: 'Yoga', clue: 'Ancient practice originating in India.', direction: 'across', start: { row: 1, col: 0 } },
    { word: 'Raga', clue: 'Melodic framework in Indian classical music.', direction: 'down', start: { row: 1, col: 3 } },
    { word: 'Mithai', clue: 'Indian sweets.', direction: 'across', start: { row: 2, col: 0 } },
];

function createCrossword() {
    const grid = Array(5).fill(null).map(() => Array(5).fill(''));
    
    crosswordData.forEach(({ word, start, direction }) => {
        for (let i = 0; i < word.length; i++) {
            const row = start.row + (direction === 'down' ? i : 0);
            const col = start.col + (direction === 'across' ? i : 0);
            grid[row][col] = word[i].toUpperCase();
        }
    });

    const crosswordElement = document.getElementById('crossword');
    
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            if (cell) {
                const input = document.createElement('input');
                input.maxLength = 1;
                input.dataset.row = rowIndex;
                input.dataset.col = colIndex;
                input.addEventListener('input', handleInput);
                cellElement.appendChild(input);
            }
            crosswordElement.appendChild(cellElement);
        });
    });
}

function handleInput(event) {
    const { value } = event.target;
    if (value) {
        event.target.value = value.toUpperCase();
    }
}

function loadClues() {
    const acrossClues = document.getElementById('across-clues');
    const downClues = document.getElementById('down-clues');

    crosswordData.forEach(({ clue, direction }, index) => {
        const clueItem = document.createElement('li');
        clueItem.textContent = `${index + 1}. ${clue}`;
        if (direction === 'across') {
            acrossClues.appendChild(clueItem);
        } else {
            downClues.appendChild(clueItem);
        }
    });
}

createCrossword();
loadClues();
