// Cadastros fictícios usados apenas na demonstração do app.
const vinculos = [
  { tipo: "PF", placa: "ABC1D23", cpf: "11111111111", nome: "Marcos" },
  { tipo: "PJ", placa: "ABC1D23", cpf: "22222222222", nome: "Daniel" }
];

// Ordens de serviço fictícias que já aparecem no histórico do veículo.
const ordensOriginais = [
  {
    numero: "OS-104",
    titulo: "Ruído ao frear",
    data: "2026-11-08",
    tipo: "Corretivo",
    status: "Em atendimento",
    chamado: "CH-026",
    orientacao: "Aguarde o retorno da locadora.",
    observacao: "O motorista relatou um ruído ao frear. A inspeção dos freios está em análise.",
    etapas: [
      ["Recebimento do chamado", "Concluída"],
      ["Inspeção dos freios", "Em análise"],
      ["Troca de componentes", "Não avaliada"]
    ]
  },
  {
    numero: "OS-097",
    titulo: "Falha na partida",
    data: "2026-10-27",
    tipo: "Corretivo",
    status: "Finalizado",
    chamado: "CH-019",
    orientacao: "Atendimento concluído pela locadora.",
    observacao: "O carro foi testado após o atendimento e a partida funcionou normalmente.",
    etapas: [
      ["Recebimento do chamado", "Concluída"],
      ["Verificação da partida", "Concluída"],
      ["Teste do veículo", "Concluída"]
    ]
  },
  {
    numero: "OS-082",
    titulo: "Revisão preventiva",
    data: "2026-10-18",
    tipo: "Preventivo",
    status: "Finalizado",
    chamado: "",
    orientacao: "Revisão concluída pela locadora.",
    observacao: "A oficina registrou a troca de óleo e a conferência dos itens de revisão.",
    etapas: [
      ["Recebimento do veículo", "Concluída"],
      ["Troca de óleo", "Concluída"],
      ["Conferência dos itens de revisão", "Concluída"]
    ]
  }
];

const formulario = document.getElementById("formulario-acesso");
const telaAcesso = document.getElementById("tela-acesso");
const telaInicio = document.getElementById("tela-inicio");
const telaManutencao = document.getElementById("tela-manutencao");
const telaSolicitacao = document.getElementById("tela-solicitacao");
const telaChamados = document.getElementById("tela-chamados");
const telaNovoChamado = document.getElementById("tela-novo-chamado");
const telaHistorico = document.getElementById("tela-historico");
const telaOrdemServico = document.getElementById("tela-ordem-servico");
const mensagem = document.getElementById("mensagem-acesso");
const campoCpf = document.getElementById("cpf");
const menu = document.getElementById("menu-principal");
const menuInicio = document.getElementById("menu-inicio");
const menuManutencao = document.getElementById("menu-manutencao");
const menuChamados = document.getElementById("menu-chamados");
const menuHistorico = document.getElementById("menu-historico");
const formularioSolicitacao = document.getElementById("formulario-solicitacao");
const mensagemSolicitacao = document.getElementById("mensagem-solicitacao");
const novasSolicitacoes = document.getElementById("novas-solicitacoes");
const formularioChamado = document.getElementById("formulario-chamado");
const campoDescricao = document.getElementById("descricao-chamado");
const campoAnexos = document.getElementById("anexos-chamado");
const filtrosChamados = document.getElementById("filtros-chamados");
const listaChamados = document.getElementById("lista-chamados");
const chamadosRegistrados = document.getElementById("chamados-registrados");
const mensagemChamado = document.getElementById("mensagem-chamado");
const filtrosHistorico = document.getElementById("filtros-historico");
const listaHistorico = document.getElementById("lista-historico");
const inicioPeriodo = document.getElementById("inicio-periodo");
const fimPeriodo = document.getElementById("fim-periodo");
const fotosOS = document.getElementById("fotos-os");
const verChamadoOS = document.getElementById("ver-chamado-os");
let ordensServico = ordensOriginais.slice();
let botaoOrigemOS;
let chamadoDaOrdem;
let numeroSolicitacao = 31;
let numeroChamado = 27;
let numeroOS = 105;

