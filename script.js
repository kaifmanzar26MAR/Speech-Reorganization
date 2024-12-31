const start_btn = document.getElementById('start_btn');
const input_box = document.getElementById('your_talk');
const data_map = {
    "Hello": "Hello Boss! How can I assist you today?",
    "What is my favourite movie": "Your favourite movie is Titanic.",
    "Who are you": "I am your virtual assistant here to help you with anything you need.",
    "What is the time now": `The current time is ${new Date().toLocaleTimeString()}.`,
    "What is the date today": `Today's date is ${new Date().toLocaleDateString()}.`,
    "Tell me a joke": "Why don’t scientists trust atoms? Because they make up everything!",
    "What is AI": "AI stands for Artificial Intelligence, the simulation of human intelligence by machines.",
    "What is the weather like": "I cannot provide live weather updates, but you can check your local forecast online.",
    "Open Google": "Sure! Just type www.google.com in your browser.",
    "How old are you": "Age is just a number! I am as old as the time since you activated me.",
    "What is the capital of France": "The capital of France is Paris.",
    "Tell me a fun fact": "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible!",
    "Can you sing": "La la la... Sorry, I can't really sing, but I can find you some great music!",
    "What is the speed of light": "The speed of light is approximately 299,792 kilometers per second.",
    "Define love": "Love is a profound emotion of care, affection, and attachment to someone or something.",
    "Who is the president of the United States": "As of now, it's better to check online for the most current information.",
    "What is the meaning of life": "The meaning of life is a philosophical question that varies for everyone. For me, it's to assist you!",
    "Tell me about yourself": "I am an AI-powered assistant, created to make your life easier and answer your questions.",
    "Can you dance": "Unfortunately, I can't dance, but I can cheer you on while you do!",
    "What is the largest planet": "The largest planet in our solar system is Jupiter.",
    "What is 2 + 2": "2 + 2 equals 4. Easy peasy!",
    "Where is the Great Wall of China": "The Great Wall of China is located in northern China."
};


function getResponse(transcript) {
    let ans = '';
    if(transcript.length > 3){
        ans = Object.keys(data_map).find((key) => {
            return key.toLowerCase().includes(transcript.toLowerCase()) || transcript.toLowerCase().includes(key.toLowerCase());
        });
    }

    return ans ? data_map[ans] : "Sorry, I don't understand.";
}

function textToSpeech(text) {
    const response = getResponse(text);
    console.log('Recognized Ans:', response);
    input_box.value = response;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;

    synth.speak(utterance);
}



function listenToVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = true;

    let throttleTimeout;

    start_btn.addEventListener('click', () => {
        recognition.start();
        console.log('Continuous listening activated...');
        input_box.value = 'Listening for voice input...';
    });

    recognition.addEventListener('result', (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;

        clearTimeout(throttleTimeout);
        throttleTimeout = setTimeout(() => {
            textToSpeech(transcript);
        }, 500); 
    });

    recognition.addEventListener('error', (event) => {
        console.error('Voice recognition error:', event.error);
    });

    recognition.addEventListener('end', () => {
        console.log('Voice recognition ended. Restarting...');
        recognition.start(); 
    });
}

listenToVoice();
