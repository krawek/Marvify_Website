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
    const modal = document.getElementById('iframe-modal');
    const iframe = document.getElementById('iframe-modal-frame');
  
    // Stop background iframe
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
  