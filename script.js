let currentIndex = 0;
let data = [];

window.onload = () => {
  fetch('Data_A1.json')
    .then(res => res.json())
    .then(json => {
      data = json;
      renderButtons();
      renderQuestion();
    });
};

function renderButtons() {
  const container = document.getElementById('questionButtons');
  container.innerHTML = '';
  data.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.innerText = item.questionNo;
    btn.className = 'qBtn' + (index === currentIndex ? ' active' : '');
    btn.onclick = () => {
      currentIndex = index;
      renderQuestion();
    };
    container.appendChild(btn);
  });
}

function renderQuestion() {
  const questionContent = document.getElementById('questionContent');
  const finalScreen = document.getElementById('finalScreen');
  const backgroundImage = document.getElementById('backgroundImage');

  if (currentIndex >= data.length) {
    questionContent.style.display = 'none';
    backgroundImage.style.display = 'none';
    questionButtons.style.display = 'none';
    finalScreen.style.display = 'flex';
    
    return;
  }

  const q = data[currentIndex];
  let html = `<h3 class='questionText'>${q.question}</h3>`;
  html += `<div class='middleSection' style='justify-content:${q.images ? 'space-around' : 'center'};'>`;

  if (q.images) {
    html += `<img src="assets/${q.images}" alt="question" class="questionImg"/>`;
  }

  html += `<div class="optionGridWithFeedback">
            <div class="optionGrid">`;

  q.options.forEach((opt, idx) => {
    const isImage = typeof opt === 'string' && /\.(png|jpe?g|svg)$/i.test(opt);
    html += `<button class="optionBtn" onclick="handleOptionClick(${idx})">`;
    html += isImage ? `<img src="assets/${opt}" alt="option-${idx}" class="optionImage"/>` : opt;
    html += `</button>`;
  });

  html += `</div><p class="feedbackText" id="feedbackText"></p>
           <button class="nextBtn" id="nextBtn" style="display:none;" onclick="handleNext()">Next</button>
           </div></div>`;

  questionContent.innerHTML = html;
  questionContent.style.display = 'block';
  finalScreen.style.display = 'none';
  backgroundImage.style.display = 'block';
  renderButtons();
}

function handleOptionClick(index) {
  const q = data[currentIndex];
  const feedback = document.getElementById('feedbackText');
  const nextBtn = document.getElementById('nextBtn');

  if (index === q.correct) {
    feedback.innerHTML = `<span class='emoji'>✅</span> Correct! Great job!`;
    nextBtn.innerText = currentIndex + 1 < data.length ? 'Next' : 'Finish';
    nextBtn.style.display = 'block';
  } else {
    feedback.innerHTML = `<span class='emoji'>❌</span> Try again!`;
    nextBtn.style.display = 'none';
  }
}

function handleNext() {
  if (currentIndex + 1 < data.length) {
    currentIndex++;
    renderQuestion();
  } else {
    currentIndex++;
    renderQuestion();
  }
}
