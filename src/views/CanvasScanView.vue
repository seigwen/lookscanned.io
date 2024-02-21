<template>
  <MainContainer class="main-container">
    <n-grid x-gap="25" y-gap="25" :cols="12" item-responsive responsive="screen">
      <n-grid-item span="12 s:5 m:4 l:3">
        <n-space vertical>
          <PDFInfo @pdfReselected="pdf = $event" :pdf="pdf" />
          <ScanSettingsCard v-if="pdf" v-model:config="config" />
        </n-space>
      </n-grid-item>
      <n-grid-item v-if="pdf" span="12 s:7 m:8 l:9">
        <PreviewCompare
          :pdfRenderer="pdfRenderer"
          :scanRenderer="scanRenderer"
          :scale="config.scale"
        />
      </n-grid-item>
    </n-grid>
    <SaveButtonCard
      v-if="pdf"
      class="save-btn-card"
      @generate="generate"
      :progress="progress"
      :saving="saving"
      :pdf="scannedPDF"
    ></SaveButtonCard>
  </MainContainer>
</template>

<script lang="ts" setup>
import { NGrid, NGridItem, NSpace } from 'naive-ui'
import MainContainer from '@/components/MainContainer.vue'
import { type ScanConfig, defaultConfig, CanvasScanner } from '@/utils/scan-renderer/canvas-scan'
import ScanSettingsCard from '@/components/scan-settings/ScanSettingsCard.vue'
import PDFUpload from '@/components/pdf-upload/PDFUpload.vue'
import { ref, computed, watch } from 'vue'
import PDFURL from '@/assets/examples/pdfs/test.pdf'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { PDF } from '@/utils/pdf-renderer/pdfjs'
import PreviewCompare from '@/components/page-preview/PreviewCompare.vue'
import SaveButtonCard from '@/components/save-button/SaveButtonCard.vue'
import { useSaveScannedPDF } from '@/composables/save-scanned-pdf'
import PDFInfo from '@/components/pdf-upload/PDFInfo.vue'
import { ScanCacher } from '@/utils/scan-renderer/scan-cacher'
import { useMessage } from 'naive-ui'

const { t } = useI18n()
const message = useMessage()

useHead({
  title: t('base.scanTitle') + ' - ' + t('base.title'),
  meta: [{ name: 'description', content: t('base.description') }]
})

/**
 * pdf文件
 */
const pdf = ref<File | undefined>(undefined)

/**
 * 打开示例pdf
 */
// const initExamplePDF = async () => {
//   const response = await fetch(PDFURL)
//   const blob = await response.blob()
//   const file = new File([blob], 'example.pdf')
//   if (!pdf.value) {
//     pdf.value = file
//   }
// }
// initExamplePDF()

const config = ref<ScanConfig>(defaultConfig)
const pdfRenderer = computed(() => {
  if (!pdf.value) return

  return new PDF(pdf.value)
})

const scanRenderer = ref(new ScanCacher(new CanvasScanner(config.value)))
watch(
  config,
  (newConfig) => {
    scanRenderer.value = new ScanCacher(new CanvasScanner(newConfig))
  },
  { deep: true }
)

const scale = computed(() => config.value.scale)

const { save, progress, saving, scannedPDF } = useSaveScannedPDF(
  pdf,
  pdfRenderer,
  scanRenderer,
  scale
)

const generate = async () => {
  try {
    await save()
    message.success(t('actions.generateSuccess'))
  } catch (e) {
    message.error(t('actions.generateError') + (e as Error).message)
  }
}
</script>

<style scoped>
.main-container{
  padding-bottom: 60px;
  .save-btn-card{
    position:fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>