document.getElementById('speakBtn').addEventListener('click', function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        var result = event.results[0][0].transcript;
        document.getElementById('response').textContent = "You: " + result;
        const axios = require('axios');
        const data = JSON.stringify([
	{
		content: result,
		role: 'user'
	}
]);

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
		this.responseText = response
	}
});

xhr.open('POST', 'https://chatgpt-api8.p.rapidapi.com/');
xhr.setRequestHeader('content-type', 'application/json');
xhr.setRequestHeader('X-RapidAPI-Key', 'b57ce304eemshf36b71e0c03670cp1866b1jsnbafa8589afee');
xhr.setRequestHeader('X-RapidAPI-Host', 'chatgpt-api8.p.rapidapi.com');

xhr.send(data);


        // Speak response with a female voice
        var msg = new SpeechSynthesisUtterance(response);
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices.find(voice => voice.name === 'Google US English');
        speechSynthesis.speak(msg);
    };
    recognition.start();
});
