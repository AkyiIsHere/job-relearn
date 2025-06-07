function square(x){
    return x**2;
}
// console.log(square(2))

function isEvenOrOdd(x){
    if(x % 2 === 0){
        return (`${x} is Even`);
    }else{
        return (`${x} is Odd`);
    }
}
// console.log(isEvenOrOdd(3));

function ageGroup(age){
    if(age < 0){
        return "Invalid age!";
    } else if(age < 18){
        return "You are minor";
    } else if(age < 50) {
        return "You are adult";
    } else {
        return "You are Senior";
    }
}

function isPass(scores){
    let message;
    const passMark = 40;
    const numericScores = scores.map(Number);
    // console.log(numericScores);
    
    // const eachSubpass = numericScores.every(arr => arr >= 40);
    const eachSubpass1 = numericScores.filter(score => score < passMark);
    console.log(eachSubpass1);
    const totalScores = numericScores.reduce((acc,score)=> acc+score,0);

    if(eachSubpass1.length === 0 && totalScores >= (scores.length*passMark)){
        message = "You Passed!";
    } else {
        const failedSubMsg = eachSubpass1.length === 1 ? "1 subject." : `${eachSubpass1.length} subjects.`
        message = "You Failed cause you failed in " + failedSubMsg;

    }
    console.log(totalScores);

    return {totalScores, message};
}

function hasBlank(arr){
    return arr.some( item => item === "" || item === null || item === undefined || (typeof item === "string" && item.trim() === ""));
}