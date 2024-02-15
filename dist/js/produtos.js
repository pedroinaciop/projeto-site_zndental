import { adicionarItensAoCarrinho } from "./funcoesCarrinho.js";
buscarProdutosAPI();
export async function buscarProdutosAPI() {
    const dados = await fetch('https://pedroinaciop.github.io/zndental/dados.json');
    const produtos = await dados.json();
    exibirProdutosNaTela(produtos);
}
;
const elementoParaInserirProdutos = document.querySelector('#container__nicho');
export function exibirProdutosNaTela(itens) {
    itens.forEach((produto) => {
        elementoParaInserirProdutos.innerHTML += ` 
        <div action="" class="container__nicho">
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
            <div class="quantidade_adicionada">
                <button type="submit" class="comprar quantidade_selecionada">Adicionar</button>

            </div>
        </div>`;
    });
    adicionarItensAoCarrinho();
}
;
