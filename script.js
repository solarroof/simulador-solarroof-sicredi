const dados = {
  vm: {
    nome:"Visa / Mastercard",
    max:21,
    debito:{taxaVenda:1.00, taxaAnt:0, liquido10k:9900.00},
    avista:{taxaVenda:1.95, taxaAnt:1.53, liquido10k:9654.30},
    parcelas:{
      2:{taxaVenda:2.05,taxaAnt:2.38,liquido10k:9561.39},
      3:{taxaVenda:2.05,taxaAnt:3.16,liquido10k:9485.25},
      4:{taxaVenda:2.05,taxaAnt:3.94,liquido10k:9408.24},
      5:{taxaVenda:2.05,taxaAnt:4.73,liquido10k:9330.91},
      6:{taxaVenda:2.05,taxaAnt:5.53,liquido10k:9252.50},
      7:{taxaVenda:2.10,taxaAnt:6.32,liquido10k:9170.32},
      8:{taxaVenda:2.10,taxaAnt:7.12,liquido10k:9092.78},
      9:{taxaVenda:2.10,taxaAnt:7.92,liquido10k:9014.00},
      10:{taxaVenda:2.10,taxaAnt:8.71,liquido10k:8936.46},
      11:{taxaVenda:2.10,taxaAnt:9.51,liquido10k:8858.86},
      12:{taxaVenda:2.10,taxaAnt:10.30,liquido10k:8781.22},
      13:{taxaVenda:2.10,taxaAnt:11.10,liquido10k:8703.18},
      14:{taxaVenda:2.10,taxaAnt:11.89,liquido10k:8625.52},
      15:{taxaVenda:2.10,taxaAnt:12.68,liquido10k:8547.83},
      16:{taxaVenda:2.10,taxaAnt:13.48,liquido10k:8469.49},
      17:{taxaVenda:2.10,taxaAnt:14.28,liquido10k:8391.81},
      18:{taxaVenda:2.10,taxaAnt:15.07,liquido10k:8314.12},
      19:{taxaVenda:2.10,taxaAnt:15.86,liquido10k:8236.38},
      20:{taxaVenda:2.10,taxaAnt:16.66,liquido10k:8158.41},
      21:{taxaVenda:2.10,taxaAnt:17.45,liquido10k:8080.69}
    }
  },
  elo: {nome:"Elo", max:21, debito:{taxaVenda:2.50,taxaAnt:0,liquido10k:9750.00}, avista:{taxaVenda:3.55,taxaAnt:1.53,liquido10k:9496.76}, parcelas:{}},
  amex:{nome:"AMEX", max:12, debito:null, avista:{taxaVenda:3.55,taxaAnt:1.53,liquido10k:9496.76}, parcelas:{}},
  cabal:{nome:"Cabal", max:12, debito:{taxaVenda:2.50,taxaAnt:0,liquido10k:9750.00}, avista:{taxaVenda:3.55,taxaAnt:1.53,liquido10k:9496.76}, parcelas:{}}
};
const demais = {
  2:{taxaVenda:4.15,taxaAnt:2.38,liquido10k:9356.40},
  3:{taxaVenda:4.15,taxaAnt:3.16,liquido10k:9281.89},
  4:{taxaVenda:4.15,taxaAnt:3.94,liquido10k:9206.54},
  5:{taxaVenda:4.15,taxaAnt:4.73,liquido10k:9130.85},
  6:{taxaVenda:4.15,taxaAnt:5.53,liquido10k:9054.15},
  7:{taxaVenda:4.59,taxaAnt:6.32,liquido10k:8937.08},
  8:{taxaVenda:4.59,taxaAnt:7.12,liquido10k:8861.49},
  9:{taxaVenda:4.59,taxaAnt:7.92,liquido10k:8784.75},
  10:{taxaVenda:4.59,taxaAnt:8.71,liquido10k:8709.16},
  11:{taxaVenda:4.59,taxaAnt:9.51,liquido10k:8633.55},
  12:{taxaVenda:4.59,taxaAnt:10.30,liquido10k:8557.88},
  13:{taxaVenda:4.59,taxaAnt:11.10,liquido10k:8481.41},
  14:{taxaVenda:4.59,taxaAnt:11.89,liquido10k:8406.10},
  15:{taxaVenda:4.59,taxaAnt:12.68,liquido10k:8330.77},
  16:{taxaVenda:4.59,taxaAnt:13.48,liquido10k:8254.71},
  17:{taxaVenda:4.59,taxaAnt:14.27,liquido10k:8179.38},
  18:{taxaVenda:4.59,taxaAnt:15.07,liquido10k:8102.640190},
  19:{taxaVenda:4.59,taxaAnt:15.86,liquido10k:8027.24},
  20:{taxaVenda:4.59,taxaAnt:16.66,liquido10k:7951.20},
  21:{taxaVenda:4.59,taxaAnt:17.45,liquido10k:7875.18}
};
["elo","amex","cabal"].forEach(b=>dados[b].parcelas = demais);

