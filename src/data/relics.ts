import { Relic } from '../types/game';

export const ANCIENT_RELICS: Relic[] = [
  {
    id: 'transformer_scroll',
    name: 'Cuộn Giấy Transformer',
    rarity: 'mythic',
    ancientTitle: 'Cổ Vật Chuyển Đổi Tự Chú Ý',
    lore: 'Văn kiện cổ xưa ghi lại cấu trúc tự chú ý của thế giới trước kỷ nguyên số, kết nối vạn vật qua các tầng ma trận.',
    description: 'Khi xúc xắc ra kết quả Số Đôi (Double): Hồi 1 AP và tăng 6 Khiên ngay lập tức.',
    trigger: 'on_dice_double',
    effectValue: 6,
    iconName: 'Scroll'
  },
  {
    id: 'attention_lens',
    name: 'Thấu Kính Tập Trung Đa Đầu',
    rarity: 'epic',
    ancientTitle: 'Gương Kính Phân Giải Tinh Tú',
    lore: 'Chiếc kính bằng thạch anh lam cho phép nhìn thấy nhiều khía cạnh của trận đấu đồng thời mà không bị nhiễu loạn.',
    description: 'Bắt đầu mỗi lượt: Nhận 1 tầng Tập Trung (Focus: Cả hai viên xúc xắc ở lượt sau được +1 điểm).',
    trigger: 'on_turn_start',
    effectValue: 1,
    iconName: 'Eye'
  },
  {
    id: 'lossless_mirror',
    name: 'Gương Bảo Toàn Suy Hao',
    rarity: 'epic',
    ancientTitle: 'Bảo Cảnh Không Tổn Thất',
    lore: 'Tấm gương huyền bí phản chiếu ánh sáng mà không làm hao hụt dù chỉ một quang tử năng lượng.',
    description: 'Khi lượng Máu tụt xuống dưới 40%: Tự động kích hoạt Khiên Thánh 15 điểm (một lần mỗi trận).',
    trigger: 'on_low_hp',
    effectValue: 15,
    iconName: 'ShieldAlert'
  },
  {
    id: 'moe_matrix',
    name: 'Ma Trận Chuyên Gia Hỗn Hợp',
    rarity: 'mythic',
    ancientTitle: 'Trận Đồ Cổ Thuật Đa Tinh Hoa',
    lore: 'Phân bổ năng lượng chiến đấu đến chuyên gia tinh thông nhất cho từng tình huống cụ thể.',
    description: 'Mỗi khi kích hoạt thành công Hiệu Ứng Đồng Bộ (Resonance): Tăng thêm 4 Sát thương cho đòn đó.',
    trigger: 'on_resonance',
    effectValue: 4,
    iconName: 'Cpu'
  },
  {
    id: 'entropy_flame',
    name: 'Ngọn Lửa Entrôpi Cực Hạn',
    rarity: 'rare',
    ancientTitle: 'Hỏa Đăng Lượng Tử Khởi Nguyên',
    lore: 'Ngọn lửa vĩnh hằng đốt cháy trật tự thông thường, biến xác suất hỗn loạn thành uy lực.',
    description: 'Nếu tổng điểm 2 xúc xắc là Số Lẻ: Đòn đánh tiếp theo gây thêm 3 sát thương Bỏng (Burn).',
    trigger: 'on_card_play',
    effectValue: 3,
    iconName: 'Flame'
  },
  {
    id: 'chain_of_thought_beads',
    name: 'Tràng Hạt Chuỗi Suy Luận',
    rarity: 'mythic',
    ancientTitle: 'Minh Tâm Chuỗi Pháp Bảo',
    lore: 'Từng hạt tràng đại diện cho một bước suy luận rành mạch: "Hãy suy nghĩ từng bước một".',
    description: 'Bắt đầu lượt đấu: Tích lũy 1 tầng Suy Luận (Reasoning), chuyển hóa 50% Khiên dư thừa thành Sát thương ở lượt kế.',
    trigger: 'on_turn_start',
    effectValue: 2,
    iconName: 'Sparkles'
  },
  {
    id: 'flash_rune',
    name: 'Cổ Ngữ Tia Sáng Flash',
    rarity: 'rare',
    ancientTitle: 'Thần Phù Tốc Độ Ánh Sáng',
    lore: 'Cổ ngữ của sự nhanh nhẹn tột cùng, cắt giảm độ trễ tư duy đến mức gần như tức thời.',
    description: 'Lượt đầu tiên của mỗi trận đấu: Nhận thêm +1 AP tối đa.',
    trigger: 'on_turn_start',
    effectValue: 1,
    iconName: 'Zap'
  },
  {
    id: 'zero_shot_stele',
    name: 'Bia Đá Vô Cần Mẫu',
    rarity: 'epic',
    ancientTitle: 'Thánh Thạch Tự Lực Khởi Sinh',
    lore: 'Bia đá truyền thừa kiến thức không cần bất kỳ ví dụ minh họa nào, phản ứng thuần túy bằng nội tại.',
    description: 'Khi trên tay không còn bài Tấn công nào: Rút ngay 1 lá bài mới từ Bộ Rút.',
    trigger: 'on_card_play',
    effectValue: 1,
    iconName: 'BookOpen'
  },
  {
    id: 'context_crystal',
    name: 'Pha Lê Cửa Sổ Ngữ Cảnh',
    rarity: 'rare',
    ancientTitle: 'Ngọc Khắc Ký Ức 1M',
    lore: 'Một khối pha lê có sức chứa ký ức vô tận, lưu giữ mọi biến cố đã xảy ra trên chiến trường.',
    description: 'Tăng giới hạn bài trên tay thêm 1 lá (Tối đa 6 lá trên tay).',
    trigger: 'on_turn_start',
    effectValue: 1,
    iconName: 'Layers'
  },
  {
    id: 'constitutional_shield',
    name: 'Mảnh Vỡ Khiên Hiến Pháp',
    rarity: 'epic',
    ancientTitle: 'Di Giới Giới Hạn Đạo Đức',
    lore: 'Mảnh vỡ lá chắn của lòng trung thực và an toàn tuyệt đối, không thể bị xuyên thủng bởi tà đạo.',
    description: 'Miễn nhiễm với hiệu ứng Giảm Giáp (Shield Break). Khi tạo Khiên, nhận thêm +2 Khiên.',
    trigger: 'on_card_play',
    effectValue: 2,
    iconName: 'ShieldCheck'
  },
  {
    id: 'quantum_dice_core',
    name: 'Lõi Xúc Xắc Lượng Tử',
    rarity: 'rare',
    ancientTitle: 'Hạt Nhân Thao Túng Xác Suất',
    lore: 'Bộ điều khiển xác suất cổ xưa cho phép người sử dụng tái lắc xúc xắc thêm một lần mỗi hiệp.',
    description: 'Tăng số lần Tái Đổ Xúc Xắc (Reroll) thêm +1 lần mỗi hiệp.',
    trigger: 'on_turn_start',
    effectValue: 1,
    iconName: 'Dices'
  },
  {
    id: 'rlhf_tuning_fork',
    name: 'Âm Thoa Tinh Chỉnh Phản Hồi',
    rarity: 'rare',
    ancientTitle: 'Cộng Hưởng Pháp Khí Thần Trí',
    lore: 'Âm thanh rung động hướng dẫn trí tuệ nhân tạo đi theo con đường tối ưu hóa lòng tin.',
    description: 'Hồi phục 3 Máu mỗi khi tung ra chiêu thức Tối Thượng (Ultimate).',
    trigger: 'on_card_play',
    effectValue: 3,
    iconName: 'Activity'
  }
];
