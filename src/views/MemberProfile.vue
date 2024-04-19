<template>
    <main class="container mt-5">
      <div class="row featurette">
        <div class="col-md-3">
          <img src="/user-type-B-04.png" class="w-100" />
        </div>
        <div class="col-md-9">
          <div class="row mt-3">
            <div class="col-3 text-end">會員帳號</div>
            <div class="col">Amy001</div>
          </div>
          <div class="row mt-3">
            <div class="col-3 text-end">姓名</div>
            <div class="col">Amy</div>
          </div>
          <div class="row mt-3">
            <div class="col-3 text-end">Email</div>
            <div class="col">Amy@mail.com</div>
          </div>
          <div class="row mt-3">
            <div class="col-3 text-end">手機號碼</div>
            <div class="col">09xx-xxx-xxx</div>
          </div>
          <div class="row mt-3">
            <div class="col-3 text-end">性別</div>
            <div class="col">
              <label> <input type="radio" name="gender" />男性</label>
              <label> <input type="radio" name="gender" checked />女性</label>
              <label> <input type="radio" name="gender" />其他</label>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-3 text-end">生日</div>
            <div class="col">
              <input type="date" value="1996-01-01" />
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