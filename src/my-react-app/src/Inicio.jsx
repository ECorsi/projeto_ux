import { proximaRevisao } from './dadosManutencao.js'
import { formatarData } from './formatarData.js'

function Inicio({ motorista, aoVerManutencao, aoAbrirChamado, aoSair }) {
  return (
    <section aria-labelledby="titulo-inicio">
      <h1 id="titulo-inicio" tabIndex={-1}>Início</h1>
      <p>Olá, {motorista.nome}.</p>

      <div className="cartao">
        <img className="foto-veiculo" src="/fiat-argo.png" alt="Fiat Argo vermelho" />
        <h2>Fiat Argo</h2>
        <p>Placa {motorista.placa}</p>
        <p>Odômetro: 37.000 km</p>
      </div>

      <button className="cartao revisao" type="button" onClick={aoVerManutencao}>
        <strong>Próxima revisão</strong>
        <time dateTime={proximaRevisao}>{formatarData(proximaRevisao)}</time>
        <span>Ver manutenções →</span>
      </button>

      <button className="botao botao-chamado" type="button" onClick={aoAbrirChamado}>Abrir chamado</button>
      <button className="botao voltar" type="button" onClick={aoSair}>Sair</button>
    </section>
  )
}

export default Inicio
