var tbody = document.querySelector('#table tbody');
var dataset = [];

document.querySelector('#exec').addEventListener('click', () => {
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
    console.log(dataset);

});



//마우스 오른쪽 클릭 이벤트는 contextmenu 이벤트이다.