console.log('js is live')

// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init voices array
let voices = [];

const getVoices = () => {
  // synth.getVoices is the api for all of the voices
  voices = synth.getVoices();

  // loop through voices and create an option for earch one
  voices.forEach(voice =>{
    // create option Element
    const option = document.createElement('option');
    // fill option with voice and language
    option.textContent = voice.name + '('+ voice.lang +')';

    // set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);

  })
  console.log(voices);
};

getVoices();
if(synth.onvoiceschanged !== undefined){
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () =>{
  // check if speaking
  if(synth.speaking){
      console.error('Already speaking...');
      return;
  }

  if(textInput.value !== ''){
    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //speak end
    speakText.onend = e => {
      console.log('Done speaking...');
    }

    // Speak error;
    speakText.onerror = e => {
      console.error('something went wrong');
    }

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0]
    .getAttribute('data-name');

    // Loop through voices
    voices.forEach(voice => {
      if(voice.name === selectedVoice){
        speakText.voice = voice;
      }
    });

    // Set Pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    //Speak
    synth.speak(speakText);
  }
};

//////////////////////////// EVENT LISTENERS

// form submition(text form submit)
textForm.addEventListener('submit', e =>{
  e.preventDefault();
  speak();
  textInput.blur();
});
