import { useState, useRef } from 'react';
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
  "Your attendance is higher in canteens than in class",
  "You radiate 'I forgot my pen' energy",
  "Your favorite accessory is a 1% phone battery",
  "You look like you rely on 'we'll see' for your entire life plan",
  "You definitely hit 'remind me tomorrow' on software updates for a year",
  "You look like you cite Wikipedia even when explicitly told not to",
  "Your strategy for group projects is just maintaining a physical presence",
  "You give 'sleeping with eyes open in lectures' vibes",
  "You look like you measure time in 'number of classes left'",
  "Your daily steps count is just walks to the vending machine",
  "You probably have 43 unread group chat messages right now"
];

const COMPLIMENTS = [
  "You look like the one who actually understands what the professor is saying",
  "Group project leader energy detected",
  "Your attendance might be low but your vibe is high",
  "Someone in your class definitely copies your notes",
  "You look like you know shortcuts in life",
  "You probably came here just to avoid class, and honestly respect",
  "Your friends definitely make you explain things to them",
  "You look like you send the best memes in the group chat",
  "If there’s free food, you’ll find it first",
  "You give “last minute assignment but getting an A” energy",
  "You look like you survive exams somehow every time",
  "Plot twist: you’re actually the smart one in your group",
  "You look like you say “easy hai” before exams and mean it",
  "You give “I’ll figure it out” energy and it works",
  "Someone in your friend group is intimidated by your brain",
  "You look like you know what’s happening even when you don’t",
  "You definitely know all the secret campus shortcuts",
  "You give strong “supreme jugaad” energy",
  "You have the perfect 'pretending to take notes' face",
  "You look like the main character of a chill indie movie"
];

const TRUTHS = [
  "Wildest thing you've done to impress someone",
  "Who in your friend group is the most chaotic",
  "What was the most childish thing you still do",
  "What is the most embarrassing thing in your search history right now",
  "Which class do you sleep in the most",
  "Have you ever accidentally sent a text about someone to that person",
  "What is your silliest irrational fear",
  "What's a food combo you love that others think is gross",
  "What's the longest you've gone without doing laundry in college",
  "What is the most ridiculous excuse you've used for missing class"
];

const DARES = [
  "Do your best robot walk across the room 🤖",
  "Give a dramatic movie-style dialogue to a wall",
  "Act like you just won a huge award and give a speech",
  "Do a slow-motion walk for 15 seconds",
  "Pose like a high-fashion model for 5 seconds",
  "Pretend you’re a professor scolding a noisy class",
  "Say one intensely motivational line to the crowd without laughing",
  "Introduce yourself like an enigmatic famous celebrity",
  "Do your best awkward dance move for 10 seconds 💃",
  "Copy the exact posture of the person next to you for 30 seconds",
  "Make your funniest zoomed-in video call face",
  "Pretend your phone just told you that classes are cancelled forever",
  "Show us your best 'pretending to understand the lecture' face",
  "Do your best cartoon villain laugh",
  "Pretend you’re a frantic news reporter live on campus",
  "Act like you just spotted a tray of free pizza",
  "Walk like a superstar entering a random lecture hall",
  "Compliment the shoes of someone nearby",
  "Ask someone nearby what their controversial food opinion is",
  "Try to start a slow clap and see if anyone joins"
];

const MYSTERIES = [
  "If you had a secret underground base on campus, where would the entrance be?",
  "What's the deepest internet rabbit hole you've gone down at 3 AM?",
  "Describe a harmless conspiracy theory you actually believe in.",
  "If you were a chaotic but harmless cryptid, what would you do?",
  "What is the strangest coincidence you've ever experienced during an exam?",
  "If the college was a simulation, what would be the biggest glitch?",
  "What is your weirdest deja vu moment?",
  "If you found a mysterious briefcase in the library, would you open it?",
  "What's an oddly specific superpower you wish you had for college life?",
  "If aliens landed on campus asking for a leader, who would you point to?"
];

const RAPID_FIRES = [
  "Skip class for sleep or skip class for food?",
  "Assignment early panic or last minute panic?",
  "Front bench anxiety or back bench boredom?",
  "Study alone entirely or get distracted with friends?",
  "8 AM class or 5 PM class?",
  "Quiet library or loud canteen?",
  "Messy notes or perfect notes you never read?",
  "Online open book or offline easy exam?",
  "Tedious lab or boring lecture?",
  "Strict attendance or strictly tough grading?",
  "Study 1 productive hour or scroll phone 3 hours pretending?",
  "All-nighter or wake up at 4 AM?",
  "Surprise test today or brutal exam tomorrow?",
  "Free terrible food or expensive decent food?",
  "Flawless group project or stress-free solo project?",
  "Alarm snooze champion or wake up first try psychopath?",
  "Gym session or legendary nap?",
  "No attendance rule but hard exams or strict attendance but easy exams?",
  "Color-coded study plan or chaotic sticky notes?",
  "Pure luck or grinding hard in finals?"
];

export default function App() {
  const [stats, setStats] = useState({ roasts: 0, compliments: 0, truths: 0, dares: 0, mysteries: 0, rapids: 0 });
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState({ type: null, text: 'spin the wheel, grab a drink, and match the vibe... 👀' });
  const [isSpinning, setIsSpinning] = useState(false);
  const recentTextsRef = useRef([]);

  const handleReveal = (type) => {
    let text = '';
    const pool = 
      type === 'roast' ? ROASTS :
      type === 'compliment' ? COMPLIMENTS :
      type === 'truth' ? TRUTHS : 
      type === 'mystery' ? MYSTERIES :
      type === 'rapid' ? RAPID_FIRES : DARES;

    let availableTexts = pool.filter(item => !recentTextsRef.current.includes(item));
    
    // Fallback in case we cycle through all available options in the combined pool 
    if (availableTexts.length === 0) {
      availableTexts = pool;
    }

    text = availableTexts[Math.floor(Math.random() * availableTexts.length)];
    
    // Add to recent queue and limit to last 10
    recentTextsRef.current = [...recentTextsRef.current, text].slice(-10);

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
