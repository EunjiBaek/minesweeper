var 바디 = document.body;

// 공통적인것들은 배열이나 객체로 묶어주는것이 코드를 정리하기 좋다.
var 숫자후보 = [1,2,3,4,5,6,7,8,9];

var 숫자배열 = [];


for (var i = 0; i < 4; i +=1){
    // 마지막부터 순차적으로 하나씩 pop
    // var  뽑은것 = 숫자후보.pop();
    // 처음부터 순차적으로 하나씩 shift
    // splice(위치, 개수) 하면 위치로부터 개수만큼 배열에서 뽑는다
    var  뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    숫자배열.push(뽑은것);
}

console.log(숫자배열);



var 결과 = document.createElement('h1');
document.body.append(결과);
var 폼 = document.createElement('form');
document.body.append(폼);
var 입력창 = document.createElement('input');
입력창.type = 'text';
입력창.maxLength = 4;
폼.append(입력창);
var 버튼 = document.createElement('button');
버튼.textContent = '입력';
폼.append(버튼);

// 문자.split(구분자) -> 배열
// 배열.join(구분자) -> 문자

console.log(숫자배열.join(''));

폼.addEventListener('submit', function 비동기 (e) { //엔터를 쳤을때
    e.preventDefault();
    var 답 = 입력창.value;
    console.log(답, 숫자배열, 답 === 숫자배열.join(''));

    if(답 === 숫자배열.join('')) {
        결과.textContent = '홈런';
        입력창.value = '';
        입력창.focus();
        숫자후보 = [1,2,3,4,5,6,7,8,9];
        숫자배열 = [];
        for (var i = 0; i < 4; i +=1){
            var  뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
            숫자배열.push(뽑은것);
        }
    } else { // 답이틀리면
        var 답배열 = 답.split('');
        var 스트라이크 = 0;
        var 볼 = 0;
        
        // 배열.indexOf(값) 값의 위치를 알수 있다. 없으면 -1
        // 스트라이크에서 이미 같은 자리에 있는거를 확인하고 넘어간다
        for(var i = 0; i < 3; i +=1){
            if(답배열[i] === 숫자배열[i]){ // 같은자리인지 확인
                스트라이크 += 1;
            }else if (숫자배열.indexOf(답배열[i]) > -1){ // 같은 자리는 아니지만. ㅅㅅ자가 겹치는지 확인
                볼 += 1;
            }
            결과.textContent = 스트라이크 + '스트라이크' + 볼 + '볼입니다';
            입력창.value = '';
            입력창.focus();
        }

        입력창.value = '';
        입력창.focus();
    }
});

