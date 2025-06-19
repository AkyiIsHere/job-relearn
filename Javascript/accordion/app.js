const items = document.querySelectorAll('.faq-item');

items.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    // Collapse other items
    items.forEach(i => {
      if (i !== item) {
        i.querySelector('.faq-question').classList.remove('active');
        i.querySelector('.faq-answer').style.height = null;
      }
    });

    const isActive = question.classList.contains('active');

    if (isActive) {
      question.classList.remove('active');
      answer.style.height = null;
    } else {
      question.classList.add('active');
      answer.style.height = answer.scrollHeight + 'px';
    }
  });

  // On page load: expand if already active
  if (question.classList.contains('active')) {
    answer.style.height = answer.scrollHeight + 'px';
  }
});
