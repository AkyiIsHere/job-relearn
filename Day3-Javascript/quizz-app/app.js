import { quizData } from "./data.js";

//Quiz-Form
const quizForm = document.getElementById('quiz-form');
// console.log(quizForm);


for(let y=1; y<= quizData.length; y++){
    const quiz = quizData[y-1];
    // console.log(quiz)

    //Quiz-Group
    const section = document.createElement("section");
    section.classList.add("quiz-group");

    //Question
    const question = document.createElement("span");
    question.textContent = y + ". " + quiz.question;
    section.appendChild(question);

    //Options Loop
    const quizOptions = quiz.options;
    for(let x=1; x <= quizOptions.length; x++){
        const content = quizOptions[x-1];

        //Option
        const option = document.createElement("div");
        option.classList.add("option");

        //input
        const input = document.createElement("input");
        input.setAttribute("type","radio");
        input.setAttribute("name", `q${y}`);
        input.id = `q${y}a${x}`;
        // console.log(input);
        option.appendChild(input);

        //label
        const label = document.createElement("label")
        label.setAttribute("for",`q${y}a${x}`);
        label.textContent = content;
        // console.log(label)
        option.appendChild(label);
        section.appendChild(option);
    }

    //Answer 
    const answerContainer = document.createElement("p");
    answerContainer.classList.add("answer-container")
    answerContainer.textContent = "Answer : "
    const answer = document.createElement("span");
    answer.id="answer";
    answer.textContent = quiz.answer;
    answerContainer.appendChild(answer);
    section.appendChild(answerContainer)

    quizForm.appendChild(section);
}