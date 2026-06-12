// 1. HTMLの要素（入力欄やボタン）を取得する（js-elementの知識）
const creatorInput = document.getElementById('creator');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitBtn = document.getElementById('submit-btn');

// 2. 「登録する」ボタンがクリックされたときの処理（js-eventの知識）
submitBtn.addEventListener('click', function() {
    
    // 入力された文字（値）を取得する（js-formの知識）
    const creatorValue = creatorInput.value;
    const questionValue = questionInput.value;
    const answerValue = answerInput.value;

    // 空欄がないかチェックする（js-conditionalの知識）
    if (creatorValue === '' || questionValue === '' || answerValue === '') {
        alert('ぜんぶ入力してね！');
        return; // ここで処理を終了する
    }

    // 3. ローカルストレージから、すでに保存されている配列（過去のクイズ）を読み込む（js-storage, js-todolistの知識）
    let quizList = [];
    const savedData = localStorage.getItem('quizData');
    
    // すでにデータが存在していれば、文字列から配列に変換する
    if (savedData !== null) {
        quizList = JSON.parse(savedData);
    }

    // 4. 新しいクイズのデータ（オブジェクト）を作る（js-objectの知識）
    const newQuiz = {
        creator: creatorValue,
        question: questionValue,
        answer: answerValue
    };

    // 5. 配列に新しいクイズのオブジェクトを追加する（js-arrayの知識）
    quizList.push(newQuiz);

    // 6. ローカルストレージに、配列を文字列に変換して保存する（js-storageの知識）
    localStorage.setItem('quizData', JSON.stringify(quizList));

    // 7. 次の人が入力しやすいように、入力欄を空っぽにする（js-attributeの知識）
    creatorInput.value = '';
    questionInput.value = '';
    answerInput.value = '';

    // 完了の合図
    alert('クイズを登録したよ！');
});