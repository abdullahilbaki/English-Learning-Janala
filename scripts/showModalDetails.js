function getWordId() {
  lessonSelect.removeEventListener("click", handleWordClick);
  lessonSelect.addEventListener("click", handleWordClick);
}

function handleWordClick(event) {
  const button = event.target.closest("button");
  if (button && button.dataset.id) {
    const lessonId = button.dataset.id;
    console.log("Clicked Lesson ID:", lessonId);
    showModalDetails(lessonId);
  }
}

async function showModalDetails(wordId) {
  try {
    let response = await fetch(
      `https://openapi.programming-hero.com/api/word/${wordId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    console.log(data.message);

    let existingModal = document.getElementById("my_modal_1");
    if (existingModal) {
      existingModal.remove();
    }

    let modal = document.createElement("dialog");
    modal.id = "my_modal_1";
    modal.classList.add("modal");

    modal.innerHTML = `
            <div class="modal-box">
                <div class="border rounded-lg p-4 border-gray-200">                
                    <h3 class="text-lg font-bold mb-4">${
                      data.data.word
                    } (<i class="fa-solid fa-microphone-lines"></i> : ${
      data.data.pronunciation
    })</h3>
                    <p class="font-semibold mb-2">Meaning</p>
                    <p class="font-medium mb-4 hind-siliguri">${
                      data.data.meaning ? data.data.meaning : "অর্থ পাওয়া যায়নি"
                    }</p>

                    <p class="font-semibold mb-2">Example</p>
                    <p class="mb-4">${data.data.sentence}</p>

                    <p class="font-semibold mb-4 hind-siliguri">সমার্থক শব্দ গুলো</p>
                    
                    ${data.data.synonyms
                      .map(
                        (word) =>
                          `<button class="p-2 rounded-sm outline-none bg-blue-100 mr-2 mb-2">${word}</button>`
                      )
                      .join("")}
                    
                </div>
                <div class="modal-action justify-start">
                    <form method="dialog">
                        <button class="btn btn-primary">Complete Learning</button>
                    </form>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    modal.showModal();
  } catch (error) {
    console.error("Error:", error);
    return `<p class="text-red-600 font-medium text-xl">
        <i class="fa-solid fa-triangle-exclamation"></i> 
        Error loading words</p>`;
  }
}
