document.addEventListener("DOMContentLoaded", function () {
    console.log("Script is connected!");
  
    // ========================
    // ✅ Flashcard Functionality
    // ========================
    const flashcard = document.getElementById('flashcard');
    const front = document.getElementById('flashcard-front');
    const back = document.getElementById('flashcard-back');
    const nextButton = document.getElementById('next-flashcard');
  
    const flashcards = [
      { front: 'Yard', back: 'Patio / Jardín' },
      { front: 'Lawn', back: 'Césped' },
      { front: 'Mowing', back: 'Cortar el césped' },
      { front: 'Flowers', back: 'Flores' },
      { front: 'Tree', back: 'Árbol' },
      { front: 'Water', back: 'Regar' },
      { front: 'Weeding', back: 'Deshierbar' },
      { front: 'Mulch', back: 'Mantillo' },
      { front: 'Estimate', back: 'Presupuesto' },
      { front: 'Garden', back: 'Jardín' },
      { front: 'Advertising', back: 'Publicidad' },
      { front: 'Customer', back: 'Cliente' }
    ];
  
    let current = 0;
  
    if (flashcard && front && back && nextButton) {
      flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
      });
  
      nextButton.addEventListener('click', () => {
        flashcard.classList.remove('flipped');
        current = (current + 1) % flashcards.length;
        front.textContent = flashcards[current].front;
        back.textContent = flashcards[current].back;
      });
    }
  
    // ========================
    // ✅ Click Vocabulary Rows to Speak
    // ========================
    const rows = document.querySelectorAll('table tr');
    rows.forEach((row, index) => {
      if (index === 0) return;
      row.addEventListener('click', () => {
        const vocabWord = row.children[0].textContent.trim();
        const utterance = new SpeechSynthesisUtterance(vocabWord);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
  
        row.classList.add('clicked');
        setTimeout(() => {
          row.classList.remove('clicked');
        }, 600);
      });
    });
  
    // ========================
    // ✅ Click-to-Reveal Answers
    // ========================
    document.querySelectorAll('.reveal-btn').forEach(button => {
      button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        if (answer.style.display === 'none' || !answer.style.display) {
          answer.style.display = 'block';
          button.textContent = 'Hide Answer';
        } else {
          answer.style.display = 'none';
          button.textContent = 'Show Answer';
        }
      });
    });
  
    // ========================
    // ✅ Quiz (Optional — Only Runs if Present)
    // ========================
    const quizForm = document.getElementById("quiz-form");
    if (quizForm) {
      quizForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const answers = {
          q1: "lawn mower",
          q2: "mulch",
          q3: "protect plants",
          q4: "weeding",
          q5: "invoice",
          q6: "make garden neat",
          q7: "advertising",
          q8: "maintain",
          q9: "shovel",
          q10: "garden"
        };
  
        let score = 0;
        Object.keys(answers).forEach(q => {
          const selected = document.querySelector(`input[name="${q}"]:checked`);
          if (selected && selected.value === answers[q]) {
            score++;
          }
        });
  
        const result = document.getElementById("quiz-result");
        result.textContent = `You got ${score} out of 10 correct!`;
        result.style.fontWeight = "bold";
        result.style.marginTop = "10px";

        // Mark quiz as complete if score is 7 or higher
        if (score >= 7) {
            let progress = JSON.parse(localStorage.getItem("voces-progress")) || {};
            progress["landscaping-quiz"] = true;
            localStorage.setItem("voces-progress", JSON.stringify(progress));
        }
      });
    }

    const quizStatus = document.getElementById("quiz-status");
    if (quizStatus) {
        const progress = JSON.parse(localStorage.getItem("voces-progress")) || {};
        if (progress["landscaping-quiz"]) {
            quizStatus.textContent = "Quiz Completed";
            quizStatus.style.color = "green";
        }
    }
  
    // ========================
    // ✅ Progress Tracking
    // ========================
    window.markLessonComplete = function (lessonId) {
      let progress = JSON.parse(localStorage.getItem("voces-progress")) || {};
      progress[lessonId] = true;
      localStorage.setItem("voces-progress", JSON.stringify(progress));
  
      const status = document.getElementById("lesson-status");
      if (status) {
        status.textContent = "✅ Lesson Complete";
        status.style.color = "green";
      }
  
      alert("Lesson marked as complete!");
    };
  
    window.checkLessonStatus = function (lessonId) {
      const progress = JSON.parse(localStorage.getItem("voces-progress")) || {};
      const status = document.getElementById("lesson-status");
      if (progress[lessonId] && status) {
        status.textContent = "✅ Lesson Complete";
        status.style.color = "green";
      }
    };
  
  });