function centavosCima(v){return Math.ceil((v + 0.0000001) * 100) / 100}
function centavosBaixo(v){return Math.floor((v + 0.0000001) * 100) / 100}
function moeda(v){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(v||0)}
function numBR(v){return (v||0).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})}
function parseMoeda(str){return Number(String(str||"").replace(/\D/g,""))/100}
function fmtInput(el){
  const v=parseMoeda(el.value);
  el.value=numBR(v);
}
document.querySelectorAll('input[inputmode="numeric"]').forEach(el=>{
  el.addEventListener("input",()=>fmtInput(el));
  el.addEventListener("focus",()=>{ if(el.value==="0,00") el.value=""; });
  el.addEventListener("blur",()=>{ if(!el.value) el.value="0,00"; else fmtInput(el); });
});

function preencherParcelas(sel, meio, bandeira){
  sel.innerHTML="";
  const b=dados[bandeira];
  if(meio==="debito"){
    sel.innerHTML='<option value="0">-</option>';
    sel.disabled=true;
    return;
  }
  if(meio==="avista"){
    sel.innerHTML='<option value="1">Crédito à vista</option>';
    sel.disabled=true;
    return;
  }
  sel.disabled=false;
  for(let i=2;i<=b.max;i++){
    sel.innerHTML += `<option value="${i}">${i}x</option>`;
  }
}
function obterRegistro(bandeira, meio, parcela){
  const b=dados[bandeira];
  if(meio==="debito") return b.debito;
  if(meio==="avista") return b.avista;
  return b.parcelas[parcela];
}
function simularPorValorCobrado(valor, bandeira, meio, parcela, preservarValorCliente=false){
  const reg=obterRegistro(bandeira,meio,parcela);
  const fator=reg.liquido10k/10000;

  // No valor cobrado, o cliente paga exatamente o que foi digitado.
  // No valor desejado, a cobrança pode ser ajustada para garantir o líquido.
  const valorClienteFinal = preservarValorCliente ? Math.round(valor * 100) / 100 : centavosCima(valor);

  const liquido=centavosBaixo(valorClienteFinal*fator);
  const descVenda=centavosCima(valorClienteFinal*(reg.taxaVenda/100));
  const totalRetido=centavosCima(valorClienteFinal-liquido);
  const descAnt=centavosCima(Math.max(0,totalRetido-descVenda));
  const taxaEfetiva=centavosCima((totalRetido/valorClienteFinal)*100);
  const parcelaValor=meio==="parcelado" ? centavosCima(valorClienteFinal/parcela) : valorClienteFinal;

  return {valorCliente:valorClienteFinal, liquido, descVenda, descAnt, totalRetido, taxaEfetiva, taxaVenda:reg.taxaVenda, taxaAnt:reg.taxaAnt, parcelaValor, parcela};
}
function simularPorLiquidoDesejado(liquidoDesejado,bandeira,meio,parcela){
  const reg=obterRegistro(bandeira,meio,parcela);
  const fator=reg.liquido10k/10000;

  // cálculo base
  let valorCliente=centavosCima(liquidoDesejado/fator);

  let tentativa=simularPorValorCobrado(valorCliente,bandeira,meio,parcela);

  // sobe apenas se realmente necessário
  while(tentativa.liquido < liquidoDesejado){
    valorCliente = centavosCima(valorCliente + 0.01);
    tentativa = simularPorValorCobrado(valorCliente,bandeira,meio,parcela);
  }

  // evita exibir centavos artificiais tipo 100,01 / 24850,01
  const centavos = Math.round((valorCliente % 1) * 100);

  if(centavos === 1){
    const tentativaInteira = simularPorValorCobrado(
      centavosBaixo(valorCliente),
      bandeira,
      meio,
      parcela
    );

    // se inteiro ainda protege o líquido, usa inteiro
    if(tentativaInteira.liquido >= liquidoDesejado){
      tentativa = tentativaInteira;
    }
  }

  return tentativa;
}
function modalidadeTexto(meio, parcela){
  if(meio==="debito") return "Débito";
  if(meio==="avista") return "Crédito à vista";
  return `Crédito parcelado em ${parcela}x`;
}
function renderResultado(el, s, bandeira, meio){
  el.innerHTML = `
    <div class="linha"><span>Data da simulação</span><strong>${new Date().toLocaleDateString("pt-BR")}</strong></div>
    <div class="linha"><span>Bandeira</span><strong>${dados[bandeira].nome}</strong></div>
    <div class="linha"><span>Meio de pagamento</span><strong>${modalidadeTexto(meio,s.parcela)}</strong></div>
    <div class="linha"><span>Cliente paga</span><strong>${moeda(s.valorCliente)}</strong></div>
    <div class="linha"><span>Você recebe</span><span class="valor-verde">${moeda(s.liquido)}</span></div>
    <div class="linha"><span>Valor da parcela</span><strong>${meio==="parcelado" ? `${moeda(s.parcelaValor)} em ${s.parcela}x` : moeda(s.parcelaValor)}</strong></div>
    <div class="linha"><span>Total retido</span><span class="valor-vermelho">${moeda(s.totalRetido)}</span></div>
    <div class="secao">Detalhamento das taxas</div>
    <div class="linha"><span>Taxa de venda</span><strong>${numBR(s.taxaVenda)}%</strong></div>
    <div class="linha"><span>Desconto de venda</span><strong>${moeda(s.descVenda)}</strong></div>
    <div class="linha"><span>Taxa de antecipação</span><strong>${numBR(s.taxaAnt)}%</strong></div>
    <div class="linha"><span>Desconto de antecipação</span><strong>${moeda(s.descAnt)}</strong></div>
    <div class="linha"><span>Taxa total efetiva</span><strong>${numBR(s.taxaEfetiva)}%</strong></div>
  `;
  el.style.display="block";
  document.getElementById("comoUsar").style.display="none";
}
function setupCalc(prefix){
  const meio=document.getElementById("meio"+prefix);
  const band=document.getElementById("bandeira"+prefix);
  const parc=document.getElementById("parcelas"+prefix);
  const form=document.getElementById("form"+prefix);
  const res=document.getElementById("res"+prefix);
  const limpar=document.getElementById("limpar"+prefix);
  const print=document.getElementById("print"+prefix);
  const card=document.getElementById("card"+prefix);
  const input=document.getElementById(prefix==="Cobrado"?"valorCobrado":"valorDesejado");
  function refresh(){preencherParcelas(parc,meio.value,band.value)}
  meio.addEventListener("change",refresh);
  band.addEventListener("change",refresh);
  refresh();
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const v=parseMoeda(input.value);
    if(!v){alert("Informe um valor válido.");return}
    const p=Number(parc.value);
    const s= prefix==="Cobrado" ? simularPorValorCobrado(v,band.value,meio.value,p,true) : simularPorLiquidoDesejado(v,band.value,meio.value,p);
    renderResultado(res,s,band.value,meio.value);
    limpar.style.display="block";
    print.style.display="block";
  });
  limpar.addEventListener("click",()=>{
    input.value="0,00";
    res.style.display="none";
    limpar.style.display="none";
    print.style.display="none";
    document.getElementById("comoUsar").style.display="block";
  });
  print.addEventListener("click",()=>{
    document.querySelectorAll(".card").forEach(c=>c.classList.remove("printing"));
    card.classList.add("printing");
    window.print();
  });
}
setupCalc("Cobrado");
setupCalc("Desejado");

