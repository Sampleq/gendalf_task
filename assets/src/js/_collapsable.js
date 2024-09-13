export function collapsableFAQ(faq) {
    const questions = faq.querySelectorAll('.faq__question');
    console.log(questions);

    const answers = faq.querySelectorAll('.faq__answer');
    console.log(answers);

    answers.forEach(answer => {
        answer.hidden = true;
    });


    faq.onclick = function (event) {
        const question = event.target.closest('.faq__question');
        // console.log(question);

        answers.forEach(answer => {
            answer.hidden = true;
        });

        question.querySelector('.faq__answer').hidden = false;



    }

}