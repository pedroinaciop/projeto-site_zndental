import { Cadastro } from "./util/Cadastro.js";
import { Sexo } from "./util/Sexo.js";

export class Usuario {
   private elementoFormulario: HTMLFormElement;

   constructor() {
      this.elementoFormulario = document.querySelector(".formulario") as HTMLFormElement;
      this.elementoFormulario.addEventListener("submit", this.cadastrarUsuario.bind(this));
   };

   private cadastrarUsuario(event: Event) {
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

      const email: string = inputEmail.value;
      const senha: string = inputSenha.value;
      const nome: string = inputNome.value;
      const sobrenome: string = inputSobrenome.value;
      const CPF: string = inputCPF.value;
      const dataNascimento: Date = new Date(inputDataNascimento.value + " 00:00:00");
      const sexo: Sexo = inputSexo.value as Sexo;
      const celular: string = inputCelular.value;
      const whatsAppSN = inputWhatsAppSN.value;
      const CEP: string = inputCEP.value;
      const UF: string = inputUF.value;
      const logradouro: string = inputLogradouro.value;
      const complemento: string = inputComplemento.value;
      const bairro: string = inputBairro.value;
      const estado: string = inputEstado.value;
   

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

      Swal.fire({
         position: "center",
         icon: "success",
         title: `Usuário cadastrado com sucesso!`,
         showConfirmButton: false,
         timer: 2000
      });

       this.elementoFormulario.reset();
   };

   public async buscaCep(cep: string) { 
      try {
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
      } catch (error) {
         console.error('Erro ao buscar CEP, verifique o código-fonte:', error);
      }
   };
}

const formulario = new Usuario();
const CEPUsuario = new Usuario();

const cep = document.querySelector('#cep') as HTMLInputElement;
cep.addEventListener("focusout", () => CEPUsuario.buscaCep(cep.value));