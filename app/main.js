buscarProdutosAPI()

async function buscarProdutosAPI() {
    const dados = await fetch('https://pedroinaciop.github.io/zndental/dados.json')
    const produtos = await dados.json()
    exibirLivrosNaTela(produtos)
}

