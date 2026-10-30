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
    msg.rate = Number(document.querySelector('[name="rate"]').value);
    msg.pitch = Number(document.querySelector('[name="pitch"]').value);

    const selectedVoice = voices.find(
        voice => voice.name === voicesDropdown.value
    );

    if (selectedVoice) {
        msg.voice = selectedVoice;
    }

    if (msg.text.trim()) {
        speechSynthesis.speak(msg);
    }
}

function stopSpeech() {
    speechSynthesis.cancel();
}

function handleOptions() {
    options.forEach(option => {
        option.addEventListener('input', () => {
            msg.rate = Number(document.querySelector('[name="rate"]').value);
            msg.pitch = Number(document.querySelector('[name="pitch"]').value);

            if (speechSynthesis.speaking) {
                const currentText = document.querySelector('[name="text"]').value;

                speechSynthesis.cancel();

                msg.text = currentText;
                msg.rate = Number(document.querySelector('[name="rate"]').value);
                msg.pitch = Number(document.querySelector('[name="pitch"]').value);

                speechSynthesis.speak(msg);
            }
        });
    });
}

voicesDropdown.addEventListener('change', setVoice);
speakButton.addEventListener('click', toggleSpeech);
stopButton.addEventListener('click', stopSpeech);

handleOptions();