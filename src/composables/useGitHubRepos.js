import { ref, onMounted } from 'vue';

const GH_USER = 'Lerrenp';
const GH_API = `https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`;

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
};

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

function deriveTag(repo) {
  const text = `${repo.name} ${repo.description || ''}`.toLowerCase();
  if (/(iot|物联网|sensor|esp|stm|zigbee|lora|ble|embedded)/.test(text)) return '物联网';
  if (/(bilibili|bili|video|player)/.test(text)) return '视频播放';
  if (/(kernel|android|root|suki)/.test(text)) return '内核编译';
  if (/(openai|gemini|api|llm)/.test(text)) return 'AI / API';
  if (/(defocus|eye|护眼)/.test(text)) return '健康工具';
  if (/(homework|note|learn|学习|笔记)/.test(text)) return '学习笔记';
  if (repo.language) return repo.language;
  return 'Project';
}

export function useGitHubRepos() {
  const repos = ref([]);
  const status = ref('loading'); // 'loading' | 'ok' | 'error'
  const errorMsg = ref('');
  const GH_USER_NAME = GH_USER;
  const langColors = LANG_COLORS;
  const helpers = { escapeHtml, deriveTag };

  const load = async () => {
    status.value = 'loading';
    errorMsg.value = '';
    try {
      const res = await fetch(GH_API, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      repos.value = data
        .filter((r) => !r.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      status.value = 'ok';
    } catch (err) {
      console.warn('[portfolio] 仓库加载失败:', err);
      status.value = 'error';
      errorMsg.value = err.message;
    }
  };

  onMounted(load);

  return { repos, status, errorMsg, GH_USER_NAME, langColors, helpers, reload: load };
}
