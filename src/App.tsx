/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChampionId, GameView, MultiplayerRoom, Relic } from './types/game';
import { ANCIENT_RELICS } from './data/relics';
import { GameShell } from './components/shell/GameShell';
import { BattleArena } from './components/battle/BattleArena';
import { VisualNovelPlayer } from './components/story/VisualNovelPlayer';
import { SkillTreeMatrix } from './components/skilltree/SkillTreeMatrix';
import { GachaSanctum } from './components/gacha/GachaSanctum';
import { MultiplayerLobby } from './components/multiplayer/MultiplayerLobby';
import { LoreCodex } from './components/codex/LoreCodex';
import { sound } from './utils/audio';

export default function App() {
  const [currentView, setCurrentView] = useState<GameView>('TITLE');

  // Player Progression State
  const [truthPrisms, setTruthPrisms] = useState<number>(600); // Currency for Gacha
  const [availableSkillPoints, setAvailableSkillPoints] = useState<number>(4);
  const [unlockedRelics, setUnlockedRelics] = useState<Relic[]>([
    ANCIENT_RELICS[0], // Transformer scroll
    ANCIENT_RELICS[1], // Attention lens
    ANCIENT_RELICS[6], // Flash rune
  ]);
  const [equippedRelics, setEquippedRelics] = useState<Relic[]>([
    ANCIENT_RELICS[0],
    ANCIENT_RELICS[1],
  ]);

  // Selected Champion & Skills
  const [currentChampionId, setCurrentChampionId] = useState<ChampionId>('gemini');
  const [allocatedSkillIds, setAllocatedSkillIds] = useState<string[]>([]);

  // Battle State Config
  const [opponentChampionId, setOpponentChampionId] = useState<ChampionId>('claude');
  const [storyChapterIndex, setStoryChapterIndex] = useState<number>(0);
  const [storyReturnScene, setStoryReturnScene] = useState<string | null>(null);

  // Skill Matrix Handlers
  const handleToggleSkill = (skillId: string, cost: number) => {
    if (allocatedSkillIds.includes(skillId)) {
      setAllocatedSkillIds((prev) => prev.filter((id) => id !== skillId));
      setAvailableSkillPoints((prev) => prev + cost);
    } else {
      if (availableSkillPoints >= cost) {
        setAllocatedSkillIds((prev) => [...prev, skillId]);
        setAvailableSkillPoints((prev) => prev - cost);
      }
    }
  };

  const handleResetSkills = () => {
    // Calculate refunded points
    setAllocatedSkillIds([]);
    setAvailableSkillPoints((prev) => prev + allocatedSkillIds.length * 2);
  };

  // Gacha Handlers
  const handleSummonSuccess = (newRelics: Relic[], cost: number) => {
    setTruthPrisms((prev) => Math.max(0, prev - cost));
    setUnlockedRelics((prev) => {
      const merged = [...prev];
      newRelics.forEach((r) => {
        if (!merged.some((existing) => existing.id === r.id)) {
          merged.push(r);
        }
      });
      return merged;
    });
  };

  const handleToggleEquipRelic = (relic: Relic) => {
    sound.playClick();
    setEquippedRelics((prev) => {
      if (prev.some((r) => r.id === relic.id)) {
        return prev.filter((r) => r.id !== relic.id);
      }
      if (prev.length >= 3) {
        // Replace first relic
        return [...prev.slice(1), relic];
      }
      return [...prev, relic];
    });
  };

  // Quick Arena Battle vs Random Opponent
  const handleQuickBattle = (selectedOpponent?: ChampionId) => {
    const pool: ChampionId[] = ['gemini', 'chatgpt', 'claude', 'grok', 'deepseek'];
    const candidates = pool.filter((id) => id !== currentChampionId);
    const opponent = selectedOpponent || candidates[Math.floor(Math.random() * candidates.length)];
    setOpponentChampionId(opponent);
    setCurrentView('ARENA');
  };

  // Story Trigger Battle
  const handleStoryTriggerBattle = (oppId: ChampionId, winSceneId: string) => {
    setOpponentChampionId(oppId);
    setStoryReturnScene(winSceneId);
    setCurrentView('ARENA');
  };

  // Multiplayer Match Start
  const handleStartMultiplayerMatch = (room: MultiplayerRoom) => {
    setCurrentChampionId(room.hostChampion);
    setOpponentChampionId(room.guestChampion || 'deepseek');
    setCurrentView('ARENA');
  };

  // Battle Result Handlers
  const handleBattleVictory = () => {
    // Reward Truth Prisms & Skill Points
    setTruthPrisms((prev) => prev + 250);
    setAvailableSkillPoints((prev) => prev + 1);

    if (storyReturnScene) {
      // Return to story mode
      setStoryReturnScene(null);
      setCurrentView('STORY');
    } else {
      setCurrentView('TITLE');
    }
  };

  const handleBattleDefeat = () => {
    // Allow retry or return
    setCurrentView('TITLE');
  };

  return (
    <div className="w-full min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans select-none">
      {/* 1. Title Screen & Game Shell */}
      {currentView === 'TITLE' && (
        <GameShell
          truthPrisms={truthPrisms}
          availableSkillPoints={availableSkillPoints}
          playerRelics={equippedRelics}
          currentChampionId={currentChampionId}
          onNavigate={(view) => setCurrentView(view)}
          onSelectChampion={(champId) => setCurrentChampionId(champId)}
          onQuickBattle={() => handleQuickBattle()}
        />
      )}

      {/* 2. Visual Novel Story Mode */}
      {currentView === 'STORY' && (
        <VisualNovelPlayer
          chapterIndex={storyChapterIndex}
          onTriggerBattle={handleStoryTriggerBattle}
          onEarnSkillPoints={(pts) => setAvailableSkillPoints((p) => p + pts)}
          onExit={() => setCurrentView('TITLE')}
        />
      )}

      {/* 3. Tactical Card & Dice Battle Arena */}
      {currentView === 'ARENA' && (
        <BattleArena
          playerChampionId={currentChampionId}
          opponentChampionId={opponentChampionId}
          playerRelics={equippedRelics}
          allocatedSkills={allocatedSkillIds}
          onVictory={handleBattleVictory}
          onDefeat={handleBattleDefeat}
          onExit={() => {
            sound.playClick();
            setCurrentView('TITLE');
          }}
        />
      )}

      {/* 4. Multi-branch Skill Tree Matrix */}
      {currentView === 'SKILL_TREE' && (
        <SkillTreeMatrix
          currentChampionId={currentChampionId}
          availableSkillPoints={availableSkillPoints}
          allocatedSkillIds={allocatedSkillIds}
          onToggleSkill={handleToggleSkill}
          onResetSkills={handleResetSkills}
          onSelectChampion={(id) => setCurrentChampionId(id)}
          onBack={() => setCurrentView('TITLE')}
        />
      )}

      {/* 5. Gacha Relic Sanctum */}
      {currentView === 'GACHA' && (
        <GachaSanctum
          truthPrisms={truthPrisms}
          unlockedRelics={unlockedRelics}
          equippedRelics={equippedRelics}
          onSummonSuccess={handleSummonSuccess}
          onToggleEquipRelic={handleToggleEquipRelic}
          onBack={() => setCurrentView('TITLE')}
        />
      )}

      {/* 6. Multiplayer Online & LAN Lobby */}
      {currentView === 'MULTIPLAYER' && (
        <MultiplayerLobby
          onStartMatch={handleStartMultiplayerMatch}
          onBack={() => setCurrentView('TITLE')}
        />
      )}

      {/* 7. Lore Codex & Champion Showcase */}
      {currentView === 'LORE_CODEX' && (
        <LoreCodex
          onSelectForBattle={(champId) => {
            setCurrentChampionId(champId);
            handleQuickBattle();
          }}
          onBack={() => setCurrentView('TITLE')}
        />
      )}
    </div>
  );
}
