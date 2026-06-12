// 1. HTMLの要素を取得する（js-elementの知識）
const quizInfo = document.getElementById('quiz-info');
const questionText = document.getElementById('question-text');
const answerBox = document.getElementById('answer-box');
const answerText = document.getElementById('answer-text');

const prevBtn = document.getElementById('prev-btn');
const showBtn = document.getElementById('show-btn');
const nextBtn = document.getElementById('next-btn');

// 2. ローカルストレージからクイズのデータを読み込む（js-storageの知識）
let quizList = [];
const savedData = localStorage.getItem('quizData');

if (savedData !== null) {
    quizList = JSON.parse(savedData);
}

// 現在何問目を表示しているかを管理する変数（js-variable, js-slideshowの知識）
// 配列のインデックス（0番目＝1問目）に合わせるため最初は0
let currentIndex = 0;

// 3. クイズを画面に表示する関数（js-functionの知識）
function showQuiz() {
    // もしクイズが1つも登録されていなかったら（js-conditionalの知識）
    if (quizList.length === 0) {
        quizInfo.textContent = "問題がありません";
        questionText.textContent = "「クイズを登録する」画面から問題を作ってね！";
        answerBox.style.display = 'none';
        return;
    }

    // 現在の問題データを配列から取り出す（js-array, js-objectの知識）
    const currentQuiz = quizList[currentIndex];

    // 画面の文字を書き換える（js-elementの知識）
    quizInfo.textContent = `第 ${currentIndex + 1} 問 （作った人: ${currentQuiz.creator} さん）`;
    questionText.textContent = currentQuiz.question;
    answerText.textContent = currentQuiz.answer;

    // 次の問題に移るときは、こたえの枠を一度隠す（js-attributeの知識）
    answerBox.style.display = 'none';
}

// 4. ボタンをクリックしたときのイベント処理（js-event, js-slideshowの知識）

// 「こたえを見る」ボタン
showBtn.addEventListener('click', function() {
    // 隠れていた答えのボックスを表示する（js-attributeの知識）
    answerBox.style.display = 'block';
});

// 「次の問題」ボタン
nextBtn.addEventListener('click', function() {
    // 次の問題に進む（インデックスを1増やす）
    currentIndex++;

    // もし最後の問題を超えてしまったら、最初の問題に戻る（js-conditionalの知識）
    if (currentIndex >= quizList.length) {
        currentIndex = 0;
    }
    showQuiz();
});

// 「前の問題」ボタン
prevBtn.addEventListener('click', function() {
    // 前の問題に戻る（インデックスを1減らす）
    currentIndex--;

    // もし最初の問題より前になったら、最後の問題に行く（js-conditionalの知識）
    if (currentIndex < 0) {
        currentIndex = quizList.length - 1;
    }
    showQuiz();
});


// 5. 最初にページを開いたときに、1問目を表示する
showQuiz();