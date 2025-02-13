<script setup lang="ts">
// import { useI18n } from 'vue-i18n'
// const { locale, t } = useI18n()
// import { useAuth0 } from '@auth0/auth0-vue';
// import { ref } from 'vue'
// const auth0 = useAuth0();
// const user = ref(auth0.user);

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="text-3xl text-center">
      <div>{{ $t('welcome_msg', {name: $props.msg}) }}</div>
    </h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
