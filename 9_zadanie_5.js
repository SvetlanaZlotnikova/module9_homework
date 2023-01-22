function useRequest(url,cb) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET",url, true);

    xhr.onload = function() {
        if(xhr.status !=200) {
    console.log('Статус ответа:' `${xhr.status}`)
        } else {
    let result = JSON.parse(xhr.response);
    
    console.log("Результат:", JSON.parse(xhr.response));
    if(cb) {
        cb(result);
     }
    } 
};
    xhr.onerror = function(){
    console.log("Ошибка! Статус ответа:", xhr.status);
    };

    xhr.send();
};

function displayResult(apiData) {
let cards = "";
    apiData.forEach((item, index, array) => {
    const cardBlock = `
        <div class="card">
        <img src="${item.download_url}" class="card-image"/>
        <p>${item.author}</p>
        </div>
        `;
    cards = cards + cardBlock;
    localStorage.setItem("localDiv", cards)
}); 
console.log(cards)
resultRequest.innerHTML = cards;
}

const showImages = () => {
    const images = localStorage.getItem("localDiv");
    if(images) {
        const imageDivLocalStorage = document.querySelector(".result");
        imageDivLocalStorage.insertAdjacentHTML('afterend',images);
        console.log("После получения запроса, данные LocalStorage - будут удалены через 30 секунд")
        setTimeout(clearStorage,30000);
    } else {
        console.log("пустой")
    }
} 

document.addEventListener("DOMContentLoaded", showImages)

function clearStorage () {
    localStorage.clear();
}

function deleteError() {
       const divErrorInput = document.querySelector(".error");
       divErrorInput.innerHTML = " ";
    }

function error(message) {
    const errorMessage = message;
    const divEr = document.querySelector(".error");
    const error = `<div class="error_number"><p> ${errorMessage} вне диапазона от 1 до 10</p></div>`
    divEr.innerHTML = error;

    setTimeout(deleteError,2000);

};

const resultRequest = document.querySelector(".result");
const btn = document.querySelector(".btn");


btn.addEventListener("click", async (e) => {
    console.log("start");
let value1 = `${document.querySelector('.inp_1').value}`;
let value2 = `${document.querySelector('.inp_2').value}`;
if(value1>10 || value1<1) { 
    if(value2>10 || value2<1) {
    error ("Номер страницы и лимит")
    }
 else {
    error ("Номер страницы")
    } 
}
else if(value2>10 || value2<1) {
    error ("Лимит")
}
else {
    let valueUrl =`https://picsum.photos/v2/list?page=${value1}&limit=${value2}`
    const requestResult = useRequest(valueUrl, displayResult);
    console.log("Значение", valueUrl);
    console.log("end")}
});