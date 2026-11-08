# Arquitetura de Informação e Fluxo do Usuário

Organizei as telas a partir das [tarefas principais](6_analise_tarefas.md) e das [metas de usabilidade](7_requisitos_ux.md). Quero que Marcos e Daniel consigam ver quando é a próxima revisão, avisar sobre um problema e encontrar o retorno sem precisar procurar em vários lugares.

## 1) Arquitetura de Informação (Sitemap)

```mermaid
flowchart TD
    AC["Acesso · tipo de locação, placa e CPF"] --> V{"Placa e CPF vinculados ao tipo informado?"}
    V -- Sim --> APP["Aplicativo · veículo e perfil vinculados"]
    V -- Não --> ER["Acesso não liberado"] --> AC
    APP --> IN["Início · resumo do veículo"]
    APP --> MA["Manutenção"]
    APP --> CH["Chamados"]
    APP --> HI["Histórico"]
    MA --> REV["Próxima revisão"]
    MA --> PED["Solicitações de agendamento"]
    REV --> SOL["Solicitar agendamento"]
    PED --> DET["Detalhe da solicitação"]
    CH --> NOVO["Novo chamado"]
    CH --> CASO["Detalhe do chamado"]
    HI --> REG["Detalhe do registro de manutenção"]
    HI --> CASO
    IN -. Atalho .-> REV
    IN -. Atalho .-> NOVO
```

| Área | O que vou mostrar |
| --- | --- |
| **Acesso** | Seleção **PF** (locação em nome próprio) ou **PJ** (carro alugado pela empresa), seguida de placa e CPF do motorista nos dois casos. O registro fictício da locadora confirma o vínculo, o veículo e o perfil. Com os dados correspondentes, a pessoa entra no **Início**; sem vínculo, fica na entrada. |
| **Início** | Veículo em uso, resumo da próxima revisão e atalho **Reportar problema**. |
| **Manutenção** | Prazo da próxima revisão, formulário de solicitação e lista de pedidos com a situação de cada um. |
| **Chamados** | Ação **Novo chamado**, lista e detalhe com destinatário, situação e orientação disponível. |
| **Histórico** | Registros da locação por data. A tela abre o detalhe da manutenção ou o mesmo detalhe do chamado que já existe em **Chamados**. |

Coloquei a revisão e o atalho de chamado no **Início** porque foram pontos de dificuldade na pesquisa. Separei **Chamados** de **Histórico** para facilitar dois usos: acompanhar um atendimento agora e recuperar um registro mais tarde, por exemplo na devolução. As duas áreas levam ao mesmo detalhe quando mostram o mesmo chamado.

## 2) Fluxo do Usuário (User Flow)

### 2.1) Consultar a próxima revisão

**Objetivo:** Marcos e Daniel querem saber quando precisam fazer a revisão. Os dois podem tocar no resumo do **Início** ou entrar pela área **Manutenção**.

```mermaid
flowchart TD
    A["Início · tocar na próxima revisão"] --> C["Abrir Próxima revisão"]
    B["Manutenção · escolher Próxima revisão"] --> C
    C --> D{"Carregou?"}
    D -- Não --> E["Avisar que não carregou · Tentar novamente"] --> C
    D -- Sim --> F{"Há prazo registrado?"}
    F -- Não --> G["Mostrar Prazo não informado"]
    F -- Sim --> H["Mostrar data ou quilometragem, conforme o registro"]
    H --> I["Prazo consultado"]
    I -. Se quiser marcar .-> J["Solicitar agendamento · fluxo 2.2"]
```

### 2.2) Solicitar agendamento e verificar a confirmação

**Objetivo:** solicitar um horário e saber se a locadora confirmou. Marcos escolhe um horário que caiba entre as corridas; Daniel considera os deslocamentos da empresa. Os dois recebem a confirmação da locadora.

