/* Buscando elementos*/
const body = document.querySelector("body")
const btns = document.querySelectorAll('.btn_cor')

const azul= document.querySelector('.btn_azul')
azul.addEventListener('click', () =>{
    btns.forEach(element => {
        element.classList.remove('active')
    });
    body.style.backgroundColor = '#0000FF'
    azul.classList.add('active')
})

const vermelho= document.querySelector('.btn_vermelho')
vermelho.addEventListener('click', () =>{
    btns.forEach(element => {
        element.classList.remove('active')
    });
    body.style.backgroundColor = '#00FF00'
    vermelho.classList.add('active')
})

const roxo= document.querySelector('.btn_roxo')
roxo.addEventListener('click', () =>{
    btns.forEach(element => {
        element.classList.remove('active')
    });
    body.style.backgroundColor = '#FF00FF'
    roxo.classList.add('active')
})