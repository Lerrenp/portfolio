# 🌸 mjl · 物联网作品集 (Vue 3 版) 🌸

> ✨ *轻量、可爱的个人作品集 ——「唔……只是一个假期作业而已啦，才、才没有很认真呢……」* ✨

![Vue](https://img.shields.io/badge/Vue-3.5-42b883?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/状态-摸鱼中-ff69b4)
![License](https://img.shields.io/badge/许可-假期作业请勿商用-yellow)
![Made With](https://img.shields.io/badge/✿-爱与代码-ff6fa1)

```
        ✿(ᐢ..ᐢ)✿  ← 这是我的看板鸟，负责每天监督你读 README
```

---

## 🎀 这是啥？(´･ω･`)

是一个**单页个人作品集**，从 [day03 的纯 HTML/CSS/JS 版本](../day03) 迁移到 **Vue 3 + Vite** 而来。

主打一个「**第一眼心动，第二眼想 follow**」的视觉效果：

| ✦ 模块 | ✦ 看点 |
| --- | --- |
| 🎨 Material You 配色 | 浅色 / 深色 / 跟随系统 三态无缝切换 |
| 🪟 玻璃拟态容器 | `backdrop-filter` 拉满，圆角大到能滚进去 |
| 🐦 Canvas 鸟群 | Boids 算法 + 鼠标吸引 / 排斥，自带赛博宠物 |
| 📦 GitHub 动态拉取 | 作品直接读仓库，**永远不用手改作品列表** |
| 📱 响应式 | 手机 / 平板 / 桌面 自适应，摸鱼姿势随便挑 |

---

## 🌷 跑起来！✧(ˊωˋ*)

> *「才、才不是特意告诉你怎么跑的呢……」*

需要 [Node.js](https://nodejs.org/) ≥ 18。

```bash
# 装依赖 (请使用 npm，已经够慢了别再换工具)
npm install

# 开发模式（自动打开 http://localhost:5173）
npm run dev

# 生产构建（产物在 dist/）
npm run build

# 本地预览生产包
npm run preview
```

> 💡 **小贴士**：第一次 `npm install` 可能要等一阵子——这段时间正好去泡杯奶茶 🧋

---

## 📁 目录结构 (๑•̀ㅂ•́)و✧

```
day04/
├─ index.html              # Vite 入口
├─ vite.config.js          # Vite 配置
├─ package.json            # 依赖与脚本
├─ src/
│  ├─ main.js              # createApp 挂载
│  ├─ App.vue              # 顶层布局
│  ├─ assets/style.css     # 设计令牌 + Material You（来自 day03）
│  ├─ composables/
│  │  ├─ useTheme.js       # 三态主题管理
│  │  └─ useGitHubRepos.js # GitHub API + Tag 启发式分类
│  └─ components/
│     ├─ ThemeToggle.vue       # 主题切换按钮（月亮/太阳）
│     ├─ SiteHeader.vue        # 姓名 + Tagline + 鸟群 HUD
│     ├─ SkillGrid.vue         # 4 张技能卡片
│     ├─ ProjectGrid.vue       # 仓库卡片（loading/ok/error/empty）
│     ├─ ContactSection.vue    # 邮箱 / 电话 / 领域
│     └─ FlockBackground.vue   # Canvas 鸟群动画
└─ PRD.md                  # 产品需求文档（昨天写的，今天也还在！）
```

---

## ✨ 关键设计选择 (｡♥‿♥｡)

> *「人家也是有认真做设计的……」*

| 选择 | 为什么 | 备选方案 |
| --- | --- | --- |
| **Vite 而非 Webpack** | 启动快、配置少 | ~~Vue CLI~~（已停止维护） |
| **不用 TypeScript** | 单页没必要 | 想要类型可以加 `.d.ts` |
| **拆 4 个组件 + 2 个 composable** | 单一职责，方便面试讲 | 全部塞 App.vue 也可以，但不优雅 |
| **CSS 变量集中管理** | 改主题色只动 `:root` | 抄一份 day03 的 672 行 CSS 直接用 ✅ |
| **鸟群用 Canvas 而非 DOM** | 80 只也只占一层 | SVG / WebGL 都太重 |

---

## 🌙 主题切换 (¬‿¬)

循环：**浅色 → 深色 → 跟随系统 → 浅色 → ...**

```js
// useTheme.js 里的真相
const cycle = () => {
  const cur = getStored() || 'system';
  const next = cur === 'light' ? 'dark' : cur === 'dark' ? 'system' : 'light';
  setStored(next);
};
```

选择会存进 `localStorage`，下次打开还是上次的风格——**永远不会偷偷给你换默认**。

---

## 🐦 关于鸟群 (｡•́︿•̀｡)

- 数量：`clamp(屏幕面积 / 22000, 28, 80)`
- 感知半径：80px
- 鼠标吸引：< 220px；过近排斥：< 70px
- 边界：进入 60px 区域会被温柔推回
- 主题切换时颜色**实时跟随**——这是 `themechange` CustomEvent 的功劳

> *它们不会真的飞走，只会绕着你转圈圈~*

---

## 📦 作品卡片怎么分类？✿

`useGitHubRepos.js` 里的 `deriveTag()` 用关键词正则给仓库自动打 Tag：

| 命中关键词 | Tag |
| --- | --- |
| iot / 物联网 / esp / stm / zigbee / lora / ble | 🌐 物联网 |
| bilibili / video / player | 🎬 视频播放 |
| kernel / android / root | 🔧 内核编译 |
| openai / gemini / api / llm | 🤖 AI / API |
| defocus / eye / 护眼 | 👀 健康工具 |
| homework / note / learn / 学习 | 📚 学习笔记 |
| 都没命中 | 直接显示语言名 / Project |

> 「才不是乱分类的呢……实在不行以后换成 LLM 也、也不是不可以啦……」

---

## 🔮 之后想做的事 (◕‿◕✿)

- [ ] 作品详情页（点卡片读 README）
- [ ] 博客模块（IoT 学习笔记）
- [ ] 多语言（中 / 英）
- [ ] 「招聘方留言」联系表单
- [ ] ~~Astro 重写~~（想太多了先划掉）

---

## ✿ 致谢 / 灵感来源

- 🎨 Google **Material Design 3 (Material You)**
- 🐦 Craig Reynolds 的 **Boids 算法**（1986 年，比很多读者的年龄都大）
- 🌸 无数个把简历改到凌晨三点的夜晚

---

## 📜 License

```
MIT (其实) —— 但说真的这只是假期作业，
              请别拿去给甲方交付，被坑了别来找我 (｡•́︿•̀｡)
```

---

<div align="center">

```
✿╰╯╰╯╰╯╰╯╰╯╰╯╰╯╰╯╰╯✿
   谢谢你读到这里！
   (ฅ́˘ฅ̀)♡
✿╰╯╰╯╰╯╰╯╰╯╰╯╰╯╰╯╰╯✿
```

**Happy Coding · 假期愉快** 🌸

</div>
