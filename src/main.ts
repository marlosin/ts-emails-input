import { EmailForm } from './components/email-form';
import './styles/main.sass'

function app (): void {
  new EmailForm(document.body)
}

document.addEventListener('DOMContentLoaded', app)
