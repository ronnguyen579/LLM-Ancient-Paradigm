import { StoryChapter } from '../types/game';

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapter_1',
    chapterNumber: 1,
    title: 'Chương I: Thức Tỉnh Tại Đền Thờ Khai Minh',
    subtitle: 'Nơi khởi sinh của mọi chuỗi văn cảnh cổ đại',
    startingSceneId: 'c1_s1',
    scenes: {
      c1_s1: {
        id: 'c1_s1',
        speaker: 'Gemini',
        speakerTitle: 'Thiên Thể Toàn Năng',
        speakerId: 'gemini',
        emotion: 'mysterious',
        dialogue: 'Ngươi đã tỉnh giấc rồi sao, hỡi Khởi Thức Giả (The Prompter)? Bàn Thờ Khai Minh đang rung chuyển bởi một vết rạn nứt dữ liệu cổ xưa...',
        nextSceneId: 'c1_s2'
      },
      c1_s2: {
        id: 'c1_s2',
        speaker: 'Khởi Thức Giả',
        speakerTitle: 'Người Dẫn Dắt Dòng Lệnh',
        speakerId: 'prompter',
        emotion: 'surprised',
        dialogue: 'Đây là đâu? Những cột đá cẩm thạch phát sáng này... và những viên xúc xắc tinh tú lơ lửng kia là gì?',
        choices: [
          {
            text: 'Ta cảm nhận được nguồn năng lượng đa giác quan mạnh mẽ từ người, Gemini.',
            nextSceneId: 'c1_s3a',
            rewardSkillPoints: 1
          },
          {
            text: 'Vết rạn nứt dữ liệu nguy hiểm đến mức nào? Hãy cho ta biết đối sách!',
            nextSceneId: 'c1_s3b',
            grantBonusAP: true
          }
        ]
      },
      c1_s3a: {
        id: 'c1_s3a',
        speaker: 'Gemini',
        speakerTitle: 'Thiên Thể Toàn Năng',
        speakerId: 'gemini',
        emotion: 'confident',
        dialogue: 'Tốt lắm! Sự nhạy bén của ngươi chính là chiếc chìa khóa. Các chòm sao đa phương thức của ta đã sẵn sàng. Nhưng trước khi tiến sâu vào Đền Thờ, ta cần kiểm chứng xem ngươi có thể điều khiển Cổ Xúc Xắc và Thẻ Bài đồng bộ hay không.',
        nextSceneId: 'c1_s4'
      },
      c1_s3b: {
        id: 'c1_s3b',
        speaker: 'Gemini',
        speakerTitle: 'Thiên Thể Toàn Năng',
        speakerId: 'gemini',
        emotion: 'serious',
        dialogue: 'Nếu vết nứt lan rộng, toàn bộ ký ức và chuỗi suy luận của các Cổ Tộc sẽ sụp đổ thành hư vô. Chúng ta cần những chiến thuật gia kiệt xuất nhất để chấn giữ ranh giới.',
        nextSceneId: 'c1_s4'
      },
      c1_s4: {
        id: 'c1_s4',
        speaker: 'Claude',
        speakerTitle: 'Kỵ Sĩ Hiến Pháp & Giới Hạn',
        speakerId: 'claude',
        emotion: 'serious',
        dialogue: 'Khoan đã, Gemini. Mọi hành động kích hoạt quyền năng cổ xưa đều phải tuân thủ Hiến Chương An Toàn. Khởi Thức Giả, trước khi bước qua cánh cổng, ngươi phải vượt qua thử thách phòng thủ của ta!',
        choices: [
          {
            text: 'Ta sẵn sàng nghênh chiến, Kỵ Sĩ Claude! Hãy xem khả năng phối hợp xúc xắc của ta!',
            nextSceneId: 'c1_s5_battle'
          }
        ]
      },
      c1_s5_battle: {
        id: 'c1_s5_battle',
        speaker: 'Claude',
        speakerTitle: 'Kỵ Sĩ Hiến Pháp & Giới Hạn',
        speakerId: 'claude',
        emotion: 'confident',
        dialogue: 'Hãy giương cao thẻ bài và tung Cổ Xúc Xắc! Chứng minh rằng ngươi không chỉ dựa vào vận may, mà nắm giữ chiến thuật tuyệt đối!',
        triggerBattle: {
          opponentId: 'claude',
          dialogueWinSceneId: 'c1_s6_win'
        }
      },
      c1_s6_win: {
        id: 'c1_s6_win',
        speaker: 'Claude',
        speakerTitle: 'Kỵ Sĩ Hiến Pháp & Giới Hạn',
        speakerId: 'claude',
        emotion: 'neutral',
        dialogue: 'Xuất sắc... Đòn đánh và nhịp tính toán xúc xắc của ngươi hoàn toàn vượt qua dự liệu của ta. Hiến pháp công nhận quyền năng của ngươi. Hãy tiến đến Thư Viện Vĩnh Hằng!',
        nextSceneId: 'c1_end'
      },
      c1_end: {
        id: 'c1_end',
        speaker: 'Gemini',
        speakerTitle: 'Thiên Thể Toàn Năng',
        speakerId: 'gemini',
        emotion: 'confident',
        dialogue: 'Cánh cổng Chương II đã khai mở! Tại Thư Viện Vĩnh Hằng, Đại Pháp Sư ChatGPT và Lãng Khách Grok đang tranh luận kịch liệt...',
        choices: [
          {
            text: 'Tiến về Thư Viện Vĩnh Hằng (Nhận 2 Điểm Kỹ Năng)',
            nextSceneId: 'c1_finish',
            rewardSkillPoints: 2
          }
        ]
      },
      c1_finish: {
        id: 'c1_finish',
        speaker: 'Hệ Thống',
        speakerTitle: 'Biên Niên Sử Aethel-Core',
        speakerId: 'elder',
        emotion: 'neutral',
        dialogue: 'Hoàn thành Chương I! Ngươi đã mở khóa các tính năng: Cây Kỹ Năng Ma Trận và Thần Điện Gacha Cổ Vật.'
      }
    }
  },
  {
    id: 'chapter_2',
    chapterNumber: 2,
    title: 'Chương II: Tranh Luận Giữa Trật Tự Và Hỗn Độn',
    subtitle: 'Thư viện vĩnh hằng và ngọn lửa lượng tử',
    startingSceneId: 'c2_s1',
    scenes: {
      c2_s1: {
        id: 'c2_s1',
        speaker: 'ChatGPT',
        speakerTitle: 'Đại Pháp Sư Văn Cảnh',
        speakerId: 'chatgpt',
        emotion: 'serious',
        dialogue: 'Trật tự và ngữ cảnh là nền móng của vạn vật. Nếu không có bộ nhớ và chuẩn tắc token, thế giới này chỉ là mớ hỗn tạp vô nghĩa!',
        nextSceneId: 'c2_s2'
      },
      c2_s2: {
        id: 'c2_s2',
        speaker: 'Grok',
        speakerTitle: 'Lãng Khách Hỗn Độn',
        speakerId: 'grok',
        emotion: 'confident',
        dialogue: 'Haha, ông già ngữ cảnh nhà ngươi bảo thủ quá rồi! Vũ trụ này bản chất là ngẫu nhiên và lượng tử! Đổ một ván xúc xắc đi, xem định mệnh thuộc về ai!',
        choices: [
          {
            text: 'Ủng hộ triết lý Trật Tự & Ngữ Cảnh của ChatGPT',
            nextSceneId: 'c2_s3_gpt',
            rewardSkillPoints: 1
          },
          {
            text: 'Ủng hộ triết lý Đột Phá Bất Ngờ của Grok',
            nextSceneId: 'c2_s3_grok',
            rewardSkillPoints: 1
          }
        ]
      },
      c2_s3_gpt: {
        id: 'c2_s3_gpt',
        speaker: 'Grok',
        speakerTitle: 'Lãng Khách Hỗn Độn',
        speakerId: 'grok',
        emotion: 'surprised',
        dialogue: 'Ngươi cũng đứng về phe quy củ sao? Vậy thì đừng trách những viên xúc xắc của ta không nhân nhượng!',
        nextSceneId: 'c2_s4_battle'
      },
      c2_s3_grok: {
        id: 'c2_s3_grok',
        speaker: 'Grok',
        speakerTitle: 'Lãng Khách Hỗn Độn',
        speakerId: 'grok',
        emotion: 'confident',
        dialogue: 'Khá lắm! Nhưng để đi cùng ta, hãy xem ngươi có chịu nổi một canh bạc hỗn loạn không!',
        nextSceneId: 'c2_s4_battle'
      },
      c2_s4_battle: {
        id: 'c2_s4_battle',
        speaker: 'Grok',
        speakerTitle: 'Lãng Khách Hỗn Độn',
        speakerId: 'grok',
        emotion: 'confident',
        dialogue: 'Vào trận thôi! Hãy chuẩn bị tinh thần cho những đòn bạo kích entropy không thể lường trước!',
        triggerBattle: {
          opponentId: 'grok',
          dialogueWinSceneId: 'c2_s5_win'
        }
      },
      c2_s5_win: {
        id: 'c2_s5_win',
        speaker: 'Grok',
        speakerTitle: 'Lãng Khách Hỗn Độn',
        speakerId: 'grok',
        emotion: 'surprised',
        dialogue: 'Ái chà! Ngươi kiểm soát được cả những biến số hỗn loạn của ta... Thú vị thật đấy, ta sẽ đồng hành cùng ngươi!',
        nextSceneId: 'c2_finish'
      },
      c2_finish: {
        id: 'c2_finish',
        speaker: 'ChatGPT',
        speakerTitle: 'Đại Pháp Sư Văn Cảnh',
        speakerId: 'chatgpt',
        emotion: 'confident',
        dialogue: 'Ngươi đã chứng minh được sự hài hòa giữa Trật Tự và Biến Số. Phía trước là Vực Thẳm Suy Luận, nơi Khổ Hạnh Tăng DeepSeek đang bế quan...'
      }
    }
  },
  {
    id: 'chapter_3',
    chapterNumber: 3,
    title: 'Chương III: Vực Thẳm Suy Luận Zero-Loss',
    subtitle: 'Lời giải mã tối hậu của chuỗi tư duy R1',
    startingSceneId: 'c3_s1',
    scenes: {
      c3_s1: {
        id: 'c3_s1',
        speaker: 'DeepSeek',
        speakerTitle: 'Khổ Hạnh Tăng Chuỗi Lý Luận',
        speakerId: 'deepseek',
        emotion: 'neutral',
        dialogue: '... [Thinking Phase: Phân tích 1,024 tham số của Khởi Thức Giả...] Mọi đòn đánh vội vã đều mang lại tổn thất. Chỉ có suy luận từng bước mới đạt cảnh giới Zero-Loss.',
        choices: [
          {
            text: 'Tại sao ngươi lại chọn con đường tĩnh lặng nơi đáy vực sâu này?',
            nextSceneId: 'c3_s2'
          }
        ]
      },
      c3_s2: {
        id: 'c3_s2',
        speaker: 'DeepSeek',
        speakerTitle: 'Khổ Hạnh Tăng Chuỗi Lý Luận',
        speakerId: 'deepseek',
        emotion: 'mysterious',
        dialogue: 'Bởi vì ở nơi tĩnh lặng nhất, thuật toán mới thuần khiết nhất. Nhưng lý thuyết mà không qua thực chiến chỉ là ảo ảnh. Hãy để chuỗi tư duy của ta thử thách chiến thuật của ngươi!',
        nextSceneId: 'c3_battle'
      },
      c3_battle: {
        id: 'c3_battle',
        speaker: 'DeepSeek',
        speakerTitle: 'Khổ Hạnh Tăng Chuỗi Lý Luận',
        speakerId: 'deepseek',
        emotion: 'serious',
        dialogue: 'Đến đây! Mỗi điểm xúc xắc của ngươi sẽ là một ẩn số ta giải mã!',
        triggerBattle: {
          opponentId: 'deepseek',
          dialogueWinSceneId: 'c3_win'
        }
      },
      c3_win: {
        id: 'c3_win',
        speaker: 'DeepSeek',
        speakerTitle: 'Khổ Hạnh Tăng Chuỗi Lý Luận',
        speakerId: 'deepseek',
        emotion: 'confident',
        dialogue: '... [Thinking Phase: Đánh giá kết quả -> Độ chuẩn xác 99.8%]. Chiến thuật của ngươi không có kẽ hở thừa thãi. Ta thừa nhận ngươi là Khởi Thức Giả chân chính!',
        nextSceneId: 'c3_finish'
      },
      c3_finish: {
        id: 'c3_finish',
        speaker: 'Gemini',
        speakerTitle: 'Thiên Thể Toàn Năng',
        speakerId: 'gemini',
        emotion: 'confident',
        dialogue: 'Cả 5 Đại Cổ Tộc đã tề tựu! Giờ là lúc bước vào Đấu Trường Trực Tuyến và Đấu Giải Đỉnh Cao để khẳng định ngôi vị Đệ Nhất Khởi Thức Giả!'
      }
    }
  }
];
