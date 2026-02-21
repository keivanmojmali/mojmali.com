<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const isLoading = ref(true)
const progress = ref(0)

const route = useRoute()
const isHome = computed(() => route.path === '/')

onMounted(() => {
  if (!isHome.value) {
    isLoading.value = false
    progress.value = 100
    return
  }

  trackAssetLoading()
})

function trackAssetLoading() {
  // SINGLE CONTROL: Minimum display time in milliseconds
  const MIN_LOADING_TIME = 2000 // 4 seconds minimum
  const startTime = Date.now()

  const assetsToLoad: Promise<void>[] = []

  // 1. Wait for DOM to be fully loaded
  if (document.readyState !== 'complete') {
    assetsToLoad.push(
      new Promise((resolve) => {
        window.addEventListener('load', () => resolve())
      })
    )
  }

  // 2. Track all images (including background images)
  const imageUrls = getAllImageUrls()
  imageUrls.forEach((url) => {
    assetsToLoad.push(preloadImage(url))
  })

  // 3. Track fonts
  assetsToLoad.push(
    document.fonts.ready.then(() => {})
  )

  // Wait for all assets to load
  Promise.all(assetsToLoad).then(() => {
    // Calculate how long assets took to load
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, MIN_LOADING_TIME - elapsed)
    const totalTime = Math.max(elapsed, MIN_LOADING_TIME)

    // Animate progress from 0 to 100 over the total time
    const startProgress = Date.now()
    const interval = setInterval(() => {
      const progressElapsed = Date.now() - startProgress
      const newProgress = Math.min(Math.floor((progressElapsed / totalTime) * 100), 100)
      progress.value = newProgress

      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          isLoading.value = false
        }, 300)
      }
    }, 50)
  }).catch(() => {
    // If assets fail to load, still show loading for minimum time
    const totalTime = MIN_LOADING_TIME
    const startProgress = Date.now()
    const interval = setInterval(() => {
      const progressElapsed = Date.now() - startProgress
      const newProgress = Math.min(Math.floor((progressElapsed / totalTime) * 100), 100)
      progress.value = newProgress

      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          isLoading.value = false
        }, 300)
      }
    }, 50)
  })
}

function getAllImageUrls(): string[] {
  const urls: string[] = []

  // Get images from public folder that are in your HomeView
  const publicImages = [
    '/gh-patch.png',
    '/gl-patch.png',
    '/li-patch.png',
    '/favicon.svg'
  ]

  urls.push(...publicImages)

  // Get any img elements that might be in the DOM
  document.querySelectorAll('img').forEach((img) => {
    if (img.src && !urls.includes(img.src)) {
      urls.push(img.src)
    }
  })

  return urls
}

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve() // Don't fail on error, just continue
    img.src = url
  })
}
</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading && isHome" class="loading-screen">
      <!-- Green fill that grows from bottom to top -->
      <div class="loading-fill" :style="{ height: `${progress}%` }"></div>

      <!-- Centered loading text -->
      <div class="loading-text">
        [{{ progress }}%]
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 9999;
  overflow: hidden;
}

.loading-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #5ea85e;
  transition: height 0.3s ease-out;
  will-change: height;
}

.loading-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  z-index: 1;
  color: #000000;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

/* Fade out transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
