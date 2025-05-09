function selectAnswer(button, result) {
    const question = button.closest('.quiz-question');
  
    if (question.classList.contains('answered')) return;
  
    question.classList.add('answered');
    question.querySelectorAll('button').forEach(btn => btn.disabled = true);
  
    if (result === 'correct') {
      button.style.backgroundColor = '#4CAF50';
    } else {
      button.style.backgroundColor = '#f44336';
    }
    button.style.color = 'white';
  
    const allAnswered = [...document.querySelectorAll('.quiz-question')]
      .every(q => q.classList.contains('answered'));
  
    if (allAnswered) {
      document.getElementById('quiz-result').textContent = "✅ Quiz complete! Great job!";
      localStorage.setItem('quizComplete_' + document.body.id, 'true');
    }
}