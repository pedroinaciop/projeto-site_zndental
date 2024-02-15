export function notificacaoCarrinho(): string {
    let notificacaoCarrinho: HTMLElement = document.querySelector(".notificacao_carrinho") as HTMLElement;
    let produtosCarrinho = JSON.parse(localStorage.getItem('carrinho'));
    
    let total: number = produtosCarrinho.length;
    notificacaoCarrinho.style.display = 'flex';

    return notificacaoCarrinho.textContent = total.toString();
}

export function calcularTotal(precos: any): string {
    const totalElemento: HTMLElement = document.querySelector(".valor_total") as HTMLElement;
    let sum = 0;
    
    for (let i=0;i<precos.length;i++){
        const precosCovertidos = parseFloat(precos[i]);
        sum+=precosCovertidos;
     }

    return totalElemento.textContent = `R$${sum.toFixed(2)}`;   
}

export function removerItemCarrinho(): void {
    const removerItem = document.querySelectorAll(".btn_excluir_produto");
    removerItem.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            const carrinho: string = localStorage.getItem('carrinho');
            const arrayCarrinhoRecuperado = JSON.parse(carrinho);

            const elementoClicado: HTMLElement = event.currentTarget as HTMLElement;
            const nomeElementoClicado: HTMLElement = elementoClicado.parentElement.querySelector(".produto_nome_carrinho") as HTMLElement;

            for (let i=0;i<=arrayCarrinhoRecuperado.length;i++) {
                if (arrayCarrinhoRecuperado[i].nome == nomeElementoClicado.textContent) {
                    arrayCarrinhoRecuperado.splice([i], 1);
                    localStorage.setItem('carrinho', JSON.stringify(arrayCarrinhoRecuperado));
                    location.reload();
                }
            }
            
            if (arrayCarrinhoRecuperado.length == 0) {
                localStorage.removeItem('carrinho');
            }
        });
    })
}