<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { articles } from '@/data/articles'

const route = useRoute()
const router = useRouter()

const slug = computed(() => route.params.slug as string)
const article = computed(() => articles.find(a => a.slug === slug.value))

const content = ref('')
const isLoading = ref(true)

onMounted(async () => {
  if (article.value) {
    try {
      const response = await fetch(article.value.contentPath)
      const markdown = await response.text()
      content.value = marked(markdown) as string
    } catch (error) {
      console.error('Failed to load article:', error)
      content.value = '<p>Failed to load article content.</p>'
    } finally {
      isLoading.value = false
    }
  } else {
    isLoading.value = false
  }
})

function goBack() {
  router.back()
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="article-page">
    <!-- Navbar with layered colors -->
    <header class="navbar">
      <div class="navbar-layer navbar-teal"></div>
      <div class="navbar-layer navbar-yellow"></div>
      <div class="navbar-layer navbar-white"></div>
      <div class="navbar-layer navbar-orange">
        <a class="navbar-logo" @click.prevent="goHome">keivan</a>
      </div>
    </header>

    <!-- Main Content -->
    <main class="article-main">
      <!-- Back Button -->
      <button class="back-button" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>BACK</span>
      </button>

      <!-- Article Content -->
      <article v-if="article" class="article-content">
        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <p class="article-subtitle">{{ article.subtitle }}</p>
          <div class="article-meta">
            <span class="article-category">{{ article.category }}</span>
            <span class="meta-dot">•</span>
            <time class="article-date">{{ article.date }}</time>
          </div>
        </header>

        <div v-if="isLoading" class="loading">
          Loading...
        </div>
        <div v-else class="markdown-content" v-html="content"></div>

        <!-- Bottom Back Button -->
        <button class="back-button bottom-back" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>BACK</span>
        </button>
      </article>

      <!-- Article Not Found -->
      <div v-else class="not-found">
        <h1>Article not found</h1>
        <p>The article you're looking for doesn't exist.</p>
        <button @click="goHome">Go Home</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Stretch Pro';
  src: url('/fonts/StretchPro.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

.article-page {
  min-height: 100vh;
  background: #E2E2DC;
}

/* Navbar with layered colors */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 70px;
  overflow: visible;
}

/* Layered color rectangles - 70% width, centered, offset diagonally */
.navbar-layer {
  position: absolute;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  height: 50px;
  border-radius: 0.375rem;
}

.navbar-teal {
  background: #b6dedb;
  top: 8px;
  margin-left: -12px;
  z-index: 1;
}

.navbar-yellow {
  background: #f7f780;
  top: 12px;
  margin-left: -6px;
  z-index: 2;
}

.navbar-white {
  background: #ffffff;
  top: 16px;
  margin-left: 0;
  z-index: 3;
}

.navbar-orange {
  background: #ff8356;
  top: 20px;
  margin-left: 6px;
  z-index: 4;
  display: flex;
  align-items: flex-end;
  padding: 0.5rem 1rem;
}

.navbar-logo {
  cursor: pointer;
  font-family: 'Stretch Pro', sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.2s ease;
}

.navbar-logo:hover {
  color: #b6dedb;
}


.navbar-right {
  /* Empty for now */
}

/* Main Content */
.article-main {
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
}

/* Back Button */
.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: #ff8356;
}

.bottom-back {
  margin-top: 3rem;
  margin-bottom: 0;
  padding-top: 2rem;
}

/* Article Content */
.article-content {
  max-width: 48rem;
}

.article-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #718096;
}

.article-title {
  font-family: 'Stretch Pro', sans-serif;
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: 400;
  color: #1a202c;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.article-subtitle {
  font-size: 1.25rem;
  color: #4a5568;
  margin: 0 0 1.5rem 0;
  font-style: italic;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #718096;
  text-transform: uppercase;
}

.article-category {
  color: #4a5568;
  font-weight: 600;
}

.meta-dot {
  color: #a0aec0;
}

.article-date {
  color: #718096;
}

/* Markdown Content Styling */
.markdown-content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #2d3748;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  font-family: 'Stretch Pro', sans-serif;
  text-transform: uppercase;
  color: #1a202c;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.markdown-content :deep(h1) {
  font-size: 2rem;
}

.markdown-content :deep(h2) {
  font-size: 1.5rem;
}

.markdown-content :deep(h3) {
  font-size: 1.25rem;
}

.markdown-content :deep(p) {
  margin-bottom: 1.5rem;
}

.markdown-content :deep(a) {
  color: #ff8356;
  text-decoration: underline;
}

.markdown-content :deep(a:hover) {
  color: #e76a40;
}

.markdown-content :deep(code) {
  background: #f7fafc;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background: #1a202c;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #ff8356;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #4a5568;
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
}

/* Loading */
.loading {
  text-align: center;
  padding: 3rem;
  color: #718096;
}

/* Not Found */
.not-found {
  text-align: center;
  padding: 3rem;
}

.not-found h1 {
  font-family: 'Stretch Pro', sans-serif;
  font-size: 2rem;
  color: #1a202c;
  margin-bottom: 1rem;
}

.not-found p {
  color: #718096;
  margin-bottom: 2rem;
}

.not-found button {
  background: #ff8356;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
}

.not-found button:hover {
  background: #e76a40;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }

  .article-main {
    padding: 1.5rem;
  }

  .logo-layer,
  .logo-text {
    font-size: 1.25rem;
  }
}
</style>
