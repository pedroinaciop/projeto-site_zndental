const elementoCarrinho = document.querySelector(".container_carrinho");
export function adicionarItensAoCarrinho() {
    let produtosCarrinho = 0;
    const elementoProduto = document.querySelectorAll(".container__nicho");
    elementoProduto.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            const elementoClicado = event.currentTarget;
            const nomeProduto = elementoClicado.querySelector(".nome_produto");
            const imagemProduto = elementoClicado.querySelector(".nicho__imagem__img");
            const precoProduto = elementoClicado.querySelector(".preco_atual");
            const notificacaoCarrinho = document.querySelector(".notificacao_carrinho");
            const nome = nomeProduto.innerText;
            const imagem = imagemProduto.src;
            const preco = precoProduto.innerText;
            notificacaoCarrinho.style.display = 'flex';
            produtosCarrinho += 1;
            notificacaoCarrinho.textContent = produtosCarrinho.toString();
            const itemCarrinho = {
                nome: nome,
                imagem: imagem,
                preco: preco
            };
            console.log(itemCarrinho);
        });
    });
}
