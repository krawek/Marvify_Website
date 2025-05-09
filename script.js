// Navbar transparency on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.add('transparent');
      navbar.classList.remove('scrolled');
    }
  });
  
  // Show expand button after play is clicked
  document.querySelectorAll('.iframe-container .play-button').forEach(button => {
    button.addEventListener('click', () => {
      const expandBtn = button.parentElement.querySelector('.expand-button');
      if (expandBtn) expandBtn.style.display = 'block';
    });
  });
  
  // Open modal and stop the clicked iframe
  function openIframeModal(src, clickedButton) {
    const isUserAgentMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const isNarrowScreen = window.innerWidth <= 768;
  
    const isLikelyMobilePortrait =
      (isUserAgentMobile || isTouchDevice) && isPortrait && isNarrowScreen;
  
    if (isLikelyMobilePortrait) {
      window.open(src, '_blank');
      return;
    }
  
    // Otherwise, open the modal
    const modal = document.getElementById('iframe-modal');
    const iframe = document.getElementById('iframe-modal-frame');
  
    const smallIframe = clickedButton.closest('.iframe-container').querySelector('iframe');
    if (smallIframe) {
      smallIframe.src = 'about:blank';
      smallIframe.style.display = 'none';
    }
  
    iframe.src = src;
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
  }
  
  function closeIframeModal() {
    const modal = document.getElementById('iframe-modal');
    const iframe = document.getElementById('iframe-modal-frame');
  
    // Stop the modal iframe
    iframe.src = 'about:blank';
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  
    // Restore the previously paused small iframe (if any)
    const allContainers = document.querySelectorAll('.iframe-container');
  
    allContainers.forEach(container => {
      const smallIframe = container.querySelector('iframe');
      const playButton = container.querySelector('.play-button');
  
      // If the iframe was hidden (because it was expanded), reset it
      if (smallIframe && playButton && smallIframe.style.display === 'none') {
        smallIframe.style.display = 'none';
        playButton.style.display = 'block';
      }
    });
  }
  
  // Auto-close mobile nav on link click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');

    if (navbarToggler && navbarCollapse.classList.contains('show')) {
      navbarToggler.click(); // Programmatically trigger collapse
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slideElements = document.querySelectorAll(".slide-up");

  const visibilityState = new WeakMap(); // To track visibility per element

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const wasVisible = visibilityState.get(entry.target) || false;

      if (entry.intersectionRatio > 0.6 && !wasVisible) {
        entry.target.classList.add("visible");
        visibilityState.set(entry.target, true);
      } else if (entry.intersectionRatio < 0.01 && wasVisible) {
        entry.target.classList.remove("visible");
        visibilityState.set(entry.target, false);
      }
    });
  }, {
    threshold: [0, 0.2, 0.6, 1],
    rootMargin: "-80px 0px -80px 0px"
  });

  slideElements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, .hero");

  function updateDimming() {
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;

      // Only dim if section is above center (leaving upward)
      if (sectionCenter < viewportCenter) {
        const distance = viewportCenter - sectionCenter;
        const maxDistance = viewportHeight * 0.8; // dim over longer range
        const intensity = Math.min(distance / maxDistance, 1);
        const eased = intensity ** 2; // smooth ease-in
        const targetOpacity = eased * 0.15;
        section.style.setProperty('--dim-opacity', targetOpacity.toFixed(3));
      } else {
        // Reset to fully lit when below center
        section.style.setProperty('--dim-opacity', '0');
      }
    });
  }

  window.addEventListener("scroll", updateDimming);
  window.addEventListener("resize", updateDimming);
  updateDimming();
});

document.addEventListener("DOMContentLoaded", () => {
  const targetSection = document.querySelector('#om .row.reverse').closest('section');

  function updateSeparation() {
    const rect = targetSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;

    const threshold = viewportHeight * 0.35;
    const distance = Math.abs(viewportCenter - sectionCenter);

    if (distance < threshold) {
      targetSection.classList.add("section-active");
    } else {
      targetSection.classList.remove("section-active");
    }
  }

  window.addEventListener("scroll", updateSeparation);
  window.addEventListener("resize", updateSeparation);
  updateSeparation();
});

window.addEventListener('scroll', function handleFirstScroll() {
  const indicator = document.querySelector('.scroll-indicator');
  if (indicator && !indicator.classList.contains('stopped')) {
    indicator.classList.add('stopped');
    window.removeEventListener('scroll', handleFirstScroll); // only run once
  }
});

window.addEventListener('scroll', function handleScrollFade() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator || indicator.classList.contains('hidden')) return;

  const rect = indicator.getBoundingClientRect();

  // When the indicator's bottom crosses into the top of the viewport
  if (rect.bottom <= 0) {
    indicator.classList.add('hidden');
    // Clean up listener to lock this change
    window.removeEventListener('scroll', handleScrollFade);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollToOm');
  const targetSection = document.querySelector('#om');

  if (scrollBtn && targetSection) {
    scrollBtn.addEventListener('click', () => {
      scrollBtn.classList.add('stopped', 'hidden');
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const imageIndex = Math.floor(Math.random() * 3) + 1; // 1 to 3
  hero.style.backgroundImage = `url('./${imageIndex}.jpg')`;
});