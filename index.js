const STORE = [
    {
        question: '1. THE MODERN BASS BOAT ENTERED THE FISHING WORLD IN 1948. WHAT COMPANY CREATED THIS REVOLUTIONARY WATERCRAFT?', answers: ['Yamaha', 'Ranger', 'Lund', 'Skeeter'], rightAnswer: 'Skeeter'
    },
    {
        question: '2. MANABU KURITA RECENTLY TIED THE WORLD RECORD FOR BIGGEST LARGEMOUTH BASS. WHO DOES HE SHARE THE RECORD WITH?', answers: ['Jason Sanders', 'Kevin Van Dam', 'Sean McNally', 'George Perry'], rightAnswer: 'George Perry'
    },
        {
            question: '3. BASS ARE QUITE INTELLIGENT. SO INTELLIGENT, IN FACT, THAT THEY’RE EVEN CAPABLE OF WHICH OF THE FOLLOWING:', answers: ['Hiding right beneath your boat to avoid detection', 'Work in teams with other fish to outsmart anglers', 'Adapt to lures and resist them in the future', 'Long division'], rightAnswer: 'Adapt to lures and resist them in the future'
        },
        {
            question: '4. WE KNOW BASS CAN SEE COLORS, BUT WHICH OF THESE COLORS ARE THEY MORE ATTENTIVE TO THAN OTHERS?', answers: ['Red', 'Blue', 'Yellow', 'White'], rightAnswer: 'Red'
        },
        {
            question: '5. THERE ARE STRIPED BASS AND WHITE BASS, BUT WHAT DO YOU GET WHEN YOU CROSS THE TWO SPECIES?', answers: ['Zebra Bass', 'Wiper', 'White Striped Bass', 'Nothing'], rightAnswer: 'Wiper'
        },
        {
            question: '6. BASS CAN HEAR AND SEE AND TASTE, BUT THEY’RE ALSO WELL-KNOWN FOR HAVING A “SIXTH SENSE,” KNOWN AS WHAT?', answers: ['Telepathy', 'Lateral Line', 'Speech', 'X-Ray Vision'], rightAnswer: 'Lateral Line'
        }
]

let questionNumber = 0;
let score = 0;

function generateQuestion(questionIndex) {
    let formQuestions = $(`<form>\
        <fieldset>
            <legend>${STORE[questionIndex].question}</legend>
        </fieldset>
    </form>`);

    let answerSelection = $(formQuestions).find('fieldset');

    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
        $(`<label class="answersForQuiz" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>`).appendTo(answerSelection);
    })
    return formQuestions;
}

function overallScore() {
    $('.overall').text(`YOUR OVERALL SCORE: ${score}/${questionNumber}`);
    $('.questionNumbers').text(`Question: ${questionNumber}/6`);
    $('.stats').append(`<button type="restart" class="restartButton button">RESTART</button>`);
}

function renderQuestion() {
    if (questionNumber < STORE.length) {
        return generateQuestion(questionNumber);
    }
    else {
        $('.submitButton').hide();
        overallScore();
    }
}

function startQuiz() {
    $('main').on('click', '.startButton', function (event) {
        $('.images').hide();
        $('.stats').show();
        $('.questionsBox').show();
        $('.questionNumbers').text(`Question: ${questionNumber + 1}/6`);
        $('.score').text('Score: 0');
        $('.stats').append(`<button type="submit" class="submitButton button">SUBMIT</button>`);
        $('.questionsBox').prepend(renderQuestion());
        $('.startButton').hide();
    });
}

function submitAnswer() {
    $('main').on('click', '.submitButton', function (event) {
        event.preventDefault();
        let selected = $('input:checked');
        let chosenAnswer = selected.val();
        let correct = STORE[questionNumber].rightAnswer;

        if (!chosenAnswer) {
            alert("Choose an option");
            return;
        }

        if (chosenAnswer === correct) {
            $('.results').text('Great job! You answered correctly!!!');
            score = score + 1;
            $('.score').text(`Score: ${score}`);
        }
        else {
            $('.results').text(`Sorry, the correct answer is: \n "${correct}"`);
            $('.score').text(`Score: ${score}`);
        }
        $('.submitButton').hide();
        $('.stats').append(`<button type="buttonNext" class="nextButton button">NEXT</button>`);
        questionNumber = questionNumber + 1;
    });
}

function renderNextQuestion() {
    $('main').on('click', '.nextButton', function (event) {
        $('.questionsBox').empty();
        $('.results').empty();
        $('.questionNumbers').text(`Question: ${questionNumber + 1}/6`);
        $('.nextButton').hide();
        $('.submitButton').show();
        $('.questionsBox').prepend(renderQuestion());
    })
}

function resetStats() {
    $('.stats').hide();
    $('.questionsBox').empty();
    $('.overall').empty();
    $('.submitButton').remove();
    $('.nextButton').remove();
    $('.restartButton').remove();
    return score = 0, questionNumber = 0;
}

function restartQuiz() {
    $('.stats').on('click', '.restartButton', function (event) {
        event.preventDefault();
        resetStats();
        $('.images').show();
        $('.startButton').show();
    })
}

function handleQuiz() {
    startQuiz();
    submitAnswer();
    renderNextQuestion();
    restartQuiz();
}

$(handleQuiz);