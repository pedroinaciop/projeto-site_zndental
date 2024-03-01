import { Carrinho } from "./util/Carrinho.js"

export class CarrinhoDeCompras {
    private carrinhoString: Carrinho[] = [];

    constructor() {
        const btnComprar = document.querySelectorAll(".comprar");

        btnComprar.forEach((elemento) => {
            elemento.addEventListener("click", (event) => {
                const elementoClicado = event.currentTarget as HTMLElement;
                const elementoPai = elementoClicado.parentElement as HTMLElement;

                elementoPai.addEventListener("click", this.adicionarItemAoCarrinho.bind(this));
            });
        });

    }

    public adicionarItemAoCarrinho(event: Event): void {
        const elementoClicado = event.currentTarget as HTMLElement;
        
        const nomeInput = elementoClicado.querySelector(".nome_produto") as HTMLElement;
        const imagemInput = elementoClicado.querySelector(".nicho__imagem__img") as HTMLImageElement;
        const precoInput = elementoClicado.querySelector(".preco_atual") as HTMLElement;
        const codigoInput = elementoClicado.querySelector(".codigo_produto") as HTMLElement;

        const nome: string = nomeInput.innerText;
        const imagem: string = imagemInput.src;
        const preco: string = precoInput.innerText;
        const codigo: string = codigoInput.innerText;

        const itemCarrinho: Carrinho = {
            nome: nome,
            imagem: imagem,
            preco: preco,
            codigo: codigo,
        }

        this.carrinhoString.push(itemCarrinho);
        localStorage.setItem('carrinho', JSON.stringify(this.carrinhoString));
        this.notificacaoCarrinho();
    };

    private notificacaoCarrinho(): string {
        const notificacaoCarrinho: HTMLElement = document.querySelector(".notificacao_carrinho") as HTMLElement;
        const produtosCarrinho = JSON.parse(localStorage.getItem('carrinho'));
    
        const total: number = produtosCarrinho.length;
        notificacaoCarrinho.style.display = 'flex';
    
        return notificacaoCarrinho.textContent = total.toString();
    };
    
    static calcularTotal(precos: any): string {
        const totalElemento: HTMLElement = document.querySelector(".valor_total") as HTMLElement;
        let sum = 0;
    
        for (let i=0;i<precos.length;i++) {
            const precosCovertidos = parseFloat(precos[i]);
            sum += precosCovertidos;
        }
    
        return totalElemento.textContent = `R$${sum.toFixed(2)}`;
    };
    
    static removerItemCarrinho(): void {
        const removerItem = document.querySelectorAll(".btn_excluir_produto");
    
        removerItem.forEach((elemento) => {
            elemento.addEventListener("click", (event) => {
                //Captura objetos que foram enviados para o localStorage - 'carrinho'
                const carrinho: string = localStorage.getItem('carrinho');
                const arrayCarrinhoRecuperado = JSON.parse(carrinho);
    
                //Identifica elemento clicado no carrinho
                const elementoClicado: HTMLElement = event.currentTarget as HTMLElement;
                
                //Identifica o nome do produto clicado no carrinho
                const nomeElementoClicado: HTMLElement = elementoClicado.parentElement.querySelector(".produto_nome_carrinho") as HTMLElement;
                
    
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
        })
    };  

    static visualizarItensCarrinho(): void  {
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
    
                precos.push(carrinhoSalvo[i].preco);
                CarrinhoDeCompras.calcularTotal(precos);
                CarrinhoDeCompras.removerItemCarrinho();
            }
        }
    };
}

CarrinhoDeCompras.visualizarItensCarrinho();