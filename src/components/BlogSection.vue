<script setup lang="ts">
import { ref, computed } from 'vue'
import { articles, categories, type Article } from '@/data/articles'

const selectedCategory = ref<string | null>(null)

const filteredArticles = computed(() => {
  if (!selectedCategory.value) {
    return articles
  }
  return articles.filter(a => a.category === selectedCategory.value)
})

// Pad to ensure we always have rows of 3
const paddedArticles = computed(() => {
  const filtered = filteredArticles.value
  const remainder = filtered.length % 3
  const emptySlots = remainder === 0 ? 0 : 3 - remainder
  // Always show at least 3 slots
  const minSlots = Math.max(3, filtered.length + emptySlots)
  const result: (Article | null)[] = [...filtered]
  while (result.length < minSlots) {
    result.push(null)
  }
  return result
})

function selectCategory(category: string | null) {
  selectedCategory.value = category
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day}`
}
</script>

<template>
  <section id="tinkerings" class="blog-section">
    <!-- Section Header -->
    <div class="section-header-block">
      <h2 class="section-title">
        tinkerings
        <span class="white-layer">tinkerings</span>
        <span class="orange-layer">tinkerings</span>
      </h2>
    </div>

    <!-- Category Tabs -->
    <nav class="category-tabs">
      <button
        class="category-tab"
        :class="{ active: selectedCategory === null }"
        @click="selectCategory(null)"
      >
        All
      </button>
      <button
        v-for="category in categories"
        :key="category"
        class="category-tab"
        :class="{ active: selectedCategory === category }"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </nav>

    <!-- Full-width wrapper for grid with horizontal lines -->
    <div class="grid-wrapper">
      <!-- Articles Grid -->
      <div class="articles-grid">
        <div
          v-for="(article, index) in paddedArticles"
          :key="article ? article.slug : `empty-${index}`"
          class="article-cell"
          :class="{ 'empty-cell': !article }"
        >
          <!-- Filled article -->
          <article v-if="article" class="article-card">
            <router-link :to="`/article/${article.slug}`" class="article-link">
              <!-- Image -->
              <img :src="article.image" :alt="article.title" class="article-image" />

              <!-- Content -->
              <h3 class="article-title">{{ article.title }}</h3>

              <!-- Meta -->
              <div class="article-meta">
                <div class="meta-left">
                  <span class="article-category">{{ article.category }}</span>
                  <span class="meta-dot">•</span>
                  <time class="article-date">{{ formatDate(article.date) }}</time>
                </div>
                <span class="arrow-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </router-link>
          </article>
          <!-- Empty slot -->
          <div v-else class="empty-slot"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@font-face {
  font-family: 'Stretch Pro';
  src: url('/fonts/StretchPro.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

.blog-section {
  width: 100%;
}

.section-header-block {
  background: #b6dedb;
  padding: 3rem 2rem 1.5rem 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  min-height: 120px;
  width: 70%;
  border-radius: 0.375rem;
}

.section-title {
  font-family: 'Stretch Pro', sans-serif;
  font-size: clamp(1.25rem, 4vw, 2rem);
  font-weight: 400;
  color: #f7f780;
  margin: 0;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
  letter-spacing: 0.05em;
}

.section-title .white-layer {
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  transform: translate(3px, 3px);
  z-index: 2;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
}

.section-title .orange-layer {
  position: absolute;
  top: 0;
  left: 0;
  color: #ff8356;
  transform: translate(6px, 6px);
  z-index: 3;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
}

.category-tabs {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.category-tab {
  background: none;
  border: none;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #4a5568;
  cursor: pointer;
  transition: color 0.2s ease;
  font-family: inherit;
  text-transform: uppercase;
}

.category-tab:hover {
  color: #1a202c;
}

.category-tab.active {
  color: #1a202c;
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* Full-width wrapper - breaks out of container */
.grid-wrapper {
  /* Extend to full viewport width */
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  width: 100vw;
  border-top: 10px solid #ff8356;
  border-bottom: 10px solid #ff8356;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 2rem;
}

.article-cell {
  padding: 1.5rem;
  border-right: 10px solid #ff8356;
  border-left: 10px solid #ff8356;
  min-height: 280px;
}

/* Remove duplicate borders between columns */
.article-cell:nth-child(3n + 2),
.article-cell:nth-child(3n + 3) {
  border-left: none;
}

.article-card {
  height: 100%;
}

.empty-slot {
  height: 100%;
}

.article-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.article-link:hover .arrow-icon {
  background: #ff8356;
  border-color: #ff8356;
  color: white;
}

.article-image {
  width: 100%;
  margin-bottom: 1rem;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 400;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
  line-height: 1.4;
  font-family: Georgia, 'Times New Roman', serif;
  font-style: normal;
  text-transform: uppercase;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #718096;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.article-category {
  color: #4a5568;
  text-transform: uppercase;
}

.meta-dot {
  color: #a0aec0;
}

.article-date {
  color: #718096;
  text-transform: uppercase;
}

.arrow-icon {
  width: 28px;
  height: 28px;
  background: #e5e7eb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
  transition: all 0.2s ease;
}

/* Responsive */
@media (max-width: 900px) {
  .section-header-block {
    width: 85%;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  .article-cell {
    min-height: auto;
    border-right: 10px solid #ff8356;
    border-left: 10px solid #ff8356;
  }

  /* Hide empty cells on tablet */
  .article-cell.empty-cell {
    display: none !important;
  }
}

@media (max-width: 600px) {
  .section-header-block {
    width: 90%;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  .article-cell {
    border-right: 10px solid #ff8356;
    border-left: 10px solid #ff8356;
    min-height: auto;
    padding: 1rem;
  }

  /* Hide empty cells on mobile */
  .article-cell.empty-cell {
    display: none !important;
  }

  .category-tabs {
    gap: 1rem;
    flex-wrap: wrap;
  }
}
</style>
