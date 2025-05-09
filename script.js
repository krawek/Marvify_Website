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
      } else if (entry.intersectionRatio < 0.2 && wasVisible) {
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

