<template>
  <div>
    <!-- 按鈕觸發模態框 -->
    <button @click="openModal" style="background-color: #4CAF50; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">打開 views</button>

    <!-- 模態框 -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content" style="background-color: #fefefe; /* 白色背景 */ margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%;">
        <span class="close" @click="closeModal" style="color: #aaa; float: right; font-size: 28px; font-weight: bold;">&times;</span>
        <!-- 在模態框中顯示 views 組件 -->
        <ViewsComponent />
      </div>
    </div>
  </div>
</template>

<script>
import ViewsComponent from './ViewsComponent.vue'; // 引入 views 組件

export default {
  data() {
    return {
      isModalOpen: false
    };
  },
  components: {
    ViewsComponent // 注冊 views 組件
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    }
  }
}
</script>

<style scoped>
/* 模態框樣式 */
.modal {
  display: none; /* 預設隱藏 */
  position: fixed; /* 固定定位 */
  z-index: 1; /* 設置層級 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4); /* 半透明背景 */
}

.modal-content {
  background-color: #fefefe; /* 模態框內容背景色 */
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
