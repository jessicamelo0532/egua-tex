// ÉguaTex — página de contato: copiar e-mail e montar a mensagem no app de e-mail.

const EMAIL = "pa2010828@gmail.com";

const copiar = document.getElementById("copiar");
const copiado = document.getElementById("copiado");

copiar.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copiado.textContent = "Endereço copiado.";
  } catch (e) {
    copiado.textContent = "Não deu para copiar. Selecione o endereço acima e copie manualmente.";
  }
});

const form = document.getElementById("form-contato");
const soProblema = document.getElementById("so-problema");
const mensagem = document.getElementById("mensagem");
const mensagemErro = document.getElementById("mensagem-erro");

form.querySelectorAll('input[name="tipo"]').forEach((r) =>
  r.addEventListener("change", () => {
    soProblema.hidden = form.tipo.value !== "Problema";
  })
);

mensagem.addEventListener("input", () => {
  if (mensagem.value.trim()) {
    mensagemErro.hidden = true;
    mensagem.removeAttribute("aria-invalid");
  }
});

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const texto = mensagem.value.trim();
  if (!texto) {
    mensagemErro.hidden = false;
    mensagem.setAttribute("aria-invalid", "true");
    mensagem.focus();
    return;
  }

  const tipo = form.tipo.value;
  const nome = form.nome.value.trim();
  const linhas = [texto, ""];
  if (tipo === "Problema") {
    const aparelho = form.aparelho.value.trim();
    const versao = form.versao.value.trim();
    if (aparelho) linhas.push("Celular: " + aparelho);
    if (versao) linhas.push("Versão do ÉguaTex: " + versao);
  }
  if (nome) linhas.push("", "Enviado por: " + nome);

  const assunto = `[ÉguaTex] ${tipo}`;
  window.location.href =
    `mailto:${EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(linhas.join("\n").trim())}`;
});
