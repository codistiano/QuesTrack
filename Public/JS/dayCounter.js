// Assuming today is Day 1 of the 100 days left for 2025 to start
const startingDate = new Date(new Date().getFullYear(), 8, 20); // Calculate the starting date for the challenge
const today = new Date();
const diffInDays = Math.floor((today - startingDate) / (1000 * 60 * 60 * 24)) + 1;

// Example to display "Day X" or the remaining days till the end of the year
document.getElementById('day-display').innerText = diffInDays