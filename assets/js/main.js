console.log("Yoooooo");


// GSAP Plugins

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

ScrollTrigger.normalizeScroll(true);

const lenis = new Lenis({
  duration: 1.2
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Intro Path

const introPath = document.querySelector("#intro-scroll-path");


// Intro Scroll Timeline

const introTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".intro-sequence",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 2
  }
});


// Reveal the gold line

introTimeline.to(
  introPath,
  {
    strokeDashoffset: 0,
    ease: "none"
  },
  0
);


// Motion Design Glide

const motionGlide = new Glide(".motion-glide", {
  type: "carousel",
  perView: 2,
  autoplay: 20000,
  animationDuration: 700,
  breakpoints: {
    767: {
      perView: 1
    }
  }
});

motionGlide.mount();


// Video Editing Glide

const videoGlide = new Glide(".video-glide", {
  type: "carousel",
  perView: 2,
  autoplay: 20000,
  animationDuration: 700,
  breakpoints: {
    767: {
      perView: 1
    }
  }
});

videoGlide.mount();

// Graphic Design Glide

const graphicGlide = new Glide(".graphic-glide", {
  type: "carousel",
  perView: 2,
  autoplay: 20000,
  animationDuration: 700,
  breakpoints: {
    767: {
      perView: 1
    }
  }
});

graphicGlide.mount();

// Graphic Design Fullscreen Viewer

const graphicImages =
  Array.from(document.querySelectorAll(".graphic-glide .fullscreen-image"));

const fullscreenViewer =
  document.querySelector(".image-fullscreen-viewer");

const fullscreenViewerImage =
  document.querySelector(".fullscreen-viewer-image");

const fullscreenPrevious =
  document.querySelector(".fullscreen-arrow-left");

const fullscreenNext =
  document.querySelector(".fullscreen-arrow-right");

const fullscreenClose =
  document.querySelector(".fullscreen-close");

let fullscreenImageIndex = 0;


function showFullscreenImage(index) {

  fullscreenImageIndex =
    (index + graphicImages.length) % graphicImages.length;

  const image = graphicImages[fullscreenImageIndex];

  fullscreenViewerImage.src = image.src;
  fullscreenViewerImage.alt = image.alt;
}


graphicImages.forEach((image, index) => {

  image.addEventListener("click", () => {

    showFullscreenImage(index);

    if (fullscreenViewer.requestFullscreen) {
      fullscreenViewer.requestFullscreen();
    }

  });

});


fullscreenPrevious.addEventListener("click", () => {
  showFullscreenImage(fullscreenImageIndex - 1);
});


fullscreenNext.addEventListener("click", () => {
  showFullscreenImage(fullscreenImageIndex + 1);
});


fullscreenClose.addEventListener("click", () => {

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }

});

// Pause Motion Design Glide while a video is playing

document
  .querySelectorAll(".motion-glide .project-video")
  .forEach((video) => {

    video.addEventListener("play", () => {
      motionGlide.pause();
    });

    video.addEventListener("pause", () => {
      motionGlide.play();
    });

    video.addEventListener("ended", () => {
      motionGlide.play();
    });

  });


// Pause Video Editing Glide while a video is playing

// All portfolio videos
const portfolioVideos = document.querySelectorAll(".project-video");

portfolioVideos.forEach((video) => {

  video.addEventListener("play", () => {

    // Pause every other video
    portfolioVideos.forEach((otherVideo) => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });

    // Pause the correct Glide carousel
    if (video.closest(".motion-glide")) {
      motionGlide.pause();
    }

    if (video.closest(".video-glide")) {
      videoGlide.pause();
    }
  });

});

// AOS Scroll Animations

AOS.init({
  duration: 800,

  once: false,

  mirror: true,

  offset: 300
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(
      anchor.getAttribute("href")
    );

    if (target) {
      lenis.scrollTo(target, {
        duration: 2
      });
    }
  });
});