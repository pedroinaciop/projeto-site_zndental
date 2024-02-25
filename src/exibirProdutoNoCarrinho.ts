import { calcularTotal, removerItemCarrinho } from "./funcoesCarrinho.js";
import { notificacaoCarrinho } from "./funcoesCarrinho.js";
import { Carrinho } from "./util/Carrinho.js"

export function adicionarItensAoCarrinho() {
    const carrinhoString = [];
    const elementoProduto = document.querySelectorAll(".container__nicho");
    
    elementoProduto.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            const elementoClicado = event.currentTarget as HTMLElement;
            
            const nomeInput       = elementoClicado.querySelector(".nome_produto") as HTMLElement;
            const imagemInput     = elementoClicado.querySelector(".nicho__imagem__img") as HTMLImageElement;
            const precoInput      = elementoClicado.querySelector(".preco_atual") as HTMLElement;
            const codigoInput     = elementoClicado.querySelector(".codigo_produto") as HTMLElement;
            
            const nome: string    = nomeInput.innerText;
            const imagem: string  = imagemInput.src;
            const preco: string   = precoInput.innerText;
            const codigo: string  = codigoInput.innerText;
            
            const itemCarrinho: Carrinho = {
                nome:   nome,
                imagem: imagem,
                preco:  preco,
                codigo: codigo,
            }
    
            carrinhoString.push(itemCarrinho);
            localStorage.setItem('carrinho', JSON.stringify(carrinhoString));
            notificacaoCarrinho();
            
        });
    }); 
}

let visualizarItensCarrinho = () => {
    const precos = [];
    const carrinhoSalvoString = localStorage.getItem('carrinho');
    const carrinhoSalvo = JSON.parse(carrinhoSalvoString);
    
    const elementoCarrinho: HTMLElement = document.querySelector(".container_view_carrinho") as HTMLElement;
    const carrinhoVazio: HTMLElement = document.querySelector(".container_carrinho") as HTMLElement;

    if (carrinhoSalvo && elementoCarrinho) {
        elementoCarrinho.removeChild(carrinhoVazio);
        for (let i=0;i<=carrinhoSalvo.length;i++) {
            elementoCarrinho.innerHTML += `
            <section class="container_carrinho">   
                <img src="${carrinhoSalvo[i].imagem}" alt="" class="produto_imagem_carrinho">
                <div class="produto_informacoes">
                    <h3 class="produto_nome_carrinho">${carrinhoSalvo[i].nome}</h3>
                    <p class="produto_codigo_carrinho">${carrinhoSalvo[i].codigo}</p>
                </div>
                <div class="container_preco">
                    <input type="number" value="1" min="1" max="999" class="produto_quantidade">
                    <h3 class="produto_valor_carrinho">R$${carrinhoSalvo[i].preco}</h3>
                </div>
                <img src="../dist/images/lata-de-lixo.png" class="btn_excluir_produto"></img>
            </section>`

            precos.push(carrinhoSalvo[i].preco)
            calcularTotal(precos);
            removerItemCarrinho();
        }
    }
}

visualizarItensCarrinho();