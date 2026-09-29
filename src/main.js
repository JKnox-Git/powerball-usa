/**
 * =========================================================
 * US Powerball Number Generator & Simulator (Pure Vanilla JS)
 * =========================================================
 */

// 1. Data Constants
const WHITE_BALL_FREQUENCIES = {
  1: 79, 2: 77, 3: 94, 4: 75, 5: 76, 6: 76, 7: 78, 8: 83, 9: 78, 10: 86,
  11: 75, 12: 91, 13: 82, 14: 83, 15: 74, 16: 92, 17: 84, 18: 74, 19: 79, 20: 96,
  21: 99, 22: 73, 23: 95, 24: 73, 25: 81, 26: 72, 27: 85, 28: 92, 29: 72, 30: 71,
  31: 71, 32: 102, 33: 84, 34: 70, 35: 70, 36: 98, 37: 88, 38: 69, 39: 97, 40: 80,
  41: 69, 42: 68, 43: 68, 44: 81, 45: 77, 46: 67, 47: 87, 48: 67, 49: 66, 50: 66,
  51: 65, 52: 80, 53: 88, 54: 87, 55: 65, 56: 64, 57: 64, 58: 63, 59: 93, 60: 63,
  61: 104, 62: 90, 63: 101, 64: 89, 65: 62, 66: 61, 67: 82, 68: 86, 69: 98
};

const POWERBALL_FREQUENCIES = {
  1: 36, 2: 38, 3: 45, 4: 49, 5: 34, 6: 43, 7: 42, 8: 38, 9: 42, 10: 45,
  11: 40, 12: 37, 13: 44, 14: 46, 15: 37, 16: 34, 17: 36, 18: 51, 19: 41, 20: 39,
  21: 48, 22: 35, 23: 33, 24: 50, 25: 44, 26: 41
};

const POWER_PLAY_MULTIPLIERS = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 10];

const DREAM_ITEMS = [
  { id: 'eagle', keyword: 'Soaring Eagle', emoji: '🦅', category: 'Freedom / Triumph', white: [7, 16, 32, 45, 61], pb: 18, meaning: 'The quintessential symbol of American ambition. Dreaming of an eagle soaring high signals rising power and breakthrough jackpot potential.' },
  { id: 'gold', keyword: 'Gold Bars / Cash', emoji: '💰', category: 'Wealth / Windfall', white: [12, 21, 36, 53, 69], pb: 24, meaning: 'Holding stacks of hundred-dollar bills or shining bullion represents sudden, exponential financial luck.' },
  { id: 'fire', keyword: 'Roaring Flame', emoji: '🔥', category: 'Energy / Prosperity', white: [3, 19, 39, 59, 63], pb: 4, meaning: 'Blazing flames signify that old obstacles are being consumed, making way for immense prosperity and fortune.' },
  { id: 'lion', keyword: 'Majestic Lion', emoji: '🦁', category: 'Leadership / Honor', white: [8, 23, 37, 48, 62], pb: 21, meaning: 'Encountering the king of the beasts heralds authoritative victory and monumental reward.' },
  { id: 'ancestor', keyword: 'Wise Elder / Mentor', emoji: '👴', category: 'Guidance / Blessings', white: [5, 14, 28, 44, 68], pb: 10, meaning: 'Receiving a gift or glowing token from an elder in a dream is one of the most common historic winner premonitions.' },
  { id: 'dragon', keyword: 'Celestial Dragon', emoji: '🐉', category: 'Mythical / Fortune', white: [9, 20, 33, 54, 64], pb: 14, meaning: 'A dragon ascending to the heavens indicates life-changing momentum and extraordinary wealth.' },
  { id: 'ocean', keyword: 'Endless Ocean Wave', emoji: '🌊', category: 'Nature / Flow', white: [6, 17, 31, 47, 66], pb: 7, meaning: 'Gazing at a crystal-clear rolling tide indicates that the floodgates of opportunity and luck are opening wide.' },
  { id: 'airplane', keyword: 'Private Jet Flight', emoji: '✈️', category: 'Travel / Ascension', white: [11, 25, 40, 52, 67], pb: 13, meaning: 'Flying above the storm clouds symbolizes elevating your lifestyle to grand new heights.' },
  { id: 'whitehouse', keyword: 'Grand Mansion', emoji: '🏛️', category: 'Architecture / Success', white: [2, 18, 35, 50, 65], pb: 9, meaning: 'Visiting or owning a grand neoclassical estate reflects supreme abundance and ultimate security.' },
  { id: 'dolphin', keyword: 'Leaping Dolphin', emoji: '🐬', category: 'Marine / Joy', white: [4, 15, 29, 42, 58], pb: 25, meaning: 'Playful dolphins leaping in sunlight signify unexpected bonuses and catching the biggest catch of your life.' },
  { id: 'fireworks', keyword: 'Gala Fireworks', emoji: '🎆', category: 'Celebration / Joy', white: [10, 22, 38, 51, 60], pb: 6, meaning: 'A dazzling midnight fireworks display foretells massive celebrations and shared happiness with loved ones.' },
  { id: 'horse', keyword: 'Thoroughbred Steed', emoji: '🐎', category: 'Vitality / Speed', white: [13, 27, 41, 55, 69], pb: 19, meaning: 'A powerful galloping stallion represents fast-paced triumph and surging assets.' }
];

const ZODIAC_SIGNS = [
  { id: 'rat', name: 'Rat', animal: 'Zi (子)', emoji: '🐭', baseWhite: [3, 12, 21, 39, 61], basePB: 18, blessing: 'Keen intellect and swift reflexes. The early numbers and hot 60s section carry powerful auspicious vibes.' },
  { id: 'ox', name: 'Ox', animal: 'Chou (丑)', emoji: '🐮', baseWhite: [2, 16, 28, 44, 64], basePB: 24, blessing: 'Steadfast persistence yields massive returns. Even number distributions and stable mid-to-high tiers shine.' },
  { id: 'tiger', name: 'Tiger', animal: 'Yin (寅)', emoji: '🐯', baseWhite: [7, 19, 32, 53, 63], basePB: 4, blessing: 'Fearless bravery commands the table. Odd-heavy combinations hold dominant jackpot energy.' },
  { id: 'rabbit', name: 'Rabbit', animal: 'Mao (卯)', emoji: '🐰', baseWhite: [4, 15, 27, 42, 59], basePB: 21, blessing: 'Grace and intuitive wisdom attract fortunate benefactors. Harmonic balance between 20s and 40s.' },
  { id: 'dragon', name: 'Dragon', animal: 'Chen (辰)', emoji: '🐲', baseWhite: [9, 23, 36, 54, 69], basePB: 14, blessing: 'Supreme dragon majesty! Top boundary White Ball 69 pairs exceptionally with Powerball 14.' },
  { id: 'snake', name: 'Snake', animal: 'Si (巳)', emoji: '🐍', baseWhite: [6, 18, 30, 48, 62], basePB: 10, blessing: 'Strategic insight and vision peak today. Multiples of 6 form a powerful mathematical synergy.' },
  { id: 'horse', name: 'Horse', animal: 'Wu (午)', emoji: '🐴', baseWhite: [5, 20, 33, 47, 61], basePB: 25, blessing: 'Boundless vitality galloping across open fields. Golden sum range 140-190 is primed for luck.' },
  { id: 'sheep', name: 'Goat', animal: 'Wei (未)', emoji: '🐑', baseWhite: [8, 22, 35, 50, 68], basePB: 7, blessing: 'Harmonious and peaceful balance. 3 Even : 2 Odd ratio unlocks maximum auspicious frequency.' },
  { id: 'monkey', name: 'Monkey', animal: 'Shen (申)', emoji: '🐵', baseWhite: [1, 14, 29, 45, 66], basePB: 13, blessing: 'Clever wit and ingenuity spark winning moments. Number 1 and high anchor 66 create great balance.' },
  { id: 'rooster', name: 'Rooster', animal: 'You (酉)', emoji: '🐔', baseWhite: [10, 24, 37, 52, 65], basePB: 3, blessing: 'A herald of a prosperous dawn. The decade milestones carry sharp magnetic appeal.' },
  { id: 'dog', name: 'Dog', animal: 'Xu (戌)', emoji: '🐶', baseWhite: [11, 26, 38, 51, 67], basePB: 19, blessing: 'Loyalty and unwavering protection. Heavy 50+ numbers provide solid structural backing.' },
  { id: 'pig', name: 'Pig', animal: 'Hai (亥)', emoji: '🐷', baseWhite: [12, 25, 41, 56, 69], basePB: 18, blessing: 'Heavenly bestowed good fortune and abundance. Exceptional synergy with all-time hot Powerball 18.' }
];

