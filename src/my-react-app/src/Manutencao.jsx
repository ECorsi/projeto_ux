import EtiquetaStatus from './EtiquetaStatus.jsx'
import { proximaRevisao } from './dadosManutencao.js'
import { formatarData } from './formatarData.js'

function Manutencao({ solicitacoes, protocoloEnviado, aoSolicitar }) {
  return (
    <section aria-labelledby="titulo-manutencao">
      <h1 id="titulo-manutencao" tabIndex={-1}>Manutenção</h1>
      <p>Consulte o prazo da revisão e acompanhe suas solicitações.</p>

      <div className="cartao revisao">
        <h2>Próxima revisão preventiva</h2>
        <time dateTime={proximaRevisao}>{formatarData(proximaRevisao)}</time>
        <button className="botao" type="button" onClick={aoSolicitar}>
          Solicitar agendamento
        </button>
      </div>

      <h2 className="titulo-lista">Solicitações de manutenção</h2>
      <p className="mensagem-sucesso" role="status">
        {protocoloEnviado && 'Solicitação ' + protocoloEnviado + ' registrada. Aguarde a confirmação da locadora.'}
      </p>

      {solicitacoes.map((pedido) => (
        <details className="cartao solicitacao" key={pedido.protocolo} open={pedido.protocolo === protocoloEnviado}>
          <summary>{pedido.servico} <EtiquetaStatus status={pedido.status} /></summary>
          <p>Protocolo {pedido.protocolo}</p>
          <p>
            {pedido.status === 'Confirmado' ? 'Data aprovada: ' : 'Data solicitada: '}
            {formatarData(pedido.data)} às {pedido.horario}
          </p>
          <p>{pedido.local}</p>
          {pedido.detalhes && <p>Detalhes: {pedido.detalhes}</p>}
        </details>
      ))}
    </section>
  )
}

export default Manutencao
