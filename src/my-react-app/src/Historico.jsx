import { useState } from 'react'
import { formatarData } from './formatarData.js'

const filtrosIniciais = { tipo: '', inicio: '', fim: '' }

function Historico({ ordens, aoVerOrdem, oculto }) {
  const [filtros, setFiltros] = useState(filtrosIniciais)
  const [erro, setErro] = useState('')

  function pesquisar(evento) {
    evento.preventDefault()
    const dados = new FormData(evento.currentTarget)
    const inicio = dados.get('inicio')
    const fim = dados.get('fim')

    if (inicio && fim && fim < inicio) {
      setErro('Escolha uma data final igual ou posterior à inicial.')
      return
    }

    setFiltros({ tipo: dados.get('tipo'), inicio, fim })
  }

  function limparFiltros() {
    setFiltros(filtrosIniciais)
    setErro('')
  }

  // Datas no formato ano-mês-dia podem ser comparadas diretamente.
  const registros = ordens.filter((ordem) => {
    const mesmoTipo = !filtros.tipo || ordem.tipo === filtros.tipo
    const depoisDoInicio = !filtros.inicio || ordem.data >= filtros.inicio
    const antesDoFim = !filtros.fim || ordem.data <= filtros.fim
    return mesmoTipo && depoisDoInicio && antesDoFim
  })

  registros.sort((a, b) => {
    return b.data.localeCompare(a.data) || b.numero.localeCompare(a.numero, 'pt-BR', { numeric: true })
  })

  return (
    <section aria-labelledby="titulo-historico" hidden={oculto}>
      <h1 id="titulo-historico" tabIndex={-1}>Histórico</h1>
      <p>Consulte as ordens de serviço deste veículo.</p>

      <form onSubmit={pesquisar} onChange={() => setErro('')} onReset={limparFiltros}>
        <fieldset>
          <legend>Filtrar registros</legend>
          <label className="rotulo" htmlFor="tipo-historico">Tipo</label>
          <select className="campo" id="tipo-historico" name="tipo">
            <option value="">Todos</option>
            <option>Corretivo</option>
            <option>Preventivo</option>
            <option>Avaria</option>
          </select>
          <div className="campos-chamado">
            <div>
              <label className="rotulo" htmlFor="inicio-periodo">De</label>
              <input className="campo" id="inicio-periodo" name="inicio" type="date" />
            </div>
            <div>
              <label className="rotulo" htmlFor="fim-periodo">Até</label>
              <input className="campo" id="fim-periodo" name="fim" type="date" />
            </div>
          </div>
          <p className="mensagem-erro" role="alert">{erro}</p>
          <button className="botao" type="submit">Pesquisar</button>
          <button className="botao-link" type="reset">Limpar filtros</button>
        </fieldset>
      </form>

      <h2 className="titulo-lista">Registros</h2>
      {registros.length === 0 && (
        <p className="ajuda" role="status">Nenhum registro encontrado com esses filtros.</p>
      )}

      {registros.map((ordem) => (
        <button className="cartao registro-historico" key={ordem.numero} type="button" onClick={() => aoVerOrdem(ordem)}>
          <strong>{ordem.titulo}</strong>
          <small className="dados-chamado">{ordem.numero} · {formatarData(ordem.data)}</small>
          <span className="status tipo-registro">{ordem.tipo}</span>
        </button>
      ))}
    </section>
  )
}

export default Historico
