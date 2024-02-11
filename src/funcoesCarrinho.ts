import { Carrinho } from './util/Carrinho.js';

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

export function visualizarItensCarrinho () {
    const carrinhoSalvoString = localStorage.getItem('carrinho');
    const carrinhoSalvo = JSON.parse(carrinhoSalvoString);
    
    const elementoCarrinho:HTMLElement = document.querySelector(".container_view_carrinho") as HTMLElement;
    const carrinhoVazio = document.querySelector(".container_carrinho")

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
                    <h3 class="produto_valor_carrinho">${carrinhoSalvo[i].preco}</h3>
                </div>
                <img src="../dist/images/lata-de-lixo.png" class="btn_excluir_produto"></img>
            </section>`
            removerItemCarrinho()
        }
    }
}

function removerItemCarrinho() {
    const removerItem = document.querySelectorAll(".btn_excluir_produto");
    removerItem.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            localStorage.removeItem('carrinho')
            const elementoClicado = event.target as HTMLElement;
            location.reload()
        });
    })
}

visualizarItensCarrinho();