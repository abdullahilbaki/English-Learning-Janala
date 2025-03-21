const userLogin = document.getElementById("user-login");
const userLogout = document.getElementById("user-logout");

const navBar = document.getElementById("nav-bar");
const banner = document.getElementById("banner");
const letsLearn = document.getElementById("lets-learn");
const faqSection = document.getElementById("faq-section");

userLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  const validPassword = "123456";

  const userName = document.getElementById("user-name").value.trim();
  const userPassword = document.getElementById("password").value;

  if (userName === "") {
    Swal.fire({
      icon: "warning",
      text: "Please tell your name first",
    });
    return;
  }

  if (userPassword !== validPassword) {
    Swal.fire({
      icon: "error",
      text: "Wrong password. Contact admin to get your login code",
    });
    return;
  }

  banner.classList.add("hidden");
  navBar.classList.remove("hidden");
  letsLearn.classList.remove("hidden");
  faqSection.classList.remove("hidden");

  Swal.fire({
    title: "<p class='hind-siliguri'>অভিনন্দন</p>",
    html: "<p class='hind-siliguri'>চলুন! আজ নতুন কিছু শেখা যাক</p>",
    icon: "success",
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
});

userLogout.addEventListener("click", () => {
  banner.classList.remove("hidden");
  navBar.classList.add("hidden");
  letsLearn.classList.add("hidden");
  faqSection.classList.add("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
});
