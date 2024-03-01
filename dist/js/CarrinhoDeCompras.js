export class CarrinhoDeCompras {
    carrinhoString = [];
    constructor() {
        const btnComprar = document.querySelectorAll(".comprar");
        btnComprar.forEach((elemento) => {
            elemento.addEventListener("click", (event) => {
                const elementoClicado = event.currentTarget;
                const elementoPai = elementoClicado.parentElement;
                elementoPai.addEventListener("click", this.adicionarItemAoCarrinho.bind(this));
            });
        });
    }
    adicionarItemAoCarrinho(event) {
        const elementoClicado = event.currentTarget;
        const nomeInput = elementoClicado.querySelector(".nome_produto");
        const imagemInput = elementoClicado.querySelector(".nicho__imagem__img");
        const precoInput = elementoClicado.querySelector(".preco_atual");
        const codigoInput = elementoClicado.querySelector(".codigo_produto");
        const nome = nomeInput.innerText;
        const imagem = imagemInput.src;
        const preco = precoInput.innerText;
        const codigo = codigoInput.innerText;
        const itemCarrinho = {
            nome: nome,
            imagem: imagem,
            preco: preco,
            codigo: codigo,
        };
        this.carrinhoString.push(itemCarrinho);
        localStorage.setItem('carrinho', JSON.stringify(this.carrinhoString));
        this.notificacaoCarrinho();
    }
    ;
    notificacaoCarrinho() {
        const notificacaoCarrinho = document.querySelector(".notificacao_carrinho");
        const produtosCarrinho = JSON.parse(localStorage.getItem('carrinho'));
        const total = produtosCarrinho.length;
        notificacaoCarrinho.style.display = 'flex';
        return notificacaoCarrinho.textContent = total.toString();
    }
    ;
    static calcularTotal(precos) {
        const totalElemento = document.querySelector(".valor_total");
        let sum = 0;
        for (let i = 0; i < precos.length; i++) {
            const precosCovertidos = parseFloat(precos[i]);
            sum += precosCovertidos;
        }
        return totalElemento.textContent = `R$${sum.toFixed(2)}`;
    }
    ;
    static removerItemCarrinho() {
        const removerItem = document.querySelectorAll(".btn_excluir_produto");
        removerItem.forEach((elemento) => {
            elemento.addEventListener("click", (event) => {
                //Captura objetos que foram enviados para o localStorage - 'carrinho'
                const carrinho = localStorage.getItem('carrinho');
                const arrayCarrinhoRecuperado = JSON.parse(carrinho);
                //Identifica elemento clicado no carrinho
                const elementoClicado = event.currentTarget;
                //Identifica o nome do produto clicado no carrinho
                const nomeElementoClicado = elementoClicado.parentElement.querySelector(".produto_nome_carrinho");
                //Alerta sobre a exclusão do material
                Swal.fire({
                    title: `Certeza que deseja retirar a(o) ${nomeElementoClicado.textContent} do carrinho?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#28a745",
                    cancelButtonColor: "#dc3545",
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        for (let i = 0; i <= arrayCarrinhoRecuperado.length; i++) {
                            if (arrayCarrinhoRecuperado[i].nome == nomeElementoClicado.textContent) {
                                arrayCarrinhoRecuperado.splice([i], 1);
                                localStorage.setItem('carrinho', JSON.stringify(arrayCarrinhoRecuperado));
                                location.reload();
                            }
                        }
                        if (arrayCarrinhoRecuperado.length == 0) {
                            localStorage.removeItem('carrinho');
                        }
                    }
                });
            });
        });
    }
    ;
    static visualizarItensCarrinho() {
        const precos = [];
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
                        <h3 class="produto_valor_carrinho">R$${carrinhoSalvo[i].preco}</h3>
                    </div>
                    <img src="../dist/images/lata-de-lixo.png" class="btn_excluir_produto"></img>
                </section>`;
                precos.push(carrinhoSalvo[i].preco);
                CarrinhoDeCompras.calcularTotal(precos);
                CarrinhoDeCompras.removerItemCarrinho();
            }
        }
    }
    ;
}
CarrinhoDeCompras.visualizarItensCarrinho();
