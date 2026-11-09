Desenvolvimento prático

Desenvolvi a **Central do Motorista** para quem usa um carro alugado para trabalhar. A ideia é facilitar o acompanhamento das revisões, o registro de problemas e a consulta do que aconteceu com o veículo durante a locação.

Comecei com entrevistas e um questionário no Google Forms. A partir das respostas, montei as personas e os fluxos, desenhei as telas no papel e fiz o protótipo no Figma. A pesquisa, a prototipação e a avaliação estão reunidas no [README principal](../README.md).

## Versões do aplicativo

- [HTML, CSS e JavaScript](../app/index.html) — primeira versão navegável, feita a partir das telas do Figma utilizando modo desenvolvedor.
- React com Vite — versão em que separei as telas em componentes e passei a controlar a navegação e os registros com o estado do React.

## O que dá para testar

- **Acesso e Início** — entrar com o CPF e a placa do cadastro fictício e consultar o veículo e a próxima revisão.
- **Manutenção** — escolher uma data e um horário, enviar o pedido e conferir o protocolo e o status.
- **Chamados** — registrar um problema ou avaria, anexar fotos e acompanhar a ordem de serviço gerada.
- **Histórico** — buscar ordens por tipo e período e consultar etapas, observações e fotos.

Para abrir a versão React, entre na pasta `my-react-app` e execute `npm install` e `npm run dev`. Os cadastros para teste estão no [README principal](../README.md#como-executar). Os pedidos, chamados e anexos criados no teste ficam disponíveis até sair da conta ou recarregar a página.
