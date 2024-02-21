<template>
  <n-card>
    <n-flex justify="center" align="center" :wrap="false">
      <n-ellipsis v-if="pdf" :line-clamp="3">{{ pdf.name }}</n-ellipsis>
      <PDFUpload @update:pdf="onSelectPdf" :uploaded="pdf"/>

      <!-- <div class="entry size">
            <n-icon class="icon" :component="ResizeLarge20Regular" />
            <span>{{ filesize(pdf.size) }}</span>
          </div> -->
    </n-flex>
  </n-card>
</template>

<script lang="ts" setup>
import { NIcon, NEllipsis, NCard, NSpace, NFlex } from 'naive-ui'
import { Attach16Regular, ResizeLarge20Regular } from '@vicons/fluent'
import { filesize } from 'filesize'
import PDFUpload from '@/components/pdf-upload/PDFUpload.vue'

const props = defineProps(['pdf'])
const emit = defineEmits(['pdfReselected'])

const onSelectPdf = (event) => {
  emit('pdfReselected', event)
}
</script>

<style scoped>
.title {
  color: lightgray;
}
.entry {
  display: flex;
  align-items: center;
  gap: 0.5em;
  &.size {
    color: gray;
    font-size: 0.8em;
  }
}
</style>
