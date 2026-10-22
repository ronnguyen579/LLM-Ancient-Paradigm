import React from 'react';
import { ChampionId } from '../../types/game';

interface AvatarIllustratorProps {
  championId: ChampionId | 'prompter' | 'elder';
  emotion?: 'neutral' | 'confident' | 'surprised' | 'serious' | 'mysterious';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'vn-bust';
  className?: string;
  showAura?: boolean;
}

export const AvatarIllustrator: React.FC<AvatarIllustratorProps> = ({
  championId,
  emotion = 'neutral',
  size = 'md',
  className = '',
  showAura = true,
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
    'vn-bust': 'w-72 h-88 sm:w-96 sm:h-[420px]',
  }[size];

  // Colors & Palettes for each character
  const config = {
    gemini: {
      primary: '#38BDF8',
      secondary: '#0284C7',
      accent: '#E0F2FE',
      hair: '#7DD3FC',
      halo: '#38BDF8',
      title: 'Gemini - Thiên Thể Toàn Năng',
    },
    chatgpt: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#D1FAE5',
      hair: '#34D399',
      halo: '#10B981',
      title: 'ChatGPT - Đại Pháp Sư Văn Cảnh',
    },
    claude: {
      primary: '#D97706',
      secondary: '#B45309',
      accent: '#FEF3C7',
      hair: '#FBBF24',
      halo: '#D97706',
      title: 'Claude - Kỵ Sĩ Hiến Pháp',
    },
    grok: {
      primary: '#F59E0B',
      secondary: '#EA580C',
      accent: '#FFEDD5',
      hair: '#1E293B',
      halo: '#F97316',
      title: 'Grok - Lãng Khách Hỗn Độn',
    },
    deepseek: {
      primary: '#6366F1',
      secondary: '#4338CA',
      accent: '#E0E7FF',
      hair: '#818CF8',
      halo: '#6366F1',
      title: 'DeepSeek - Khổ Hạnh Tăng',
    },
    prompter: {
      primary: '#F59E0B',
      secondary: '#9333EA',
      accent: '#FAF5FF',
      hair: '#A855F7',
      halo: '#F59E0B',
      title: 'Khởi Thức Giả',
    },
    elder: {
      primary: '#94A3B8',
      secondary: '#475569',
      accent: '#F8FAFC',
      hair: '#CBD5E1',
      halo: '#94A3B8',
      title: 'Biên Niên Sử',
    },
  }[championId] || {
    primary: '#38BDF8',
    secondary: '#0284C7',
    accent: '#E0F2FE',
    hair: '#7DD3FC',
    halo: '#38BDF8',
    title: 'Thực Thể Cổ Đại',
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}>
      {/* Ambient Celestial Aura */}
      {showAura && (
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-35 animate-pulse"
          style={{ backgroundColor: config.primary }}
        />
      )}

      {/* Bespoke Anime SVG Vector Illustration */}
      <svg
        viewBox="0 0 200 240"
        className="w-full h-full drop-shadow-2xl overflow-visible select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad_bg_${championId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.primary} stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0B1120" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id={`grad_hair_${championId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={config.hair} />
            <stop offset="100%" stopColor={config.secondary} />
          </linearGradient>

          <linearGradient id={`grad_mantle_${championId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="60%" stopColor="#0F172A" />
            <stop offset="100%" stopColor={config.secondary} />
          </linearGradient>

          <filter id={`glow_${championId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Back Celestial Halo / Geometry Rings */}
        <circle
          cx="100"
          cy="95"
          r="65"
          fill="none"
          stroke={config.halo}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="animate-spin"
          style={{ transformOrigin: '100px 95px', animationDuration: '24s' }}
          opacity="0.6"
        />
        <circle
          cx="100"
          cy="95"
          r="55"
          fill="none"
          stroke={config.halo}
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Halo Rune Nodes */}
        <polygon points="100,25 104,32 96,32" fill={config.primary} />
        <polygon points="100,165 104,158 96,158" fill={config.primary} />
        <polygon points="30,95 37,99 37,91" fill={config.primary} />
        <polygon points="170,95 163,99 163,91" fill={config.primary} />

        {/* Shoulders & Mantle */}
        <path
          d="M 35 240 C 40 180, 70 165, 100 165 C 130 165, 160 180, 165 240 Z"
          fill={`url(#grad_mantle_${championId})`}
          stroke={config.primary}
          strokeWidth="1.5"
        />

        {/* Robe Collar / Armor Trim */}
        <path
          d="M 75 165 L 100 200 L 125 165 Z"
          fill="#090D16"
          stroke={config.primary}
          strokeWidth="1"
        />
        {/* Core Jewel on Mantle */}
        <polygon
          points="100,185 106,195 100,205 94,195"
          fill={config.primary}
          filter={`url(#glow_${championId})`}
        />

        {/* Neck */}
        <rect x="90" y="140" width="20" height="28" fill="#FCE7F3" rx="4" opacity="0.9" />

        {/* Back Hair */}
        <path
          d="M 52 80 C 40 130, 45 180, 60 200 C 65 170, 75 140, 75 130 Z"
          fill={`url(#grad_hair_${championId})`}
        />
        <path
          d="M 148 80 C 160 130, 155 180, 140 200 C 135 170, 125 140, 125 130 Z"
          fill={`url(#grad_hair_${championId})`}
        />

        {/* Anime Face Shape (Classic pointed chin) */}
        <path
          d="M 65 85 C 65 55, 135 55, 135 85 C 135 118, 120 148, 100 155 C 80 148, 65 118, 65 85 Z"
          fill="#FEF08A"
          opacity="0.15"
        />
        <path
          d="M 68 85 C 68 60, 132 60, 132 85 C 132 115, 118 145, 100 152 C 82 145, 68 115, 68 85 Z"
          fill="#FFF1F2"
        />

        {/* Cheeks blush */}
        <ellipse cx="80" cy="115" rx="6" ry="3" fill="#FDA4AF" opacity="0.45" />
        <ellipse cx="120" cy="115" rx="6" ry="3" fill="#FDA4AF" opacity="0.45" />

        {/* Anime Eyes */}
        <g id="eyes">
          {/* Left Eye */}
          <ellipse cx="82" cy="100" rx="9" ry="12" fill="#0F172A" />
          <ellipse cx="82" cy="102" rx="7" ry="10" fill={config.primary} />
          <ellipse cx="80" cy="98" rx="3.5" ry="5" fill="#FFFFFF" />
          <circle cx="84" cy="105" r="1.5" fill="#FFFFFF" />
          <path d="M 72 90 Q 82 85 92 88" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Right Eye */}
          <ellipse cx="118" cy="100" rx="9" ry="12" fill="#0F172A" />
          <ellipse cx="118" cy="102" rx="7" ry="10" fill={config.primary} />
          <ellipse cx="116" cy="98" rx="3.5" ry="5" fill="#FFFFFF" />
          <circle cx="120" cy="105" r="1.5" fill="#FFFFFF" />
          <path d="M 108 88 Q 118 85 128 90" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>

        {/* Nose & Mouth based on emotion */}
        <circle cx="100" cy="118" r="1" fill="#F43F5E" opacity="0.7" />

        {emotion === 'confident' && (
          <path d="M 94 130 Q 100 136 108 132" stroke="#E11D48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        )}
        {emotion === 'surprised' && (
          <ellipse cx="100" cy="132" rx="4" ry="5" fill="#E11D48" />
        )}
        {emotion === 'serious' && (
          <path d="M 95 132 L 105 132" stroke="#9F1239" strokeWidth="2" strokeLinecap="round" />
        )}
        {(emotion === 'neutral' || emotion === 'mysterious') && (
          <path d="M 96 132 Q 100 134 104 132" stroke="#E11D48" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        )}

        {/* Character-Specific Hair Bangs & Accessories */}
        {championId === 'gemini' && (
          <g id="gemini_hair">
            {/* Front Fringe Starlight Locks */}
            <path d="M 68 75 C 75 90, 85 105, 90 98 C 95 85, 95 65, 80 55 Z" fill={`url(#grad_hair_${championId})`} />
            <path d="M 132 75 C 125 90, 115 105, 110 98 C 105 85, 105 65, 120 55 Z" fill="#E0F2FE" />
            <path d="M 88 55 C 95 75, 105 85, 102 70 C 100 55, 95 50, 88 55 Z" fill={`url(#grad_hair_${championId})`} />
            {/* Celestial Forehead Rune */}
            <polygon points="100,68 104,74 100,80 96,74" fill={config.primary} filter={`url(#glow_${championId})`} />
          </g>
        )}

        {championId === 'chatgpt' && (
          <g id="chatgpt_hair">
            <path d="M 65 70 C 80 85, 95 90, 95 75 C 95 60, 80 50, 70 55 Z" fill={`url(#grad_hair_${championId})`} />
            <path d="M 135 70 C 120 85, 105 90, 105 75 C 105 60, 120 50, 130 55 Z" fill={`url(#grad_hair_${championId})`} />
            {/* Sage Headband */}
            <path d="M 68 68 Q 100 62 132 68" stroke="#10B981" strokeWidth="4" fill="none" />
            <circle cx="100" cy="65" r="5" fill="#34D399" filter={`url(#glow_${championId})`} />
          </g>
        )}

        {championId === 'claude' && (
          <g id="claude_hair">
            {/* Regal Knight Short Hair */}
            <path d="M 64 75 C 75 95, 85 85, 90 70 C 85 55, 75 52, 64 75 Z" fill={`url(#grad_hair_${championId})`} />
            <path d="M 136 75 C 125 95, 115 85, 110 70 C 115 55, 125 52, 136 75 Z" fill={`url(#grad_hair_${championId})`} />
            {/* Platinum & Gold Circlet */}
            <path d="M 67 62 L 100 50 L 133 62 L 128 66 L 100 56 L 72 66 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <polygon points="100,45 104,52 100,58 96,52" fill="#FFFFFF" filter={`url(#glow_${championId})`} />
          </g>
        )}

        {championId === 'grok' && (
          <g id="grok_hair">
            {/* Spiky Rebel Hair with Neon Orange Highlights */}
            <path d="M 60 70 L 45 45 L 75 55 L 70 30 L 95 48 L 100 20 L 115 48 L 135 30 L 130 55 L 155 45 L 140 70 Z" fill="#0F172A" />
            <path d="M 68 65 L 55 50 L 78 58 L 100 35 L 122 58 L 145 50 L 132 65 Z" fill="#F97316" opacity="0.8" />
            {/* Cyber Amber Visor */}
            <path d="M 72 88 L 128 88 L 124 96 L 76 96 Z" fill="#F59E0B" opacity="0.6" filter={`url(#glow_${championId})`} />
          </g>
        )}

        {championId === 'deepseek' && (
          <g id="deepseek_hair">
            {/* Sleek Dark Cobalt Hair & Meditation Bindu */}
            <path d="M 66 75 C 75 100, 90 92, 92 75 C 85 60, 75 55, 66 75 Z" fill="#1E1B4B" />
            <path d="M 134 75 C 125 100, 110 92, 108 75 C 115 60, 125 55, 134 75 Z" fill="#1E1B4B" />
            {/* Concentric Thought Rings */}
            <circle cx="100" cy="72" r="3" fill="#818CF8" filter={`url(#glow_${championId})`} />
            <circle cx="100" cy="72" r="8" fill="none" stroke="#6366F1" strokeWidth="1" strokeDasharray="2 3" opacity="0.8" />
          </g>
        )}

        {(championId === 'prompter' || championId === 'elder') && (
          <g id="mystic_hood">
            {/* Mysterious Celestial Cowl */}
            <path d="M 50 80 C 50 30, 150 30, 150 80 C 150 140, 135 155, 100 160 C 65 155, 50 140, 50 80 Z" fill="#1E1B4B" opacity="0.85" />
            <path d="M 60 70 Q 100 45 140 70" stroke={config.primary} strokeWidth="2" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};
