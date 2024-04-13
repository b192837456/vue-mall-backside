<template>
  <!--  <main class="h-100" style="background-color: #eee">-->
  <!--    <h1>Statistics</h1>-->
  <!--  </main>-->
  <div class="chart1">
    <canvas id="productSalesChart" width="800" height="400"></canvas>
  </div>
</template>


<script>
import {Chart} from 'chart.js/auto';

export default {
  mounted() {
    const loggedInMember = sessionStorage.getItem('loggedInMember');
    const loggedInMemberObject = JSON.parse(loggedInMember);
    console.log(loggedInMemberObject);
    if (loggedInMemberObject === null) {
      alert('請先登入');
      this.$router.push('/login');
    } else {
      const role = loggedInMemberObject.authentication;
      console.log(role);
      if (role == '1' || role == '0') {
        // alert('歡迎回來，管理者!!');
      } else {
        alert('權限不足');
        this.$router.push('/');
      }
    }

    this.renderChart();
  },

  methods: {
    renderChart() {
      // 數據
      const data = {
        labels: [
          "iPhone 13 128G",
          "iPhone 15 256G",
          "iPhone 14 256G",
          "MacBook Air 13吋 M1 晶片 256GB",
          "iPad 10 64G WIFI",
          "MacBook Pro 14 吋 512GB M3",
        ],
        datasets: [
          {
            label: "銷售量",
            data: [9, 2, 5, 2, 1, 1], // 這裡填入每個產品的銷售量
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      // 配置
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

      // 創建圖表
      const ctx = document.getElementById("productSalesChart").getContext("2d");
      const productSalesChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: options,
      });
    },
  },

}


</script>


<style>
.chart1 {
  width: 700px;
  height: 400px;
  border: 1px solid #C7C7E2;
  margin: 0 auto;
}

</style>