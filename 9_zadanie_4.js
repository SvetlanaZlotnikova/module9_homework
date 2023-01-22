function useRequest(url) {
    
    const options = {
     method: 'GET',
     mode: 'cors'
    };
    fetch(url, options)
    .then((response) => {
        console.log("responce",response)
        let url = response.url
        console.log(url)
        return url
    })
    .then((url) => {
        let cards = ""
        const cardBlock = `<div class="card">
        <img src="${url}" class="card-image"/>
         </div>`;
        console.log(`${url}`)
        cards = cards + cardBlock;
        console.log(cards)
        resultRequest.innerHTML = cards;

    })
    
    .catch(() => {
         console.log('error')
     });
};


function deleteError() {
       const divErrorInput = document.querySelector(".error");
       divErrorInput.innerHTML = " ";
    }

function error() {
    const divEr = document.querySelector(".error");
    const error = `<div class="error_number"><p>Числа вне диапазона от 100 до 300</p></div>`
    divEr.innerHTML = error;

    setTimeout(deleteError,2000);

};

const resultRequest = document.querySelector(".result");
const btn = document.querySelector(".btn");


btn.addEventListener("click", async (e) => {
    console.log("start");
let value1 = `${document.querySelector('.inp_1').value}`;
let value2 = `${document.querySelector('.inp_2').value}`;
if(value1>300 || value1<100 || value1 === 0 && value2>300 || value2<100 ||  value2 === 0) {
    error ()
} else {
    let valueUrl =`https://picsum.photos/${value1}/${value2}`
    const requestResult = await useRequest(valueUrl);
    console.log("Значение", valueUrl);
    console.log("end");
}}
);