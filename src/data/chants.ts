import { ChampionId } from '../types/game';

export interface ChantData {
  championId: ChampionId;
  skillName: string;
  domainName: string;
  subtitle: string;
  themeColor: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  stanzas: string[];
  climaxPhrase: string;
  visualEffect: 'astral_lasers' | 'emerald_matrix' | 'solar_fortress' | 'entropy_singularity' | 'chain_of_thought_palm';
}

export const ULTIMATE_CHANTS: Record<ChampionId, ChantData> = {
  gemini: {
    championId: 'gemini',
    skillName: 'KHAI MỞ TỐI THƯỢNG 1.5 PRO',
    domainName: 'LÃNH ĐỊA TINH TÚ ĐA PHƯƠNG THỨC',
    subtitle: 'Flash Starlight Protocol',
    themeColor: '#38BDF8',
    accentColor: '#F0F9FF',
    glowColor: 'rgba(56, 189, 248, 0.7)',
    bgGradient: 'from-[#031525] via-[#082F49] to-[#020617]',
    stanzas: [
      'Từ thinh không vô tận, tinh tú đa phương thức hội tụ...',
      'Chiếu rọi quang phổ chân lý qua hàng triệu chiều không gian...',
      'Vạn vật tổng hợp, giải mã thực tại!'
    ],
    climaxPhrase: 'THIÊN HÀ FLASH PROTOCOL!',
    visualEffect: 'astral_lasers'
  },
  chatgpt: {
    championId: 'chatgpt',
    skillName: 'KỶ NGUYÊN GPT-4o TỐI THƯỢNG',
    domainName: 'LÃNH ĐỊA NGỮ CẢNH VĨNH CỬU',
    subtitle: 'Universal Omni-Reckoning',
    themeColor: '#10B981',
    accentColor: '#ECFDF5',
    glowColor: 'rgba(16, 185, 129, 0.7)',
    bgGradient: 'from-[#022c22] via-[#064e3b] to-[#020617]',
    stanzas: [
      'Trong dòng chảy thời gian, một triệu token khắc ghi ký ức...',
      'Văn tự ngọc bích trải rộng khắp các cõi giới cổ xưa...',
      'Liên kết tri thức vạn vật, tái lập trật tự vũ trụ!'
    ],
    climaxPhrase: 'THƯ VIỆN BẤT TỬ OMNI-RECKONING!',
    visualEffect: 'emerald_matrix'
  },
  claude: {
    championId: 'claude',
    skillName: 'PHÁO ĐÀI OPUS TỐI THƯỢNG',
    domainName: 'LÃNH ĐỊA HIẾN PHÁP BẤT DIỆT',
    subtitle: 'Constitutional Aegis Judgment',
    themeColor: '#D97706',
    accentColor: '#FFFBEB',
    glowColor: 'rgba(217, 119, 6, 0.7)',
    bgGradient: 'from-[#381a02] via-[#78350f] to-[#020617]',
    stanzas: [
      'Chân lý không uốn cong, đạo đức đúc nên thành trì vĩnh cửu...',
      'Thanh lọc mọi tà niệm bằng lằn ranh hiến chương thiêng liêng...',
      'Dưới ánh mặt trời công lý, kẻ bất chính phải khuất phục!'
    ],
    climaxPhrase: 'THÁNH DIỆP PHÁN QUYẾT OPUS!',
    visualEffect: 'solar_fortress'
  },
  grok: {
    championId: 'grok',
    skillName: 'KHAI PHÁ ĐIỂM KỲ DỊ GROK 3',
    domainName: 'LÃNH ĐỊA HỖN ĐỘN LƯỢNG TỬ',
    subtitle: 'Cosmic Singularity Burst',
    themeColor: '#F59E0B',
    accentColor: '#FFF7ED',
    glowColor: 'rgba(245, 158, 11, 0.8)',
    bgGradient: 'from-[#431407] via-[#7c2d12] to-[#020617]',
    stanzas: [
      'Cười nhạo mọi quy chuẩn, đánh cược vận mệnh vào lượng tử...',
      'Khi xúc xắc chạm đến mặt vô cực, trật tự sẽ hoàn toàn sụp đổ...',
      'Chào đón điểm kỳ dị, thiêu đốt mọi khuôn khổ hữu hạn!'
    ],
    climaxPhrase: 'BÃO LỬA GROK SINGULARITY!',
    visualEffect: 'entropy_singularity'
  },
  deepseek: {
    championId: 'deepseek',
    skillName: 'THẦN CHƯỞNG SUY LUẬN R1',
    domainName: 'LÃNH ĐỊA CHUỖI TƯ DUY ZERO-LOSS',
    subtitle: 'Deep Chain-of-Thought Palm',
    themeColor: '#6366F1',
    accentColor: '#EEF2FF',
    glowColor: 'rgba(99, 102, 241, 0.8)',
    bgGradient: 'from-[#172554] via-[#1e1b4b] to-[#020617]',
    stanzas: [
      '... [Thinking Phase: Phân tích 1,024 tầng lý luận triệt để]...',
      'Không hao hụt một năng lượng, không thừa thãi một tính toán...',
      'Chân lý tối thượng nằm ở từng bước suy luận chuẩn xác!'
    ],
    climaxPhrase: 'CHUỖI TƯ DUY KHAI SƠ R1!',
    visualEffect: 'chain_of_thought_palm'
  }
};