// Mostra uma tela por vez e marca a opção selecionada no menu.
function mostrarTela(tela) {
  telaAcesso.hidden = tela !== telaAcesso;
  telaInicio.hidden = tela !== telaInicio;
  telaManutencao.hidden = tela !== telaManutencao;
  telaSolicitacao.hidden = tela !== telaSolicitacao;
  telaChamados.hidden = tela !== telaChamados;
  telaNovoChamado.hidden = tela !== telaNovoChamado;
  telaHistorico.hidden = tela !== telaHistorico;
  telaOrdemServico.hidden = tela !== telaOrdemServico;
  menu.hidden = tela !== telaInicio && tela !== telaManutencao && tela !== telaChamados && tela !== telaHistorico;

  menuInicio.removeAttribute("aria-current");
  menuManutencao.removeAttribute("aria-current");
  menuChamados.removeAttribute("aria-current");
  menuHistorico.removeAttribute("aria-current");

  if (tela === telaInicio) {
    menuInicio.setAttribute("aria-current", "page");
  }

  if (tela === telaManutencao) {
    menuManutencao.setAttribute("aria-current", "page");
  }

  if (tela === telaChamados) {
    menuChamados.setAttribute("aria-current", "page");
  }

  if (tela === telaHistorico) {
    menuHistorico.setAttribute("aria-current", "page");
  }

  tela.querySelector("h1").focus();
}

function formatarData(data) {
  return data.split("-").reverse().join("/");
}

campoCpf.addEventListener("input", function () {
  const numeros = campoCpf.value.replace(/\D/g, "").slice(0, 11);
  let cpfFormatado = numeros.slice(0, 3);

  if (numeros.length > 3) {
    cpfFormatado += "." + numeros.slice(3, 6);
  }

  if (numeros.length > 6) {
    cpfFormatado += "." + numeros.slice(6, 9);
  }

  if (numeros.length > 9) {
    cpfFormatado += "-" + numeros.slice(9);
  }

  if (campoCpf.value !== cpfFormatado) {
    campoCpf.value = cpfFormatado;
  }
});


formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const tipo = formulario.elements.tipo.value;
  const placa = document.getElementById("placa").value.trim().toUpperCase().replace("-", "");
  const cpf = campoCpf.value.replace(/[.-]/g, "");

  // O acesso só abre quando os três dados pertencem ao mesmo cadastro mas não é uma aplicação direta deste app, isso viria do banco da locadora.
  const vinculo = vinculos.find(function (cadastro) {
    return cadastro.tipo === tipo && cadastro.placa === placa && cadastro.cpf === cpf;
  });

  if (!vinculo) {
    mensagem.textContent = "Acesso não liberado. Confira o tipo de locação, a placa e o CPF.";
    return;
  }

  mensagem.textContent = "";
  formulario.reset();
  document.getElementById("saudacao").textContent = "Olá, " + vinculo.nome + ".";
  document.getElementById("placa-veiculo").textContent = vinculo.placa;
  mostrarTela(telaInicio);
});

formulario.addEventListener("input", function () {
  mensagem.textContent = "";
});

document.getElementById("sair").addEventListener("click", function () {
  novasSolicitacoes.replaceChildren();
  mensagemSolicitacao.textContent = "";
  numeroSolicitacao = 31;

  for (const foto of chamadosRegistrados.querySelectorAll(".foto-anexo")) {
    URL.revokeObjectURL(foto.src);
  }
  chamadosRegistrados.replaceChildren();
  mensagemChamado.textContent = "";
  limparFiltrosChamados();
  numeroChamado = 27;
  numeroOS = 105;
  ordensServico = ordensOriginais.slice();
  fotosOS.replaceChildren();
  document.getElementById("texto-observacoes-os").textContent = "";
  botaoOrigemOS = null;
  chamadoDaOrdem = null;
  limparHistorico();
  mostrarTela(telaAcesso);
});

