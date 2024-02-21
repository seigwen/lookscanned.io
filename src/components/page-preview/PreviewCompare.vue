<template>
  <n-space vertical>
    <n-flex justify="center" align="center">
      <div>效果预览:</div>
      <PreviewPagination v-model:page="page" :numPages="numPages" v-if="numPages >= 2" />
    </n-flex>
    <SideBySidePreview>
      <!--原文件-->
      <!-- <template #pdf>
        <ImagePreview :image="image?.blob" />
      </template> -->
      <!--效果预览-->
      <template #scan>
        <div v-if="scanning" style="text-align: center; margin-top: 50px;">
          <n-spin size="small"/>
        </div>        
        <ImagePreview
          v-show="!scanning"
          :image="scanning ? undefined : scanImage?.blob"
          :height="image?.height"
          :width="image?.width"
        />
      </template>
    </SideBySidePreview>
  </n-space>
</template>

<script lang="ts" setup>
import SideBySidePreview from './SideBySidePreview.vue'
import ImagePreview from './ImagePreview.vue'
import { ref } from 'vue'
import { computedAsync } from '@vueuse/core'
import PreviewPagination from './PreviewPagination.vue'
import { NSpace, NFlex, NSpin } from 'naive-ui'

const page = ref(1)
const scanning = ref(false)

interface PDFRenderer {
  renderPage(
    page: number,
    scale: number
  ): Promise<{
    blob: Blob
    width: number
    height: number
  }>
  getNumPages(): Promise<number>
}

interface ScanRenderer {
  renderPage(
    image: Blob,
    options?: {
      signal?: AbortSignal
    }
  ): Promise<{
    blob: Blob
  }>
}

const props = defineProps<{
  pdfRenderer?: PDFRenderer
  scanRenderer?: ScanRenderer
  scale: number
}>()

const image = computedAsync(async () => {
  if (!props.pdfRenderer)
    return {
      blob: undefined,
      height: undefined,
      width: undefined
    }

  const { blob, width, height } = await props.pdfRenderer.renderPage(page.value, props.scale)
  return {
    blob,
    width,
    height
  }
})

let controller = new AbortController()

const scanImage = computedAsync(
  async () => {
    controller.abort()
    controller = new AbortController()
    if (!props.scanRenderer || !image.value.blob) return

    const { blob } = await props.scanRenderer.renderPage(image.value.blob, {
      signal: controller.signal
    })
    return {
      blob
    }
  },
  undefined,
  scanning
)

const numPages = computedAsync(async () => {
  page.value = 1
  if (!props.pdfRenderer) return 1
  return await props.pdfRenderer.getNumPages()
}, 1)
</script>
