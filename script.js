// Define the function to send a request and speak the response
function sendRequestAndSpeak(inputText) {
    // Define the request data
    var requestData = {
        tier: "Essential",
        nsfw: false,
        question: inputText,
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
}

// Define the function to handle user input
function handleUserInput(userInput) {
    // Log the user input
    console.log("You:", userInput);

    // Get response from chatbot
    var response = chat.respond(userInput);
    console.log("AI Girlfriend:", response);

    // Speak the response using the function to send request and speak
    sendRequestAndSpeak(response);
}

// Initialize SpeechRecognition recognizer
var recognizer = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
recognizer.continuous = true;
recognizer.interimResults = true;
recognizer.lang = 'en-US';

// Start listening for speech input
recognizer.onresult = function(event) {
    var interimTranscript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            handleUserInput(event.results[i][0].transcript);
        }
    }
};
recognizer.start();
