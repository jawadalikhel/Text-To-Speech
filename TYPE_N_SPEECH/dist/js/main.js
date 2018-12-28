console.log('js is live')

// Init SpeechSynth API
const synth = window.speechSynthesis;

// All the DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

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
