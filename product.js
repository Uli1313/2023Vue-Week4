import "./validate.js";
import pagination from "./pagination.js";
import ProductModal from "./ProductModal.js";
import DelProductModal from "./DelProductModal.js";

const app = Vue.createApp({
  data() {
    return {
      apiUrl: "https://ec-course-api.hexschool.io/v2",
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
    };
  },
  mounted() {
    // 取得 token 來進行驗證
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)vueWeek3Token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();
  },
  methods: {
    // 驗證 token
    checkLogin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then((res) => this.getProductData())
        .catch((err) => {
          alert(err.data.message);
          window.location = "index.html";
        });
    },
    // 取得產品資料
    getProductData(page = 1) {
      const url = `${this.apiUrl}/api/uli01/admin/products?page=${page}`;
      axios
        .get(url)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 新增 / 編輯產品資料
    updateProduct() {
      // isNew 為 true 時是新增產品
      let url = `${this.apiUrl}/api/uli01/admin/product`;
      let http = "post";

      //  isNew 為 false 時是編輯產品
      if (!this.isNew) {
        url = `${this.apiUrl}/api/uli01/admin/product/${this.tempProduct.id}`;
        http = "put";
      }

      axios[http](url, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.$refs.pModal.closeModal();
          this.getProductData();
        })
        .catch((err) => {
          alert(err.data.message.join(", "));
        });
    },
    // 依照 modal 種類開啟相對應的 modal
    // 並在 tempProduct 帶入相關資料來進行後續的操作
    openModal(type, item) {
      if (type === "new") {
        // 新增產品
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.pModal.openModal();
      } else if (type === "edit") {
        // 編輯產品
        // 拷貝一份讓使用者在編輯中的時候不會直接變動到原本的資料
        // 要深拷貝，因為 imagesUrl 是 tempProduct 裡面的陣列
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.isNew = false;
        this.$refs.pModal.openModal();
      } else if (type === "delete") {
        // 刪除產品
        // 要知道刪除的是哪一個品項，所以透過 item 取得 id
        this.tempProduct = { ...item };
        this.$refs.dModal.openModal();
      }
    },
    // 刪除單一產品
    delProduct() {
      const url = `${this.apiUrl}/api/uli01/admin/product/${this.tempProduct.id}`;
      axios
        .delete(url)
        .then((res) => {
          alert(res.data.message);
          // 隱藏 modal 並重新獲取產品資料
          this.$refs.dModal.closeModal();
          this.getProductData();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 尚無圖片時新增一個陣列
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
  },
  components: {
    pagination,
    ProductModal,
    DelProductModal,
  },
});

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.mount("#app");
