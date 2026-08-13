<script setup>
const contacts = [
  {
    label: '邮箱',
    value: '2433832@qq.com',
    href: 'mailto:2433832@qq.com',
    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4 8 5 8-5V6l-8 5-8-5v2z',
  },
  {
    label: '电话',
    value: '+86 243383',
    icon: 'M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1l-2.22 2.2z',
  },
  {
    label: '领域',
    value: '物联网 · 嵌入式',
    icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z',
  },
];
</script>

<template>
  <section class="contact" aria-labelledby="contact-title">
    <h2 class="section-title" id="contact-title">联系方式</h2>
    <div class="contact-info">
      <div v-for="c in contacts" :key="c.label" class="contact-item">
        <span class="icon-wrap" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path :d="c.icon" />
          </svg>
        </span>
        <div>
          <div class="label">{{ c.label }}</div>
          <div class="value">
            <a v-if="c.href" :href="c.href">{{ c.value }}</a>
            <template v-else>{{ c.value }}</template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
