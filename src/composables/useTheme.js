import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

/**
 * 主题三态 composable
 * theme: 'light' | 'dark' | 'system'
 */
export function useTheme() {
  const THEME_KEY = 'mjl-portfolio-theme';
  const root = document.documentElement;
  const theme = ref('system');

  const getStored = () => {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (_) {
      return null;
    }
  };

  const setStored = (v) => {
    try {
      localStorage.setItem(THEME_KEY, v);
    } catch (_) {
      /* 隐私模式降级 */
    }
  };

  const applyTheme = (t) => {
    if (t === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', t);
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: t } }));
  };

  const cycle = () => {
    const cur = getStored() || 'system';
    const next = cur === 'light' ? 'dark' : cur === 'dark' ? 'system' : 'light';
    setStored(next);
    theme.value = next;
    applyTheme(next);
  };

  const effective = computed(() => {
    const stored = theme.value;
    if (stored === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return stored;
  });

  let mql = null;
  const onSystemChange = () => {
    if ((getStored() || 'system') === 'system') applyTheme('system');
  };

  onMounted(() => {
    theme.value = getStored() || 'system';
    applyTheme(theme.value);
    mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', onSystemChange);
  });

  onBeforeUnmount(() => {
    if (mql) mql.removeEventListener('change', onSystemChange);
  });

  return { theme, effective, cycle };
}
