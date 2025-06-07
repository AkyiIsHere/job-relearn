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

function isPass(arr){
    let message;
    const numArr = arr.map(Number);
    // console.log(numArr);
    const totalScores = numArr.reduce((acc,arr)=> acc+arr,0);
    if(totalScores >= (arr.length*40)){
        message = "You Passed!";
    } else {
        message = "You Failed!";
    }
    console.log(totalScores);

    return {totalScores, message};
}

function hasBlank(arr){
    return arr.some( item => item === "" || item === null || item === undefined || (typeof item === "string" && item.trim() === ""));
}