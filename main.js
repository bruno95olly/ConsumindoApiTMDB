"use strict";

const filtrarId = (url) => {
    const ultimaBarra = url.lastIndexOf("/") + 1;
    const ultimoPonto = url.lastIndexOf('.')
    return url.substring(ultimaBarra, ultimoPonto)
}

const criarItem = (urlImagem, nomeFilme, genero, descricao, popularidade) => {
    const container = document.querySelector(".galeria-container")
    const novolink = document.createElement("a")

    novolink.href = `#${filtrarId(urlImagem)}`
    novolink.classList.add("galeria-itens")
    container.innerHTML = `<h2>${nomeFilme}</h2>`
    novolink.innerHTML = `<img src="${urlImagem}" alt=""></img>`
    container.append(novolink);
    const novaDiv = document.createElement("div")
    novaDiv.innerHTML = `
        <h4>Popularidade: ${popularidade} ❤</h4>
        <h3>Generos: ${genero}</h3>
        <p>${descricao}</p>
    
    `
    container.appendChild(novaDiv);

    // container.innerHTML += `<a href="#ant-man" class="galeria-itens">
    // <img src="${urlImagem}" alt="">
    // </a>`

}

const criarSlide = (urlImagem) => {
    const container = document.querySelector(".slide-container")
    const novaDiv = document.createElement("div")
    novaDiv.classList.add("slide")
    novaDiv.id = filtrarId(urlImagem)

    novaDiv.innerHTML = `
        <div class="imagem-container">
            <a href="" class="fechar">&#10006;</a>
            <img src="${urlImagem}" alt="">
        </div>
    `
    container.appendChild(novaDiv);


}

//Limpa os resultados da pesquisa anterior
    const limparElementos = (elemento) => {
        while (elemento.firstChild){
            elemento.removeChild(elemento.lastChild)
        }
    }



/* Funcao que retona o resultado do nome do filme digitado
pelo usuario, atraves de um api */
const pesquisarFilmes = async (evento) =>{

    //o objetivo desse if é ver se a tecla enter foi digitada
    if(evento.key === 'Enter'){

        //a constante filme recebe o valor que o usuario inseriu
        const filme = evento.target.value

        //apikey é a chave da api do usuario para utilizar a api do tmdb
        const apikey = '?api_key=85653fd24a1dbf9eeb115a2828484764'

        //a url retorna o caminho da api para resgatar os dados que o desenvolvedor quiser utilizar
        const url = `https://api.themoviedb.org/3/search/movie${apikey}&language=pt-BR&region=brazil&query=${filme}`
        
        //traz o response da api
        const buscaFilmeResposta = await fetch(url)
        console.log(buscaFilmeResposta)

        //esse if retorna se foi encontrado algum resultado buscado
        if(buscaFilmeResposta.ok){
            //a constante buscaFilme retorna o formato json da api 
            const buscaFilme = await buscaFilmeResposta.json()

            //a constante apiFilme pega o primeiro resultado encontrado pela api
            const apiFilme = buscaFilme.results[0]
            console.log(apiFilme)

            //retorna o caminho do filme
            const caminhoImagem = apiFilme.backdrop_path

            //retorna a imagem do filme
            const filmeImagem = `https://image.tmdb.org//t//p//w1280/${caminhoImagem}`

            //retorna o titulo do filme
            const filmeTitulo = apiFilme.title

            //retorna o id do filme
            const filmeId = apiFilme.id 

            //retorna a sinopse do filme
            const filmeDesc = apiFilme.overview

            //retorna a popularidade do filme
            const filmePopularidade = apiFilme.vote_average

            //retorna a url de outra api do site com mais detalhes do filme
            const urlDetalhes = `https://api.themoviedb.org/3/movie/${filmeId}${apikey}&language=pt-BR`

            //response da api
            const filmeDetalhes = await fetch (urlDetalhes)

            //formato json da api
            const apiDetalhes = await filmeDetalhes.json()

            //pegando array de generos do filme
            const generoFilme = apiDetalhes.genres
            console.log(generoFilme)
            
            //criando o array generos para resgatar os nomes dos generos do filme
            var generos = []

            //criando foreach para pegar e transformar em um só array os generos do filme
            generoFilme.forEach(element => {
                //colocando os generos do filme em um só array
                return generos.push(element.name)
            })
            
            limparElementos(document.querySelector('.galeria-container'))
            limparElementos(document.querySelector('.slide-container'))

            criarItem(filmeImagem, filmeTitulo, generos, filmeDesc, filmePopularidade)
            criarSlide(filmeImagem)
        }
        else{
            alert('filme nao encontrado')
        }
    }
    
}

const carregarGaleria = (filmes,) => filmes.forEach(criarItem)

document.querySelector('.pesquisa input')
    .addEventListener('keypress', pesquisarFilmes)