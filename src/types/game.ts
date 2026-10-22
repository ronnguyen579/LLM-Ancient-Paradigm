/**
 * Core Type Definitions for LLM: Ancient Paradigm
 */

export type ChampionId = 'gemini' | 'chatgpt' | 'claude' | 'grok' | 'deepseek';

export type CardType = 'strike' | 'defend' | 'skill' | 'ultimate';

export type DiceCondition = 
  | { type: 'any' }
  | { type: 'min_total'; value: number }
  | { type: 'even' }
  | { type: 'odd' }
  | { type: 'double' }
  | { type: 'exact_single'; value: number };

export interface Card {
  id: string;
  name: string;
  cost: number; // AP cost
  type: CardType;
  description: string;
  baseDamage?: number;
  baseShield?: number;
  diceReq: DiceCondition;
  resonanceBonus: {
    text: string;
    bonusDamage?: number;
    bonusShield?: number;
    bonusAP?: number;
    applyStatus?: {
      target: 'self' | 'opponent';
      type: StatusType;
      duration: number;
      value: number;
    };
  };
}

export type StatusType = 
  | 'burn' // Entropy damage over time
  | 'shield_break' // Vulnerability to next attacks
  | 'focus' // Next dice roll +1 to both dice
  | 'reasoning' // Stored bonus damage released next turn
  | 'aegis' // Mitigate 50% damage
  | 'entropy'; // Grok's chaotic modifier

export interface StatusEffect {
  type: StatusType;
  duration: number;
  value: number;
}

export interface SkillNode {
  id: string;
  name: string;
  branch: 'surge' | 'aegis' | 'entropy'; // The 3 balanced branches
  tier: 1 | 2 | 3;
  cost: number;
  description: string;
  tradeOff: string; // The opportunity cost / weakness
  unlocked: boolean;
  modifier: {
    stat?: 'hp' | 'ap' | 'shield';
    statDelta?: number;
    diceBonus?: 'even' | 'odd' | 'rerolls';
    passiveEffect?: string;
  };
}

export type RelicRarity = 'rare' | 'epic' | 'mythic';

export interface Relic {
  id: string;
  name: string;
  rarity: RelicRarity;
  ancientTitle: string;
  lore: string;
  description: string;
  trigger: 'on_turn_start' | 'on_dice_double' | 'on_low_hp' | 'on_card_play' | 'on_resonance';
  effectValue: number;
  iconName: string;
}

export interface Champion {
  id: ChampionId;
  name: string;
  title: string;
  element: string;
  accentColor: string;
  glowColor: string;
  baseMaxHp: number;
  baseAP: number;
  passiveDesc: string;
  deck: Card[];
  skillTree: SkillNode[];
}

export interface CombatEntity {
  championId: ChampionId;
  name: string;
  hp: number;
  maxHp: number;
  shield: number;
  ap: number;
  maxAP: number;
  hand: Card[];
  drawPile: Card[];
  discardPile: Card[];
  statuses: StatusEffect[];
  equippedRelics: Relic[];
  allocatedSkills: string[];
}

export interface CombatState {
  turnNumber: number;
  activeEntity: 'player' | 'opponent';
  player: CombatEntity;
  opponent: CombatEntity;
  dice: [number, number];
  rerollsLeft: number;
  maxRerolls: number;
  hasRolled: boolean;
  log: Array<{ id: string; text: string; source: 'player' | 'opponent' | 'system'; timestamp: number }>;
  isGameOver: boolean;
  winner?: 'player' | 'opponent';
  aiDecisionTelegraph?: string;
}

export type GameView = 
  | 'TITLE'
  | 'STORY'
  | 'ARENA'
  | 'SKILL_TREE'
  | 'GACHA'
  | 'MULTIPLAYER'
  | 'LORE_CODEX';

export interface DialogueChoice {
  text: string;
  nextSceneId: string;
  rewardSkillPoints?: number;
  grantBonusAP?: boolean;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  speakerTitle: string;
  speakerId: ChampionId | 'prompter' | 'elder';
  emotion?: 'neutral' | 'confident' | 'surprised' | 'serious' | 'mysterious';
  dialogue: string;
  choices?: DialogueChoice[];
  nextSceneId?: string;
  triggerBattle?: {
    opponentId: ChampionId;
    dialogueWinSceneId: string;
  };
}

export interface StoryChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  startingSceneId: string;
  scenes: Record<string, DialogueNode>;
}

export interface MultiplayerRoom {
  code: string;
  hostName: string;
  guestName?: string;
  hostChampion: ChampionId;
  guestChampion?: ChampionId;
  status: 'waiting' | 'ready' | 'in_battle';
  isLocalHotseat: boolean;
  currentTurn: 'host' | 'guest';
}
