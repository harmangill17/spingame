import { useEffect, useRef } from 'react';

const SEGS = [
  { type:'roast',      fill:'#e09030', text:'white' },
  { type:'truth',      fill:'#3867d6', text:'white' },
  { type:'mystery',    fill:'#8e44ad', text:'white' },
  { type:'compliment', fill:'#6a9e30', text:'white' },
  { type:'dare',       fill:'#eb3b5a', text:'white' },
  { type:'rapid',      fill:'#16a085', text:'white' },
  { type:'roast',      fill:'#f39c12', text:'white' },
  { type:'truth',      fill:'#4b7bec', text:'white' },
  { type:'compliment', fill:'#c8d870', text:'#1a3000' },
  { type:'dare',       fill:'#fc5c65', text:'white' },
];

const LABELS = {
  roast:      'ROAST',
  compliment: 'NICE',
  truth:      'TRUTH',
  dare:       'DARE',
  mystery:    'MYSTERY',
  rapid:      'RAPID'
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
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = seg.text;
      ctx.font = `bold ${R*0.11}px 'Verdana', sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 4;

      const label = LABELS[seg.type];
      ctx.fillText(label, R - 25, 0);
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
        <canvas ref={canvasRef} width="540" height="540" onClick={spin}></canvas>
        <div className={`hub ${isSpinning ? 'spinning' : ''}`} onClick={spin}>
          SPIN
        </div>
      </div>

      <div className="scores" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        <div className="sc r"><span>{stats.roasts}</span>🔥 roasts</div>
        <div className="sc c"><span>{stats.compliments}</span>💚 nice</div>
        <div className="sc tr"><span>{stats.truths}</span>👁️ truths</div>
        <div className="sc d"><span>{stats.dares}</span>⚡ dares</div>
        <div className="sc my" style={{ background: '#8e44ad', color: 'white' }}><span>{stats.mysteries}</span>🔮 mystery</div>
        <div className="sc te" style={{ background: '#16a085', color: 'white' }}><span>{stats.rapids}</span>⏱️ rapid</div>
      </div>
    </div>
  );
}
