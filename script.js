const menuBotao = document.getElementById("menuBotao");
const menu = document.getElementById("menu");

menuBotao.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBotao.textContent = aberto ? "×" : "☰";
  menuBotao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll("#menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    menuBotao.textContent = "☰";
  });
});

// Modo de apresentação: tenta abrir a página em tela cheia.
document.getElementById("modoApresentacao").addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (erro) {
    alert("A tela cheia não está disponível neste navegador.");
  }
});

// Navega até a demonstração.
document.getElementById("irSimulacao").addEventListener("click", () => {
  document.getElementById("simulacao").scrollIntoView({
    behavior: "smooth"
  });
  ativarSimulacao();
});

// Simulação fictícia: não acessa a câmera do computador.
const botaoSimulacao = document.getElementById("alternarSimulacao");
const cena = document.getElementById("cena");
const estado = document.getElementById("estado");
const contador = document.getElementById("contador");
const resultado = document.getElementById("resultado");

function ativarSimulacao() {
  cena.classList.add("ativa");
  botaoSimulacao.textContent = "■ Desativar simulação";
  botaoSimulacao.setAttribute("aria-pressed", "true");
  estado.textContent = "SIMULAÇÃO ATIVA";
  contador.textContent = "03";
  resultado.textContent = "Figuras marcadas";
}

function desativarSimulacao() {
  cena.classList.remove("ativa");
  botaoSimulacao.textContent = "▶ Ativar simulação";
  botaoSimulacao.setAttribute("aria-pressed", "false");
  estado.textContent = "INATIVO";
  contador.textContent = "00";
  resultado.textContent = "Aguardando";
}

botaoSimulacao.addEventListener("click", () => {
  if (cena.classList.contains("ativa")) {
    desativarSimulacao();
  } else {
    ativarSimulacao();
  }
});

// Imprime o site ou permite salvar em PDF pelo navegador.
document.getElementById("imprimir").addEventListener("click", () => {
  window.print();
});

// Atalho de teclado: F alterna a tela cheia.
document.addEventListener("keydown", async (evento) => {
  const elemento = document.activeElement;
  const digitando =
    elemento &&
    ["INPUT", "TEXTAREA"].includes(elemento.tagName);

  if (evento.key.toLowerCase() === "f" && !digitando) {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (erro) {
      // A página continua funcionando sem tela cheia.
    }
  }
});