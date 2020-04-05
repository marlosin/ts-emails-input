import { EmailForm } from './components'
import './assets/styles/main.sass'

function app (): void {
  new EmailForm(document.body)
}

document.addEventListener('DOMContentLoaded', app)
