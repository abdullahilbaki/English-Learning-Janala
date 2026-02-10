const lessonBtnsDiv = document.getElementById("lesson-btns-div");

async function getLessonBtns() {
  try {
    let response = await fetch(
      "https://openapi.programming-hero.com/api/levels/all",
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    console.log(data.message);

    return data.data
      .map(
        (lesson) => `
                <button class="lesson-number btn btn-outline btn-primary btn-sm sm:btn-md" 
                data-level-no="${lesson.level_no}">
                  <i class="fa-solid fa-book-open"></i>
                  Lesson-${lesson.level_no}
                </button>`,
      )
      .join("");
  } catch (error) {
    console.error("Error:", error);
    return `<p class="text-red-600 font-medium text-xl">
              <i class="fa-solid fa-triangle-exclamation"></i> 
            Error loading lessons</p>`;
  }
}

async function loadBtns() {
  lessonBtnsDiv.innerHTML = `<span class="loading loading-spinner loading-xl"></span>`;

  lessonBtnsDiv.innerHTML = await getLessonBtns();

  const lessonNumber = document.getElementsByClassName("lesson-number");

  [...lessonNumber].forEach((lesson) => {
    lesson.addEventListener("click", () => {
      [...lessonNumber].forEach((btn) => btn.classList.add("btn-outline"));
      lesson.classList.remove("btn-outline");

      lessonSelect.innerHTML = "";
      showWords(lesson.getAttribute("data-level-no"));

      getWordId();
    });
  });
}

loadBtns();
