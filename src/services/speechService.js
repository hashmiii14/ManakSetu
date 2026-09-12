/**
 * Browser-native Web Speech API wrapper.
 * 100% Free - Works offline in Chromium/Chrome/Edge browsers.
 */

export class SpeechService {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = SpeechRecognition ? new SpeechRecognition() : null;
    this.synth = window.speechSynthesis || null;

    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  isSupported() {
    return !!this.recognition && !!this.synth;
  }

  startListening({ onResult, onError, onEnd, lang = 'hi-IN' }) {
    if (!this.recognition) {
      if (onError) onError("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }

    this.recognition.lang = lang; // 'hi-IN' for Hindi, 'en-IN' for Indian English

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch (err) {
      console.warn("Speech recognition already running or error:", err);
    }
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  speak(text, lang = 'hi-IN') {
    if (!this.synth) return;
    this.synth.cancel(); // cancel any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95; // Clear and measured pace
    utterance.pitch = 1.0;

    // Pick best available Indian voice if present
    const voices = this.synth.getVoices();
    const targetVoice = voices.find(v => v.lang.includes(lang.substring(0, 2))) || voices[0];
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const speechService = new SpeechService();
