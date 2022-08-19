const sinon = require("sinon");
const { expect } = require("chai");
const productsSaleModel = require("../../../models/ProductsSaleModels");
const productsSaleService = require("../../../services/productsSaleServices");

describe("Exibição de vendas", () => {
  beforeEach(sinon.restore);
  const fakeProducts = [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ];

  const id = 4;

  const sale = {
    id: 4,
    itemsSold: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ],
  };

  saleId = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 4,
    info: "",
    serverStatus: 2,
    warningStatus: 0,
  };

  const allSales = [
    {
      saleId: 1,
      date: "2022-08-19T03:18:11.000Z",
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date: "2022-08-19T03:18:11.000Z",
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date: "2022-08-19T03:18:11.000Z",
      productId: 3,
      quantity: 15,
    },
  ];

  const saleExpecificId = [
  {
    sale_id: 4,
    date: '2022-08-19T03:18:11.000Z',
    productId: 1,
    quantity: 5
  },
  {
    sale_id: 4,
    date: '2022-08-19T03:18:11.000Z',
    productId: 2,
    quantity: 10
  }
]

  describe("Criação de vendas", () => {
    it("cria vendas novas com exito", async () => {
      sinon.stub(productsSaleModel, "saleProductsModel").resolves(saleId);
      sinon.stub(productsSaleModel, "SaleProductsIdModel").resolves(sale);

      const buy = await productsSaleService.saleProducts(fakeProducts, id);

      expect(buy.data.id).to.be.equal(4);
      // expect(buy.data.itemsSold).to.be.equal([
      //   { productId: 1, quantity: 1 },
      //   { productId: 2, quantity: 5 },
      // ]);
      expect(buy.code).to.be.equal(201);
    });
  }),
    describe("exibição de vendas", () => {
      it("exibe todas as vendas", async () => {
        sinon
          .stub(productsSaleModel, "saleAllProductsModel")
          .resolves(allSales);

        const buy = await productsSaleService.saleAllProducts();

        expect(buy.data).to.be.equal(allSales);
        expect(buy.code).to.be.equal(200);
      });
      it("exibe uma venda expecifica", async () => {
        sinon
          .stub(productsSaleModel, "saleSpecificId")
          .resolves(saleExpecificId);

        const buy = await productsSaleService.saleSpecificId(id);

        expect(buy.data).to.be.equal(saleExpecificId);
        expect(buy.code).to.be.equal(200);
      });
    });
});
