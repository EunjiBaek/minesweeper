var tbody = document.querySelector('#table tbody');
var dataset = [];

document.querySelector('#exec').addEventListener('click', () => {
    tbody.innerHTML = '';
    dataset = [];
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    //지뢰 위치 뽑기
    var 후보군 = Array(hor * ver)
        .fill()
        .map(function(요소, 인덱스) {
            return 인덱스;
        });
    var 셔플 = [];
    while (후보군.length > 80){
        var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
        셔플.push(이동값);
    }

    console.log(셔플);
    //지뢰 테이블 만들기
    for (var i = 0; i< ver; i +=1){
        var arr = [];
        dataset.push(arr);
        var tr = document.createElement('tr');
        for (var j = 0; j < hor; j+=1){
            arr.push(1);
            var td = document.createElement('td');
            td.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                console.log(칸, 줄);
                e.currentTarget.textContent = '!';
                dataset[줄][칸] = '!';
            });
            td.addEventListener('click', (e) => {
                //클릭했을때 주변 지뢰 개수
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                e.currentTarget.classList.add('opened');
                if(dataset[줄][칸] === 'X'){
                    e.currentTarget.textContent = '펑';
                }else{
                    var 주변 = [
                        dataset[줄][칸-1], dataset[줄][칸+1]
                    ];
                    if(dataset[줄-1]) {
                        주변 = 주변.concat(dataset[줄-1][칸-1],dataset[줄-1][칸],dataset[줄-1][칸+1]);
                    }
                    if(dataset[줄+1]){
                        주변 = 주변.concat(dataset[줄+1][칸-1],dataset[줄+1][칸],dataset[줄+1][칸+1]);
                    }
                    let 주변지뢰개수 = e.currentTarget.textContent = 주변.filter( (v) => {
                        return v === 'X';
                    }).length;

                    if(주변지뢰개수 === 0){
                        // 주변 8칸 동시 오픈 (재귀함수)

                    }
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    
    //지뢰심기
    for(var k = 0 ; k < 셔플.length; k++){ //예 59
        var 세로 = Math.floor(셔플[k] / 10); // 예 5
        var 가로 = 셔플[k] % 10;  //예 9
        console.log(세로, 가로);
        tbody.children[세로].children[가로].textContent = 'X';
        dataset[세로][가로] = 'X';
    }
});


// 무한 반복문 (반복문을 함수로 실행하는 방법이라고 할수 있다)
// function 재귀함수 () {
//     console.log(숫자);
//     if (숫자 < 5) {
//         재귀함수 (숫자 + 1);
//     }
// }



// 반복문과 비동기함수가 만날때 클로저 문제가 자주 발생한다
//마우스 오른쪽 클릭 이벤트는 contextmenu 이벤트이다.
// concat은 배열과 배열을 합쳐서 새로운 배열을 만든다
