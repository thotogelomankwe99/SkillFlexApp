document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("walkthroughModal");
  const slides = document.querySelectorAll(".walkthrough-slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const closeBtn = document.querySelector(".close-btn");
  const viewWalkthroughBtn = document.getElementById("viewWalkthroughBtn");

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    prevBtn.style.display = index === 0 ? "none" : "inline-block";
    nextBtn.textContent = index === slides.length - 1 ? "Finish" : "Next";
  }

  viewWalkthroughBtn.addEventListener("click", () => {
    currentSlide = 0;
    modal.classList.add("show");
    showSlide(currentSlide);
  });

  nextBtn.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    } else {
      modal.classList.remove("show");
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
