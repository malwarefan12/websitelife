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
        if (voices[i].name === 'Microsoft Zira Desktop - English (United States)') {
            return voices[i];
        }
    }
    // If Zira voice is not found, return the first female voice available
    return voices.find(voice => voice.name.includes('female'));
}
