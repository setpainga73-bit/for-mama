/* ============================================================
   APOLOGY CARD - INTERACTIVE SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all systems
  initFloatingHearts('heartsPage1', 25);
  initDodgeButton();
  initAcceptButton();
  initCouponTabs();
  initRedeemButtons();
});

/* ============================================================
   PAGE NAVIGATION
   ============================================================ */
let currentPage = 1;

function goToPage(pageNum) {
  const current = document.getElementById(`page${currentPage}`);
  const next = document.getElementById(`page${pageNum}`);

  if (!current || !next) return;

  // Add leaving class to current
  current.classList.add('leaving');
  current.classList.remove('active');

  // After transition, activate next
  setTimeout(() => {
    current.classList.remove('leaving');
    next.classList.add('active');
    currentPage = pageNum;

    // Initialize page-specific effects
    if (pageNum === 2) {
      initConfettiHearts();
      initCatBubbles();
      showCatContainer();
    } else if (pageNum === 3) {
      initFloatingFlowers();
      hideCatContainer();
    } else if (pageNum === 4) {
      initFloatingHearts('heartsPage4', 10);
      hideCatContainer();
    } else {
      hideCatContainer();
    }
  }, 400);
}

function showCatContainer() {
  const cat = document.getElementById('catContainer');
  if (cat) {
    cat.style.display = 'block';
    cat.style.opacity = '1';
  }
}

function hideCatContainer() {
  const cat = document.getElementById('catContainer');
  if (cat) {
    cat.style.opacity = '0';
    setTimeout(() => { cat.style.display = 'none'; }, 500);
  }
}

/* ============================================================
   FLOATING HEARTS (PAGE 1 & 4)
   ============================================================ */
function initFloatingHearts(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const hearts = ['❤️', '💕', '💗', '💖', '💓', '🤍', '💞', '♥'];
  const sizes = [14, 18, 22, 26, 30, 16, 20];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      createFloatingHeart(container, hearts, sizes);
    }, i * 600);
  }

  // Keep generating hearts
  setInterval(() => {
    createFloatingHeart(container, hearts, sizes);
  }, 2000);
}

function createFloatingHeart(container, hearts, sizes) {
  const heart = document.createElement('span');
  heart.classList.add('floating-heart');
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  
  const size = sizes[Math.floor(Math.random() * sizes.length)];
  const left = Math.random() * 100;
  const duration = 8 + Math.random() * 10;
  const delay = Math.random() * 3;
  const drift = -40 + Math.random() * 80;
  const rotation = -60 + Math.random() * 120;

  heart.style.cssText = `
    font-size: ${size}px;
    left: ${left}%;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    --drift: ${drift}px;
    --rotation: ${rotation}deg;
  `;

  container.appendChild(heart);

  // Clean up after animation
  setTimeout(() => {
    if (heart.parentNode) heart.parentNode.removeChild(heart);
  }, (duration + delay) * 1000);
}

/* ============================================================
   DODGE BUTTON (PAGE 1)
   ============================================================ */
function initDodgeButton() {
  const rejectBtn = document.getElementById('rejectBtn');
  if (!rejectBtn) return;

  let dodgeCount = 0;
  const messages = [
    'မပြေဘူး 😤',
    'တကယ်ပြော?! 😢',
    'ထပ်စဉ်းစားပါ! 🥺',
    'ဟင်... 💔',
    'ငါ့ကို ခွင့်လွှတ်ပါ... 😭',
  ];

  function dodgeAway(e) {
    e.preventDefault();
    dodgeCount++;

    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    const btnW = rejectBtn.offsetWidth;
    const btnH = rejectBtn.offsetHeight;

    // Calculate new random position
    const padding = 20;
    const maxX = viewW - btnW - padding;
    const maxY = viewH - btnH - padding;
    const newX = padding + Math.random() * maxX;
    const newY = padding + Math.random() * maxY;

    // Apply dodge
    if (!rejectBtn.classList.contains('dodging')) {
      rejectBtn.classList.add('dodging');
    }

    rejectBtn.style.left = `${newX}px`;
    rejectBtn.style.top = `${newY}px`;
    rejectBtn.style.transform = `rotate(${-15 + Math.random() * 30}deg)`;

    // Change text
    if (dodgeCount <= messages.length) {
      rejectBtn.textContent = messages[Math.min(dodgeCount - 1, messages.length - 1)];
    }

    // Shrink after many dodges
    if (dodgeCount > 5) {
      const scale = Math.max(0.5, 1 - (dodgeCount - 5) * 0.08);
      rejectBtn.style.transform += ` scale(${scale})`;
    }

    // Disappear after many attempts
    if (dodgeCount > 12) {
      rejectBtn.style.opacity = '0';
      setTimeout(() => {
        rejectBtn.style.display = 'none';
      }, 300);
    }
  }

  // Desktop: dodge on hover
  rejectBtn.addEventListener('mouseenter', dodgeAway);
  // Mobile: dodge on touch
  rejectBtn.addEventListener('touchstart', dodgeAway, { passive: false });
}

