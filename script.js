const msg = new SpeechSynthesisUtterance();

let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const textInput = document.querySelector('[name="text"]');
const rateInput = document.querySelector('[name="rate"]');
const pitchInput = document.querySelector('[name="pitch"]');

// Populate the available voices
function populateVoices() {
    voices = speechSynthesis.getVoices();

    const selectedVoiceName = voicesDropdown.value;

    voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;

        voicesDropdown.appendChild(option);
    });

    // Preserve the previously selected voice when possible
    if (voices.some(voice => voice.name === selectedVoiceName)) {
        voicesDropdown.value = selectedVoiceName;
    }
}

// Select a voice and restart speech if currently speaking
function setVoice() {
    const selectedVoice = voices.find(
        voice => voice.name === voicesDropdown.value
    );

    if (selectedVoice) {
        msg.voice = selectedVoice;
        msg.lang = selectedVoice.lang;
    }

    if (speechSynthesis.speaking) {
        toggleSpeech();
    }
}

// Start or restart speech
function toggleSpeech() {
    speechSynthesis.cancel();

    const text = textInput.value.trim();

    if (!text) {
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Apply the selected voice
    const selectedVoice = voices.find(
        voice => voice.name === voicesDropdown.value
    );

    if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
    }

    // Apply the current rate and pitch
    utterance.rate = Number(rateInput.value);
    utterance.pitch = Number(pitchInput.value);

    speechSynthesis.speak(utterance);
}

// Stop speech
function stopSpeech() {
    speechSynthesis.cancel();
}

// Update rate and pitch when sliders change
function handleOptions() {
    options.forEach(option => {
        option.addEventListener('input', () => {
            // Do not restart speech while the user edits the text
            if (option.name === 'text') {
                return;
            }

            if (speechSynthesis.speaking) {
                toggleSpeech();
            }
        });
    });
}

// Load voices
populateVoices();

speechSynthesis.addEventListener('voiceschanged', populateVoices);

// Register event listeners
voicesDropdown.addEventListener('change', setVoice);

speakButton.addEventListener('click', toggleSpeech);

stopButton.addEventListener('click', stopSpeech);

handleOptions();