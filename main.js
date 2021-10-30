"use strict"


const select = document.querySelector('.selects')
const filme = "Filmes"
const programas = "Programas de tv" 
select.innerHTML = `
    <option>
        ${filme}                 
    </option>
    <option>
        ${programas}                 
    </option>
`



const apiTmdbFilmes = async (imagem) => {    
    const chaveApi = "?api_key=85653fd24a1dbf9eeb115a2828484764"
    const url = `https://api.themoviedb.org/3/search/movie${chaveApi}&language=pt-BR&region=brazil&query=${imagem}`
    
    const response = await fetch(url)
    const imagensAchadas = await response.json()

    return imagensAchadas
}

const apiTmdbTv = async (imagem) => {    
    const chaveApi = "?api_key=85653fd24a1dbf9eeb115a2828484764"
    const url = `https://api.themoviedb.org/3/search/tv${chaveApi}&language=pt-BR&region=brazil&query=${imagem}`
    
    const response = await fetch(url)
    const imagensAchadas = await response.json()

    return imagensAchadas
}

const apiDetalhesFilme = async (id) => {

    const chaveApi = "?api_key=85653fd24a1dbf9eeb115a2828484764"

    //retorna a url de outra api do site com mais detalhes do filme
    const urlDetalhes = `https://api.themoviedb.org/3/movie/${id}${chaveApi}&language=pt-BR`

    //response da api
    const filmeDetalhes = await fetch (urlDetalhes)

    //formato json da api
    const apiDetalhes = await filmeDetalhes.json()

    return apiDetalhes
}

const apiDetalhesTv = async (id) => {

    const chaveApi = "?api_key=85653fd24a1dbf9eeb115a2828484764"

    //retorna a url de outra api do site com mais detalhes do filme
    const urlDetalhes = `https://api.themoviedb.org/3/tv/${id}${chaveApi}&language=pt-BR`

    //response da api
    const filmeDetalhes = await fetch (urlDetalhes)

    //formato json da api
    const apiDetalhes = await filmeDetalhes.json()

    return apiDetalhes
}

const limpaBusca = (elemento) => {
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}

const buscarImagensClick = async() => {

    var valueOption = select.options[select.selectedIndex].text

    if(valueOption == filme){
            const imagemPesquisa = document.querySelector('#inputPesquisa').value
            const infoImagens = await apiTmdbFilmes(imagemPesquisa)
            const arrayResultados = infoImagens.results
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
    }
    else if(valueOption == programas){
            const imagemPesquisa = evento.target.value
            const infoImagens = await apiTmdbTv(imagemPesquisa)
            const arrayResultados = infoImagens.results
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
    }
}

const buscarImagens = async(evento) => {

    var valueOption = select.options[select.selectedIndex].text

    if(valueOption == filme){
        if(evento.key === 'Enter'){
        

            const imagemPesquisa = evento.target.value
            const infoImagens = await apiTmdbFilmes(imagemPesquisa)
            const arrayResultados = infoImagens.results
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
        }   
    }
    else if(valueOption == programas){
        if(evento.key === 'Enter'){
            const imagemPesquisa = evento.target.value
            const infoImagens = await apiTmdbTv(imagemPesquisa)
            const arrayResultados = infoImagens.results
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
        }
    }

    
}

const criaCard = async (elemento, indice, array) => {


var valueOption = select.options[select.selectedIndex].text

    if(valueOption == filme){
        
        //retorna o id do filme
        const filmeId = elemento.id 
        const infoFilmes = await apiDetalhesFilme(filmeId)

        //pegando array de generos do filme
        const generoFilme = infoFilmes.genres
        
        //criando o array generos para resgatar os nomes dos generos do filme
        var generos = []

        //criando foreach para pegar e transformar em um só array os generos do filme
        generoFilme.forEach(element => {
            //colocando os generos do filme em um só array
            return generos.push(element.name)
        })

        const filmeImagem = `https://image.tmdb.org/t/p/w500${elemento.poster_path}`
        const container = document.querySelector(".galeriaImagens")
        const novaDiv = document.createElement("div")
        novaDiv.classList.add("card-imagem")
        novaDiv.innerHTML = 
        `<img src="${filmeImagem}">
        <h3 class="descTitulo">${elemento.title}</h3>
        <span class="descImg">
            Generos: ${generos}
        </span>        
        `
        container.appendChild(novaDiv)
    }
    else if(valueOption == programas){
        const TvId = elemento.id 
        const infoTv = await apiDetalhesTv(TvId)

        const generoTv = infoTv.genres

        var generos = []

        //criando foreach para pegar e transformar em um só array os generos do filme
        generoTv.forEach(element => {
            //colocando os generos do filme em um só array
            return generos.push(element.name)
        })
        const TvImagem = `https://image.tmdb.org/t/p/w500${elemento.poster_path}`
        const container = document.querySelector(".galeriaImagens")
        const novaDiv = document.createElement("div")
        novaDiv.classList.add("card-imagem")
        novaDiv.innerHTML = 
        `<img src="${TvImagem}">
        <h3 class="descTitulo">${elemento.name}</h3>
        <span class="descImg">
            Generos: ${generos}
        </span>        
        `
        container.appendChild(novaDiv)
    }

}

const carregarResultados = (array) => {
    array.forEach(criaCard)
}
document.querySelector("#inputPesquisa").addEventListener('keypress', buscarImagens)
document.querySelector(".iconPesquisa").addEventListener('click', buscarImagensClick)