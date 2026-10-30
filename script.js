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
    const rateSlider = document.querySelector('[name="rate"]');
    const pitchSlider = document.querySelector('[name="pitch"]');
    const textArea = document.querySelector('[name="text"]');

    rateSlider.addEventListener('input', () => {
        msg.rate = Number(rateSlider.value);

        if (speechSynthesis.speaking) {
            toggleSpeech();
        }
    });

    pitchSlider.addEventListener('input', () => {
        msg.pitch = Number(pitchSlider.value);

        if (speechSynthesis.speaking) {
            toggleSpeech();
        }
    });

    textArea.addEventListener('input', () => {
        if (speechSynthesis.speaking) {
            toggleSpeech();
        }
    });
}

voicesDropdown.addEventListener('change', setVoice);
speakButton.addEventListener('click', toggleSpeech);
stopButton.addEventListener('click', stopSpeech);

handleOptions();