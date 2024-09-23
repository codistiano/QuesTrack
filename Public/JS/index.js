// Coherence of the input and the preview text is maintained.
const dayNameInput = document.getElementById('day-name');
const dayName = document.getElementById('dayNameText')
const noteInput = document.getElementById('note');
const viewedText = document.getElementById('text-viewed')

noteInput.addEventListener('input', () => {
    viewedText.innerText = noteInput.value;
});

dayNameInput.addEventListener('input', () => {
    dayName.innerText = dayNameInput.value
})

