<script setup>
import { ref, onMounted } from 'vue';
import FlockBackground from './components/FlockBackground.vue';
import SiteHeader from './components/SiteHeader.vue';
import SkillGrid from './components/SkillGrid.vue';
import ProjectGrid from './components/ProjectGrid.vue';
import ContactSection from './components/ContactSection.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import { useTheme } from './composables/useTheme';

const { theme } = useTheme();
const year = ref(new Date().getFullYear());

onMounted(() => {
  // 年份由模板内联展示，确保 SSR / 首屏静态正确
});
</script>

<template>
  <FlockBackground />

  <div class="toolbar" role="toolbar" aria-label="页面工具">
    <ThemeToggle />
  </div>

  <main class="container">
    <SiteHeader />

    <SkillGrid />

    <ProjectGrid />

    <ContactSection />

    <footer class="footer">
      <span>© {{ year }} mjl · Built with Material You</span>
      <span>
        <a
          href="https://github.com/Lerrenp"
          target="_blank"
          rel="noopener noreferrer"
          style="color:inherit;border-bottom:1px dotted var(--md-sys-color-outline);text-decoration:none;"
        >
          github.com/Lerrenp
        </a>
      </span>
    </footer>
  </main>
</template>