const CONSTELLATION_ITEMS = [
  { id: 'aquarius', name: 'Aquarius', dates: 'Jan 20 – Feb 18', emoji: '🏺', baseWhite: [4, 17, 32, 49, 63], basePB: 24, blessing: 'Innovative vision leads to breakthrough hits. Hot 30s and 60s align in harmony.' },
  { id: 'pisces', name: 'Pisces', dates: 'Feb 19 – Mar 20', emoji: '🐟', baseWhite: [7, 21, 36, 52, 61], basePB: 18, blessing: 'Deep intuition and dream premonitions. Auspicious 21 and 61 attract magnetic luck.' },
  { id: 'aries', name: 'Aries', dates: 'Mar 21 – Apr 19', emoji: '🐏', baseWhite: [1, 19, 34, 53, 69], basePB: 4, blessing: 'Bold initiative paves the path to victory. Bookends 1 and 69 open the gates of fortune.' },
  { id: 'taurus', name: 'Taurus', dates: 'Apr 20 – May 20', emoji: '🐂', baseWhite: [6, 20, 39, 48, 64], basePB: 21, blessing: 'Grounded stability and financial expansion. Even-number anchors build a golden structure.' },
  { id: 'gemini', name: 'Gemini', dates: 'May 21 – Jun 21', emoji: '👯', baseWhite: [3, 16, 28, 45, 62], basePB: 10, blessing: 'Fast agile thinking connects the dots. Well-distributed spread across all decades.' },
  { id: 'cancer', name: 'Cancer', dates: 'Jun 22 – Jul 22', emoji: '🦀', baseWhite: [2, 18, 33, 47, 66], basePB: 14, blessing: 'Guardian warmth and surprise windfalls. Sum range around 160 delivers peak performance.' },
  { id: 'leo', name: 'Leo', dates: 'Jul 23 – Aug 22', emoji: '🦁', baseWhite: [8, 23, 37, 54, 68], basePB: 25, blessing: 'Solar radiance shines upon your plays. Vibrant top-tier numbers elevate the combination.' },
  { id: 'virgo', name: 'Virgo', dates: 'Aug 23 – Sep 22', emoji: '🌾', baseWhite: [5, 14, 31, 50, 60], basePB: 9, blessing: 'Analytical precision boosts matching precision. Multiples of 5 orchestrate balance.' },
  { id: 'libra', name: 'Libra', dates: 'Sep 23 – Oct 22', emoji: '⚖️', baseWhite: [11, 24, 38, 55, 67], basePB: 7, blessing: 'Flawless aesthetic harmony. The 3:2 odd-even distribution radiates ideal equilibrium.' },
  { id: 'scorpio', name: 'Scorpio', dates: 'Oct 23 – Nov 22', emoji: '🦂', baseWhite: [9, 22, 35, 51, 65], basePB: 26, blessing: 'Powerful law of attraction targeting the ultimate Powerball 26.' },
  { id: 'sagittarius', name: 'Sagittarius', dates: 'Nov 23 – Dec 21', emoji: '🏹', baseWhite: [12, 27, 40, 58, 69], basePB: 13, blessing: 'Direct hit on the jackpot bullseye! Rich mid-to-high numbers lead the quest.' },
  { id: 'capricorn', name: 'Capricorn', dates: 'Dec 22 – Jan 19', emoji: '🐐', baseWhite: [10, 25, 42, 57, 63], basePB: 20, blessing: 'Substantial compound fortune coming to fruition with heavy-weight selections.' }
];

// 2. Sound Synthesizer via Web Audio API
class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  playBallPop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.06);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.1);
      osc2.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  playPowerballPop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {}
  }

  playWinFanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + idx * 0.1 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.35);
      });
    } catch {}
  }
}
const sound = new SoundController();

// 3. Confetti Animation
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#ef4444', '#f87171', '#fde047', '#f59e0b', '#38bdf8', '#ffffff'];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: canvas.width * 0.5 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.65,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 16 - 8,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12
    });
  }

  let frameId = null;
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45;
      p.alpha -= 0.012;
      p.rotation += p.rotSpeed;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (alive) {
      frameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(frameId);
    }
  };
  render();
}

// 4. Toast Notification
function showToast(message) {
  const toast = document.getElementById('toast-msg');
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2200);
}

// 5. Ball Element Creator
function createWhiteBall(num, size = 'md') {
  const ball = document.createElement('div');
  ball.className = `lotto-ball ball-${size} ball-white`;
  ball.textContent = String(num);
  ball.title = `White Ball ${num}`;
  return ball;
}

function createPowerball(num, size = 'md') {
  const ball = document.createElement('div');
  ball.className = `lotto-ball ball-${size} ball-powerball`;
  ball.textContent = String(num);
  ball.title = `Red Powerball ${num}`;
  return ball;
}

function createPowerPlayBadge(multiplier) {
  const badge = document.createElement('span');
  badge.className = 'powerplay-badge';
  badge.textContent = `${multiplier}X`;
  badge.title = `Power Play ${multiplier}X Multiplier`;
  return badge;
}

// 6. Application State
const state = {
  activeTab: 'generator',
  selectedMode: 'stats',
  
  // Custom Filter
  customTarget: 'white', // 'white' | 'pb'
  customPickMode: 'fixed', // 'fixed' | 'excluded'
  fixedWhite: [],
  fixedPB: null,
  excludedWhite: [],
  excludedPB: [],

  oddRatio: 'balanced',
  selectedDreamId: 'eagle',
  selectedZodiacId: 'dragon',
  selectedConstellationId: 'aries',
  currentTicket: null,
  savedTickets: [],
  instantPlays: [],
  instantPlaysMode: null,
  
  // Drum State
  drumRunning: false,
  drumPhase: 'idle', // 'idle' | 'white' | 'pb' | 'done'
  drumDrawnWhite: [],
  drumDrawnPB: null,
  drumMultiplier: 2,
  drumAnimFrame: null,
  drumBalls: [],

  // Stats view
  statsViewMode: 'white', // 'white' | 'pb'
  statsSortMode: 'number' // 'number' | 'hot' | 'cold'
};

// Storage Helpers
const STORAGE_KEY = 'us_powerball_recommender_saved_v1';
function loadSavedTickets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      state.savedTickets = JSON.parse(raw);
    }
  } catch {}
  updateStorageBadge();
}

function saveTicketsToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedTickets));
  } catch {}
  updateStorageBadge();
}

function updateStorageBadge() {
  const badge = document.getElementById('storage-count-badge');
  if (badge) {
    badge.textContent = String(state.savedTickets.length);
  }
}

// 7. Core Powerball Generator Logic
function getRandomPowerPlay() {
  return POWER_PLAY_MULTIPLIERS[Math.floor(Math.random() * POWER_PLAY_MULTIPLIERS.length)];
}

