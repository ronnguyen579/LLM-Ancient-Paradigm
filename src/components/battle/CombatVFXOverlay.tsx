import React from 'react';

export type VFXType = 'slash' | 'heavy_slash' | 'shield' | 'skill_pulse' | 'ultimate_burst';

export interface ActiveVFX {
  id: string;
  type: VFXType;
  target: 'player' | 'opponent' | 'screen';
  color?: string;
}

interface CombatVFXOverlayProps {
  activeEffects: ActiveVFX[];
}

export const CombatVFXOverlay: React.FC<CombatVFXOverlayProps> = ({ activeEffects }) => {
  if (activeEffects.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden flex items-center justify-center">
      {activeEffects.map((effect) => {
        const isOpponent = effect.target === 'opponent';
        const isPlayer = effect.target === 'player';
        const isScreen = effect.target === 'screen';

        // Coordinates based on target zone:
        // Opponent is at the top center/left
        // Player is at the bottom center/left
        // Screen is centered
        const targetClasses = isOpponent
          ? 'absolute top-12 md:top-16 left-1/2 -translate-x-1/2'
          : isPlayer
          ? 'absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2'
          : 'absolute inset-0 flex items-center justify-center';

        return (
          <div key={effect.id} className={`${targetClasses} w-72 h-72 sm:w-96 sm:h-96`}>
            {/* 1. Slash / Katana Cut VFX */}
            {(effect.type === 'slash' || effect.type === 'heavy_slash') && (
              <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]">
                <defs>
                  <linearGradient id={`slash_grad_${effect.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="40%" stopColor={effect.color || '#F43F5E'} />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>

                  <filter id={`slash_glow_${effect.id}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Primary Slash Blade Line */}
                <path
                  d="M 20 280 L 280 20"
                  stroke={`url(#slash_grad_${effect.id})`}
                  strokeWidth={effect.type === 'heavy_slash' ? '12' : '7'}
                  strokeLinecap="round"
                  className="animate-slash"
                  filter={`url(#slash_glow_${effect.id})`}
                />

                {/* Cross Slash Secondary Line for heavy hits */}
                {effect.type === 'heavy_slash' && (
                  <path
                    d="M 30 50 L 270 250"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="animate-slash"
                    style={{ animationDelay: '0.08s' }}
                    filter={`url(#slash_glow_${effect.id})`}
                  />
                )}

                {/* Flying Sparks & Shockwave Arcs */}
                <circle cx="150" cy="150" r="45" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.8" className="animate-ping" />
                <circle cx="150" cy="150" r="75" fill="none" stroke={effect.color || '#F43F5E'} strokeWidth="2" opacity="0.6" className="animate-ping" style={{ animationDelay: '0.1s' }} />

                {/* Particle Sparks */}
                <polygon points="140,130 160,150 145,170" fill="#FEF08A" className="animate-bounce" />
                <polygon points="170,120 185,135 165,150" fill="#FDA4AF" className="animate-bounce" style={{ animationDelay: '0.05s' }} />
                <polygon points="120,160 135,175 115,190" fill="#F59E0B" className="animate-bounce" style={{ animationDelay: '0.12s' }} />
              </svg>
            )}

            {/* 2. Shield / Crystal Aegis Barrier VFX */}
            {effect.type === 'shield' && (
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(56,189,248,0.9)] animate-shield-pulse">
                <defs>
                  <linearGradient id={`shield_grad_${effect.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#0284C7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0369A1" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Outer Sacred Hexagon */}
                <polygon
                  points="100,20 170,60 170,140 100,180 30,140 30,60"
                  fill={`url(#shield_grad_${effect.id})`}
                  stroke="#38BDF8"
                  strokeWidth="3.5"
                  className="filter drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                />

                {/* Inner Hexagon Matrix */}
                <polygon
                  points="100,40 150,70 150,130 100,160 50,130 50,70"
                  fill="none"
                  stroke="#E0F2FE"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Aegis Crystal Core */}
                <circle cx="100" cy="100" r="18" fill="#E0F2FE" opacity="0.85" className="animate-pulse" />
                <polygon points="100,75 115,100 100,125 85,100" fill="#38BDF8" />
              </svg>
            )}

            {/* 3. Skill Pulse / Quantum Lightning Rune VFX */}
            {effect.type === 'skill_pulse' && (
              <svg viewBox="0 0 240 240" className="w-full h-full animate-lightning">
                <circle cx="120" cy="120" r="90" fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="6 4" className="animate-spin" style={{ animationDuration: '6s' }} />
                <circle cx="120" cy="120" r="60" fill="none" stroke="#06B6D4" strokeWidth="2.5" />
                <path d="M 120 10 L 105 100 L 135 115 L 110 230" stroke="#F59E0B" strokeWidth="5" fill="none" strokeLinecap="round" className="filter drop-shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
              </svg>
            )}

            {/* 4. Ultimate Burst Full Screen VFX */}
            {effect.type === 'ultimate_burst' && (
              <div className="fixed inset-0 bg-white/20 backdrop-invert animate-ping pointer-events-none flex items-center justify-center">
                <div className="w-[600px] h-[600px] rounded-full border-4 border-amber-400 blur-sm animate-spin" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
