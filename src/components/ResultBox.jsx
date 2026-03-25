const BADGE_CONFIG = {
  roast: { text: '🔥 ROASTED!', colorClass: 'roast' },
  compliment: { text: '💚 NICE ONE!', colorClass: 'compliment' },
  truth: { text: '👁️ TRUTH TIME!', colorClass: 'truth' },
  dare: { text: '⚡ DARE!', colorClass: 'dare' },
  mystery: { text: '🔮 MYSTERY?!', colorClass: 'mystery' },
  technical: { text: '💻 GEEK SCENE!', colorClass: 'technical' }
};

const ICON = { roast: '🔥', compliment: '💚', truth: '👁️', dare: '⚡', mystery: '🔮', technical: '💻' };

export default function ResultBox({ result, history, isSpinning }) {
  let badgeClass = 'result-type-badge';
  let badgeText = '';
  
  if (result.type && !isSpinning) {
    const config = BADGE_CONFIG[result.type];
    badgeClass += ` show settled ${config.colorClass}`;
    badgeText = config.text;
  } else if (isSpinning) {
    badgeClass = 'result-type-badge';
  }

  return (
    <div className="result-side">
      <div>
        <div className="box-header">
          <span className="dot" style={{background:'#ff6b6b'}}></span>
          <span className="dot" style={{background:'#ffd93d'}}></span>
          <span className="dot" style={{background:'#6bcb77'}}></span>
          &nbsp; OUTPUT
        </div>
        <div className={`result-box ${!isSpinning && result.type ? 'pop' : ''}`}>
          <span className={badgeClass}>{badgeText}</span>
          <textarea 
            className="result-text-area" 
            value={isSpinning ? 'spinning the wheel to get your fate... 👀' : result.text} 
            readOnly 
          />
          <div className="spin-hint">click the wheel or hit SPIN !!</div>
        </div>
      </div>

      <div className="history-wrap">
        <div className="history-title">📝 history</div>
        <div className="history-scroll">
          {history.length === 0 ? (
            <div style={{color:'#b0a080', fontSize:'0.9rem'}}>nothing yet lol</div>
          ) : (
            history.map(h => (
              <div key={h.id} className={`hi ${h.type}`}>
                <span style={{marginRight: '6px'}}>{ICON[h.type]}</span>
                {h.text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
