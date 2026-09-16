import { VoiceState } from '../types';

// Declare Web Speech API types for browsers
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export class VoiceRecognitionService {
  private recognition: any = null;
  private isListening: boolean = false;
  private onStateChangeCb: ((state: VoiceState) => void) | null = null;
  private onTranscriptCb: ((text: string, isFinal: boolean) => void) | null = null;
  private simulationTimer: any = null;

  constructor() {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      try {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
          this.isListening = true;
          this.onStateChangeCb?.('listening');
        };

        this.recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const currentText = finalTranscript || interimTranscript;
          if (currentText && this.onTranscriptCb) {
            this.onTranscriptCb(currentText, Boolean(finalTranscript));
          }
        };

        this.recognition.onerror = (event: any) => {
          console.warn('Speech recognition warning/fallback:', event.error);
        };

        this.recognition.onend = () => {
          this.isListening = false;
        };
      } catch (err) {
        console.warn('SpeechRecognition initialization skipped:', err);
      }
    }
  }

  public registerCallbacks(
    onStateChange: (state: VoiceState) => void,
    onTranscript: (text: string, isFinal: boolean) => void
  ) {
    this.onStateChangeCb = onStateChange;
    this.onTranscriptCb = onTranscript;
  }

  public startListening(presetText?: string) {
    this.isListening = true;
    this.onStateChangeCb?.('listening');

    // If native speech recognition exists and no explicit preset text requested, try starting it
    if (this.recognition && !presetText) {
      try {
        this.recognition.start();
        return;
      } catch (e) {
        console.warn('Could not start native recognition, using realistic audio simulation', e);
      }
    }

    // Realistic progressive simulation for reliable hands-on demo experience
    const sampleSentences = [
      presetText || "I need a dentist tomorrow evening for severe tooth pain in lower right jaw.",
    ];
    const targetText = sampleSentences[0];
    const words = targetText.split(' ');
    let currentIdx = 0;
    let accumulated = '';

    clearInterval(this.simulationTimer);
    this.simulationTimer = setInterval(() => {
      if (currentIdx < words.length) {
        accumulated += (currentIdx > 0 ? ' ' : '') + words[currentIdx];
        this.onTranscriptCb?.(accumulated, currentIdx === words.length - 1);
        currentIdx++;
      } else {
        clearInterval(this.simulationTimer);
        this.onStateChangeCb?.('processing');
        setTimeout(() => {
          this.onStateChangeCb?.('responding');
          setTimeout(() => {
            this.onStateChangeCb?.('completed');
          }, 1200);
        }, 800);
      }
    }, 180);
  }

  public stopListening() {
    this.isListening = false;
    clearInterval(this.simulationTimer);
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
    this.onStateChangeCb?.('idle');
  }

  public speakText(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const voiceService = new VoiceRecognitionService();
