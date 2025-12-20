<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { marked } from 'marked'
import type { Article } from '@/data/articles'

const props = defineProps<{
  article: Article
}>()

const emit = defineEmits<{
  close: []
}>()

const content = ref('')
const isLoading = ref(true)
const articleContainer = ref<HTMLElement | null>(null)
const progress = ref(0)
const hasReachedEnd = ref(false)

// Fetch and parse markdown content
async function loadContent() {
  try {
    isLoading.value = true
    const response = await fetch(props.article.contentPath)
    const markdown = await response.text()
    content.value = await marked(markdown)
  } catch (error) {
    console.error('Failed to load article:', error)
    content.value = '<p>Failed to load article content.</p>'
  } finally {
    isLoading.value = false
  }
}

// Track scroll progress using window scroll
function handleWindowScroll() {
  if (!articleContainer.value) return

  const rect = articleContainer.value.getBoundingClientRect()
  const articleTop = rect.top
  const articleHeight = rect.height
  const viewportHeight = window.innerHeight

  // Calculate how much of the article has been scrolled through
  // When article top is at viewport top, progress = 0
  // When article bottom is at viewport bottom, progress = 100
  const scrolledIntoArticle = -articleTop
  const totalScrollableDistance = articleHeight - viewportHeight

  if (totalScrollableDistance <= 0) {
    progress.value = 100
    return
  }

  progress.value = Math.max(0, Math.min(100, (scrolledIntoArticle / totalScrollableDistance) * 100))

  // Auto-close when scrolled past the end
  if (rect.bottom < 0 && !hasReachedEnd.value) {
    hasReachedEnd.value = true
    emit('close')
  }
}

function handleClose() {
  emit('close')
}

onMounted(() => {
  loadContent()
  window.addEventListener('scroll', handleWindowScroll, { passive: true })
  nextTick(() => handleWindowScroll())
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleWindowScroll)
})

// Reset when article changes
watch(() => props.article.slug, () => {
  hasReachedEnd.value = false
  progress.value = 0
  loadContent()
})
</script>

<template>
  <div ref="articleContainer" class="article-reader">
    <!-- Progress bar - fixed at top of viewport when reading -->
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
    </div>

    <!-- Close button -->
    <button class="close-button" @click="handleClose" aria-label="Close article">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <!-- Article content - flows inline with page -->
    <div v-if="isLoading" class="loading">
      Loading...
    </div>
    <div v-else class="markdown-content" v-html="content"></div>

    <!-- End of article marker -->
    <div class="scroll-end-buffer"></div>
  </div>
</template>

<style scoped>
.article-reader {
  position: relative;
  margin-top: 1.5rem;
  padding-top: 1rem;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.progress-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(226, 232, 240, 0.8);
  z-index: 200;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #ff8356, #b6dedb);
  transition: width 0.1s ease-out;
}

.close-button {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 201;
  background: rgba(94, 168, 94, 0.95);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.close-button:hover {
  background: #ff8356;
  transform: scale(1.1);
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #fff;
}

.markdown-content {
  line-height: 1.8;
  color: #2D3748;
}

.markdown-content :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2D3748;
}

.markdown-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: #2D3748;
}

.markdown-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2D3748;
}

.markdown-content :deep(p) {
  margin-bottom: 1rem;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-content :deep(code) {
  background: #f7f780;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Menlo', 'Monaco', monospace;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background: #1a202c;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #b6dedb;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #4a5568;
  font-style: italic;
}

.markdown-content :deep(a) {
  color: #ff8356;
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.scroll-end-buffer {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
  font-size: 0.875rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(45, 55, 72, 0.2);
  padding-top: 1rem;
}

.scroll-end-buffer::after {
  content: '— End of article —';
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .close-button {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
  }
}
</style>

