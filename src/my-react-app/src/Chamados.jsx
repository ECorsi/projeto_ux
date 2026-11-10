import { useState } from 'react'
import EtiquetaStatus from './EtiquetaStatus.jsx'
import FotosAnexadas from './FotosAnexadas.jsx'
import { formatarData } from './formatarData.js'

const filtrosIniciais = { data: '', tipo: '', status: '' }

function Chamados({ ordens, chamadoEnviado, chamadoEmDestaque, aoCriar, aoVerOrdem, oculto }) {
  const [filtros, setFiltros] = useState(filtrosIniciais)

  function mudarFiltro(evento) {
    const { name, value } = evento.target
    setFiltros({ ...filtros, [name]: value })
  }

  const chamados = ordens.filter((ordem) => {
    const mesmaData = !filtros.data || ordem.data === filtros.data
    const mesmoTipo = !filtros.tipo || ordem.tipo === filtros.tipo
    const mesmoStatus = !filtros.status || ordem.status === filtros.status
    return ordem.chamado && mesmaData && mesmoTipo && mesmoStatus
  })

  return (
    <section aria-labelledby="titulo-chamados" hidden={oculto}>
      <h1 id="titulo-chamados" tabIndex={-1}>Chamados</h1>
      <p>Registre um problema com o carro e acompanhe o retorno da locadora.</p>
      <button className="botao botao-chamado" type="button" onClick={aoCriar}>Novo chamado</button>

      <form id="filtros-chamados" onSubmit={(evento) => evento.preventDefault()}>
        <fieldset className="campos-chamado">
          <legend>Filtrar chamados</legend>
          <div className="campo-data-filtro">
            <label className="rotulo" htmlFor="filtro-data-chamado">Data de abertura</label>
            <input className="campo" id="filtro-data-chamado" name="data" type="date" value={filtros.data} onChange={mudarFiltro} />
          </div>
          <div>
            <label className="rotulo" htmlFor="filtro-tipo-chamado">Tipo</label>
            <select className="campo" id="filtro-tipo-chamado" name="tipo" value={filtros.tipo} onChange={mudarFiltro}>
              <option value="">Todos</option>
              <option>Corretivo</option>
              <option>Avaria</option>
            </select>
          </div>
          <div>
            <label className="rotulo" htmlFor="filtro-status-chamado">Status</label>
            <select className="campo" id="filtro-status-chamado" name="status" value={filtros.status} onChange={mudarFiltro}>
              <option value="">Todos</option>
              <option>Registrado</option>
              <option>Em atendimento</option>
              <option>Finalizado</option>
            </select>
          </div>
        </fieldset>
        <button className="botao-link" type="button" onClick={() => setFiltros(filtrosIniciais)}>Limpar filtros</button>
      </form>

      <h2 className="titulo-lista">Meus chamados</h2>
      <p className="mensagem-sucesso" role="status">
        {chamadoEnviado && 'Chamado ' + chamadoEnviado + ' registrado. Acompanhe o retorno nesta tela.'}
      </p>
      {chamados.length === 0 && (
        <p className="ajuda" role="status">Nenhum chamado encontrado com esses filtros.</p>
      )}

      {chamados.map((ordem) => (
        <details className="cartao solicitacao chamado" key={ordem.chamado} open={ordem.chamado === chamadoEmDestaque}>
          <summary>
            {ordem.titulo} <EtiquetaStatus status={ordem.status} />
            <small className="dados-chamado">{ordem.chamado} · {formatarData(ordem.data)} · {ordem.tipo}</small>
          </summary>
          <p className="descricao-chamado">Descrição: {ordem.descricao}</p>
          <button className="botao-link" type="button" onClick={() => aoVerOrdem(ordem)}>Ver {ordem.numero}</button>
          <p><strong>Orientação:</strong> {ordem.orientacao}</p>
          <FotosAnexadas fotos={ordem.fotos} />
        </details>
      ))}
    </section>
  )
}

export default Chamados
