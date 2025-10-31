import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, TrendingUp, Users, Award, Target } from 'lucide-react';
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
      description: '共感・丁寧・安心感重視',
      workplace: '美容皮膚科・フェイシャル',
      advice: '丁寧な接客と安心感が強み。リピート率の高い院で輝けます。',
      cta: 'あなたの"おもてなし力"を活かせる美容皮膚科をご紹介します',
      ctaUrl: 'https://lstep.app/form/30554/dnCnUA/44646f'
    },
    technical: {
      icon: Target,
      color: 'from-purple-400 via-pink-400 to-purple-500',
      bgColor: 'bg-gradient-to-br from-purple-50/90 to-pink-50/90',
      chartColor: '#c084fc',
      name: 'テクニカル型',
      description: '成長意欲・技術志向',
      workplace: '美容外科・再生医療',
      advice: '最新施術やオペに携わる環境で力を発揮',
      cta: 'あなたのスキルを伸ばせるクリニックを一緒に見つけましょう',
      ctaUrl: 'https://lstep.app/form/30554/dnCnUA/44646f'
    },
    sales: {
      icon: TrendingUp,
      color: 'from-rose-400 via-pink-400 to-rose-500',
      bgColor: 'bg-gradient-to-br from-rose-50/90 to-pink-50/90',
      chartColor: '#fb7185',
      name: 'セールス型',
      description: '成果・挑戦・収入志向',
      workplace: '自由診療・高歩合クリニック',
      advice: '接遇＋成果で高収入を狙えるタイプ',
      cta: '成果が正当に評価される職場をご紹介します',
      ctaUrl: 'https://lstep.app/form/30554/dnCnUA/44646f'
    },
    counseling: {
      icon: Users,
      color: 'from-pink-400 via-purple-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-pink-50/90 to-purple-50/90',
      chartColor: '#f472b6',
      name: 'カウンセリング型',
      description: '傾聴力・心理的サポート',
      workplace: '医療脱毛・カウンセリング重視院',
      advice: '丁寧なヒアリング力を活かせる職場が最適',
      cta: 'あなたの共感力を活かせる院を無料でご提案',
      ctaUrl: 'https://lstep.app/form/30554/dnCnUA/44646f'
    },
    balance: {
      icon: Sparkles,
      color: 'from-pink-300 via-rose-300 to-pink-400',
      bgColor: 'bg-gradient-to-br from-pink-50/90 to-rose-50/90',
      chartColor: '#fda4af',
      name: 'バランス型',
      description: '協調・柔軟・安定志向',
      workplace: '総合美容クリニック',
      advice: '複数ジャンルで経験を積むと強みが活きる',
      cta: '理想のバランスを叶える転職プランを提案します',
      ctaUrl: 'https://lstep.app/form/30554/dnCnUA/44646f'
    },
    leader: {
      icon: Award,
      color: 'from-rose-400 via-pink-500 to-rose-500',
      bgColor: 'bg-gradient-to-br from-rose-50/90 to-pink-50/90',
      chartColor: '#fb7185',
      name: 'リーダー型',
      description: '教育・マネジメント志向',
      workplace: '大手クリニック・教育担当ポジション',
      advice: 'マネ職や教育担当としての成長に◎',
      cta: 'キャリアアップできる美容ナース転職相談へ',
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
              className="block sm:hidden absolute inset-0 w-full h-full object-contain object-top"
            />
            {/* PC用画像（640px以上で表示） */}
            <img 
              src="/hero-image.png" 
              alt="美容ナース適職診断" 
              className="hidden sm:block w-full h-auto rounded-3xl shadow-2xl"
            />
            
            <div className="absolute top-[30%] sm:absolute sm:bottom-6 sm:top-auto sm:left-1/2 sm:transform sm:-translate-x-1/2 w-full max-w-lg sm:max-w-4xl px-5 sm:px-6 z-10 mx-auto">
              
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-8 shadow-2xl border-2 border-white/70 h-[380px] sm:h-auto flex flex-col justify-between sm:justify-start">
                <p className="text-gray-700 font-bold text-base sm:text-lg mb-6 sm:mb-6 text-center leading-relaxed">
                  ✨ 10問の質問であなたにぴったりの美容医療キャリアを診断します ✨
                </p>
                
                <div className="grid grid-cols-3 gap-4 sm:gap-4 mb-8 sm:mb-6">
                  <div className="bg-pink-50 rounded-xl p-4 sm:p-4 text-center">
                    <div className="text-3xl sm:text-3xl mb-2 sm:mb-1">⏱️</div>
                    <h3 className="font-bold text-sm sm:text-sm mb-1 sm:mb-1 text-gray-800">3分で完了</h3>
                    <p className="text-gray-600 text-xs sm:text-xs">10問の質問</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-4 sm:p-4 text-center">
                    <div className="text-3xl sm:text-3xl mb-2 sm:mb-1">📊</div>
                    <h3 className="font-bold text-sm sm:text-sm mb-1 sm:mb-1 text-gray-800">6タイプ診断</h3>
                    <p className="text-gray-600 text-xs sm:text-xs">詳しく分析</p>
                  </div>
                  
                  <div className="bg-rose-50 rounded-xl p-4 sm:p-4 text-center">
                    <div className="text-3xl sm:text-3xl mb-2 sm:mb-1">💼</div>
                    <h3 className="font-bold text-sm sm:text-sm mb-1 sm:mb-1 text-gray-800">キャリア提案</h3>
                    <p className="text-gray-600 text-xs sm:text-xs">最適な職場</p>
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

  // 結果画面
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
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50 p-4 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        
        <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-700 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_70px_rgba(219,39,119,0.3)] p-6 sm:p-12 border-2 border-white/60">
            
            <div className="text-center mb-10">
              <div className={`inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br ${resultData.color} rounded-full mb-8 shadow-2xl transform hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-14 h-14 text-white drop-shadow-lg" />
              </div>
              
              <div className="inline-block mb-4">
                <div className="text-6xl mb-2 animate-bounce">🎉</div>
              </div>
              
              <h2 className="text-5xl font-black bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent mb-4 tracking-tight">
                診断結果
              </h2>
              
              <div className={`inline-block bg-gradient-to-r ${resultData.color} text-white px-10 py-4 rounded-full text-3xl font-black mb-6 shadow-2xl`}>
                {resultData.name}
              </div>
              
              <p className="text-gray-700 text-xl font-bold">{resultData.description}</p>
            </div>

            <div className="mb-10 bg-white/60 backdrop-blur-xl rounded-[2rem] p-4 sm:p-10 shadow-xl border-2 border-pink-100/50">
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
            </div>

            <div className="space-y-6 mb-10">
              <div className={`${resultData.bgColor} backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border-2 border-white/60`}>
                <h3 className="font-black text-gray-800 mb-4 flex items-center text-xl">
                  <Sparkles className="w-6 h-6 mr-3 text-pink-500" />
                  おすすめ職場
                </h3>
                <p className="text-gray-800 font-bold text-lg">{resultData.workplace}</p>
              </div>

              <div className={`${resultData.bgColor} backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border-2 border-white/60`}>
                <h3 className="font-black text-gray-800 mb-4 flex items-center text-xl">
                  <Target className="w-6 h-6 mr-3 text-purple-500" />
                  キャリアアドバイス
                </h3>
                <p className="text-gray-800 font-bold text-lg">{resultData.advice}</p>
              </div>

              <div className={`${resultData.bgColor} backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border-2 border-white/60`}>
                <h3 className="font-black text-gray-800 mb-4 flex items-center text-xl">
                  <Heart className="w-6 h-6 mr-3 text-rose-500" />
                  次のステップ
                </h3>
                <p className="text-gray-800 mb-6 font-bold text-lg">{resultData.cta}</p>
                <a
                  href={resultData.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full bg-gradient-to-r ${resultData.color} text-white font-black py-5 px-8 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center shadow-xl text-lg`}
                >
                  💌 無料転職相談を申し込む
                </a>
              </div>
            </div>

            <button
              onClick={resetTest}
              className="w-full bg-white/90 backdrop-blur-sm text-gray-700 font-bold py-5 px-8 rounded-full hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 border-3 border-pink-200 text-lg"
            >
              🔄 もう一度診断する
            </button>
          </div>
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
            className="block sm:hidden absolute inset-0 w-full h-full object-contain object-top"
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
              </div>

              <h2 className="text-sm sm:text-lg font-black text-gray-800 mb-2.5 sm:mb-4 leading-snug text-center flex-shrink-0">
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
                      <span className="text-gray-700 group-hover:text-gray-900 font-bold text-xs sm:text-sm leading-tight">
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