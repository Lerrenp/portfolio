<script setup>
import { ref, onMounted } from 'vue';

const birdCount = ref(0);

// 监听鸟群数量的 CustomEvent（由 FlockBackground 派发）
const onCount = (e) => {
  birdCount.value = e.detail.count;
};

onMounted(() => {
  window.addEventListener('flock-count', onCount);
});
</script>

<template>
  <header class="header">
    <h1>mjl <span class="accent">·</span> 物联网</h1>
    <div class="tagline">感知 · 连接 · 智能</div>
    <div class="bird-hud" title="当前鸟群数量">
      <span id="bird-count">{{ birdCount || '—' }}</span> birds
    </div>
  </header>
</template>
