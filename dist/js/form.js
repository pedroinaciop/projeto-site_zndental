const elementoFormulario = document.querySelector(".formulario");
elementoFormulario.addEventListener("submit", function (event) {
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
    let email = inputEmail.value;
    let senha = inputSenha.value;
    let nome = inputNome.value;
    let sobrenome = inputSobrenome.value;
    let CPF = inputCPF.value;
    let dataNascimento = new Date(inputDataNascimento.value);
    let sexo = inputSexo.value;
    let celular = inputCelular.value;
    let whatsAppSN = inputWhatsAppSN.value;
    let CEP = inputCEP.value;
    let UF = inputUF.value;
    let logradouro = inputLogradouro.value;
    let complemento = inputComplemento.value;
    let bairro = inputBairro.value;
    let estado = inputEstado.value;
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
    console.log(novoCadastro);
    elementoFormulario.reset();
});
async function buscaCep(cep) {
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
let cep = document.querySelector('#cep');
cep.addEventListener("focusout", () => buscaCep(cep.value));
export {};