function generateSinglePowerballGame(fixedWhite = [], fixedPB = null, excludedWhite = [], excludedPB = [], preferHot = true, avoidTriples = true, oddRatio = 'balanced') {
  const fixedWSet = new Set(fixedWhite);
  const excludedWSet = new Set(excludedWhite);
  const whitePool = Array.from({ length: 69 }, (_, i) => i + 1).filter(n => !fixedWSet.has(n) && !excludedWSet.has(n));

  const neededWhite = 5 - fixedWhite.length;
  let attempts = 0;
  let chosenWhite = [];

  while (attempts < 600) {
    attempts++;
    const chosen = [...fixedWhite];
    const localPool = [...whitePool];

    for (let i = 0; i < neededWhite; i++) {
      if (localPool.length === 0) break;
      let totalW = 0;
      localPool.forEach(n => {
        let w = WHITE_BALL_FREQUENCIES[n] || 80;
        if (preferHot) w = Math.pow(w / 60, 2);
        totalW += w;
      });

      let rand = Math.random() * totalW;
      let pickedIdx = 0;
      for (let j = 0; j < localPool.length; j++) {
        let w = WHITE_BALL_FREQUENCIES[localPool[j]] || 80;
        if (preferHot) w = Math.pow(w / 60, 2);
        rand -= w;
        if (rand <= 0) {
          pickedIdx = j;
          break;
        }
      }
      chosen.push(localPool[pickedIdx]);
      localPool.splice(pickedIdx, 1);
    }

    chosen.sort((a, b) => a - b);

    // Sum check (Optimal: 130 ~ 210)
    const sum = chosen.reduce((a, b) => a + b, 0);
    if (sum < 120 || sum > 220) continue;

    // Odd-Even check
    const odds = chosen.filter(n => n % 2 !== 0).length;
    if (oddRatio === 'balanced' && (odds < 2 || odds > 3)) continue;
    if (oddRatio === 'odd-heavy' && odds < 3) continue;
    if (oddRatio === 'even-heavy' && odds > 2) continue;

    // Consecutive triples
    if (avoidTriples) {
      let triple = false;
      for (let k = 0; k < chosen.length - 2; k++) {
        if (chosen[k + 1] === chosen[k] + 1 && chosen[k + 2] === chosen[k] + 2) {
          triple = true;
          break;
        }
      }
      if (triple) continue;
    }

    chosenWhite = chosen;
    break;
  }

  // Fallback for white balls
  if (chosenWhite.length < 5) {
    const fallback = [...fixedWhite];
    const shuffled = [...whitePool].sort(() => 0.5 - Math.random());
    fallback.push(...shuffled.slice(0, 5 - fallback.length));
    chosenWhite = fallback.sort((a, b) => a - b);
  }

  // Pick Powerball (1~26)
  let chosenPB = fixedPB;
  if (!chosenPB) {
    const excludedPBSet = new Set(excludedPB);
    const pbPool = Array.from({ length: 26 }, (_, i) => i + 1).filter(n => !excludedPBSet.has(n));
    if (pbPool.length === 0) {
      chosenPB = Math.floor(Math.random() * 26) + 1;
    } else if (preferHot) {
      let totalW = 0;
      pbPool.forEach(n => {
        let w = POWERBALL_FREQUENCIES[n] || 40;
        w = Math.pow(w / 30, 2);
        totalW += w;
      });
      let rand = Math.random() * totalW;
      for (let j = 0; j < pbPool.length; j++) {
        let w = Math.pow((POWERBALL_FREQUENCIES[pbPool[j]] || 40) / 30, 2);
        rand -= w;
        if (rand <= 0) {
          chosenPB = pbPool[j];
          break;
        }
      }
      if (!chosenPB) chosenPB = pbPool[0];
    } else {
      chosenPB = pbPool[Math.floor(Math.random() * pbPool.length)];
    }
  }

  return {
    white: chosenWhite,
    pb: chosenPB,
    powerPlay: getRandomPowerPlay()
  };
}

function generateFullTicket() {
  sound.playBallPop();
  const games = [];
  const labels = ['A', 'B', 'C', 'D', 'E'];

  const preferHot = document.getElementById('chk-prefer-hot')?.checked ?? true;
  const avoidTriples = document.getElementById('chk-avoid-triples')?.checked ?? true;

  for (let i = 0; i < 5; i++) {
    let result = null;
    let modeLabel = 'Smart Analytics';

    if (state.selectedMode === 'stats') {
      result = generateSinglePowerballGame(state.fixedWhite, state.fixedPB, state.excludedWhite, state.excludedPB, preferHot, avoidTriples, state.oddRatio);
      modeLabel = 'Smart Analytics';
    } else if (state.selectedMode === 'custom') {
      result = generateSinglePowerballGame(state.fixedWhite, state.fixedPB, state.excludedWhite, state.excludedPB, false, avoidTriples, state.oddRatio);
      modeLabel = `Custom (Fixed W:${state.fixedWhite.length} / PB:${state.fixedPB ? '1' : '0'})`;
    } else if (state.selectedMode === 'dream') {
      const dream = DREAM_ITEMS.find(d => d.id === state.selectedDreamId) || DREAM_ITEMS[0];
      const seedWhite = dream.white.slice(0, 2 + (i % 2));
      result = generateSinglePowerballGame(seedWhite, i === 0 ? dream.pb : null, state.excludedWhite, state.excludedPB, false, avoidTriples, 'any');
      modeLabel = `Dream (${dream.keyword})`;
    } else if (state.selectedMode === 'zodiac') {
      const zodiac = ZODIAC_SIGNS.find(z => z.id === state.selectedZodiacId) || ZODIAC_SIGNS[0];
      const seedWhite = [zodiac.baseWhite[(i * 2) % zodiac.baseWhite.length]];
      result = generateSinglePowerballGame(seedWhite, i === 0 ? zodiac.basePB : null, state.excludedWhite, state.excludedPB, false, avoidTriples, 'any');
      modeLabel = `Zodiac (${zodiac.name})`;
    } else if (state.selectedMode === 'constellation') {
      const cons = CONSTELLATION_ITEMS.find(c => c.id === state.selectedConstellationId) || CONSTELLATION_ITEMS[0];
      const seedWhite = [
        cons.baseWhite[(i * 2) % cons.baseWhite.length],
        cons.baseWhite[(i * 2 + 1) % cons.baseWhite.length]
      ];
      result = generateSinglePowerballGame(seedWhite, i === 0 ? cons.basePB : null, state.excludedWhite, state.excludedPB, false, avoidTriples, 'any');
      modeLabel = `Horoscope (${cons.name})`;
    } else {
      // Pure Random (Quick Pick)
      const pool = Array.from({ length: 69 }, (_, idx) => idx + 1).sort(() => 0.5 - Math.random());
      const w = pool.slice(0, 5).sort((a, b) => a - b);
      const pb = Math.floor(Math.random() * 26) + 1;
      result = { white: w, pb, powerPlay: getRandomPowerPlay() };
      modeLabel = 'Pure Quick Pick';
    }

    const sum = result.white.reduce((a, b) => a + b, 0);
    const odds = result.white.filter(n => n % 2 !== 0).length;
    const evens = 5 - odds;
    const highs = result.white.filter(n => n >= 35).length;
    const lows = 5 - highs;

    games.push({
      id: `game-${Date.now()}-${i}`,
      label: labels[i],
      white: result.white,
      pb: result.pb,
      powerPlay: result.powerPlay,
      modeLabel,
      sum,
      odds,
      evens,
      highs,
      lows
    });
  }

  state.currentTicket = {
    id: `ticket-${Date.now()}`,
    createdAt: new Date().toISOString(),
    title: `Powerball Play Set (${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`,
    games
  };

  const resultsArea = document.getElementById('results-area');
  if (resultsArea) {
    resultsArea.style.display = 'block';
  }

  renderCurrentTicket();
}

function renderCurrentTicket() {
  const container = document.getElementById('games-list-container');
  if (!container || !state.currentTicket) return;

  container.innerHTML = '';
  state.currentTicket.games.forEach(g => {
    const card = document.createElement('div');
    card.className = 'game-card';

    const left = document.createElement('div');
    left.className = 'game-left';

    const badge = document.createElement('div');
    badge.className = 'game-badge';
    badge.textContent = g.label;
    left.appendChild(badge);

    const ballsRow = document.createElement('div');
    ballsRow.className = 'balls-row';
    g.white.forEach(n => {
      ballsRow.appendChild(createWhiteBall(n, 'md'));
    });

    const plus = document.createElement('span');
    plus.className = 'ball-plus-sign';
    plus.textContent = '+';
    ballsRow.appendChild(plus);

    ballsRow.appendChild(createPowerball(g.pb, 'md'));
    ballsRow.appendChild(createPowerPlayBadge(g.powerPlay));

    left.appendChild(ballsRow);

    const stats = document.createElement('div');
    stats.className = 'game-stats';
    stats.innerHTML = `
      <span>Sum: <strong style="color: #38bdf8;">${g.sum}</strong></span>
      <span>|</span>
      <span>Odd/Even: <strong>${g.odds}:${g.evens}</strong></span>
      <span>|</span>
      <span>High/Low: <strong>${g.highs}:${g.lows}</strong></span>
      <span style="color: var(--text-muted);">(${g.modeLabel})</span>
    `;

    card.appendChild(left);
    card.appendChild(stats);
    container.appendChild(card);
  });
}

