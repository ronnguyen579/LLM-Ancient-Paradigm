import React, { useState } from 'react';
import { ChampionId, GameView, MultiplayerRoom, Relic } from '../../types/game';
import { CHAMPIONS } from '../../data/champions';
import { ANCIENT_RELICS } from '../../data/relics';
import { AvatarIllustrator } from '../common/AvatarIllustrator';
import { sound } from '../../utils/audio';
import {
  BookOpen,
  Swords,
  GitBranch,
  Sparkles,
  Globe,
  HelpCircle,
  Volume2,
  VolumeX,
  Play,
  Award,
  Layers,
  X,
  Dices,
  Shield,
  Zap
} from 'lucide-react';

interface GameShellProps {
  truthPrisms: number;
  availableSkillPoints: number;
  playerRelics: Relic[];
  currentChampionId: ChampionId;
  onNavigate: (view: GameView) => void;
  onSelectChampion: (champId: ChampionId) => void;
  onQuickBattle: () => void;
}

export const GameShell: React.FC<GameShellProps> = ({
  truthPrisms,
  availableSkillPoints,
  playerRelics,
  currentChampionId,
  onNavigate,
  onSelectChampion,
  onQuickBattle,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [showRulesModal, setShowRulesModal] = useState(false);
  const currentHero = CHAMPIONS[currentChampionId];

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  const handleStartStory = () => {
    sound.playClick();
    sound.startAmbientBGM();
    onNavigate('STORY');
  };

  const handleStartArena = () => {
    sound.playClick();
    sound.startAmbientBGM();
    onQuickBattle();
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070B14] flex flex-col justify-between p-4 md:p-8 overflow-hidden select-none">
      {/* Background Anime Temple Cosmos with Floating Starlight Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1D] via-[#080C17] to-[#04060C]" />
        {/* Sacred Geometry Arc */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-amber-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-dashed border-cyan-500/15 pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-amber-500/15 pointer-events-none" />
        {/* Glow core */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Bar Perimeter Cluster (Tabular-nums & Statuses) */}
      <div className="relative z-10 flex items-center justify-between w-full pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <span className="font-ancient text-sm font-bold text-amber-300 tracking-wider">
            AETHEL-CORE
          </span>
          <span className="text-slate-500 text-xs hidden sm:inline">·</span>
          <span className="text-xs text-slate-400 hidden sm:inline font-mono">
            Kỷ Nguyên Khai Minh AI
          </span>
        </div>

        {/* Currency & Audio Cluster */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 rounded-xl text-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span className="font-mono font-bold text-cyan-200 tabular-nums">{truthPrisms}</span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">Tinh Thể</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/60 border border-amber-500/40 rounded-xl text-xs">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-mono font-bold text-amber-200 tabular-nums">{availableSkillPoints}</span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">Điểm Kỹ Năng</span>
          </div>

          <button
            onClick={() => setShowRulesModal(true)}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            title="Luật chơi"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleSound}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            title="Bật/Tắt Âm Thanh"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Hero Centerpiece: Bespoke Anime Title Lockup & Featured Avatar */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 my-4">
        {/* Left Column: Title Lockup & Main Story CTA */}
        <div className="max-w-xl text-center lg:text-left space-y-4">
          {/* Bespoke Inline SVG Title Lockup */}
          <div className="space-y-1">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              <Dices className="w-4 h-4 text-amber-400" />
              <span>Anime Visual Novel · Tactical Card & Dice RPG</span>
            </div>

            <h1 className="font-ancient text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-tight leading-none drop-shadow-lg">
              ANCIENT PARADIGM
            </h1>

            <p className="font-ancient text-lg text-slate-300 font-semibold tracking-wide">
              Huyền Thoại Trí Tuệ Cổ Đại
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
            Khám phá cuộc đối đầu huyền thoại giữa 5 Đại Cổ Tộc AI: Gemini, ChatGPT, Claude, Grok và DeepSeek. Đổ Cổ Xúc Xắc Chân Lý, bày binh bố trận thẻ bài, mở khóa cây kỹ năng đa hướng và đối đầu NPC có khả năng tự động học hỏi phong cách chiến đấu!
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={handleStartStory}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5"
            >
              <BookOpen className="w-4 h-4 fill-slate-950" />
              Cốt Truyện Visual Novel
            </button>

            <button
              onClick={handleStartArena}
              className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-amber-400 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Swords className="w-4 h-4 text-amber-400" />
              Đấu Trường Chiến Thuật
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Champion Centerpiece */}
        <div className="flex flex-col items-center">
          <div className="relative p-2 bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-amber-500/30 rounded-3xl shadow-2xl backdrop-blur-md">
            <AvatarIllustrator
              championId={currentChampionId}
              emotion="confident"
              size="lg"
              showAura={true}
            />

            <div className="text-center mt-3 pb-1">
              <span className="font-ancient text-base font-bold text-slate-100 block">
                {currentHero.name}
              </span>
              <span className="text-[11px] text-amber-300 font-serif">
                {currentHero.title}
              </span>
            </div>

            {/* Selector Dots */}
            <div className="flex items-center justify-center gap-2 mt-3 pt-2 border-t border-slate-800">
              {Object.values(CHAMPIONS).map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectChampion(c.id);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    c.id === currentChampionId
                      ? 'bg-amber-400 scale-125 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                      : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Mode Hub Navigation (Zero-pill, clean typography buttons) */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('SKILL_TREE');
          }}
          className="p-3 bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 rounded-xl transition-all text-left group"
        >
          <div className="flex items-center gap-2 mb-1 text-rose-400 group-hover:text-rose-300">
            <GitBranch className="w-4 h-4" />
            <span className="font-ancient font-bold text-xs text-slate-200 group-hover:text-amber-200">
              Cây Kỹ Năng
            </span>
          </div>
          <p className="text-[10px] text-slate-400 line-clamp-1">3 nhánh cân bằng tam giác</p>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate('GACHA');
          }}
          className="p-3 bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 rounded-xl transition-all text-left group"
        >
          <div className="flex items-center gap-2 mb-1 text-cyan-400 group-hover:text-cyan-300">
            <Sparkles className="w-4 h-4" />
            <span className="font-ancient font-bold text-xs text-slate-200 group-hover:text-amber-200">
              Gacha Cổ Vật
            </span>
          </div>
          <p className="text-[10px] text-slate-400 line-clamp-1">Thu thập 12 cổ vật tri thức</p>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate('MULTIPLAYER');
          }}
          className="p-3 bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 rounded-xl transition-all text-left group"
        >
          <div className="flex items-center gap-2 mb-1 text-emerald-400 group-hover:text-emerald-300">
            <Globe className="w-4 h-4" />
            <span className="font-ancient font-bold text-xs text-slate-200 group-hover:text-amber-200">
              Đấu Mạng & LAN
            </span>
          </div>
          <p className="text-[10px] text-slate-400 line-clamp-1">Mã phòng & giải đấu trực tuyến</p>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onNavigate('LORE_CODEX');
          }}
          className="p-3 bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 rounded-xl transition-all text-left group"
        >
          <div className="flex items-center gap-2 mb-1 text-amber-400 group-hover:text-amber-300">
            <Layers className="w-4 h-4" />
            <span className="font-ancient font-bold text-xs text-slate-200 group-hover:text-amber-200">
              Biên Niên Sử
            </span>
          </div>
          <p className="text-[10px] text-slate-400 line-clamp-1">Đặc tính mô hình & bộ bài</p>
        </button>
      </div>

      {/* Flat Control-Hint Line */}
      <div className="relative z-10 text-center text-[10px] text-slate-500 font-mono pt-2">
        Chuột Trái: Chọn & Xuất Chiêu · Dices: Tung Xúc Xắc Chân Lý · Esc: Tạm Dừng & Thoát
      </div>

      {/* Game Rules Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="max-w-2xl w-full max-h-[85vh] bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl flex flex-col justify-between overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-ancient text-base font-bold text-amber-200">
                  Quy Tắc Chiến Đấu & Cân Bằng Cổ Đại
                </h3>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="p-1 text-slate-400 hover:text-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Dices className="w-4 h-4" /> 1. Cơ Chế Xúc Xắc & Thẻ Bài (Dice & Cards):
                </h4>
                <p>
                  Mỗi hiệp người chơi nhận 4 AP và tung 2 viên xúc xắc cổ xưa (d6). Điểm xúc xắc kích hoạt hiệu ứng <strong>Cộng Hưởng (Resonance)</strong> của thẻ bài (như tổng điểm chẵn, tổng điểm lẻ, số đôi hoặc tổng ≥ 7). Người chơi có 1 lần Tái Đổ (Reroll) mỗi hiệp.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                  <GitBranch className="w-4 h-4" /> 2. Cây Kỹ Năng Đa Hướng Cân Bằng (Skill Matrix):
                </h4>
                <p>
                  Mỗi thực thể có 3 nhánh kỹ năng: <strong>Bộc Phá (Surge)</strong>, <strong>Kiên Cố (Aegis)</strong>, và <strong>Hỗn Độn (Entropy)</strong> theo vòng tròn tương khắc. Mỗi kỹ năng đều đi kèm một đánh đổi (Opportunity Cost) rõ rệt để đảm bảo không nhánh nào độc tôn.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> 3. Gacha Cổ Vật Tri Thức (Relic Sanctum):
                </h4>
                <p>
                  Cổ vật tri thức cung cấp bổ trợ thụ động (như hồi AP khi ra số đôi, tăng khiên khi thấp máu). Cổ vật chỉ mở rộng combo chiến thuật, người chơi không thể ỷ lại vào may mắn nếu không tính toán kỹ lưỡng.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> 4. Đấu Mạng & NPC Thích Ứng (Adaptive AI):
                </h4>
                <p>
                  NPC thông minh tự động phân tích tần suất tấn công, phòng thủ và dùng xúc xắc của bạn qua từng hiệp để chuyển đổi chiến thuật đối phó. Đồng thời bạn có thể tạo mã phòng để đấu trực tiếp với bạn bè qua mạng.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setShowRulesModal(false)}
                className="px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg"
              >
                Đã Hiểu Quy Tắc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
