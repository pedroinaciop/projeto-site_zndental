async function buscaCep(cep) { 
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    var ConsultaCepConvertido = await consultaCep.json()
    console.log(ConsultaCepConvertido)

    var uf = document.getElementById('uf')
    var logradouro = document.getElementById('logradouro')
    var complemento = document.getElementById('complemento')
    var bairro = document.getElementById('bairro')
    var localidade = document.getElementById('localidade')

    uf.value = ConsultaCepConvertido.uf
    logradouro.value = ConsultaCepConvertido.logradouro
    complemento.value = ConsultaCepConvertido.complemento
    bairro.value = ConsultaCepConvertido.bairro
    localidade.value = ConsultaCepConvertido.localidade
}

var cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaCep(cep.value))

function mascara(i,t){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){
       i.value = v.substring(0, v.length-1);
       return;
    }
 
    if(t == "cpf"){
       i.setAttribute("maxlength", "14");
       if (v.length == 3 || v.length == 7) i.value += ".";
       if (v.length == 11) i.value += "-";
    }
 
    if(t == "cep"){
       i.setAttribute("maxlength", "9");
       if (v.length == 5) i.value += "-";
    }
 
    if(t == "tel"){
        if (v.length == 1) i.value = "(" + i.value;
        if (v.length == 3) i.value += ") ";
        if(v[5] == 9){
           i.setAttribute("maxlength", "15");
           if (v.length == 10) i.value += "-";
        }else{
           i.setAttribute("maxlength", "14");
           if (v.length == 9) i.value += "-";
        }
    }
}
 