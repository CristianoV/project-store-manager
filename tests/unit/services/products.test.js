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

  const product = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: "",
    serverStatus: 2,
    warningStatus: 0,
  };

  const ResultSetHeader = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: "Rows matched: 1  Changed: 0  Warnings: 0",
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0,
  };

  const productUpdate = { id: 1, name: "Mascara do Sandman" };

  const productCode = {
    code: 201,
    data: { id: 0, name: "Mascara do Sandman" },
  };

  const failedUpdate = { code: 404, data: { message: "Product not fd" } };

  describe("Exibição de produtos", () => {
    it("Requisição de todos os produtos", async () => {
      sinon.stub(productsModel, "getAll").resolves(fakeProducts);

      const buy = await productsService.getProducts();

      expect(buy.data).to.be.equal(fakeProducts);
      expect(buy.code).to.be.equal(200);
    });
  });

  describe("Produto por id", () => {
    it("Requisição de um produto com exit", async () => {
      sinon.stub(productsModel, "getById").resolves(fakeProducts[1]);

      const buy = await productsService.getProductsById(2);
      expect(buy.data).to.be.equal(fakeProducts[1]);
      expect(buy.code).to.be.equal(200);
    });
    it("Requisição de um produto sem exito", async () => {
      sinon.stub(productsModel, "getById").resolves();

      const buy = await productsService.getProductsById(2);
      expect(buy.data.message).to.be.equal("Product not found");
      expect(buy.code).to.be.equal(404);
    });
  });
  describe("Criação de produto", () => {
    it("Criação de um produto com exito", async () => {
      sinon.stub(productsModel, "create").resolves(product);

      const buy = await productsService.createProduct("Mascara do Sandman");
      expect(buy.data.name).to.be.equal(productCode.data.name);
      expect(buy.data.id).to.be.equal(productCode.data.id);
      expect(buy.code).to.be.equal(201);
    }),
      it("Criação de um produto sem nome", async () => {
        sinon.stub(productsModel, "create").rejects();

        const buy = await productsService.createProduct();
        expect(buy.data.message).to.be.equal('"name" is required');
        expect(buy.code).to.be.equal(400);
      }),
      it("Criação de um produto com nome menor que 5 digitos", async () => {
        sinon.stub(productsModel, "create").rejects();

        const buy = await productsService.createProduct([{ name: "pote" }]);
        expect(buy.data.message).to.be.equal(
          '"name" length must be at least 5 characters long'
        );
        expect(buy.code).to.be.equal(422);
      });
    describe("atualização de produto", () => {
      it("Atualização de produtos com exito", async () => {
        sinon.stub(productsModel, "getById").resolves('existe');
        sinon.stub(productsModel, "updateProduct").resolves(ResultSetHeader);

        const buy = await productsService.updateProduct(
          productUpdate
        );

        expect(buy.data).to.be.equal(productUpdate);
        expect(buy.code).to.be.equal(200);
      });
      it("Atualização de produtos com falha", async () => {
        sinon.stub(productsModel, "getById").resolves();

        const buy = await productsService.updateProduct(productUpdate);

        expect(buy.data.message).to.be.equal("Product not found");
        expect(buy.code).to.be.equal(failedUpdate.code);
      });
    });
  });
});
