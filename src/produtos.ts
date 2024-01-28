buscarProdutosAPI();

async function buscarProdutosAPI() {
    const dados = await fetch('https://pedroinaciop.github.io/zndental/dados.json');
    const produtos = await dados.json();
    exibirProdutosNaTela(produtos);
};

const elementoParaInserirProdutos = document.querySelector('#container__nicho') as HTMLElement;

function exibirProdutosNaTela(itens: any): void {
    itens.forEach((produto: { imagem: any; alt: any; nome_produto: string; marca: string; 
                              descricao: string; preco_anterior: number; preco: number; }) => {
    elementoParaInserirProdutos.innerHTML += ` 
        <div action="" class="container__nicho">
            <div class="nicho__imagem">
                <img class="nicho__imagem__img" src="${produto.imagem}" alt="${produto.alt}">
            </div>
            <div class="nicho__informacoes">
                <p class="nome_produto">${produto.nome_produto} ${produto.marca}</p>
                <p class="descricao">${produto.descricao}.</p>
                <p class="preco_anterior">R$${produto.preco_anterior.toFixed(2)}</p>
                <p class="preco_atual">R$${produto.preco.toFixed(2)}</p>
            </div>
                <button type="submit" class="comprar">ADICIONAR</button>
        </div>`
        
    });

    let produtosCarrinho:number = 0
    const elementoProduto = document.querySelectorAll(".container__nicho");
    elementoProduto.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
            const elementoClicado = event.currentTarget as HTMLElement;
            
            const nomeProduto = elementoClicado.querySelector(".nome_produto") as HTMLElement;
            const precoProduto = elementoClicado.querySelector(".preco_atual") as HTMLElement;
            const notificacaoCarrinho = document.querySelector(".notificacao_carrinho") as HTMLElement;

            notificacaoCarrinho.style.display = 'flex';
            produtosCarrinho += 1;
            notificacaoCarrinho.textContent = produtosCarrinho.toString();
            console.log(nomeProduto, precoProduto, notificacaoCarrinho, produtosCarrinho);        
        });
    });    
};