// Painel lateral
const side=document.getElementById("side");
const overlay=document.getElementById("overlay");
document.getElementById("btnAbrirSide").onclick=()=>{side.classList.add("open"); overlay.classList.add("open")}
document.getElementById("btnFecharSide").onclick=()=>{side.classList.remove("open"); overlay.classList.remove("open")}
overlay.onclick=()=>{side.classList.remove("open"); overlay.classList.remove("open")}

const chk=document.getElementById("ativarAbsorcao");
const campos=document.getElementById("camposAbsorcao");
chk.checked=false;
campos.classList.remove("show");
chk.addEventListener("change",()=>campos.classList.toggle("show",chk.checked));

function preencherAbsorcao(){
  const band=document.getElementById("absBandeira").value;
  const selEmp=document.getElementById("absParcelasEmpresa");
  const selCli=document.getElementById("absParcelasCliente");
  selEmp.innerHTML="";
  selCli.innerHTML="";
  for(let i=2;i<=dados[band].max;i++){
    selEmp.innerHTML += `<option value="${i}">${i}x</option>`;
    selCli.innerHTML += `<option value="${i}">${i}x</option>`;
  }
  if(dados[band].max>=10) selEmp.value=10;
  if(dados[band].max>=18) selCli.value=18;
}
document.getElementById("absBandeira").addEventListener("change",preencherAbsorcao);
preencherAbsorcao();

