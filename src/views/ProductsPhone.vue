<template>
  <main class="container">
    <h1>手機產品</h1>
    <button type="button" class="btn btn-outline-dark btn-add" @click="openModal" style="  position: absolute;
  top: 75px;
  right: 65px;
  margin: 10px;
  /* 调整按钮与表格的间距 */
  border: 2px solid black;">新增</button> <!-- 移到表格外部 -->
    <input type="text" v-model="searchTerm" class="form-control" placeholder="搜尋產品">

    <div class="table-frame">
      <table class="table table-hover">
        <thead >
          <tr class="text-center">
            <th scope="col">產品編號</th>
            <th scope="col">產品名稱 </th>
            <th scope="col">價格(元)</th>
            <th scope="col">容量</th>
            <th scope="col">螢幕尺寸</th>
            <th scope="col">更新時間</th>
            <!-- <th scope="col">修改日期</th> -->
            <th scope="col">樣式</th>
            <th scope="col">修改</th>
            <th scope="col">下(上)架</th>
            <th scope="col">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredProducts" :key="index" class="text-center" valign="middle">
            <td>{{ product.productId }}</td>
            <td>{{ product.productName }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.capacity }}</td>
            <td>{{ product.size }}</td>
            <td>{{ formatDate(product.modifyDate) }}</td>
            <!-- <td>{{ formatDate(product.modifyDate) }}</td> -->
            <td>
              <button @click="redirectToSpec(product)">
                <i class="fas fa-list"></i>
              </button>
              <!-- <span>樣式</span> -->
            </td>

            <td>
              <button @click="openChangeModal(product)" class="actionButton">
                <i class="fas fa-pen"></i>
              </button>
            </td>
            <td>
              <button v-if="product.salesStatus === 0" @click="changeSalesStatus(product.productId)"
                class="actionButton">
                <i class="fa-solid fa-rotate-right"></i>
              </button>
              <button v-else @click="changeSalesStatus(product.productId)" class="actionButton">
                <i class="fas fa-xmark"></i>
              </button>
            </td>
            <td>
              <button @click="deletedProduct(product)" class="actionButton ">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>



  </main>
  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="myModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增手機</h5>
          <button type="button" class="close" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="productId">產品編號:</label>
              <input type="text" class="form-control" id="productId" v-model="NewProduct.productId">
            </div>
            <div class="form-group">
              <label for="productName">產品名稱:</label>
              <input type="text" class="form-control" id="productName" v-model="NewProduct.productName">
            </div>
            <div class="form-group">
              <label for="productDescription">產品特性:</label>
              <input type="text" class="form-control h-200" id="productDescription"
                v-model="NewProduct.productDescription">
            </div>
            <div class="form-group">
              <label for="price">價格(元):</label>
              <input type="text" class="form-control" id="price" v-model="NewProduct.price">
            </div>
            <div class="form-group">
              <label for="capacity">容量:</label>
              <input type="text" class="form-control" id="capacity" v-model="NewProduct.capacity">
            </div>
            <div class="form-group">
              <label for="size">螢幕尺寸:</label>
              <input type="text" class="form-control" id="size" v-model="NewProduct.size">
            </div>
            <div class="d-flex justify-content-end"> <!-- 新添加的 div -->
              <button type="button" class="transparent-button" @click="demo"></button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
              <button type="submit" class="btn btn-outline-dark ml-2" @click="saveProduct">Save</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="changeModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">修改手機內容</h5>
          <button type="button" class="close" aria-label="Close" @click="closeChangeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="productId">產品編號:</label>
              <input type="text" class="form-control" id="productId" v-model="NewProduct.productId">
            </div>
            <div class="form-group">
              <label for="productName">產品名稱:</label>
              <input type="text" class="form-control" id="productName" v-model="NewProduct.productName">
            </div>
            <div class="form-group">
              <label for="productName">產品特性:</label>
              <input type="text" class="form-control" id="productName" v-model="NewProduct.productDescription">
            </div>
            <div class="form-group">
              <label for="price">價格(元):</label>
              <input type="text" class="form-control" id="price" v-model="NewProduct.price">
            </div>
            <div class="form-group">
              <label for="capacity">容量:</label>
              <input type="text" class="form-control" id="capacity" v-model="NewProduct.capacity">
            </div>
            <div class="form-group">
              <label for="size">螢幕尺寸:</label>
              <input type="text" class="form-control" id="size" v-model="NewProduct.size">
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-secondary" @click="closeChangeModal">Close</button>
              <button type="submit" class="btn btn-outline-dark ml-2" @click="saveProduct">Save</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
