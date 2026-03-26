import { useState } from 'react';
import Wheel from './components/Wheel';
import ResultBox from './components/ResultBox';

const ROASTS = [
  "You look like you said “I’ll start studying tomorrow” yesterday",
  "Your brain is buffering… please wait ⏳",
  "You definitely open YouTube “for 5 minutes” before studying",
  "Attendance: questionable. Confidence: very high",
  "You look like you come to college mostly for chai breaks ☕",
  "Your assignments probably travel through many friends before submission",
  "You look like the group member who says “haan ho jayega”",
  "You give strong last-bench energy",
  "You look like you check exam dates one day before",
  "Your study plan sounds good… in theory",
  "Your WiFi speed and study speed are competing",
  "You look like you joined the game just to avoid class",
  "Your notes probably say “ask someone else”",
  "You look like you start studying when panic activates",
  "You give “I’ll copy later” vibes",
  "Your brain opened too many tabs",
  "You look like you know shortcuts… but not the syllabus",
  "Motivation loading… still loading…",
  "You look like the friend who says “bro relax”",
  "You look like you’ve said “proxy laga dena” at least once",
  "Your attendance is higher in canteens than in class"
];

const COMPLIMENTS = [
  "You look like the one who actually understands what the professor is saying",
  "Group project leader energy detected",
  "Your attendance might be low but your vibe is high",
  "You look like you say “I’ll start studying tomorrow”",
  "Someone in your class definitely copies your notes",
  "You look like you know shortcuts in life",
  "You probably came here just to avoid class",
  "Your friends definitely make you explain things to them",
  "You look like you send the best memes in the group chat",
  "If there’s free food, you’ll find it first",
  "You give “last minute assignment” energy",
  "You look like you survive exams somehow every time",
  "Plot twist: you’re actually the smart one in your group",
  "You look like you say “easy hai” before exams",
  "You probably joined this game to waste time (good choice)",
  "You give “I’ll figure it out” energy",
  "Someone in your friend group is scared of your brain",
  "You look like you know what’s happening even when you don’t",
  "You definitely know campus shortcuts",
  "You give strong “jugaad” energy"
];

const TRUTHS = [
  "Wildest thing youve done to impress someone",
  "Who in your friend group is the worst dressed",
  "Who do you think is the best looking person here",
  "What was the most childish thing you still do"
];

const DARES = [
  "Do your best robot walk across the booth 🤖",
  "Say “Sat Sri Akal everyone!” like a stage host",
  "Give a dramatic movie-style dialogue",
  "Act like you just won a big award",
  "Do a slow-motion walk",
  "Pose like a model for 5 seconds",
  "Pretend you’re a teacher taking attendance",
  "Say one motivational line to the crowd",
  "Introduce yourself like a famous celebrity",
  "Do your best dance move for 10 seconds 💃",
  "Copy the person standing next to you for 15 seconds",
  "Make your funniest face for the camera",
  "Pretend your phone just got 100 marks in exams",
  "Show your “exam stress” acting",
  "Do your best villain laugh",
  "Pretend you’re a news reporter on campus",
  "Act like you just found free food on campus",
  "Walk like a superstar entering college",
  "High-five 3 random people ✋",
  "Compliment someone in the crowd",
  "Start a mini clap and get people to join",
  "Ask someone nearby their favorite food quickly",
  "Take a selfie with the ARMSS team",
  "Do a quick handshake with a stranger",
  "FOLLOW armss.gndu on Instagram"
];

const MYSTERIES = [
  "If you had to hide a body on campus, where would you put it?",
  "What's the deepest rabbit hole you've gone down at 3 AM?",
  "Describe a conspiracy theory you actually believe in.",
  "If you were a wanted criminal, what would your crime be?",
  "What is the strangest coincidence you've ever experienced?"
];

const RAPID_FIRES = [
  "Bunk class or attend class?",
  "Assignment early or last minute?",
  "Front bench or back bench?",
  "Study alone or with friends?",
  "Morning class or afternoon class?",
  "Library or canteen?",
  "Notes or YouTube lectures?",
  "Online exam or offline exam?",
  "Lab day or holiday?",
  "Attendance or internal marks?",
  "Study 1 hour or scroll phone 3 hours?",
  "Sleep or assignment?",
  "Exam tomorrow or surprise test today?",
  "Free food or free WiFi?",
  "Group project or solo project?",
  "Alarm snooze or wake up first try?",
  "Gym or nap?",
  "8am class or no attendance rule?",
  "Study plan or panic plan?",
  "Luck or hard work in exams?"
];

