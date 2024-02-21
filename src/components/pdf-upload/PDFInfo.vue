<template>
  <n-card>
    <n-flex vertical>
      <PDFUpload @update:pdf="onSelectPdf" :uploaded="pdf"/>
      <template v-if="pdf">
        <n-flex justify="space-between" align="center">
          <div class="title">已选择PDF文件:</div>
        </n-flex>

        <div class="entry">
          <n-icon class="icon" :component="Attach16Regular" />
          <n-ellipsis style="max-width: 90%" :line-clamp="3">{{ pdf.name }}</n-ellipsis>
        </div>
        <!-- <div class="entry size">
          <n-icon class="icon" :component="ResizeLarge20Regular" />
          <span>{{ filesize(pdf.size) }}</span>
        </div> -->
      </template>
    </n-flex>
  </n-card>
</template>

<script lang="ts" setup>
import { NIcon, NEllipsis, NCard, NSpace, NFlex } from 'naive-ui'
import { Attach16Regular, ResizeLarge20Regular } from '@vicons/fluent'
import { filesize } from 'filesize'
import PDFUpload from '@/components/pdf-upload/PDFUpload.vue'

const props = defineProps(['pdf'])
const emit = defineEmits(["pdfReselected"])

const onSelectPdf = (event)=>{
  emit('pdfReselected', event)
}

</script>

<style scoped>
.title{
  color: lightgray;
}
.entry {
  display: flex;
  align-items: center;
  gap: 0.5em;
  &.size{
    color: gray;
    font-size: 0.8em;
  }
}
</style>
