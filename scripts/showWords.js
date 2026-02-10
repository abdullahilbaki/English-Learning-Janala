const lessonSelect = document.getElementById("lesson-select");

async function showWords(lessonNumber) {
  try {
    lessonSelect.innerHTML = `<span class="loading loading-dots loading-lg mx-auto block"></span>`;
    lessonSelect.className = "";

    let response = await fetch(
      `https://openapi.programming-hero.com/api/level/${lessonNumber}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    console.log(data.message);
    lessonSelect.innerHTML = "";

    if (!data.data || data.data.length === 0) {
      lessonSelect.innerHTML = "";
      lessonSelect.className =
        "p-4 bg-gray-100 w-full grid gap-4  rounded-3xl ";
      lessonSelect.innerHTML = `
            <img src="./assets/alert-error.png" alt="alert-error" class="mt-10 mx-auto block">
            <p class="text-gray-500 text-sm sm:text-base hind-siliguri text-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="mb-10 text-xl sm:text-2xl md:text-3xl font-medium hind-siliguri text-center">নেক্সট Lesson এ যান
            </h2>
            `;
    } else {
      data.data.map((lesson) => {
        lessonSelect.className =
          "p-4 bg-gray-100 w-full grid gap-4 rounded-3xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 inter text-center";
        lessonSelect.innerHTML += `
                <div class="bg-white rounded-md grid gap-4 p-8">
                  <h3 class="font-semibold text-xl">${lesson.word}</h3>
                  <p class="text-sm font-medium">Meaning / Pronunciation</p>
                  <p class="font-semibold text-xl  text-gray-600 hind-siliguri">
                    "${lesson.meaning ? lesson.meaning : "অর্থ নেই"} / ${
                      lesson.pronunciation
                    }"
                  </p>
                  <div class="flex justify-between mt-4">
                    <button class="btn btn-square bg-blue-100" data-id="${
                      lesson.id
                    }">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>

                    <button class="btn btn-square bg-blue-100" onclick="pronounceWord('${
                      lesson.word
                    }')">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                  </div>
                </div>
            `;
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return `<p class="text-red-600 font-medium text-xl">
        <i class="fa-solid fa-triangle-exclamation"></i> 
        Error loading words</p>`;
  }
}

function pronounceWord(word) {
  const synth = window.speechSynthesis;

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    const voices = synth.getVoices();

    utterance.voice = voices.find((v) => v.lang.includes("en")) || voices[0];
    synth.speak(utterance);
  };

  if (synth.getVoices().length !== 0) {
    speak();
  } else {
    synth.onvoiceschanged = speak;
  }
}
