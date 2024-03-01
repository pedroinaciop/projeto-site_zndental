import { CarrinhoDeCompras } from "./CarrinhoDeCompras.js";
class Produtos {
    elementoParaInserirProdutos;
    constructor(elementoParaInserirProdutos) {
        this.elementoParaInserirProdutos = elementoParaInserirProdutos;
        this.buscarProdutosAPI();
    }
    async buscarProdutosAPI() {
        try {
            const dados = await fetch('https://pedroinaciop.github.io/zndental/dados.json');
            const produtos = await dados.json();
            this.exibirProdutosNaTela(produtos);
        }
        catch (error) {
            console.error('Erro ao buscar produtos, verifique no código-fonte:', error);
        }
    }
    exibirProdutosNaTela(produtos) {
        produtos.forEach((produto) => {
            this.elementoParaInserirProdutos.innerHTML += `
                <div class="container__nicho">
                    <div class="nicho__imagem">
                        <img class="nicho__imagem__img" src="${produto.imagem}" alt="${produto.alt}">
                    </div>
                    <div class="nicho__informacoes">
                        <p class="nome_produto">${produto.nome_produto} ${produto.marca}</p>
                        <p class="descricao">${produto.descricao}.</p>
                    <div class="container_precos_anteriores">
                        <p>R$</p>
                        <p class="preco_anterior">${produto.preco_anterior.toFixed(2)}</p>
                    </div>
                    <div class="container_precos_atuais">
                        <p>R$</p>
                        <p class="preco_atual">${produto.preco.toFixed(2)}</p>
                    </div>
                        <p class="codigo_produto">(Cód. ${produto.codigo})</p>
                    </div>
                    
                    <button type="submit" class="comprar">Adicionar</button>    
                </div>`;
        });
        const itemCarrinho = new CarrinhoDeCompras();
        CarrinhoDeCompras.visualizarItensCarrinho();
    }
}
const elementoParaInserirProdutos = document.querySelector('#container__nicho');
const produtos = new Produtos(elementoParaInserirProdutos);
