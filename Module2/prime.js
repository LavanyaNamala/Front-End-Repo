
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === 'admin@quiz.com' && password === 'admin123') {
    alert('Login Success, redirecting to quiz page');
    window.location.href = 'quiz.html';
  } else {
    alert('Incorrect credentials, please try again');
  }
});

document.getElementById('quizForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const question = document.getElementById('question').value;
  const optionA = document.getElementById('optionA').value;
  const optionB = document.getElementById('optionB').value;
  const optionC = document.getElementById('optionC').value;
  const optionD = document.getElementById('optionD').value;
  const correctOption = document.getElementById('correctOption').value;

  const newQuestion = {
    question: question,
    options: { A: optionA, B: optionB, C: optionC, D: optionD },
    correctOption: correctOption,
    reviewed: false,
  };

  fetch('http://json-server-url/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newQuestion),
  })
    .then(response => response.json())
    .then(data => {
      alert('Question Created');
      fetchQuestions(); // Refresh the question list
    });
});

function fetchQuestions() {
  fetch('http://json-server-url/questions')
    .then(response => response.json())
    .then(data => {
      const questionList = document.getElementById('questionList');
      questionList.innerHTML = '';
      data.forEach(question => {
        const questionCard = document.createElement('div');
        questionCard.classList.add('card');
        if (question.reviewed) questionCard.classList.add('reviewed');
        questionCard.innerHTML = `
          <p><strong>${question.question}</strong></p>
          <p>A: ${question.options.A}</p>
          <p>B: ${question.options.B}</p>
          <p>C: ${question.options.C}</p>
          <p>D: ${question.options.D}</p>
          <button onclick="reviewQuestion(${question.id})">Review Question</button>
          <button onclick="deleteQuestion(${question.id})">Delete Question</button>
        `;
        questionList.appendChild(questionCard);
      });
    });
}

function reviewQuestion(id) {
  if (confirm('Are you sure to review the question?')) {
    fetch(`http://json-server-url/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reviewed: true }),
    })
      .then(response => response.json())
      .then(data => {
        alert('Question Reviewed');
        fetchQuestions(); // Refresh the question list
      });
  }
}

function deleteQuestion(id) {
  if (confirm('Are you sure to delete?')) {
    fetch(`http://json-server-url/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        alert('Question Deleted');
        fetchQuestions(); // Refresh the question list
      });
  }
}

if (window.location.pathname === '/quiz.html') {
  fetchQuestions();
}
script.js