menuInicio.addEventListener("click", function () {
  mostrarTela(telaInicio);
});

menuManutencao.addEventListener("click", function () {
  mostrarTela(telaManutencao);
});

document.getElementById("ver-manutencao").addEventListener("click", function () {
  mostrarTela(telaManutencao);
});

document.getElementById("solicitar-manutencao").addEventListener("click", function () {
  formularioSolicitacao.reset();
  mensagemSolicitacao.textContent = "";
  mostrarTela(telaSolicitacao);
});

document.getElementById("cancelar-solicitacao").addEventListener("click", function () {
  mostrarTela(telaManutencao);
});

formularioSolicitacao.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const data = document.getElementById("data-revisao").value;
  const dataFormatada = formatarData(data);
  const horario = document.getElementById("hora-revisao").value;
  const detalhes = document.getElementById("detalhes-revisao").value.trim();
  numeroSolicitacao += 1;
  const protocolo = "SOL-" + String(numeroSolicitacao).padStart(3, "0");

  // Copia o cartão do HTML e coloca o novo pedido no topo da lista.
  const modelo = document.getElementById("modelo-solicitacao");
  const cartao = modelo.content.cloneNode(true);
  cartao.querySelector(".protocolo").textContent = "Protocolo " + protocolo;
  cartao.querySelector(".data-solicitada").textContent = "Data solicitada: " + dataFormatada + " às " + horario;

  if (detalhes !== "") {
    const textoDetalhes = cartao.querySelector(".detalhes-solicitados");
    textoDetalhes.textContent = "Detalhes: " + detalhes;
    textoDetalhes.hidden = false;
  }

  novasSolicitacoes.prepend(cartao);
  mostrarTela(telaManutencao);
  mensagemSolicitacao.textContent = "Solicitação " + protocolo + " registrada. Aguarde a confirmação da locadora.";
});

// Cada cartão guarda a data, o tipo e o status usados pelos filtros.
function filtrarChamados() {
  const data = formatarData(document.getElementById("filtro-data-chamado").value);
  const tipo = document.getElementById("filtro-tipo-chamado").value;
  const status = document.getElementById("filtro-status-chamado").value;
  let temResultado = false;

  for (const chamado of listaChamados.querySelectorAll(".chamado")) {
    const mesmaData = data === "" || chamado.dataset.data === data;
    const mesmoTipo = tipo === "" || chamado.dataset.tipo === tipo;
    const mesmoStatus = status === "" || chamado.dataset.status === status;
    chamado.hidden = !(mesmaData && mesmoTipo && mesmoStatus);

    if (!chamado.hidden) {
      temResultado = true;
    }
  }

  document.getElementById("sem-chamados").hidden = temResultado;
}

function limparFiltrosChamados() {
  filtrosChamados.reset();
  filtrarChamados();
}

function abrirFormularioChamado() {
  formularioChamado.reset();
  campoDescricao.setCustomValidity("");
  mensagemChamado.textContent = "";
  document.getElementById("numero-chamado").value = "CH-" + String(numeroChamado).padStart(3, "0");
  document.getElementById("placa-chamado").value = document.getElementById("placa-veiculo").textContent;
  document.getElementById("data-chamado").value = new Date().toLocaleDateString("pt-BR");
  mostrarTela(telaNovoChamado);
}

menuChamados.addEventListener("click", function () {
  mostrarTela(telaChamados);
});

document.getElementById("abrir-chamado").addEventListener("click", abrirFormularioChamado);
document.getElementById("novo-chamado").addEventListener("click", abrirFormularioChamado);
document.getElementById("limpar-filtros-chamados").addEventListener("click", limparFiltrosChamados);
filtrosChamados.addEventListener("change", filtrarChamados);
filtrosChamados.addEventListener("submit", function (evento) {
  evento.preventDefault();
  filtrarChamados();
});

