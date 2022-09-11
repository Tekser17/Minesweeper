const printField = () => {
    const field = document.getElementById('field');
    field.innerHTML = null;
    for (let i = 1; i <= 100; i++) {
        const x = Math.floor((i - 1) / 10) + 1;
        const y = i - (x - 1) * 10;
        field.insertAdjacentHTML('beforeend',
            `<a class="cell" id="${i}">${cells[x][y]}</a>`);
    }
    for (let cell of document.querySelectorAll('.cell')) {
        cell.addEventListener('click', leftClick);
        cell.addEventListener('contextmenu', rightClick)
    }
}



















/*   Переписал на сервер
// Получаем рандомные x и y от 1 до (x, y)
function getRandomXY(x, y) {
    return [Math.floor(Math.random() * x) + 1, Math.floor(Math.random() * y) + 1];
}

//Проверка количества мин в мапе
function checkMinesCol(x, y, mines, mp) {
    let arr = [];
    for(let i = 0; i <= x + 1; i++) {
        arr.push([])
        for (let j = 0; j <= y + 1; j++) {
            arr[i][j] = 0;
        }
    }
    let sum = 0;
    for (let it of mp.keys()) {
        if(arr[it[0]][it[1]] !== -1) {
            arr[it[0]][it[1]] = -1;
            sum++;
        }
    }
    return sum !== mines;
}

//Генерируем координаты мин
function takeMinesCord(x, y, mines){
    let mp = new Map();
    let q;
    while(checkMinesCol(x, y, mines, mp)){//!!! Не делать проверку через размер мапа, ключи могут быть одинаковыми
       do {
            q = getRandomXY(x, y);
       } while(mp.get(q) === -1);
       mp.set(q, -1);
    }
    return mp;
}

//Открываем пустые клетки после клика
function openNearCells(x, y){

}

// Расставляем числа около мин
function putNumbersAroundMine(x, y, mainField){
    for(let i = 1; i <= x; i++){
        for(let j = 1; j <= y; j++){
            let q = 0;
            if(mainField[i][j] !== -1){
                if(mainField[i + 1][j] === -1) q++;
                if(mainField[i - 1][j] === -1) q++;
                if(mainField[i][j + 1] === -1) q++;
                if(mainField[i][j - 1] === -1) q++;
                if(mainField[i - 1][j + 1] === -1) q++;
                if(mainField[i - 1][j - 1] === -1) q++;
                if(mainField[i + 1][j + 1] === -1) q++;
                if(mainField[i + 1][j - 1] === -1) q++;
                mainField[i][j] = q;
            }
        }
    }
}

//Основная функция
function generateField(x, y, mines){
    let mainField = []; // Поле с минами и числами около них
    let openCells = []; // Поле со статусом открытых/закрытых клеток
    for(let i = 0; i <= x + 1; i++) {
        mainField.push([])
        openCells.push([]) // Обьявляем массивы
        for (let j = 0; j <= y + 1; j++) {
            mainField[i][j] = 0;
            openCells[i][j] = 0;
        }
    }
    let minesCord = takeMinesCord(x, y, mines); // Получаем мап координат
    //console.log(minesCord);
    //console.log(x, y);
    for (let it of minesCord.keys()) {
        mainField[it[0]][it[1]] = -1;     // Расставляем мины в основном поле
    }
    putNumbersAroundMine(x, y, mainField) // Расставляем числа около мин

    //Дебаг
    let sum = 0;
    for(let i = 1; i <= x; i++){
        for(let j = 1; j <= y; j++){
            if(mainField[i][j] == -1) sum++;
        }
    }
    console.log(sum)
    for(let i = 0; i <= x + 1; i++) {
       // console.log(i, ':', mainField[i])
    }
}

function Start(){
    let raw = localStorage.getItem('Difficult')
    console.log(raw)
}

Start()
*/
// 9 * 9 - 10    8.1 (Клеток на 1 мину)
// 16 * 16 - 40  6.4
// 16 * 30 - 99  4.84