import React, { useState } from 'react';
import { ChampionId, MultiplayerRoom } from '../../types/game';
import { CHAMPIONS } from '../../data/champions';
import { AvatarIllustrator } from '../common/AvatarIllustrator';
import { sound } from '../../utils/audio';
import { Users, Wifi, Globe, Play, ArrowLeft, Copy, Check, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

interface MultiplayerLobbyProps {
  onStartMatch: (room: MultiplayerRoom) => void;
  onBack: () => void;
}

export const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({
  onStartMatch,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'online' | 'local'>('online');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [activeRoom, setActiveRoom] = useState<MultiplayerRoom | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Selections
  const [hostChampion, setHostChampion] = useState<ChampionId>('gemini');
  const [guestChampion, setGuestChampion] = useState<ChampionId>('chatgpt');
  const [playerName, setPlayerName] = useState('Khởi Thức Giả 1');
  const [guestName, setGuestName] = useState('Khởi Thức Giả 2');

  const handleCreateOnlineRoom = () => {
    sound.playClick();
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const newRoom: MultiplayerRoom = {
      code,
      hostName: playerName,
      hostChampion,
      status: 'waiting',
      isLocalHotseat: false,
      currentTurn: 'host',
    };

    setActiveRoom(newRoom);
  };

  const handleJoinOnlineRoom = () => {
    if (!roomCodeInput.trim()) return;
    sound.playClick();

    const joinedRoom: MultiplayerRoom = {
      code: roomCodeInput.trim().toUpperCase(),
      hostName: 'Chủ Phòng',
      guestName: guestName,
      hostChampion: 'claude',
      guestChampion: hostChampion,
      status: 'ready',
      isLocalHotseat: false,
      currentTurn: 'host',
    };

    setActiveRoom(joinedRoom);
  };

  const handleStartLocalMatch = () => {
    sound.playClick();
    const localRoom: MultiplayerRoom = {
      code: 'LOCAL',
      hostName: playerName,
      guestName: guestName,
      hostChampion,
      guestChampion,
      status: 'in_battle',
      isLocalHotseat: true,
      currentTurn: 'host',
    };

    onStartMatch(localRoom);
  };

  const handleCopyCode = () => {
    if (!activeRoom) return;
    navigator.clipboard.writeText(activeRoom.code);
    setCopiedCode(true);
    sound.playClick();
    setTimeout(() => setCopiedCode(false), 2000);
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
              Đấu Trường Trực Tuyến & Giải Đấu (LAN / Internet)
            </h1>
            <p className="text-xs text-slate-400">
              Kết nối phòng đấu bằng mã phòng 4 ký tự hoặc thi đấu đối kháng trực tiếp trên cùng máy
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('online');
              setActiveRoom(null);
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'online'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Đấu Mạng (Mã Phòng)
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('local');
              setActiveRoom(null);
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'local'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Đấu Cục Bộ (Hotseat)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 my-6 flex flex-col items-center justify-center">
        {activeTab === 'online' ? (
          activeRoom ? (
            /* Room Waiting Screen */
            <div className="max-w-lg w-full bg-slate-900/90 border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                <Wifi className="w-6 h-6 text-amber-300 animate-pulse" />
              </div>

              <h3 className="font-ancient text-lg font-bold text-amber-200">
                Phòng Đấu Trực Tuyến: <span className="font-mono text-2xl tracking-widest text-white">{activeRoom.code}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Gửi mã phòng này cho bạn bè qua LAN hoặc mạng internet để vào phòng giác đấu!
              </p>

              <button
                onClick={handleCopyCode}
                className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors inline-flex items-center gap-2"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? 'Đã sao chép mã phòng!' : 'Sao chép mã phòng'}
              </button>

              <div className="grid grid-cols-2 gap-4 my-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-amber-400 font-bold uppercase mb-1">Người Tạo Phòng</span>
                  <AvatarIllustrator championId={activeRoom.hostChampion} size="md" />
                  <span className="text-xs font-bold text-slate-200 mt-2">{activeRoom.hostName}</span>
                  <span className="text-[10px] text-slate-400 font-serif">
                    {CHAMPIONS[activeRoom.hostChampion].title}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">Đối Thủ (Khách)</span>
                  {activeRoom.guestName ? (
                    <>
                      <AvatarIllustrator championId={activeRoom.guestChampion || 'deepseek'} size="md" />
                      <span className="text-xs font-bold text-slate-200 mt-2">{activeRoom.guestName}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Đã sẵn sàng!</span>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-24 text-slate-600 italic text-xs">
                      <div className="w-6 h-6 border-2 border-slate-600 border-t-amber-400 rounded-full animate-spin mb-2" />
                      Đang đợi bạn bè tham gia...
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => onStartMatch(activeRoom)}
                  className="py-2.5 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  Bắt Đầu Trận Đấu
                </button>
                <button
                  onClick={() => setActiveRoom(null)}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
                >
                  Hủy Phòng
                </button>
              </div>
            </div>
          ) : (
            /* Create / Join Online Room Forms */
            <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Create Room */}
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-amber-400" />
                    <h3 className="font-ancient text-base font-bold text-amber-200">Tạo Phòng Mới</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    Khởi tạo phòng đấu chuyên nghiệp với luật giải đấu, chia sẻ mã phòng 4 ký tự để giao lưu.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Tên Người Chơi:</label>
                      <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Chọn Thực Thể LLM:</label>
                      <select
                        value={hostChampion}
                        onChange={(e) => setHostChampion(e.target.value as ChampionId)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-medium"
                      >
                        {Object.values(CHAMPIONS).map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} - {c.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCreateOnlineRoom}
                  className="mt-6 w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  Tạo Phòng & Nhận Mã
                </button>
              </div>

              {/* Box 2: Join Room */}
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Wifi className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-ancient text-base font-bold text-cyan-200">Tham Gia Bằng Mã</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    Nhập mã phòng 4 ký tự từ bạn bè để kết nối trực tiếp vào phòng chờ.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Nhập Mã Phòng (4 Chữ Cái):</label>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="VD: CORE"
                        value={roomCodeInput}
                        onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-center font-mono font-bold tracking-widest text-amber-300 focus:outline-none focus:border-cyan-400 uppercase"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Tên Của Bạn:</label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleJoinOnlineRoom}
                  disabled={!roomCodeInput.trim()}
                  className="mt-6 w-full py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 hover:border-cyan-400 text-slate-100 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Wifi className="w-4 h-4 text-cyan-400" />
                  Vào Phòng Giác Đấu
                </button>
              </div>
            </div>
          )
        ) : (
          /* Local Hotseat Duel Form */
          <div className="max-w-xl w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="font-ancient text-lg font-bold text-amber-200">
                Đấu Cục Bộ Hai Người (Local Hotseat Duel)
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Hai người chơi cùng điều khiển trên một máy tính hoặc điện thoại theo từng lượt đấu, thỏa sức thử nghiệm đội hình và kỹ năng.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
              {/* Player 1 setup */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-cyan-400 uppercase">Người Chơi 1</span>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                />
                <select
                  value={hostChampion}
                  onChange={(e) => setHostChampion(e.target.value as ChampionId)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                >
                  {Object.values(CHAMPIONS).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-center pt-2">
                  <AvatarIllustrator championId={hostChampion} size="md" />
                </div>
              </div>

              {/* Player 2 setup */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-rose-400 uppercase">Người Chơi 2</span>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                />
                <select
                  value={guestChampion}
                  onChange={(e) => setGuestChampion(e.target.value as ChampionId)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                >
                  {Object.values(CHAMPIONS).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-center pt-2">
                  <AvatarIllustrator championId={guestChampion} size="md" />
                </div>
              </div>
            </div>

            <button
              onClick={handleStartLocalMatch}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xl flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              Bắt Đầu Trận Đấu Cục Bộ
            </button>
          </div>
        )}
      </div>

      {/* Tournament Format Notes */}
      <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl text-center text-xs text-slate-400 flex items-center justify-center gap-4">
        <span className="flex items-center gap-1 text-amber-400 font-bold">
          <Trophy className="w-3.5 h-3.5" /> Thể Thức Giải Đấu:
        </span>
        <span>Bộ bài 6 lá chuẩn</span>
        <span>·</span>
        <span>2 Cổ Xúc Xắc Chân Lý</span>
        <span>·</span>
        <span>Thời gian lượt 45 giây</span>
        <span>·</span>
        <span>Cấm gian lận & Hỗ trợ tái kết nối</span>
      </div>
    </div>
  );
};
