import { visualizarItensCarrinho } from './visualizarProdutosCarrinho.js';
export function adicionarItensAoCarrinho() {
    const carrinhoString = [];
    const elementoProduto = document.querySelectorAll(".container__nicho");
    elementoProduto.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            const elementoClicado = event.currentTarget;
            const nomeInput = elementoClicado.querySelector(".nome_produto");
            const imagemInput = elementoClicado.querySelector(".nicho__imagem__img");
            const precoInput = elementoClicado.querySelector(".preco_atual");
            const quantidadeInput = elementoClicado.querySelector(".quantidade_selecionada");
            const codigoInput = elementoClicado.querySelector(".codigo_produto");
            const nome = nomeInput.innerText;
            const imagem = imagemInput.src;
            const preco = precoInput.innerText;
            const codigo = codigoInput.innerText;
            const quantidade = quantidadeInput.value;
            const itemCarrinho = {
                nome: nome,
                imagem: imagem,
                preco: preco,
                codigo: codigo,
                quantidade: quantidade
            };
            carrinhoString.push(itemCarrinho);
            localStorage.setItem('carrinho', JSON.stringify(carrinhoString));
            notificacaoCarrinho();
        });
    });
}
export function notificacaoCarrinho() {
    let produtosCarrinho = JSON.parse(localStorage.getItem('carrinho'));
    let total = produtosCarrinho.length;
    let notificacaoCarrinho = document.querySelector(".notificacao_carrinho");
    notificacaoCarrinho.style.display = 'flex';
    notificacaoCarrinho.textContent = total.toString();
}
visualizarItensCarrinho();
