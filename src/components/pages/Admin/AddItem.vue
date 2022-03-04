<template>
  <div class="m-4 flex space-x-4">
    <div class="flex rounded-lg overflow-hidden">
      <img
        class="h-64 w-64 object-center object-cover group-hover:opacity-75"
      />
    </div>

    <div class="flex-1">
       <div class="mt-2">
        <span class="inline-block mr-4 mt-2 w-32">Product ID </span>
        <InputText
          class="inline-block p-inputtext-sm"
          type="text"
          placeholder="Product ID"
          v-model="product_id"
        />
      </div>
       
      <div class="mt-2">
        <span class="inline-block mr-4 mt-2 w-32"> Name </span>
        <InputText
          class="inline-block p-inputtext-sm"
          type="text"
          placeholder="Name"
          v-model="name"
        />
      </div>
      <div class="inline-block bg-red-500 mt-2">
        <span class="inline-block mr-4 mt-2 w-32"> Description </span>
      </div>
      <div class="inline-block bg-blue-600 mt-2">
        <TextArea
          v-model="description"
          :autoResize="true"
          placeholder="Description"
          rows="5"
          cols="30"
        />
      </div>
      <div class="mt-2">
        <span class="inline-block mr-4 mt-2 w-32"> Category </span>
        <InputText
          class="inline-block p-inputtext-sm"
          type="text"
          placeholder="Category"
          v-model="category_id"
        />
      </div>
       <div class="mt-2">
        <span class="inline-block mr-4 mt-2 w-32"> Sub Category </span>
        <InputText
          class="inline-block p-inputtext-sm"
          type="text"
          placeholder="Category"
          v-model="sub_category_id"
        />
      </div>
      <div class="mt-2">
        <span class="inline-block mr-4 w-32"> Price </span>
        <InputText
          class="p-inputtext-sm"
          type="text"
          placeholder="Price"
          v-model="netprice"
        />
      </div>
        <div class="mt-2">
        <span class="inline-block mr-4 w-32"> VAT Category </span>
        <InputText
          class="p-inputtext-sm"
          type="text"
          placeholder="VAT Category"
          v-model="vat_id"
        />
      </div>

      <div class="mt-4">
        <span class="inline-block mr-4 w-32"> Options </span>
        <Chips v-model="options" />
      </div>

      <div class="mt-4">
        <span class="inline-block mr-4 w-32"> Thumbnail </span>
        <div class="inline-block">
           <InputText
          class="p-inputtext-sm"
          type="text"
          placeholder="Thumbnail"
          v-model="thumbnail"
        />
          <FileUpload
            class="inline-block"
            name="demo[]"
            url="./upload.php"
         
            :multiple="false"
            accept="image/*"
            :maxFileSize="1000000"
          >
            <template #empty>
              <p>Drag and drop files to here to upload.</p>
            </template>
          </FileUpload>
        </div>
      </div>

      <button
        class="bg-gray-800 rounded text-white pr-2 pl-2 pt-1 pb-1"
        @click="addItem"
      >
        Add Item
      </button>
    </div>
  </div>
</template>



<script>
import Chips from "primevue/chips";
import InputText from "primevue/inputtext";
import TextArea from "primevue/textarea";
import FileUpload from "primevue/fileupload";
import { addProduct } from "../../../../api/products/products-api.js";


export default {
  components: {
    //   SelectButton,
    InputText,
    TextArea,
    Chips,
    FileUpload,
  },
  data() {
    return {
      site_id: process.env.VUE_APP_SITEID,
      product_id: null,
      name: null,
      description: null,
      category_id: null,
      sub_category_id: null,
      netprice: null,
      vat_id: null,
      thumbnail: null,
      options: null,
    };
  },
  async created() {
  console.log(this.site_id)
  },
  methods: {
    // onUpload(file) {
    //   this.$toast.add({
    //     severity: "info",
    //     summary: "Success",
    //     detail: "File Uploaded",
    //     life: 3000,
    //   });
       
    //   // Handle files like:
    //   this.thumbnail = file
    
    // },
    async addItem() {
 
      const result = await addProduct({
        product_id: parseInt(this.product_id),
        site_id: this.site_id,
        name: this.name,
        description: this.description,
        category_id: parseInt(this.category_id),
        sub_category_id: parseInt(this.sub_category_id),
        price: {
          netprice: parseInt(this.netprice),
          vat_id: parseInt(this.vat_id)
        },
        images: {
          thumbnail: this.thumbnail,
        },
        options: this.options
      });

      console.log(result.code);
    },
  },
};
</script>