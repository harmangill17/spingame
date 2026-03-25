import { useState } from 'react';
import Wheel from './components/Wheel';
import ResultBox from './components/ResultBox';

const ROASTS = [
  "You definitely use ChatGPT to write your forum discussion posts.",
  "Your dorm room smells like unwashed laundry and regret.",
  "You're the reason the group project was submitted at 11:59 PM.",
  "You act like a senior but still check the campus map to find building names.",
  "Your coffee order is 90% milk and syrup, just admit you don't like coffee.",
  "You skip an 8 AM class because 'it's too early', but stay up until 4 AM watching TikToks.",
  "You complain about being broke with an iced matcha latte in your hand.",
  "You brought your high school letterman jacket to college and actually wore it.",
  "You think eating instant ramen three times a day makes you 'independent'.",
  "Your 'study sessions' are just you gossiping in the library for three hours.",
  "You pretend you've read the required reading by aggressively nodding during discussions.",
  "You have 15 tabs open for research and none of them are scholarly articles."
];

const COMPLIMENTS = [
  "You're the person everyone secretly hopes is in their randomly assigned group.",
  "Your fit to that 9 AM lecture had absolutely no right being that fire.",
  "You actually remember people's names after meeting them once at a messy party.",
  "You have the exact type of energy that makes boring classes bearable.",
  "If there was a degree in immaculate vibes, you'd be graduating valedictorian.",
  "You give the best advice in the friend group, even when your own life is chaos.",
  "You somehow always manage to clutch the assignment at the last minute.",
  "Your Spotify playlists are literally saving the aux cord right now.",
  "You're genuinely fun to be around without even trying.",
  "You have that rare ability to effortlessly make anyone feel included."
];

const TRUTHS = [
  "What is the most embarrassing text you've sent to a group chat?",
  "Who in this room would you survive a zombie apocalypse with?",
  "What is the most shameful thing you've done to get points in a class?",
  "Have you ever ghosted someone after setting up a study date?",
  "What's your most controversial opinion about the food on campus?",
  "Who is your secret college crush right now? (Or initials if you're a coward).",
  "What's the longest you've gone without doing laundry this semester?",
  "Have you ever blamed a late assignment on a 'tech issue' when it wasn't true?",
  "What's the worst excuse you've used to leave a party early?",
  "Be honest: what's the most money you've spent on food delivery in one week?"
];

const DARES = [
  "Show the group the last 3 photos in your camera roll. No context.",
  "Let someone in the group send a text to your latest match on Tinder/Hinge.",
  "Do your best impression of our most boring professor.",
  "Let the person to your right post a WhatsApp/Snapchat status from your phone.",
  "Down your drink (or a cup of water) without using your hands.",
  "Speak entirely in a fake British accent until your next turn.",
  "Let the group pick a random contact in your phone and you have to call them and sing 'Happy Birthday'.",
  "Do a dramatic reading of the last text message string you had with your mom.",
  "Switch shirts/jackets with the person to your left for the next 10 minutes.",
  "Hand your phone to the person across from you and let them set your alarm for tomorrow."
];

const MYSTERIES = [
  "If you had to hide a body on campus, where would you put it?",
  "What's the deepest rabbit hole you've gone down at 3 AM?",
  "Describe a conspiracy theory you actually believe in.",
  "If you were a wanted criminal, what would your crime be?",
  "What is the strangest coincidence you've ever experienced?"
];

const TECHNICALS = [
  "Explain what a closure is in JavaScript in under 10 seconds.",
  "Write a regex to validate an email address (on a napkin or in your head).",
  "What's the difference between margin and padding, quick!",
  "Are you a spaces or tabs person? Defend your choice.",
  "Explain the event loop to me like I'm five."
];

export default function App() {
  const [stats, setStats] = useState({ roasts: 0, compliments: 0, truths: 0, dares: 0, mysteries: 0, technicals: 0 });
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
      type === 'technical' ? TECHNICALS : DARES;

    text = pool[Math.floor(Math.random() * pool.length)];

    setStats(prev => ({
      ...prev,
      [type === 'mystery' ? 'mysteries' : type === 'technical' ? 'technicals' : type + 's']: prev[type === 'mystery' ? 'mysteries' : type === 'technical' ? 'technicals' : type + 's'] + 1
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
