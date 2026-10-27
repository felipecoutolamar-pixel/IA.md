const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

const tickets = [];
let proximoId = 1;

async function iniciar() {
  let opcao = "";

  while (opcao !== "4") {
    console.log("\n===== SISTEMA DE TICKETS =====");
    console.log("1 - Criar ticket");
    console.log("2 - Listar tickets");
    console.log("3 - Resolver ticket");
    console.log("4 - Sair");

    opcao = await rl.question("Escolha uma opção: ");

    if (opcao === "1") {
      const nome = await rl.question("Nome do cliente: ");
      const canal = await rl.question(
        "Canal (email, chat ou telefone): "
      );
      const descricao = await rl.question(
        "Descrição do problema: "
      );

      if (
        nome.trim() === "" ||
        descricao.trim() === "" ||
        !["email", "chat", "telefone"].includes(
          canal.trim().toLowerCase()
        )
      ) {
        console.log("Erro: verifique os dados informados.");
      } else {
        const ticket = {
          id: proximoId,
          nome: nome.trim(),
          canal: canal.trim().toLowerCase(),
          descricao: descricao.trim(),
          status: "aberto"
        };

        tickets.push(ticket);
        proximoId++;

        console.log("Ticket criado com sucesso!");
        console.log("ID do ticket:", ticket.id);
      }

    } else if (opcao === "2") {
      if (tickets.length === 0) {
        console.log("Nenhum ticket cadastrado.");
      } else {
        for (const ticket of tickets) {
          console.log("\n--------------------");
          console.log("ID:", ticket.id);
          console.log("Cliente:", ticket.nome);
          console.log("Canal:", ticket.canal);
          console.log("Descrição:", ticket.descricao);
          console.log("Status:", ticket.status);
        }
      }

    } else if (opcao === "3") {
      const id = Number(
        await rl.question("Digite o ID do ticket: ")
      );

      const ticket = tickets.find(
        (item) => item.id === id
      );

      if (!ticket) {
        console.log("Ticket não encontrado.");
      } else if (ticket.status === "resolvido") {
        console.log("Esse ticket já foi resolvido.");
      } else {
        ticket.status = "resolvido";
        console.log("Ticket resolvido com sucesso!");
      }

    } else if (opcao === "4") {
      console.log("Programa encerrado.");

    } else {
      console.log("Opção inválida!");
    }
  }

  rl.close();
}

iniciar();
