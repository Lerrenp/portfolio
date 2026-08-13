<script setup>
import { computed } from 'vue';
import { useTheme } from '../composables/useTheme';

const { theme, effective, cycle } = useTheme();

const ICON_MOON =
  '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.4 5.4 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
const ICON_SUN =
  '<svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';

const label = computed(() => (effective.value === 'dark' ? '切换到浅色模式' : '切换到深色模式'));
const icon = computed(() => (effective.value === 'dark' ? ICON_SUN : ICON_MOON));
</script>

<template>
  <button
    id="theme-toggle"
    class="icon-btn"
    type="button"
    :aria-label="label"
    :data-mode="theme"
    v-html="icon"
    @click="cycle"
  ></button>
</template>

<style scoped>
.icon-btn :deep(svg) {
  width: 22px;
  height: 22px;
  fill: currentColor;
}
</style>