export default function App() {
  const [stats, setStats] = useState({ roasts: 0, compliments: 0, truths: 0, dares: 0, mysteries: 0, rapids: 0 });
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState({ type: null, text: 'spin the wheel, grab a drink, and match the vibe... 👀' });
  const [isSpinning, setIsSpinning] = useState(false);

  const handleReveal = (type) => {
    let text = '';
    const pool = 
      type === 'roast' ? ROASTS :
      type === 'compliment' ? COMPLIMENTS :
      type === 'truth' ? TRUTHS : 
      type === 'mystery' ? MYSTERIES :
      type === 'rapid' ? RAPID_FIRES : DARES;

    text = pool[Math.floor(Math.random() * pool.length)];

    setStats(prev => ({
      ...prev,
      [type === 'mystery' ? 'mysteries' : type === 'rapid' ? 'rapids' : type + 's']: prev[type === 'mystery' ? 'mysteries' : type === 'rapid' ? 'rapids' : type + 's'] + 1
    }));

    setResult({ type, text });
    
    setHistory(prev => [{ id: Date.now(), type, text }].concat(prev).slice(0, 8));

    if (type === 'compliment') shootConfetti();
    else if (type === 'dare') shootLightning();
    else shootEmojis(['🔥','👀','😬','💀','🫣','🫠']);
  };

  const shootConfetti = () => {
    const cols=['#c8d870','#e09030','#6a9e30','#e8a020','#4b7bec','#fc5c65','#d0ffd0'];
    for(let i=0;i<60;i++) setTimeout(()=>{
      const el=document.createElement('div'); el.className='bit';
      el.style.cssText=`left:${Math.random()*100}vw;width:${7+Math.random()*9}px;height:${7+Math.random()*9}px;
      background:${cols[~~(Math.random()*cols.length)]};border-radius:${Math.random()>.5?'50%':'2px'};
      --d:${2+Math.random()*2}s;`;
      document.body.appendChild(el); setTimeout(()=>el.remove(),4200);
    },i*25);
  };

  const shootLightning = () => {
    const em=['⚡','⚠️','🚨','❗','💥'];
    for(let i=0;i<18;i++) setTimeout(()=>{
      const el=document.createElement('div'); el.className='emoji-fly';
      el.style.cssText=`font-size:${1.3+Math.random()}rem;left:${Math.random()*100}vw;bottom:0;
      --dur:${1.8+Math.random()*2}s;`;
      el.textContent=em[~~(Math.random()*em.length)];
      document.body.appendChild(el); setTimeout(()=>el.remove(),4000);
    },i*80);
  };

  const shootEmojis = (em) => {
    for(let i=0;i<18;i++) setTimeout(()=>{
      const el=document.createElement('div'); el.className='emoji-fly';
      el.style.cssText=`font-size:${1.3+Math.random()}rem;left:${Math.random()*100}vw;bottom:0;
      --dur:${1.8+Math.random()*2}s;`;
      el.textContent=em[~~(Math.random()*em.length)];
      document.body.appendChild(el); setTimeout(()=>el.remove(),4000);
    },i*80);
  };

  return (
    <>
      <div className="tape" style={{width: 70, height: 18, top: 50, left: 28, transform: 'rotate(-30deg)'}}></div>
      <div className="tape" style={{width: 55, height: 16, top: 80, right: 35, transform: 'rotate(18deg)'}}></div>
      <div className="tape" style={{width: 60, height: 16, bottom: 180, left: 18, transform: 'rotate(-22deg)'}}></div>
      
      {['🍸','🍾','🎓','📚','🍕','💸','🎧','👀','☕','💀'].map((e,i) => (
        <div key={i} className="fd" style={{
          left:`${Math.random()*92}vw`, 
          bottom:`${Math.random()*8}vh`,
          '--dur':`${9+Math.random()*10}s`,
          '--del':`${Math.random()*10}s`,
          '--ro':`${-25+Math.random()*50}deg`
        }}>
          {e}
        </div>
      ))}

      <h1>🔥 The College Spin!! 🍾</h1>

      <div className="layout">
        <Wheel 
          stats={stats} 
          isSpinning={isSpinning}
          setIsSpinning={setIsSpinning}
          onReveal={handleReveal} 
        />
        <ResultBox 
          result={result} 
          history={history} 
          isSpinning={isSpinning} 
        />
      </div>
    </>
  )
}
