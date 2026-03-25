import { useState } from 'react';
import Wheel from './components/Wheel';
import ResultBox from './components/ResultBox';

const ROASTS = [
  "Your WiFi password is probably 'password123' and you know it.",
  "Your vibe is 'alarm set, snooze hit 7 times, still late'.",
  "Even your shadow wants to stay two steps behind you.",
  "Your fashion sense called — it left a voicemail in 2009.",
  "You type with two fingers and refuse to learn otherwise. Iconic.",
  "Your playlist is just movie soundtracks you call your 'personality'.",
  "You've explained how busy you are more times than you've actually been busy.",
  "Your group project contribution was 'sending the WhatsApp'.",
  "Your browser has 47 open tabs and you're proud of it.",
  "You've watched the same comfort show 6 times instead of trying something new.",
  "Your LinkedIn bio has three buzzwords and zero actual achievements.",
  "The last book you finished had more pictures than words.",
  "You correct people's grammar but spell 'definitely' as 'definately'.",
  "You send voice notes longer than 3 minutes. You're a menace.",
  "Your idea of meal prep is ordering extra fries to save for later.",
  "You've ghosted a dentist appointment for over two years. We know.",
  "You call it 'multitasking' — everyone else calls it doing nothing properly.",
  "Your confidence is not backed by evidence and honestly, respect.",
  "You've convinced yourself procrastinating is 'letting ideas marinate'.",
  "Your idea of exercising is standing in the shower a little longer.",
  "Your camera roll is 97% memes, 2% selfies, 1% something you needed.",
  "You've said 'I'm almost there' while still in bed. Multiple times.",
  "Your situationship lasted longer than some people's marriages.",
  "You still owe someone money and conveniently 'forgot'.",
  "You've told someone 'we should hang out!' 6 months ago. Still waiting.",
  "Your laptop has a crack in the screen and you call it 'character'.",
  "You've set 8 phone reminders and still forgot the one thing.",
  "Your excuse game is strong. Your follow-through game is... not.",
  "Your coffee order takes 45 seconds to say and it still tastes the same.",
  "You've been 'almost done' with that assignment for 6 hours straight.",
  "You consider opening an app as 'doing research'. Respect the delusion.",
  "Your handwriting is being sued by the alphabet for defamation.",
  "You use 'I'm an introvert' as a reason for literally everything.",
  "You've watched a 3-hour podcast at 2x speed and called it 'learning'.",
  "Your plant died. You replaced it with a fake one. Zero shame.",
  "You still have 11,000 unread emails and somehow you're doing fine.",
  "You said 'I'll sleep early tonight' and then it was 3am somehow.",
  "You've had an idea for a startup for 2 years. The idea is still an idea.",
  "You gave a 10-minute explanation when 'yes' was the entire answer.",
  "Your aesthetic is 'I had a plan but life happened in week 1'.",
  "You've attended more networking events than you've done actual work.",
  "Your phone storage is full of apps you opened once in 2022.",
  "You describe yourself as 'brutally honest' when you're just... brutal.",
  "You once said 'I don't need instructions' then needed 3 hours of help.",
  "You call yourself a morning person but sleep through your first three alarms.",
  "You've explained 'I'm not like other people' to people who didn't ask.",
  "Your notes app is a graveyard of unfinished 'great ideas'.",
  "You've joined 4 clubs this semester and gone to exactly 1 meeting total.",
  "You screenshot the meme but never actually send it to anyone.",
  "Your internship application has been 'almost ready' since October."
];

