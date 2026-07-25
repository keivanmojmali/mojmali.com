<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHome = computed(() => route.path === '/')

// The public assets that make up the above-the-fold home experience.
const PUBLIC_IMAGES = ['/gh-patch.png', '/gl-patch.png', '/li-patch.png', '/favicon.svg']

// The assets whose presence in the browser cache decides whether we bother
// showing the loading screen at all.
const CRITICAL_ASSETS = [...PUBLIC_IMAGES, '/fonts/StretchPro.otf']

// Provisionally show the screen on the home route. `onMounted` then probes the
// browser cache and hides it immediately if everything is already cached —
// this works even on a full page reload, when `document.readyState` is not yet
// `'complete'` and so can't tell us whether the assets are available.
const isLoading = ref(route.path === '/')
const progress = ref(0)

let interval: number | null = null

onMounted(async () => {
  if (!isLoading.value) return

  // If a prior visit already warmed the cache, skip the animation entirely.
  if (await allAssetsCached()) {
    isLoading.value = false
    return
  }

  lockScroll(true)
  trackAssetLoading()
})

onUnmounted(() => {
  if (interval) window.clearInterval(interval)
  lockScroll(false)
})

// Ask the browser cache directly whether every critical asset is already
// present. `cache: 'only-if-cached'` resolves only on a cache hit and rejects
// otherwise, so a single rejection means "not fully cached — show the screen".
async function allAssetsCached(): Promise<boolean> {
  try {
    await Promise.all(CRITICAL_ASSETS.map(isCached))
    return true
  } catch {
    return false
  }
}

async function isCached(url: string): Promise<void> {
  const res = await fetch(url, { cache: 'only-if-cached', mode: 'same-origin' })
  if (!res.ok) throw new Error(`not cached: ${url}`)
}

// Prevent the page behind the overlay from scrolling (kills the stray
// vertical/horizontal scrollbars while the loading screen is up).
function lockScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? 'hidden' : ''
  document.body.style.overflow = lock ? 'hidden' : ''
}

function trackAssetLoading() {
  const MIN_LOADING_TIME = 2000
  const startTime = Date.now()

  const assetsToLoad: Promise<void>[] = []

  if (document.readyState !== 'complete') {
    assetsToLoad.push(
      new Promise((resolve) => {
        window.addEventListener('load', () => resolve())
      })
    )
  }

  getAllImageUrls().forEach((url) => {
    assetsToLoad.push(preloadImage(url))
  })

  assetsToLoad.push(document.fonts.ready.then(() => {}))

  const runProgress = () => {
    const elapsed = Date.now() - startTime
    const totalTime = Math.max(elapsed, MIN_LOADING_TIME)
    const startProgress = Date.now()

    interval = window.setInterval(() => {
      const progressElapsed = Date.now() - startProgress
      const newProgress = Math.min(Math.floor((progressElapsed / totalTime) * 100), 100)
      progress.value = newProgress

      if (newProgress >= 100) {
        if (interval) window.clearInterval(interval)
        setTimeout(() => {
          isLoading.value = false
          lockScroll(false)
        }, 300)
      }
    }, 50)
  }

  Promise.all(assetsToLoad).then(runProgress).catch(runProgress)
}

function getAllImageUrls(): string[] {
  const urls: string[] = [...PUBLIC_IMAGES]

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
    img.onerror = () => resolve()
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
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
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
