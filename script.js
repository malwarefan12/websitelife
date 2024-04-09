document.getElementById('speakBtn').addEventListener('click', function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        var result = event.results[0][0].transcript;
        document.getElementById('response').textContent = "You: " + result;

        // Send user message to Google Chat API
        var apiUrl = 'https://chat.googleapis.com/v1/spaces/110437447816302729248/messages'; // Replace with your Google Chat API endpoint
        var apiKey = 'AIzaSyAs8Dsurtqt_fLBSMmz1ISKxOWw9BP2v7o'; // Replace with your API key
        var data = { message: result }; // Prepare data to send
        var xhr = new XMLHttpRequest();
        xhr.open('POST', apiUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey); // Include API key in the request headers
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Receive response from Google Chat API
                    var response = JSON.parse(xhr.responseText).response;

                    // Display response
                    document.getElementById('response').textContent = "AI Girlfriend: " + response;

                    // Speak response with a female voice
                    var msg = new SpeechSynthesisUtterance(response);
                    var voices = window.speechSynthesis.getVoices();
                    msg.voice = voices.find(voice => voice.name === 'Google US English');
                    speechSynthesis.speak(msg);
                } else {
                    // Handle error
                    console.error('Error:', xhr.statusText);
                }
            }
        };
        xhr.send(JSON.stringify(data));
    };
    recognition.start();
});