const COMPLIMENTS = [
  "You walk into a room and the energy immediately gets better. Superpower.",
  "Your laugh is the kind that makes strangers smile without knowing why.",
  "You remember the little things people say — that makes you genuinely rare.",
  "Somehow you make hard things look effortless. People have no idea how hard you work.",
  "You're the friend everyone calls when things fall apart. That means everything.",
  "Your creativity is genuinely original — not just impressive. Almost nobody is.",
  "You have this calm under pressure that makes everyone around you feel safe.",
  "You're the type of person who still has 100% battery at 6pm. We see you.",
  "Your ability to find something positive in any situation is borderline magical.",
  "People leave conversations with you feeling smarter. That's a rare gift.",
  "You've got quiet confidence — the kind that doesn't need to prove itself.",
  "Your style is 100% yours. No trend, no influence — just you. Respect.",
  "You make people feel genuinely heard, not just listened to. Big difference.",
  "You don't just show up — you show up prepared, thoughtful, and on time.",
  "Your ambition is contagious. Being around you makes people want to do more.",
  "You think before you speak and the world desperately needs more of that.",
  "How you handle criticism says more about you than your achievements do.",
  "You have excellent taste — in music, people, food, everything. Curated life.",
  "You're someone who actually finishes what they start. Honestly legendary.",
  "Your jokes land because they're actually clever, not just loud.",
  "You notice when people are off before they say anything. Emotional genius.",
  "Your work ethic is quieter than most people's excuses and louder than their results.",
  "You give credit where it's due — people are loyal to you because of that.",
  "You ask the best questions in any room. That's rarer than any answer.",
  "You make things happen when everyone else is still in the planning phase.",
  "You're the kind of smart that doesn't make other people feel small.",
  "You know when to lead and when to let others shine. Real leadership.",
  "People trust you with things they don't tell anyone else. You earned that.",
  "You're the person in the group who actually reads the instructions. Thank you.",
  "You've got this rare ability to be both silly and serious at the right time.",
  "Your eye for detail saves projects, relationships, and probably lives.",
  "You show up differently than you did a year ago and it shows. Growth is on you.",
  "You make even mundane things interesting. That's a storytelling superpower.",
  "Your standards are high and you never apologize for that. Keep going.",
  "You're the reason someone believed they could do something hard. You don't even know.",
  "You carry your wins quietly and your struggles even quieter. That's strength.",
  "You're one of the rare few who give as much energy as they take.",
  "Your determination embarrasses people's excuses — in the best way.",
  "You care about the craft, not just the result. That's how legends are made.",
  "Even when you don't know the answer, you know how to find it. Invaluable.",
  "Your energy in a team lifts everyone's floor. You're the rising tide.",
  "You're someone who people want to make proud. That's not a small thing.",
  "You have the patience of someone twice your age and the energy of someone half it.",
  "You are genuinely, 100%, one of a kind. There's no algorithm for you.",
  "You actually read the group chat. You're a hero among men.",
  "Your presentations don't make people want to sleep. That's rarer than you think.",
  "You reply to emails the same day. Literally nobody does that. Legend.",
  "You're the first one to clap for someone else's win. That says everything.",
  "Your vibe makes group projects not miserable. That's an actual superpower.",
  "You're the person people quote later without realizing it. That's real influence.",
];

export default function App() {
  const [stats, setStats] = useState({ roasts: 0, compliments: 0, total: 0 });
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState({ type: null, text: 'spin the wheel to get your fate... 👀' });
  const [isSpinning, setIsSpinning] = useState(false);

  const handleReveal = (type) => {
    let finalType = type;
    let text = '';
    
    if (type === 'mystery') finalType = Math.random() > 0.5 ? 'roast' : 'compliment';
    
    if (type === 'double') {
      finalType = Math.random() > 0.5 ? 'roast' : 'compliment';
      const pool = finalType === 'roast' ? ROASTS : COMPLIMENTS;
      const r1 = pool[Math.floor(Math.random() * pool.length)];
      const r2 = pool[Math.floor(Math.random() * pool.length)];
      text = `⚡ DOUBLE!! ⚡\n\n${r1}\n\n...AND...\n\n${r2}`;
    } else {
      const pool = finalType === 'roast' ? ROASTS : COMPLIMENTS;
      text = pool[Math.floor(Math.random() * pool.length)];
    }

    setStats(prev => ({
      total: prev.total + 1,
      roasts: finalType === 'roast' ? prev.roasts + 1 : prev.roasts,
      compliments: finalType === 'compliment' ? prev.compliments + 1 : prev.compliments
    }));

    setResult({ type: finalType, text });
    
    const shortText = text.replace(/⚡.*?⚡\n\n/, '').slice(0, 70) + (text.length > 70 ? '…' : '');
    setHistory(prev => [{ id: Date.now(), type: finalType, text: shortText }, ...prev].slice(0, 8));

    if (finalType === 'compliment') shootConfetti();
    else shootFireEmojis();
  };

  const shootConfetti = () => {
    const cols=['#c8d870','#e09030','#6a9e30','#e8a020','#4a7c20','#fff0b0','#d0ffd0'];
    for(let i=0;i<60;i++) setTimeout(()=>{
      const el=document.createElement('div'); el.className='bit';
      el.style.cssText=`left:${Math.random()*100}vw;width:${7+Math.random()*9}px;height:${7+Math.random()*9}px;
      background:${cols[~~(Math.random()*cols.length)]};border-radius:${Math.random()>.5?'50%':'2px'};
      --d:${2+Math.random()*2}s;`;
      document.body.appendChild(el); setTimeout(()=>el.remove(),4200);
    },i*25);
  };

  const shootFireEmojis = () => {
    const em=['🔥','😬','💀','😭','👀','😳','🫠','☠️'];
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
      
      {/* Background doodles */}
      {['✏️','📌','⭐','🌸','📝','🎲','💬','✨','🎯','📎'].map((e,i) => (
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

      <h1>🔥 Roast or Compliment?? 💚</h1>

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
