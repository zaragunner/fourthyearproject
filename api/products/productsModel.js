import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  product_id: { type: Int, unique: true, required: true},
  site_id: { type: Int, required: true},
  description: {type: String, required: true },
  category_id: { type: Int, required: true},
  sub_category_id: { type: Int, required: true},
  price : {
      netprice : {type: Int, required: true},
      vat_id : {type: Int , required:true},
      discount_price : { type: Int}
  },
  images :{
      thumbnail : { type:String , required: true},
      display_images : { type: Array,  default : []}
  },
  options : {type: Array, default : []}
});

export default mongoose.model('Product', ProductSchema);