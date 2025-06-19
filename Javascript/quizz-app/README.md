# 🧠 Simple JavaScript Quiz App

This is a dynamic and interactive **Quiz App** built using **Vanilla JavaScript**, **HTML**, and **CSS**. It presents multiple-choice questions, allows users to submit their answers, and shows the score with visual feedback.

---

## 🚀 Features

- ✅ Dynamically generates questions and options from a data file.
- 🔀 Randomizes the order of questions and options using the **Fisher-Yates Shuffle**.
- 📊 Shows the correct answer and score after submission.
- 🎯 Highlights correct and incorrect answers.
- 🔁 Reset button to retake the quiz.
- 🧪 Easy to extend by updating the question data.

---

## 🛠️ Tech Stack

- **HTML** – for structure
- **CSS** – for styling
- **JavaScript (ES6)** – for all interactivity and logic

---

## 📁 Project Structure

.
├── index.html # Main HTML file
├── style.css # Styling (not included here)
├── app.js # JavaScript logic (this file)
├── data.js # Quiz question and answer data
└── README.md # This file

yaml
Copy
Edit

---

## 🧩 How It Works

1. Quiz data is imported from `data.js`.
2. Both questions and options are shuffled using the **Fisher-Yates algorithm** to ensure random order.
3. Each question and its options are dynamically rendered into the form.
4. On submit:
   - Selected answers are compared to the correct ones.
   - Score is displayed.
   - Correct/incorrect answers are visually marked.
5. On reset:
   - Feedback and score are cleared.
   - Quiz can be retaken without reloading the page.

---

## 📦 Sample Data Format (`data.js`)

```js
export const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperTool Markup Language",
      "HomeTool Markup Language"
    ],
    answer: "HyperText Markup Language"
  },
  ...
];
```