console.log(route)
import axios from 'axios';

import MyModal from './Test.vue'
import ChangeModal from './Test.vue'

export default {
  data() {
    return {
      products: [], // 将数据保存在数组中
      MyModal,
      ChangeModal,
      NewProduct: {
        productId: '',
        productName: '',
        productDescription: '',
        price: '',
        capacity: '',
        size: '',
        setupDate: '',
        modifyDate: '',
      },
      searchTerm: '',
      filteredProducts: [],
    };
  },
  watch: {
    searchTerm(newValue) {
      this.search();
      console.log(newValue);
    },
  },
  methods: {
    deletedProduct(product) {
      console.log();
      if (confirm("您確定要刪除這筆產品嗎？")) {
        axios.delete(`${this.API_URL}/products/deleteProduct?productId=${product.productId}`)
          .then(() => {
            this.products = this.products.filter(p => p !== product);
            console.log('刪除成功');
            this.$router.go();
          })
          .catch(error => {
            console.error('Error deleting product:', error);
          });
      }
    },

    redirectToSpec(product) {
      sessionStorage.setItem('productId', product.productId);
      sessionStorage.setItem('x', product.productId);
      sessionStorage.setItem('y', product.productName);
      sessionStorage.setItem('z', product.price);
      this.$router.push({
        path: 'Spec',
        query: {
          x: product.productId,
          y: product.productName,
          z: product.price
        }
      });
    },

    search() {
      // 根據搜索條件過濾產品列表
      if (this.searchTerm.trim() === '') {
        // 如果搜索條件為空，顯示所有產品
        this.filteredProducts = this.products;
        console.log('成功搜尋');
      } else {
        // 否則，過濾產品列表
        this.filteredProducts = this.products.filter(product => {
          const productName = product.productName?.toLowerCase() || '';
          const size = product.size?.toLowerCase() || '';
          const productId = product.productId?.toString() || '';
          const searchTerm = this.searchTerm.toLowerCase();

          return productName.includes(searchTerm) ||
            product.price.toString().includes(searchTerm) ||
            size.includes(searchTerm) ||
            productId.includes(searchTerm);
        });
        console.log(this.filteredProducts);
      }
    },

    saveProduct() {
      // 保存产品前先显示二次确认提示
      if (confirm("您確定要新增這筆產品嗎？")) {
        console.log('New Product:', this.NewProduct);

        axios.post(`${this.API_URL}/products/insertPhone`, this.NewProduct)
          .then(response => {
            this.resetFormData(); // 清空表单数据
            console.log(response.data);
            this.showLoadingAnimation

            setTimeout(() => {
              this.hideLoadingAnimation();
              this.closeModal();
              this.fetchData();
            }, 1000);

          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        // 如果用户取消保存操作，则不执行保存逻辑
        console.log('取消保存');
      }
    },
    saveChangeProduct() {
      if (confirm("您確定要保存這筆產品嗎？")) {
        console.log('New Product:', this.NewProduct);

        axios.put(`${this.API_URL}/products/updateProduct/${this.NewProduct.productId}`, this.NewProduct)
          .then(response => {
            this.resetFormData();
            console.log(response.data);
            this.fetchData();
            this.closeModal();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        console.log('取消保存');
      }
    },
    changeSalesStatus(productId) {
      if (confirm("您確定要更改這筆產品販售狀態嗎？")) { }
      axios.put(`${this.API_URL}/products/productSalesStatus?productId=${productId}`)
        .then(response => {
          console.log(response.data);
          // 成功上下架後重新載入資料，更新產品列表
          // this.fetchData();
          this.$router.go();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    resetFormData() {
      this.NewProduct = {
        productId: '',
        productName: '',
        productDescription: '',
        price: '',
        capacity: '',
        size: '',
        setupDate: '',
        modifyDate: '',
      };
    },
    openModal() {
      this.$refs.myModal.classList.add('show');
      this.$refs.myModal.style.display = 'block';
      document.body.classList.add('modal-open');
    },
    closeModal() {
      this.$refs.myModal.classList.remove('show');
      this.$refs.myModal.style.display = 'none';
      document.body.classList.remove('modal-open');
      this.resetFormData()
    },
    openChangeModal(product) {
      this.$refs.changeModal.classList.add('show');
      this.$refs.changeModal.style.display = 'block';
      document.body.classList.add('modal-open');
      product && (this.NewProduct = product);
    },
    closeChangeModal() {
      this.$refs.changeModal.classList.remove('show');
      this.$refs.changeModal.style.display = 'none';
      document.body.classList.remove('modal-open');
      this.resetFormData()
    },
    formatDate(dateTimeString) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
      };
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString('zh-TW', options);
    },
    showLoadingAnimation() {
      // 創建一個新的<div>元素來顯示等待動畫
      const loadingDiv = document.createElement('div');
      loadingDiv.id = 'loadingDiv';
      loadingDiv.style.position = 'fixed';
      loadingDiv.style.top = '50%';
      loadingDiv.style.left = '50%';
      loadingDiv.style.transform = 'translate(-50%, -50%)';
      loadingDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      loadingDiv.style.padding = '20px';
      loadingDiv.style.borderRadius = '10px';

      // 添加旋轉圖示
      const spinner = document.createElement('div');
      spinner.className = 'spinner-border text-primary';
      spinner.style.width = '3rem';
      spinner.style.height = '3rem';
      spinner.style.display = 'block';
      spinner.style.margin = 'auto';

      // 將旋轉圖示添加到loadingDiv中
      loadingDiv.appendChild(spinner);

      // 將loadingDiv添加到body中
      document.body.appendChild(loadingDiv);
    },

    hideLoadingAnimation() {
      // 從DOM中移除loadingDiv元素
      const loadingDiv = document.getElementById('loadingDiv');
      if (loadingDiv) {
        loadingDiv.parentNode.removeChild(loadingDiv);
      }
    },
    demo(){
      this.NewProduct.productId = 'A1234'
      this.NewProduct.productName = 'iphone 16'
      this.NewProduct.productDescription = '來自未來的新型手機'
      this.NewProduct.price = 39000
      this.NewProduct.capacity = '512G'
      this.NewProduct.size = '6.1吋'
    }
  },
  created() {
    const loggedInMember = sessionStorage.getItem('loggedInMember');
    const loggedInMemberObject = JSON.parse(loggedInMember);
    console.log(loggedInMemberObject);
    if (loggedInMemberObject === null) {
      alert('請先登入');
      this.$router.push('/login');
    } else {
      const role = loggedInMemberObject.authentication;
      console.log(role);
      console.log(role);
      if (role == '1' || role == '0') {
      } else {
        alert('權限不足');
        this.$router.push('/');
      }
    }
    axios.get(`${this.API_URL}/products/getProductByCategoryId?categoryId=A`)
      .then(response => {
        this.products = response.data;
        this.search();
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  },
}
</script>

<style scoped>
.custom-link {
  background-color: transparent;

  color: black;



  display: inline-block;

  position: relative;

  text-decoration: none;

  transition: color 0.3s;


}

.custom-link:hover {
  color: gray;

}

.custom-link b-icon {
  display: block;

  position: absolute;

  top: -10px;

  left: 50%;

  transform: translateX(-50%);

}

.btn-outline-dark {

}

.modal-header {
  position: relative;

}

.close {
  position: absolute;

  top: 10px;

  right: 10px;

}

.table-frame {
  border: 3px solid #ADADAD;
  border-radius: 10px;
  padding: 10px 30px;
}

.table thead th {
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 2;

  background-color: #ffffff;

}

.table tbody td {
  white-space: nowrap;
  vertical-align: bottom;
}


:root {
  --primary-color: #007bff;
}


.table button {
  border: 1px solid #5B5B5B;
  border-radius: 20px;
  padding: 6px 12px;
  background-color: transparent;
  color: #5B5B5B;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}


.table button:hover {
  background-color: #5B5B5B;
  color: #E0E0E0;
}

.table button {
  margin-right: 0px;

}

.actionButton {
  color: black;
  border-color: black;
  transition: color 0.3s, border-color 0.3s;

}

.actionButton:hover {
  color: gray;

}

.actionButton:active {
  color: darkgray;

}
.transparent-button {
  background-color: transparent; /* 背景顏色設為透明 */
  border: none; /* 移除邊框 */
  color: inherit; /* 文字顏色繼承父元素的顏色 */
  cursor: pointer; /* 指示該元素是一個可點擊的按鈕 */
  padding: 8px 16px; /* 添加內邊距，使按鈕更易於點擊 */
  font-size: 16px; /* 設置字體大小 */
  text-decoration: none; /* 移除下劃線 */
  transition: background-color 0.3s ease; /* 添加過渡效果，使按鈕顏色變化更加平滑 */
}

.transparent-button:hover {
  background-color: rgba(0, 0, 0, 0.1); /* 當滑鼠移動到按鈕上時，添加一個淡淡的背景色 */
}

.transparent-button:focus {
  outline: none; /* 移除點擊時的外框線 */
}
</style>
