<template>
  <n-card
    :segmented="{
      content: true,
      footer: 'soft'
    }"
  >
    <n-collapse :default-expanded-names="['Settings']">
      <template #header-extra>
        <n-icon><ChevronDown12Regular /></n-icon>
      </template>
      <template #arrow>
        <n-icon style="margin-right: 2px">
          <AreaCustom />
        </n-icon>
      </template>
      <n-collapse-item :title="t('settings.settings')" name="Settings">
        <n-form label-placement="left">
          <!-- Scan Settings -->
          <ColorspaceSetting v-model:colorspace="config.colorspace" />
          <BorderSetting v-model:border="config.border" />
          <RotateSetting v-model:rotate="config.rotate" />
          <RotateVarianceSetting v-model:rotate_var="config.rotate_var" />
          <BrightnessSetting v-model:brightness="config.brightness" />
          <ContrastSetting v-model:contrast="config.contrast" />
          <BlurSetting v-model:blur="config.blur" />
          <NoiseSetting v-model:noise="config.noise" />
          <ScaleSetting v-model:scale="config.scale" />
          <n-popconfirm
            @positive-click="reset"
            :positive-text="t('settings.confirm')"
            :negative-text="t('settings.cancel')"
          >
            {{ t('settings.sureToResetConfig') }}
            <template #trigger>
              <n-flex justify="center" style="margin-top: 20px;">
                <n-button type="warning">{{ t('settings.reset') }}</n-button>
              </n-flex>            
            </template>
          </n-popconfirm>
        </n-form>
      </n-collapse-item>
    </n-collapse>
  </n-card>
</template>

<script lang="ts" setup>
import { NCard, NButton, NFlex, NForm, NSpace, NPopconfirm, NCollapse, NCollapseItem, NIcon } from 'naive-ui'
import { AreaCustom } from '@vicons/carbon'
import { ChevronDown12Regular } from '@vicons/fluent'

import BorderSetting from './settings/BorderSetting.vue'
import RotateSetting from './settings/RotateSetting.vue'
import RotateVarianceSetting from './settings/RotateVarianceSetting.vue'
import ColorspaceSetting from './settings/ColorspaceSetting.vue'
import BlurSetting from './settings/BlurSetting.vue'
import NoiseSetting from './settings/NoiseSetting.vue'
import ScaleSetting from './settings/ScaleSetting.vue'
import BrightnessSetting from './settings/BrightnessSetting.vue'
import ContrastSetting from './settings/ContrastSetting.vue'

import type { ScanConfig } from '@/utils/scan-renderer'
import { useI18n } from 'vue-i18n'
import { useVModel } from '@vueuse/core'

const { t } = useI18n()

const props = defineProps<{
  config: ScanConfig
}>()

const emit = defineEmits<{
  (e: 'update:config', config: ScanConfig): void
}>()
// const emit = defineEmits(['update:config','reset'])

const config = useVModel(props, 'config', emit)

const reset = ()=>{
  emit('reset')
}

</script>
