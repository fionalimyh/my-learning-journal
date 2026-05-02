document.addEventListener("DOMContentLoaded", function () {
  /* ============================================================
     1. Typewriter looping effect on home page. 
     ============================================================ */
  const typewriterEl = document.getElementById("typewriter");
  if (typewriterEl) {
    const phrases = [
      "I build Business Workflows.",
      "I architect System Logics.",
      "I automate with GenAI.",
      "I scale Operations across Southeast Asia.",
      "I establish Organisation Hierarchy.",
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
      const current = phrases[phraseIdx];

      if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typewriterEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
      }

      let delay = isDeleting ? 50 : 100;

      if (!isDeleting && charIdx === current.length) {
        delay = 2000; // Pause at end of sentence
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length; // Loop to next sentence
        delay = 500;
      }

      setTimeout(type, delay);
    }

    type();
  }

  /* ============================================================
     2. Formula to calculate years of experience. Calculate based on current date so that it is dynamic.
     ============================================================ */
  const expElement = document.getElementById("dynamic-experience");
  if (expElement) {
    const startYear = 2020; // Your starting year
    const currentYear = new Date().getFullYear();
    const experience = currentYear - startYear;

    // Update the text on the home page
    expElement.textContent = experience + " years";
  }

  /* ============================================================
     3. Scroll reveal, adds .visible to .reveal elements when they enter the viewport.
     CSS handles the special transitions.
     ============================================================ */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Once revealed, stop observing to save resources
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }, // trigger when 12% of element is visible
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ============================================================
     4. Active navlink, compares existing filename to each nav link's href then adds .active to the matching link.
     ============================================================ */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".fl-nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    // Handle empty string as index.html
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ============================================================
     5. Navbar scroll effect, darker shadow when user scrolls down
     ============================================================ */
  const navbar = document.querySelector(".fl-navbar");
  if (navbar) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 60) {
          navbar.style.background = "rgba(7, 9, 26, 0.99)";
          navbar.style.boxShadow = "0 4px 28px rgba(0, 0, 0, 0.6)";
        } else {
          navbar.style.background = "rgba(7, 9, 26, 0.95)";
          navbar.style.boxShadow = "none";
        }
      },
      { passive: true },
    ); // passive: true improves scroll performance
  }

  /* ============================================================
     6. Statistics Bar
     ============================================================ */
  const counters = document.querySelectorAll(".count-up");
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const suffix = el.dataset.suffix || "";
            const duration = 1600; // animation duration in ms
            const step = target / (duration / 16); // ~60fps
            let current = 0;

            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              // Show integer or 1 decimal depending on target type
              el.textContent =
                (Number.isInteger(target)
                  ? Math.floor(current)
                  : current.toFixed(0)) + suffix;
            }, 16);

            counterObserver.unobserve(el); // only animate one time
          }
        });
      },
      { threshold: 0.1 },
    );

    counters.forEach((c) => counterObserver.observe(c));
  }

  /* ============================================================
     7. SMOOTH SCROLL for anchor links
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
  /* ============================================================
     8. YOUTUBE Website Video
     Link: https://youtu.be/0ugS8mo_SyQ 
     ============================================================ */
  const champCodeModal = document.getElementById("champCodeModal");
  if (champCodeModal) {
    const iframe = document.getElementById("champCodeIframe");

    const videoId = "0ugS8mo_SyQ";

    // autoplay=1, start playing immediately once the iframe loads
    // rel=0, don't show unrelated "up next" suggestions at the end
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    // insert src here so the video doesn't play before the modal is visible
    champCodeModal.addEventListener("shown.bs.modal", function () {
      iframe.src = embedUrl;
    });

    // clear src immediately so video stops
    champCodeModal.addEventListener("hide.bs.modal", function () {
      iframe.src = "";
    });
  }

  /* ============================================================
     9. YOUTUBE Marketing Video
     Link: https://youtu.be/LKcLhWyQA3o
     ============================================================ */
  const biaiModal = document.getElementById("biaiModal");
  if (biaiModal) {
    const biaiIframe = document.getElementById("biaiIframe");
    const biaiUrl =
      "https://www.youtube.com/embed/LKcLhWyQA3o?autoplay=1&rel=0";
    biaiModal.addEventListener("shown.bs.modal", () => {
      biaiIframe.src = biaiUrl;
    });
    biaiModal.addEventListener("hide.bs.modal", () => {
      biaiIframe.src = "";
    });
  }

  /* ============================================================
     10. YOUTUBE Sales CRM Video
     Link: https://youtu.be/dTcFz_VDFz0
     ============================================================ */
  const crmModal = document.getElementById("crmModal");
  if (crmModal) {
    const crmIframe = document.getElementById("crmIframe");
    const crmUrl = "https://www.youtube.com/embed/dTcFz_VDFz0?autoplay=1&rel=0";
    crmModal.addEventListener("shown.bs.modal", () => {
      crmIframe.src = crmUrl;
    });
    crmModal.addEventListener("hide.bs.modal", () => {
      crmIframe.src = "";
    });
  }

  /* ============================================================
     11. YOUTUBE Calories Counter Platform Video
     Link: https://youtu.be/lkaIjdOjTvo
     ============================================================ */
  const caloriesModal = document.getElementById("caloriesModal");
  if (caloriesModal) {
    const caloriesIframe = document.getElementById("caloriesIframe");
    const caloriesUrl =
      "https://www.youtube.com/embed/lkaIjdOjTvo?autoplay=1&rel=0";
    caloriesModal.addEventListener("shown.bs.modal", () => {
      caloriesIframe.src = caloriesUrl;
    });
    caloriesModal.addEventListener("hide.bs.modal", () => {
      caloriesIframe.src = "";
    });
  }

  /* ============================================================
     12. YOUTUBE VR Maze Game Video
     Link: https://youtu.be/ld4c8GWExQE
     ============================================================ */
  const vrmazeModal = document.getElementById("vrmazeModal");
  if (vrmazeModal) {
    const vrmazeIframe = document.getElementById("vrmazeIframe");
    const vrmazeUrl =
      "https://www.youtube.com/embed/ld4c8GWExQE?autoplay=1&rel=0";
    vrmazeModal.addEventListener("shown.bs.modal", () => {
      vrmazeIframe.src = vrmazeUrl;
    });
    vrmazeModal.addEventListener("hide.bs.modal", () => {
      vrmazeIframe.src = "";
    });
  }
});
