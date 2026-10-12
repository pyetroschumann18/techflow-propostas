const form = document.querySelector('#proposal-form');
const status = document.querySelector('#form-status');
const result = document.querySelector('#result');
const summary = document.querySelector('#proposal-summary');
const copyButton = document.querySelector('#copy-button');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';

  const required = [...form.querySelectorAll('[required]')];
  required.forEach((field) => field.removeAttribute('aria-invalid'));
  const firstInvalid = required.find((field) => !field.checkValidity());
  if (firstInvalid) {
    firstInvalid.setAttribute('aria-invalid', 'true');
    status.textContent = firstInvalid.validity.typeMismatch
      ? 'Confira o endereço de email informado.'
      : 'Preencha os campos obrigatórios para preparar a proposta.';
    firstInvalid.focus();
    result.hidden = true;
    return;
  }

  const data = new FormData(form);
  const text = [
    'Pedido de proposta · TechFlow',
    '',
    `Nome: ${data.get('nome').trim()}`,
    `Email: ${data.get('email').trim()}`,
    `Empresa: ${data.get('empresa').trim() || 'Não informada'}`,
    `Telefone: ${data.get('telefone').trim() || 'Não informado'}`,
    `Serviço: ${data.get('servico')}`,
    `Orçamento estimado: ${data.get('orcamento').trim() || 'Não informado'}`,
    '',
    'Projeto:',
    data.get('projeto').trim(),
    '',
    `Aceita comunicações de marketing: ${data.has('marketing') ? 'Sim' : 'Não'}`,
  ].join('\n');

  summary.value = text;
  result.hidden = false;
  result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(summary.value);
    copyButton.textContent = 'Resumo copiado';
  } catch {
    summary.select();
    copyButton.textContent = 'Selecione e copie o texto acima';
  }
});
