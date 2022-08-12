const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/ProductsModels");
const connection = require("../../../models/connection");

describe("Teste Model products", () => {
  beforeEach(sinon.restore);

  describe("Consultas de produtos", () => {
    const fakeProducts = [
      {
        id: 1,
        name: "Martelo de Thor",
      },
      {
        id: 2,
        name: "Traje de encolhimento",
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
      },
    ];

    it("Ao consultar todos os produtos você recebe um array com três produtos", async () => {
      sinon.stub(connection, "execute").resolves([[fakeProducts]]);

      const balance = await productsModel.getAll();
      expect(balance).to.be.all.an("array");
      expect(balance.length).to.be.equal(3);
    });

      it("Ao consultar uma rota passando um id recebe o item com o id expecifico", async () => {
        sinon.stub(connection, "execute").resolves([[fakeProducts]]);

        const balance = await productsModel.getById(1);
        expect(balance).to.be.all.keys("id", "name");
        expect(balance.id).to.be.equal(1);
        expect(balance.name).to.be.equal("Martelo de Thor");
      });
    });
});
