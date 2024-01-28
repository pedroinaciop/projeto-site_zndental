import { Sexo } from "./Sexo.js"

export type Cadastro = {
    nome: string,
    sobrenome: string,
    CPF: string,
    dataNascimento: Date,
    sexo: Sexo,
    celular: string,
    whatsAppSN: string,
    CEP: string,
    UF: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    estado: string,
    email: string,
    senha: string
}