// 7.1 Instant 2-Line Recommendations for Smart Analytics and Quick Pick
function renderInstantRecommendations(regenerate = false) {
  const container = document.getElementById('instant-recommend-container');
  const listContainer = document.getElementById('instant-games-list');
  const subTitle = document.getElementById('instant-mode-subtitle');
  if (!container || !listContainer) return;

  const isStats = state.selectedMode === 'stats';
  const isRandom = state.selectedMode === 'random';

  if (!isStats && !isRandom) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'block';

  if (isStats) {
    if (subTitle) subTitle.textContent = 'Smart Analytics Model (2 Plays)';
  } else {
    if (subTitle) subTitle.textContent = 'Pure Quick Pick Model (2 Plays)';
  }

  const preferHot = document.getElementById('chk-prefer-hot')?.checked ?? true;
  const avoidTriples = document.getElementById('chk-avoid-triples')?.checked ?? true;

  if (regenerate || !state.instantPlays || state.instantPlays.length === 0 || state.instantPlaysMode !== state.selectedMode) {
    state.instantPlays = [];
    state.instantPlaysMode = state.selectedMode;

    const labels = ['A', 'B'];
    for (let i = 0; i < 2; i++) {
      let result = null;
      let modeLabel = isStats ? 'Smart Analytics' : 'Pure Quick Pick';

      if (isStats) {
        result = generateSinglePowerballGame(state.fixedWhite, state.fixedPB, state.excludedWhite, state.excludedPB, preferHot, avoidTriples, state.oddRatio);
      } else {
        const pool = Array.from({ length: 69 }, (_, idx) => idx + 1).sort(() => 0.5 - Math.random());
        const w = pool.slice(0, 5).sort((a, b) => a - b);
        const pb = Math.floor(Math.random() * 26) + 1;
        result = { white: w, pb, powerPlay: getRandomPowerPlay() };
      }

      const sum = result.white.reduce((a, b) => a + b, 0);
      const odds = result.white.filter(n => n % 2 !== 0).length;
      const evens = 5 - odds;
      const highs = result.white.filter(n => n >= 35).length;
      const lows = 5 - highs;

      state.instantPlays.push({
        id: `instant-${Date.now()}-${i}`,
        label: labels[i],
        white: result.white,
        pb: result.pb,
        powerPlay: result.powerPlay,
        modeLabel,
        sum,
        odds,
        evens,
        highs,
        lows
      });
    }
  }

  listContainer.innerHTML = '';
  state.instantPlays.forEach(g => {
    const card = document.createElement('div');
    card.className = 'instant-game-card';

    const left = document.createElement('div');
    left.className = 'game-left';

    const badge = document.createElement('div');
    badge.className = 'instant-line-badge';
    badge.textContent = g.label;
    left.appendChild(badge);

    const ballsRow = document.createElement('div');
    ballsRow.className = 'balls-row';
    g.white.forEach(n => {
      ballsRow.appendChild(createWhiteBall(n, 'md'));
    });

    const plus = document.createElement('span');
    plus.className = 'ball-plus-sign';
    plus.textContent = '+';
    ballsRow.appendChild(plus);

    ballsRow.appendChild(createPowerball(g.pb, 'md'));
    ballsRow.appendChild(createPowerPlayBadge(g.powerPlay));

    left.appendChild(ballsRow);

    const stats = document.createElement('div');
    stats.className = 'game-stats';
    stats.innerHTML = `
      <span>Sum: <strong style="color: #38bdf8;">${g.sum}</strong></span>
      <span>|</span>
      <span>Odd/Even: <strong>${g.odds}:${g.evens}</strong></span>
      <span>|</span>
      <span>High/Low: <strong>${g.highs}:${g.lows}</strong></span>
      <span style="color: var(--text-muted);">(${g.modeLabel})</span>
    `;

    card.appendChild(left);
    card.appendChild(stats);
    listContainer.appendChild(card);
  });
}

// 8. Custom Filter Interactive Pickers (1~69 White Balls, 1~26 Powerballs)
function renderCustomBallPickers() {
  // 1~69 White Balls Grid
  const whiteGrid = document.getElementById('grid-white-balls');
  if (whiteGrid) {
    whiteGrid.innerHTML = '';
    for (let i = 1; i <= 69; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ball-pick-btn';

      const isFixed = state.fixedWhite.includes(i);
      const isExcluded = state.excludedWhite.includes(i);
      if (isFixed) btn.classList.add('is-fixed');
      if (isExcluded) btn.classList.add('is-excluded');

      btn.appendChild(createWhiteBall(i, 'sm'));

      btn.addEventListener('click', () => {
        sound.playClick();
        hideResultsArea();
        if (state.customPickMode === 'fixed') {
          if (isFixed) {
            state.fixedWhite = state.fixedWhite.filter(n => n !== i);
          } else {
            if (state.fixedWhite.length >= 4) {
              showToast('Maximum 4 White Balls can be fixed.');
              return;
            }
            state.excludedWhite = state.excludedWhite.filter(n => n !== i);
            state.fixedWhite.push(i);
            state.fixedWhite.sort((a, b) => a - b);
          }
        } else {
          if (isExcluded) {
            state.excludedWhite = state.excludedWhite.filter(n => n !== i);
          } else {
            if (state.excludedWhite.length >= 50) {
              showToast('Maximum 50 White Balls can be excluded.');
              return;
            }
            state.fixedWhite = state.fixedWhite.filter(n => n !== i);
            state.excludedWhite.push(i);
            state.excludedWhite.sort((a, b) => a - b);
          }
        }
        renderCustomBallPickers();
        updateCustomFilterPreviews();
      });

      whiteGrid.appendChild(btn);
    }
  }

  // 1~26 Powerball Grid
  const pbGrid = document.getElementById('grid-pb-balls');
  if (pbGrid) {
    pbGrid.innerHTML = '';
    for (let i = 1; i <= 26; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ball-pick-btn';

      const isFixed = state.fixedPB === i;
      const isExcluded = state.excludedPB.includes(i);
      if (isFixed) btn.classList.add('is-fixed');
      if (isExcluded) btn.classList.add('is-excluded');

      btn.appendChild(createPowerball(i, 'sm'));

      btn.addEventListener('click', () => {
        sound.playClick();
        hideResultsArea();
        if (state.customPickMode === 'fixed') {
          if (isFixed) {
            state.fixedPB = null;
          } else {
            state.excludedPB = state.excludedPB.filter(n => n !== i);
            state.fixedPB = i;
          }
        } else {
          if (isExcluded) {
            state.excludedPB = state.excludedPB.filter(n => n !== i);
          } else {
            if (state.fixedPB === i) state.fixedPB = null;
            state.excludedPB.push(i);
            state.excludedPB.sort((a, b) => a - b);
          }
        }
        renderCustomBallPickers();
        updateCustomFilterPreviews();
      });

      pbGrid.appendChild(btn);
    }
  }
}

function updateCustomFilterPreviews() {
  const fwCount = document.getElementById('fixed-white-count');
  const fpbCount = document.getElementById('fixed-pb-count');
  const exWCount = document.getElementById('ex-white-count');
  const exPBCount = document.getElementById('ex-pb-count');

  const fwBox = document.getElementById('fixed-white-preview');
  const fpbBox = document.getElementById('fixed-pb-preview');

  if (fwCount) fwCount.textContent = String(state.fixedWhite.length);
  if (fpbCount) fpbCount.textContent = state.fixedPB ? '1' : '0';
  if (exWCount) exWCount.textContent = String(state.excludedWhite.length);
  if (exPBCount) exPBCount.textContent = String(state.excludedPB.length);

  if (fwBox) {
    fwBox.innerHTML = '';
    if (state.fixedWhite.length === 0) {
      fwBox.innerHTML = '<span style="color: var(--text-muted);">None</span>';
    } else {
      state.fixedWhite.forEach(n => fwBox.appendChild(createWhiteBall(n, 'xs')));
    }
  }

  if (fpbBox) {
    fpbBox.innerHTML = '';
    if (!state.fixedPB) {
      fpbBox.innerHTML = '<span style="color: var(--text-muted);">None</span>';
    } else {
      fpbBox.appendChild(createPowerball(state.fixedPB, 'xs'));
    }
  }
}

// 9. Dreams, Zodiac, Constellations Renderers
function renderDreamItems(filter = '') {
  const container = document.getElementById('dream-items-container');
  if (!container) return;
  container.innerHTML = '';

  const list = DREAM_ITEMS.filter(d => 
    d.keyword.toLowerCase().includes(filter.toLowerCase()) || 
    d.meaning.toLowerCase().includes(filter.toLowerCase()) ||
    d.category.toLowerCase().includes(filter.toLowerCase())
  );

  if (list.length === 0) {
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 1rem;">No matching dream symbols found.</div>';
    return;
  }

  list.forEach(d => {
    const card = document.createElement('div');
    card.className = `dream-card ${state.selectedDreamId === d.id ? 'active' : ''}`;
    card.innerHTML = `
      <span class="dream-emoji">${d.emoji}</span>
      <span class="dream-keyword">${d.keyword}</span>
      <span class="dream-category">${d.category}</span>
    `;

    card.addEventListener('click', () => {
      sound.playClick();
      hideResultsArea();
      state.selectedDreamId = d.id;
      renderDreamItems(filter);
      updateDreamInfoBox();
    });

    container.appendChild(card);
  });

  updateDreamInfoBox();
}

