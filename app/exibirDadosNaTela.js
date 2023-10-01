const elementoParaInserirProdutos = document.getElementById('container__nicho')

function exibirLivrosNaTela(itens) {
    itens.forEach(produto => {
    elementoParaInserirProdutos.innerHTML += ` 
        <div class="container__nicho">
            <div class="nicho__imagem">
                <img class="nicho__imagem__img" src="${produto.imagem}" alt="${produto.alt}">
            </div>
            <div class="nicho__informacoes">
                <p class="nome_produto">${produto.nome_produto} ${produto.marca}</p>
                <p class="descricao">${produto.descricao}.</p>
                <p class="preco_anterior">R$${produto.preco_anterior.toFixed(2)}</p>
                <p class="preco_atual">R$${produto.preco.toFixed(2)}</p>
            </div>
                <a href="#"><p class="comprar">Adicionar</p></a>
        </div>`
    })
}