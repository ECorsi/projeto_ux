1) **Planejamento de Usabilidade (método DECIDE)**

| Etapa | Como vou fazer |
| :---: | :---- |
| **D — Definir os objetivos** | Quero descobrir se os motoristas conseguem localizar a próxima revisão, solicitar um horário, abrir e acompanhar um chamado e recuperar um registro no histórico. Vou observar principalmente se entendem quando precisam esperar a locadora. |
| **E — Explorar as perguntas** | O motorista acha a data da revisão? Depois de enviar um pedido, ele sabe se o horário está confirmado? Ao enviar um chamado, o que faz ele acreditar que o registro foi feito? Ele consegue dizer em que etapa o atendimento está e encontrar a data de um registro antigo? |
| **C — Escolher os métodos** | Vou usar o [Figma](10_prototipacao_figma.md) no teste de usabilidade e na avaliação de comunicabilidade (MAC). No [protótipo em papel](9_prototipacao_papel.md), vou observar como o motorista faz os dois fluxos principais. Também vou usar o papel na inspeção heurística. Cada integrante do grupo fará sua análise separadamente antes da consolidação. Vou combinar a troca de avaliações com outro grupo e preparar os relatórios do nosso trabalho e do trabalho dos colegas. |
| **I — Identificar as questões práticas** | Planejo convidar cinco pessoas, procurando três motoristas de aplicativo que alugam carro e dois funcionários que usam carros alugados pela empresa. Quero reservar de 20 a 25 minutos por sessão no Figma, pelo celular, com o carro parado. Vou fazer um piloto antes da coleta. Na rodada em papel, uma pessoa simula as respostas do app e outra observa e anota. |
| **D — Decidir como lidar com as questões éticas** | Vou explicar o objetivo, pedir o consentimento antes de começar e deixar a pessoa livre para parar. Vou usar placa, documentos e ocorrências fictícias. Vou identificar os registros por código e pedir uma autorização separada se for gravar a tela e a voz para rever a interação no MAC. |
| **E — Avaliar, interpretar e apresentar os resultados** | Vou calcular o percentual de conclusão sem ajuda por tarefa e comparar com a meta de 80% do [documento 7](7_requisitos_ux.md). Vou registrar separadamente os casos concluídos com ajuda, os erros e os abandonos. No MAC, vou reunir as etiquetas por tarefa e participante. Na inspeção, vou consolidar os problemas por gravidade. Vou registrar os ajustes feitos no papel e verificar se a dificuldade reaparece ao repetir a tarefa. |

2) **Lista de Instrumentos**

   1) **Termo de consentimento**

      Estou avaliando o protótipo de um aplicativo para acompanhar a manutenção de um carro alugado. Vou pedir que você realize algumas tarefas e me conte o que entendeu. Vou anotar suas ações e respostas usando um código. Vou usar os registros no trabalho da faculdade. Sua participação é voluntária e você pode parar a qualquer momento. Use os dados fictícios que eu fornecer.

      - [ ] Aceito participar.
      - [ ] Autorizo a gravação da tela e da voz para a análise da sessão.
      - [ ] Prefiro participar com anotações, sem gravação.

      **Código do participante** __________ **Data** __________

   2) **Questionários**

      **Antes do teste**

      - Você usa carro alugado em nome próprio para trabalhar, usa um carro alugado pela empresa ou está em outra situação?
      - Com que frequência você dirige um carro alugado?
      - Como você acompanha a revisão ou avisa quando acontece algum problema com o carro?

      **Depois de cada tarefa**

      - De 1 a 5, quão fácil foi fazer o que eu pedi? **1** é muito difícil e **5** é muito fácil.
      - Em que momento você teve mais dúvida?

      **Ao final**

      - O que você entendeu que aconteceu quando enviou a solicitação de manutenção?
      - Como você soube se o chamado tinha sido registrado?
      - O que você mudaria para facilitar o uso na sua rotina?

   3) **Tabela de Observação**

      Vou começar no Início, com o veículo fictício já vinculado. Vou ler uma situação de cada vez e deixar a pessoa escolher por onde começar. No protótipo, enviar um pedido ou chamado leva de volta à lista. Vou observar se esse retorno é suficiente para a pessoa entender o que aconteceu.

      | Tarefa | Situação que vou ler | O que vou considerar como conclusão |
      | --- | --- | --- |
      | **T1 — Consultar a revisão** | Você quer se organizar para a próxima revisão do carro. Descubra quando ela vence. | Encontra e informa a data que aparece no protótipo. |
      | **T2 — Solicitar manutenção** | Você quer levar o carro para revisão em um dia e horário que caibam na sua rotina. Faça o pedido e diga se já pode contar com o horário. | Envia a solicitação e identifica, pela lista ou pelos detalhes, que ainda aguarda a locadora. |
      | **T3 — Abrir chamado** | Com o carro parado, você quer avisar a locadora que ouviu um barulho ao frear. Registre o que aconteceu. | Indica o relato que registraria, toca em Enviar chamado e explica se o retorno à lista foi suficiente para saber se houve registro. Vou anotar essa compreensão separadamente da execução do envio. |
      | **T4 — Acompanhar chamado** | Você já avisou sobre o barulho ao frear e quer saber se alguém está cuidando do caso e se já existe alguma orientação. | Encontra o chamado, identifica o status exibido e diz se encontrou alguma orientação para agir. |
      | **T5 — Consultar o histórico** | Na devolução, perguntaram quando foi registrada a ordem de serviço do barulho ao frear. Encontre essa data. | Abre a OS correspondente e informa a data de abertura. |

      | Código e perfil | Tarefa | Tempo | Conclusão | Erros ou ajuda | Tela e reação observada | Etiqueta MAC |
      | --- | --- | --- | --- | --- | --- | --- |
      | | | | Sem ajuda / Com ajuda / Não concluiu | | | |

      Vou contar como sucesso para a meta apenas as conclusões sem ajuda. No MAC, vou rever as interações gravadas com autorização e anotar a tela, o momento e o que aconteceu antes de atribuir uma etiqueta. Por exemplo, “E agora?” quando a pessoa termina um passo e não sabe como continuar, ou “Pra mim está bom” quando acredita ter concluído e ainda falta uma ação.

   4) **Formulário de avaliação Heurística**

      Vou pedir que cada avaliador percorra os dois fluxos principais e registre um problema por linha. Os pontos a conferir são retorno do sistema, linguagem do motorista, liberdade para voltar ou cancelar, consistência, prevenção de erros, reconhecimento das opções, atalhos, clareza visual, recuperação de erros e ajuda.

      | Avaliador | Tela e ação | Problema observado | Heurística e justificativa | Tipo | Gravidade | Correção sugerida |
      | --- | --- | --- | --- | --- | --- | --- |
      | | | | | Pontual / Ocasional / Sistemático / Ausente | | |

      Vou classificar a gravidade como cosmética, pequena, grande ou catastrófica. Depois da análise individual, vou agrupar os registros repetidos e discutir com o grupo a gravidade e a prioridade de cada correção.
