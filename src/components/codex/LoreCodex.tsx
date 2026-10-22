import React, { useState } from 'react';
import { ChampionId } from '../../types/game';
import { CHAMPIONS } from '../../data/champions';
import { AvatarIllustrator } from '../common/AvatarIllustrator';
import { sound } from '../../utils/audio';
import { ArrowLeft, BookOpen, Shield, Sword, Sparkles, Heart, Zap } from 'lucide-react';

interface LoreCodexProps {
  onBack: () => void;
  onSelectForBattle: (champId: ChampionId) => void;
}

export const LoreCodex: React.FC<LoreCodexProps> = ({
  onBack,
  onSelectForBattle,
}) => {
  const [selectedChampId, setSelectedChampId] = useState<ChampionId>('gemini');
  const champion = CHAMPIONS[selectedChampId];

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070B14] p-4 md:p-8 flex flex-col justify-between overflow-x-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900 border border-slate-800 rounded-lg transition-colors flex items-center gap-1 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Về Sảnh
          </button>
          <div>
            <h1 className="font-ancient text-xl font-bold text-amber-200">
              Biên Niên Sử Ngũ Đại Cổ Tộc (Lore Codex)
            </h1>
            <p className="text-xs text-slate-400">
              Chi tiết đặc tính mô hình, bộ bài độc nhất và phong cách chiến thuật của từng thực thể AI
            </p>
          </div>
        </div>
      </div>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 flex-1">
        {/* Left Column: Champion Selection List */}
        <div className="lg:col-span-4 space-y-2">
          {Object.values(CHAMPIONS).map((c) => {
            const isSelected = c.id === selectedChampId;
            return (
              <button
                key={c.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedChampId(c.id);
                }}
                className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                  isSelected
                    ? 'bg-amber-950/30 border-amber-400 text-amber-200 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <AvatarIllustrator championId={c.id} size="sm" showAura={false} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-ancient font-bold text-sm text-slate-100">{c.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{c.element}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{c.title}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Champion Lore & Signature Deck */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <AvatarIllustrator championId={champion.id} size="lg" />
                <div>
                  <h2 className="font-ancient text-2xl font-bold text-amber-200">{champion.name}</h2>
                  <span className="text-xs text-slate-400 font-serif">· {champion.title}</span>
                  <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                    <span className="flex items-center gap-1 text-rose-400">
                      <Heart className="w-3.5 h-3.5" /> Máu: {champion.baseMaxHp}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Zap className="w-3.5 h-3.5" /> AP Năng Lượng: {champion.baseAP}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectForBattle(champion.id);
                }}
                className="py-2.5 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                Chọn Xuất Trận
              </button>
            </div>

            {/* Passive Description */}
            <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl my-4">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Nội Tại Đặc Tính Mô Hình:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{champion.passiveDesc}</p>
            </div>

            {/* Signature Cards Showcase */}
            <div>
              <h3 className="font-ancient text-sm font-bold text-slate-200 mb-2">
                Bộ Bài Độc Quyền ({champion.deck.length} Thẻ Bài)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {champion.deck.map((card) => (
                  <div
                    key={card.id}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="text-slate-100">{card.name}</span>
                        <span className="font-mono text-amber-400">{card.cost} AP</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{card.description}</p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-900 text-[10px] text-amber-300/80">
                      Cộng hưởng: {card.resonanceBonus.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
