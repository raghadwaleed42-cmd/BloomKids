// Bloom Kids — shared interactions for parent/student pages
let messageTimer;
function showDashboardMessage(text) {
    let message = document.querySelector('.dashboard-message');
    if (!message) {
        message = document.createElement('div');
        message.className = 'dashboard-message';
        message.setAttribute('role', 'status');
        document.body.appendChild(message);
    }
    message.textContent = text;
    message.classList.add('show');
    clearTimeout(messageTimer);
    messageTimer = setTimeout(() => message.classList.remove('show'), 2200);
}

document.querySelectorAll('.header-notification, .notification-button, .notification-icon').forEach(button => {
    button.addEventListener('click', () => showDashboardMessage('لا توجد إشعارات جديدة حالياً'));
});

document.querySelectorAll('.lesson-tabs').forEach(group => {
    const buttons = group.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', () => {
        buttons.forEach(item => item.classList.remove('active'));
        button.classList.add('active');
    }));
});

document.querySelectorAll('.answers-grid').forEach(group => {
    const answers = group.querySelectorAll('.answer-option');
    answers.forEach(answer => answer.addEventListener('click', () => {
        answers.forEach(item => item.classList.remove('selected'));
        answer.classList.add('selected');
    }));
});

// Routes are defined in HTML per subject so one shared JS file never overrides them.
const playButton = document.querySelector('.video-play-button');
if (playButton) playButton.addEventListener('click', () => showDashboardMessage('سيتم تشغيل فيديو الدرس عند إضافة ملف الفيديو النهائي'));

const checkAnswerButton = document.querySelector('.check-answer');
if (checkAnswerButton) {
    checkAnswerButton.addEventListener('click', () => {
        const selectedAnswer = document.querySelector('.answer-option.selected');
        const feedbackText = document.querySelector('.feedback-card .correct-answer, .feedback-card .wrong-answer');
        if (!selectedAnswer) {
            showDashboardMessage('اختر إجابة أولاً');
            return;
        }
        const expected = checkAnswerButton.dataset.correctAnswer || '3';
        const isCorrect = selectedAnswer.textContent.trim() === expected;
        if (feedbackText) {
            feedbackText.textContent = isCorrect ? 'إجابة صحيحة!' : 'حاول مرة أخرى';
            feedbackText.className = isCorrect ? 'correct-answer' : 'wrong-answer';
        }
        showDashboardMessage(isCorrect ? 'أحسنت، إجابتك صحيحة' : 'الإجابة غير صحيحة، حاول مرة أخرى');
    });
}

// Question navigation stays interactive in the frontend demo.
document.querySelectorAll('.question-nav-btn').forEach(button => {
    button.addEventListener('click', () => showDashboardMessage('أنت في نموذج سؤال واحد للعرض التجريبي'));
});