document.getElementById("cancelar-chamado").addEventListener("click", function () {
  formularioChamado.reset();
  mostrarTela(telaChamados);
});

campoDescricao.addEventListener("input", function () {
  campoDescricao.setCustomValidity("");
});

formularioChamado.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const descricao = campoDescricao.value.trim();

  if (descricao === "") {
    campoDescricao.setCustomValidity("Descreva o que aconteceu com o carro.");
    campoDescricao.reportValidity();
    return;
  }

  const protocolo = document.getElementById("numero-chamado").value;
  const data = document.getElementById("data-chamado").value;
  const tipo = document.getElementById("tipo-chamado").value;
  // No protótipo, a locadora gera a OS assim que o chamado é registrado.
  const ordemServico = "OS-" + String(numeroOS).padStart(3, "0");

  const modelo = document.getElementById("modelo-chamado");
  const cartao = modelo.content.querySelector(".chamado").cloneNode(true);
  cartao.dataset.data = data;
  cartao.dataset.tipo = tipo;
  cartao.dataset.status = "Registrado";
  const titulo = tipo === "Avaria" ? "Avaria no veículo" : "Problema no veículo";
  cartao.querySelector(".titulo-chamado").textContent = titulo;
  cartao.querySelector(".dados-chamado").textContent = protocolo + " · " + data + " · " + tipo;
  cartao.querySelector(".descricao-chamado").textContent = "Descrição: " + descricao;
  const botaoOS = cartao.querySelector(".os-chamado");
  botaoOS.textContent = "Ver " + ordemServico;
  botaoOS.dataset.abrirOs = ordemServico;

  // As fotos ficam disponíveis no navegador durante a demonstração.
  const fotos = cartao.querySelector(".fotos-chamado");
  for (const arquivo of campoAnexos.files) {
    const foto = document.createElement("img");
    foto.className = "foto-anexo";
    foto.src = URL.createObjectURL(arquivo);
    foto.alt = "Anexo: " + arquivo.name;
    fotos.append(foto);
  }

  numeroChamado += 1;
  numeroOS += 1;
  chamadosRegistrados.prepend(cartao);
  ordensServico.push({
    numero: ordemServico,
    titulo: titulo,
    data: data.split("/").reverse().join("-"),
    tipo: tipo,
    status: "Registrado",
    chamado: protocolo,
    orientacao: "Aguarde o retorno da locadora.",
    observacao: "Descrição do motorista: " + descricao,
    etapas: [
      ["Recebimento do chamado", "Concluída"],
      ["Avaliação do veículo", "Não avaliada"]
    ]
  });
  formularioChamado.reset();
  limparFiltrosChamados();
  mostrarTela(telaChamados);
  mensagemChamado.textContent = "Chamado " + protocolo + " registrado. Acompanhe o retorno nesta tela.";
});

function filtrarHistorico() {
  const tipo = document.getElementById("tipo-historico").value;
  const de = inicioPeriodo.value;
  const ate = fimPeriodo.value;
  const modelo = document.getElementById("modelo-registro");
  listaHistorico.replaceChildren();

  // As datas no formato ano-mês-dia podem ser comparadas diretamente.
  const ordenadas = ordensServico.slice().sort(function (primeira, segunda) {
    return segunda.data.localeCompare(primeira.data) || segunda.numero.localeCompare(primeira.numero, "pt-BR", { numeric: true });
  });

  for (const ordem of ordenadas) {
    const mesmoTipo = tipo === "" || ordem.tipo === tipo;
    const depoisDoInicio = de === "" || ordem.data >= de;
    const antesDoFim = ate === "" || ordem.data <= ate;

    if (mesmoTipo && depoisDoInicio && antesDoFim) {
      const registro = modelo.content.firstElementChild.cloneNode(true);
      registro.dataset.abrirOs = ordem.numero;
      registro.querySelector(".titulo-registro").textContent = ordem.titulo;
      registro.querySelector(".dados-chamado").textContent = ordem.numero + " · " + formatarData(ordem.data);
      registro.querySelector(".tipo-registro").textContent = ordem.tipo;
      listaHistorico.append(registro);
    }
  }

  document.getElementById("sem-registros").hidden = listaHistorico.children.length > 0;
}

