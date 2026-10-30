function populateVoices() {
    voices = speechSynthesis.getVoices();

    voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voicesDropdown.appendChild(option);
    });
}

populateVoices();
speechSynthesis.addEventListener('voiceschanged', populateVoices);

function setVoice() {
    const selectedVoice = voices.find(
        voice => voice.name === voicesDropdown.value
    );

    if (selectedVoice) {
        msg.voice = selectedVoice;
    }

    if (speechSynthesis.speaking) {
        toggleSpeech();
    }
}

function toggleSpeech() {
    speechSynthesis.cancel();

    msg.text = document.querySelector('[name="text"]').value;
    msg.rate = document.querySelector('[name="rate"]').value;
    msg.pitch = document.querySelector('[name="pitch"]').value;

    if (msg.text.trim()) {
        speechSynthesis.speak(msg);
    }
}

function stopSpeech() {
    speechSynthesis.cancel();
}

function handleOptions() {
    document.querySelector('[name="rate"]').addEventListener('input', event => {
        msg.rate = event.target.value;
    });

    document.querySelector('[name="pitch"]').addEventListener('input', event => {
        msg.pitch = event.target.value;
    });

    document.querySelector('[name="text"]').addEventListener('input', () => {
        if (speechSynthesis.speaking) {
            toggleSpeech();
        }
    });
}

voicesDropdown.addEventListener('change', setVoice);
speakButton.addEventListener('click', toggleSpeech);
stopButton.addEventListener('click', stopSpeech);

handleOptions();
