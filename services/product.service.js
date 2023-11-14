const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
//const pool = require('../libs/postgress.pool');
const {models} = require('../libs/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
    //this.pool = pool;  *conexion por medio de pool a la base de datos
    //this.pool.on('error', (err)=> console.log(err)); *conexion por medio de pool a la base de datos
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    /*const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct); //Este codigo era para generar datos aleatorios
    return newProduct;*/

    const newProduct = await models.Product.create(data);
    return newProduct;

  }


  async find() {
    /*const query = 'SELECT * FROM tasks';        //Este codigo era sin tener uso de modelos de sequelize
    //const rta = await this.pool.query(query);
    //const rta = await sequelize.query(query);
    //return rta.rows;
    const [data, metadata] = await sequelize.query(query);
    return {
      data,
      metadata
    }*/

    const products = await models.Product.findAll({
      include: ['category']
    }
    );
    return products;

  }



  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
