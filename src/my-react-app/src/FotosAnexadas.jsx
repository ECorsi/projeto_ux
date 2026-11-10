function FotosAnexadas({ fotos }) {
  return fotos.map((foto) => (
    <img className="foto-anexo" key={foto.url} src={foto.url} alt={'Anexo: ' + foto.nome} />
  ))
}

export default FotosAnexadas
