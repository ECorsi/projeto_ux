import { useState } from 'react'
import { formatarData } from './formatarData.js'

function NovoChamado({ numero, placa, aoEnviar, aoVoltar }) {
  const [erro, setErro] = useState('')
  const [data] = useState(() => new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-'))

  function enviar(evento) {
    evento.preventDefault()
    const dados = new FormData(evento.currentTarget)
    const descricao = dados.get('descricao').trim()
    const arquivos = dados.getAll('anexos').filter((arquivo) => arquivo.name !== '')

    if (descricao === '') {
      setErro('Descreva o que aconteceu com o carro.')
      return
    }

    if (arquivos.some((arquivo) => !arquivo.type.startsWith('image/'))) {
      setErro('Selecione apenas imagens no campo de fotos.')
      return
    }

    aoEnviar({ data, tipo: dados.get('tipo'), descricao, arquivos })
  }

  return (
    <section aria-labelledby="titulo-novo-chamado">
      <h1 id="titulo-novo-chamado" tabIndex={-1}>Novo chamado</h1>
      <p>Conte o que aconteceu com o carro. A locadora vai acompanhar o chamado.</p>

      <form onSubmit={enviar} onChange={() => setErro('')}>
        <div className="campos-chamado">
          <div>
            <label className="rotulo" htmlFor="numero-chamado">Nº do chamado</label>
            <input className="campo" id="numero-chamado" type="text" value={numero} readOnly />
          </div>
          <div>
            <label className="rotulo" htmlFor="placa-chamado">Placa</label>
            <input className="campo" id="placa-chamado" type="text" value={placa} readOnly />
          </div>
          <div>
            <label className="rotulo" htmlFor="data-chamado">Data de abertura</label>
            <input className="campo" id="data-chamado" type="text" value={formatarData(data)} readOnly />
          </div>
          <div>
            <label className="rotulo" htmlFor="tipo-chamado">Tipo</label>
            <select className="campo" id="tipo-chamado" name="tipo">
              <option>Corretivo</option>
              <option>Avaria</option>
            </select>
          </div>
        </div>

        <label className="rotulo" htmlFor="descricao-chamado">Descrição</label>
        <textarea className="campo" id="descricao-chamado" name="descricao" rows={4} maxLength={500}
          placeholder="Ex.: ouço um barulho quando freio." required />

        <label className="rotulo" htmlFor="anexos-chamado">Fotos (opcional)</label>
        <input className="campo" id="anexos-chamado" name="anexos" type="file" accept="image/*" multiple />

        <div className="cartao dados-agendamento">
          <p>Status: aguardando registro</p>
          <p>Ordem de serviço: gerada após o registro</p>
        </div>

        <p className="mensagem-erro" role="alert">{erro}</p>
        <button className="botao" type="submit">Enviar chamado</button>
        <button className="botao voltar" type="button" onClick={aoVoltar}>Voltar</button>
      </form>
    </section>
  )
}

export default NovoChamado
