import Experience from "./Experience.js";

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

export default class Speech {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;

    this.button = document.querySelector(".js-speech-detect");
    this.button.onclick = () => {
      this.startRecognition();
    };

    // Create an event system
    this.eventListeners = {};

    // Options
    this.options = {
      startRecognition: () => {
        this.startRecognition();
      },
      colors: [
        "aqua",
        "azure",
        "beige",
        "bisque",
        "black",
        "blue",
        "brown",
        "chocolate",
        "coral",
        "crimson",
        "cyan",
        "fuchsia",
        "ghostwhite",
        "gold",
        "goldenrod",
        "gray",
        "green",
        "indigo",
        "ivory",
        "khaki",
        "lavender",
        "lime",
        "linen",
        "magenta",
        "maroon",
        "moccasin",
        "navy",
        "olive",
        "orange",
        "orchid",
        "peru",
        "pink",
        "plum",
        "purple",
        "red",
        "salmon",
        "sienna",
        "silver",
        "snow",
        "tan",
        "teal",
        "thistle",
        "tomato",
        "turquoise",
        "violet",
        "white",
        "yellow",
      ],
    };

    this.recognition = new SpeechRecognition();
    if (SpeechGrammarList) {
      // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
      // This code is provided as a demonstration of possible capability. You may choose not to use it.
      this.speechRecognitionList = new SpeechGrammarList();
      this.grammar =
        "#JSGF V1.0; grammar colors; public <color> = " +
        this.options.colors.join(" | ") +
        " ;";
      this.speechRecognitionList.addFromString(this.grammar, 1);
      this.recognition.grammars = this.speechRecognitionList;
    }

    this.recognition.continuous = false;
    this.recognition.lang = "en-US";
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event) => {
      // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      // It has a getter so it can be accessed like an array
      // The first [0] returns the SpeechRecognitionResult at the last position.
      // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      // These also have getters so they can be accessed like arrays.
      // The second [0] returns the SpeechRecognitionAlternative at position 0.
      // We then return the transcript property of the SpeechRecognitionAlternative object

      var color = event.results[0][0].transcript;
      this.button.innerHTML = "Start Voice Recognition";
      this.Speak(`Result received: ${color}.`);
      this.emit("resultReceived", color);

      console.log(
        `Result received: ${color}.<br /> Confidence: ${event.results[0][0].confidence}`
      );
    };

    this.recognition.onspeechend = () => {
      console.log("stop");
      this.recognition.stop();
    };

    this.recognition.onnomatch = (event) => {
      this.Speak("I didn't recognise that color.");
      console.log("I didn't recognise that color.");
    };

    this.recognition.onerror = (event) => {
      this.Speak(`Error occurred in recognition: ${event.error}`);
      console.log(`Error occurred in recognition: ${event.error}`);
    };

    // Debug
    this.setDebug();

    // Setup
  }

  // Add a method to subscribe to custom events
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
  }

  // Add a method to trigger custom events
  emit(eventName, data) {
    if (this.eventListeners[eventName]) {
      for (const callback of this.eventListeners[eventName]) {
        callback(data);
      }
    }
  }

  startRecognition() {
    this.recognition.start();
    this.button.innerHTML = "Ready to receive a color command";
    console.log("Ready to receive a color command.");
  }

  Speak(text) {
    if ("speechSynthesis" in window) {
      var to_speak = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(to_speak);
    }
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Speech");
      this.debugFolder.add(this.options, "startRecognition");
      // this.debugFolder.close();
    }
  }

  update() {}
}
