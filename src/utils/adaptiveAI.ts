import { Card, CombatEntity, CombatState } from '../types/game';

export interface PlayerPlaystyleTracker {
  attacksPlayed: number;
  defendsPlayed: number;
  skillsPlayed: number;
  ultimatesPlayed: number;
  rerollsUsed: number;
  highShieldTurns: number;
  consecutiveAttacks: number;
}

export type PlaystyleType = 
  | 'AGGRESSIVE_BURST'
  | 'TURTLE_DEFENSE'
  | 'DICE_GAMBLER'
  | 'BALANCED_MASTER';

export class AdaptiveAIBrain {
  private tracker: PlayerPlaystyleTracker = {
    attacksPlayed: 0,
    defendsPlayed: 0,
    skillsPlayed: 0,
    ultimatesPlayed: 0,
    rerollsUsed: 0,
    highShieldTurns: 0,
    consecutiveAttacks: 0,
  };

  public recordPlayerMove(card: Card, currentShield: number) {
    if (card.type === 'strike') {
      this.tracker.attacksPlayed++;
      this.tracker.consecutiveAttacks++;
    } else {
      this.tracker.consecutiveAttacks = 0;
    }
    if (card.type === 'defend') this.tracker.defendsPlayed++;
    if (card.type === 'skill') this.tracker.skillsPlayed++;
    if (card.type === 'ultimate') this.tracker.ultimatesPlayed++;
    if (currentShield >= 15) this.tracker.highShieldTurns++;
  }

  public recordPlayerReroll() {
    this.tracker.rerollsUsed++;
  }

  public getInferredPlaystyle(): { type: PlaystyleType; reason: string } {
    const total = this.tracker.attacksPlayed + this.tracker.defendsPlayed + this.tracker.skillsPlayed;
    if (total < 2) {
      return {
        type: 'BALANCED_MASTER',
        reason: 'Đang theo dõi bước đi đầu tiên của đối thủ...'
      };
    }

    const attackRatio = this.tracker.attacksPlayed / total;
    const defendRatio = this.tracker.defendsPlayed / total;

    if (this.tracker.highShieldTurns >= 2 || defendRatio > 0.5) {
      return {
        type: 'TURTLE_DEFENSE',
        reason: 'Phát hiện đối thủ phòng thủ kiên cố (Turtle). AI chuyển hướng sang chiêu Xuyên Giáp và Rút Máu dần!'
      };
    }

    if (attackRatio > 0.55 || this.tracker.consecutiveAttacks >= 2) {
      return {
        type: 'AGGRESSIVE_BURST',
        reason: 'Phát hiện đối thủ áp sát dồn dập (Aggro). AI ưu tiên dựng Khiên Phản Đòn và hấp thụ sát thương!'
      };
    }

    if (this.tracker.rerollsUsed >= 3) {
      return {
        type: 'DICE_GAMBLER',
        reason: 'Phát hiện đối thủ phụ thuộc vào xúc xắc bạo kích. AI kích hoạt kỹ năng khống chế xác suất!'
      };
    }

    return {
      type: 'BALANCED_MASTER',
      reason: 'Đối thủ triển khai chiến thuật đa dạng. AI kích hoạt phân bổ đồng đều giữa Công và Thủ.'
    };
  }

  /**
   * Decide which cards the AI should play given the current combat state
   */
  public selectBestMoves(state: CombatState): {
    cardsToPlay: Card[];
    shouldRerollDice: boolean;
    tacticalInsight: string;
  } {
    const ai = state.opponent;
    const player = state.player;
    const dice = state.dice;
    const diceSum = dice[0] + dice[1];
    const { type: playstyle, reason } = this.getInferredPlaystyle();

    // Check if reroll is advantageous
    let shouldReroll = false;
    if (state.rerollsLeft > 0 && diceSum < 6) {
      shouldReroll = true;
    }

    let remainingAP = ai.ap;
    const cardsToPlay: Card[] = [];

    // Filter cards currently playable with available AP
    const availableCards = [...ai.hand].sort((a, b) => b.cost - a.cost);

    for (const card of availableCards) {
      if (card.cost > remainingAP) continue;

      let score = 10;

      // Card priority evaluation based on current battle context & learned playstyle
      if (card.type === 'ultimate' && remainingAP >= card.cost) {
        score += 30; // High value on ultimates
      }

      if (playstyle === 'TURTLE_DEFENSE') {
        // Favor cards with piercing damage or high resonance strike
        if (card.type === 'strike' && (card.description.includes('Xuyên Giáp') || card.resonanceBonus.bonusDamage)) {
          score += 25;
        }
        if (card.type === 'defend') {
          score -= 5;
        }
      } else if (playstyle === 'AGGRESSIVE_BURST') {
        // Prioritize defensive counters and healing
        if (card.type === 'defend' || card.baseShield) {
          score += 25;
        }
        if (player.hp < 15 && card.type === 'strike') {
          score += 40; // Finish off low HP aggressive player
        }
      } else if (playstyle === 'DICE_GAMBLER') {
        // Prioritize skills that disrupt or debuff
        if (card.type === 'skill') {
          score += 18;
        }
      }

      // Check resonance feasibility with current dice
      const resonanceMet = this.checkResonance(card, dice);
      if (resonanceMet) {
        score += 15; // Prioritize cards that achieve their resonance trigger!
      }

      if (score >= 10) {
        cardsToPlay.push(card);
        remainingAP -= card.cost;
      }
    }

    return {
      cardsToPlay,
      shouldRerollDice: shouldReroll,
      tacticalInsight: reason
    };
  }

  private checkResonance(card: Card, dice: [number, number]): boolean {
    const sum = dice[0] + dice[1];
    const req = card.diceReq;
    if (req.type === 'any') return true;
    if (req.type === 'min_total') return sum >= req.value;
    if (req.type === 'even') return sum % 2 === 0;
    if (req.type === 'odd') return sum % 2 === 1;
    if (req.type === 'double') return dice[0] === dice[1];
    if (req.type === 'exact_single') return dice[0] === req.value || dice[1] === req.value;
    return false;
  }
}
