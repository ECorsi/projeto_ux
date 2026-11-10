import EtiquetaStatus from './EtiquetaStatus.jsx'
import FotosAnexadas from './FotosAnexadas.jsx'
import { formatarData } from './formatarData.js'

function DetalhesOS({ ordem, placa, aoVoltar, aoVerChamado }) {
  return (
    <section aria-labelledby="titulo-ordem-servico">
      <button className="botao-link" type="button" onClick={aoVoltar}>Voltar</button>
      <h1 id="titulo-ordem-servico" tabIndex={-1}>Detalhes da OS</h1>
      <p>{ordem.numero} · {ordem.titulo}</p>

      <div className="cartao veiculo-os">
        <img src="/fiat-argo.png" alt="Fiat Argo vermelho" />
        <div>
          <h2>Fiat Argo</h2>
          <p>Placa {placa}</p>
        </div>
      </div>

      <div className="cartao">
        <div className="linha-os">
          <div>
            <h2>Data de abertura</h2>
            <time id="data-os" dateTime={ordem.data}>{formatarData(ordem.data)}</time>
          </div>
          <EtiquetaStatus status={ordem.status} />
        </div>
        <p className="ajuda">{ordem.orientacao}</p>
      </div>

      <h2 className="titulo-lista">Etapas do serviço</h2>
      <ul className="cartao etapas-os">
        {ordem.etapas.map(([nome, status]) => (
          <li className="linha-os" key={nome}>
            <span>{nome}</span>
            <EtiquetaStatus status={status} />
          </li>
        ))}
      </ul>

      <details className="cartao solicitacao">
        <summary>Imagens</summary>
        {ordem.fotos.length === 0 && <p>Nenhuma imagem anexada.</p>}
        <FotosAnexadas fotos={ordem.fotos} />
      </details>

      <details className="cartao solicitacao">
        <summary>Observações</summary>
        <p>{ordem.observacao}</p>
      </details>

      {ordem.chamado && (
        <div className="cartao">
          <h2>Chamado vinculado</h2>
          <button className="botao-link" type="button" onClick={() => aoVerChamado(ordem.chamado)}>{ordem.chamado}</button>
        </div>
      )}
    </section>
  )
}

export default DetalhesOS
