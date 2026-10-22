import React, { useState } from 'react';
import { Champion, ChampionId, SkillNode } from '../../types/game';
import { CHAMPIONS } from '../../data/champions';
import { AvatarIllustrator } from '../common/AvatarIllustrator';
import { sound } from '../../utils/audio';
import { Zap, Shield, Sparkles, RefreshCw, CheckCircle, ArrowRight, Lock, Award, ArrowLeft } from 'lucide-react';

interface SkillTreeMatrixProps {
  currentChampionId: ChampionId;
  availableSkillPoints: number;
  allocatedSkillIds: string[];
  onToggleSkill: (skillId: string, cost: number) => void;
  onResetSkills: () => void;
  onSelectChampion: (champId: ChampionId) => void;
  onBack: () => void;
}

export const SkillTreeMatrix: React.FC<SkillTreeMatrixProps> = ({
  currentChampionId,
  availableSkillPoints,
  allocatedSkillIds,
  onToggleSkill,
  onResetSkills,
  onSelectChampion,
  onBack,
}) => {
  const champion: Champion = CHAMPIONS[currentChampionId];
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  // Split skills into 3 balanced branches
  const surgeBranch = champion.skillTree.filter((s) => s.branch === 'surge');
  const aegisBranch = champion.skillTree.filter((s) => s.branch === 'aegis');
  const entropyBranch = champion.skillTree.filter((s) => s.branch === 'entropy');

  const handleNodeClick = (node: SkillNode) => {
    sound.playClick();
    setSelectedNode(node);
  };

  const handleLearnSkill = (node: SkillNode) => {
    const isAllocated = allocatedSkillIds.includes(node.id);
    if (!isAllocated && availableSkillPoints < node.cost) return;

    sound.playShield();
    onToggleSkill(node.id, node.cost);
  };

  const branchMeta = {
    surge: {
      name: 'Nhánh Bộc Phá (Surge)',
      color: 'text-rose-400',
      border: 'border-rose-500/40',
      bg: 'bg-rose-950/20',
      advantage: 'Khắc chế Khống Chế Trì Hoãn',
      counteredBy: 'Bị khắc bởi Phản Kích & Khiên Cực Dày',
      icon: <Zap className="w-4 h-4 text-rose-400" />,
    },
    aegis: {
      name: 'Nhánh Kiên Cố (Aegis)',
      color: 'text-sky-400',
      border: 'border-sky-500/40',
      bg: 'bg-sky-950/20',
      advantage: 'Khắc chế Bộc Phá Dồn Sát Thương',
      counteredBy: 'Bị khắc bởi Đốt Máu & Xuyên Giáp',
      icon: <Shield className="w-4 h-4 text-sky-400" />,
    },
    entropy: {
      name: 'Nhánh Hỗn Độn (Entropy)',
      color: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/20',
      advantage: 'Khắc chế Phòng Thủ Cổ Điển',
      counteredBy: 'Bị khắc bởi Sát Thương Nhanh Hiệp Đầu',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    },
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
              Ma Trận Cây Kỹ Năng Đa Hướng
            </h1>
            <p className="text-xs text-slate-400">
              Cơ chế tương khắc tam giác cân bằng tuyệt đối — Không có nhánh nào là mạnh nhất
            </p>
          </div>
        </div>

        {/* Skill Points & Reset Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/15 border border-amber-400/50 rounded-xl">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-300">Điểm Kỹ Năng:</span>
            <span className="text-sm font-mono font-bold text-amber-300 tabular-nums">
              {availableSkillPoints}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onResetSkills();
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Tẩy Điểm Tự Do
          </button>
        </div>
      </div>

      {/* Champion Tabs */}
      <div className="flex items-center gap-2 py-3 overflow-x-auto">
        {Object.values(CHAMPIONS).map((c) => {
          const isSelected = c.id === currentChampionId;
          return (
            <button
              key={c.id}
              onClick={() => {
                sound.playClick();
                onSelectChampion(c.id);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 border transition-all shrink-0 ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <AvatarIllustrator championId={c.id} size="sm" showAura={false} />
              <div className="text-left">
                <span className="font-bold block">{c.name}</span>
                <span className="text-[10px] text-slate-400 line-clamp-1">{c.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Triangle Balance Diagram */}
      <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl my-2 flex flex-col md:flex-row items-center justify-around gap-2 text-xs">
        <div className="flex items-center gap-2 text-rose-400 font-bold">
          <Zap className="w-4 h-4" /> Bộc Phá (Surge)
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden md:block" />
        <span className="text-[11px] text-slate-400">Khắc chế Trì hoãn</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden md:block" />

        <div className="flex items-center gap-2 text-sky-400 font-bold">
          <Shield className="w-4 h-4" /> Kiên Cố (Aegis)
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden md:block" />
        <span className="text-[11px] text-slate-400">Khắc chế Bạo lực</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden md:block" />

        <div className="flex items-center gap-2 text-amber-400 font-bold">
          <Sparkles className="w-4 h-4" /> Hỗn Độn (Entropy)
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden md:block" />
        <span className="text-[11px] text-slate-400">Khắc chế Giáp dày</span>
      </div>

      {/* 3 Main Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2 flex-1">
        {/* Branch 1: Surge */}
        <div className={`p-4 rounded-2xl border ${branchMeta.surge.border} ${branchMeta.surge.bg} flex flex-col justify-between shadow-xl`}>
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-rose-500/20">
              <span className={`font-ancient font-bold text-sm ${branchMeta.surge.color} flex items-center gap-1.5`}>
                {branchMeta.surge.icon} {branchMeta.surge.name}
              </span>
              <span className="text-[10px] text-slate-400">3 Tầng</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2 mb-4 leading-relaxed">
              Tập trung tối đa hóa sát thương và tốc độ dứt điểm nhưng chấp nhận hy sinh máu tối đa hoặc phòng thủ.
            </p>

            <div className="space-y-3">
              {surgeBranch.map((node) => {
                const isLearned = allocatedSkillIds.includes(node.id);
                return (
                  <button
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isLearned
                        ? 'bg-rose-950/80 border-rose-400 text-rose-100 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-rose-500/50 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span>{node.name}</span>
                      <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-slate-800">
                        Tier {node.tier} · {node.cost} Điểm
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{node.description}</p>
                    <p className="text-[10px] text-rose-400 mt-1 font-semibold italic">Đánh đổi: {node.tradeOff}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Branch 2: Aegis */}
        <div className={`p-4 rounded-2xl border ${branchMeta.aegis.border} ${branchMeta.aegis.bg} flex flex-col justify-between shadow-xl`}>
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-sky-500/20">
              <span className={`font-ancient font-bold text-sm ${branchMeta.aegis.color} flex items-center gap-1.5`}>
                {branchMeta.aegis.icon} {branchMeta.aegis.name}
              </span>
              <span className="text-[10px] text-slate-400">3 Tầng</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2 mb-4 leading-relaxed">
              Xây dựng pháo đài phòng thủ và hồi phục bất hoại nhưng chịu thiệt thòi về sát thương cơ bản của thẻ bài.
            </p>

            <div className="space-y-3">
              {aegisBranch.map((node) => {
                const isLearned = allocatedSkillIds.includes(node.id);
                return (
                  <button
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isLearned
                        ? 'bg-sky-950/80 border-sky-400 text-sky-100 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-sky-500/50 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span>{node.name}</span>
                      <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-slate-800">
                        Tier {node.tier} · {node.cost} Điểm
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{node.description}</p>
                    <p className="text-[10px] text-sky-300 mt-1 font-semibold italic">Đánh đổi: {node.tradeOff}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Branch 3: Entropy */}
        <div className={`p-4 rounded-2xl border ${branchMeta.entropy.border} ${branchMeta.entropy.bg} flex flex-col justify-between shadow-xl`}>
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
              <span className={`font-ancient font-bold text-sm ${branchMeta.entropy.color} flex items-center gap-1.5`}>
                {branchMeta.entropy.icon} {branchMeta.entropy.name}
              </span>
              <span className="text-[10px] text-slate-400">3 Tầng</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2 mb-4 leading-relaxed">
              Thao túng xác suất xúc xắc và bào mòn tài nguyên đối thủ nhưng đối mặt với rủi ro phản phệ nếu tính toán sai.
            </p>

            <div className="space-y-3">
              {entropyBranch.map((node) => {
                const isLearned = allocatedSkillIds.includes(node.id);
                return (
                  <button
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isLearned
                        ? 'bg-amber-950/80 border-amber-400 text-amber-100 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/50 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span>{node.name}</span>
                      <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-slate-800">
                        Tier {node.tier} · {node.cost} Điểm
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{node.description}</p>
                    <p className="text-[10px] text-amber-400 mt-1 font-semibold italic">Đánh đổi: {node.tradeOff}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Details Drawer / Modal */}
      {selectedNode && (
        <div className="p-4 bg-slate-900 border border-slate-700 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-ancient text-base font-bold text-amber-200">{selectedNode.name}</h4>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-slate-300">
                Chi phí: {selectedNode.cost} Điểm
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{selectedNode.description}</p>
            <p className="text-xs text-rose-400 font-semibold mt-0.5">
              ⚠️ Điểm yếu / Đánh đổi: {selectedNode.tradeOff}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {allocatedSkillIds.includes(selectedNode.id) ? (
              <button
                onClick={() => handleLearnSkill(selectedNode)}
                className="px-4 py-2 bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                Hủy Kích Hoạt
              </button>
            ) : (
              <button
                onClick={() => handleLearnSkill(selectedNode)}
                disabled={availableSkillPoints < selectedNode.cost}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                Mở Khóa Kỹ Năng
              </button>
            )}
            <button
              onClick={() => setSelectedNode(null)}
              className="px-3 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
