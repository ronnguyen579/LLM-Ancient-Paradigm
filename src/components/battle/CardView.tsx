import React from 'react';
import { Card } from '../../types/game';
import { Zap, Shield, Sword, Sparkles, Crown } from 'lucide-react';

interface CardViewProps {
  card: Card;
  currentDice: [number, number];
  hasRolled: boolean;
  canAfford: boolean;
  isPlayerTurn: boolean;
  onClick: (card: Card) => void;
  disabled?: boolean;
}

export const CardView: React.FC<CardViewProps> = ({
  card,
  currentDice,
  hasRolled,
  canAfford,
  isPlayerTurn,
  onClick,
  disabled = false,
}) => {
  const sum = currentDice[0] + currentDice[1];

  // Evaluate if current dice satisfies resonance condition
  const isResonanceActive = React.useMemo(() => {
    if (!hasRolled) return false;
    const req = card.diceReq;
    if (req.type === 'any') return true;
    if (req.type === 'min_total') return sum >= req.value;
    if (req.type === 'even') return sum % 2 === 0;
    if (req.type === 'odd') return sum % 2 === 1;
    if (req.type === 'double') return currentDice[0] === currentDice[1];
    if (req.type === 'exact_single') return currentDice[0] === req.value || currentDice[1] === req.value;
    return false;
  }, [hasRolled, card.diceReq, sum, currentDice]);

  const typeConfig = {
    strike: {
      border: 'border-rose-500/50 hover:border-rose-400',
      activeGlow: 'shadow-[0_0_15px_rgba(244,63,94,0.4)]',
      badgeBg: 'bg-rose-950/80 text-rose-300 border-rose-800',
      icon: <Sword className="w-3.5 h-3.5 text-rose-400" />,
      typeLabel: 'Tấn Công',
    },
    defend: {
      border: 'border-sky-500/50 hover:border-sky-400',
      activeGlow: 'shadow-[0_0_15px_rgba(56,189,248,0.4)]',
      badgeBg: 'bg-sky-950/80 text-sky-300 border-sky-800',
      icon: <Shield className="w-3.5 h-3.5 text-sky-400" />,
      typeLabel: 'Phòng Ngự',
    },
    skill: {
      border: 'border-emerald-500/50 hover:border-emerald-400',
      activeGlow: 'shadow-[0_0_15px_rgba(16,185,129,0.4)]',
      badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />,
      typeLabel: 'Kỹ Năng',
    },
    ultimate: {
      border: 'border-amber-400 hover:border-amber-300',
      activeGlow: 'shadow-[0_0_22px_rgba(245,158,11,0.6)] animate-pulse',
      badgeBg: 'bg-amber-950/90 text-amber-300 border-amber-600',
      icon: <Crown className="w-3.5 h-3.5 text-amber-400" />,
      typeLabel: 'Tối Thượng',
    },
  }[card.type];

  const isPlayable = isPlayerTurn && canAfford && !disabled;

  return (
    <button
      type="button"
      onClick={() => isPlayable && onClick(card)}
      disabled={!isPlayable}
      className={`relative group w-44 sm:w-48 h-64 rounded-xl p-3 flex flex-col justify-between text-left transition-all duration-200 border bg-gradient-to-b from-slate-900 via-slate-950 to-black select-none ${
        typeConfig.border
      } ${isResonanceActive ? typeConfig.activeGlow : ''} ${
        isPlayable
          ? 'cursor-pointer hover:-translate-y-2.5 hover:shadow-2xl'
          : 'opacity-55 cursor-not-allowed filter grayscale-[30%]'
      }`}
    >
      {/* Top Header: Cost AP & Type Badge */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border text-[11px] font-medium tracking-wide ${typeConfig.badgeBg}">
          {typeConfig.icon}
          <span>{typeConfig.typeLabel}</span>
        </div>

        {/* AP Cost Badge */}
        <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/80 flex items-center justify-center text-xs font-mono font-bold text-amber-300 shadow">
          {card.cost}
        </div>
      </div>

      {/* Card Title & Icon */}
      <div className="my-1">
        <h4 className="font-ancient text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
          {card.name}
        </h4>
        <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* Middle Stats Showcase */}
      <div className="flex items-center gap-3 py-1 border-t border-b border-slate-800/80 text-xs font-mono tabular-nums">
        {card.baseDamage !== undefined && (
          <span className="flex items-center gap-1 text-rose-400 font-semibold">
            <Sword className="w-3 h-3" />
            {card.baseDamage} Cầu Sát
          </span>
        )}
        {card.baseShield !== undefined && (
          <span className="flex items-center gap-1 text-sky-400 font-semibold">
            <Shield className="w-3 h-3" />
            {card.baseShield} Khiên
          </span>
        )}
      </div>

      {/* Bottom Resonance Condition & Bonus */}
      <div
        className={`p-1.5 rounded-lg border text-[10px] leading-tight transition-colors ${
          isResonanceActive
            ? 'bg-amber-950/60 border-amber-400/70 text-amber-200'
            : 'bg-slate-900/60 border-slate-800 text-slate-400'
        }`}
      >
        <div className="flex items-center justify-between mb-0.5 font-bold">
          <span className="flex items-center gap-1">
            <Zap className={`w-3 h-3 ${isResonanceActive ? 'text-amber-400 animate-bounce' : 'text-slate-500'}`} />
            Cộng Hưởng Xúc Xắc:
          </span>
          {isResonanceActive && (
            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-bold uppercase">
              Kích hoạt
            </span>
          )}
        </div>
        <p className="line-clamp-2">{card.resonanceBonus.text}</p>
      </div>
    </button>
  );
};
