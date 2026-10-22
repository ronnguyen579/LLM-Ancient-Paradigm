import React, { useState } from 'react';
import { Relic, RelicRarity } from '../../types/game';
import { ANCIENT_RELICS } from '../../data/relics';
import { sound } from '../../utils/audio';
import { Sparkles, ArrowLeft, Check, Info, Shield, Zap, Flame, Eye, Cpu, Scroll, BookOpen, Layers, Dices } from 'lucide-react';

interface GachaSanctumProps {
  truthPrisms: number;
  unlockedRelics: Relic[];
  equippedRelics: Relic[];
  onSummonSuccess: (newRelics: Relic[], cost: number) => void;
  onToggleEquipRelic: (relic: Relic) => void;
  onBack: () => void;
}

export const GachaSanctum: React.FC<GachaSanctumProps> = ({
  truthPrisms,
  unlockedRelics,
  equippedRelics,
  onSummonSuccess,
  onToggleEquipRelic,
  onBack,
}) => {
  const [isSummoning, setIsSummoning] = useState(false);
  const [pulledResults, setPulledResults] = useState<Relic[]>([]);
  const [pityCounter, setPityCounter] = useState(0);

  // Helper to map icon name to Lucide Icon
  const renderRelicIcon = (iconName: string, className: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'Scroll': return <Scroll className={className} />;
      case 'Eye': return <Eye className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Dices': return <Dices className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const getRarityBadge = (rarity: RelicRarity) => {
    switch (rarity) {
      case 'mythic':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400">Thần Thoại</span>;
      case 'epic':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-400">Sử Thi</span>;
      case 'rare':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400">Hiếm</span>;
    }
  };

  const performSummon = (count: 1 | 10) => {
    const cost = count * 100;
    if (truthPrisms < cost || isSummoning) return;

    sound.playClick();
    setIsSummoning(true);

    setTimeout(() => {
      sound.playGachaReveal();
      const results: Relic[] = [];
      let currentPity = pityCounter;

      for (let i = 0; i < count; i++) {
        currentPity++;
        let chosen: Relic;

        if (currentPity >= 10) {
          // Pity triggered! Guaranteed Mythic
          const mythics = ANCIENT_RELICS.filter((r) => r.rarity === 'mythic');
          chosen = mythics[Math.floor(Math.random() * mythics.length)];
          currentPity = 0;
        } else {
          const roll = Math.random() * 100;
          if (roll < 12) {
            const mythics = ANCIENT_RELICS.filter((r) => r.rarity === 'mythic');
            chosen = mythics[Math.floor(Math.random() * mythics.length)];
            currentPity = 0;
          } else if (roll < 45) {
            const epics = ANCIENT_RELICS.filter((r) => r.rarity === 'epic');
            chosen = epics[Math.floor(Math.random() * epics.length)];
          } else {
            const rares = ANCIENT_RELICS.filter((r) => r.rarity === 'rare');
            chosen = rares[Math.floor(Math.random() * rares.length)];
          }
        }
        results.push(chosen);
      }

      setPityCounter(currentPity);
      setPulledResults(results);
      onSummonSuccess(results, cost);
      setIsSummoning(false);
    }, 1200);
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070B14] p-4 md:p-8 flex flex-col justify-between overflow-x-hidden">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
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
              Đền Thờ Tri Thức Cổ Đại (Gacha Sanctum)
            </h1>
            <p className="text-xs text-slate-400">
              Cổ vật mở rộng combo chiến thuật — Không bảo đảm chiến thắng nếu thiếu tính toán
            </p>
          </div>
        </div>

        {/* Currency & Pity Display */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-950/60 border border-cyan-400/50 rounded-xl">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span className="text-xs text-slate-300">Tinh Thể Chân Lý:</span>
            <span className="text-sm font-mono font-bold text-cyan-300 tabular-nums">
              {truthPrisms}
            </span>
          </div>

          <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-400">
            Bảo hiểm Thần Thoại: <span className="text-amber-400 font-bold">{10 - pityCounter}</span> lần nữa
          </div>
        </div>
      </div>

      {/* Main Summon Altar Showcase */}
      <div className="my-6 flex flex-col items-center justify-center relative p-8 bg-gradient-to-b from-slate-900/60 via-slate-950 to-black border border-amber-500/20 rounded-3xl shadow-2xl overflow-hidden">
        {/* Animated Sacred Runic Altar */}
        <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full border-2 border-amber-500/30 flex items-center justify-center mb-6">
          <div className="absolute inset-2 rounded-full border border-dashed border-cyan-500/40 animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute inset-6 rounded-full border border-amber-500/20" />
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500/30 via-cyan-500/30 to-purple-500/30 blur-md animate-pulse" />
          <Sparkles className={`w-12 h-12 text-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] ${isSummoning ? 'animate-spin' : ''}`} />
        </div>

        <h3 className="font-ancient text-lg font-bold text-amber-100 mb-1">
          Bàn Thờ Triệu Hồi Cổ Vật Tri Thức
        </h3>
        <p className="text-xs text-slate-400 max-w-md text-center mb-6">
          Khai mở những cuộn giấy Transformer, thấu kính Attention và hạt nhân MoE cổ đại. Trang bị tối đa 3 Cổ vật vào trận đấu.
        </p>

        {/* Summon Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => performSummon(1)}
            disabled={truthPrisms < 100 || isSummoning}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 hover:border-amber-400 text-slate-100 font-bold text-xs rounded-xl shadow-lg transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>Khai Quang x1</span>
            <span className="font-mono text-cyan-300">(100 Tinh Thể)</span>
          </button>

          <button
            onClick={() => performSummon(10)}
            disabled={truthPrisms < 1000 || isSummoning}
            className="px-7 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-xs rounded-xl shadow-xl transition-all hover:scale-105 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Khai Quang x10</span>
            <span className="font-mono text-slate-900">(1,000 Tinh Thể)</span>
          </button>
        </div>
      </div>

      {/* Relic Loadout & Equipped Gear Strip */}
      <div className="mb-4 p-4 bg-slate-950/80 border border-slate-800 rounded-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <h4 className="font-ancient text-sm font-bold text-amber-200">
              Cổ Vật Đang Trang Bị Vào Trận ({equippedRelics.length}/3)
            </h4>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              (Nhấp vào cổ vật trong kho để trang bị hoặc tháo gỡ)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[0, 1, 2].map((slotIdx) => {
            const relic = equippedRelics[slotIdx];
            return (
              <div
                key={slotIdx}
                className={`p-3 rounded-xl border flex items-center gap-3 ${
                  relic
                    ? 'bg-slate-900 border-amber-500/40 text-slate-100'
                    : 'bg-slate-950/50 border-dashed border-slate-800 text-slate-600'
                }`}
              >
                {relic ? (
                  <>
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                      {renderRelicIcon(relic.iconName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold truncate">{relic.name}</span>
                        {getRarityBadge(relic.rarity)}
                      </div>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{relic.description}</p>
                    </div>
                    <button
                      onClick={() => onToggleEquipRelic(relic)}
                      className="text-xs text-rose-400 hover:text-rose-300 ml-1"
                    >
                      Gỡ
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-slate-600 italic mx-auto">Ô trang bị trống</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Unlocked Relics Inventory Binder */}
      <div>
        <h4 className="font-ancient text-sm font-bold text-slate-200 mb-3">
          Kho Cổ Vật Tri Thức Đã Sở Hữu ({unlockedRelics.length}/{ANCIENT_RELICS.length})
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {unlockedRelics.map((relic) => {
            const isEquipped = equippedRelics.some((r) => r.id === relic.id);
            return (
              <div
                key={relic.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isEquipped
                    ? 'bg-amber-950/20 border-amber-400/80 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-amber-400">
                    {renderRelicIcon(relic.iconName)}
                  </div>
                  {getRarityBadge(relic.rarity)}
                </div>

                <h5 className="font-ancient text-xs font-bold text-slate-100">{relic.name}</h5>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {relic.description}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-amber-300/80 font-mono italic">
                    {relic.ancientTitle}
                  </span>
                  <button
                    onClick={() => onToggleEquipRelic(relic)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                      isEquipped
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isEquipped ? 'Đã Trang Bị' : 'Trang Bị'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pull Results Modal */}
      {pulledResults.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="max-w-2xl w-full bg-slate-900 border-2 border-amber-500/60 rounded-2xl p-6 shadow-2xl">
            <h3 className="font-ancient text-xl font-bold text-amber-300 text-center mb-4">
              ✨ Khai Quang Thành Công ✨
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-h-[60vh] overflow-y-auto p-1">
              {pulledResults.map((r, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center animate-in zoom-in-90 duration-300"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="p-2 rounded-full bg-amber-500/20 text-amber-400 mb-1.5">
                    {renderRelicIcon(r.iconName)}
                  </div>
                  <span className="text-xs font-bold text-slate-200 line-clamp-1">{r.name}</span>
                  <div className="mt-1">{getRarityBadge(r.rarity)}</div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => setPulledResults([])}
                className="px-8 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg"
              >
                Nhập Kho Cổ Vật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
