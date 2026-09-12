import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, AlertCircle } from 'lucide-react';
import { speechService } from '../services/speechService';
import { askManakSetuAI } from '../services/aiEngine';

export default function VoiceAssistantModal({ isOpen, onClose, defaultLang = 'hi' }) {
  const [isListening, setIsListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState(defaultLang === 'hi' ? 'hi-IN' : 'en-IN');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      speechService.stopListening();
      speechService.stopSpeaking();
      setIsListening(false);
      setIsSpeaking(false);
      setTranscript('');
      setAiResponse('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    setErrorMsg('');
    setTranscript('');
    setAiResponse('');
    speechService.stopSpeaking();
    setIsSpeaking(false);

    setIsListening(true);
    speechService.startListening({
      lang: voiceLang,
      onResult: async (text) => {
        setTranscript(text);
        setIsListening(false);
        setIsProcessing(true);
        try {
          const res = await askManakSetuAI(text);
          setAiResponse(res.text);
          // Auto speak back summary (first 2-3 lines)
          const firstSentences = res.text.split('\n\n')[0] || res.text.substring(0, 160);
          speechService.speak(firstSentences, voiceLang);
          setIsSpeaking(true);
        } catch (err) {
          setErrorMsg("Could not process speech request. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      },
      onError: (err) => {
        setIsListening(false);
        setErrorMsg(typeof err === 'string' ? err : "Mic listening ended. Click mic to speak again.");
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  const handleStopListening = () => {
    speechService.stopListening();
    setIsListening(false);
  };

  const handleToggleMute = () => {
    if (isSpeaking) {
      speechService.stopSpeaking();
      setIsSpeaking(false);
    } else if (aiResponse) {
      const firstSentences = aiResponse.split('\n\n')[0] || aiResponse.substring(0, 160);
      speechService.speak(firstSentences, voiceLang);
      setIsSpeaking(true);
    }
  };

  const sampleVoicePrompts = [
    { text: "इलेक्ट्रिक गीजर के लिए कौन सा मानक है?", lang: "hi-IN" },
    { text: "What tests are required for baby toys?", lang: "en-IN" },
    { text: "सोने की हॉलमार्किंग कैसे चेक करें?", lang: "hi-IN" },
    { text: "What is the MSME fee discount for ISI mark?", lang: "en-IN" }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative flex flex-col items-center animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mt-2">
          <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
            Bilingual Voice Copilot
          </span>
          <h3 className="text-xl font-black mt-2 tracking-tight">
            ManakSetu Hands-Free Voice Assistant
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Speak your product compliance query in Hindi or English
          </p>
        </div>

        {/* Voice Language Selector */}
        <div className="flex items-center gap-2 mt-4 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setVoiceLang('hi-IN')}
            className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
              voiceLang === 'hi-IN' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            हिंदी (Hindi)
          </button>
          <button
            onClick={() => setVoiceLang('en-IN')}
            className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
              voiceLang === 'en-IN' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            English (India)
          </button>
        </div>

        {/* Big Mic Button with Pulse Ring */}
        <div className="my-8 relative">
          {isListening && (
            <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-pulse-ring"></div>
          )}

          <button
            onClick={isListening ? handleStopListening : handleStartListening}
            className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl ${
              isListening
                ? 'bg-amber-500 text-slate-950 scale-105'
                : 'bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white hover:scale-105'
            }`}
          >
            {isListening ? (
              <Mic className="w-10 h-10 animate-bounce" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>
        </div>

        {/* Status Text */}
        <div className="text-center min-h-[40px]">
          {isListening && (
            <p className="text-xs font-bold text-amber-400 animate-pulse">
              Listening... Speak now into your microphone
            </p>
          )}
          {isProcessing && (
            <p className="text-xs font-bold text-blue-400 animate-pulse">
              Consulting Bureau of Indian Standards knowledge base...
            </p>
          )}
          {!isListening && !isProcessing && !transcript && (
            <p className="text-xs text-slate-400">
              Click the microphone button to start speaking
            </p>
          )}
          {errorMsg && (
            <p className="text-xs text-red-400 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMsg}
            </p>
          )}
        </div>

        {/* Live Transcript Display */}
        {transcript && (
          <div className="w-full mt-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">You said:</span>
            <p className="font-semibold text-white">"{transcript}"</p>
          </div>
        )}

        {/* AI Spoken Response Card */}
        {aiResponse && (
          <div className="w-full mt-3 p-4 rounded-xl bg-slate-800 border border-slate-700 text-xs max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold border-b border-slate-700 pb-1.5 mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                ManakSetu AI Voice Response
              </span>
              <button
                onClick={handleToggleMute}
                className="flex items-center gap-1 text-slate-400 hover:text-white"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? 'Mute' : 'Replay Voice'}</span>
              </button>
            </div>
            <div className="text-slate-300 whitespace-pre-line leading-relaxed text-[11px]">
              {aiResponse}
            </div>
          </div>
        )}

        {/* Preset Sample Speech Chips */}
        <div className="w-full mt-6 pt-4 border-t border-slate-800 text-center">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">
            Try asking one of these:
          </span>
          <div className="flex flex-wrap justify-center gap-1.5">
            {sampleVoicePrompts.map((sample, idx) => (
              <button
                key={idx}
                onClick={async () => {
                  setVoiceLang(sample.lang);
                  setTranscript(sample.text);
                  setIsProcessing(true);
                  try {
                    const res = await askManakSetuAI(sample.text);
                    setAiResponse(res.text);
                    const firstSentences = res.text.split('\n\n')[0] || res.text.substring(0, 160);
                    speechService.speak(firstSentences, sample.lang);
                    setIsSpeaking(true);
                  } finally {
                    setIsProcessing(false);
                  }
                }}
                className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700/80 transition-all"
              >
                "{sample.text}"
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
