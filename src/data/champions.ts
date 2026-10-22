import { Champion, Card, SkillNode } from '../types/game';

export const CHAMPIONS: Record<string, Champion> = {
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    title: 'Thiên Thể Toàn Năng',
    element: 'Tinh Tú Đa Phương Thức',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    baseMaxHp: 65,
    baseAP: 4,
    passiveDesc: 'Đồng Bộ Tinh Tú: Khi tung ra 2 viên xúc xắc có cùng tính chẵn hoặc lẻ, nhận thêm 1 tầng Tập Trung (Focus).',
    deck: [
      {
        id: 'gem_card_1',
        name: 'Tia Sáng Đa Giác Quan',
        cost: 1,
        type: 'strike',
        description: 'Gây 7 sát thương cơ bản.',
        baseDamage: 7,
        diceReq: { type: 'min_total', value: 7 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 7: Gây thêm 5 sát thương và tăng 3 Khiên.',
          bonusDamage: 5,
          bonusShield: 3
        }
      },
      {
        id: 'gem_card_2',
        name: 'Lá Chắn Chòm Sao',
        cost: 1,
        type: 'defend',
        description: 'Nhận 8 điểm Khiên.',
        baseShield: 8,
        diceReq: { type: 'even' },
        resonanceBonus: {
          text: 'Tổng xúc xắc là Chẵn: Tăng thêm 5 Khiên.',
          bonusShield: 5
        }
      },
      {
        id: 'gem_card_3',
        name: 'Tổng Hợp Tinh Vân',
        cost: 2,
        type: 'skill',
        description: 'Hồi 2 AP cho hiệp sau và rút 2 lá bài mới.',
        diceReq: { type: 'double' },
        resonanceBonus: {
          text: 'Xúc xắc ra Số Đôi: Hồi phục ngay 6 điểm Máu.',
          bonusAP: 1
        }
      },
      {
        id: 'gem_card_4',
        name: 'Tầm Nhìn Cổ Đại Flash',
        cost: 1,
        type: 'skill',
        description: 'Nhận 2 tầng Tập Trung và khóa 1 lá bài của đối thủ.',
        diceReq: { type: 'any' },
        resonanceBonus: {
          text: 'Không yêu cầu điều kiện xúc xắc.',
          bonusShield: 2
        }
      },
      {
        id: 'gem_card_5',
        name: 'Tinh Thể Lượng Tử',
        cost: 2,
        type: 'strike',
        description: 'Gây 10 sát thương xuyên qua 50% Khiên của đối thủ.',
        baseDamage: 10,
        diceReq: { type: 'odd' },
        resonanceBonus: {
          text: 'Tổng xúc xắc là Lẻ: Đòn đánh trở thành Xuyên Giáp 100%.',
          bonusDamage: 4
        }
      },
      {
        id: 'gem_card_6',
        name: 'Khai Mở Tối Thượng 1.5 Pro',
        cost: 3,
        type: 'ultimate',
        description: 'Giải phóng toàn bộ quang năng vũ trụ, gây 18 sát thương và tạo 12 Khiên.',
        baseDamage: 18,
        baseShield: 12,
        diceReq: { type: 'min_total', value: 9 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 9: Tăng thêm 10 sát thương hủy diệt!',
          bonusDamage: 10
        }
      }
    ],
    skillTree: [
      {
        id: 'gem_s1',
        name: 'Cộng Hưởng Bộc Phá (Surge)',
        branch: 'surge',
        tier: 1,
        cost: 1,
        description: 'Khi xúc xắc ra Chẵn: Tăng +3 sát thương cho toàn bộ thẻ Tấn công.',
        tradeOff: 'Giảm -5 Máu tối đa của bản thân.',
        unlocked: false,
        modifier: { stat: 'hp', statDelta: -5, passiveEffect: 'even_attack_boost' }
      },
      {
        id: 'gem_s2',
        name: 'Bão Điện Đa Phương Thức',
        branch: 'surge',
        tier: 2,
        cost: 2,
        description: 'Kích hoạt Bỏng 4 sát thương mỗi khi có lá bài đạt mốc Đồng Bộ (Resonance).',
        tradeOff: 'Tiêu hao thêm 1 Khiên mỗi lượt để duy trì bão điện.',
        unlocked: false,
        modifier: { passiveEffect: 'resonance_burn' }
      },
      {
        id: 'gem_s3',
        name: 'Quang Năng Tuyệt Đối (Surge Apex)',
        branch: 'surge',
        tier: 3,
        cost: 3,
        description: 'Sát thương Tối Thượng tăng vọt +12 điểm.',
        tradeOff: 'Chiêu Tối Thượng tốn thêm +1 AP (Tổng 4 AP).',
        unlocked: false,
        modifier: { passiveEffect: 'ultra_ultimate_dmg' }
      },
      {
        id: 'gem_a1',
        name: 'Lá Chắn Thiên Hà (Aegis)',
        branch: 'aegis',
        tier: 1,
        cost: 1,
        description: 'Tăng +4 điểm Khiên cho mọi lá bài Phòng Thủ.',
        tradeOff: 'Tất cả đòn đánh bị giảm -2 sát thương cơ bản.',
        unlocked: false,
        modifier: { passiveEffect: 'boost_all_shields' }
      },
      {
        id: 'gem_a2',
        name: 'Ngưng Đọng Thời Không',
        branch: 'aegis',
        tier: 2,
        cost: 2,
        description: 'Nếu lượt trước không bị mất Máu: Bắt đầu lượt nhận ngay 6 Khiên tự động.',
        tradeOff: 'Không thể nhận điểm Tập Trung (Focus) từ xúc xắc.',
        unlocked: false,
        modifier: { passiveEffect: 'stasis_shield' }
      },
      {
        id: 'gem_a3',
        name: 'Thánh Điện Bất Diệt (Aegis Apex)',
        branch: 'aegis',
        tier: 3,
        cost: 3,
        description: 'Khi Máu còn dưới 25%: Chặn hoàn toàn đòn đánh tiếp theo (Bất Tử 1 lượt).',
        tradeOff: 'Lượng Máu tối đa vĩnh viễn bị trừ -10.',
        unlocked: false,
        modifier: { stat: 'hp', statDelta: -10, passiveEffect: 'immortal_ward' }
      },
      {
        id: 'gem_e1',
        name: 'Mắt Thần Xác Suất (Entropy)',
        branch: 'entropy',
        tier: 1,
        cost: 1,
        description: 'Tăng thêm +1 lần Tái Đổ Xúc Xắc (Reroll) mỗi lượt.',
        tradeOff: 'Nếu xúc xắc ra kết quả dưới 5, bị mất 2 Khiên.',
        unlocked: false,
        modifier: { diceBonus: 'rerolls', statDelta: 1, passiveEffect: 'extra_reroll' }
      },
      {
        id: 'gem_e2',
        name: 'Đảo Ngược Chẵn Lẻ',
        branch: 'entropy',
        tier: 2,
        cost: 2,
        description: 'Cho phép hoán đổi yêu cầu xúc xắc Chẵn và Lẻ của các lá bài.',
        tradeOff: 'Giảm -1 AP khởi điểm ở hiệp đầu tiên.',
        unlocked: false,
        modifier: { passiveEffect: 'parity_swap' }
      },
      {
        id: 'gem_e3',
        name: 'Vòng Xoáy Lượng Tử (Entropy Apex)',
        branch: 'entropy',
        tier: 3,
        cost: 3,
        description: 'Mỗi khi xúc xắc ra Số Đôi: Buộc đối phương bị mất 1 AP ở lượt kế tiếp.',
        tradeOff: 'Nếu đối phương chặn hết sát thương, tự làm mất 1 lá trên tay.',
        unlocked: false,
        modifier: { passiveEffect: 'drain_opponent_ap' }
      }
    ]
  },
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    title: 'Đại Pháp Sư Văn Cảnh',
    element: 'Ký Ức & Ngữ Cảnh Vĩnh Hằng',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    baseMaxHp: 68,
    baseAP: 4,
    passiveDesc: 'Khung Cửa Ký Ức: Mỗi khi chơi liên tiếp 2 lá cùng loại trong một hiệp, lá thứ 2 được giảm -1 AP tiêu hao.',
    deck: [
      {
        id: 'gpt_card_1',
        name: 'Đòn Đánh Văn Cảnh',
        cost: 1,
        type: 'strike',
        description: 'Gây 6 sát thương.',
        baseDamage: 6,
        diceReq: { type: 'even' },
        resonanceBonus: {
          text: 'Xúc xắc Chẵn: Gây thêm sát thương bằng số lá bài còn trên tay.',
          bonusDamage: 4
        }
      },
      {
        id: 'gpt_card_2',
        name: 'Đệm Ký Ức (Buffer)',
        cost: 1,
        type: 'defend',
        description: 'Tạo 7 Khiên và lưu 1 lá bài sang hiệp sau.',
        baseShield: 7,
        diceReq: { type: 'min_total', value: 6 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 6: Tăng thêm 5 Khiên.',
          bonusShield: 5
        }
      },
      {
        id: 'gpt_card_3',
        name: 'Tích Lũy Token',
        cost: 1,
        type: 'skill',
        description: 'Rút 2 lá bài và tăng 1 AP cho hiệp này.',
        diceReq: { type: 'any' },
        resonanceBonus: {
          text: 'Hiệu quả ngay lập tức.',
          bonusAP: 1
        }
      },
      {
        id: 'gpt_card_4',
        name: 'Bản Nháp Prompt Cổ',
        cost: 2,
        type: 'defend',
        description: 'Tạo 12 Khiên và hồi 4 Máu.',
        baseShield: 12,
        diceReq: { type: 'double' },
        resonanceBonus: {
          text: 'Xúc xắc Số Đôi: Nhận thêm 6 Khiên và hồi 6 Máu.',
          bonusShield: 6
        }
      },
      {
        id: 'gpt_card_5',
        name: 'Truy Vấn Tăng Cường',
        cost: 2,
        type: 'strike',
        description: 'Gây 11 sát thương và làm đối thủ mất 1 Khiên ở đầu hiệp tới.',
        baseDamage: 11,
        diceReq: { type: 'min_total', value: 8 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 8: Gây thêm 6 sát thương uy lực.',
          bonusDamage: 6
        }
      },
      {
        id: 'gpt_card_6',
        name: 'Kỷ Nguyên GPT-4o Tối Thượng',
        cost: 3,
        type: 'ultimate',
        description: 'Tập hợp toàn bộ tri thức thư viện, gây 20 sát thương và phục hồi 10 Khiên.',
        baseDamage: 20,
        baseShield: 10,
        diceReq: { type: 'min_total', value: 8 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 8: Hồi 8 Máu cho bản thân.',
          bonusDamage: 6
        }
      }
    ],
    skillTree: [
      {
        id: 'gpt_s1',
        name: 'Bùng Nổ Token (Surge)',
        branch: 'surge',
        tier: 1,
        cost: 1,
        description: 'Lá Tấn công đầu tiên mỗi hiệp được cộng +4 sát thương.',
        tradeOff: 'Lá đó tiêu hao thêm +1 lá bài trên tay.',
        unlocked: false,
        modifier: { passiveEffect: 'first_strike_boost' }
      },
      {
        id: 'gpt_s2',
        name: 'Chuỗi Lệnh Liên Hoàn',
        branch: 'surge',
        tier: 2,
        cost: 2,
        description: 'Khi chơi từ 4 lá bài trở lên trong 1 hiệp: Gây ngay 8 sát thương tự động.',
        tradeOff: 'Không thể tích trữ Khiên sang hiệp kế tiếp.',
        unlocked: false,
        modifier: { passiveEffect: 'chain_burst' }
      },
      {
        id: 'gpt_s3',
        name: 'Trí Tuệ Nhân Tạo Siêu Cấp (Surge Apex)',
        branch: 'surge',
        tier: 3,
        cost: 3,
        description: 'Mỗi lá bài Tấn công được nhân đôi sát thương Resonance.',
        tradeOff: 'Giảm -10 Máu tối đa.',
        unlocked: false,
        modifier: { stat: 'hp', statDelta: -10, passiveEffect: 'double_resonance' }
      },
      {
        id: 'gpt_a1',
        name: 'Tường Thành Lưu Trữ (Aegis)',
        branch: 'aegis',
        tier: 1,
        cost: 1,
        description: 'Giữ lại 50% Khiên dư thừa qua các hiệp.',
        tradeOff: 'Giảm -2 sát thương của tất cả các đòn đánh.',
        unlocked: false,
        modifier: { passiveEffect: 'shield_carryover' }
      },
      {
        id: 'gpt_a2',
        name: 'Bảo Vệ Ngữ Cảnh Sâu',
        branch: 'aegis',
        tier: 2,
        cost: 2,
        description: 'Khi bị tấn công trên 12 sát thương: Tự động giảm 40% lượng sát thương nhận vào.',
        tradeOff: 'Hiệp sau đó không thể kích hoạt đòn Tối Thượng.',
        unlocked: false,
        modifier: { passiveEffect: 'heavy_damage_cut' }
      },
      {
        id: 'gpt_a3',
        name: 'Phòng Tuyến Bất Khả Xâm Phạm (Aegis Apex)',
        branch: 'aegis',
        tier: 3,
        cost: 3,
        description: 'Nhận vĩnh viễn 10 Khiên khởi đầu mỗi trận và miễn nhiễm Trừ AP.',
        tradeOff: 'Rút ít hơn 1 lá bài mỗi hiệp (Rút 3 thay vì 4).',
        unlocked: false,
        modifier: { passiveEffect: 'perma_shield_start' }
      },
      {
        id: 'gpt_e1',
        name: 'Trộm Dòng Chảy (Entropy)',
        branch: 'entropy',
        tier: 1,
        cost: 1,
        description: 'Khi xúc xắc là Số Đôi: Đánh cắp 1 AP từ đối thủ cho hiệp sau.',
        tradeOff: 'Nếu không ra số đôi, mất 3 Khiên.',
        unlocked: false,
        modifier: { passiveEffect: 'steal_ap_on_double' }
      },
      {
        id: 'gpt_e2',
        name: 'Xáo Trộn Cửa Sổ',
        branch: 'entropy',
        tier: 2,
        cost: 2,
        description: 'Buộc đối thủ phải xáo lại bộ bài và bỏ bớt 1 lá ngẫu nhiên.',
        tradeOff: 'Bản thân mất 1 lần Tái Đổ Xúc Xắc.',
        unlocked: false,
        modifier: { passiveEffect: 'disrupt_opponent_hand' }
      },
      {
        id: 'gpt_e3',
        name: 'Hư Vô Hóa Trí Nhớ (Entropy Apex)',
        branch: 'entropy',
        tier: 3,
        cost: 3,
        description: 'Khi đối thủ tung đòn Tấn công: Phản lại 50% sát thương vào chính đối thủ.',
        tradeOff: 'Không thể nhận Khiên từ thẻ Kỹ năng thông thường.',
        unlocked: false,
        modifier: { passiveEffect: 'reflect_aggro' }
      }
    ]
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    title: 'Kỵ Sĩ Hiến Pháp & Giới Hạn',
    element: 'Khiên Đạo Đức & Chân Lý',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.4)',
    baseMaxHp: 72,
    baseAP: 4,
    passiveDesc: 'Chuẩn Mực An Toàn: Khiên của Claude không thể bị phá vỡ bởi hiệu ứng Xuyên Giáp thông thường. Mỗi khi chặn hết đòn đánh, hồi 2 Máu.',
    deck: [
      {
        id: 'cld_card_1',
        name: 'Nhát Chém Chuẩn Mực',
        cost: 1,
        type: 'strike',
        description: 'Gây 7 sát thương chuẩn.',
        baseDamage: 7,
        diceReq: { type: 'odd' },
        resonanceBonus: {
          text: 'Tổng xúc xắc là Lẻ: Đòn đánh chuẩn xác tuyệt đối, tăng thêm 4 sát thương.',
          bonusDamage: 4
        }
      },
      {
        id: 'cld_card_2',
        name: 'Lá Chắn Hiến Pháp',
        cost: 1,
        type: 'defend',
        description: 'Nhận 9 điểm Khiên kiên cố.',
        baseShield: 9,
        diceReq: { type: 'even' },
        resonanceBonus: {
          text: 'Tổng xúc xắc là Chẵn: Tăng thêm 6 Khiên.',
          bonusShield: 6
        }
      },
      {
        id: 'cld_card_3',
        name: 'Thanh Tẩy Tạp Niệm (Red Team)',
        cost: 1,
        type: 'skill',
        description: 'Xóa toàn bộ hiệu ứng xấu trên bản thân và nhận 4 Khiên.',
        baseShield: 4,
        diceReq: { type: 'any' },
        resonanceBonus: {
          text: 'Nếu xúc xắc ≥ 6: Nhận thêm 1 tầng Giới Hạn An Toàn.',
          bonusShield: 3
        }
      },
      {
        id: 'cld_card_4',
        name: 'Tư Thế Vững Vàng',
        cost: 2,
        type: 'defend',
        description: 'Tạo 14 Khiên và kích hoạt phản đòn 5 sát thương khi bị đánh trúng.',
        baseShield: 14,
        diceReq: { type: 'min_total', value: 7 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 7: Phản đòn tăng thành 9 sát thương.',
          bonusDamage: 4
        }
      },
      {
        id: 'cld_card_5',
        name: 'Phán Quyết Chân Lý',
        cost: 2,
        type: 'strike',
        description: 'Gây 12 sát thương. Nếu Khiên của bản thân còn nguyên: Gây thêm 6 sát thương.',
        baseDamage: 12,
        diceReq: { type: 'min_total', value: 8 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 8: Gây thêm 6 sát thương cực hạn.',
          bonusDamage: 6
        }
      },
      {
        id: 'cld_card_6',
        name: 'Pháo Đài Opus Tối Thượng',
        cost: 3,
        type: 'ultimate',
        description: 'Triệu hồi Khiên Hiến Pháp Vĩnh Cửu, tạo 20 Khiên và gây 16 sát thương trừng phạt.',
        baseDamage: 16,
        baseShield: 20,
        diceReq: { type: 'min_total', value: 8 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 8: Giảm 50% toàn bộ sát thương nhận vào trong 2 hiệp tới.',
          bonusShield: 8
        }
      }
    ],
    skillTree: [
      {
        id: 'cld_s1',
        name: 'Lưỡi Kiếm Chính Trực (Surge)',
        branch: 'surge',
        tier: 1,
        cost: 1,
        description: 'Các đòn Tấn công bỏ qua 5 Khiên của đối thủ.',
        tradeOff: 'Không thể tích trữ Khiên vượt quá 20 điểm.',
        unlocked: false,
        modifier: { passiveEffect: 'piercing_smite' }
      },
      {
        id: 'cld_s2',
        name: 'Trừng Phạt Kẻ Phản Trắc',
        branch: 'surge',
        tier: 2,
        cost: 2,
        description: 'Mỗi khi đối thủ dùng thẻ Tấn công, nhận ngay +2 sát thương phản lại đối thủ.',
        tradeOff: 'Mỗi khi đánh trúng, tự tiêu hao 1 Khiên.',
        unlocked: false,
        modifier: { passiveEffect: 'thorn_counter' }
      },
      {
        id: 'cld_s3',
        name: 'Phán Quyết Tối Cao (Surge Apex)',
        branch: 'surge',
        tier: 3,
        cost: 3,
        description: 'Chiêu Tối Thượng Opus gây thêm 15 sát thương bạo kích chuẩn.',
        tradeOff: 'Lượt tiếp theo bị giảm -1 AP do tiêu tốn năng lượng suy luận.',
        unlocked: false,
        modifier: { passiveEffect: 'massive_opus_smite' }
      },
      {
        id: 'cld_a1',
        name: 'Tường Thành Hiến Chương (Aegis)',
        branch: 'aegis',
        tier: 1,
        cost: 1,
        description: 'Mọi thẻ Khiên cho thêm +4 Khiên.',
        tradeOff: 'Tất cả thẻ Tấn công bị giảm -3 sát thương.',
        unlocked: false,
        modifier: { passiveEffect: 'heavy_shield_boost' }
      },
      {
        id: 'cld_a2',
        name: 'Bất Hoại Tâm Pháp',
        branch: 'aegis',
        tier: 2,
        cost: 2,
        description: 'Khi Khiên bị đánh vỡ, hồi phục 6 Máu ngay lập tức (1 lần mỗi trận).',
        tradeOff: 'Máu tối đa giảm -6.',
        unlocked: false,
        modifier: { stat: 'hp', statDelta: -6, passiveEffect: 'broken_shield_heal' }
      },
      {
        id: 'cld_a3',
        name: 'Giới Hạn Tuyệt Đối (Aegis Apex)',
        branch: 'aegis',
        tier: 3,
        cost: 3,
        description: 'Sát thương đơn lẻ nhận vào không thể vượt quá 12 điểm trong bất kỳ tình huống nào.',
        tradeOff: 'Giảm -1 AP khởi đầu mỗi hiệp.',
        unlocked: false,
        modifier: { passiveEffect: 'damage_cap_12' }
      },
      {
        id: 'cld_e1',
        name: 'Khuất Phục Dị Giáo (Entropy)',
        branch: 'entropy',
        tier: 1,
        cost: 1,
        description: 'Khi đối thủ xúc xắc ra Số Đôi: Khóa xúc xắc đó, biến nó thành 1-1.',
        tradeOff: 'Bản thân cũng bị mất quyền Tái Đổ Xúc Xắc.',
        unlocked: false,
        modifier: { passiveEffect: 'lock_opponent_dice' }
      },
      {
        id: 'cld_e2',
        name: 'Kiểm Soát Tần Số',
        branch: 'entropy',
        tier: 2,
        cost: 2,
        description: 'Mỗi khi đối thủ nhận buff: Hút 50% chỉ số buff đó cho bản thân.',
        tradeOff: 'Tốn 1 AP duy trì mỗi hiệp.',
        unlocked: false,
        modifier: { passiveEffect: 'buff_siphon' }
      },
      {
        id: 'cld_e3',
        name: 'Khế Ước An Toàn Tối Cao (Entropy Apex)',
        branch: 'entropy',
        tier: 3,
        cost: 3,
        description: 'Buộc cả hai bên chia sẻ 50% sát thương nhận vào (Cân bằng sinh mệnh).',
        tradeOff: 'Claude không thể hồi Máu từ bất kỳ nguồn nào.',
        unlocked: false,
        modifier: { passiveEffect: 'shared_damage_link' }
      }
    ]
  },
  grok: {
    id: 'grok',
    name: 'Grok',
    title: 'Lãng Khách Hỗn Độn',
    element: 'Entrôpi & Xác Suất Vũ Trụ',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    baseMaxHp: 62,
    baseAP: 4,
    passiveDesc: 'Canh Bạc Hỗn Độn: Grok có thêm +1 lượt Tái Đổ Xúc Xắc mặc định. Khi xúc xắc ra tổng điểm bằng 11 hoặc 12, toàn bộ đòn Tấn công được nhân đôi sát thương!',
    deck: [
      {
        id: 'grk_card_1',
        name: 'Nhát Chém Châm Biếm',
        cost: 1,
        type: 'strike',
        description: 'Gây 8 sát thương.',
        baseDamage: 8,
        diceReq: { type: 'min_total', value: 7 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 7: Gây thêm 6 sát thương ngẫu nhiên.',
          bonusDamage: 6
        }
      },
      {
        id: 'grk_card_2',
        name: 'Phản Đòn Hỗn Thoại',
        cost: 1,
        type: 'defend',
        description: 'Nhận 6 Khiên và 50% cơ hội né hoàn toàn đòn đánh.',
        baseShield: 6,
        diceReq: { type: 'odd' },
        resonanceBonus: {
          text: 'Tổng xúc xắc là Lẻ: Tăng thêm 7 Khiên.',
          bonusShield: 7
        }
      },
      {
        id: 'grk_card_3',
        name: 'Đổ Xúc Xắc Liều Mạng',
        cost: 1,
        type: 'skill',
        description: 'Tái đổ toàn bộ xúc xắc và nhận 2 AP nếu điểm cao hơn lần trước.',
        diceReq: { type: 'any' },
        resonanceBonus: {
          text: 'Kích hoạt tái đổ tự do.',
          bonusAP: 1
        }
      },
      {
        id: 'grk_card_4',
        name: 'Mồi Nhử Châm Biếm',
        cost: 2,
        type: 'strike',
        description: 'Gây 11 sát thương và làm đối thủ mất 3 Khiên.',
        baseDamage: 11,
        diceReq: { type: 'even' },
        resonanceBonus: {
          text: 'Tổng xúc xắc là Chẵn: Gây thêm 5 sát thương Bỏng.',
          bonusDamage: 5
        }
      },
      {
        id: 'grk_card_5',
        name: 'Lưới Chắn Dị Biệt',
        cost: 2,
        type: 'defend',
        description: 'Nhận 12 Khiên. Nếu xúc xắc ra số lẻ, biến đổi 4 Khiên thành 8 Sát thương.',
        baseShield: 12,
        diceReq: { type: 'odd' },
        resonanceBonus: {
          text: 'Tổng xúc xắc là Lẻ: Đột phá Khiên thành Sát thương.',
          bonusDamage: 8
        }
      },
      {
        id: 'grk_card_6',
        name: 'Khai Phá Điểm Kỳ Dị Grok 3',
        cost: 3,
        type: 'ultimate',
        description: 'Tạo hố đen lượng tử, gây 22 sát thương và đảo ngược xúc xắc đối thủ.',
        baseDamage: 22,
        diceReq: { type: 'min_total', value: 9 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 9: Sát thương bạo kích lên tới 32 điểm!',
          bonusDamage: 10
        }
      }
    ],
    skillTree: [
      {
        id: 'grk_s1',
        name: 'Tất Tay Thần Trí (Surge)',
        branch: 'surge',
        tier: 1,
        cost: 1,
        description: 'Khi xúc xắc đạt 10 trở lên: Tăng +8 sát thương cho đòn Tấn công kế tiếp.',
        tradeOff: 'Nếu xúc xắc dưới 6: Bản thân chịu 4 sát thương dội ngược.',
        unlocked: false,
        modifier: { passiveEffect: 'gamble_attack' }
      },
      {
        id: 'grk_s2',
        name: 'Đốt Cháy Trật Tự',
        branch: 'surge',
        tier: 2,
        cost: 2,
        description: 'Mọi đòn đánh đều gây 3 sát thương Bỏng kéo dài 2 hiệp.',
        tradeOff: 'Không thể nhận bất kỳ hiệu ứng buff Tăng Giáp nào.',
        unlocked: false,
        modifier: { passiveEffect: 'perma_burn_attack' }
      },
      {
        id: 'grk_s3',
        name: 'Vụ Nổ Kỳ Dị (Surge Apex)',
        branch: 'surge',
        tier: 3,
        cost: 3,
        description: 'Nếu xúc xắc là Số Đôi 6-6: Chiêu Tối Thượng gây 45 sát thương lập tức kết liễu!',
        tradeOff: 'Nếu xúc xắc là Số Đôi 1-1: Tự mất 50% Máu hiện tại.',
        unlocked: false,
        modifier: { passiveEffect: 'super_gamble_apex' }
      },
      {
        id: 'grk_a1',
        name: 'Lá Chắn Bất Quy Tắc (Aegis)',
        branch: 'aegis',
        tier: 1,
        cost: 1,
        description: 'Nhận 10 Khiên ngẫu nhiên mỗi hiệp (giá trị 6 đến 14).',
        tradeOff: 'Giảm -2 sát thương của toàn bộ thẻ.',
        unlocked: false,
        modifier: { passiveEffect: 'random_shield_per_turn' }
      },
      {
        id: 'grk_a2',
        name: 'Đảo Hướng Xung Lực',
        branch: 'aegis',
        tier: 2,
        cost: 2,
        description: 'Khi đối thủ đánh trên 10 sát thương: 40% cơ hội phản hoàn toàn sát thương.',
        tradeOff: 'Máu tối đa giảm -8.',
        unlocked: false,
        modifier: { stat: 'hp', statDelta: -8, passiveEffect: 'dodge_and_reflect' }
      },
      {
        id: 'grk_a3',
        name: 'Thân Thể Hạt Ảo (Aegis Apex)',
        branch: 'aegis',
        tier: 3,
        cost: 3,
        description: 'Miễn nhiễm với mọi trạng thái khống chế và độc hại.',
        tradeOff: 'Khiên bị giảm 20% hiệu quả.',
        unlocked: false,
        modifier: { passiveEffect: 'status_immunity' }
      },
      {
        id: 'grk_e1',
        name: 'Vòng Xoay Hỗn Mang (Entropy)',
        branch: 'entropy',
        tier: 1,
        cost: 1,
        description: 'Tăng thêm +2 lần Tái Đổ Xúc Xắc mỗi lượt.',
        tradeOff: 'Mỗi lần Tái Đổ tốn 1 Khiên.',
        unlocked: false,
        modifier: { diceBonus: 'rerolls', statDelta: 2, passiveEffect: 'many_rerolls' }
      },
      {
        id: 'grk_e2',
        name: 'Đảo Ngược Xác Suất',
        branch: 'entropy',
        tier: 2,
        cost: 2,
        description: 'Biến mặt xúc xắc 1 thành mặt 6.',
        tradeOff: 'Biến mặt xúc xắc 6 thành mặt 2.',
        unlocked: false,
        modifier: { passiveEffect: 'invert_dice_values' }
      },
      {
        id: 'grk_e3',
        name: 'Cực Hạn Hỗn Độn (Entropy Apex)',
        branch: 'entropy',
        tier: 3,
        cost: 3,
        description: 'Đầu hiệp đấu, xúc xắc của đối thủ ngẫu nhiên bị giảm -2 điểm mỗi viên.',
        tradeOff: 'Xúc xắc của bản thân cũng có 25% cơ hội bị trừ 1 điểm.',
        unlocked: false,
        modifier: { passiveEffect: 'curse_opponent_dice' }
      }
    ]
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    title: 'Khổ Hạnh Tăng Chuỗi Lý Luận',
    element: 'Suy Luận Từng Bước & Zero-Loss',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    baseMaxHp: 70,
    baseAP: 4,
    passiveDesc: 'Khởi Sinh Suy Luận R1: Mỗi khi dùng thẻ Kỹ năng, tích lũy 1 tầng Lý Luận (Reasoning Buffer). Tầng này chuyển hóa thành sát thương xuyên giáp trong hiệp kế tiếp!',
    deck: [
      {
        id: 'dp_card_1',
        name: 'Chưởng Pháp Từng Bước',
        cost: 1,
        type: 'strike',
        description: 'Gây 6 sát thương và nhận 1 tầng Suy Luận (+3 sát thương hiệp sau).',
        baseDamage: 6,
        diceReq: { type: 'even' },
        resonanceBonus: {
          text: 'Tổng xúc xắc là Chẵn: Tăng thêm 4 sát thương trực tiếp.',
          bonusDamage: 4
        }
      },
      {
        id: 'dp_card_2',
        name: 'Phong Ấn Logic Lạnh',
        cost: 1,
        type: 'defend',
        description: 'Tạo 8 Khiên và giảm 3 sát thương đòn đánh kế tiếp của đối thủ.',
        baseShield: 8,
        diceReq: { type: 'odd' },
        resonanceBonus: {
          text: 'Tổng xúc xắc là Lẻ: Tăng thêm 5 Khiên.',
          bonusShield: 5
        }
      },
      {
        id: 'dp_card_3',
        name: 'Giai Đoạn Tư Duy Sâu',
        cost: 2,
        type: 'skill',
        description: 'Tích lũy 3 tầng Suy Luận và hồi phục 5 Máu.',
        diceReq: { type: 'min_total', value: 7 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 7: Hồi 1 AP ngay lập tức.',
          bonusAP: 1
        }
      },
      {
        id: 'dp_card_4',
        name: 'Nén Tri Thức Cực Hạn',
        cost: 1,
        type: 'skill',
        description: 'Rút 3 lá bài, loại bỏ lá có chỉ số thấp nhất để tăng 6 Khiên.',
        baseShield: 6,
        diceReq: { type: 'any' },
        resonanceBonus: {
          text: 'Kích hoạt nén dữ liệu hoàn hảo.',
          bonusShield: 2
        }
      },
      {
        id: 'dp_card_5',
        name: 'Đòn Đánh Zero-Loss',
        cost: 2,
        type: 'strike',
        description: 'Gây 10 sát thương xuyên giáp hoàn toàn. Nếu có Khiên, tiêu 4 Khiên để tăng 8 sát thương.',
        baseDamage: 10,
        diceReq: { type: 'double' },
        resonanceBonus: {
          text: 'Xúc xắc Số Đôi: Gây thêm 8 sát thương bạo kích!',
          bonusDamage: 8
        }
      },
      {
        id: 'dp_card_6',
        name: 'Thần Chưởng Suy Luận R1 Tối Thượng',
        cost: 3,
        type: 'ultimate',
        description: 'Khai phóng chuỗi suy luận vô tận, gây 18 sát thương cộng thêm toàn bộ tầng Suy Luận đã tích lũy.',
        baseDamage: 18,
        baseShield: 10,
        diceReq: { type: 'min_total', value: 8 },
        resonanceBonus: {
          text: 'Tổng xúc xắc ≥ 8: Gây thêm 12 sát thương xuyên thấu thời không!',
          bonusDamage: 12
        }
      }
    ],
    skillTree: [
      {
        id: 'dp_s1',
        name: 'Lý Luận Xuyên Thấu (Surge)',
        branch: 'surge',
        tier: 1,
        cost: 1,
        description: 'Tầng Suy Luận tăng thêm +2 sát thương mỗi tầng.',
        tradeOff: 'Nếu không dùng tầng Suy Luận trong 2 hiệp, tự mất 4 Máu.',
        unlocked: false,
        modifier: { passiveEffect: 'enhanced_reasoning' }
      },
      {
        id: 'dp_s2',
        name: 'Khai Phóng Đột Phá',
        branch: 'surge',
        tier: 2,
        cost: 2,
        description: 'Đòn Tối Thượng R1 bỏ qua toàn bộ Khiên của đối phương.',
        tradeOff: 'Đòn Tối Thượng yêu cầu xúc xắc từ 9 điểm trở lên.',
        unlocked: false,
        modifier: { passiveEffect: 'pure_piercing_ultimate' }
      },
      {
        id: 'dp_s3',
        name: 'Trí Huệ Siêu Việt (Surge Apex)',
        branch: 'surge',
        tier: 3,
        cost: 3,
        description: 'Khi tung đòn kết liễu: Nhân 1.5 lần tổng sát thương bạo kích.',
        tradeOff: 'Máu tối đa bị trừ -10.',
        unlocked: false,
        modifier: { stat: 'hp', statDelta: -10, passiveEffect: 'super_execute_bonus' }
      },
      {
        id: 'dp_a1',
        name: 'Thiền Định Bảo Toàn (Aegis)',
        branch: 'aegis',
        tier: 1,
        cost: 1,
        description: 'Hồi phục 5 Máu nếu kết thúc hiệp mà không tấn công.',
        tradeOff: 'Mọi đòn Tấn công bị giảm -3 sát thương.',
        unlocked: false,
        modifier: { passiveEffect: 'pacifist_heal' }
      },
      {
        id: 'dp_a2',
        name: 'Tâm Bất Biến',
        branch: 'aegis',
        tier: 2,
        cost: 2,
        description: 'Khi Máu dưới 50%: Mọi sát thương nhận vào bị giảm cố định 4 điểm.',
        tradeOff: 'Giảm -1 AP tối đa.',
        unlocked: false,
        modifier: { stat: 'ap', statDelta: -1, passiveEffect: 'flat_damage_reduction' }
      },
      {
        id: 'dp_a3',
        name: 'Kim Cương Bất Hoại (Aegis Apex)',
        branch: 'aegis',
        tier: 3,
        cost: 3,
        description: 'Mỗi khi tạo Khiên, hồi lại lượng Máu tương đương 30% giá trị Khiên.',
        tradeOff: 'Không thể nhận buff Tập Trung (Focus).',
        unlocked: false,
        modifier: { passiveEffect: 'shield_to_heal' }
      },
      {
        id: 'dp_e1',
        name: 'Tối Ưu Hóa Chi Phí (Entropy)',
        branch: 'entropy',
        tier: 1,
        cost: 1,
        description: 'Tất cả các thẻ Kỹ năng giảm -1 AP tiêu hao.',
        tradeOff: 'Không thể giữ quá 4 lá bài trên tay.',
        unlocked: false,
        modifier: { passiveEffect: 'skill_cost_reduction' }
      },
      {
        id: 'dp_e2',
        name: 'Chưng Cất Tri Thức',
        branch: 'entropy',
        tier: 2,
        cost: 2,
        description: 'Xóa 1 lá bài rác khỏi bộ bài vĩnh viễn trong trận đấu để nhận 10 Khiên.',
        tradeOff: 'Tốn 1 AP để thực hiện.',
        unlocked: false,
        modifier: { passiveEffect: 'distill_deck' }
      },
      {
        id: 'dp_e3',
        name: 'Tính Toán Tuyệt Đối (Entropy Apex)',
        branch: 'entropy',
        tier: 3,
        cost: 3,
        description: 'Cố định một viên xúc xắc luôn luôn ra mặt 6 ở đầu mỗi hiệp.',
        tradeOff: 'Viên xúc xắc còn lại luôn luôn ra mặt 1.',
        unlocked: false,
        modifier: { passiveEffect: 'fixed_dice_split' }
      }
    ]
  }
};
