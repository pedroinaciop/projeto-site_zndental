import { Carrinho } from './util/Carrinho.js';

export function adicionarItensAoCarrinho() {
  
    let produtosCarrinho:number = 0
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
            
            const notificacaoCarrinho = document.querySelector(".notificacao_carrinho") as HTMLElement;
            notificacaoCarrinho.style.display = 'flex';
            produtosCarrinho += 1;
            notificacaoCarrinho.textContent = produtosCarrinho.toString();
            
            const itemCarrinho: Carrinho = {
                nome: nome,
                imagem: imagem,
                preco: preco,
                codigo: codigo,
                quantidade: quantidade
            }

            const carrinhoString = JSON.stringify(itemCarrinho);
            localStorage.setItem('carrinho', carrinhoString)
            console.log(itemCarrinho)
        });
    }); 
}

const elementoCarrinho: HTMLElement = document.querySelector(".container_carrinho") as HTMLElement;

const carrinhoSalvoString = localStorage.getItem('carrinho');
const carrinhoSalvo = JSON.parse(carrinhoSalvoString);
if (carrinhoSalvoString && elementoCarrinho != null) {
    elementoCarrinho.innerHTML += `
        <img src="${carrinhoSalvo.imagem}" alt="" class="produto_imagem_carrinho">
        <div>
            <h3 class="produto_nome_carrinho">${carrinhoSalvo.nome}</h3>
            <p class="produto_codigo_carrinho">${carrinhoSalvo.codigo}</p>
        </div>
        <div class="container_preco">
            <input type="number" value="${carrinhoSalvo.quantidade}" min="0" max="999" class="produto_quantidade">
            <h3 class="produto_valor_carrinho">${carrinhoSalvo.preco}</h3>
        </div>`
        calcularTotal(carrinhoSalvo.preco, carrinhoSalvo.quantidade);
}

function calcularTotal(preco: any, quantidade: number) {
    let totalElemento = document.querySelector(".valor_total") as HTMLElement;
    
    preco = parseFloat(preco.replace('R$', ''));
    const total = preco * quantidade;
    totalElemento.textContent = `R$${total.toFixed(2)}`
}