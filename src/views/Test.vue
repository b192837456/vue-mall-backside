<template lang="">
  <div>
    <!-- <div v-for="photo in photos" :key="photo.photoId">
      <img :src="getPhotoUrl(photo.photoId)" alt="Product Photo"> -->
    </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      photos: []
    };
  },
  mounted() {
    this.fetchPhotos();
    console.log(photos);
  },
  methods: {
    fetchPhotos() {
      // 發送請求獲取所有圖片資料
      // 這裡可以使用Vue的HTTP庫（如axios）或者其他方式發送請求
      // 假設這裡使用axios，並且後端API的路徑為/photos/showAll
      axios.get('http://localhost:8080/mall/showAll')
        .then(response => {
          this.photos = response.data;
          console.log(this.photos);
        })
        .catch(error => {
          console.error('Error fetching photos:', error);
        });
    },

    getPhotoUrl(photoId) {
      // 根據圖片ID組裝圖片的URL
      // 假設圖片URL的格式為/photos/image/{photoId}
      return `/photos/image/${photoId}`;
    }
  }
  
}
</script>
<style lang="" scoped>
  
</style>