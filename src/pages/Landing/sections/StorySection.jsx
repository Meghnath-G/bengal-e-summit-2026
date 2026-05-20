import { useState, useEffect, useRef } from 'react';
import './StorySection.css';

// Exact panel data from original HTML
const PANELS = [
  {
    id: 'panel-1',
    counter: '01',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsOgznEkGEJrNav8MJOxiuK-UZVM4vhP8WFLeTkPZ--15pNch5Rr9tdO6msZX4op6Xn08jX0nOwmV3gyEfNbaVIzxo7Zkt-lfwIrUbC42-YyQKqFSqBMEoxOFiwrj2eNVl6a-N-Sup4DxgyB6f2ydwypVyaDgl4dboYd7YrYSFvLHTCgTA_WXZ_Oh4er_py1O_BKl39pRjaEtqrQPfcN4ydLA1XVFrMmXXql-offEvd2o93qfPEfaYA2xLSUY9aPEYXzhxV0erlw=s4000',
    imgAlt: 'Kashi Burns',
    act: 'ACT I — THE PROBLEM',
    titleLines: [
      { text: 'KASHI', className: '' },
      { text: 'BURNS', className: 'title-red' },
    ],
    body: 'In the year 2026, the eternal city flickers against the encroaching void. A digital drought has parched the spirit of the delta, leaving the relics of our heritage to crumble into the data-drifts of time.',
    cta: { text: 'SCROLL TO CONTINUE', arrow: '↓', isLast: false },
  },
  {
    id: 'panel-2',
    counter: '02',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtvdiR09ez-kWy9dF6OxkAHGn_X25miuy5N90ELZcD0r-wCOlbuQcEbDWQ5COIZm0vpopXmCF0UvROduhOmWutxJH2h9t6_D92A1xw_w8FdPKtQ8dtU9aOfVL0dL5MYvWBBQUF5Ykh5uW0uqqOMg__PSMBWLF1mZ8R8M8AB7ktdDhcMZ22CfNv8X6uMd2gsWCGKO0yIvxyVM_0zg4yKAEmhAs4YgWl0c7vDvp42pM3DL6XYvhDsx1agCOFCN1J2dr_VUN-N4C39w=s4000',
    imgAlt: 'The Chakra Ignites',
    act: 'ACT II — THE AWAKENING',
    titleLines: [
      { text: 'THE',    className: '' },
      { text: 'CHAKRA', className: '' },
      { text: 'IGNITES', className: 'title-gold' },
    ],
    body: 'Deep within the ruins of the New-Bengal core, the ancient mechanisms stir. A resonance not felt for centuries begins to vibrate, bridging the void between ancestral wisdom and the digital future.',
    cta: { text: 'SCROLL TO CONTINUE', arrow: '↓', isLast: false },
  },
  {
    id: 'panel-3',
    counter: '03',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPpWXnbSm90qrIwTzN_xioFcUAXeLMPFsGdnPEZ--n1h6IBAIwzhBh_0thot9b88GkMz9uFgiGk8xJRWyIXNkTyq2HNvh9e_17LzIXlorU3jrV5SA2SlyggVNSr1Tyl8I5wIUUtQrJhbLk29rjyTeQYY4eFr0-8nE0S21u9Fsgug_r1sY_uOCaf57eUM_lHicvR7xHbROqPeslD1Z2pRJL8TKHAa4t-QvRB9TLdSs4NZn5TaVWg8coSurK_1s4wj-5euvY4PuUrQ=s4000',
    imgAlt: 'The Portal Opens',
    act: 'ACT III — THE NEW WORLD',
    titleLines: [
      { text: 'THE',    className: '' },
      { text: 'PORTAL', className: '' },
      { text: 'OPENS',  className: 'title-gold' },
    ],
    body: 'Where the sacred waters of the past meet the silicon streams of tomorrow. Step through the threshold of heritage into the architected infinite of Neo-Bharat.',
    cta: { text: 'THE STORY CONTINUES', arrow: null, isLast: true },
  },
];

const TOTAL = PANELS.length;
const ROTATION_DELAY  = 2000;   // exact from original
const INACTIVITY_DELAY = 5000;  // exact from original

