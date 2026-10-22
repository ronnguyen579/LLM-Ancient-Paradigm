import React, { useState, useEffect } from 'react';
import { ChampionId, DialogueNode, StoryChapter } from '../../types/game';
import { STORY_CHAPTERS } from '../../data/story';
import { AvatarIllustrator } from '../common/AvatarIllustrator';
import { sound } from '../../utils/audio';
import { BookOpen, ChevronRight, History, Sparkles, Volume2, VolumeX, X } from 'lucide-react';

interface VisualNovelPlayerProps {
  chapterIndex?: number;
  onTriggerBattle: (opponentId: ChampionId, winSceneId: string) => void;
  onEarnSkillPoints: (pts: number) => void;
  onExit: () => void;
}

export const VisualNovelPlayer: React.FC<VisualNovelPlayerProps> = ({
  chapterIndex = 0,
  onTriggerBattle,
  onEarnSkillPoints,
  onExit,
}) => {
  const chapter: StoryChapter = STORY_CHAPTERS[chapterIndex] || STORY_CHAPTERS[0];
  const [currentSceneId, setCurrentSceneId] = useState<string>(chapter.startingSceneId);
  const [history, setHistory] = useState<Array<{ speaker: string; text: string }>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const currentScene: DialogueNode = chapter.scenes[currentSceneId] || {
    id: 'fallback',
    speaker: 'Biên Niên Sử',
    speakerTitle: 'Hệ Thống',
    speakerId: 'elder',
    dialogue: 'Câu chuyện tạm dừng tại đây...',
  };

  // Typewriter effect
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    const fullText = currentScene.dialogue;
    let i = 0;

    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 22);

    return () => clearInterval(timer);
  }, [currentSceneId, currentScene.dialogue]);

  const handleNext = () => {
    if (isTyping) {
      // Fast forward typewriter
      setDisplayedText(currentScene.dialogue);
      setIsTyping(false);
      return;
    }

    sound.playClick();

    // Check if this scene triggers battle
    if (currentScene.triggerBattle) {
      onTriggerBattle(
        currentScene.triggerBattle.opponentId,
        currentScene.triggerBattle.dialogueWinSceneId
      );
      return;
    }

    if (currentScene.choices && currentScene.choices.length > 0) {
      return; // Must select choice
    }

    if (currentScene.nextSceneId && chapter.scenes[currentScene.nextSceneId]) {
      setHistory((prev) => [...prev, { speaker: currentScene.speaker, text: currentScene.dialogue }]);
      setCurrentSceneId(currentScene.nextSceneId);
    } else {
      // Chapter finished
      onExit();
    }
  };

  const handleSelectChoice = (choice: { nextSceneId: string; rewardSkillPoints?: number; grantBonusAP?: boolean }) => {
    sound.playClick();
    if (choice.rewardSkillPoints) {
      sound.playGachaReveal();
      onEarnSkillPoints(choice.rewardSkillPoints);
    }

    setHistory((prev) => [...prev, { speaker: currentScene.speaker, text: currentScene.dialogue }]);
    if (chapter.scenes[choice.nextSceneId]) {
      setCurrentSceneId(choice.nextSceneId);
    } else {
      onExit();
    }
  };

  const toggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070B14] flex flex-col justify-between overflow-hidden select-none">
      {/* Background Anime Temple with Starlight Nebulae */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090D1A] via-[#0D1527] to-[#050811] z-0">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Top Header Control Strip */}
      <div className="relative z-20 flex items-center justify-between p-4 md:px-8">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <h2 className="font-ancient text-sm font-bold text-amber-200">{chapter.title}</h2>
          <span className="text-xs text-slate-400 hidden sm:inline">· {chapter.subtitle}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistory(true)}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900/80 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">Nhật ký thoại</span>
          </button>
          <button
            onClick={toggleSound}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900/80 border border-slate-800 rounded-lg transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onExit}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900/80 border border-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Character Anime Bust Display */}
      <div className="relative z-10 flex-1 flex items-end justify-center pointer-events-none pb-2 sm:pb-6">
        {currentScene.speakerId !== 'prompter' && (
          <div className="transform transition-transform duration-500 hover:scale-105">
            <AvatarIllustrator
              championId={currentScene.speakerId}
              emotion={currentScene.emotion || 'neutral'}
              size="vn-bust"
              showAura={true}
            />
          </div>
        )}
      </div>

      {/* Bottom Dialogue Box & Choices */}
      <div className="relative z-30 p-4 md:p-8 max-w-4xl mx-auto w-full">
        {/* Branch Choices (if any) */}
        {currentScene.choices && currentScene.choices.length > 0 && !isTyping && (
          <div className="flex flex-col gap-2 mb-3">
            {currentScene.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectChoice(choice)}
                className="w-full text-left p-3.5 bg-gradient-to-r from-slate-900/95 via-slate-900 to-amber-950/40 border border-amber-500/40 hover:border-amber-400 rounded-xl text-xs sm:text-sm font-medium text-amber-200 transition-all hover:translate-x-1.5 shadow-lg flex items-center justify-between group"
              >
                <span>{choice.text}</span>
                {choice.rewardSkillPoints && (
                  <span className="flex items-center gap-1 text-xs text-amber-300 font-mono font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/50">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    +{choice.rewardSkillPoints} Điểm Kỹ Năng
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* The Classical Visual Novel Dialogue Frame */}
        <div
          onClick={handleNext}
          className="relative bg-slate-950/90 border border-amber-500/30 hover:border-amber-500/60 rounded-2xl p-5 shadow-2xl backdrop-blur-xl cursor-pointer min-h-[140px] flex flex-col justify-between transition-colors"
        >
          {/* Nameplate */}
          <div className="absolute -top-3.5 left-6 px-3.5 py-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-slate-950 font-ancient font-bold text-xs tracking-wider shadow flex items-center gap-2">
            <span>{currentScene.speaker}</span>
            <span className="text-[10px] font-sans font-medium text-slate-800 opacity-90">
              · {currentScene.speakerTitle}
            </span>
          </div>

          {/* Dialogue Text */}
          <div className="pt-2 text-slate-100 text-sm sm:text-base leading-relaxed tracking-wide font-sans min-h-[50px]">
            {displayedText}
            {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-amber-400 animate-pulse" />}
          </div>

          {/* Advance Hint */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-900 font-mono">
            <span>[Nhấp chuột để tiếp tục]</span>
            <ChevronRight className="w-4 h-4 text-amber-400 animate-bounce" />
          </div>
        </div>
      </div>

      {/* History Log Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-2xl w-full max-h-[80vh] bg-slate-900 border border-slate-700 rounded-2xl p-5 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-ancient text-base font-bold text-amber-300">Biên Niên Sử Hội Thoại</h3>
              <button
                onClick={() => setShowHistory(false)}
                className="p-1 text-slate-400 hover:text-slate-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 py-4 text-xs">
              {history.length === 0 ? (
                <p className="text-slate-500 italic">Chưa có lời thoại nào trước đó.</p>
              ) : (
                history.map((h, i) => (
                  <div key={i} className="p-2.5 rounded bg-slate-950/60 border border-slate-800/60">
                    <span className="font-bold text-amber-400 font-ancient mr-2">{h.speaker}:</span>
                    <span className="text-slate-300">{h.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