document.getElementById("btnSimularAbsorcao").addEventListener("click",()=>{
  const valor=parseMoeda(document.getElementById("absValorBase").value);
  const band=document.getElementById("absBandeira").value;
  const pEmp=Number(document.getElementById("absParcelasEmpresa").value);
  const pCli=Number(document.getElementById("absParcelasCliente").value);
  if(!valor){alert("Informe o valor base da venda."); return}
  if(pCli<=pEmp){alert("O parcelamento desejado pelo cliente deve ser maior que as parcelas absorvidas pela empresa."); return}

  const base=simularPorValorCobrado(valor,band,"parcelado",pEmp,true);
  const final=simularPorLiquidoDesejado(base.liquido,band,"parcelado",pCli);
  const acrescimo=final.valorCliente-valor;

  const el=document.getElementById("resultadoAbsorcao");
  el.innerHTML=`
    <div class="linha"><span>Valor base da venda</span><strong>${moeda(valor)}</strong></div>
    <div class="linha"><span>Empresa absorve até</span><strong>${pEmp}x</strong></div>
    <div class="linha"><span>Cliente deseja</span><strong>${pCli}x</strong></div>
    <div class="linha"><span>Líquido preservado</span><span class="valor-verde">${moeda(base.liquido)}</span></div>
    <div class="linha"><span>Valor final ao cliente</span><strong>${moeda(final.valorCliente)}</strong></div>
    <div class="linha"><span>Diferença repassada</span><span class="valor-vermelho">${moeda(acrescimo)}</span></div>
    <div class="linha"><span>Parcela final</span><strong>${moeda(final.parcelaValor)} em ${pCli}x</strong></div>
    <div class="linha"><span>Taxa da venda final</span><strong>${numBR(final.taxaVenda)}%</strong></div>
    <div class="linha"><span>Taxa de antecipação final</span><strong>${numBR(final.taxaAnt)}%</strong></div>
  `;
  el.style.display="block";
  document.getElementById("btnImprimirAbsorcao").style.display="block";
});




// Resumos compactos para "VER TODAS AS PARCELAS"
// Mantém a impressão mais enxuta, em tabela, para não gerar páginas demais.
function linhaTabelaOpcoes(s, meio){
  return `
    <tr>
      <td>${modalidadeTexto(meio,s.parcela)}</td>
      <td><strong>${moeda(s.valorCliente)}</strong></td>
      <td><span class="valor-verde">${moeda(s.liquido)}</span></td>
      <td><strong>${meio==="parcelado" ? `${moeda(s.parcelaValor)} em ${s.parcela}x` : moeda(s.parcelaValor)}</strong></td>
      <td><span class="valor-vermelho">${moeda(s.totalRetido)}</span></td>
      <td><strong>${numBR(s.taxaEfetiva)}%</strong></td>
    </tr>
  `;
}

