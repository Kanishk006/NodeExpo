import mongoose from 'mongoose'

const productSchemaRules = {
  name: {
    type: String,
    required: [true, "Kindly Pass the name"],
    unique: true,
    maxlength: [40, "Your Product name length is more than 40 Characters"]
  },
  price: {
    type: Number,
    required: [true, "Kindly pass the price"],
    validate: {
      validator: function () {
        return this.price > 0;
      },
      message: "Price must be greater than 0"
    }
  },
  categories: {
    type: String,
    required: true
  },
  productImages: {
    type: [String]
  },
  averageRating: Number,
  discountedPrice: {
    type: Number,
    validate: {
      validator: function () {
        return this.discountedPrice < this.price;
      },
      message: "Discount must be less than actual price"
    }
  }
};



const productSchema = new mongoose.Schema(productSchemaRules);

const ProductModel = mongoose.model("productModel", productSchema);

export default ProductModel;