```mermaid
flowchart TD
    A["Próxima revisão · Solicitar agendamento"] --> B["Escolher data e horário desejados"]
    B --> C{"Data e horário preenchidos?"}
    C -- Não --> D["Indicar o que falta"] --> B
    C -- Sim --> E["Enviar solicitação à locadora"]
    E --> F{"Solicitação registrada?"}
    F -- Não --> G["Avisar que o pedido não foi registrado · Manter os dados"] --> B
    F -- Sim --> H["Mostrar Solicitação registrada · Aguardando confirmação"]
    H --> I["Abrir o pedido em Solicitações de agendamento"]
    I --> J{"A locadora confirmou?"}
    J -- Sim --> K["Mostrar horário confirmado"]
    J -- Ainda não --> L["Mostrar Aguardando confirmação"]
    L -. Consultar mais tarde .-> I
```

O usuário pode voltar direto à lista de solicitações. **Pedido registrado** confirma o envio; **horário confirmado** depende da locadora.

### 2.3) Abrir um chamado corretivo

**Objetivo:** registrar o que aconteceu com o carro e verificar se o chamado foi recebido pelo sistema. Marcos vê **Locadora** como destinatário. Daniel **escolhe entre Empresa e Locadora** antes de enviar.

```mermaid
flowchart TD
    A["Início · Reportar problema"] --> C["Abrir Novo chamado"]
    B["Chamados · Novo chamado"] --> C
    C --> D["Descrever o problema"]
    D --> E{"Qual é o perfil?"}
    E -- Marcos --> F["Mostrar Locadora como destinatário"]
    E -- Daniel --> G["Escolher Empresa ou Locadora"]
    F --> H["Conferir o relato e o destinatário"]
    G --> H
    H --> I{"Descrição e destinatário completos?"}
    I -- Não --> J["Indicar o que falta · Manter o que foi preenchido"] --> D
    I -- Sim --> K["Enviar chamado"]
    K --> L{"Chamado registrado?"}
    L -- Não --> M["Avisar que o chamado não foi registrado · Permitir nova tentativa"] --> H
    L -- Sim --> N["Mostrar confirmação de registro e destinatário"]
    N -. Ver chamado .-> O["Detalhe do chamado · fluxo 2.4"]
```

### 2.4) Consultar o andamento do chamado

**Objetivo:** descobrir a situação atual e o que fazer em seguida. O detalhe mostra o destinatário do relato e o retorno que estiver disponível.

```mermaid
flowchart TD
    A["Chamados · selecionar um chamado"] --> C["Abrir Detalhe do chamado"]
    B["Confirmação de envio · Ver chamado"] --> C
    C --> D{"Carregou?"}
    D -- Não --> E["Avisar que não carregou · Tentar novamente"] --> C
    D -- Sim --> F["Mostrar destinatário e situação atual"]
    F --> G{"Há orientação registrada?"}
    G -- Sim --> H["Ler a orientação e identificar o próximo passo"]
    G -- Não --> I["Mostrar que ainda não há orientação"]
    I -. Consultar mais tarde .-> C
```

Se não houver chamados na lista, a tela informa isso e oferece **Novo chamado**. O atalho após o envio evita que o usuário tenha de voltar à lista para ver o chamado que acabou de abrir.

### 2.5) Recuperar um registro no histórico

**Objetivo:** encontrar a data e os detalhes de um registro anterior, por exemplo quando surge uma dúvida na devolução. O usuário pode procurar na lista ou filtrar por tipo ou período.

```mermaid
flowchart TD
    A["Abrir Histórico do veículo"] --> B{"Carregou?"}
    B -- Não --> C["Avisar que não carregou · Tentar novamente"] --> A
    B -- Sim --> D["Mostrar registros em ordem de data"]
    D --> E{"Encontrou o registro?"}
    E -- Não --> F["Ajustar tipo ou período"] --> G{"Há resultados?"}
    G -- Sim --> D
    G -- Não --> H["Informar que não há registros para a busca"] --> F
    E -- Sim --> I["Abrir o detalhe da manutenção ou do chamado"]
    I --> J["Conferir data e informações registradas"]
```

## Primeiros passos da prototipação

Vou começar por **Acesso** e **Início**. Em seguida, vou desenhar **Próxima revisão**, **Solicitar agendamento**, **Detalhe da solicitação**, **Novo chamado**, **Lista e detalhe de chamados** e **Histórico**. Nas primeiras versões, vou representar também os estados que fazem diferença: **acesso não liberado**, **aguardando confirmação**, **confirmado**.
