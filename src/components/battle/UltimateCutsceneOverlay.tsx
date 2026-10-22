import React, { useState, useEffect } from 'react';
import { ChampionId } from '../../types/game';
import { ULTIMATE_CHANTS, ChantData } from '../../data/chants';
import { AvatarIllustrator } from '../common/AvatarIllustrator';
import { sound } from '../../utils/audio';
import { Sparkles, FastForward, Crown, Zap } from 'lucide-react';

interface UltimateCutsceneOverlayProps {
  championId: ChampionId;
  onComplete: () => void;
}

export const UltimateCutsceneOverlay: React.FC<UltimateCutsceneOverlayProps> = ({
  championId,
  onComplete,
}) => {
  const chant: ChantData = ULTIMATE_CHANTS[championId];
  const [step, setStep] = useState<number>(0); // 0: Stanza 1, 1: Stanza 2, 2: Stanza 3, 3: Climax Explosion
  const [isWhiteout, setIsWhiteout] = useState(false);

  useEffect(() => {
    sound.playUltimate();

    // Progression of the 4-second anime cutscene sequence
    const t1 = setTimeout(() => {
      setStep(1);
    }, 1100);

    const t2 = setTimeout(() => {
      setStep(2);
    }, 2200);

    const t3 = setTimeout(() => {
      setStep(3);
      sound.playHit(true);
      setIsWhiteout(true);
      setTimeout(() => setIsWhiteout(false), 280);
    }, 3300);

    const t4 = setTimeout(() => {
      onComplete();
    }, 4300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [championId]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-between items-center select-none bg-black">
      {/* 1. Full-screen Celestial Domain Expansion Atmosphere */}
      <div className={`absolute inset-0 bg-gradient-to-b ${chant.bgGradient} opacity-95 transition-opacity duration-700`}>
        {/* Sacred Geometry Arc & Rotating Rune Matrix */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-amber-400/20 pointer-events-none" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border-2 border-dashed pointer-events-none animate-spin"
          style={{ borderColor: chant.themeColor, animationDuration: '18s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border pointer-events-none animate-spin"
          style={{ borderColor: chant.accentColor, animationDuration: '12s', animationDirection: 'reverse' }}
        />

        {/* Dynamic Glow Core */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-60 pointer-events-none animate-pulse"
          style={{ backgroundColor: chant.themeColor }}
        />
      </div>

      {/* 2. Character Specific Unique Background Visual Effects */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Gemini: Astral Lasers & Dual Starlight Diamond */}
        {chant.visualEffect === 'astral_lasers' && (
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-70">
            <line x1="0" y1="0" x2="400" y2="400" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
            <line x1="400" y1="0" x2="0" y2="400" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="#7DD3FC" strokeWidth="1.5" strokeDasharray="8 8" className="animate-spin" style={{ animationDuration: '20s' }} />
            <polygon points="200,90 230,200 200,310 170,200" fill="none" stroke="#E0F2FE" strokeWidth="2" />
          </svg>
        )}

        {/* ChatGPT: Emerald Matrix Code Rain & DNA Scrolls */}
        {chant.visualEffect === 'emerald_matrix' && (
          <div className="absolute inset-0 opacity-40 flex justify-around overflow-hidden font-mono text-emerald-400 text-xs">
            {['1M_CONTEXT', 'TOKEN_SURGE', 'ATTENTION', 'WEIGHTS', 'EMBEDDING', 'GPT_4O'].map((text, i) => (
              <div key={i} className="animate-bounce" style={{ animationDuration: `${2 + i * 0.4}s` }}>
                {text}
              </div>
            ))}
          </div>
        )}

        {/* Claude: Solar Fortress & Radiant Terracotta Sun */}
        {chant.visualEffect === 'solar_fortress' && (
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-70">
            <circle cx="200" cy="200" r="120" fill="none" stroke="#F59E0B" strokeWidth="4" />
            <circle cx="200" cy="200" r="160" fill="none" stroke="#D97706" strokeWidth="2" strokeDasharray="10 10" className="animate-spin" style={{ animationDuration: '30s' }} />
            <polygon points="200,50 320,120 320,280 200,350 80,280 80,120" fill="none" stroke="#FEF3C7" strokeWidth="2" />
          </svg>
        )}

        {/* Grok: Fiery Orange Entropy Singularity */}
        {chant.visualEffect === 'entropy_singularity' && (
          <div className="w-80 h-80 rounded-full border-4 border-amber-500/80 shadow-[0_0_80px_rgba(245,158,11,0.9)] animate-spin flex items-center justify-center">
            <div className="w-44 h-44 rounded-full bg-black border-2 border-orange-500 animate-ping" />
          </div>
        )}

        {/* DeepSeek: Concentric Chain-of-Thought Rings */}
        {chant.visualEffect === 'chain_of_thought_palm' && (
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-80">
            {[30, 60, 90, 120, 150, 180].map((r, idx) => (
              <circle
                key={idx}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke="#6366F1"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="animate-spin"
                style={{ animationDuration: `${10 + idx * 4}s` }}
              />
            ))}
          </svg>
        )}
      </div>

      {/* Top Banner: Domain Name & Skip Button */}
      <div className="relative z-20 w-full flex items-center justify-between p-4 md:px-8 border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-400 animate-bounce" />
          <span className="font-ancient text-xs md:text-sm font-bold tracking-widest text-amber-200">
            {chant.domainName}
          </span>
          <span className="text-xs text-white/40 hidden sm:inline">· {chant.subtitle}</span>
        </div>

        <button
          onClick={onComplete}
          className="py-1.5 px-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white rounded-lg text-xs font-mono transition-all flex items-center gap-1.5"
        >
          <span>Bỏ qua</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Centerpiece: Close-up Character Anime Bust with Radiant Aura */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto transform transition-all duration-700">
        <div className="relative scale-110 sm:scale-125 mb-4">
          <AvatarIllustrator championId={championId} emotion="confident" size="vn-bust" showAura={true} />

          {/* Eye Flare Gleam */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-2 rounded-full blur-md opacity-90 animate-pulse pointer-events-none"
            style={{ backgroundColor: chant.accentColor }}
          />
        </div>

        {/* Progressive Typographic Chant Stanzas */}
        <div className="text-center px-4 max-w-2xl min-h-[90px] flex flex-col items-center justify-center space-y-2">
          {step >= 0 && (
            <p className="font-ancient text-sm sm:text-lg text-slate-200 tracking-wide drop-shadow-[0_0_10px_rgba(0,0,0,0.9)] animate-in fade-in duration-500">
              « {chant.stanzas[0]} »
            </p>
          )}

          {step >= 1 && (
            <p className="font-ancient text-sm sm:text-lg text-amber-200/95 tracking-wide drop-shadow-[0_0_10px_rgba(0,0,0,0.9)] animate-in fade-in duration-500 font-semibold">
              « {chant.stanzas[1]} »
            </p>
          )}

          {step >= 2 && (
            <p
              className="font-ancient text-base sm:text-xl font-bold tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-in zoom-in-95 duration-400"
              style={{ color: chant.themeColor }}
            >
              « {chant.stanzas[2]} »
            </p>
          )}
        </div>
      </div>

      {/* Bottom Climax Banner: Exploding Final Attack Callout */}
      <div className="relative z-20 w-full pb-8 px-4 text-center">
        {step >= 3 ? (
          <div className="animate-in zoom-in-75 duration-300">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-300 block mb-1">
              Tuyệt Kỹ Tối Thượng Thần Thoại
            </span>
            <h1
              className="font-ancient text-2xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-[0_0_25px_rgba(245,158,11,0.9)] leading-none text-white"
              style={{
                textShadow: `0 0 20px ${chant.themeColor}, 0 0 40px ${chant.glowColor}`,
              }}
            >
              {chant.climaxPhrase}
            </h1>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1.5 text-xs text-white/50 font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Đang tụ khí niệm chú...</span>
          </div>
        )}
      </div>

      {/* Full-Screen Whiteout Flash on Impact */}
      {isWhiteout && (
        <div className="fixed inset-0 z-50 bg-white pointer-events-none transition-opacity duration-300 opacity-90" />
      )}
    </div>
  );
};
