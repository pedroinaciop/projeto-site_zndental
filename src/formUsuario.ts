import { Cadastro } from "./util/Cadastro.js";
import { Sexo } from "./util/Sexo.js";

export function cadastrarUsuario() {
   const elementoFormulario = document.querySelector(".formulario") as HTMLFormElement;
   elementoFormulario.addEventListener("submit", function(event)  {
      event.preventDefault();

      const inputEmail = document.querySelector("#email") as HTMLInputElement;
      const inputSenha = document.querySelector("#senha") as HTMLInputElement;
      const inputNome = document.querySelector("#nome") as HTMLInputElement;
      const inputSobrenome = document.querySelector("#sobrenome") as HTMLInputElement;
      const inputCPF = document.querySelector("#cpf") as HTMLInputElement;
      const inputDataNascimento = document.querySelector("#nascimento") as HTMLInputElement;
      const inputSexo = document.querySelector("#sexo") as HTMLSelectElement; 
      const inputCelular = document.querySelector("#celular") as HTMLInputElement;
      const inputWhatsAppSN = document.querySelector("#whatsapp") as HTMLInputElement;
      const inputCEP = document.querySelector("#cep") as HTMLInputElement;
      const inputUF = document.querySelector("#uf") as HTMLInputElement;
      const inputLogradouro = document.querySelector("#logradouro") as HTMLInputElement;
      const inputComplemento = document.querySelector("#complemento") as HTMLInputElement;
      const inputBairro = document.querySelector("#bairro") as HTMLInputElement;
      const inputEstado = document.querySelector("#localidade") as HTMLInputElement;

      let email: string = inputEmail.value;
      let senha: string = inputSenha.value;
      let nome: string = inputNome.value;
      let sobrenome: string = inputSobrenome.value;
      let CPF: string = inputCPF.value;
      let dataNascimento: Date = new Date(inputDataNascimento.value + " 00:00:00");
      let sexo: Sexo = inputSexo.value as Sexo;
      let celular: string = inputCelular.value;
      let whatsAppSN = inputWhatsAppSN.value;
      let CEP: string = inputCEP.value;
      let UF: string = inputUF.value;
      let logradouro: string = inputLogradouro.value;
      let complemento: string = inputComplemento.value;
      let bairro: string = inputBairro.value;
      let estado: string = inputEstado.value;
      

      const novoCadastro: Cadastro = {
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
      }

      console.log(novoCadastro);
      
      elementoFormulario.reset();
   });
      
   async function buscaCep(cep: string) { 
      const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const ConsultaCepConvertido = await consultaCep.json();

      const uf = document.querySelector('#uf') as HTMLInputElement;
      const logradouro = document.querySelector('#logradouro') as HTMLInputElement;
      const complemento = document.querySelector('#complemento') as HTMLInputElement;
      const bairro = document.querySelector('#bairro') as HTMLInputElement;
      const localidade = document.querySelector('#localidade') as HTMLInputElement;

      uf.value = ConsultaCepConvertido.uf;
      logradouro.value = ConsultaCepConvertido.logradouro;
      complemento.value = ConsultaCepConvertido.complemento;
      bairro.value = ConsultaCepConvertido.bairro;
      localidade.value = ConsultaCepConvertido.localidade;
   }

   let cep = document.querySelector('#cep') as HTMLInputElement;
   cep.addEventListener("focusout", () => buscaCep(cep.value));
}