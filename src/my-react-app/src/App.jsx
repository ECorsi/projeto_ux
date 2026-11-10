import { useEffect, useRef, useState } from 'react'
import Acesso from './Acesso.jsx'
import Agendamento from './Agendamento.jsx'
import Chamados from './Chamados.jsx'
import DetalhesOS from './DetalhesOS.jsx'
import Historico from './Historico.jsx'
import Inicio from './Inicio.jsx'
import Manutencao from './Manutencao.jsx'
import NovoChamado from './NovoChamado.jsx'
import { solicitacoesIniciais } from './dadosManutencao.js'
import { ordensIniciais } from './dadosOrdens.js'
import './App.css'

function App() {
  const [motorista, setMotorista] = useState(null)
  const [tela, setTela] = useState('inicio')
  const [novasSolicitacoes, setNovasSolicitacoes] = useState([])
  const [protocoloEnviado, setProtocoloEnviado] = useState('')
  const [novasOrdens, setNovasOrdens] = useState([])
  const [chamadoEnviado, setChamadoEnviado] = useState('')
  const [chamadoEmDestaque, setChamadoEmDestaque] = useState('')
  const [consultaOS, setConsultaOS] = useState(null)
  const painel = useRef(null)

  const ordens = [...novasOrdens, ...ordensIniciais]
  const numeroChamado = 'CH-' + String(27 + novasOrdens.length).padStart(3, '0')

  // Ao trocar de tela, leva o foco para o novo título.
  useEffect(() => {
    const conteudo = painel.current.querySelector('.conteudo-tela')
    conteudo.scrollTop = 0
    conteudo.querySelector('section:not([hidden]) h1').focus({ preventScroll: true })
  }, [motorista, tela])

  function sair() {
    for (const ordem of novasOrdens) {
      for (const foto of ordem.fotos) {
        URL.revokeObjectURL(foto.url)
      }
    }

    setMotorista(null)
    setTela('inicio')
    setNovasSolicitacoes([])
    setProtocoloEnviado('')
    setNovasOrdens([])
    setChamadoEnviado('')
    setChamadoEmDestaque('')
    setConsultaOS(null)
  }

  function abrirAgendamento() {
    setProtocoloEnviado('')
    setTela('agendamento')
  }

  function registrarSolicitacao(dados) {
    const numero = 32 + novasSolicitacoes.length
    const protocolo = 'SOL-' + String(numero).padStart(3, '0')
    const pedido = {
      ...dados,
      protocolo: protocolo,
      servico: 'Revisão preventiva',
      status: 'Pendente',
      local: 'Local a definir pela locadora.',
    }

    setNovasSolicitacoes([pedido, ...novasSolicitacoes])
    setProtocoloEnviado(protocolo)
    setTela('manutencao')
  }

  function abrirNovoChamado() {
    setChamadoEnviado('')
    setChamadoEmDestaque('')
    setTela('novoChamado')
  }

  function registrarChamado({ data, tipo, descricao, arquivos }) {
    // As imagens ganham endereços temporários, que funcionam só no navegador.
    const fotos = arquivos.map((arquivo) => ({
      nome: arquivo.name,
      url: URL.createObjectURL(arquivo),
    }))

    // Chamados e Histórico consultam o mesmo registro.
    const ordem = {
      numero: 'OS-' + (105 + novasOrdens.length),
      chamado: numeroChamado,
      titulo: tipo === 'Avaria' ? 'Avaria no veículo' : 'Problema no veículo',
      data,
      tipo,
      descricao,
      fotos,
      status: 'Registrado',
      orientacao: 'Aguarde o retorno da locadora.',
      observacao: 'Descrição do motorista: ' + descricao,
      etapas: [
        ['Recebimento do chamado', 'Concluída'],
        ['Avaliação do veículo', 'Não avaliada'],
      ],
    }

    setNovasOrdens([ordem, ...novasOrdens])
    setChamadoEnviado(numeroChamado)
    setTela('chamados')
  }

  function abrirOrdem(ordem) {
    setConsultaOS({ ordem, origem: tela })
    setTela('ordem')
  }

  function verChamadoVinculado(numero) {
    setChamadoEmDestaque(numero)
    setTela('chamados')
  }

  return (
    <main className="painel" ref={painel}>
      <header className="marca">
        <img className="icone-carro" src="/icone-carro.png" alt="" />
        <div>
          <strong>Central do Motorista</strong>
          <span>Manutenção do veículo</span>
        </div>
      </header>

      <div className="conteudo-tela">
        {!motorista && <Acesso aoEntrar={setMotorista} />}

        {motorista && tela === 'inicio' && (
          <Inicio
            motorista={motorista}
            aoVerManutencao={() => setTela('manutencao')}
            aoAbrirChamado={abrirNovoChamado}
            aoSair={sair}
          />
        )}

        {motorista && tela === 'manutencao' && (
          <Manutencao
            solicitacoes={[...novasSolicitacoes, ...solicitacoesIniciais]}
            protocoloEnviado={protocoloEnviado}
            aoSolicitar={abrirAgendamento}
          />
        )}

        {motorista && tela === 'agendamento' && (
          <Agendamento aoEnviar={registrarSolicitacao} aoVoltar={() => setTela('manutencao')} />
        )}

        {motorista && (tela === 'chamados' || (tela === 'ordem' && consultaOS.origem === 'chamados')) && (
          <Chamados
            ordens={ordens}
            chamadoEnviado={chamadoEnviado}
            chamadoEmDestaque={chamadoEmDestaque}
            aoCriar={abrirNovoChamado}
            aoVerOrdem={abrirOrdem}
            oculto={tela !== 'chamados'}
          />
        )}

        {motorista && tela === 'novoChamado' && (
          <NovoChamado
            numero={numeroChamado}
            placa={motorista.placa}
            aoEnviar={registrarChamado}
            aoVoltar={() => setTela('chamados')}
          />
        )}

        {motorista && (tela === 'historico' || (tela === 'ordem' && consultaOS.origem === 'historico')) && (
          <Historico ordens={ordens} aoVerOrdem={abrirOrdem} oculto={tela !== 'historico'} />
        )}

        {motorista && tela === 'ordem' && (
          <DetalhesOS
            ordem={consultaOS.ordem}
            placa={motorista.placa}
            aoVoltar={() => setTela(consultaOS.origem)}
            aoVerChamado={verChamadoVinculado}
          />
        )}
      </div>

      {motorista && (
        <nav className="menu-principal" aria-label="Menu principal">
          <button type="button" onClick={() => setTela('inicio')} aria-current={tela === 'inicio' ? 'page' : undefined}
            title="Início"
            aria-label="Tela de Início"
            >
              <img src="/inicio.png" alt="Início" />
          </button>
          <button type="button" onClick={() => setTela('manutencao')} aria-current={tela === 'manutencao' ? 'page' : undefined}
            title="Manutenção"
            aria-label="Tela de Manutenção"
            >
              <img src="/manutencao.png" alt="Manutenção" />
          </button>
          <button type="button" onClick={() => setTela('chamados')} aria-current={tela === 'chamados' ? 'page' : undefined}
            title="Chamados"
            aria-label="Tela de Chamados"
            >
              <img src="/chamados.png" alt="Chamados" />
          </button>
          <button type="button" onClick={() => setTela('historico')} aria-current={tela === 'historico' ? 'page' : undefined}
            title="Histórico"
            aria-label="Tela de Histórico"
            >
              <img src="/historico.png" alt="Histórico" />
          </button>
        </nav>
      )}
    </main>
  )
}

export default App
