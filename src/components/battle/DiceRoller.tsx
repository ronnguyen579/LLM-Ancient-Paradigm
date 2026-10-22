import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { Dices, RefreshCw, Zap } from 'lucide-react';

interface DiceRollerProps {
  dice: [number, number];
  rerollsLeft: number;
  maxRerolls: number;
  hasRolled: boolean;
  isPlayerTurn: boolean;
  onRoll: () => void;
  onReroll: () => void;
  disabled?: boolean;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({
  dice,
  rerollsLeft,
  maxRerolls,
  hasRolled,
  isPlayerTurn,
  onRoll,
  onReroll,
  disabled = false,
}) => {
  const [isRolling, setIsRolling] = useState(false);

  const handleRollAction = (action: 'first' | 'reroll') => {
    if (disabled || !isPlayerTurn || isRolling) return;
    setIsRolling(true);
    sound.playDiceRoll();

    setTimeout(() => {
      if (action === 'first') {
        onRoll();
      } else {
        onReroll();
      }
      setIsRolling(false);
    }, 600);
  };

  const sum = dice[0] + dice[1];
  const isEven = sum % 2 === 0;
  const isDouble = dice[0] === dice[1];

  // Helper to render die face with standard pips
  const renderDieFace = (val: number) => {
    const pips: Record<number, number[][]> = {
      1: [[50, 50]],
      2: [[25, 25], [75, 75]],
      3: [[25, 25], [50, 50], [75, 75]],
      4: [[25, 25], [75, 25], [25, 75], [75, 75]],
      5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
      6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]],
    };

    const currentPips = pips[val] || [[50, 50]];

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {currentPips.map(([x, y], idx) => (
          <circle
            key={idx}
            cx={x}
            cy={y}
            r={val === 1 ? 12 : 8.5}
            fill={val === 1 ? '#EF4444' : '#F59E0B'}
            className="filter drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]"
          />
        ))}
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center gap-2 p-3 bg-slate-900/80 border border-amber-500/30 rounded-xl backdrop-blur-sm shadow-xl min-w-[260px]">
      <div className="flex items-center justify-between w-full px-1 text-xs text-slate-400 font-medium">
        <span className="flex items-center gap-1.5 text-amber-300">
          <Dices className="w-3.5 h-3.5" />
          Cổ Xúc Xắc Chân Lý
        </span>
        <span className="font-mono tabular-nums text-slate-300">
          Tái đổ: {rerollsLeft}/{maxRerolls}
        </span>
      </div>

      {/* The 2 Dice */}
      <div className="flex items-center gap-4 my-1">
        <div
          className={`w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-950 border-2 rounded-xl p-1.5 shadow-lg flex items-center justify-center transition-all ${
            isRolling ? 'animate-dice border-amber-400' : 'border-slate-700 hover:border-amber-500/60'
          }`}
        >
          {hasRolled ? renderDieFace(dice[0]) : <span className="font-ancient text-xl text-slate-600">?</span>}
        </div>

        <div
          className={`w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-950 border-2 rounded-xl p-1.5 shadow-lg flex items-center justify-center transition-all ${
            isRolling ? 'animate-dice border-amber-400' : 'border-slate-700 hover:border-amber-500/60'
          }`}
          style={{ animationDelay: '0.08s' }}
        >
          {hasRolled ? renderDieFace(dice[1]) : <span className="font-ancient text-xl text-slate-600">?</span>}
        </div>
      </div>

      {/* Resonance Metrics & Indicators */}
      {hasRolled ? (
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 tabular-nums font-bold">
            Tổng: {sum}
          </span>
          <span className={`px-2 py-0.5 rounded border text-[11px] font-medium ${isEven ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300' : 'bg-orange-950/60 border-orange-500/40 text-orange-300'}`}>
            {isEven ? 'Chẵn' : 'Lẻ'}
          </span>
          {isDouble && (
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400 text-amber-300 text-[11px] font-bold animate-pulse flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              Số Đôi!
            </span>
          )}
        </div>
      ) : (
        <span className="text-xs text-slate-500 italic">Chưa đổ xúc xắc lượt này</span>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-1 w-full">
        {!hasRolled ? (
          <button
            onClick={() => handleRollAction('first')}
            disabled={!isPlayerTurn || disabled || isRolling}
            className="w-full py-2 px-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow transition-all flex items-center justify-center gap-1.5"
          >
            <Dices className="w-4 h-4" />
            Tung Xúc Xắc
          </button>
        ) : (
          <button
            onClick={() => handleRollAction('reroll')}
            disabled={!isPlayerTurn || rerollsLeft <= 0 || disabled || isRolling}
            className="w-full py-1.5 px-3 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all flex items-center justify-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRolling ? 'animate-spin' : ''}`} />
            Tái Đổ ({rerollsLeft})
          </button>
        )}
      </div>
    </div>
  );
};
