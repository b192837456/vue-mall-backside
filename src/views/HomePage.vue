<template>
   <main>
    <div class="container" style="vertical-align: middle;">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">歡迎來到，後台系統</h2>
              <br/>
              <p class="card-text">這是一個讓您可以輕鬆管理的後台系統。</p>
              <br/>
              <div class="list-group">
                <router-link to="/members" class="list-group-item list-group-item-action">用戶管理</router-link>
                <router-link to="/products" class="list-group-item list-group-item-action">產品管理</router-link>
                <router-link to="/orders" class="list-group-item list-group-item-action">訂單管理</router-link>
                <router-link to="/statistics" class="list-group-item list-group-item-action">統計資料</router-link>
                <router-link to="/feedback" class="list-group-item list-group-item-action">意見回饋</router-link>
                <br/>
                <br/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </main>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    
</style>