function renderTabelaOpcoes(titulo, subtitulo, linhas){
  return `
    <div class="titulo-todas-parcelas">${titulo}</div>
    <div class="linha"><span>Data da simulação</span><strong>${new Date().toLocaleDateString("pt-BR")}</strong></div>
    ${subtitulo}

    <table class="tabela-todas-parcelas tabela-resumo-parcelas">
      <thead>
        <tr>
          <th>Parcelamento</th>
          <th>Cliente paga</th>
          <th>Você recebe</th>
          <th>Valor da parcela</th>
          <th>Total retido</th>
          <th>Taxa efetiva</th>
        </tr>
      </thead>
      <tbody>
        ${linhas}
      </tbody>
    </table>
  `;
}

function montarOpcoesResumoValorDesejado(valor, band){
  let linhas = "";

  if(dados[band].debito){
    const debito = simularPorLiquidoDesejado(valor, band, "debito", 0);
    linhas += linhaTabelaOpcoes(debito, "debito");
  }

  const avista = simularPorLiquidoDesejado(valor, band, "avista", 1);
  linhas += linhaTabelaOpcoes(avista, "avista");

  for(let i = 2; i <= dados[band].max; i++){
    const s = simularPorLiquidoDesejado(valor, band, "parcelado", i);
    linhas += linhaTabelaOpcoes(s, "parcelado");
  }

  const subtitulo = `
    <div class="linha"><span>Bandeira</span><strong>${dados[band].nome}</strong></div>
    <div class="linha"><span>Valor a receber</span><span class="valor-verde">${moeda(valor)}</span></div>
  `;

  return renderTabelaOpcoes("Todas as opções de parcelamento", subtitulo, linhas);
}

function montarOpcoesResumoValorCobrado(valor, band){
  let linhas = "";

  if(dados[band].debito){
    const debito = simularPorValorCobrado(valor, band, "debito", 0, true);
    linhas += linhaTabelaOpcoes(debito, "debito");
  }

  const avista = simularPorValorCobrado(valor, band, "avista", 1, true);
  linhas += linhaTabelaOpcoes(avista, "avista");

  for(let i = 2; i <= dados[band].max; i++){
    const s = simularPorValorCobrado(valor, band, "parcelado", i, true);
    linhas += linhaTabelaOpcoes(s, "parcelado");
  }

  const subtitulo = `
    <div class="linha"><span>Bandeira</span><strong>${dados[band].nome}</strong></div>
    <div class="linha"><span>Valor informado pelo cliente</span><strong>${moeda(valor)}</strong></div>
  `;

  return renderTabelaOpcoes("Todas as opções para o valor cobrado", subtitulo, linhas);
}

// Todas as parcelas na página inicial - Valor Cobrado
const btnTodasCobrado = document.getElementById("todasParcelasCobrado");
if(btnTodasCobrado){
  btnTodasCobrado.addEventListener("click",()=>{
    const valor = parseMoeda(document.getElementById("valorCobrado").value);
    const band = document.getElementById("bandeiraCobrado").value;
    const el = document.getElementById("resCobrado");

    if(!valor){
      alert("Informe o valor que o cliente irá pagar.");
      return;
    }

    el.innerHTML = montarOpcoesResumoValorCobrado(valor, band);

    el.style.display = "block";
    document.getElementById("comoUsar").style.display = "none";
    document.getElementById("limparCobrado").style.display = "block";
    document.getElementById("printCobrado").style.display = "block";
  });
}

