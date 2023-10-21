'use strict';

const apiKey = '2c07ed99';
const filtrar = document.getElementById('filtrar')

filtrar.onclick = (evento) => {
    evento.preventDefault()

    const input = document.querySelector('input')
    const pesquisa = input.value;

    if (pesquisa === '') {
        alert('O campo não pode estar vazio. Preencha o campo!')
        return
    }

    buscarFilme(apiKey, pesquisa)
};

async function buscarFilme(apiKey, pesquisa) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${pesquisa}`)
        const data = await response.json()

        if (data.Search) {
            const filmes = data.Search
            const lista = document.getElementById('lista')
            lista.innerHTML = ''

            filmes.forEach(filme => {
                criarFilmes(filme.Title, filme.Year, filme.Poster)
            });
        } else {
            console.log('O filme não foi encontrado no catálogo!')
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

function criarFilmes(tituloFilme, anoFilme, capaFilme) {
    const container = document.getElementById('lista')

    const item = document.createElement('div')
    item.classList.add('itens')

    const capa = document.createElement('img')
    capa.classList.add('capaFilme')
    capa.src = capaFilme;

    const titulo = document.createElement('h2')
    titulo.textContent = tituloFilme;

    const ano = document.createElement('p')
    ano.textContent = anoFilme;

    item.appendChild(capa)
    item.appendChild(titulo)
    item.appendChild(ano)

    container.appendChild(item)
}




