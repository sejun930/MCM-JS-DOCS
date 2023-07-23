// 랜덤 문장 뽑기
export const randomContents = [
  "꾸밈이 없는 사람일수록 호감을 산다.",
  "로댕의 생각하는 사람은 세번이나 거절당했던 작품이다.",
  "당신이 깨어, 실천하기 까지는 그 어떤 꿈도 이루어지지 않는다.",
  "가장 훌륭한 기술, 가장 배우기 어려운 기술은 세상을 살아가는 기술이다.",
  "잠들어 꾼 꿈으로 걱정하는 사람은 잠이 깨어서도 꿈꾸고 있는 것과 같다.",
  "괴로움은 인간의 위대한 교사이다.",
  "싸우지 않는 사람은 정복하지 못한다.",
  "방해가 크면 클수록 욕망은 더 커진다.",
  "덕이란 청결이다.",
  "굳은 인내와 노력을 하지 않는 천재는 이 세상에서 있었던 적이 없다.",
  "어린이는 부모의 행동이 거울이다.",
  "일의 기량을 닦기 위해서 가장 중요한 것은 실행과 경험이다.",
  "인간은 기회를 발견하려고 노력하는 동시에, 스스로 그것을 만들어내기도 해야 한다.",
  "재능이 한가지 많은 것이 재능이 한가지 적은 것보다 오히려 더 위험하다.",
  "과거는 잊어버리고 다른 일에 몰두하자. 이것이 고민의 해결책이다.",
  "기억해 내는 힘이 아닌 잊는 힘이야말로 우리들이 살아가는데 더 필요한 것이다.",
  "내 코가 석자",
  "인간은 자신의 단점을 극복할수록 그만큼 교만해진다.",
  "모든 죄악의 기본은 조바심과 게으름이다.",
  "자기 신뢰가 성공의 제 1의 비결이다.",
  "두려움 없는 마음은 가장 빠르게 정상에 도달한다.",
  "성공은 사람의 나쁜 성격을 이끌어 내고, 실패는 좋은 성격을 길러준다.",
  "분노하여 가하는 일격은 종국에 우리는 자신을 때린다.",
  "실험은 많이 하면 할수록 좋은 결과를 기대할 수 있다.",
  "감정에 치우치는 논쟁이 반드시 상대에 대한 모욕이 된다고 할 수는 없다.",
  "그날이 가져다주는 의무를 다할 때까지 하루가 끝났다고 생각지 마라.",
  "남의 앞에 나서는 것을 두려워하지 말라.",
  "그는 지독한 근시 때문에 모든 악보를 외워야만 했다.",
  "궁핍은 영혼과 정신을 낳고, 불행은 위대한 인물을 낳는다.",
  "아테나=전쟁, 지혜, 자수의 여신, 제우스와 메티스의 딸",
  "자기 신뢰는 위대한 사업의 제일의 필요 조건이다.",
  "어린이는 부모의 행동이 거울이다.",
  "앙금이 가라앉기 전에 유종의 미를 잘 거두어라.",
  "모든 습관은 노력에 의해 굳어진다.",
  "헤라=신들의 여왕, 결혼, 질투, 여성의 여신, 제우스의 누나",
  "우리를 망치는 것은 다른 사람들의 눈이다.",
  "만족은 가난한 자를 풍부하게, 풍부한 자를 가난하게 한다.",
  "부모의 좋은 습관보다 더 좋은 어린이 교육은 없다.",
  "만약 지금, 이 일이 당신에게 기회라면 당신의 모든 것을 바쳐야만 한다.",
  "어두운 곳에서는 모든 것이 분명치 않다.",
  "나이를 먹는다고 하는 것은 사물을 볼 줄 알게 됨을 말한다.",
  "나는 과거를 연고하며, 미래를 산다.",
  "작은 일에 너무 관심을 갖는 사람은 대개 큰 일에는 무능해진다.",
  "진짜 결점은 자신의 결점을 알면서도 고치려고 노력하지 않는 것이다.",
  "덕이란 중용이다.",
  "가장 최상의 길은 없다. 많은 사람이 가고 있다면 그 길이 최상이다.",
  "성격은 사람을 안내하는 운명의 지배자이다.",
  "고진감래",
  "교육의 목표는, 사실이 아닌 그 가치에 대한 지식이다.",
  "하나의 모범은 천 마디의 논쟁보다 더 가치 있는 것이다.",
  "현명한 요령은 무엇을 눈감아 주어야 하는가를 아는 것이다.",
  "괴로움이 없는 가난함은 비참한 부자보다 낫다.",
  "작은 성공을 만족스럽게 생각하는 사람은 큰 성공을 얻지 못한다.",
  "사소한 일이라도 시작했으면 끝까지 하라.",
  "열매를 보면 나무를 안다.",
  "남에게 가르치는 것은 반은 배우는 것이 된다.",
  "인생을 소신껏 산다는 것이야말로 단 하나의 성공이다.",
  "결함이 나의 출발의 바탕이고, 무능이 나의 근원이다.",
  "우리의 고뇌는 모두 혼자 있을 수 없는 것에서 초래된다.",
  "가장 나쁜 사람은 용서를 모르는 사람이다.",
  "때가 오면 결말이 난다.",
  "도포 입고 논을 갈아도 제 멋이다.",
  "행복은 습관이다. 그것을 몸에 지니라.",
  "불안이나 두려움을 없애주는 것이 행동이다.",
  "겁이 많은 개일수록 큰소리로 짓는다.",
  "우리 자신이 모든 문제의 원인이며 해결책이다.",
  "큰 기쁨은 슬픔처럼 말이 없는 법이다.",
  "왕국을 다스리는 것보다 가정을 다스리는 편이 어렵다.",
  "철학이 가미되지 않은 웃음은 재채기 같은 유머에 불과하다.",
  "슬기로운 자는 속으로 현명하게 처신하나 겉으로는 어리석게 행동한다.",
  "모자라는 것도 일종의 미다.",
  "금과 은은 불속에서 정련되어야 비로소 빛이 난다.",
  "바보 고치는 약은 없다.",
  "꿈이 없다면, 인생은 쓰다.",
  "바보는 모두가 벽이 있다.",
  "사랑 이야기를 함으로써 사랑하게 된다.",
  "하늘은 견딜 수 없는 슬픔을 인간에게 주지는 않는다.",
  "미래를 알고 싶으면 먼저 지나간 일들을 살피라.",
  "사탄=천국에서 가장 완벽하고 아름다웠다는 천사",
  "기회는 새와 같은 것, 날아가기 전에 꼭 잡아라.",
  "미래는 현재에 의해서 없어진다.",
  "하나의 작은 꽃을 만드는 데도 오랜 세월의 노력이 필요하다.",
  "분노를 억제하지 못하는 것은 절제와 수양이 부족한탓이다.",
  "전화위복",
  "행복하다고 믿어야한다. 그렇지 않으면 행복은 결코 오지 않는다.",
  "거짓말은 불행을 몰고 오는 여신의 기수이다.",
  "그림은 화가의 마음과 보는 사람의 마음을 연결하는 교량이다.",
  "책임은 돈으로 살 수 없다.",
  "평판은 최선의 소개장이다.",
  "능력은 비난 속에서는 시들고 말지만, 격려 가운데서는 꽃을 피우는 법이다.",
  "승자는 눈을 밟아 길을 만들지만. 패자는 눈이 녹기를 기다린다.",
  "인생은 어느덧 지나간다.-그러니까 견딜만 하다.",
  "남이 뭐라고 말하든 자신의 성격대로 살라.",
  "그릇된 믿음이 우리의 모든 불행을 자초합니다.",
  "위대한 과학자는 자신의 탐구에서 아무런 목적도 갖지 않는다.",
  "고집으로 상대방을 이길 수는 없다. 당장 고쳐라.",
  "기쁨이 없는 인생은 기름이 없는 등불과 같다.",
  "겸손하되, 자신의 뜻을 분명히 밝혀라.",
  "고독은 방문하기엔 좋은 장소이나 머물러 있기엔 쓸쓸한 장소다.",
  "모든 깊은 긍정은 깊은 부정에서 시작한다.",
  "인간은 자신의 단점을 극복할수록 그만큼 교만해진다.",
  "만족하면 진보는 멈추게 된다.",
  "이독제독",
  "산이 높을수록 골은 낮다.",
  "당신이 행운을 잡으면 반드시 불행에 빠지는 사람도 있다.",
  "꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다.",
  "제우스=하늘과 올림프스산을 다스리며, 모라신화의 주피터와 동일시",
  "비판하는 사람들의 말에 일일이 대꾸하느라 시간을 낭비하지 마라.",
  "과거는 죽은 것이다.",
  "포세이돈=제우스의 형으로 크로노스를 제압하고 세계를 3등분",
  "살아있는 풀 한 포기 이상의 신비는 없다.",
  "한순간의 판단은 때로 평생의 경험과 맞먹을 만큼의 가치가 있다.",
];
