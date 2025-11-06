document.addEventListener('DOMContentLoaded', () => {
  const loadComponents = async () => {
    const elements = document.querySelectorAll('[data-include]')

    for (const el of elements) {
      const file = el.getAttribute('data-include')

      try {
        const response = await fetch(file)
        if (!response.ok) throw new Error(`Não foi possível carregar: ${file}`)

        const html = await response.text()
        el.innerHTML = html

        const scriptPath = el.getAttribute('data-script')
        if (scriptPath) {
          const newScript = document.createElement('script')
          newScript.src = scriptPath

          document.body.appendChild(newScript)
        }
      } catch (error) {
        console.error('Erro ao carregar componente:', error)
        el.innerHTML = `<p style="color:red;">Erro ao carregar ${file}</p>`
      }
    }
  }

  loadComponents()
})

const form = document.querySelector('form')

const placeholders = {
  name: 'Nome Completo:',
  email: 'Email:',
  phone: 'Telefone:',
  message: 'Sua Mensagem:',
}

function setError(input, message) {
  input.value = ''
  input.placeholder = message
  input.classList.add('error')
}

function clearError(input) {
  input.placeholder = placeholders[input.name]
  input.classList.remove('error')
}

function validateForm() {
  let valid = true

  const name = form.name
  const email = form.email
  const phone = form.phone
  const message = form.message

  if (!name.value.trim()) {
    setError(name, 'Digite Seu Nome Completo:')
    valid = false
  } else if (name.value.length > 60) {
    setError(name, 'Máx. 60 caracteres')
    valid = false
  } else clearError(name)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    setError(email, 'Digite seu e-mail:')
    valid = false
  } else if (!emailRegex.test(email.value)) {
    setError(email, 'E-mail inválido')
    valid = false
  } else clearError(email)

  if (!phone.value.trim()) {
    setError(phone, 'Digite Seu Telefone:')
    valid = false
  } else if (phone.value.replace(/\D/g, '').length < 8) {
    setError(phone, 'Telefone Inválido')
    valid = false
  } else clearError(phone)

  if (!message.value.trim()) {
    setError(message, 'Digite uma Mensagem:')
    valid = false
  } else if (message.value.length > 300) {
    setError(message, 'Máx. 300 Caracteres')
    valid = false
  } else clearError(message)

  return valid
}

async function sendEmail(data) {
  try {
    await emailjs.send(
      'service_z0s7ywv',
      'template_9suf03w',
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
      'mcyQS2IOTA3k70QMg'
    )

    feedbackMessage('✅ Seu e-mail foi enviado com sucesso!', true)
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)
    feedbackMessage('❌ Erro: Seu e-mail não foi enviado!', false)
  }
}

function feedbackMessage(message, status) {
  const feedback = document.getElementById('feedback')
  const containerFeedback = document.querySelector('form > div')
  if (status) {
    feedback.textContent = message
    containerFeedback.classList.add('feedback-active')
    feedback.classList.add('feedback-sucess')
    setTimeout(() => {
      containerFeedback.classList.remove('feedback-active')
      feedback.classList.remove('feedback-sucess')
    }, 4000)
  } else {
    feedback.textContent = message
    containerFeedback.classList.add('feedback-active')
    feedback.classList.add('feedback-failed')
    setTimeout(() => {
      containerFeedback.classList.remove('feedback-active')
      feedback.classList.remove('feedback-failed')
    }, 4000)
  }
}

document.getElementById('submit').addEventListener('click', async e => {
  e.preventDefault()

  if (validateForm()) {
    const data = Object.fromEntries(new FormData(form).entries())
    console.log(data)
    form.reset()

    await sendEmail(data)
  }
})
