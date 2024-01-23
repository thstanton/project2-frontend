<script>
export default {
  name: "AlertBar",
  props: ["message"],
};
</script>

<template>
  <v-snackbar>{{ message }}</v-snackbar>
</template>
