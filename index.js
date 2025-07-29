//Linking buttons to external html files
document.getElementById("getStartedBtn").addEventListener("click", function(){
  window.location.href="sign-up.html";
});
document.getElementById("learnMoreBtn").addEventListener("click",function(){
  window.location.href="about.html";
});

//navigation for mobile and tablet
function toggleMenu(){
  const nav =document.querySelector(".header-navigation");
  nav.classList.toggle("active");
}