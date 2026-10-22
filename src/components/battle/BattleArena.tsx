import React, { useState, useEffect, useRef } from 'react';
import { Card, Champion, ChampionId, CombatEntity, CombatState, Relic } from '../../types/game';
import { CHAMPIONS } from '../../data/champions';
import { AvatarIllustrator } from '../common/AvatarIllustrator';
import { CardView } from './CardView';
import { DiceRoller } from './DiceRoller';
import { CombatVFXOverlay, ActiveVFX, VFXType } from './CombatVFXOverlay';
import { UltimateCutsceneOverlay } from './UltimateCutsceneOverlay';
import { AdaptiveAIBrain } from '../../utils/adaptiveAI';
import { sound } from '../../utils/audio';
import {
  Shield,
  Heart,
  Zap,
  Play,
  RotateCcw,
  Swords,
  Info,
  Sparkles,
  AlertCircle,
  Settings,
  X,
  Volume2,
  VolumeX,
  Gauge,
  LogOut,
  HelpCircle,
  Vibrate,
  VibrateOff
} from 'lucide-react';

interface BattleArenaProps {
  playerChampionId: ChampionId;
  opponentChampionId: ChampionId;
  playerRelics: Relic[];
  allocatedSkills: string[];
  isMultiplayer?: boolean;
  onVictory?: () => void;
  onDefeat?: () => void;
  onExit: () => void;
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  playerChampionId,
  opponentChampionId,
  playerRelics,
  allocatedSkills,
  onVictory,
  onDefeat,
  onExit,
}) => {
  const playerHero: Champion = CHAMPIONS[playerChampionId];
  const opponentHero: Champion = CHAMPIONS[opponentChampionId];

  // Initialize Adaptive AI Brain
  const aiBrainRef = useRef<AdaptiveAIBrain>(new AdaptiveAIBrain());

  // Screen shake & damage effect trigger
  const [screenShake, setScreenShake] = useState(false);
  const [floatingText, setFloatingText] = useState<{ id: string; text: string; color: string; isOpponent: boolean }[]>([]);

  // Anime VFX Trigger State
  const [activeVFX, setActiveVFX] = useState<ActiveVFX[]>([]);

  // Ultimate Chant Cutscene State
  const [activeCutsceneChampion, setActiveCutsceneChampion] = useState<ChampionId | null>(null);
  const pendingUltimateActionRef = useRef<(() => void) | null>(null);

  // In-Game Menu & Settings State
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSurrenderConfirm, setShowSurrenderConfirm] = useState(false);
  const [battleSpeed, setBattleSpeed] = useState<1 | 1.5 | 2>(1);
  const [enableScreenShake, setEnableScreenShake] = useState(true);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  // Helper to speed up delays based on battle speed
  const speedDelay = (baseMs: number) => Math.round(baseMs / battleSpeed);

  // Trigger VFX helper
  const triggerVFX = (type: VFXType, target: 'player' | 'opponent' | 'screen', color?: string) => {
    const id = Math.random().toString();
    setActiveVFX((prev) => [...prev, { id, type, target, color }]);
    setTimeout(() => {
      setActiveVFX((prev) => prev.filter((v) => v.id !== id));
    }, 650);
  };

  // Combat State
  const [state, setState] = useState<CombatState>(() => {
    // Check if player has flash rune relic (+1 AP start)
    const hasFlashRune = playerRelics.some(r => r.id === 'flash_rune');
    const startAP = playerHero.baseAP + (hasFlashRune ? 1 : 0);

    const playerEntity: CombatEntity = {
      championId: playerChampionId,
      name: playerHero.name,
      hp: playerHero.baseMaxHp,
      maxHp: playerHero.baseMaxHp,
      shield: 0,
      ap: startAP,
      maxAP: startAP,
      hand: [...playerHero.deck].slice(0, 4),
      drawPile: [...playerHero.deck].slice(4),
      discardPile: [],
      statuses: [],
      equippedRelics: playerRelics,
      allocatedSkills,
    };

    const opponentEntity: CombatEntity = {
      championId: opponentChampionId,
      name: opponentHero.name,
      hp: opponentHero.baseMaxHp,
      maxHp: opponentHero.baseMaxHp,
      shield: 0,
      ap: opponentHero.baseAP,
      maxAP: opponentHero.baseAP,
      hand: [...opponentHero.deck].slice(0, 4),
      drawPile: [...opponentHero.deck].slice(4),
      discardPile: [],
      statuses: [],
      equippedRelics: [],
      allocatedSkills: [],
    };

    return {
      turnNumber: 1,
      activeEntity: 'player',
      player: playerEntity,
      opponent: opponentEntity,
      dice: [3, 4],
      rerollsLeft: 1,
      maxRerolls: 1,
      hasRolled: false,
      log: [
        {
          id: 'log_0',
          text: `Trận quyết đấu bắt đầu: ${playerHero.name} (${playerHero.title}) VS ${opponentHero.name} (${opponentHero.title})!`,
          source: 'system',
          timestamp: Date.now(),
        },
      ],
      isGameOver: false,
      aiDecisionTelegraph: 'Đối thủ đang suy đoán bước đi đầu tiên...',
    };
  });

  const showDamageFloater = (text: string, color: string, isOpponent: boolean) => {
    const id = Math.random().toString();
    setFloatingText((prev) => [...prev, { id, text, color, isOpponent }]);
    setTimeout(() => {
      setFloatingText((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  };

  const triggerScreenShake = () => {
    if (!enableScreenShake) return;
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 450);
  };

  const handleToggleMute = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  // Turn-start dice roll handler for Player
  const handlePlayerRoll = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;

    setState((prev) => {
      let extraAP = 0;
      let extraShield = 0;

      // Check Transformer Scroll relic (Double dice gives AP + Shield)
      if (d1 === d2 && prev.player.equippedRelics.some(r => r.id === 'transformer_scroll')) {
        extraAP += 1;
        extraShield += 6;
        sound.playShield();
        triggerVFX('shield', 'player');
      }

      return {
        ...prev,
        dice: [d1, d2],
        hasRolled: true,
        player: {
          ...prev.player,
          ap: Math.min(prev.player.maxAP + 2, prev.player.ap + extraAP),
          shield: prev.player.shield + extraShield,
        },
        log: [
          {
            id: `log_${Date.now()}`,
            text: `${prev.player.name} tung ra Cổ Xúc Xắc: [${d1}] và [${d2}] (Tổng: ${d1 + d2})`,
            source: 'player',
            timestamp: Date.now(),
          },
          ...prev.log.slice(0, 30),
        ],
      };
    });
  };

  const handlePlayerReroll = () => {
    if (state.rerollsLeft <= 0) return;
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;

    aiBrainRef.current.recordPlayerReroll();

    setState((prev) => ({
      ...prev,
      dice: [d1, d2],
      rerollsLeft: prev.rerollsLeft - 1,
      log: [
        {
          id: `log_${Date.now()}`,
          text: `${prev.player.name} tái đổ xúc xắc lượng tử: [${d1}] và [${d2}] (Tổng: ${d1 + d2})`,
          source: 'player',
          timestamp: Date.now(),
        },
        ...prev.log.slice(0, 30),
      ],
    }));
  };

  // Cutscene Completion Handler
  const handleCutsceneComplete = () => {
    setActiveCutsceneChampion(null);
    if (pendingUltimateActionRef.current) {
      pendingUltimateActionRef.current();
      pendingUltimateActionRef.current = null;
    }
  };

  // Play a card from hand
  const handlePlayCard = (card: Card) => {
    if (state.activeEntity !== 'player' || state.player.ap < card.cost || state.isGameOver) return;

    sound.playCardPlay();
    aiBrainRef.current.recordPlayerMove(card, state.player.shield);

    // If card is an ultimate, intercept and launch the 4-second Anime Chant Cutscene!
    if (card.type === 'ultimate') {
      pendingUltimateActionRef.current = () => {
        executeCardResolution(card, true);
      };
      setActiveCutsceneChampion(playerChampionId);
      return;
    }

    executeCardResolution(card, true);
  };

  const executeCardResolution = (card: Card, isPlayer: boolean) => {
    if (card.type === 'strike') {
      const isHeavy = (card.baseDamage || 0) > 10;
      triggerVFX(isHeavy ? 'heavy_slash' : 'slash', isPlayer ? 'opponent' : 'player', card.cost >= 3 ? '#F59E0B' : '#F43F5E');
    } else if (card.type === 'defend') {
      triggerVFX('shield', isPlayer ? 'player' : 'opponent');
    } else if (card.type === 'skill') {
      triggerVFX('skill_pulse', isPlayer ? 'opponent' : 'player');
    } else if (card.type === 'ultimate') {
      triggerVFX('ultimate_burst', 'screen');
      triggerVFX('heavy_slash', isPlayer ? 'opponent' : 'player', '#F59E0B');
    }

    setState((prev) => {
      let dmg = card.baseDamage || 0;
      let shd = card.baseShield || 0;
      let apRefund = 0;
      const sum = prev.dice[0] + prev.dice[1];

      // Check resonance
      const req = card.diceReq;
      let resonanceMet = false;
      if (req.type === 'any') resonanceMet = true;
      if (req.type === 'min_total' && sum >= req.value) resonanceMet = true;
      if (req.type === 'even' && sum % 2 === 0) resonanceMet = true;
      if (req.type === 'odd' && sum % 2 === 1) resonanceMet = true;
      if (req.type === 'double' && prev.dice[0] === prev.dice[1]) resonanceMet = true;

      if (resonanceMet && prev.hasRolled) {
        if (card.resonanceBonus.bonusDamage) dmg += card.resonanceBonus.bonusDamage;
        if (card.resonanceBonus.bonusShield) shd += card.resonanceBonus.bonusShield;
        if (card.resonanceBonus.bonusAP) apRefund += card.resonanceBonus.bonusAP;

        if (isPlayer && prev.player.equippedRelics.some(r => r.id === 'moe_matrix')) {
          dmg += 4;
        }
      }

      const actingEntity = isPlayer ? prev.player : prev.opponent;
      const targetEntity = isPlayer ? prev.opponent : prev.player;

      let targetShield = targetEntity.shield;
      let targetHp = targetEntity.hp;

      if (dmg > 0) {
        if (card.type === 'ultimate') {
          sound.playUltimate();
          triggerScreenShake();
        } else {
          sound.playHit(dmg > 12);
        }

        if (targetShield >= dmg) {
          targetShield -= dmg;
          showDamageFloater(`-${dmg} Khiên`, '#38BDF8', isPlayer);
        } else {
          const leftover = dmg - targetShield;
          targetShield = 0;
          targetHp = Math.max(0, targetHp - leftover);
          showDamageFloater(`-${leftover} Máu!`, '#F43F5E', isPlayer);
          triggerScreenShake();
        }
      }

      if (shd > 0) {
        sound.playShield();
        showDamageFloater(`+${shd} Khiên`, '#38BDF8', !isPlayer);
      }

      const isWon = isPlayer ? targetHp <= 0 : false;
      const isLost = !isPlayer ? targetHp <= 0 : false;

      if (isWon) sound.playGachaReveal();

      if (isPlayer) {
        const nextHand = prev.player.hand.filter((c) => c.id !== card.id);
        const nextDiscard = [...prev.player.discardPile, card];

        return {
          ...prev,
          isGameOver: isWon,
          winner: isWon ? 'player' : undefined,
          player: {
            ...prev.player,
            ap: prev.player.ap - card.cost + apRefund,
            shield: prev.player.shield + shd,
            hand: nextHand,
            discardPile: nextDiscard,
          },
          opponent: {
            ...prev.opponent,
            hp: targetHp,
            shield: targetShield,
          },
          log: [
            {
              id: `log_${Date.now()}`,
              text: `${prev.player.name} thi triển [${card.name}]${resonanceMet ? ' (Kích hoạt Cộng Hưởng!)' : ''}: Gây ${dmg} sát thương, nhận ${shd} Khiên.`,
              source: 'player',
              timestamp: Date.now(),
            },
            ...prev.log.slice(0, 30),
          ],
        };
      } else {
        return {
          ...prev,
          isGameOver: isLost,
          winner: isLost ? 'opponent' : prev.winner,
          player: {
            ...prev.player,
            hp: targetHp,
            shield: targetShield,
          },
          opponent: {
            ...prev.opponent,
            ap: Math.max(0, prev.opponent.ap - card.cost),
            shield: prev.opponent.shield + shd,
          },
          log: [
            {
              id: `log_${Date.now()}`,
              text: `${prev.opponent.name} thi triển [${card.name}]: Gây ${dmg} sát thương, nhận ${shd} Khiên.`,
              source: 'opponent',
              timestamp: Date.now(),
            },
            ...prev.log.slice(0, 30),
          ],
        };
      }
    });
  };

  // End turn & trigger AI
  const handleEndTurn = () => {
    if (state.activeEntity !== 'player' || state.isGameOver) return;

    sound.playClick();

    // Transition to opponent turn
    setState((prev) => ({
      ...prev,
      activeEntity: 'opponent',
      hasRolled: false,
      rerollsLeft: prev.maxRerolls,
      log: [
        {
          id: `log_${Date.now()}`,
          text: `--- Hiệp kết thúc. Lượt của ${prev.opponent.name} ---`,
          source: 'system',
          timestamp: Date.now(),
        },
        ...prev.log.slice(0, 30),
      ],
    }));
  };

  // AI Turn Routine with deliberate timing scaled by battleSpeed
  useEffect(() => {
    if (state.activeEntity !== 'opponent' || state.isGameOver) return;

    const timer1 = setTimeout(() => {
      // 1. AI Rolls Dice
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      sound.playDiceRoll();

      setState((prev) => ({
        ...prev,
        dice: [d1, d2],
        hasRolled: true,
        opponent: {
          ...prev.opponent,
          ap: prev.opponent.maxAP,
        },
        log: [
          {
            id: `log_${Date.now()}`,
            text: `${prev.opponent.name} tung xúc xắc: [${d1}] và [${d2}]`,
            source: 'opponent',
            timestamp: Date.now(),
          },
          ...prev.log.slice(0, 30),
        ],
      }));

      // 2. AI calculates best moves using Adaptive AI Brain
      const timer2 = setTimeout(() => {
        const decision = aiBrainRef.current.selectBestMoves({
          ...state,
          dice: [d1, d2],
          hasRolled: true,
        });

        // Update AI Telegraph
        setState((prev) => ({
          ...prev,
          aiDecisionTelegraph: decision.tacticalInsight,
        }));

        // Play cards sequentially
        let delay = 0;
        const stepDelay = speedDelay(750);

        decision.cardsToPlay.forEach((card) => {
          setTimeout(() => {
            if (card.type === 'ultimate') {
              pendingUltimateActionRef.current = () => {
                executeCardResolution(card, false);
              };
              setActiveCutsceneChampion(opponentChampionId);
            } else {
              executeCardResolution(card, false);
            }
          }, delay);
          delay += stepDelay;
        });

        // 3. Return turn to player
        setTimeout(() => {
          setState((prev) => {
            let newHand = [...prev.player.hand];
            let newDraw = [...prev.player.drawPile];
            let newDiscard = [...prev.player.discardPile];

            while (newHand.length < 4) {
              if (newDraw.length === 0) {
                if (newDiscard.length === 0) break;
                newDraw = [...newDiscard].sort(() => Math.random() - 0.5);
                newDiscard = [];
              }
              const drawn = newDraw.shift();
              if (drawn) newHand.push(drawn);
            }

            return {
              ...prev,
              turnNumber: prev.turnNumber + 1,
              activeEntity: 'player',
              hasRolled: false,
              rerollsLeft: prev.maxRerolls,
              player: {
                ...prev.player,
                ap: prev.player.maxAP,
                shield: Math.floor(prev.player.shield * 0.5),
                hand: newHand,
                drawPile: newDraw,
                discardPile: newDiscard,
              },
              opponent: {
                ...prev.opponent,
                shield: Math.floor(prev.opponent.shield * 0.5),
              },
              log: [
                {
                  id: `log_${Date.now()}`,
                  text: `=== Hiệp ${prev.turnNumber + 1}: Lượt của ${prev.player.name} ===`,
                  source: 'system',
                  timestamp: Date.now(),
                },
                ...prev.log.slice(0, 30),
              ],
            };
          });
        }, delay + speedDelay(500));
      }, speedDelay(700));

      return () => clearTimeout(timer2);
    }, speedDelay(600));

    return () => clearTimeout(timer1);
  }, [state.activeEntity, state.isGameOver, battleSpeed]);

  const isPlayerTurn = state.activeEntity === 'player';

  return (
    <div
      className={`relative w-full h-full min-h-screen bg-[#070B14] flex flex-col justify-between p-3 md:p-6 overflow-hidden select-none ${
        screenShake ? 'screen-shake' : ''
      }`}
    >
      {/* 4-Second Anime Ultimate Chant Cutscene Overlay */}
      {activeCutsceneChampion && (
        <UltimateCutsceneOverlay
          championId={activeCutsceneChampion}
          onComplete={handleCutsceneComplete}
        />
      )}

      {/* Anime Combat VFX Overlay Layer */}
      <CombatVFXOverlay activeEffects={activeVFX} />

      {/* Background Anime Temple Grid Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Floating Damage Floaters */}
      <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-around">
        {floatingText.map((f) => (
          <div
            key={f.id}
            className="text-2xl font-black font-mono animate-bounce drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]"
            style={{ color: f.color }}
          >
            {f.text}
          </div>
        ))}
      </div>

      {/* Top Zone: Opponent Status HUD + In-Game Menu Button */}
      <div className="relative z-10 flex items-center justify-between p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <AvatarIllustrator
            championId={opponentChampionId}
            emotion={state.opponent.hp < 25 ? 'surprised' : 'serious'}
            size="md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-ancient text-base font-bold text-slate-100">{opponentHero.name}</h3>
              <span className="text-xs text-slate-400 font-serif">· {opponentHero.title}</span>
            </div>

            {/* HP Bar */}
            <div className="flex items-center gap-2 mt-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
              <div className="w-32 sm:w-56 h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300 rounded-full"
                  style={{ width: `${(state.opponent.hp / state.opponent.maxHp) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold tabular-nums text-slate-200">
                {state.opponent.hp}/{state.opponent.maxHp}
              </span>
            </div>
          </div>
        </div>

        {/* Opponent Shields, AP, and Menu Cog Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-sky-950/60 border border-sky-500/40 rounded-xl">
            <Shield className="w-4 h-4 text-sky-400" />
            <span className="text-xs sm:text-sm font-mono font-bold text-sky-200 tabular-nums">
              {state.opponent.shield} Khiên
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/60 border border-amber-500/40 rounded-xl">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-mono font-bold text-amber-200 tabular-nums">
              {state.opponent.ap} AP
            </span>
          </div>

          {/* Settings / Menu Gear Button */}
          <button
            onClick={() => {
              sound.playClick();
              setShowSettingsModal(true);
            }}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 rounded-xl transition-all shadow-md flex items-center justify-center cursor-pointer"
            title="Menu & Cài Đặt Trận Đấu"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mid Zone: Battle Arena Field & Adaptive AI Insights */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between gap-4 my-2">
        {/* Left: Combat Event Log */}
        <div className="w-full md:w-72 h-36 md:h-52 bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5 overflow-y-auto text-xs space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-amber-400 font-ancient border-b border-slate-800 pb-1 mb-1">
            <span className="flex items-center gap-1">
              <Swords className="w-3 h-3" />
              Nhật Ký (Hiệp {state.turnNumber})
            </span>
            <span className="font-mono text-[10px] text-slate-500">
              Tốc độ: {battleSpeed}x
            </span>
          </div>
          {state.log.map((entry) => (
            <p
              key={entry.id}
              className={`leading-relaxed ${
                entry.source === 'player'
                  ? 'text-cyan-300'
                  : entry.source === 'opponent'
                  ? 'text-rose-300'
                  : 'text-slate-400 italic'
              }`}
            >
              {entry.text}
            </p>
          ))}
        </div>

        {/* Center: The Core Dice Roller & Live Turn Indicator */}
        <div className="flex flex-col items-center gap-2">
          {/* Active Turn Banner */}
          <div
            className={`px-4 py-1 rounded-full border text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg ${
              isPlayerTurn
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 animate-pulse'
                : 'bg-rose-950/80 border-rose-500 text-rose-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isPlayerTurn ? 'Lượt của bạn (Khởi Thức Giả)' : `Lượt của ${opponentHero.name}`}
          </div>

          <DiceRoller
            dice={state.dice}
            rerollsLeft={state.rerollsLeft}
            maxRerolls={state.maxRerolls}
            hasRolled={state.hasRolled}
            isPlayerTurn={isPlayerTurn}
            onRoll={handlePlayerRoll}
            onReroll={handlePlayerReroll}
            disabled={state.isGameOver}
          />

          {/* Adaptive AI Brain Insight Pill */}
          <div className="flex items-center gap-2 max-w-md px-3 py-1.5 bg-slate-900/90 border border-amber-500/20 rounded-lg text-[11px] text-amber-200/90 shadow">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="line-clamp-2">{state.aiDecisionTelegraph}</span>
          </div>
        </div>

        {/* Right: End Turn Action */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleEndTurn}
            disabled={!isPlayerTurn || state.isGameOver}
            className="w-36 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-sm rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            Kết Thúc Lượt
          </button>
          <span className="text-[10px] text-slate-500">Giữ 50% Khiên qua hiệp mới</span>
        </div>
      </div>

      {/* Bottom Zone: Player Hand & Player HUD */}
      <div className="relative z-10 flex flex-col gap-2">
        {/* Player Status Strip */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <AvatarIllustrator championId={playerChampionId} emotion="confident" size="sm" />
            <div>
              <span className="font-ancient text-sm font-bold text-slate-100">{playerHero.name}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <div className="w-28 sm:w-44 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all rounded-full"
                    style={{ width: `${(state.player.hp / state.player.maxHp) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold tabular-nums text-slate-300">
                  {state.player.hp}/{state.player.maxHp}
                </span>
              </div>
            </div>
          </div>

          {/* Player Resource Badges */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-sky-950/60 border border-sky-500/40 rounded-lg">
              <Shield className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-mono font-bold text-sky-200 tabular-nums">
                {state.player.shield} Khiên
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400 rounded-lg shadow-[0_0_10px_rgba(245,158,11,0.3)]">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-black text-amber-300 tabular-nums">
                {state.player.ap} AP
              </span>
            </div>
          </div>
        </div>

        {/* Player Hand Cards */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-1 px-2">
          {state.player.hand.map((card) => (
            <CardView
              key={card.id}
              card={card}
              currentDice={state.dice}
              hasRolled={state.hasRolled}
              canAfford={state.player.ap >= card.cost}
              isPlayerTurn={isPlayerTurn}
              onClick={handlePlayCard}
              disabled={state.isGameOver}
            />
          ))}
        </div>
      </div>

      {/* In-Game Settings & Pause Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-slate-900 border-2 border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-400" />
                <h3 className="font-ancient text-base font-bold text-amber-200">
                  Cài Đặt & Tạm Dừng Trận Đấu
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 text-slate-400 hover:text-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 py-1">
              {/* Battle Speed Control */}
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  <span>Tốc Độ Trận Đấu:</span>
                </div>
                <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg">
                  {([1, 1.5, 2] as const).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        sound.playClick();
                        setBattleSpeed(spd);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                        battleSpeed === spd
                          ? 'bg-amber-400 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                  <span>Âm Thanh Trận Đấu:</span>
                </div>
                <button
                  onClick={handleToggleMute}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    isMuted
                      ? 'bg-slate-800 border-slate-700 text-slate-400'
                      : 'bg-amber-500/20 border-amber-400 text-amber-300'
                  }`}
                >
                  {isMuted ? 'Đang Tắt' : 'Đang Bật'}
                </button>
              </div>

              {/* Screen Shake Toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  {enableScreenShake ? <Vibrate className="w-4 h-4 text-rose-400" /> : <VibrateOff className="w-4 h-4 text-slate-500" />}
                  <span>Rung Màn Hình Khi Trúng Đòn:</span>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setEnableScreenShake(!enableScreenShake);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    enableScreenShake
                      ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {enableScreenShake ? 'Bật' : 'Tắt'}
                </button>
              </div>

              {/* Surrender / Exit to Title */}
              {!showSurrenderConfirm ? (
                <button
                  onClick={() => setShowSurrenderConfirm(true)}
                  className="w-full py-2.5 px-4 bg-rose-950/40 hover:bg-rose-950/80 border border-rose-800/60 hover:border-rose-600 text-rose-300 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Đầu Hàng & Rút Lui Khỏi Trận
                </button>
              ) : (
                <div className="p-3 bg-rose-950/70 border border-rose-600 rounded-xl space-y-2 text-center animate-in fade-in">
                  <p className="text-xs text-rose-200 font-medium">
                    Bạn có chắc chắn muốn bỏ cuộc và quay về Sảnh Chính không?
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={onExit}
                      className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg shadow cursor-pointer"
                    >
                      Xác Nhận Thoát
                    </button>
                    <button
                      onClick={() => setShowSurrenderConfirm(false)}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg cursor-pointer"
                    >
                      Hủy Bỏ
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg cursor-pointer"
              >
                Tiếp Tục Trận Đấu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Victory / Defeat Modal */}
      {state.isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="max-w-md w-full bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/60 rounded-2xl p-6 text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
              {state.winner === 'player' ? (
                <Sparkles className="w-8 h-8 text-amber-300 animate-spin" />
              ) : (
                <AlertCircle className="w-8 h-8 text-rose-400" />
              )}
            </div>

            <h2 className="font-ancient text-2xl font-bold text-amber-300">
              {state.winner === 'player' ? 'CHIẾN THẮNG QUANG VINH!' : 'BẠI TRẬN TRÊN BÀN THỜ!'}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              {state.winner === 'player'
                ? `Chúc mừng Khởi Thức Giả! Chiến thuật thẻ bài kết hợp điểm xúc xắc của bạn đã khắc chế hoàn toàn thuật toán của ${opponentHero.name}!`
                : `Thuật toán của ${opponentHero.name} đã bắt bài lối đánh của bạn. Hãy tùy chỉnh Cây Kỹ Năng và thử lại!`}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              {state.winner === 'player' && onVictory && (
                <button
                  onClick={onVictory}
                  className="py-2.5 px-5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  Nhận Thưởng & Tiếp Tục
                </button>
              )}
              {state.winner === 'opponent' && onDefeat && (
                <button
                  onClick={onDefeat}
                  className="py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg border border-slate-700 cursor-pointer"
                >
                  Thử Lại Trận Này
                </button>
              )}
              <button
                onClick={onExit}
                className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800 cursor-pointer"
              >
                Về Sảnh Chính
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
