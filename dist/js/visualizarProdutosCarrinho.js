export function visualizarItensCarrinho() {
    const carrinhoSalvoString = localStorage.getItem('carrinho');
    const carrinhoSalvo = JSON.parse(carrinhoSalvoString);
    const elementoCarrinho = document.querySelector(".container_view_carrinho");
    const carrinhoVazio = document.querySelector(".container_carrinho");
    if (carrinhoSalvo && elementoCarrinho) {
        elementoCarrinho.removeChild(carrinhoVazio);
        for (let i = 0; i <= carrinhoSalvo.length; i++) {
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
                <button class="btn_remover">REMOVER</button>
            </section>`;
        }
    }
}
