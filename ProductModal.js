export default {
  props: ["tempProduct", "updateProduct", "createImages"],
  data() {
    return {
      modalProduct: null,
    };
  },
  methods: {
    openModal() {
      this.modalProduct.show();
    },
    closeModal() {
      this.modalProduct.hide();
    },
  },
  template: `<div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <v-form
        v-slot="{ errors }"
        @submit="updateProduct"
        class="modal-content border-0"
      >
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input
                  v-model="tempProduct.imageUrl"
                  id="imageUrl"
                  type="text"
                  class="form-control mb-2"
                  placeholder="請輸入圖片連結"
                />
                <img :src="tempProduct.imageUrl" class="img-fluid" />
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <!-- 有多圖(圖片陣列)時顯示多圖，否則顯示新增圖片 -->
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <div
                  v-for="(image, key) in tempProduct.imagesUrl"
                  :key="key+123"
                  class="mb-1"
                >
                  <div class="mb-3">
                    <label class="form-label"
                      >圖片網址</label
                    >
                    <input                    
                      v-model="tempProduct.imagesUrl[key]"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <img class="img-fluid" :src="image" />
                </div>
                <div
                  v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                    type="button"
                  >
                    新增圖片
                  </button>
                </div>
                <div>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.pop()"
                    type="button"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                  type="button"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <v-field
                  v-model="tempProduct.title"
                  rules="required"
                  name="標題"
                  id="title"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['標題'] }"
                  placeholder="請輸入標題"
                ></v-field>
                <error-message
                  name="標題"
                  class="invalid-feedback text-end"
                ></error-message>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <v-field
                    v-model="tempProduct.category"
                    rules="required"
                    name="分類"
                    id="category"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['分類'] }"
                    placeholder="請輸入分類"
                  ></v-field>
                  <error-message
                    name="分類"
                    class="invalid-feedback text-end"
                  ></error-message>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <v-field
                    v-model="tempProduct.unit"
                    rules="required"
                    name="單位"
                    id="unit"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['單位'] }"
                    placeholder="請輸入單位"
                  ></v-field>
                  <error-message
                    name="單位"
                    class="invalid-feedback text-end"
                  ></error-message>
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <v-field
                    v-model.number="tempProduct.origin_price"
                    rules="required"
                    name="原價"
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    :class="{ 'is-invalid': errors['原價'] }"
                    placeholder="請輸入原價"
                  ></v-field>
                  <error-message
                    name="原價"
                    class="invalid-feedback text-end"
                  ></error-message>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <v-field
                    v-model.number="tempProduct.price"
                    rules="required"
                    name="售價"
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    :class="{ 'is-invalid': errors['售價'] }"
                    placeholder="請輸入售價"
                  ></v-field>
                  <error-message
                    name="售價"
                    class="invalid-feedback text-end"
                  ></error-message>
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  v-model="tempProduct.description"
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  v-model="tempProduct.content"
                  id="content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <!-- 文件要求 is_enabled 是 0 或 1，
                  所以用 true-value / false-value 來設定 checkbox 的值 -->
                  <input
                    v-model="tempProduct.is_enabled"
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="submit" class="btn btn-primary">確認</button>
        </div>
      </v-form>
    </div>
  </div>`,
  mounted() {
    this.modalProduct = new bootstrap.Modal(this.$refs.productModal);
  },
};
