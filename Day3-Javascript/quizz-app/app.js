import { quizData } from "./data.js";

//Quiz-Form
const quizForm = document.getElementById('quiz-form');
// console.log(quizForm);
shuffle(quizData);
quizData.forEach(q => shuffle(q.options));

quizData.forEach((quiz, y)=>{
    //Quiz-Group
    const section = document.createElement("section");
    section.classList.add("quiz-group");
    
    //Question
    const question = document.createElement("span");
    question.textContent = (y+1) + ". " + quiz.question;
    section.appendChild(question);

    //Options Loop
    const quizOptions = quiz.options;
    quizOptions.forEach((content, x)=>{
        //Option
        const option = document.createElement("div");
        option.classList.add("option");

        //input
        const input = document.createElement("input");
        input.setAttribute("type","radio");
        input.setAttribute("name", `q${y}`);
        input.id = `q${y}a${x}`;
        input.value = content;
        // console.log(input);
        option.appendChild(input);

        //label
        const label = document.createElement("label")
        label.setAttribute("for",`q${y}a${x}`);
        label.textContent = content;
        // console.log(label)
        option.appendChild(label);
        section.appendChild(option);
    })

    //Answer 
    const answerContainer = document.createElement("p");
    answerContainer.classList.add("answer-container")
    answerContainer.textContent = "Answer : "
    const answer = document.createElement("span");
    answer.id=`a${y}`;
    answer.textContent = quiz.answer;
    answerContainer.appendChild(answer);
    section.appendChild(answerContainer)

    quizForm.appendChild(section);
})

document.getElementById("submit-btn").addEventListener("click",(e)=>{
    e.preventDefault();  // Prevent default form submission behavior

    const trueAns = [];
    const output = document.querySelector('#score-output');
    const answerContainer = document.querySelectorAll(".answer-container");
    
    // Getting value form radio input
    quizData.forEach((quiz, x) => {
        const selectedInput = document.querySelector(`input[name="q${x}"]:checked`);
        const selected = selectedInput?.value;
        // console.log(selected);
        if (selectedInput) {
            selectedInput.parentElement.classList.add("selected"); // add a CSS class
        }

        const answer = quizData[x].answer;
        // console.log(answer);

        //Display Answer
        answerContainer[x].classList.add('on');
        if(selected === answer){
            trueAns.push(selected);
            answerContainer[x].classList.add('true');
        } else {
            answerContainer[x].classList.add('false');
        }
    })
    
    //Display Scores
    output.classList.add("on");
    output.textContent = `Score: ${trueAns.length}/${quizData.length}`
    console.log(trueAns);
    
    // Disable Btn after submit
    e.target.setAttribute('disabled',true);
    e.target.classList.add('disabled');
})


// Resetting Btn
document.getElementById("reset-btn").addEventListener("click", ()=>{

    quizData.forEach((quiz,x) => {
        const answerContainer = document.querySelectorAll(".answer-container");
        answerContainer[x].classList.remove('on');
        answerContainer[x].classList.remove('true');
        answerContainer[x].classList.remove('false');
        document.querySelector(`input[name="q${x}"]:checked`).parentElement.classList.remove("selected");
    })

    document.querySelector('#score-output').classList.remove("on");

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.remove('disabled');
})

function shuffle(array){
    // Fisher-Yate shuffle algorithm
    for(let i=array.length-1; i > 0; i--){
        let j = Math.floor( Math.random() * i);
        [array[i], array[j]] = [array[j], array[i]];
    }
}