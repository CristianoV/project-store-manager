const sinon = require("sinon");
const { expect } = require("chai");
const salesModel = require("../../../models/ProductsSaleModels");
const connection = require("../../../models/connection");

describe("Teste Model sales", () => {
  beforeEach(sinon.restore);

  describe("Consultas de vendas", () => {
    const fakeSale = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 1,
      info: "",
      serverStatus: 2,
      warningStatus: 0,
    };

    const fakeSaleProducts = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: "",
      serverStatus: 2,
      warningStatus: 0,
    };
    const fakeProducts = [
      {
        productId: 1,
        sale_id: 1,
        quantity: 1,
      },
    ];

    const allSales = [
      {
        saleId: 1,
        date: "2022-08-18T19:14:37.000Z",
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: "2022-08-18T19:14:37.000Z",
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: "2022-08-18T19:14:37.000Z",
        productId: 3,
        quantity: 15,
      },
    ];

    const salesForId = [
      {
        saleId: 2,
        date: "2022-08-18T19:14:37.000Z",
        productId: 3,
        quantity: 15,
      },
    ];

    it("ao criar uma venda nova, Um novo id é Criado", async () => {
      sinon.stub(connection, "query").resolves([fakeSale]);

      const balance = await salesModel.saleProductsModel();

      expect(balance).to.be.all.keys(
        "fieldCount",
        "affectedRows",
        "insertId",
        "info",
        "serverStatus",
        "warningStatus"
      );
      expect(balance).to.be.all.an("object");
      expect(balance.insertId).to.be.equal(1);
    });

    it("ao criar uma venda nova, adiciona todos os produtos ", async () => {
      sinon.stub(connection, "query").resolves([fakeSaleProducts]);

      const balance = await salesModel.SaleProductsIdModel(fakeProducts);
      expect(balance).to.be.all.an("object");
      expect(balance.insertId).to.be.equal(0);
    });

    it("Lista todas as vendas", async () => {
      sinon.stub(connection, "query").resolves([allSales]);

      const balance = await salesModel.saleAllProductsModel();
      expect(balance).to.be.all.an("array");
      expect(balance).to.be.equal(allSales);
    });
    it("Lista todas as vendas de um id especifico", async () => {
      sinon.stub(connection, "query").resolves([salesForId]);

      const balance = await salesModel.saleSpecificId(2);
      expect(balance).to.be.all.an("array");
      expect(balance).to.be.equal(salesForId);
    });
  });
});