// Exact circular diff logic from original main.js
function getPanelClass(i, current) {
  if (i === current) return 'panel-center';
  let diff = i - current;
  if (diff === 2)  diff = -1;
  if (diff === -2) diff = 1;
  if (diff === -1) return 'panel-left';
  if (diff === 1)  return 'panel-right';
  return '';
}

export default function StorySection() {
  const [current, setCurrent] = useState(0);
  const autoRef      = useRef(null);
  const inactiveRef  = useRef(null);
  const sectionRef   = useRef(null);

  // Start auto-rotation — exact from original startAutoRotate()
  const startAutoRotate = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % TOTAL);
    }, ROTATION_DELAY);
  };

  // Pause and restart after inactivity — exact from original pauseAutoRotate()
  const pauseAutoRotate = () => {
    clearInterval(autoRef.current);
    clearTimeout(inactiveRef.current);
    inactiveRef.current = setTimeout(startAutoRotate, INACTIVITY_DELAY);
  };

  // Mount: start rotation, bind section hover — exact from original
  useEffect(() => {
    startAutoRotate();
    const section = sectionRef.current;
    const handleEnter = () => clearInterval(autoRef.current);
    const handleLeave = () => {
      clearTimeout(inactiveRef.current);
      startAutoRotate();
    };
    section?.addEventListener('mouseenter', handleEnter);
    section?.addEventListener('mouseleave', handleLeave);
    return () => {
      clearInterval(autoRef.current);
      clearTimeout(inactiveRef.current);
      section?.removeEventListener('mouseenter', handleEnter);
      section?.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const handlePanelClick = (i) => {
    pauseAutoRotate();
    if (current !== i) setCurrent(i);
  };

  const handleCtaClick = (e) => {
    e.stopPropagation();
    pauseAutoRotate();
    setCurrent(prev => (prev < TOTAL - 1 ? prev + 1 : prev));
  };

  const handleNavClick = (i) => {
    pauseAutoRotate();
    if (current !== i) setCurrent(i);
  };

  return (
    <section className="story-section" id="story" ref={sectionRef}>

      {/* Fixed left sidebar */}
      <div className="story-sidebar-left">
        <div className="story-year">MMXXVI</div>
        <div className="story-subtitle">THE DIGITAL<br />RELIC</div>
        <div className="story-nav">
          {PANELS.map((_, i) => (
            <div
              key={i}
              className={`story-nav-item${current === i ? ' active' : ''}`}
              data-panel={i}
              onClick={() => handleNavClick(i)}
            >
              <span className="nav-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="nav-dot"></span>
            </div>
          ))}
        </div>
        <div className="story-scroll-cue">
          <span className="scroll-arrow">↓</span>
          <span className="scroll-text">SCROLL</span>
        </div>
      </div>

      {/* Fixed right sidebar */}
      <div className="story-sidebar-right">
        <div className="story-vertical-text">BENGAL E-SUMMIT</div>
      </div>

      {/* Sticky panel container */}
      <div className="story-panels-container">
        {PANELS.map((panel, i) => (
          <div
            key={panel.id}
            id={panel.id}
            className={`story-panel ${getPanelClass(i, current)}`}
            onClick={() => handlePanelClick(i)}
            onTouchStart={pauseAutoRotate}
          >
            {/* Image */}
            <div className="panel-image-wrap">
              <img src={panel.imgSrc} alt={panel.imgAlt} className="panel-img" />
              <div className="panel-overlay"></div>
              <div className="panel-counter">
                {panel.counter} <span className="counter-slash">/</span>{' '}
                <span className="counter-total">03</span>
              </div>
            </div>

            {/* Text card */}
            <div className="panel-card">
              <div className="panel-act"><span>{panel.act}</span></div>
              <h2 className="panel-title">
                {panel.titleLines.map((line, li) => (
                  <span key={li} className={line.className}>{line.text}</span>
                ))}
              </h2>
              <div className="panel-divider"></div>
              <p className="panel-body">{panel.body}</p>
              <div className="panel-cta" onClick={handleCtaClick}>
                {panel.cta.isLast && <span className="act-line"></span>}
                {panel.cta.text}
                {panel.cta.arrow && <span className="cta-arrow">{panel.cta.arrow}</span>}
              </div>
              {panel.cta.isLast && (
                <div className="panel-next-btn" onClick={handleCtaClick}>→</div>
              )}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
