<template>
  <AppHeader></AppHeader>
 <RouterView></RouterView>
<!--  <AppFooter></AppFooter>-->
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: {
    AppFooter,
    AppHeader
  }

}
</script>
<style></style>