const elementoCarrinho = document.querySelector(".container_carrinho");

export function adicionarItensAoCarrinho() {
  
    let produtosCarrinho:number = 0
    const elementoProduto = document.querySelectorAll(".container__nicho");
    elementoProduto.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            const elementoClicado = event.currentTarget as HTMLElement;
            
            const nomeProduto = elementoClicado.querySelector(".nome_produto") as HTMLElement;
            const imagemProduto = elementoClicado.querySelector(".nicho__imagem__img") as HTMLImageElement;
            const precoProduto = elementoClicado.querySelector(".preco_atual") as HTMLElement;

            const notificacaoCarrinho = document.querySelector(".notificacao_carrinho") as HTMLElement;
            

            const nome: string = nomeProduto.innerText;
            const imagem: string = imagemProduto.src;
            const preco: string = precoProduto.innerText;

            notificacaoCarrinho.style.display = 'flex';
            produtosCarrinho += 1;
            notificacaoCarrinho.textContent = produtosCarrinho.toString();
            
            const itemCarrinho =  {
                nome: nome,
                imagem: imagem,
                preco: preco
            }

            console.log(itemCarrinho)
        });
    }); 
}