// Helper to hide results area across all categories and menus until execution
function hideResultsArea() {
  const el = document.getElementById('results-area');
  if (el) el.style.display = 'none';
  const container = document.getElementById('games-list-container');
  if (container) container.innerHTML = '';
  state.currentTicket = null;
}

function updateDreamInfoBox() {
  const box = document.getElementById('dream-info-box');
  if (!box) return;
  const d = DREAM_ITEMS.find(item => item.id === state.selectedDreamId) || DREAM_ITEMS[0];
  box.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap; gap: 4px;">
      <strong style="color: #fca5a5; font-size: 0.85rem;">${d.emoji} ${d.keyword} Dream Interpretation</strong>
      <span style="color: var(--text-sub); font-size: 0.7rem;">Symbolic Archetype: <strong>${d.category}</strong></span>
    </div>
    <p style="margin-bottom: 0.4rem;">${d.meaning}</p>
    <div style="font-size: 0.75rem; color: #fde047; display: flex; align-items: center; gap: 0.35rem;">
      <span>✨ Click <strong>"Generate Powerball Numbers"</strong> below to generate sets based on this dream.</span>
    </div>
  `;
}

function renderZodiacItems() {
  const container = document.getElementById('zodiac-items-container');
  if (!container) return;
  container.innerHTML = '';

  ZODIAC_SIGNS.forEach(z => {
    const card = document.createElement('div');
    card.className = `zodiac-card ${state.selectedZodiacId === z.id ? 'active' : ''}`;
    card.innerHTML = `
      <span style="font-size: 1.3rem; display: block; margin-bottom: 2px;">${z.emoji}</span>
      <strong style="font-size: 0.8rem; color: #fff; display: block;">${z.name}</strong>
      <span style="font-size: 0.65rem; color: var(--text-muted);">${z.animal}</span>
    `;

    card.addEventListener('click', () => {
      sound.playClick();
      hideResultsArea();
      state.selectedZodiacId = z.id;
      renderZodiacItems();
      updateZodiacInfoBox();
    });

    container.appendChild(card);
  });

  updateZodiacInfoBox();
}

function updateZodiacInfoBox() {
  const box = document.getElementById('zodiac-info-box');
  if (!box) return;
  const z = ZODIAC_SIGNS.find(item => item.id === state.selectedZodiacId) || ZODIAC_SIGNS[0];
  box.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap; gap: 4px;">
      <strong style="color: #34d399; font-size: 0.85rem;">${z.emoji} Year of the ${z.name} (${z.animal}) Zodiac Fortune</strong>
      <span style="color: var(--text-muted); font-size: 0.7rem;">Guardian Powerball: <strong>${z.basePB}</strong></span>
    </div>
    <p style="margin-bottom: 0.4rem;">${z.blessing}</p>
    <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
      <span style="color: var(--text-sub);">Auspicious Numbers:</span>
      <div style="display: flex; gap: 4px; align-items: center;">
        ${z.baseWhite.map(n => `<div class="lotto-ball ball-xs ball-white">${n}</div>`).join('')}
        <span class="ball-plus-sign">+</span>
        <div class="lotto-ball ball-xs ball-powerball">${z.basePB}</div>
      </div>
    </div>
  `;
}

function renderConstellationItems() {
  const container = document.getElementById('constellation-items-container');
  if (!container) return;
  container.innerHTML = '';

  CONSTELLATION_ITEMS.forEach(c => {
    const card = document.createElement('div');
    card.className = `constellation-card ${state.selectedConstellationId === c.id ? 'active' : ''}`;
    card.innerHTML = `
      <span style="font-size: 1.3rem; display: block; margin-bottom: 2px;">${c.emoji}</span>
      <strong style="font-size: 0.8rem; color: #fff; display: block;">${c.name}</strong>
      <span style="font-size: 0.65rem; color: var(--text-muted);">${c.dates}</span>
    `;

    card.addEventListener('click', () => {
      sound.playClick();
      hideResultsArea();
      state.selectedConstellationId = c.id;
      renderConstellationItems();
      updateConstellationInfoBox();
    });

    container.appendChild(card);
  });

  updateConstellationInfoBox();
}

