<template>
  <br/>
  <br/>
  <br/>
  <br/>
    <div>
    <div class="text-center">
    <a href="javascript: void(0)" class="btn btn-outline-dark btnA" @click="navigateTo('/products/phone')">
    Phone
    <span></span><span></span><span></span><span></span>
    </a>
    </div>
    <div class="text-center">
    <a href="javascript: void(0)" class="btn btn-outline-dark btnA" @click="navigateTo('/products/mac')">
    Mac
    <span></span><span></span><span></span><span></span>
    </a>
    </div>
    <div class="text-center">
    <a href="javascript: void(0)" class="btn btn-outline-dark btnA" @click="navigateTo('/products/pad')">
    Pad
    <span></span><span></span><span></span><span></span>
    </a>
    </div>
</div>
  </template>
  
  <script>
  export default {
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
         // alert('歡迎回來，管理者!!');
      } else {
       alert('權限不足');
        this.$router.push('/');
      }
    }
    },
    methods: {
        
      navigateTo(route) {
        this.$router.push(route);
      }
    }
  };
  </script>
  
  <style scoped>
 .btnP {
    display: inline-block;
    position: relative;
    z-index: 1;
    min-width: 200px;
    background: #FF9933;
    border: 2px solid #999966;
    border-radius: 4px;
    color:#000000;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    transition: 0.5s;
    padding: 10px 20px;
}
.btnA{
  min-width: 200px;
  min-height: 30px;
  vertical-align: middle;
  text-align: center;
  line-height: 50px;
  text-size-adjust: 20px;
  font-weight: bold;
  cursor: pointer;
  margin: 5px 10px;
  
}
.btnP span {
    position: absolute;
    width: 25%;
    height: 100%;
    background-color: #999966;
    transform: translateY(150%);
    border-radius: 50%;
    left: calc((var(--n) - 1) * 25%);
    transition: 0.5s;
    transition-delay: calc((var(--n) - 1) * 0.1s);
    z-index: -1;
}
.btnP:hover,
.btnP:focus {
    color: black;
}
.btnP:hover span {
    transform: translateY(0) scale(2);
}
.btnP span:nth-child(1) {
    --n: 1;
}
.btnP span:nth-child(2) {
    --n: 2;
}
.btnP span:nth-child(3) {
    --n: 3;
}
.btnP span:nth-child(4) {
    --n: 4;
}
  </style>
  