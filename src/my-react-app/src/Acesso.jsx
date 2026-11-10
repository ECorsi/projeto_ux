import { useState } from 'react'

// Cadastros fictícios para testar o formulário.
const vinculos = [
  { tipo: 'PF', placa: 'ABC1D23', cpf: '11111111111', nome: 'Marcos' },
  { tipo: 'PJ', placa: 'ABC1D23', cpf: '22222222222', nome: 'Daniel' },
]

function formatarCpf(valor) {
  const numeros = valor.replace(/\D/g, '').slice(0, 11)
  let cpfFormatado = numeros.slice(0, 3)

  if (numeros.length > 3) {
    cpfFormatado += '.' + numeros.slice(3, 6)
  }

  if (numeros.length > 6) {
    cpfFormatado += '.' + numeros.slice(6, 9)
  }

  if (numeros.length > 9) {
    cpfFormatado += '-' + numeros.slice(9)
  }

  return cpfFormatado
}

function Acesso({ aoEntrar }) {
  const [cpf, setCpf] = useState('')
  const [erro, setErro] = useState('')

  function limparErro() {
    setErro('')
  }

  function entrar(evento) {
    evento.preventDefault()

    const formulario = evento.currentTarget
    const dados = new FormData(formulario)
    const tipo = dados.get('tipo')
    const placa = dados.get('placa').trim().toUpperCase().replace('-', '')
    const numerosCpf = dados.get('cpf').replace(/\D/g, '')

    const vinculo = vinculos.find(function (cadastro) {
      return cadastro.tipo === tipo && cadastro.placa === placa && cadastro.cpf === numerosCpf
    })

    if (!vinculo) {
      setErro('Acesso não liberado. Confira o tipo de locação, a placa e o CPF.')
      return
    }

    aoEntrar({ nome: vinculo.nome, placa: vinculo.placa })
  }

  return (
    <section aria-labelledby="titulo-acesso">
      <h1 id="titulo-acesso" tabIndex={-1}>Acesse seu veículo</h1>
      <p>Informe a placa e o CPF do motorista para continuar.</p>

      <form onSubmit={entrar} onChange={limparErro}>
        <fieldset>
          <legend>Tipo de locação</legend>
          <div className="opcoes">
            <label className="opcao">
              <input type="radio" name="tipo" value="PF" required />
              <span><strong>PF</strong><small>Em meu nome</small></span>
            </label>
            <label className="opcao">
              <input type="radio" name="tipo" value="PJ" />
              <span><strong>PJ</strong><small>Pela empresa</small></span>
            </label>
          </div>
        </fieldset>

        <label className="rotulo" htmlFor="placa">Placa do veículo</label>
        <input
          className="campo"
          id="placa"
          name="placa"
          type="text"
          placeholder="ABC1D23"
          maxLength={8}
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          required
        />

        <label className="rotulo" htmlFor="cpf">CPF do motorista</label>
        <input
          className="campo"
          id="cpf"
          name="cpf"
          type="text"
          inputMode="numeric"
          placeholder="000.000.000-00"
          maxLength={14}
          autoComplete="on"
          value={cpf}
          onChange={(evento) => setCpf(formatarCpf(evento.target.value))}
          required
        />

        <p id="mensagem-acesso" role="alert">{erro}</p>
        <button className="botao" type="submit">Entrar</button>
        <p className="ajuda">Use os dados vinculados à sua locação.</p>
      </form>
    </section>
  )
}

export default Acesso
