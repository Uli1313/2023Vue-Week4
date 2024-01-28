export default {
  props: ["pagination", "getProductData"],
  template: /*html*/ `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li
      class="page-item"
      :class="{'disabled': pagination.current_page === 1}"
    >
      <a
        class="page-link"
        href="#"
        aria-label="Previous"
        @click.prevent="getProductData(pagination.current_page -1)"
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li
      v-for="page in pagination.total_pages"
      :key="page + 123"
      class="page-item"
      :class="{'active': page === pagination.current_page}"
    >
      <a
        class="page-link"
        href="#"
        @click.prevent="getProductData(page)"
        >{{ page }}</a
      >
    </li>
    <li
      class="page-item"
      :class="{'disabled': pagination.current_page === pagination.total_pages}"
    >
      <a
        class="page-link"
        href="#"
        aria-label="Previous"
        @click.prevent="getProductData(pagination.current_page + 1)"
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
};