function updateConstellationInfoBox() {
  const box = document.getElementById('constellation-info-box');
  if (!box) return;
  const c = CONSTELLATION_ITEMS.find(item => item.id === state.selectedConstellationId) || CONSTELLATION_ITEMS[0];
  box.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap; gap: 4px;">
      <strong style="color: #c084fc; font-size: 0.85rem;">${c.emoji} ${c.name} (${c.dates}) Astrological Forecast</strong>
      <span style="color: var(--text-sub); font-size: 0.7rem;">Element: <strong>Astrology</strong></span>
    </div>
    <p style="margin-bottom: 0.4rem;">${c.blessing}</p>
    <div style="font-size: 0.75rem; color: #c084fc; display: flex; align-items: center; gap: 0.35rem;">
      <span>⭐ Click <strong>"Generate Powerball Numbers"</strong> below to create plays with this sign's cosmic alignment.</span>
    </div>
  `;
}

// 10. Virtual Dual-Chamber Drum Machine Simulator
function initDrumSimulation() {
  const canvas = document.getElementById('drum-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const startBtn = document.getElementById('btn-drum-start');
  const instantBtn = document.getElementById('btn-drum-instant');
  const resetBtn = document.getElementById('btn-drum-reset');
  const statusText = document.getElementById('drum-status-text');
  const chute = document.getElementById('drum-chute-balls');
  const finishBox = document.getElementById('drum-finish-box');
  const sortedBallsBox = document.getElementById('drum-sorted-balls');
  const sumLabel = document.getElementById('drum-sum-label');

  function createDrumParticles(isPowerball = false) {
    state.drumBalls = [];
    const count = isPowerball ? 26 : 69;
    const r = isPowerball ? 12 : 9;
    for (let i = 1; i <= count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 75;
      state.drumBalls.push({
        num: i,
        x: 145 + Math.cos(angle) * dist,
        y: 145 + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        r,
        isPB: isPowerball
      });
    }
  }

  function renderDrum() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Outer Chamber Glass Sphere
    const grad = ctx.createRadialGradient(130, 120, 20, 145, 145, 130);
    if (state.drumPhase === 'pb') {
      grad.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
      grad.addColorStop(0.8, 'rgba(185, 28, 28, 0.4)');
      grad.addColorStop(1, 'rgba(69, 10, 10, 0.7)');
    } else {
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(0.8, 'rgba(30, 41, 59, 0.5)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0.8)');
    }

    ctx.beginPath();
    ctx.arc(145, 145, 132, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = state.drumPhase === 'pb' ? '#ef4444' : '#64748b';
    ctx.stroke();

    // Specular reflection ring
    ctx.beginPath();
    ctx.arc(145, 145, 126, Math.PI * 1.1, Math.PI * 1.8);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Bouncing Balls
    state.drumBalls.forEach(b => {
      if (state.drumRunning) {
        b.x += b.vx;
        b.y += b.vy;

        // Swirl / Fan Wind
        b.vx += (Math.random() - 0.5) * 1.5;
        b.vy += (Math.random() - 0.5) * 1.5 + 0.1;

        // Chamber wall collision (radius 120)
        const dx = b.x - 145;
        const dy = b.y - 145;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 120 - b.r) {
          const nx = dx / dist;
          const ny = dy / dist;
          b.x = 145 + nx * (120 - b.r);
          b.y = 145 + ny * (120 - b.r);
          const dot = b.vx * nx + b.vy * ny;
          b.vx = (b.vx - 2 * dot * nx) * 0.88;
          b.vy = (b.vy - 2 * dot * ny) * 0.88;
        }
      }

      // Draw Ball
      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      if (b.isPB) {
        const pbGrad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, 1, b.x, b.y, b.r);
        pbGrad.addColorStop(0, '#fca5a5');
        pbGrad.addColorStop(0.5, '#ef4444');
        pbGrad.addColorStop(1, '#991b1b');
        ctx.fillStyle = pbGrad;
      } else {
        const wGrad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, 1, b.x, b.y, b.r);
        wGrad.addColorStop(0, '#ffffff');
        wGrad.addColorStop(0.7, '#cbd5e1');
        wGrad.addColorStop(1, '#94a3b8');
        ctx.fillStyle = wGrad;
      }
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = b.isPB ? '#f87171' : '#cbd5e1';
      ctx.stroke();

      // Number text
      ctx.fillStyle = b.isPB ? '#ffffff' : '#0f172a';
      ctx.font = `bold ${b.r > 10 ? 9 : 7.5}px 'Pretendard', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(b.num), b.x, b.y + 0.5);
      ctx.restore();
    });

    state.drumAnimFrame = requestAnimationFrame(renderDrum);
  }

  createDrumParticles(false);
  renderDrum();

  function runFullDrawing() {
    state.drumRunning = true;
    state.drumPhase = 'white';
    state.drumDrawnWhite = [];
    state.drumDrawnPB = null;
    state.drumMultiplier = getRandomPowerPlay();

    if (startBtn) startBtn.style.display = 'none';
    if (instantBtn) instantBtn.style.display = 'inline-flex';
    if (resetBtn) resetBtn.style.display = 'none';
    if (finishBox) finishBox.style.display = 'none';
    if (chute) chute.innerHTML = '';

    createDrumParticles(false);

    // Pick 5 random white balls
    const whitePool = Array.from({ length: 69 }, (_, i) => i + 1).sort(() => 0.5 - Math.random());
    const targetWhite = whitePool.slice(0, 5);
    const targetPB = Math.floor(Math.random() * 26) + 1;

    let whiteCount = 0;
    const drawWhiteInterval = setInterval(() => {
      if (!state.drumRunning) {
        clearInterval(drawWhiteInterval);
        return;
      }

      if (whiteCount < 5) {
        const num = targetWhite[whiteCount];
        state.drumDrawnWhite.push(num);
        sound.playBallPop();

        if (statusText) statusText.textContent = `[White Ball Chamber] Ball #${whiteCount + 1} (${num}) Drawn!`;

        const bEl = createWhiteBall(num, 'md');
        bEl.style.animation = 'fadeIn 0.3s ease-out';
        if (chute) chute.appendChild(bEl);

        whiteCount++;
      } else {
        clearInterval(drawWhiteInterval);
        // Switch to Powerball Chamber
        state.drumPhase = 'pb';
        createDrumParticles(true);
        if (statusText) statusText.textContent = `🔴 [Red Powerball Chamber] 26 Powerballs Swirling...`;

        setTimeout(() => {
          if (!state.drumRunning) return;
          state.drumDrawnPB = targetPB;
          sound.playPowerballPop();

          const plus = document.createElement('span');
          plus.className = 'ball-plus-sign';
          plus.textContent = '+';
          if (chute) chute.appendChild(plus);

          const pbEl = createPowerball(targetPB, 'md');
          pbEl.style.animation = 'fadeIn 0.3s ease-out';
          if (chute) chute.appendChild(pbEl);

          const ppBadge = createPowerPlayBadge(state.drumMultiplier);
          if (chute) chute.appendChild(ppBadge);

          finishDrawing();
        }, 1800);
      }
    }, 1400);
  }

  function finishDrawing() {
    state.drumRunning = false;
    state.drumPhase = 'done';
    sound.playWinFanfare();
    triggerConfetti();

    if (startBtn) startBtn.style.display = 'none';
    if (instantBtn) instantBtn.style.display = 'none';
    if (resetBtn) resetBtn.style.display = 'inline-flex';
    if (statusText) statusText.textContent = `🎉 Powerball Draw Complete! Winning combination generated.`;

    // Render sorted finish box
    if (finishBox && sortedBallsBox && sumLabel) {
      finishBox.style.display = 'block';
      sortedBallsBox.innerHTML = '';

      const sortedW = [...state.drumDrawnWhite].sort((a, b) => a - b);
      const sum = sortedW.reduce((a, b) => a + b, 0);
      const odds = sortedW.filter(n => n % 2 !== 0).length;
      sumLabel.textContent = `White Balls Sum: ${sum} | Odd/Even: ${odds}:${5 - odds}`;

      sortedW.forEach(n => sortedBallsBox.appendChild(createWhiteBall(n, 'md')));
      const plus = document.createElement('span');
      plus.className = 'ball-plus-sign';
      plus.textContent = '+';
      sortedBallsBox.appendChild(plus);
      sortedBallsBox.appendChild(createPowerball(state.drumDrawnPB, 'md'));
      sortedBallsBox.appendChild(createPowerPlayBadge(state.drumMultiplier));
    }
  }

  function instantFinish() {
    state.drumRunning = false;
    state.drumPhase = 'done';

    const whitePool = Array.from({ length: 69 }, (_, i) => i + 1).sort(() => 0.5 - Math.random());
    state.drumDrawnWhite = whitePool.slice(0, 5);
    state.drumDrawnPB = Math.floor(Math.random() * 26) + 1;
    state.drumMultiplier = getRandomPowerPlay();

    if (chute) {
      chute.innerHTML = '';
      state.drumDrawnWhite.forEach(n => chute.appendChild(createWhiteBall(n, 'md')));
      const plus = document.createElement('span');
      plus.className = 'ball-plus-sign';
      plus.textContent = '+';
      chute.appendChild(plus);
      chute.appendChild(createPowerball(state.drumDrawnPB, 'md'));
      chute.appendChild(createPowerPlayBadge(state.drumMultiplier));
    }

    finishDrawing();
  }

  startBtn?.addEventListener('click', runFullDrawing);
  instantBtn?.addEventListener('click', instantFinish);
  resetBtn?.addEventListener('click', () => {
    state.drumRunning = false;
    state.drumPhase = 'idle';
    createDrumParticles(false);
    if (startBtn) startBtn.style.display = 'inline-flex';
    if (instantBtn) instantBtn.style.display = 'none';
    if (resetBtn) resetBtn.style.display = 'none';
    if (finishBox) finishBox.style.display = 'none';
    if (chute) chute.innerHTML = '<span style="font-size: 0.75rem; color: var(--text-muted); width: 100%; text-align: center; padding: 1rem 0;">Click \'Start Powerball Draw\' to release the balls</span>';
    if (statusText) statusText.textContent = 'Click the button or chamber to start drawing 5 White Balls + 1 Red Powerball';
  });

  // Save drum combination
  document.getElementById('btn-save-drum-game')?.addEventListener('click', () => {
    sound.playClick();
    if (state.drumDrawnWhite.length < 5 || !state.drumDrawnPB) return;

    const sortedW = [...state.drumDrawnWhite].sort((a, b) => a - b);
    const sum = sortedW.reduce((a, b) => a + b, 0);
    const odds = sortedW.filter(n => n % 2 !== 0).length;

    const game = {
      id: `game-drum-${Date.now()}`,
      label: 'DRUM',
      white: sortedW,
      pb: state.drumDrawnPB,
      powerPlay: state.drumMultiplier,
      modeLabel: 'Live Simulator',
      sum,
      odds,
      evens: 5 - odds,
      highs: sortedW.filter(n => n >= 35).length,
      lows: 5 - sortedW.filter(n => n >= 35).length
    };

    state.savedTickets.unshift({
      id: `ticket-drum-${Date.now()}`,
      createdAt: new Date().toISOString(),
      title: `🎰 Live Draw Simulator (${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })})`,
      games: [game]
    });

    saveTicketsToStorage();
    showToast('💾 Live draw combination saved to Vault!');
  });
}

