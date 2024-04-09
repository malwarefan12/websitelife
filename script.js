document.getElementById('speakBtn').addEventListener('click', function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        var result = event.results[0][0].transcript;
        document.getElementById('response').textContent = "You: " + result;

        // Send result to backend (you can use AJAX/fetch here)

        // Receive response from backend
        var response = "Response from backend"; // Replace with actual response

        // Speak response with female voice
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(response);
        utterThis.voice = getFemaleVoice(synth);
        synth.speak(utterThis);
    };
    recognition.start();
});

// Function to get a female voice
function getFemaleVoice(synth) {
    var voices = synth.getVoices();
    for (var i = 0; i < voices.length; i++) {
        if (voices[i].name.includes('Female')) {
            return voices[i];
        }
    }
    // If no female voice found, return the default voice
    return synth.getVoices()[0];
}
