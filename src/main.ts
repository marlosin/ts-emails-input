import { EmailForm } from './components'
import './assets/styles/main.sass'

document.addEventListener('DOMContentLoaded', function() {
  const emailForm = new EmailForm(document.body)
  window.addEmailsInput = emailForm.addInput.bind(emailForm)
})
