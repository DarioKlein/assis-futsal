const form = document.querySelector("form");
const coaches = [
  { name: "Neto", birthDate: "06/05/1980" },
  { name: "Eduardo de Lima", birthDate: "29/08/1981" },
  { name: "Carlos Matheus Pereira de Souza", birthDate: "08/06/1993" },
];

document.querySelectorAll(".age").forEach((element, i) => {
  currentYear = new Date().getFullYear();
  const birthYear = coaches[i].birthDate.split("/")[2];
  const age = currentYear - birthYear;

  element.textContent = `${age} anos`;
});

const placeholders = {
  name: "Nome Completo:",
  email: "Email:",
  phone: "Telefone:",
  message: "Sua Mensagem:",
};

function setError(input, message) {
  input.value = "";
  input.placeholder = message;
  input.classList.add("error");
}

function clearError(input) {
  input.placeholder = placeholders[input.name];
  input.classList.remove("error");
}

function validateForm() {
  let valid = true;

  const name = form.name;
  const email = form.email;
  const phone = form.phone;
  const message = form.message;

  if (!name.value.trim()) {
    setError(name, "Digite Seu Nome Completo:");
    valid = false;
  } else if (name.value.length > 60) {
    setError(name, "Máx. 60 caracteres");
    valid = false;
  } else clearError(name);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    setError(email, "Digite seu e-mail:");
    valid = false;
  } else if (!emailRegex.test(email.value)) {
    setError(email, "E-mail inválido");
    valid = false;
  } else clearError(email);

  if (!phone.value.trim()) {
    setError(phone, "Digite Seu Telefone:");
    valid = false;
  } else if (phone.value.replace(/\D/g, "").length < 8) {
    setError(phone, "Telefone Inválido");
    valid = false;
  } else clearError(phone);

  if (!message.value.trim()) {
    setError(message, "Digite uma Mensagem:");
    valid = false;
  } else if (message.value.length > 300) {
    setError(message, "Máx. 300 Caracteres");
    valid = false;
  } else clearError(message);

  return valid;
}

async function sendEmail(data) {
  try {
    await emailjs.send(
      "service_z0s7ywv",
      "template_9suf03w",
      {
        name: data.name,
        email: data.email,
        message: `
        Nome do Aluno: ${data.name}
        E-mail do Aluno: ${data.email}
        Número de Contato do Aluno: ${data.phone}
        Mensagem do Aluno:
        ${data.message}
      `,
        title: `Novo interessado - ${data.name}`,
      },
      "mcyQS2IOTA3k70QMg"
    );

    feedbackMessage("✅ Seu e-mail foi enviado com sucesso!", true);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    feedbackMessage("❌ Erro: Seu e-mail não foi enviado!", false);
  }
}

function feedbackMessage(message, status) {
  const feedbackContainer = document.querySelector(".feedback-container");
  const feedback = document.querySelector("#feedback-message");
  unsetAnalyzing();
  if (status) {
    feedback.textContent = message;
    feedbackContainer.classList.add("feedback-active");
    feedback.classList.add("feedback-success");
    setTimeout(() => {
      feedbackContainer.classList.remove("feedback-active");
      feedback.classList.remove("feedback-success");
    }, 4000);
  } else {
    feedback.textContent = message;
    feedbackContainer.classList.add("feedback-active");
    feedback.classList.add("feedback-failed");
    setTimeout(() => {
      feedbackContainer.classList.remove("feedback-active");
      feedback.classList.remove("feedback-failed");
    }, 4000);
  }
}

document.getElementById("submit").addEventListener("click", async (e) => {
  e.preventDefault();

  if (validateForm()) {
    const data = Object.fromEntries(new FormData(form).entries());
    document.querySelector(".form-title").scrollIntoView({
      behavior: "smooth",
    });
    form.reset();
    setAnalyzing();

    await sendEmail(data);
  }
});

function setAnalyzing() {
  const dots = [".", ".", "."];
  const feedbackContainer = document.querySelector(".feedback-container");
  const feedback = document.querySelector("#feedback-message");
  feedbackContainer.classList.add("feedback-active");
  feedback.classList.add("feedback-processing");
  feedback.innerHTML = `<span class = "magnifier">🔍</span>Analisando`;
  dots.forEach((dot, i) => {
    const span = document.createElement("span");
    span.textContent = dot;
    span.style.animation = `1.5s jumping ease-in-out ${
      i - 0.9 * i
    }s infinite normal`;
    feedback.appendChild(span);
  });
}

function unsetAnalyzing() {
  const feedbackContainer = document.querySelector(".feedback-container");
  const feedback = document.querySelector("#feedback-message");
  feedbackContainer.classList.remove("feedback-active");
  feedback.classList.remove("feedback-processing");
  feedback.innerHTML = "";
}
