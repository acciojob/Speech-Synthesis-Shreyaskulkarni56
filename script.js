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
    if (speechSynthesis.speaking) {
        toggleSpeech();
    }
}

function toggleSpeech() {
    speechSynthesis.cancel();

    const text = document.querySelector('[name="text"]').value;
    if (!text.trim()) return;

    msg = new SpeechSynthesisUtterance(text);

    const selectedVoice = voices.find(
        voice => voice.name === voicesDropdown.value
    );

    if (selectedVoice) {
        msg.voice = selectedVoice;
    }

    msg.rate = Number(document.querySelector('[name="rate"]').value);
    msg.pitch = Number(document.querySelector('[name="pitch"]').value);

    speechSynthesis.speak(msg);
}

function stopSpeech() {
    speechSynthesis.cancel();
}

function handleOptions() {
    options.forEach(option => {
        option.addEventListener('input', () => {
            const wasSpeaking = speechSynthesis.speaking;
            
            msg.rate = Number(document.querySelector('[name="rate"]').value);
            msg.pitch = Number(document.querySelector('[name="pitch"]').value);

            if (wasSpeaking) {
                toggleSpeech();
            }
        });
    });
}

voicesDropdown.addEventListener('change', setVoice);
speakButton.addEventListener('click', toggleSpeech);
stopButton.addEventListener('click', stopSpeech);

handleOptions();