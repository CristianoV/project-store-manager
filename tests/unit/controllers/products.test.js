const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require("../../../services/productsServices");
const productsController = require("../../../controllers/productsControllers");
// const { func } = require("joi");

describe("Teste Controllers Products", () => {
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

  const fakeProduct = [
    {
      id: 1,
      name: "Martelo de Thor",
    },
  ];

  describe("exibição de produtos", () => {
    it("Total: recebe todos os produtos", async () => {
      sinon
        .stub(productsService, "getProducts")
        .resolves({ data: fakeProducts, code: 200, message: null });

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      await productsController.getProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(fakeProducts)).to.be.true;
      expect(res.json.args[0][0]).to.be.equal(fakeProducts);
    });
    it("expecifico: recebe um produto", async () => {
      sinon
        .stub(productsService, "getProductsById")
        .resolves({ data: fakeProduct, code: 200, message: null });

      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      await productsController.getProductsById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(fakeProduct)).to.be.true;
      expect(res.json.args[0][0]).to.be.equal(fakeProduct);
    });
  });
});
