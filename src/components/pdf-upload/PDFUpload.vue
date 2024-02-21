<template>
    <n-button type="primary" @click="onClick">
      <template #icon>
        <n-icon>
          <FolderOpen16Regular />
        </n-icon>
      </template>
      <n-text>
        {{ uploaded ? t('settings.pdfReselectLabel') : t('settings.pdfSelectLabel') }}
      </n-text>
    </n-button>
</template>

<script lang="ts" setup>
import { NButton, NIcon, NText, NCard, NSpace } from 'naive-ui'
import { FolderOpen16Regular } from '@vicons/fluent'
import { fileOpen } from 'browser-fs-access'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps(['uploaded'])

const emit = defineEmits<{
  (e: 'update:pdf', info: File | undefined): void
}>()

async function onClick() {
  const file = await fileOpen({
    description: 'PDF Files',
    mimeTypes: ['application/pdf'],
    extensions: ['.pdf']
  })
  emit('update:pdf', file)
}
</script>
