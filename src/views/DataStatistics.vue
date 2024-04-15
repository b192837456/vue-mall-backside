<template>
  <!--  <main class="h-100" style="background-color: #eee">-->
  <!--    <h1>Statistics</h1>-->
  <!--  </main>-->

  <div class="chart-container">
    <div class="chart1">
      <canvas id="genderPieChart" width="400" height="400"></canvas>
    </div>
    <div class="chart1">
      <canvas id="ageChart"></canvas>
    </div>
  </div>

  <div class="chart-container">
    <div class="chart1">
      <canvas id="productSalesChart" width="800" height="400"></canvas>
    </div>
  </div>

  <!--    <table class="table table-striped table-hover">-->
  <!--      <thead>-->
  <!--      <tr class="text-center">-->
  <!--        <th scope="col">年齡</th>-->
  <!--      </tr>-->
  <!--      </thead>-->
  <!--      <tbody>-->
  <!--      <tr v-for="memberDTO in memberDTOs" :key="memberDTO.userId" class="text-center">-->
  <!--        <td>{{ memberDTO.age }}</td>-->
  <!--      </tr>-->
  <!--      </tbody>-->
  <!--    </table>-->

</template>


<script>
import {Chart} from 'chart.js/auto';
import axios from "axios";

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

    axios
        .get(`${this.API_URL}/orders/findAllStatisticsMemberDTOs`)
        .then((rs) => {
          console.log(rs.data);
          this.memberDTOs = rs.data;

          this.calculateGenderData();
          this.calculateAgeDistribution();

          this.renderGenderChart();
          this.renderAgeChart();
          this.renderSalesChart();
        })
        .catch((error) => {
          console.error("Error fetching memberDTOs:", error);
        });

  },

  data() {
    return {
      memberDTOs: [], // 在這裡放入您提供的用戶數據
      ageData: {
        '10~19歲': 0,
        '20~29歲': 0,
        '30~39歲': 0,
        '40~49歲': 0,
        '50~59歲': 0,
        '60~69歲': 0,
      },
      // ageData: { //(這裡是寫死的Data)
      //   '10~19歲': 10,
      //   '20~29歲': 17,
      //   '30~39歲': 19,
      //   '40~49歲': 12,
      //   '50~59歲': 1,
      //   '60~69歲': 1,
      // },
      ageChart: null

    };
  },

  methods: {
    calculateGenderData() {
      const genderData = [0, 0]; // 資料庫為[32, 28]
      this.memberDTOs.forEach(memberDTO => {
        if (memberDTO.sex !== null) {
          if (memberDTO.sex === 0) {
            genderData[0]++;
          } else if (memberDTO.sex === 1) {
            genderData[1]++;
          }
        }
      });
      console.log(genderData);
      return genderData;
    },

    renderGenderChart() {
      const genderData = this.calculateGenderData();
      const ctx = document.getElementById('genderPieChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['女性', '男性'],
          datasets: [{
            data: genderData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    },

    calculateAgeDistribution() {
      const users = this.memberDTOs;
      // {
      //   "userId": 1,
      //   "userName": "陳小明",
      //   "age": 18,
      //   "sex": 0
      // },
      // 這裡放入後端提供的使用者資料

      users.forEach(user => {
        const age = user.age;
        // console.log("user.age: " + user.age)
        if (age !== null) {
          if (age >= 10 && age <= 19) {
            this.ageData['10~19歲']++;
          } else if (age >= 20 && age <= 29) {
            this.ageData['20~29歲']++;
          } else if (age >= 30 && age <= 39) {
            this.ageData['30~39歲']++;
          } else if (age >= 40 && age <= 49) {
            this.ageData['40~49歲']++;
          } else if (age >= 50 && age <= 59) {
            this.ageData['50~59歲']++;
          } else if (age >= 60 && age <= 69) {
            this.ageData['60~69歲']++;
          }
        }
      });
      console.log(this.ageData);
    },

    renderAgeChart() {
      const ctx = document.getElementById('ageChart').getContext('2d');
      this.ageChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.ageData),
          datasets: [{
            label: '人數',
            data: Object.values(this.ageData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    },

    renderSalesChart() {
      // 數據
      const data = {
        labels: [
          "iPhone 13 128G",
          "iPhone 15 256G",
          "iPhone 14 256G",
          "MacBook Air 13吋 M1 晶片 256GB",
          "iPad 10 64G WIFI",
          // "MacBook Pro 14 吋 512GB M3",
        ],
        datasets: [
          {
            label: "銷售量 Top 5",
            data: [25, 23, 12, 10, 9], // 這裡填入每個產品的銷售量
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              // "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              // "rgba(255, 159, 64, 1)",
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


  }
};

</script>


<style>
.chart-container {
  display: flex;
  flex-direction: row;
  margin: 40px 70px;
  //border: 1px solid #17a2b8;
}

.chart1 {
  width: 600px;
  height: 330px;
  border: 1px solid #C7C7E2;
  margin: 0 auto;
}

</style>