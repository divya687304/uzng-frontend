<template>
  <Dialog
    modal
    v-model:visible="isDialogVisible"
    :style="{ 'max-width': '600px', 'min-width': '420px' }"
    :draggable="false"
  >
    <template #header>
      <span class="text-xl">{{ $t('Set Preferred Locale') }} </span>
    </template>

    <div>
      <div class="my-2">
        <label for="locale">{{ $t('Change Language') }}</label>
      </div>
      <div>
        <Dropdown
          id="locale"
          v-model="locale"
          class="w-20rem"
          :options="props.locales"
          option-value="value"
          option-label="label"
        ></Dropdown>
      </div>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps(['locales', 'showDialog'])
const emit = defineEmits(['closeDialog'])
const { locale } = useI18n()
const isDialogVisible = computed({
  get() {
    return props.showDialog
  },
  set(newValue) {
    if (newValue === false) {
      emit('closeDialog')
    }
  }
})
</script>
<style>
.p-dialog-header {
  background-color: #d6d6d6 !important;
}
</style>
