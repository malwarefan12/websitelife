document.getElementById('speakBtn').addEventListener('click', function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        var result = event.results[0][0].transcript;
        document.getElementById('response').textContent = "You: " + result;

        // Send result to backend (you can use AJAX/fetch here)

        // Receive response from backend
        var response = "AI Girlfriend: Response from backend"; // Replace with actual response

        // Speak response
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(response);
        synth.speak(utterThis);
    };
    recognition.start();
});
