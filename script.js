document.getElementById('speakBtn').addEventListener('click', function() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        var result = event.results[0][0].transcript;
        document.getElementById('response').textContent = "You: " + result;
        const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://chatgpt-api8.p.rapidapi.com/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'b57ce304eemshf36b71e0c03670cp1866b1jsnbafa8589afee',
    'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
  },
  data: [
    {
      content: result,
      role: 'system'
    }
  ]
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}


        // Speak response with a female voice
        var msg = new SpeechSynthesisUtterance(response);
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices.find(voice => voice.name === 'Google US English');
        speechSynthesis.speak(msg);
    };
    recognition.start();
});