// 11. Statistics Tab Visualizer (1~69 White Balls / 1~26 Powerballs)
function renderStatistics() {
  const hot5Box = document.getElementById('hot-top5-container');
  const cold5Box = document.getElementById('cold-top5-container');
  const freqGrid = document.getElementById('all-freq-grid');

  if (hot5Box) {
    hot5Box.innerHTML = '';
    const top5White = Object.entries(WHITE_BALL_FREQUENCIES)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    top5White.forEach(([num, count]) => {
      const col = document.createElement('div');
      col.style.display = 'flex';
      col.style.flexDirection = 'column';
      col.style.alignItems = 'center';
      col.style.gap = '4px';
      col.appendChild(createWhiteBall(Number(num), 'md'));
      col.innerHTML += `<span style="font-size: 0.7rem; color: #38bdf8; font-weight: 800;">${count}x</span>`;
      hot5Box.appendChild(col);
    });
  }

  if (cold5Box) {
    cold5Box.innerHTML = '';
    const top5PB = Object.entries(POWERBALL_FREQUENCIES)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    top5PB.forEach(([num, count]) => {
      const col = document.createElement('div');
      col.style.display = 'flex';
      col.style.flexDirection = 'column';
      col.style.alignItems = 'center';
      col.style.gap = '4px';
      col.appendChild(createPowerball(Number(num), 'md'));
      col.innerHTML += `<span style="font-size: 0.7rem; color: #f87171; font-weight: 800;">${count}x</span>`;
      cold5Box.appendChild(col);
    });
  }

  if (freqGrid) {
    freqGrid.innerHTML = '';
    const isPBMode = state.statsViewMode === 'pb';
    const sourceData = isPBMode ? POWERBALL_FREQUENCIES : WHITE_BALL_FREQUENCIES;

    let entries = Object.entries(sourceData).map(([k, v]) => ({ num: Number(k), count: v }));

    if (state.statsSortMode === 'hot') {
      entries.sort((a, b) => b.count - a.count);
    } else if (state.statsSortMode === 'cold') {
      entries.sort((a, b) => a.count - b.count);
    } else {
      entries.sort((a, b) => a.num - b.num);
    }

    const maxCount = Math.max(...entries.map(e => e.count));

    entries.forEach(e => {
      const card = document.createElement('div');
      card.className = 'freq-card';

      const ball = isPBMode ? createPowerball(e.num, 'sm') : createWhiteBall(e.num, 'sm');
      card.appendChild(ball);

      const countEl = document.createElement('span');
      countEl.className = 'freq-count';
      countEl.textContent = `${e.count}x`;
      card.appendChild(countEl);

      const bar = document.createElement('div');
      bar.className = 'freq-bar';
      const pct = Math.round((e.count / maxCount) * 100);
      bar.innerHTML = `<div class="freq-fill" style="width: ${pct}%; background: ${isPBMode ? '#ef4444' : '#38bdf8'};"></div>`;
      card.appendChild(bar);

      freqGrid.appendChild(card);
    });
  }
}

