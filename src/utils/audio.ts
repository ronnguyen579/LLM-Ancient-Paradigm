/**
 * Web Audio API Procedural Sound Engine
 * Provides synthesized sounds for card plays, dice rolls, impacts, shields, gacha, and celestial ambient BGM.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmOsc1: OscillatorNode | null = null;
  private bgmOsc2: OscillatorNode | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    } else if (!this.isMuted && this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Tap button click
  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Realistic dice tumble clatter
  public playDiceRoll() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const clicks = [0, 0.08, 0.16, 0.23, 0.31, 0.40];

    clicks.forEach((timeOffset, idx) => {
      const clickNow = now + timeOffset;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      const pitch = 220 + Math.random() * 260 + (idx === clicks.length - 1 ? 80 : 0);
      osc.frequency.setValueAtTime(pitch, clickNow);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, clickNow + 0.04);

      gain.gain.setValueAtTime(0.15, clickNow);
      gain.gain.exponentialRampToValueAtTime(0.001, clickNow + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(clickNow);
      osc.stop(clickNow + 0.045);
    });
  }

  // Card swoosh & deploy
  public playCardPlay() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Impact attack hit
  public playHit(heavy: boolean = false) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = heavy ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(heavy ? 140 : 180, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + (heavy ? 0.28 : 0.18));

    gain.gain.setValueAtTime(heavy ? 0.32 : 0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (heavy ? 0.28 : 0.18));

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + (heavy ? 0.28 : 0.18));
  }

  // Resonant shield bell
  public playShield() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.03);

      gain.gain.setValueAtTime(0.12, now + i * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.03);
      osc.stop(now + 0.36);
    });
  }

  // Ultimate protocol fanfare
  public playUltimate() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [392, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const time = now + idx * 0.07;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(time);
      osc.stop(time + 0.42);
    });
  }

  // Gacha Golden Reveal chime
  public playGachaReveal() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    arpeggio.forEach((f, i) => {
      const noteTime = now + i * 0.06;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, noteTime);

      gain.gain.setValueAtTime(0.15, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.65);
    });
  }

  // Ethereal ambient BGM synthesizer loop
  public startAmbientBGM() {
    if (this.isBgmPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : 0.035, now);

      this.bgmOsc1 = this.ctx.createOscillator();
      this.bgmOsc1.type = 'sine';
      this.bgmOsc1.frequency.setValueAtTime(110, now); // A2 celestial drone

      this.bgmOsc2 = this.ctx.createOscillator();
      this.bgmOsc2.type = 'triangle';
      this.bgmOsc2.frequency.setValueAtTime(164.81, now); // E3 fifth harmonic

      this.bgmOsc1.connect(this.bgmGain);
      this.bgmOsc2.connect(this.bgmGain);
      this.bgmGain.connect(this.ctx.destination);

      this.bgmOsc1.start();
      this.bgmOsc2.start();
      this.isBgmPlaying = true;
    } catch {
      // Audio autoplay policy may defer until user gesture
    }
  }

  public stopBGM() {
    if (!this.isBgmPlaying) return;
    try {
      this.bgmOsc1?.stop();
      this.bgmOsc2?.stop();
      this.bgmOsc1?.disconnect();
      this.bgmOsc2?.disconnect();
    } catch {
      // ignore
    }
    this.isBgmPlaying = false;
  }
}

export const sound = new SoundEngine();
