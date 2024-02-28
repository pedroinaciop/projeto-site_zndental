export class Usuario {
    elementoFormulario;
    constructor() {
        this.elementoFormulario = document.querySelector(".formulario");
        this.elementoFormulario.addEventListener("submit", this.cadastrarUsuario.bind(this));
    }
    ;
    cadastrarUsuario(event) {
        event.preventDefault();
        const inputEmail = document.querySelector("#email");
        const inputSenha = document.querySelector("#senha");
        const inputNome = document.querySelector("#nome");
        const inputSobrenome = document.querySelector("#sobrenome");
        const inputCPF = document.querySelector("#cpf");
        const inputDataNascimento = document.querySelector("#nascimento");
        const inputSexo = document.querySelector("#sexo");
        const inputCelular = document.querySelector("#celular");
        const inputWhatsAppSN = document.querySelector("#whatsapp");
        const inputCEP = document.querySelector("#cep");
        const inputUF = document.querySelector("#uf");
        const inputLogradouro = document.querySelector("#logradouro");
        const inputComplemento = document.querySelector("#complemento");
        const inputBairro = document.querySelector("#bairro");
        const inputEstado = document.querySelector("#localidade");
        const email = inputEmail.value;
        const senha = inputSenha.value;
        const nome = inputNome.value;
        const sobrenome = inputSobrenome.value;
        const CPF = inputCPF.value;
        const dataNascimento = new Date(inputDataNascimento.value + " 00:00:00");
        const sexo = inputSexo.value;
        const celular = inputCelular.value;
        const whatsAppSN = inputWhatsAppSN.value;
        const CEP = inputCEP.value;
        const UF = inputUF.value;
        const logradouro = inputLogradouro.value;
        const complemento = inputComplemento.value;
        const bairro = inputBairro.value;
        const estado = inputEstado.value;
        const novoCadastro = {
            nome: nome,
            sobrenome: sobrenome,
            CPF: CPF,
            dataNascimento: dataNascimento,
            sexo: sexo,
            celular: celular,
            whatsAppSN: whatsAppSN,
            CEP: CEP,
            UF: UF,
            logradouro: logradouro,
            complemento: complemento,
            bairro: bairro,
            estado: estado,
            email: email,
            senha: senha
        };
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Usuário cadastrado com sucesso!`,
            showConfirmButton: false,
            timer: 2000
        });
        this.elementoFormulario.reset();
    }
    ;
    async buscaCep(cep) {
        try {
            const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const ConsultaCepConvertido = await consultaCep.json();
            const uf = document.querySelector('#uf');
            const logradouro = document.querySelector('#logradouro');
            const complemento = document.querySelector('#complemento');
            const bairro = document.querySelector('#bairro');
            const localidade = document.querySelector('#localidade');
            uf.value = ConsultaCepConvertido.uf;
            logradouro.value = ConsultaCepConvertido.logradouro;
            complemento.value = ConsultaCepConvertido.complemento;
            bairro.value = ConsultaCepConvertido.bairro;
            localidade.value = ConsultaCepConvertido.localidade;
        }
        catch (error) {
            console.error('Erro ao buscar CEP, verifique o código-fonte:', error);
        }
    }
    ;
}
const formulario = new Usuario();
const CEPUsuario = new Usuario();
const cep = document.querySelector('#cep');
cep.addEventListener("focusout", () => CEPUsuario.buscaCep(cep.value));