function limparHistorico() {
  filtrosHistorico.reset();
  fimPeriodo.setCustomValidity("");
  filtrarHistorico();
}

menuHistorico.addEventListener("click", function () {
  limparHistorico();
  mostrarTela(telaHistorico);
});

document.getElementById("limpar-historico").addEventListener("click", limparHistorico);

filtrosHistorico.addEventListener("input", function () {
  fimPeriodo.setCustomValidity("");
});

filtrosHistorico.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (inicioPeriodo.value && fimPeriodo.value && fimPeriodo.value < inicioPeriodo.value) {
    fimPeriodo.setCustomValidity("Escolha uma data final igual ou posterior à inicial.");
    fimPeriodo.reportValidity();
    return;
  }

  filtrarHistorico();
});

// As duas telas usam os mesmos dados para abrir os detalhes da OS.
function abrirOrdemServico(evento) {
  const botao = evento.target.closest("[data-abrir-os]");
  if (!botao) {
    return;
  }

  const ordem = ordensServico.find(function (item) {
    return item.numero === botao.dataset.abrirOs;
  });
  botaoOrigemOS = botao;
  document.getElementById("resumo-os").textContent = ordem.numero + " · " + ordem.titulo;
  document.getElementById("placa-os").textContent = "Placa " + document.getElementById("placa-veiculo").textContent;
  const dataOS = document.getElementById("data-os");
  dataOS.dateTime = ordem.data;
  dataOS.textContent = formatarData(ordem.data);
  const statusOS = document.getElementById("status-os");
  statusOS.textContent = ordem.status;
  statusOS.dataset.situacao = ordem.status;
  document.getElementById("orientacao-os").textContent = ordem.orientacao;
  document.getElementById("texto-observacoes-os").textContent = ordem.observacao;
  document.getElementById("imagens-os").open = false;
  document.getElementById("observacoes-os").open = false;

  const listaEtapas = document.getElementById("etapas-os");
  const modeloEtapa = document.getElementById("modelo-etapa-os");
  listaEtapas.replaceChildren();
  for (const [nome, situacao] of ordem.etapas) {
    const etapa = modeloEtapa.content.firstElementChild.cloneNode(true);
    etapa.querySelector(".nome-etapa").textContent = nome;
    const statusEtapa = etapa.querySelector(".status");
    statusEtapa.textContent = situacao;
    statusEtapa.dataset.situacao = situacao;
    listaEtapas.append(etapa);
  }

  fotosOS.replaceChildren();
  document.getElementById("chamado-vinculado-os").hidden = ordem.chamado === "";
  chamadoDaOrdem = null;
  if (ordem.chamado !== "") {
    const linkOS = listaChamados.querySelector('[data-abrir-os="' + ordem.numero + '"]');
    chamadoDaOrdem = linkOS.closest(".chamado");
    verChamadoOS.textContent = ordem.chamado;
    for (const foto of chamadoDaOrdem.querySelectorAll(".foto-anexo")) {
      fotosOS.append(foto.cloneNode());
    }
  }
  document.getElementById("sem-imagens-os").hidden = fotosOS.children.length > 0;
  mostrarTela(telaOrdemServico);
}

listaHistorico.addEventListener("click", abrirOrdemServico);
listaChamados.addEventListener("click", abrirOrdemServico);

document.getElementById("voltar-os").addEventListener("click", function () {
  if (listaHistorico.contains(botaoOrigemOS)) {
    mostrarTela(telaHistorico);
  } else {
    mostrarTela(telaChamados);
  }
  botaoOrigemOS.focus();
});

verChamadoOS.addEventListener("click", function () {
  limparFiltrosChamados();
  chamadoDaOrdem.open = true;
  mostrarTela(telaChamados);
  chamadoDaOrdem.querySelector("summary").focus();
});
