const db = require('../utils/connectSQL');

class Product {
  constructor(name, price, description, brand, category, image, stock) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.brand = brand;
    this.category = category;
    this.image = image;
    this.stock = stock;
  }

  static async find() {
    const sqlQuery = `SELECT products.*, avg(reviews.rating) as rating, count(reviews.rating) as num_reviews
                      FROM products
                      LEFT JOIN reviews
                      ON products.product_id = reviews.product_id
                      GROUP BY products.product_id
                      `;
    const [products] = await db.execute(sqlQuery);
    return products;
  }

  static async findById(id) {
    const sqlQuery = `SELECT products.*, avg(reviews.rating) as rating, count(reviews.rating) as num_reviews
                      FROM products
                      LEFT JOIN reviews
                      ON products.product_id = reviews.product_id
                      WHERE products.product_id = '${id}'
                      GROUP BY products.product_id`;

    const [product] = await db.execute(sqlQuery);
    return product[0];
  }

  async save() {
    const sqlQuery = `INSERT INTO products (name, price, description, brand, category, image, stock)
                      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [this.name, this.price, this.description, this.brand, this.category, this.image, this.stock];
    return await db.execute(sqlQuery, values);
  }

  async updateOne(product_id) {
    const sqlQuery = `UPDATE products SET
                      name = '${this.name}, 
                      price = '${this.price}, 
                      description = '${this.description}, 
                      brand = '${this.brand}, 
                      category = '${this.category}, 
                      image = '${this.image}, 
                      stock = '${this.stock})
                      WHERE product_id = '${product_id}'`;
    return await db.execute(sqlQuery, values);
  }

  static async deleteOne(id) {
    return await db.execute(`DELETE FROM products WHERE product_id = '${id}'`);
  }
}

module.exports = Product;
