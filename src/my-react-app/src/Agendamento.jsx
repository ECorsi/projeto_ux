function Agendamento({ aoEnviar, aoVoltar }) {
  function enviar(evento) {
    evento.preventDefault()
    const dados = new FormData(evento.currentTarget)

    aoEnviar({
      data: dados.get('data'),
      horario: dados.get('horario'),
      detalhes: dados.get('detalhes').trim(),
    })
  }

  return (
    <section aria-labelledby="titulo-agendamento">
      <h1 id="titulo-agendamento" tabIndex={-1}>Solicitar agendamento</h1>
      <p>Escolha a data e o horário para enviar o pedido à locadora.</p>

      <form onSubmit={enviar}>
        <div className="cartao dados-agendamento">
          <h2>Fiat Argo</h2>
          <p>Revisão preventiva · 37.000 km</p>
        </div>

        <label className="rotulo" htmlFor="data-revisao">Data de preferência</label>
        <input className="campo" id="data-revisao" name="data" type="date" defaultValue="2026-11-16" required />

        <label className="rotulo" htmlFor="hora-revisao">Horário de preferência</label>
        <input className="campo" id="hora-revisao" name="horario" type="time" defaultValue="09:00" required />

        <label className="rotulo" htmlFor="detalhes-revisao">Detalhes (opcional)</label>
        <textarea
          className="campo"
          id="detalhes-revisao"
          name="detalhes"
          rows={3}
          maxLength={300}
          placeholder="Algo que a locadora precisa saber?"
        />

        <button className="botao" type="submit">Enviar solicitação</button>
        <button className="botao voltar" type="button" onClick={aoVoltar}>Voltar</button>
      </form>
    </section>
  )
}

export default Agendamento
