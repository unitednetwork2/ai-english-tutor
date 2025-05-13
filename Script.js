const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.continuous = false;

function startListening() {
  recognition.start();

  recognition.onresult = function(event) {
    const userSpeech = event.results[0][0].transcript;
    document.getElementById("transcript").innerText = "You said: " + userSpeech;

    fetch('https://your-backend-url.com/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: userSpeech })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("response").innerText = data.reply;
      const utterance = new SpeechSynthesisUtterance(data.reply);
      speechSynthesis.speak(utterance);
    })
    .catch(err => {
      console.error("Error:", err);
      document.getElementById("response").innerText = "Something went wrong.";
    });
  };
}