// Todas as parcelas na página inicial - Valor Desejado
const btnTodasDesejado = document.getElementById("todasParcelasDesejado");
if(btnTodasDesejado){
  btnTodasDesejado.addEventListener("click",()=>{
    const valor = parseMoeda(document.getElementById("valorDesejado").value);
    const band = document.getElementById("bandeiraDesejado").value;
    const el = document.getElementById("resDesejado");

    if(!valor){
      alert("Informe o valor que deseja receber.");
      return;
    }

    el.innerHTML = montarOpcoesResumoValorDesejado(valor, band);

    el.style.display = "block";
    document.getElementById("comoUsar").style.display = "none";
    document.getElementById("limparDesejado").style.display = "block";
    document.getElementById("printDesejado").style.display = "block";
  });
}

// Todas as opções dentro da absorção parcial de juros, em tabela compacta
function montarOpcoesResumoAbsorcao(valor, band, pEmp){
  const base = simularPorValorCobrado(valor, band, "parcelado", pEmp, true);
  let linhas = "";

  linhas += `
    <tr>
      <td>${pEmp}x</td>
      <td><strong>${moeda(valor)}</strong></td>
      <td>Sem repasse</td>
      <td><strong>${moeda(base.parcelaValor)} em ${pEmp}x</strong></td>
      <td><span class="valor-verde">${moeda(base.liquido)}</span></td>
      <td><strong>${numBR(base.taxaEfetiva)}%</strong></td>
    </tr>
  `;

  for(let i = pEmp + 1; i <= dados[band].max; i++){
    const final = simularPorLiquidoDesejado(base.liquido, band, "parcelado", i);
    const acrescimo = centavosCima(final.valorCliente - valor);

    linhas += `
      <tr>
        <td>${i}x</td>
        <td><strong>${moeda(final.valorCliente)}</strong></td>
        <td><span class="valor-vermelho">${moeda(acrescimo)}</span></td>
        <td><strong>${moeda(final.parcelaValor)} em ${i}x</strong></td>
        <td><span class="valor-verde">${moeda(base.liquido)}</span></td>
        <td><strong>${numBR(final.taxaEfetiva)}%</strong></td>
      </tr>
    `;
  }

  return `
    <div class="titulo-todas-parcelas">Todas as opções com absorção parcial</div>
    <div class="linha"><span>Data da simulação</span><strong>${new Date().toLocaleDateString("pt-BR")}</strong></div>
    <div class="linha"><span>Bandeira</span><strong>${dados[band].nome}</strong></div>
    <div class="linha"><span>Valor base da venda</span><strong>${moeda(valor)}</strong></div>
    <div class="linha"><span>Empresa absorve até</span><strong>${pEmp}x</strong></div>
    <div class="linha"><span>Líquido preservado</span><span class="valor-verde">${moeda(base.liquido)}</span></div>

    <table class="tabela-todas-parcelas tabela-resumo-parcelas">
      <thead>
        <tr>
          <th>Cliente deseja</th>
          <th>Valor ao cliente</th>
          <th>Diferença repassada</th>
          <th>Parcela final</th>
          <th>Líquido preservado</th>
          <th>Taxa efetiva</th>
        </tr>
      </thead>
      <tbody>
        ${linhas}
      </tbody>
    </table>
  `;
}

const btnTodasAbsorcao = document.getElementById("btnTodasAbsorcao");
if(btnTodasAbsorcao){
  btnTodasAbsorcao.addEventListener("click",()=>{
    const valor = parseMoeda(document.getElementById("absValorBase").value);
    const band = document.getElementById("absBandeira").value;
    const pEmp = Number(document.getElementById("absParcelasEmpresa").value);
    const el = document.getElementById("resultadoAbsorcao");

    if(!valor){
      alert("Informe o valor base da venda.");
      return;
    }

    el.innerHTML = montarOpcoesResumoAbsorcao(valor, band, pEmp);

    el.style.display = "block";
    document.getElementById("btnImprimirAbsorcao").style.display = "block";
  });
}

const btnImprimirAbsorcao = document.getElementById("btnImprimirAbsorcao");
if(btnImprimirAbsorcao){
  btnImprimirAbsorcao.addEventListener("click",()=>{
    document.body.classList.add("imprimir-absorcao");
    window.print();
    setTimeout(()=>{
      document.body.classList.remove("imprimir-absorcao");
    },500);
  });
}
