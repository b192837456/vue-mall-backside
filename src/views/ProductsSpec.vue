<template>
  <main class="container">

    <h3>產品編號: {{ x }}<br>產品名稱: {{ y }}<br>售價: {{ z }}</h3>
    <div v-if="showSuccessMessage" class="success-message">
      圖片上傳成功！
    </div>


    <div class="mb-3 d-flex justify-content-center">


      <button @click="openaddModal" class="btn btn-outline-dark">新增樣式</button>
      <button @click="openaddModal" class="btn btn-outline-primary"
        style="background-color: transparent; border-color: transparent; color: transparent;">新</button>

      <button @click="openquantityModal" class="btn btn-outline-dark ml-2 " style="right: 165px;">庫存管理</button>

    </div>
    <div class="table-frame">
      <table class="table table-hover">
        <thead>
          <tr class="text-center">
            <th scope="col">款式編號</th>
            <th scope="col">顏色</th>
            <th scope="col" >庫存</th>


          
            <th scope="col">&nbsp;刪除</th>

            <th scope="col">&nbsp;&nbsp;照片</th>
           
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr>
            <td colspan="3" class="text-center">加载中...</td>
          </tr>
        </tbody>
        <tbody v-else-if="error">
          <tr>
            <td colspan="3" class="text-center">获取数据时出错</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(spec, index) in productSpecs" :key="index" class="text-center">
            <td>{{ spec.specId }}</td>
            <td>{{ spec.color }}</td>
            <td>{{ spec.stockQuantity }}</td>

           
            <td><button @click="deleteProductSpec(spec)" class="btn btn-danger"><i class="fas fa-trash"></i></button>
            </td>
            <!-- <td></td> -->
            <td><button @click="openPhotoModal(spec)" class="btn btn-primary"><i
                  class="fa-regular fa-image"></i></button></td>
          
          </tr>
        </tbody>
      </table>
    </div>



    <!-- Modal -->
    <div class="modal fade" role="dialog" ref="addModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增款式</h5>
            <button type="button" class="close " aria-label="Close" @click="closeaddModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <h4>產品編號: {{ x }}</h4>
              </div>
              <div class="form-group">
                <label for="specId">款式編號:</label>
                <input type="text" class="form-control" id="specId" v-model="NewProductSpec.specId">
              </div>
              <div class="form-group">
                <label for="color">顏色</label>
                <input type="text" class="form-control" id="color" v-model="NewProductSpec.color">
              </div>
              <div class="form-group">
                <label for="stockQuantity">數量</label>
                <input type="text" class="form-control" id="stockQuantity" v-model="NewProductSpec.stockQuantity">
              </div>
              <br>

              <label for="file" >選擇圖片: </label>
              <input type="file" id="file" ref="file" @change="handleFileChange" required>
              
              <br>

              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary" @click="closeaddModal">Close</button>
                <button type="button" class="btn btn-primary ml-2" @click="saveProductSpec">Save</button>
              </div>
            </form>

          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" role="dialog" ref="quantityModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">庫存管理</h5>
            <button type="button" class="close" aria-label="Close" @click="closequantityModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <p>產品編號: </p>
                <select v-model="selectedProductSpec" class="form-control">
                  <option v-for="productSpec in productSpecs" :key="productSpec.specId" :value="productSpec">
                    {{ productSpec.specId }}
                  </option>
                </select>
                <p></p>
              </div>

              <div class="form-group">
                <p>顏色: {{ selectedProductSpec.color }}</p>
              </div>
              <div class="form-group">
                <label for="stockQuantity">數量</label>
                <input type="text" class="form-control" id="stockQuantity" v-model="selectedProductSpec.stockQuantity">
              </div>
              <br />
              <div class="d-flex justify-content-end"> <!-- 新添加的 div -->
                <button type="button" class="btn btn-secondary" @click="closequantityModal">Close</button>
                <button type="submit" class="btn btn-primary ml-2" @click="changProductSpecQuantity">Save</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" role="dialog" ref="photoModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">款式編號: {{ this.photo.specId }}</h5>
            <button type="button" class="close" aria-label="Close" @click="closePhotoModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="`http://localhost:8080/mall/productSpec/photo/${this.photo.specId}`" class="card-img-top"
              alt="Product Image" style="height: 300px; width: 100%; object-fit: contain " />
          <!-- <div v-if="changePhoto == true " style="border: 2px solid black padding: 10px"> -->
            <label v-if="changePhoto == true" for="file">選擇圖片:</label>
            <br/>
            <input v-if="changePhoto == true" type="file" id="file" ref="file" @change="handleFileChange" required>
          <!-- </div> -->
          </div>
          <div class="modal-footer">

            <button v-if="changePhoto == true" type="button" class="btn btn-primary" @click="updatePhoto">Save
              Photo</button>
            <button v-if="changePhoto == false" type="button" class="btn btn-primary" @click="changePhotoAction">Change
              Photo</button>
            <button type="button" class="btn btn-secondary" @click="closePhotoModal">Close</button>
          </div>
        </div>
      </div>
    </div>



  </main>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      specId: '',
      file: null,
      showSuccessMessage: false,
      showErrorMessage: false,
      x: this.$route.query.x,
      y: this.$route.query.y,
      z: this.$route.query.z,
      productSpecs: [],
      loading: false,
      error: false,
      NewProductSpec: {
        
      },
      selectedProductSpec: [],
      newProductId: '',
      specPhoto: [],
      photo: [],
      changePhoto: false,

    };
  },
  created() {

    this.fetchData();
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    print() {
      console.log(sessionStorage.getItem("x"));
    },
    fetchData() {
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
      this.x = sessionStorage.getItem("productId")
      // this.x = sessionStorage.getItem("x")
      this.y = sessionStorage.getItem("y")
      this.z = sessionStorage.getItem("z")
      this.loading = true; // 設置 loading 為 true，顯示“加載中...”的訊息
      axios.get(`${this.API_URL}/products/findProductSpecByProductId?productId=${this.x}`)
        .then(response => {
          this.productSpecs = response.data;
          this.loading = false; // 加載完成後設置 loading 為 false
        })
        .catch(error => {
          console.error('获取产品规格时出错:', error);
          this.loading = false; // 發生錯誤時設置 loading 為 false
          this.error = true; // 設置 error 為 true，顯示錯誤訊息
        });
    },

    openaddModal() {
      this.$refs.addModal.classList.add('show');
      this.$refs.addModal.style.display = 'block';
      // document.body.classList.add('modal-open');
      this.NewProductSpec.specId = this.x;

    },
    closeaddModal() {
      this.$refs.addModal.classList.remove('show');
      this.$refs.addModal.style.display = 'none';
      // document.body.classList.remove('modal-open');
      // this.resetFormData()
    },
    openquantityModal() {
      this.$refs.quantityModal.classList.add('show');
      this.$refs.quantityModal.style.display = 'block';
      // document.body.classList.add('modal-open');

    },
    closequantityModal() {
      this.$refs.quantityModal.classList.remove('show');
      this.$refs.quantityModal.style.display = 'none';
      // document.body.classList.remove('modal-open');
      // this.resetFormData()
    },
    resetFormData() {
      this.NewProductSpec = {
        specId: '',
        color: '',
        stockQuantity: '',
      }
      this.selectedProductSpec = {
        specId: '',
        color: '',
        stockQuantity: '',
      };
    },
    saveProductSpec() {
      this.NewProductSpec.deleted=false;
      console.log(this.NewProductSpec);
   

      if (confirm('確定要新增嗎?')) {
        axios.post(`${this.API_URL}/products/insertProductSpec`, this.NewProductSpec)
          .then(response => {
            console.log("123");

            console.log(response.data);
            // this.uploadPhoto();
            alert("新增成功");

            // this.closeaddModal();
            this.uploadPhoto();

            // this.fetchData();

          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        console.log('取消保存');
      }
    },
    refreshWindow() {
      window.location.reload();
    },
    changProductSpecQuantity() {
      console.log(this.selectedProductSpec);
      if (confirm('確定要修改嗎?')) {

        axios.put(`${this.API_URL}/products/updateProductSpec?specId=${this.selectedProductSpec.specId}&stockQuantity=${this.selectedProductSpec.stockQuantity}`)
          .then(response => {
            console.log(response.data);
            this.closequantityModal();
            this.fetchData();
          })
          .catch(error => {
            console.error('Error:', error);
          })
      } else {
        this.closequantityModal();
        console.log('取消修改');
      }
    },
    deleteProductSpec(spec) {
      if (confirm('確定要刪除嗎?')) {
        axios.delete(`${this.API_URL}/products/deleteProductSpec?specId=${spec.specId}`)
          .then(response => {
            console.log(response.data);
            this.$router.go();
            alert('刪除成功');
            this.fetchData();
          })
          .catch(error => {
            console.error('Error:', error);
            alert('刪除失敗');
          });
      } else {
        console.log('取消刪除');
        alert('已取消刪除');
      }
    },
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    uploadPhoto() {
      let formData = new FormData();
      formData.append('specId', this.NewProductSpec.specId);
      formData.append('file', this.file);

      axios.post(`${this.API_URL}/products/insertProductPhoto`, formData)
        .then(response => {
          console.log(response.data); // Success message from server
          // Show success message
          this.showSuccessMessage = true;
          // Hide success message after 3 seconds
          this.closeaddModal();
          this.fetchData();

          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 1000);
        })
        .catch(error => {
          console.error('There was a problem with the axios operation:', error);
          // Show error message
          this.showErrorMessage = true;
          // Hide error message after 3 seconds
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        });
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

    openPhotoModal(spec) {
      this.photo = spec;
      this.$refs.photoModal.classList.add('show');
      this.$refs.photoModal.style.display = 'block';
    },
    closePhotoModal() {
      this.photo = null;
      this.changePhoto = false;
      this.$refs.photoModal.classList.remove('show');
      this.$refs.photoModal.style.display = 'none';
      this.$router.go();
    },
    changePhotoAction() {
      console.log(this.changePhoto);
      this.changePhoto = true;
      console.log(this.changePhoto);
    },
    updatePhoto() {
      let formData = new FormData();
            formData.append('specId', this.photo.specId);
            formData.append('file', this.file);
      if (confirm('確定要修改嗎?')) {
        axios.put(`${this.API_URL}/products/changeSpecPhoto`, formData).then(response => {
          console.log(response.data);
          this.closePhotoModal();
          this.fetchData();
        
        })
      }
    }
  }
};

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
  position: absolute;
  top: 150px;
  right: 65px;
  margin: 10px;

  border: 2px solid black;
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
</style>
