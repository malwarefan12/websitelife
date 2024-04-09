document.getElementById('speakBtn').addEventListener('click', function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        var result = event.results[0][0].transcript;
        document.getElementById('response').textContent = "You: " + result;

        // Define the request data
var requestData = {
    tier: "Essential",
    nsfw: false,
    question: "i love you", // Replace with your input text
    history: [{ role: "assistant" }],
    generateAudio: true,
    generateImage: false,
    documentIds: [],
    temperature: 0.7
};

// Send the request
fetch('https://backend-k8s.flowgpt.com/v3/chat-anonymous', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
})
.then(response => response.json())
.then(data => {
    // Extract response text
    var responseData = data.event === "text" ? data.data : "";

    // Speak the response
    var msg = new SpeechSynthesisUtterance(responseData);
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices.find(voice => voice.name === 'Google US English');
    speechSynthesis.speak(msg);
});

    };
    recognition.start();
});
