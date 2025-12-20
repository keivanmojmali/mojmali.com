<script setup lang="ts">
import { computed } from 'vue'
import type { Article } from '@/data/articles'
import ArticleReader from './ArticleReader.vue'

const props = defineProps<{
  article: Article
  isExpanded: boolean
}>()

const emit = defineEmits<{
  toggle: [slug: string]
  close: []
}>()

const formattedDate = computed(() => {
  const date = new Date(props.article.date)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

function handleClick() {
  emit('toggle', props.article.slug)
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <div class="blog-row-wrapper">
    <article
      class="blog-row"
      :class="{ 'is-expanded': isExpanded }"
      @click="handleClick"
      role="button"
      tabindex="0"
      @keydown.enter="handleClick"
      @keydown.space.prevent="handleClick"
    >
      <!-- Image on the left -->
      <div class="blog-image-container">
        <img :src="article.image" :alt="article.title" class="blog-image" />
      </div>

      <!-- Text content on the right -->
      <div class="blog-text">
        <time class="blog-date">{{ formattedDate }}</time>
        <h3 class="blog-title">{{ article.title }}</h3>
        <p class="blog-subtitle">{{ article.subtitle }}</p>
      </div>
    </article>

    <!-- Expanded article content -->
    <Transition name="expand">
      <ArticleReader
        v-if="isExpanded"
        :article="article"
        @close="handleClose"
      />
    </Transition>
  </div>
</template>

<style scoped>
.blog-row-wrapper {
  margin-bottom: 2rem;
}

.blog-row {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.blog-row:hover {
  opacity: 0.8;
}

.blog-row:focus-visible {
  outline: 2px solid #ff8356;
  outline-offset: 4px;
  border-radius: 4px;
}

.blog-image-container {
  flex-shrink: 0;
  width: clamp(120px, 25vw, 200px);
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  overflow: hidden;
  background: #e2e8f0;
}

.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-text {
  flex: 1;
  min-width: 0;
  padding-top: 0.25rem;
}

.blog-date {
  display: block;
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.5rem;
}

.blog-title {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.blog-subtitle {
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: #4a5568;
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .blog-row {
    gap: 1rem;
  }

  .blog-image-container {
    width: 100px;
  }
}
</style>

