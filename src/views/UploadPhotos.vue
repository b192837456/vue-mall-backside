<template>
    <div class="container">
        <h1>上傳圖片</h1>
        <form @submit.prevent="uploadPhoto">
            <label for="specId">Spec ID:</label>
            <input type="text" id="specId" v-model="specId" required>
            <br>
            <label for="file">選擇圖片:</label>
            <input type="file" id="file" ref="file" @change="handleFileChange" required>
            <br>
            <button type="submit">上傳</button>
        </form>
        <div v-if="showSuccessMessage" class="success-message">
            上傳成功！
        </div>
        <div v-if="showErrorMessage" class="error-message">
            請確認是否有這項產品。
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            specId: '',
            file: null,
            showSuccessMessage: false,
            showErrorMessage: false
        };
    },
    methods: {
        handleFileChange(event) {
            this.file = event.target.files[0];
        },
        uploadPhoto() {
            let formData = new FormData();
            formData.append('specId', this.specId);
            formData.append('file', this.file);
            
            axios.post(`${this.API_URL}/products/insertProductPhoto`, formData)
            .then(response => {
                console.log(response.data); // Success message from server
                // Show success message
                this.showSuccessMessage = true;
                // Hide success message after 3 seconds
                setTimeout(() => {
                    this.showSuccessMessage = false;
                }, 3000);
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
        }
    }
};
</script>

<style scoped>
    /* Your styles here */
    .success-message {
        background-color: #d4edda;
        color: #155724;
        padding: 10px;
        border: 1px solid #c3e6cb;
        border-radius: 5px;
        margin-top: 10px;
    }
    .error-message {
        background-color: #f8d7da;
        color: #721c24;
        padding: 10px;
        border: 1px solid #f5c6cb;
        border-radius: 5px;
        margin-top: 10px;
    }
</style>
