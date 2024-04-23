<template>
  <div class="w-20 h-20" >
    <img :src="showPhoto()"  />
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      imageUrl: null,
      photoId:"1",     
    };
  },
  created() {
    this.showPhoto();
  },
  methods: {
    showPhoto() {
    return `${this.API_URL}/photos/image/${this.photoId}`;
    }
  }
};
</script>
