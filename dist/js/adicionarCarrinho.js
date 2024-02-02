export function adicionarItensAoCarrinho() {
    let produtosCarrinho = 0;
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
            const notificacaoCarrinho = document.querySelector(".notificacao_carrinho");
            notificacaoCarrinho.style.display = 'flex';
            produtosCarrinho += 1;
            notificacaoCarrinho.textContent = produtosCarrinho.toString();
            const itemCarrinho = {
                nome: nome,
                imagem: imagem,
                preco: preco,
                codigo: codigo,
                quantidade: quantidade
            };
            const carrinhoString = JSON.stringify(itemCarrinho);
            localStorage.setItem('carrinho', carrinhoString);
            console.log(itemCarrinho);
        });
    });
}
const elementoCarrinho = document.querySelector(".container_carrinho");
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
        </div>`;
    calcularTotal(carrinhoSalvo.preco, carrinhoSalvo.quantidade);
}
function calcularTotal(preco, quantidade) {
    let totalElemento = document.querySelector(".valor_total");
    preco = parseFloat(preco.replace('R$', ''));
    const total = preco * quantidade;
    totalElemento.textContent = `R$${total.toFixed(2)}`;
}
