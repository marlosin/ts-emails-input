import { EmailForm } from './components/email-form/component';
import './assets/styles/main.sass'

function app () {
  new EmailForm(document.body)
}

document.addEventListener('DOMContentLoaded', app)
