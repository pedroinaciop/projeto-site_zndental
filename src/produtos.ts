import { adicionarItensAoCarrinho } from "./funcoesCarrinho.js";

buscarProdutosAPI();
export async function buscarProdutosAPI() {
    const dados = await fetch('https://pedroinaciop.github.io/zndental/dados.json');
    const produtos = await dados.json();
    exibirProdutosNaTela(produtos);
};

const elementoParaInserirProdutos = document.querySelector('#container__nicho') as HTMLElement;

export function exibirProdutosNaTela(itens: any): void {
    itens.forEach((produto: { imagem: any; alt: string; nome_produto: string; marca: string; 
                              descricao: string; preco_anterior: number; preco: number; codigo: string}) => {
    elementoParaInserirProdutos.innerHTML += ` 
        <div action="" class="container__nicho">
            <div class="nicho__imagem">
                <img class="nicho__imagem__img" src="${produto.imagem}" alt="${produto.alt}">
            </div>
            <div class="nicho__informacoes">
                <p class="nome_produto">${produto.nome_produto} ${produto.marca}</p>
                <p class="descricao">${produto.descricao}.</p>
                <p class="preco_anterior">R$${produto.preco_anterior.toFixed(2)}</p>
                <p class="preco_atual">R$${produto.preco.toFixed(2)}</p>
                <p class="codigo_produto">(Cód. ${produto.codigo})</p>
            </div>
            <div class="quantidade_adicionada">
                <button type="submit" class="comprar quantidade_selecionada">Adicionar</button>

            </div>
        </div>`
        
    });
    adicionarItensAoCarrinho(); 
};