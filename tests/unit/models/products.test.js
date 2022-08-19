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

    const fakeProductsById = [
      {
        id: 1,
        name: "Martelo de Thor",
      },
    ];

    const newProduct = {
      name: "Mascara do Sandman",
    };

    const product = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: "",
      serverStatus: 2,
      warningStatus: 0,
    };

    const updateProduct = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: "Rows matched: 1  Changed: 0  Warnings: 0",
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 0,
    };

    it("Ao consultar todos os produtos você recebe um array com três produtos", async () => {
      sinon.stub(connection, "query").resolves([fakeProducts]);

      const balance = await productsModel.getAll();
      expect(balance).to.be.all.an("array");
      expect(balance.length).to.be.equal(3);
    });

    it("Ao consultar uma rota passando um id recebe o item com o id expecifico", async () => {
      sinon.stub(connection, "query").resolves([fakeProductsById]);

      const balance = await productsModel.getById(1);
      expect(balance).to.be.all.keys("id", "name");
      expect(balance.id).to.be.equal(1);
      expect(balance.name).to.be.equal("Martelo de Thor");
    });

    it("consegue criar um novo produto", async () => {
      sinon.stub(connection, "query").resolves([product]);

      const balance = await productsModel.create(newProduct);
      expect(balance).to.be.all.keys(
        "fieldCount",
        "affectedRows",
        "insertId",
        "info",
        "serverStatus",
        "warningStatus"
      );
      expect(balance.insertId).to.be.equal(0);
    });
    it("verifica se é possivel atualizar o nome dos produtos", async () => {
      sinon.stub(connection, "query").resolves([updateProduct]);

      const balance = await productsModel.updateProduct({
        id: 1,
        name: "Martelo de Thor",
      });
      expect(balance).to.be.all.keys(
        "fieldCount",
        "affectedRows",
        "insertId",
        "info",
        "serverStatus",
        "warningStatus",
        "changedRows"
      );
      expect(balance.affectedRows).to.be.equal(1);
    });
  });
});
