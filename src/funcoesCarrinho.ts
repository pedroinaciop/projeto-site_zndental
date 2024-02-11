import { Carrinho } from './util/Carrinho.js';
import { visualizarItensCarrinho } from './visualizarProdutosCarrinho.js';

export function adicionarItensAoCarrinho() {
  
    const carrinhoString = [];
    const elementoProduto = document.querySelectorAll(".container__nicho");
    
    elementoProduto.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            const elementoClicado = event.currentTarget as HTMLElement;
            
            const nomeInput = elementoClicado.querySelector(".nome_produto") as HTMLElement;
            const imagemInput = elementoClicado.querySelector(".nicho__imagem__img") as HTMLImageElement;
            const precoInput = elementoClicado.querySelector(".preco_atual") as HTMLElement;
            const quantidadeInput = elementoClicado.querySelector(".quantidade_selecionada") as HTMLInputElement;
            const codigoInput = elementoClicado.querySelector(".codigo_produto") as HTMLElement;
            
            const nome: string = nomeInput.innerText;
            const imagem: string = imagemInput.src;
            const preco: string = precoInput.innerText;
            const codigo: string = codigoInput.innerText;
            const quantidade: string = quantidadeInput.value;
            
            const itemCarrinho: Carrinho = {
                nome: nome,
                imagem: imagem,
                preco: preco,
                codigo: codigo,
                quantidade: quantidade
            }
    
            carrinhoString.push(itemCarrinho);
            localStorage.setItem('carrinho', JSON.stringify(carrinhoString));
            notificacaoCarrinho();
        });
    }); 
}

export function notificacaoCarrinho() {
    let produtosCarrinho = JSON.parse(localStorage.getItem('carrinho'));
    let total = produtosCarrinho.length;
    
    let notificacaoCarrinho = document.querySelector(".notificacao_carrinho") as HTMLElement;
    notificacaoCarrinho.style.display = 'flex';
    notificacaoCarrinho.textContent = total.toString();
}

visualizarItensCarrinho();