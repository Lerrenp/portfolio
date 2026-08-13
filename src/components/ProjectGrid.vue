<script setup>
import { computed } from 'vue';
import { useGitHubRepos } from '../composables/useGitHubRepos';

const { repos, status, errorMsg, GH_USER_NAME, langColors, helpers } = useGitHubRepos();

const ICON_STAR =
  '<svg viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';

const statusText = computed(() => {
  if (status.value === 'loading') return '正在从 GitHub 加载项目...';
  if (status.value === 'error') return `GitHub 数据加载失败（${errorMsg.value}），请检查网络或稍后重试`;
  return `来自 GitHub @${GH_USER_NAME} · 共 ${repos.value.length} 个项目`;
});

const isError = computed(() => status.value === 'error');
</script>

<template>
  <section class="projects" aria-labelledby="projects-title">
    <h2 class="section-title" id="projects-title">作品</h2>

    <div id="repo-status" class="repo-status" :class="{ error: isError }">
      <span class="dot"></span>
      <span>{{ statusText }}</span>
    </div>

    <div id="project-grid" class="project-grid">
      <!-- 加载中：骨架占位 -->
      <template v-if="status === 'loading'">
        <div v-for="i in 3" :key="`sk-${i}`" class="project-card">
          <span class="skeleton" style="width: 40%"></span>
          <span class="skeleton" style="width: 80%; height: 22px"></span>
          <span class="skeleton" style="width: 100%"></span>
          <span class="skeleton" style="width: 60%"></span>
        </div>
      </template>

      <!-- 错误：空状态 -->
      <template v-else-if="status === 'error'">
        <div class="project-card">
          <p>暂无数据，请稍后再试。</p>
        </div>
      </template>

      <!-- 空仓库 -->
      <template v-else-if="!repos.length">
        <div class="project-card">
          <p>暂无公开的非 fork 仓库。</p>
        </div>
      </template>

      <!-- 正常渲染 -->
      <template v-else>
        <a
          v-for="repo in repos"
          :key="repo.id"
          class="project-card"
          :href="repo.html_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="project-tag">{{ helpers.deriveTag(repo) }}</span>
          <h3>
            {{ repo.name }}
            <span class="ext-icon" v-html="ICON_STAR"></span>
          </h3>
          <p>{{ repo.description || '暂无描述' }}</p>
          <div class="meta">
            <span class="lang">
              <span
                class="lang-dot"
                :style="{
                  background: langColors[repo.language] || '#94a3b8',
                  '--lang-color': langColors[repo.language] || '#94a3b8',
                }"
              ></span>
              {{ repo.language || '—' }}
            </span>
            <span class="stars" v-html="ICON_STAR + ' ' + (repo.stargazers_count || 0)"></span>
          </div>
        </a>
      </template>
    </div>
  </section>
</template>