// 12. Storage Vault Renderer
function renderSavedVault() {
  const container = document.getElementById('storage-list-container');
  if (!container) return;

  if (state.savedTickets.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">💾</span>
        <strong style="color: #fff; font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">No Saved Combinations Yet</strong>
        <p style="font-size: 0.75rem;">Generate numbers or use the Live Simulator, then click 'Save to Vault' to keep them here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  state.savedTickets.forEach((ticket, tIdx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.marginBottom = '0.75rem';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.marginBottom = '0.75rem';
    header.style.flexWrap = 'wrap';
    header.style.gap = '0.5rem';

    const dateStr = new Date(ticket.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    header.innerHTML = `
      <div>
        <strong style="color: #fff; font-size: 0.9rem;">${ticket.title}</strong>
        <span style="font-size: 0.7rem; color: var(--text-muted); margin-left: 0.4rem;">(${dateStr})</span>
      </div>
      <div style="display: flex; gap: 0.35rem;">
        <button type="button" class="btn-action btn-copy-saved" data-index="${tIdx}" style="padding: 3px 8px; font-size: 0.7rem;">
          📋 Copy
        </button>
        <button type="button" class="btn-action btn-del-saved" data-index="${tIdx}" style="padding: 3px 8px; font-size: 0.7rem; color: #fb7185; border-color: rgba(251, 113, 133, 0.3);">
          🗑️ Delete
        </button>
      </div>
    `;
    card.appendChild(header);

    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '0.4rem';

    ticket.games.forEach(g => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.justifyContent = 'space-between';
      row.style.padding = '0.4rem 0.6rem';
      row.style.background = '#060a12';
      row.style.borderRadius = '8px';
      row.style.border = '1px solid var(--border-main)';
      row.style.flexWrap = 'wrap';
      row.style.gap = '0.4rem';

      const left = document.createElement('div');
      left.style.display = 'flex';
      left.style.alignItems = 'center';
      left.style.gap = '0.4rem';
      left.style.flexWrap = 'wrap';

      const b = document.createElement('span');
      b.className = 'game-badge';
      b.textContent = g.label;
      b.style.width = '20px';
      b.style.height = '20px';
      b.style.fontSize = '0.65rem';
      left.appendChild(b);

      g.white.forEach(n => left.appendChild(createWhiteBall(n, 'sm')));
      const plus = document.createElement('span');
      plus.className = 'ball-plus-sign';
      plus.textContent = '+';
      left.appendChild(plus);
      left.appendChild(createPowerball(g.pb, 'sm'));
      left.appendChild(createPowerPlayBadge(g.powerPlay));

      const right = document.createElement('span');
      right.style.fontSize = '0.65rem';
      right.style.color = 'var(--text-muted)';
      right.textContent = `Sum: ${g.sum} | ${g.modeLabel}`;

      row.appendChild(left);
      row.appendChild(right);
      list.appendChild(row);
    });

    card.appendChild(list);
    container.appendChild(card);
  });

  // Attach dynamic handlers
  container.querySelectorAll('.btn-copy-saved').forEach(btn => {
    btn.addEventListener('click', e => {
      sound.playClick();
      const idx = Number(e.currentTarget.dataset.index);
      const ticket = state.savedTickets[idx];
      if (!ticket) return;

      const lines = ticket.games.map(g => `${g.label}: [${g.white.join(', ')}] + PB: ${g.pb} (Power Play: ${g.powerPlay}X)`);
      navigator.clipboard.writeText(lines.join('\n'));
      showToast('📋 Saved ticket copied to clipboard!');
    });
  });

  container.querySelectorAll('.btn-del-saved').forEach(btn => {
    btn.addEventListener('click', e => {
      sound.playClick();
      const idx = Number(e.currentTarget.dataset.index);
      state.savedTickets.splice(idx, 1);
      saveTicketsToStorage();
      renderSavedVault();
      showToast('🗑️ Combination deleted from Vault.');
    });
  });
}

// 13. Draw Countdown Timer (EST 10:59 PM Mon / Wed / Sat)
function initDrawCountdown() {
  function updateTimer() {
    const now = new Date();
    // Powerball draws occur Mondays, Wednesdays, Saturdays at 10:59 PM EST (UTC-5)
    // Approximate next draw calculation
    const dDays = document.getElementById('t-days');
    const dHours = document.getElementById('t-hours');
    const dMins = document.getElementById('t-mins');
    const dSecs = document.getElementById('t-secs');

    // Simple countdown logic: Next 22:59 EST
    const target = new Date();
    const day = target.getUTCDay(); // 0:Sun, 1:Mon, 2:Tue, 3:Wed, 4:Thu, 5:Fri, 6:Sat
    // Target draw days: Mon(1), Wed(3), Sat(6) UTC+3:59
    let daysToAdd = 1;
    if (day === 1 || day === 3 || day === 6) {
      daysToAdd = 2;
    }

    target.setHours(22, 59, 0, 0);
    let diff = target.getTime() - now.getTime();
    if (diff < 0) {
      target.setDate(target.getDate() + daysToAdd);
      diff = target.getTime() - now.getTime();
    }

    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (dDays) dDays.textContent = `${days}d`;
    if (dHours) dHours.textContent = `${String(hrs).padStart(2, '0')}h`;
    if (dMins) dMins.textContent = `${String(mins).padStart(2, '0')}m`;
    if (dSecs) dSecs.textContent = `${String(secs).padStart(2, '0')}s`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// 14. Initialize Application & Event Listeners
function initApp() {
  loadSavedTickets();

  // Navigation Tabs
  const navTabs = document.querySelectorAll('.nav-tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  navTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      hideResultsArea();
      const tabKey = btn.dataset.tab;
      state.activeTab = tabKey;

      navTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panes.forEach(p => p.classList.remove('active'));
      const activePane = document.getElementById(`pane-${tabKey}`);
      if (activePane) activePane.classList.add('active');

      if (tabKey === 'stats') renderStatistics();
      if (tabKey === 'storage') renderSavedVault();
    });
  });

  // Hot / Triples Checkboxes
  document.getElementById('chk-prefer-hot')?.addEventListener('change', () => {
    hideResultsArea();
    if (state.selectedMode === 'stats') renderInstantRecommendations(true);
  });
  document.getElementById('chk-avoid-triples')?.addEventListener('change', () => {
    hideResultsArea();
    if (state.selectedMode === 'stats') renderInstantRecommendations(true);
  });

  // Instant Recommendations Action Buttons
  document.getElementById('btn-refresh-instant')?.addEventListener('click', () => {
    sound.playClick();
    renderInstantRecommendations(true);
    showToast('🔄 2 Recommended plays refreshed!');
  });

  document.getElementById('btn-copy-instant')?.addEventListener('click', () => {
    sound.playClick();
    if (!state.instantPlays || state.instantPlays.length === 0) return;
    const lines = state.instantPlays.map(g => `Play ${g.label}: [${g.white.join(', ')}] + PB: ${g.pb} (${g.powerPlay}X)`);
    navigator.clipboard.writeText(lines.join('\n'));
    showToast('📋 2 Recommended plays copied to clipboard!');
  });

  // Sound Toggle Button
  const soundBtn = document.getElementById('btn-sound-toggle');
  soundBtn?.addEventListener('click', () => {
    sound.enabled = !sound.enabled;
    soundBtn.textContent = sound.enabled ? '🔊' : '🔇';
    soundBtn.classList.toggle('active', sound.enabled);
    showToast(sound.enabled ? '🔊 Sound Effects On' : '🔇 Sound Effects Muted');
  });

  // Mode Buttons
  const modeBtns = document.querySelectorAll('.mode-btn');
  const subContents = document.querySelectorAll('.sub-mode-content');

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const mode = btn.dataset.mode;
      state.selectedMode = mode;

      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      subContents.forEach(sc => (sc.style.display = 'none'));
      const activeSub = document.getElementById(`sub-mode-${mode}`);
      if (activeSub) activeSub.style.display = 'block';

      hideResultsArea();
      renderInstantRecommendations(true);
    });
  });

  // Odd Ratio Buttons
  const ratioBtns = document.querySelectorAll('.btn-ratio-btn');
  ratioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      ratioBtns.forEach(b => b.classList.remove('btn-action-primary'));
      btn.classList.add('btn-action-primary');
      state.oddRatio = btn.dataset.ratio;
      hideResultsArea();
      if (state.selectedMode === 'stats') renderInstantRecommendations(true);
    });
  });

  // Custom Pick Target Toggle (White Ball vs Powerball)
  const btnWhiteTarget = document.getElementById('btn-custom-target-white');
  const btnPBTarget = document.getElementById('btn-custom-target-pb');
  const secWhite = document.getElementById('custom-white-section');
  const secPB = document.getElementById('custom-pb-section');

  btnWhiteTarget?.addEventListener('click', () => {
    sound.playClick();
    hideResultsArea();
    state.customTarget = 'white';
    btnWhiteTarget.classList.add('btn-action-primary');
    btnPBTarget?.classList.remove('btn-action-primary');
    if (secWhite) secWhite.style.display = 'block';
    if (secPB) secPB.style.display = 'none';
  });

  btnPBTarget?.addEventListener('click', () => {
    sound.playClick();
    hideResultsArea();
    state.customTarget = 'pb';
    btnPBTarget.classList.add('btn-action-primary');
    btnWhiteTarget?.classList.remove('btn-action-primary');
    if (secWhite) secWhite.style.display = 'none';
    if (secPB) secPB.style.display = 'block';
  });

  // Custom Pick Mode (+ Fixed vs - Excluded)
  const btnModeFixed = document.getElementById('btn-pick-mode-fixed');
  const btnModeExcluded = document.getElementById('btn-pick-mode-excluded');

  btnModeFixed?.addEventListener('click', () => {
    sound.playClick();
    hideResultsArea();
    state.customPickMode = 'fixed';
    btnModeFixed.classList.add('btn-action-primary');
    btnModeExcluded?.classList.remove('btn-action-primary');
  });

  btnModeExcluded?.addEventListener('click', () => {
    sound.playClick();
    hideResultsArea();
    state.customPickMode = 'excluded';
    btnModeExcluded.classList.add('btn-action-primary');
    btnModeFixed?.classList.remove('btn-action-primary');
  });

  // Reset Filters Button
  document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
    sound.playClick();
    hideResultsArea();
    state.fixedWhite = [];
    state.fixedPB = null;
    state.excludedWhite = [];
    state.excludedPB = [];
    renderCustomBallPickers();
    updateCustomFilterPreviews();
    showToast('🔄 Custom filters cleared.');
  });

  // Dream Search
  const dreamInput = document.getElementById('input-dream-search');
  const dreamSearchBtn = document.getElementById('btn-dream-search');

  dreamSearchBtn?.addEventListener('click', () => {
    sound.playClick();
    hideResultsArea();
    renderDreamItems(dreamInput?.value || '');
  });

  dreamInput?.addEventListener('input', e => {
    hideResultsArea();
    renderDreamItems(e.target.value);
  });

  // Horoscope Birthday Selector
  const selectMonth = document.getElementById('select-birth-month');
  const selectDay = document.getElementById('select-birth-day');
  const btnFindCons = document.getElementById('btn-find-constellation');

  selectMonth?.addEventListener('change', () => {
    hideResultsArea();
  });
  selectDay?.addEventListener('change', () => {
    hideResultsArea();
  });

  if (selectMonth && selectDay) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach((m, idx) => {
      const opt = document.createElement('option');
      opt.value = idx + 1;
      opt.textContent = `${idx + 1} (${m})`;
      selectMonth.appendChild(opt);
    });

    for (let d = 1; d <= 31; d++) {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = `${d}`;
      selectDay.appendChild(opt);
    }
  }

  btnFindCons?.addEventListener('click', () => {
    sound.playClick();
    hideResultsArea();
    const m = Number(selectMonth.value);
    const d = Number(selectDay.value);

    let foundId = 'capricorn';
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) foundId = 'aquarius';
    else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) foundId = 'pisces';
    else if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) foundId = 'aries';
    else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) foundId = 'taurus';
    else if ((m === 5 && d >= 21) || (m === 6 && d <= 21)) foundId = 'gemini';
    else if ((m === 6 && d >= 22) || (m === 7 && d <= 22)) foundId = 'cancer';
    else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) foundId = 'leo';
    else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) foundId = 'virgo';
    else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) foundId = 'libra';
    else if ((m === 10 && d >= 23) || (m === 11 && d <= 22)) foundId = 'scorpio';
    else if ((m === 11 && d >= 23) || (m === 12 && d <= 21)) foundId = 'sagittarius';

    state.selectedConstellationId = foundId;
    renderConstellationItems();
    updateConstellationInfoBox();
    showToast(`⭐ Matched Horoscope: ${CONSTELLATION_ITEMS.find(c => c.id === foundId)?.name}`);
  });

  // Main Generate Button
  document.getElementById('btn-generate-main')?.addEventListener('click', () => {
    generateFullTicket();
  });

  // Copy Ticket Button
  document.getElementById('btn-copy-ticket')?.addEventListener('click', () => {
    sound.playClick();
    if (!state.currentTicket) return;
    const lines = state.currentTicket.games.map(g => `${g.label}: [${g.white.join(', ')}] + PB: ${g.pb} (${g.powerPlay}X)`);
    navigator.clipboard.writeText(lines.join('\n'));
    showToast('📋 All 5 Powerball lines copied to clipboard!');
  });

  // Save Ticket Button
  document.getElementById('btn-save-ticket')?.addEventListener('click', () => {
    sound.playClick();
    if (!state.currentTicket) return;
    state.savedTickets.unshift(state.currentTicket);
    saveTicketsToStorage();
    showToast('💾 5 Powerball combinations saved to Vault!');
  });

  // Clear Storage Button
  document.getElementById('btn-clear-all-storage')?.addEventListener('click', () => {
    sound.playClick();
    if (state.savedTickets.length === 0) return;
    state.savedTickets = [];
    saveTicketsToStorage();
    renderSavedVault();
    showToast('🗑️ All saved combinations cleared.');
  });

  // Statistics View Toggles
  document.getElementById('btn-stats-view-white')?.addEventListener('click', e => {
    sound.playClick();
    state.statsViewMode = 'white';
    e.currentTarget.classList.add('btn-action-primary');
    document.getElementById('btn-stats-view-pb')?.classList.remove('btn-action-primary');
    renderStatistics();
  });

  document.getElementById('btn-stats-view-pb')?.addEventListener('click', e => {
    sound.playClick();
    state.statsViewMode = 'pb';
    e.currentTarget.classList.add('btn-action-primary');
    document.getElementById('btn-stats-view-white')?.classList.remove('btn-action-primary');
    renderStatistics();
  });

  // Statistics Sort Buttons
  const statSortBtns = document.querySelectorAll('#stats-sort-btns .btn-action');
  statSortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      statSortBtns.forEach(b => b.classList.remove('btn-action-primary'));
      btn.classList.add('btn-action-primary');
      state.statsSortMode = btn.dataset.sort;
      renderStatistics();
    });
  });

  // Initialize Sub-renderers
  renderCustomBallPickers();
  updateCustomFilterPreviews();
  renderDreamItems();
  renderZodiacItems();
  renderConstellationItems();
  initDrumSimulation();
  initDrawCountdown();
  renderInstantRecommendations(true);
}

// Start on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
