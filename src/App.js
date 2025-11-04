import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, TrendingUp, Users, Award, Target, CheckCircle, XCircle, Building2, Stethoscope, Scissors } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [started, setStarted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, [currentQuestion, result, started]);

  const questions = [
    {
      id: 1,
      text: '仕事で一番やりがいを感じる瞬間は？',
      options: [
        { text: '患者さんの笑顔や「ありがとう」をもらえたとき', weights: { hospitality: 3, counseling: 2, balance: 1 } },
        { text: '技術を磨いて自分の成長を感じられたとき', weights: { technical: 3, leader: 1, balance: 1 } },
        { text: '数字や成果が出て評価されたとき', weights: { sales: 3, leader: 1 } }
      ]
    },
    {
      id: 2,
      text: 'チームで働くとき、あなたが意識していることは？',
      options: [
        { text: '周りとのコミュニケーションを大切にする', weights: { hospitality: 2, counseling: 2, balance: 2 } },
        { text: '自分の役割を完璧にこなす', weights: { technical: 3, balance: 1 } },
        { text: '結果を出してチームに貢献する', weights: { sales: 3, leader: 2 } }
      ]
    },
    {
      id: 3,
      text: '新しい知識や技術を学ぶときのスタンスは？',
      options: [
        { text: '丁寧に手順を守って確実に身につけたい', weights: { hospitality: 2, technical: 1, balance: 2 } },
        { text: '実践しながらスピード重視で覚えたい', weights: { sales: 2, leader: 2 } },
        { text: '自分なりに工夫して成果を出したい', weights: { technical: 2, sales: 1, leader: 1 } }
      ]
    },
    {
      id: 4,
      text: 'あなたが美容医療に興味を持ったきっかけは？',
      options: [
        { text: '「人をキレイにして喜ばせたい」と思ったから', weights: { hospitality: 3, counseling: 2 } },
        { text: '医療スキルを新しい分野で活かしたいと思ったから', weights: { technical: 3, balance: 1 } },
        { text: '将来的に収入やキャリアを上げたいと思ったから', weights: { sales: 3, leader: 2 } }
      ]
    },
    {
      id: 5,
      text: '職場でストレスを感じやすいのはどんなとき？',
      options: [
        { text: '人間関係がギスギスしているとき', weights: { hospitality: 2, counseling: 3, balance: 2 } },
        { text: '自分の成長が感じられないとき', weights: { technical: 3, leader: 1 } },
        { text: '努力が数字や評価に反映されないとき', weights: { sales: 3, leader: 1 } }
      ]
    },
    {
      id: 6,
      text: '患者さんとの接し方で、あなたに近いのは？',
      options: [
        { text: '一人ひとりに丁寧に寄り添うタイプ', weights: { hospitality: 3, counseling: 3 } },
        { text: '必要なことを的確に伝えるタイプ', weights: { technical: 2, balance: 2 } },
        { text: '明るくテンポよくコミュニケーションを取るタイプ', weights: { sales: 3, leader: 1 } }
      ]
    },
    {
      id: 7,
      text: 'あなたが大切にしている"働き方の価値観"は？',
      options: [
        { text: '安心・安定して長く働けること', weights: { hospitality: 2, balance: 3 } },
        { text: 'スキルアップ・専門性の向上', weights: { technical: 3, leader: 1 } },
        { text: '成果が評価される環境で挑戦すること', weights: { sales: 3, leader: 2 } }
      ]
    },
    {
      id: 8,
      text: '将来的に目指したいキャリア像は？',
      options: [
        { text: '美容皮膚科でリピーターに信頼されるナース', weights: { hospitality: 3, counseling: 2, balance: 1 } },
        { text: '美容外科で技術を極めるスペシャリスト', weights: { technical: 3, leader: 1 } },
        { text: '売上・評価を伸ばすトップナース', weights: { sales: 3, leader: 2 } }
      ]
    },
    {
      id: 9,
      text: '職場選びで一番重視したいポイントは？',
      options: [
        { text: '人間関係・雰囲気の良さ', weights: { hospitality: 2, counseling: 2, balance: 2 } },
        { text: '教育体制・成長機会', weights: { technical: 2, leader: 3 } },
        { text: '給与・評価・待遇の良さ', weights: { sales: 3, balance: 1 } }
      ]
    },
    {
      id: 10,
      text: 'どんな職場で一番輝けると思う？',
      options: [
        { text: '丁寧な接客で信頼を積み重ねる職場', weights: { hospitality: 3, counseling: 2 } },
        { text: 'スピード感とスキルを求められる現場', weights: { technical: 3, sales: 1 } },
        { text: '成果が数字で見える競争的な職場', weights: { sales: 3, leader: 2 } }
      ]
    }
  ];

  const resultTypes = {
    hospitality: {
      icon: Heart,
      color: 'from-pink-400 via-rose-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-pink-50/90 to-rose-50/90',
      chartColor: '#f472b6',
      name: 'ホスピタリティ型',
      catchphrase: 'あなたは心で支える癒しのプロ',
      description: 'あなたは、患者さんの小さな変化や不安に気づける「共感力」と「安心感を与える力」の持ち主。一人ひとりに寄り添い、丁寧な接客で信頼を築くことに喜びを感じるタイプです✨',
      strengths: [
        '患者さんの小さな変化や不安に気づける',
        '丁寧な接客で安心感を与えられる',
        'リピート率を高められる',
        '落ち着いた雰囲気づくりが得意'
      ],
      weaknesses: [
        'スピード重視の現場',
        '接客時間が短すぎる環境',
        '成果だけで評価される職場',
        '流れ作業のような施術'
      ],
      recommendedWorkplaces: [
        {
          icon: Stethoscope,
          title: '美容皮膚科クリニック',
          description: 'フェイシャルやスキンケア治療を中心に、患者さんと長期的な関係を築けます。カウンセリング時間もしっかり取れ、一人ひとりに寄り添った接客ができる環境です。',
          suitable: '丁寧なカウンセリングを大切にしたい人'
        },
        {
          icon: Sparkles,
          title: 'メディカルエステ',
          description: 'リラックスした雰囲気の中で、美と癒しを提供できます。施術中の会話も大切にされ、患者さんとの距離が近い環境で働けます。',
          suitable: '癒しの空間づくりが好きな人'
        },
        {
          icon: Heart,
          title: '美容皮膚科（アンチエイジング専門）',
          description: '長期的なケアプランを提案し、患者さんの変化を見守れます。信頼関係を築きながら、継続的なサポートができる職場です。',
          suitable: '長く患者さんを支えたい人'
        }
      ],
      summary: 'あなたの「おもてなしの心」は、患者さんに安心と信頼を与える大きな武器。丁寧な接客を大切にする職場なら、あなたの強みが最大限に活きます💕',
      ctaUrl: 'https://lstep.app/form/30554/dnCnUA/44646f'
    },
    technical: {
      icon: Target,
      color: 'from-purple-400 via-pink-400 to-purple-500',
      bgColor: 'bg-gradient-to-br from-purple-50/90 to-pink-50/90',
      chartColor: '#c084fc',
      name: 'テクニカル型',
      catchphrase: 'あなたは技術を極めるスペシャリスト',
      description: 'あなたは、高い「向上心」と「技術へのこだわり」を持つタイプ。最新の施術や医療機器に触れ、スキルを磨き続けることに喜びを感じます。専門性を高めることで、唯一無二の存在になれるでしょう✨',
      strengths: [
        '新しい技術や知識の習得が早い',
        '細かい手技にこだわれる',
        '向上心が高く、常に学び続けられる',
        '専門性を活かしてキャリアアップできる'
      ],
      weaknesses: [
        '単調な業務ばかりの職場',
        '成長機会がない環境',
        '教育制度が整っていない職場',
        '古い技術しか使えない環境'
      ],
      recommendedWorkplaces: [
        {
          icon: Scissors,
          title: '美容外科クリニック',
          description: 'オペ介助や高度な施術に携われます。最新の医療技術に触れながら、専門的なスキルを身につけられる環境です。',
          suitable: '高度な技術を習得したい人'
        },
        {
          icon: Target,
          title: '再生医療・美容皮膚科',
          description: '最先端の美容医療技術を学べます。PRP療法やレーザー治療など、専門性の高い施術スキルを磨けます。',
          suitable: '最新技術を学びたい人'
        },
        {
          icon: Award,
          title: '大手美容クリニック',
          description: '充実した研修制度と最新機器が揃った環境。技術認定制度があり、スキルアップが明確に評価されます。',
          suitable: '体系的にスキルを学びたい人'
        }
      ],
      summary: 'あなたの「技術へのこだわり」は、美容医療の現場で大きな強み。最新技術を学べる環境なら、あなたの成長意欲が存分に発揮されます🔥',
      ctaUrl: 'https://lstep.app/form/30554/dnCnUA/44646f'
    },
    sales: {
      icon: TrendingUp,
      color: 'from-rose-400 via-pink-400 to-rose-500',
      bgColor: 'bg-gradient-to-br from-rose-50/90 to-pink-50/90',
      chartColor: '#fb7185',
      name: 'セールス型',
      catchphrase: 'あなたは成果で輝く実力派',
      description: 'あなたは、「目標達成意欲」と「行動力」を兼ね備えたタイプ。数字や成果が見える環境でこそ、モチベーションが高まります。努力が正当に評価され、収入アップを目指せる職場で輝けるでしょう✨',
      strengths: [
        '目標を設定して達成する力が強い',
        '患者さんのニーズを引き出せる',
        '成果を出すための工夫ができる',
        'モチベーションを維持する力がある'
      ],
      weaknesses: [
        '成果が評価されない職場',
        '固定給のみの環境',
        'ノルマがない緩い職場',
        '挑戦する機会がない環境'
      ],
      recommendedWorkplaces: [
        {
          icon: TrendingUp,
          title: '自由診療クリニック',
          description: 'インセンティブ制度があり、成果が収入に直結します。提案力を活かして、患者さんに最適なプランを提案できます。',
          suitable: '成果を収入で実感したい人'
        },
        {
          icon: Sparkles,
          title: '大手美容クリニック（歩合制）',
          description: '明確な評価制度と高いインセンティブが魅力。売上目標を達成することで、大きく収入を伸ばせます。',
          suitable: '高収入を目指したい人'
        },
        {
          icon: Award,
          title: '美容皮膚科（カウンセリング重視）',
          description: 'カウンセリング力を活かして、患者さんに最適な施術プランを提案。成約率に応じたインセンティブがあります。',
          suitable: '提案力を活かしたい人'
        }
      ],
      summary: 'あなたの「成果へのこだわり」は、美容医療業界で高く評価される力。努力が正当に評価される環境なら、収入もキャリアも大きく伸ばせます💰',
      ctaUrl: 'https://lstep.app/form/30554/dnCnUA/44646f'
    },
    counseling: {
      icon: Users,
      color: 'from-pink-400 via-purple-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-pink-50/90 to-purple-50/90',
      chartColor: '#f472b6',
      name: 'カウンセリング型',
      catchphrase: 'あなたは心に寄り添う傾聴のプロ',
      description: 'あなたは、「傾聴力」と「共感力」に優れたタイプ。患者さんの本当の悩みを引き出し、心に寄り添ったサポートができます。信頼関係を築きながら、長期的なケアを提供することに喜びを感じるでしょう✨',
      strengths: [
        '患者さんの本音を引き出せる',
        '悩みに寄り添った提案ができる',
        '信頼関係を築くのが得意',
        '心理的なサポートができる'
      ],
      weaknesses: [
        'カウンセリング時間が短い職場',
        '数字だけを求められる環境',
        '流れ作業のような接客',
        '深い関係を築けない職場'
      ],
      recommendedWorkplaces: [
        {
          icon: Heart,
          title: 'カウンセリング重視クリニック',
          description: '初回カウンセリングに時間をかけ、患者さんの悩みをじっくり聞けます。心に寄り添った提案ができる環境です。',
          suitable: 'じっくり話を聞きたい人'
        },
        {
          icon: Users,
          title: '医療脱毛専門クリニック',
          description: '複数回の施術を通じて、患者さんと長期的な関係を築けます。不安や悩みに寄り添いながらサポートできます。',
          suitable: '長期的に支えたい人'
        },
        {
          icon: Sparkles,
          title: 'アンチエイジング専門クリニック',
          description: '患者さんの人生に寄り添った美容医療を提供。継続的なカウンセリングで、信頼関係を深められます。',
          suitable: '人生に寄り添いたい人'
        }
      ],
      summary: 'あなたの「傾聴力」は、患者さんの心を開く鍵。じっくりカウンセリングできる環境なら、あなたの共感力が最大限に活きます💕',
      ctaUrl: 'https://lstep.app/form/30554/dnCnUA/44646f'
    },
    balance: {
      icon: Sparkles,
      color: 'from-pink-300 via-rose-300 to-pink-400',
      bgColor: 'bg-gradient-to-br from-pink-50/90 to-rose-50/90',
      chartColor: '#fda4af',
      name: 'バランス型',
      catchphrase: 'あなたは柔軟に対応できるオールラウンダー',
      description: 'あなたは、「協調性」と「柔軟性」を兼ね備えたタイプ。どんな環境にも適応でき、チームの潤滑油として活躍できます。幅広い経験を積むことで、あなただけの強みを見つけられるでしょう✨',
      strengths: [
        'どんな職場にも適応できる',
        'チームワークを大切にできる',
        '臨機応変な対応ができる',
        '幅広いスキルを身につけられる'
      ],
      weaknesses: [
        '専門性を極端に求められる職場',
        '個人主義の強い環境',
        '変化がなさすぎる職場',
        '一人で全て完結する業務'
      ],
      recommendedWorkplaces: [
        {
          icon: Building2,
          title: '総合美容クリニック',
          description: '美容皮膚科から美容外科まで、幅広い診療科目がある環境。多様な経験を積みながら、自分の強みを見つけられます。',
          suitable: '色々な経験を積みたい人'
        },
        {
          icon: Sparkles,
          title: '美容皮膚科（複数施術）',
          description: 'レーザー、注入、スキンケアなど、様々な施術に携われます。バランスよくスキルを身につけられる環境です。',
          suitable: 'バランス良く学びたい人'
        },
        {
          icon: Heart,
          title: '地域密着型クリニック',
          description: 'アットホームな雰囲気で、患者さんと長く関われます。チームワークを大切にしながら、安定して働けます。',
          suitable: '安定して働きたい人'
        }
      ],
      summary: 'あなたの「柔軟性」は、どんな職場でも重宝される力。幅広い経験を積める環境なら、あなただけの強みが見つかります🌈',
      ctaUrl: 'https://lstep.app/form/30554/dnCnUA/44646f'
    },
    leader: {
      icon: Award,
      color: 'from-rose-400 via-pink-500 to-rose-500',
      bgColor: 'bg-gradient-to-br from-rose-50/90 to-pink-50/90',
      chartColor: '#fb7185',
      name: 'リーダー型',
      catchphrase: 'あなたはチームを導くマネジメントのプロ',
      description: 'あなたは、「リーダーシップ」と「教育力」を兼ね備えたタイプ。後輩の成長をサポートし、チーム全体のレベルアップに貢献できます。マネジメント職として、大きなやりがいを感じられるでしょう✨',
      strengths: [
        '後輩の教育・指導が得意',
        'チーム全体を見渡せる',
        '目標達成に向けて導ける',
        'マネジメントスキルがある'
      ],
      weaknesses: [
        '教育制度がない職場',
        '個人プレーが求められる環境',
        'キャリアアップの道がない職場',
        '一人で黙々と働く業務'
      ],
      recommendedWorkplaces: [
        {
          icon: Award,
          title: '大手美容クリニック（教育担当）',
          description: '新人教育や研修制度が充実。教育担当として、後輩の成長をサポートできる環境です。',
          suitable: '教育に携わりたい人'
        },
        {
          icon: TrendingUp,
          title: '美容クリニック（主任・師長）',
          description: 'マネジメント職として、チーム運営に携われます。スタッフ育成や目標達成に向けて、リーダーシップを発揮できます。',
          suitable: 'マネジメントしたい人'
        },
        {
          icon: Building2,
          title: '複数院展開クリニック',
          description: 'エリアマネージャーや教育責任者として、複数の院を統括できます。より大きな視点でキャリアを築けます。',
          suitable: '大きな責任を持ちたい人'
        }
      ],
      summary: 'あなたの「リーダーシップ」は、組織を成長させる原動力。教育やマネジメントに携われる環境なら、あなたの力が存分に発揮されます👑',
      ctaUrl: 'https://lstep.app/form/30554/dnCnUA/44646f'
    }
  };

  const calculateResult = (answerList) => {
    const scores = {
      hospitality: 0,
      technical: 0,
      sales: 0,
      counseling: 0,
      balance: 0,
      leader: 0
    };

    answerList.forEach(answer => {
      Object.keys(answer.weights).forEach(type => {
        scores[type] += answer.weights[type];
      });
    });

    const maxScore = Math.max(...Object.values(scores));
    const topType = Object.keys(scores).find(key => scores[key] === maxScore);

    return { type: topType, scores };
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const resultData = calculateResult(newAnswers);
      setResult(resultData);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setStarted(false);
  };

  // スタート画面
  if (!started && !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50 flex items-center justify-center p-0 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        
        <div className={`w-full max-w-6xl mx-auto relative z-10 transition-all duration-700 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          <div className="relative min-h-screen sm:min-h-0 flex items-center justify-center sm:block bg-gradient-to-br from-pink-50 to-purple-50 sm:bg-transparent">
            {/* スマホ用画像（640px未満で表示） */}
            <img 
              src="/hero-image-mobile.png" 
              alt="美容ナース適職診断" 
              className="block sm:hidden absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* PC用画像（640px以上で表示） */}
            <img 
              src="/hero-image.png" 
              alt="美容ナース適職診断" 
              className="hidden sm:block w-full h-auto rounded-3xl shadow-2xl"
            />
            
            <div className="absolute top-[30%] sm:absolute sm:bottom-6 sm:top-auto sm:left-1/2 sm:transform sm:-translate-x-1/2 w-full max-w-lg sm:max-w-4xl px-5 sm:px-6 z-10 mx-auto">
              
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-8 shadow-2xl border-2 border-white/70 h-[380px] sm:h-auto flex flex-col justify-between sm:justify-start">
                <div className="text-gray-700 font-bold text-sm sm:text-lg mb-6 sm:mb-6 text-center leading-tight px-1">
                  <p>✨10問の質問であなたにぴったりの✨</p>
                  <p>✨美容医療キャリアを診断します✨</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 sm:gap-4 mb-8 sm:mb-6">
                  <div className="bg-pink-50 rounded-xl p-4 sm:p-4 text-center">
                    <div className="text-3xl sm:text-3xl mb-2 sm:mb-1">⏱️</div>
                    <h3 className="font-bold text-sm sm:text-sm text-gray-800">
                      <div>3分で</div>
                      <div>完了</div>
                    </h3>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-4 sm:p-4 text-center">
                    <div className="text-3xl sm:text-3xl mb-2 sm:mb-1">📊</div>
                    <h3 className="font-bold text-sm sm:text-sm text-gray-800">
                      <div>6タイプ</div>
                      <div>診断</div>
                    </h3>
                  </div>
                  
                  <div className="bg-rose-50 rounded-xl p-4 sm:p-4 text-center">
                    <div className="text-3xl sm:text-3xl mb-2 sm:mb-1">💼</div>
                    <h3 className="font-bold text-gray-800">
                      <div className="text-xs sm:text-sm">キャリア</div>
                      <div className="text-sm sm:text-sm">提案</div>
                    </h3>
                  </div>
                </div>
                
                <button
                  onClick={() => setStarted(true)}
                  className="w-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-white font-black text-lg sm:text-xl py-5 sm:py-5 px-6 sm:px-12 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                >
                  ✨ 診断をはじめる
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 結果画面（LP風）
  if (result) {
    const resultData = resultTypes[result.type];
    const IconComponent = resultData.icon;

    const maxScore = Math.max(...Object.values(result.scores));
    const radarData = Object.keys(resultTypes).map(key => ({
      subject: resultTypes[key].name.replace('型', ''),
      score: result.scores[key],
      fullMark: maxScore
    }));

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        
        <div className={`max-w-4xl mx-auto relative z-10 py-8 px-4 sm:px-8 transition-all duration-700 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          {/* ヘッダー部分 */}
          <div className={`bg-gradient-to-br ${resultData.color} rounded-3xl p-8 sm:p-12 mb-8 text-white shadow-2xl`}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-xl">
                <IconComponent className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                🎨 あなたは
              </h2>
              <div className="text-4xl sm:text-5xl font-black mb-6">
                《{resultData.name}》
              </div>
              <p className="text-xl sm:text-2xl font-bold">
                {resultData.catchphrase}
              </p>
            </div>
          </div>

          {/* タイプの詳細説明 */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 mb-8 shadow-xl">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {resultData.description}
            </p>
          </div>

          {/* レーダーチャート */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 mb-8 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-800 mb-6 text-center">
              📊 総合評価
            </h3>
            <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 280 : 320}>
              <RadarChart data={radarData}>
                <PolarGrid strokeDasharray="3 3" stroke="#fecdd3" strokeWidth={2} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#831843', fontSize: 10, fontWeight: 700 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, maxScore]} tick={false} />
                <Radar
                  name="適性スコア"
                  dataKey="score"
                  stroke={resultData.chartColor}
                  fill={resultData.chartColor}
                  fillOpacity={0.6}
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
            <p className="text-center text-gray-700 font-bold mt-6">
              {resultData.summary}
            </p>
          </div>

          {/* 強みと苦手な環境 */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 mb-8 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-800 mb-6 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-pink-500" />
              💡 あなたの強みと苦手な環境
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-lg font-black text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                  💪 あなたの強み
                </h4>
                <ul className="space-y-3">
                  {resultData.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-black text-gray-800 mb-4 flex items-center">
                  <XCircle className="w-6 h-6 mr-2 text-red-500" />
                  😓 あなたが苦手な環境
                </h4>
                <ul className="space-y-3">
                  {resultData.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2 flex-shrink-0">✗</span>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* おすすめの職場 */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 mb-8 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-800 mb-6 flex items-center">
              <Building2 className="w-8 h-8 mr-3 text-purple-500" />
              💼 あなたにおすすめの美容クリニック・職場
            </h3>
            
            <div className="space-y-6">
              {resultData.recommendedWorkplaces.map((workplace, index) => {
                const WorkplaceIcon = workplace.icon;
                return (
                  <div key={index} className={`${resultData.bgColor} rounded-2xl p-6 border-2 border-white/60`}>
                    <div className="flex items-start mb-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${resultData.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                        <WorkplaceIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-black text-gray-800 mb-2">
                          {workplace.title}
                        </h4>
                        <p className="text-sm text-gray-600 font-bold mb-3">
                          ＜仕事内容＞
                        </p>
                        <p className="text-gray-700 mb-3">
                          {workplace.description}
                        </p>
                        <p className="text-sm text-gray-600 font-bold mb-2">
                          ＜こんな人におすすめ！＞
                        </p>
                        <p className="text-gray-700 flex items-start">
                          <span className="text-pink-500 mr-2">✓</span>
                          {workplace.suitable}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 mb-8 shadow-xl text-center">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-800 mb-4">
              🌟 次のステップへ
            </h3>
            <p className="text-gray-700 mb-6 font-bold text-base sm:text-lg">
              あなたにぴったりの美容ナース転職をサポートします
            </p>
            <a
              href={resultData.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block bg-gradient-to-r ${resultData.color} text-white font-black py-5 px-12 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl text-base sm:text-lg mb-4`}
            >
              💌 無料転職相談を申し込む
            </a>
            <p className="text-sm text-gray-600">
              ※ 完全無料・1分で申し込み完了
            </p>
          </div>

          {/* もう一度診断するボタン */}
          <button
            onClick={resetTest}
            className="w-full bg-white/90 backdrop-blur-sm text-gray-700 font-bold py-5 px-8 rounded-full hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-pink-200 text-base sm:text-lg"
          >
            🔄 もう一度診断する
          </button>
        </div>
      </div>
    );
  }

  // 質問画面
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50 flex items-center justify-center p-0 sm:p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      
      <div className={`w-full max-w-6xl mx-auto relative z-10 transition-all duration-700 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        <div className="relative min-h-screen sm:min-h-0 flex items-center justify-center sm:block bg-gradient-to-br from-pink-50 to-purple-50 sm:bg-transparent">
          {/* スマホ用画像（640px未満で表示） */}
          <img 
            src="/hero-image-mobile.png" 
            alt="美容ナース適職診断" 
            className="block sm:hidden absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* PC用画像（640px以上で表示） */}
          <img 
            src="/hero-image.png" 
            alt="美容ナース適職診断" 
            className="hidden sm:block w-full h-auto rounded-3xl shadow-2xl"
          />
          
          <div className="absolute top-[30%] sm:absolute sm:bottom-3 sm:top-auto sm:left-1/2 sm:transform sm:-translate-x-1/2 w-full max-w-lg sm:max-w-4xl px-5 sm:px-4 z-10 mx-auto">
            
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-white/70 h-[450px] sm:h-auto flex flex-col justify-between sm:justify-start">
              
              <div className="mb-3 sm:mb-4 flex-shrink-0">
                <div className="flex justify-between items-center mb-3 sm:mb-2">
                  <span className="text-sm sm:text-xs font-black text-pink-600 bg-pink-100 px-4 sm:px-3 py-1.5 sm:py-1 rounded-full">
                    質問 {currentQuestion + 1} / {questions.length}
                  </span>
                  <span className="text-sm sm:text-xs text-pink-500 font-black bg-pink-50 px-4 sm:px-3 py-1.5 sm:py-1 rounded-full">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-pink-100 rounded-full h-2.5 sm:h-2 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 h-2.5 sm:h-2 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
                {currentQuestion > 0 && (
                  <div className="mt-2 sm:mt-3">
                    <button
                      onClick={handleBack}
                      className="text-xs sm:text-sm text-gray-600 hover:text-pink-600 font-bold flex items-center gap-1 transition-colors whitespace-nowrap"
                    >
                      <span>←</span>
                      <span>前の質問に戻る</span>
                    </button>
                  </div>
                )}
              </div>

              <h2 className="text-xs sm:text-lg font-black text-gray-800 mb-2.5 sm:mb-4 leading-relaxed text-center flex-shrink-0">
                {questions[currentQuestion].text}
              </h2>
              
              <div className="space-y-2 sm:space-y-2.5 flex-1 overflow-y-auto">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border-2 border-pink-100 hover:border-pink-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group active:scale-95"
                  >
                    <div className="flex items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 group-hover:from-pink-400 group-hover:to-purple-400 flex items-center justify-center mr-2.5 sm:mr-3 transition-all duration-300 flex-shrink-0 shadow-md">
                        <span className="text-pink-700 group-hover:text-white font-black transition-colors text-xs sm:text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900 font-bold text-[11px] sm:text-sm leading-relaxed">
                        {option.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;