/* ============================================================
   ACCEPT BUTTON (PAGE 1 → PAGE 2)
   ============================================================ */
function initAcceptButton() {
  const acceptBtn = document.getElementById('acceptBtn');
  if (!acceptBtn) return;

  acceptBtn.addEventListener('click', () => {
    // Add a burst effect
    acceptBtn.style.transform = 'scale(1.2)';
    acceptBtn.style.boxShadow = '0 0 40px rgba(255,64,129,0.6)';
    
    setTimeout(() => {
      goToPage(2);
    }, 300);
  });

  // Navigate from page 2 to 3
  const toPage3 = document.getElementById('toPage3Btn');
  if (toPage3) {
    toPage3.addEventListener('click', () => goToPage(3));
  }

  // Navigate from page 3 to 4
  const toPage4 = document.getElementById('toPage4Btn');
  if (toPage4) {
    toPage4.addEventListener('click', () => goToPage(4));
  }
}

/* ============================================================
   CONFETTI HEARTS (PAGE 2)
   ============================================================ */
function initConfettiHearts() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;

  const confettiHearts = ['💗', '💖', '💕', '❤️', '🩷', '💓', '♥', '🤍'];
  
  // Initial burst
  for (let i = 0; i < 40; i++) {
    setTimeout(() => createConfettiHeart(container, confettiHearts), i * 80);
  }

  // Continuous
  setInterval(() => {
    createConfettiHeart(container, confettiHearts);
  }, 500);
}

function createConfettiHeart(container, hearts) {
  const heart = document.createElement('span');
  heart.classList.add('confetti-heart');
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  const size = 10 + Math.random() * 16;
  const left = Math.random() * 100;
  const duration = 3 + Math.random() * 5;
  const spin = 180 + Math.random() * 360;

  heart.style.cssText = `
    font-size: ${size}px;
    left: ${left}%;
    animation-duration: ${duration}s;
    --spin: ${spin}deg;
  `;

  container.appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode) heart.parentNode.removeChild(heart);
  }, duration * 1000);
}

/* ============================================================
   CAT HEART BUBBLES (PAGE 2)
   ============================================================ */
function initCatBubbles() {
  const bubbleZone = document.getElementById('catBubbles');
  if (!bubbleZone) return;

  const hearts = ['💕', '💗', '❤️', '🩷', '♥'];

  function createBubble() {
    const bubble = document.createElement('span');
    bubble.classList.add('cat-heart-bubble');
    bubble.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    bubble.style.setProperty('--bx', `${-10 + Math.random() * 40}px`);
    bubble.style.left = `${30 + Math.random() * 40}px`;
    
    bubbleZone.appendChild(bubble);

    setTimeout(() => {
      if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
    }, 2500);
  }

  // Create bubbles periodically
  createBubble();
  setInterval(createBubble, 3000);
}

/* ============================================================
   FLOATING FLOWERS (PAGE 3)
   ============================================================ */
