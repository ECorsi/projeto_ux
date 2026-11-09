# Projeto de Experiência do Usuário

**Central do Motorista**

Desenvolvi este projeto individualmente para a disciplina de Experiência do Usuário (CCP310) do curso de Ciência da Computação do Centro Universitário FEI, sob orientação do Prof. Dr. Fagner de Assis Moura Pimentel.

**Aluno:** Enzio Santos Corsi

## Conhecendo o problema

A ideia veio da minha experiência e convivência diária com manutenção preventiva e corretiva na locação de equipamentos. Quis trazer esse acompanhamento para quem aluga um carro para trabalhar. Durante a locação, o motorista precisa saber quando fazer a próxima revisão, como avisar quando aparece um problema e onde encontrar o registro do que aconteceu com o veículo, obviamente de uma forma extremamente simples.

Desenvolvi a **Central do Motorista** para reunir essas informações em um só lugar. Meu público principal é o motorista de aplicativo que aluga o carro em nome próprio. Também considerei o funcionário que usa um carro alugado pela empresa e cuida dele no dia a dia.

Pensei no uso pelo celular, com o carro parado. Por exemplo, antes de sair para trabalhar, o motorista pode consultar a próxima revisão e pedir um horário que caiba na rotina. Se aparecer um problema, ele pode avisar a locadora e acompanhar o atendimento. Na devolução, o histórico ajuda a conferir o que foi registrado caso surja uma dúvida sobre uma avaria ou cobrança.

### O que dá para fazer no aplicativo

- **Acesso** — escolher o tipo de locação (PF ou PJ) e entrar com a placa e o CPF do motorista vinculados ao mesmo cadastro.
- **Início** — ver os dados do veículo, consultar o prazo da próxima revisão e abrir um chamado pelo atalho.
- **Manutenção** — solicitar um agendamento com data e horário de preferência e conferir se o pedido está pendente ou confirmado.
- **Chamados** — descrever um problema ou avaria, anexar fotos e acompanhar o status e a orientação da locadora. Ao registrar o chamado, o protótipo gera a ordem de serviço vinculada.
- **Histórico** — pesquisar ordens de serviço por tipo e período e consultar a data de abertura, as etapas, as fotos e as observações.

### Tecnologias e ferramentas

Usei o Google Forms para aplicar o questionário e registrar as entrevistas. Desenhei as primeiras telas no papel e montei o protótipo de alta fidelidade no Figma. No código, comecei com HTML, CSS e JavaScript e depois passei as telas para React com Vite, foi bastante desafiador pois nunca tive contato.

## Desenvolvimento

### Descoberta

- [Análise de Concorrência](docs/1_concorrencia.md)
- [Pesquisa e Coleta de Dados com Usuários](docs/2_pesquisa_usuarios.md)
- [Perfil do Usuário](docs/3_perfil_usuario.md)
- [Personas](docs/4_personas.md)
- [Cenário de Análise/Problema](docs/5_cenarios.md)

### Definição

- [Análise de Tarefas](docs/6_analise_tarefas.md)
- [Requisitos de UX e Metas de Usabilidade](docs/7_requisitos_ux.md)
- [Arquitetura de Informação e Fluxo do Usuário](docs/8_arquitetura_fluxo.md)

### Prototipação

- [Prototipação em Papel](docs/9_prototipacao_papel.md)
- [Prototipação de Alta Fidelidade (Figma)](docs/10_prototipacao_figma.md)

### Avaliação

- [Planejamento da Avaliação](docs/11_planejamento_avaliacao.md)
- [Avaliação de Usabilidade através de Inspeção Heurística](docs/12_heuristica.md)
- [Teste de Usabilidade com Observação do Usuário](docs/13_teste_usabilidade.md)

Fiz a inspeção heurística individualmente. O teste de observação está planejado e ainda precisa ser aplicado.

## Como executar

Com o Node.js e o npm instalados, abra o terminal na pasta principal do projeto e execute os comandos abaixo.

```bash
cd my-react-app
npm install
npm run dev
```

Para testar, use a placa fictícia `ABC1D23` e escolha um dos cadastros abaixo.

| Tipo de locação | Motorista | CPF fictício |
| --- | --- | --- |
| PF — em meu nome | Marcos | `111.111.111-11` |
| PJ — pela empresa | Daniel | `222.222.222-22` |

O acesso, os pedidos e o atendimento da locadora são simulados. Os registros criados durante a demonstração ficam disponíveis até sair da conta ou recarregar a página, pela complexidade do projeto, optei por não criar um banco para armazenar os dados dos teste realizado.
