// ===== Banco de perguntas sobre IA (nomes e anos) =====
const perguntas = [
  {
    pergunta: "Em que ano ocorreu a famosa Conferência de Dartmouth, considerada o marco de nascimento do termo 'Inteligência Artificial'?",
    alternativas: ["1943", "1950", "1956", "1969"],
    correta: 2,
    explicacao: "Em 1956, na Conferência de Dartmouth, John McCarthy e outros pesquisadores cunharam o termo 'Inteligência Artificial'."
  },
  {
    pergunta: "Quem é considerado o 'pai da computação' e propôs em 1950 o Teste de Turing?",
    alternativas: ["John McCarthy", "Alan Turing", "Marvin Minsky", "Claude Shannon"],
    correta: 1,
    explicacao: "Alan Turing propôs o Teste de Turing em 1950, no artigo 'Computing Machinery and Intelligence'."
  },
  {
    pergunta: "Em 1997, qual computador da IBM venceu o campeão mundial de xadrez Garry Kasparov?",
    alternativas: ["Deep Blue", "Watson", "AlphaGo", "ENIAC"],
    correta: 0,
    explicacao: "O Deep Blue, da IBM, venceu Garry Kasparov em 1997, um marco na história da IA."
  },
  {
    pergunta: "Em 2016, qual sistema de IA da DeepMind venceu o campeão mundial de Go, Lee Sedol?",
    alternativas: ["Watson", "AlphaGo", "GPT-3", "Deep Blue"],
    correta: 1,
    explicacao: "O AlphaGo, da DeepMind (Google), venceu Lee Sedol em 2016, um feito histórico no jogo de Go."
  },
  {
    pergunta: "Quem é conhecido como um dos 'pais' da IA e criou a linguagem LISP em 1958?",
    alternativas: ["Marvin Minsky", "John McCarthy", "Geoffrey Hinton", "Yann LeCun"],
    correta: 1,
    explicacao: "John McCarthy criou a linguagem LISP em 1958, fundamental para a pesquisa em IA."
  },
  {
    pergunta: "Em que ano foi lançado o GPT-3, modelo de linguagem da OpenAI com 175 bilhões de parâmetros?",
    alternativas: ["2018", "2020", "2022", "2023"],
    correta: 1,
    explicacao: "O GPT-3 foi lançado pela OpenAI em 2020, marcando uma nova era dos grandes modelos de linguagem."
  },
  {
    pergunta: "Qual pesquisador é conhecido como um dos pioneiros das redes neurais e ganhou o Prêmio Turing em 2018 (junto com Yoshua Bengio e Yann LeCun)?",
    alternativas: ["Geoffrey Hinton", "Andrew Ng", "Fei-Fei Li", "Stuart Russell"],
    correta: 0,
    explicacao: "Geoffrey Hinton, Yoshua Bengio e Yann LeCun ganharam o Prêmio Turing em 2018 por contribuições às redes neurais profundas."
  },
  {
    pergunta: "Em que ano o ChatGPT foi lançado ao público pela OpenAI?",
    alternativas: ["2020", "2021", "2022", "2024"],
    correta: 2,
    explicacao: "O ChatGPT foi lançado em novembro de 2022 e popularizou o uso de IA generativa no mundo todo."
  }
];

// ===== Elementos do DOM =====
const telaInicio = document.getElementById("tela-inicio");
const telaQuiz = document.getElementById("tela-quiz");
const telaResultado = document.getElementById("tela-resultado");

const btnIniciar = document.getElementById("btn-iniciar");
const btnProxima = document.getElementById("btn-proxima");
const btnReiniciar = document.getElementById("btn-reiniciar");

const elContador = document.getElementById("contador-pergunta");
const elBarra = document.getElementById("barra-preenchida");
const elPergunta = document.getElementById("pergunta");
const elAlternativas = document.getElementById("alternativas");
const elFeedback = document.getElementById("feedback");
const elPontuacao = document.getElementById("pontuacao");
const elMensagemFinal = document.getElementById("mensagem-final");

// ===== Estado do quiz =====
let indiceAtual = 0;
let acertos = 0;
let respondeu = false;

// ===== Funções =====
function mostrarTela(tela) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  tela.classList.add("ativa");
}

function iniciarQuiz() {
  indiceAtual = 0;
  acertos = 0;
  mostrarTela(telaQuiz);
  carregarPergunta();
}

function carregarPergunta() {
  respondeu = false;
  const q = perguntas[indiceAtual];

  // Contador e barra
  elContador.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  elBarra.style.width = `${((indiceAtual) / perguntas.length) * 100}%`;

  // Pergunta
  elPergunta.textContent = q.pergunta;

  // Alternativas
  elAlternativas.innerHTML = "";
  q.alternativas.forEach((texto, i) => {
    const btn = document.createElement("button");
    btn.className = "alternativa";
    btn.textContent = `${String.fromCharCode(65 + i)}) ${texto}`;
    btn.addEventListener("click", () => responder(i));
    elAlternativas.appendChild(btn);
  });

  // Reset feedback e botão próxima
  elFeedback.textContent = "";
  elFeedback.className = "feedback";
  btnProxima.classList.add("escondido");
}

function responder(escolha) {
  if (respondeu) return;
  respondeu = true;

  const q = perguntas[indiceAtual];
  const botoes = elAlternativas.querySelectorAll(".alternativa");

  botoes.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correta) btn.classList.add("correta");
    if (i === escolha && i !== q.correta) btn.classList.add("errada");
  });

  if (escolha === q.correta) {
    acertos++;
    elFeedback.textContent = `✅ Correto! ${q.explicacao}`;
    elFeedback.classList.add("ok");
  } else {
    elFeedback.textContent = `❌ Errado. ${q.explicacao}`;
    elFeedback.classList.add("erro");
  }

  // Atualiza barra
  elBarra.style.width = `${((indiceAtual + 1) / perguntas.length) * 100}%`;

  // Mostra botão próxima ou finaliza
  if (indiceAtual === perguntas.length - 1) {
    btnProxima.textContent = "Ver Resultado 🏁";
  } else {
    btnProxima.textContent = "Próxima ➡";
  }
  btnProxima.classList.remove("escondido");
}

function proximaPergunta() {
  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    carregarPergunta();
  } else {
    finalizarQuiz();
  }
}

function finalizarQuiz() {
  mostrarTela(telaResultado);
  elPontuacao.textContent = `Você acertou ${acertos} de ${perguntas.length} perguntas!`;

  const porcentagem = (acertos / perguntas.length) * 100;
  let msg = "";
  if (porcentagem === 100) {
    msg = "🏆 Perfeito! Você é um expert em história da IA!";
  } else if (porcentagem >= 75) {
    msg = "🎉 Muito bom! Você conhece bem os marcos da IA.";
  } else if (porcentagem >= 50) {
    msg = "👍 Bom trabalho! Mas ainda há marcos da IA para explorar.";
  } else {
    msg = "📚 Continue estudando! A história da IA é fascinante.";
  }
  elMensagemFinal.textContent = msg;
}

// ===== Eventos =====
btnIniciar.addEventListener("click", iniciarQuiz);
btnProxima.addEventListener("click", proximaPergunta);
btnReiniciar.addEventListener("click", () => {
  mostrarTela(telaInicio);
});