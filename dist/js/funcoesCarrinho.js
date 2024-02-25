export function notificacaoCarrinho() {
    let notificacaoCarrinho = document.querySelector(".notificacao_carrinho");
    let produtosCarrinho = JSON.parse(localStorage.getItem('carrinho'));
    let total = produtosCarrinho.length;
    notificacaoCarrinho.style.display = 'flex';
    return notificacaoCarrinho.textContent = total.toString();
}
export function calcularTotal(precos) {
    const totalElemento = document.querySelector(".valor_total");
    let sum = 0;
    for (let i = 0; i < precos.length; i++) {
        const precosCovertidos = parseFloat(precos[i]);
        sum += precosCovertidos;
    }
    return totalElemento.textContent = `R$${sum.toFixed(2)}`;
}
export function removerItemCarrinho() {
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
            //Alerta sobre a esclusão do material
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
