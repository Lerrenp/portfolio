<script setup>
const skills = [
  {
    title: '嵌入式系统',
    desc: '— 基于 ESP32 / STM32 的传感与执行器开发',
    icon: 'M9 2v6.5L3 17a2 2 0 0 0 1.7 3h14.6A2 2 0 0 0 21 17l-6-8.5V2h-2v6h-2V2H9zm-2 16a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm10 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z',
  },
  {
    title: '无线通信',
    desc: '— LoRa、ZigBee、BLE、Wi-Fi 组网与协议调试',
    icon: 'M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm0 2a7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7zm-1 3h2v3.6l2.7 1.6-1 1.7L11 9.7V8z',
  },
  {
    title: '云平台与数据',
    desc: '— MQTT / HTTP 对接，Node-RED 与 阿里云 IoT 实战',
    icon: 'M12 2 4 7v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V7l-8-5zm0 2.2 6 3.7V13c0 4-2.5 7.5-6 9-3.5-1.5-6-5-6-9V7.9l6-3.7zM12 8a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z',
  },
  {
    title: '前端与可视化',
    desc: '— 构建轻量仪表板，WebSocket 实时数据展示',
    icon: 'M3 4h18v4H3V4zm0 6h18v4H3v-4zm0 6h18v4H3v-4z',
  },
];
</script>

<template>
  <section class="skills" aria-labelledby="skills-title">
    <h2 class="section-title" id="skills-title">技能</h2>
    <div class="skill-grid">
      <div v-for="s in skills" :key="s.title" class="skill-item">
        <span class="skill-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path :d="s.icon" />
          </svg>
        </span>
        <strong>{{ s.title }}</strong>
        <span class="desc">{{ s.desc }}</span>
      </div>
    </div>
  </section>
</template>
