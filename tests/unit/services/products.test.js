const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/ProductsModels");
const productsService = require("../../../services/productsServices");

describe("Teste Service Products", () => {
  beforeEach(sinon.restore);

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

  describe("Exibição de produtos", () => {
    it("Requisição de todos os produtos", async () => {
      sinon.stub(productsModel, "getAll").resolves(fakeProducts);

      const buy = await productsService.getProducts();

      expect(buy.data).to.be.equal(fakeProducts);
      expect(buy.code).to.be.equal(200);
    });

    it("Requisição de um produto", async () => {
      sinon.stub(productsModel, "getById").resolves(fakeProducts[0]);

      const buy = await productsService.getProductsById(1);

      console.log(buy);

      expect(buy.data).to.be.equal(fakeProducts[0]);
      expect(buy.code).to.be.equal(200);
    });
  });
});
