document.getElementById('speakBtn').addEventListener('click', function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        var result = event.results[0][0].transcript;
        document.getElementById('response').textContent = "You: " + result;

        // Send result to backend (you can use AJAX/fetch here)

        // Receive response from backend
        var response = "AI Girlfriend: Response from backend"; // Replace with actual response

        // Speak response with a female voice
        var utterThis = new SpeechSynthesisUtterance(response);
        utterThis.voice = getFemaleVoice();
        window.speechSynthesis.speak(utterThis);
    };
    recognition.start();
});

function getFemaleVoice() {
    var voices = window.speechSynthesis.getVoices();
    for (var i = 0; i < voices.length; i++) {
        // Check if the voice is female
        if (voices[i].name.includes('female')) {
            return voices[i];
        }
    }
    // If no female voice is found, return the first available voice
    return voices[0];
}