function initFloatingFlowers() {
  const container = document.getElementById('flowerContainer');
  if (!container) return;

  const colors = [
    '#fff9c4', // Pastel Yellow
    '#fffdd0', // Cream
    '#ff7f7f', // Coral
    '#ffc2d1', // Pastel Pink
    '#e8d5f5', // Light Lavender
    '#fce4ec', // Very Light Pink
  ];

  // Initial batch
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      createFlower(container, colors);
    }, i * 400);
  }

  // Keep creating
  setInterval(() => {
    createFlower(container, colors);
  }, 1500);
}

function createFlower(container, colors) {
  const flower = document.createElement('div');
  flower.classList.add('petal-flower');

  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;
  const duration = 12 + Math.random() * 10;
  const delay = Math.random() * 2;
  const spin = 100 + Math.random() * 300;
  const drift = -50 + Math.random() * 100;
  const scale = 0.6 + Math.random() * 0.8;

  flower.style.cssText = `
    left: ${left}%;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    --flower-color: ${color};
    --flower-spin: ${spin}deg;
    --flower-drift: ${drift}px;
    transform: scale(${scale});
  `;

  // Extra petals for 4-petal shape
  const petal1 = document.createElement('div');
  petal1.classList.add('petal-extra');
  const petal2 = document.createElement('div');
  petal2.classList.add('petal-extra');
  const center = document.createElement('div');
  center.classList.add('petal-center');

  flower.appendChild(petal1);
  flower.appendChild(petal2);
  flower.appendChild(center);

  container.appendChild(flower);

  setTimeout(() => {
    if (flower.parentNode) flower.parentNode.removeChild(flower);
  }, (duration + delay) * 1000);
}

/* ============================================================
   COUPON TABS (PAGE 4)
   ============================================================ */
function initCouponTabs() {
  const tabs = document.querySelectorAll('.tab');
  const tickets = document.querySelectorAll('.coupon-ticket');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Slide in the matching coupon
      tickets.forEach(ticket => {
        if (ticket.dataset.coupon === target) {
          ticket.classList.add('active');
        } else {
          ticket.classList.remove('active');
        }
      });
    });
  });
}

/* ============================================================
   REDEEM BUTTONS (PAGE 4)
   ============================================================ */
function initRedeemButtons() {
  const redeemBtns = document.querySelectorAll('.btn-redeem');

  redeemBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const couponId = btn.dataset.for;
      const stamp = document.getElementById(`stamp${capitalizeFirst(couponId)}`);

      if (!stamp || stamp.classList.contains('stamped')) return;

      // Play stamp animation
      stamp.classList.add('stamped');
      btn.disabled = true;
      btn.textContent = 'Redeemed ✅';

      // Add subtle shake to the coupon
      const coupon = btn.closest('.coupon-ticket');
      if (coupon) {
        coupon.style.animation = 'none';
        coupon.offsetHeight; // Trigger reflow
        coupon.style.animation = 'couponShake 0.3s ease';
      }

      // Create burst of mini hearts
      createRedeemBurst(btn);
    });
  });
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createRedeemBurst(btn) {
  const rect = btn.getBoundingClientRect();
  const hearts = ['💗', '✨', '🎉', '💕', '⭐'];

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('span');
    particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    particle.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      font-size: ${12 + Math.random() * 14}px;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      opacity: 1;
    `;
    document.body.appendChild(particle);

    // Spread in random directions
    requestAnimationFrame(() => {
      const angle = (i / 8) * Math.PI * 2;
      const distance = 50 + Math.random() * 60;
      particle.style.left = `${rect.left + rect.width / 2 + Math.cos(angle) * distance}px`;
      particle.style.top = `${rect.top + rect.height / 2 + Math.sin(angle) * distance}px`;
      particle.style.opacity = '0';
      particle.style.transform = `scale(0.3) rotate(${Math.random() * 360}deg)`;
    });

    setTimeout(() => {
      if (particle.parentNode) particle.parentNode.removeChild(particle);
    }, 900);
  }
}

// Add coupon shake keyframe dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes couponShake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-4px) rotate(-1deg); }
    40% { transform: translateX(4px) rotate(1deg); }
    60% { transform: translateX(-3px) rotate(-0.5deg); }
    80% { transform: translateX(2px) rotate(0.5deg); }
  }
`;
document.head.appendChild(shakeStyle);
