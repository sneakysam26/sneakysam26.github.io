console.log("Yoooooo!!!11111!!!");


// GSAP Plugins

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

ScrollTrigger.normalizeScroll(true);


// Lenis Smooth Scrolling

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


// Reveal Intro Path

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
  perView: 3,
  gap: 20,
  autoplay: 20000,
  animationDuration: 700,

  breakpoints: {
    1099: {
      perView: 2
    },

    767: {
      perView: 1
    }
  }
});

motionGlide.mount();


// Video Editing Glide

const videoGlide = new Glide(".video-glide", {
  type: "carousel",
  perView: 3,
  gap: 20,
  autoplay: 20000,
  animationDuration: 700,

  breakpoints: {
    1099: {
      perView: 2
    },

    767: {
      perView: 1
    }
  }
});

videoGlide.mount();


// Graphic Design Glide

const graphicGlide = new Glide(".graphic-glide", {
  type: "carousel",
  perView: 3,
  gap: 20,
  autoplay: 20000,
  animationDuration: 700,

  breakpoints: {
    1099: {
      perView: 2
    },

    767: {
      perView: 1
    }
  }
});

graphicGlide.mount();


// 3D & Lighting Glide

const lightingGlide = new Glide(".lighting-glide", {
  type: "carousel",
  perView: 3,
  gap: 20,
  autoplay: 20000,
  animationDuration: 700,

  breakpoints: {
    1099: {
      perView: 2
    },

    767: {
      perView: 1
    }
  }
});

lightingGlide.mount();


// Fullscreen Image Galleries

const graphicImages = Array.from(
  document.querySelectorAll(
    ".graphic-glide .fullscreen-image"
  )
);

const processImages = Array.from(
  document.querySelectorAll(
    ".process .fullscreen-image"
  )
);

const lightingImages = Array.from(
  document.querySelectorAll(
    ".lighting-glide .fullscreen-image"
  )
);


// Fullscreen Viewer Elements

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


// Fullscreen Viewer State

let activeFullscreenImages = [];
let fullscreenImageIndex = 0;


// Show Selected Fullscreen Image

function showFullscreenImage(index) {

  fullscreenImageIndex =
    (index + activeFullscreenImages.length) %
    activeFullscreenImages.length;

  const image =
    activeFullscreenImages[fullscreenImageIndex];

  fullscreenViewerImage.src = image.src;
  fullscreenViewerImage.alt = image.alt;
}


// Create Independent Fullscreen Gallery

function setupFullscreenGallery(images) {

  images.forEach((image, index) => {

    image.addEventListener("click", () => {

      activeFullscreenImages = images;

      showFullscreenImage(index);

      if (fullscreenViewer.requestFullscreen) {
        fullscreenViewer.requestFullscreen();
      }

    });

  });

}


// Register Fullscreen Galleries

setupFullscreenGallery(graphicImages);
setupFullscreenGallery(processImages);
setupFullscreenGallery(lightingImages);


// Previous Fullscreen Image

fullscreenPrevious.addEventListener("click", () => {
  showFullscreenImage(fullscreenImageIndex - 1);
});


// Next Fullscreen Image

fullscreenNext.addEventListener("click", () => {
  showFullscreenImage(fullscreenImageIndex + 1);
});


// Close Fullscreen Viewer

fullscreenClose.addEventListener("click", () => {

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }

});


// All Portfolio Videos

const portfolioVideos =
  document.querySelectorAll(".project-video");


portfolioVideos.forEach((video) => {

  video.addEventListener("play", () => {

    // Pause every other video

    portfolioVideos.forEach((otherVideo) => {

      if (otherVideo !== video) {
        otherVideo.pause();
      }

    });


    // Pause the correct Glide while video plays

    if (video.closest(".motion-glide")) {
      motionGlide.pause();
    }

    if (video.closest(".video-glide")) {
      videoGlide.pause();
    }

  });


  video.addEventListener("pause", () => {

    if (video.closest(".motion-glide")) {
      motionGlide.play();
    }

    if (video.closest(".video-glide")) {
      videoGlide.play();
    }

  });


  video.addEventListener("ended", () => {

    if (video.closest(".motion-glide")) {
      motionGlide.play();
    }

    if (video.closest(".video-glide")) {
      videoGlide.play();
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


// Smooth Navigation Links

document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {

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
