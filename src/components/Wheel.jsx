import { useEffect, useRef } from 'react';

const SEGS = [
  { type:'roast',      fill:'#4a7c20', text:'white' },
  { type:'compliment', fill:'#c8d870', text:'#2a4000' },
  { type:'roast',      fill:'#e09030', text:'white' },
  { type:'compliment', fill:'#2d5a1b', text:'white' },
  { type:'roast',      fill:'#d4b840', text:'#3a3000' },
  { type:'compliment', fill:'#6a9e30', text:'white' },
  { type:'mystery',    fill:'#b8c850', text:'#2a3800' },
  { type:'roast',      fill:'#3a6a18', text:'white' },
  { type:'compliment', fill:'#e8a020', text:'white' },
  { type:'double',     fill:'#1e4010', text:'white' },
];

const LABELS = {
  roast:      'ROAST',
  compliment: 'NICE',
  mystery:    '???',
  double:     'x2!!',
};

export default function Wheel({ stats, isSpinning, setIsSpinning, onReveal }) {
  const canvasRef = useRef(null);
  const rotRef = useRef(0);
  
  const N = SEGS.length;
  const ARC = Math.PI * 2 / N;

  const draw = (r) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const R = cv.width / 2;
    
    ctx.clearRect(0,0,cv.width,cv.height);

    for (let i=0; i<N; i++) {
      const s = r + i*ARC;
      const e = s + ARC;
      const seg = SEGS[i];

      ctx.beginPath(); ctx.moveTo(R,R); ctx.arc(R,R,R-4,s,e); ctx.closePath();
      ctx.fillStyle = seg.fill; ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.lineWidth = 1.5; ctx.stroke();

      ctx.save();
      ctx.translate(R, R);
      ctx.rotate(s + ARC/2);
      ctx.textAlign = 'center';
      ctx.fillStyle = seg.text;
      ctx.font = `bold ${R*0.13}px 'Permanent Marker', cursive`;
      ctx.shadowColor = 'rgba(0,0,0,0.25)';
      ctx.shadowBlur = 4;

      const label = LABELS[seg.type];
      ctx.rotate(Math.PI/2);
      ctx.fillText(label, 0, -(R*0.58));
      ctx.restore();
    }

    ctx.beginPath(); ctx.arc(R,R,R-2,0,Math.PI*2);
    ctx.strokeStyle='rgba(0,0,0,0.2)'; ctx.lineWidth=4; ctx.stroke();
  };

  useEffect(() => {
    draw(rotRef.current);
  }, []);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const total_angle = (7 + Math.random() * 6) * Math.PI * 2 + Math.random() * Math.PI * 2;
    const dur = 3800 + Math.random() * 1400;
    const t0 = performance.now();
    const r0 = rotRef.current;
    
    // Smooth custom easing
    const ease = t => 1 - Math.pow(1-t, 4);

    const go = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      rotRef.current = r0 + total_angle * ease(p);
      draw(rotRef.current);
      if (p < 1) {
        requestAnimationFrame(go);
      } else {
        setIsSpinning(false);
        const norm = ((rotRef.current % (Math.PI*2)) + Math.PI*2) % (Math.PI*2);
        const ptr  = (Math.PI*1.5 - norm + Math.PI*2) % (Math.PI*2);
        const winnerSeg = SEGS[Math.floor(ptr / ARC) % N];
        onReveal(winnerSeg.type);
      }
    };
    
    requestAnimationFrame(go);
  };

  return (
    <div className="wheel-side">
      <div className="wheel-container">
        <div className="arrow-wrap">
          <div className="arrow-tip"></div>
          <div className="arrow-base"></div>
        </div>
        <canvas ref={canvasRef} width="420" height="420" onClick={spin}></canvas>
        <div className={`hub ${isSpinning ? 'spinning' : ''}`} onClick={spin}>
          SPIN
        </div>
      </div>

      <div className="scores">
        <div className="sc r"><span>{stats.roasts}</span>🔥 roasts</div>
        <div className="sc t"><span>{stats.total}</span>⚡ spins</div>
        <div className="sc c"><span>{stats.compliments}</span>💚 nice</div>
      </div>
    </div>
  );
}
