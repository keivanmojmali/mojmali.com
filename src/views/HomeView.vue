<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BlogSection from '@/components/BlogSection.vue'

const router = useRouter()

let scrollTimeout: number | null = null

function handleScroll() {
  // Debounce scroll updates
  if (scrollTimeout) {
    window.clearTimeout(scrollTimeout)
  }

  scrollTimeout = window.setTimeout(() => {
    const tinkeringsSection = document.getElementById('tinkerings')
    if (tinkeringsSection) {
      const rect = tinkeringsSection.getBoundingClientRect()
      const isInView = rect.top <= 100 && rect.bottom > 100

      // Update hash without triggering navigation
      const currentHash = window.location.hash
      if (isInView && currentHash !== '#tinkerings') {
        history.replaceState(null, '', '#tinkerings')
      } else if (!isInView && currentHash === '#tinkerings' && window.scrollY < rect.top) {
        history.replaceState(null, '', window.location.pathname)
      }
    }
  }, 100)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimeout) {
    window.clearTimeout(scrollTimeout)
  }
})
</script>

<template>
  <div class="page-container">
    <!-- Hero Section - Above the Fold (100vh) -->
    <section id="hero" class="hero-section">
      <div class="hero-content">
        <!-- Logo/Name -->
        <h1 class="juice-logo">
          keeeivan
          <span class="teal-layer">keeeivan</span>
        </h1>

        <!-- Job Title -->
        <div class="text-content">
          <h2 class="main-heading">
            senior software enginer @ unanet
          </h2>
          <div class="secondary-heading">
            broooooklyn, ny
          </div>
        </div>

        <!-- Patch Images -->
        <div class="images-content">
          <a href="https://github.com/keivanmojmali" target="_blank">
            <img src="/gh-patch.png" alt="GitHub Patch" class="patch-image" />
          </a>
          <a href="https://gitlab.unanet.io/keivan.mojmali" target="_blank">
            <img src="/gl-patch.png" alt="GitLab Patch" class="patch-image" />
          </a>
          <a href="https://www.linkedin.com/in/keivanmojmali/" target="_blank">
            <img src="/li-patch.png" alt="LinkedIn Patch" class="patch-image" />
          </a>
        </div>
      </div>
    </section>

    <!-- Main Content - White Background -->
    <main class="main-content">
      <div class="content-wrapper">
        <BlogSection />
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

.page-container {
  min-height: 100vh;
  background: #ffffff;
}

/* Hero Section - Above the Fold */
.hero-section {
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  background: #5ea85e;
  border-radius: 0 0 0.375rem 0.375rem; /* rounded-md on bottom only */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  position: relative;
}

.hero-content {
  max-width: 64rem;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.juice-logo {
  font-family: 'Stretch Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(2rem, 8vw, 5rem);
  font-weight: 700;
  color: #ff8356;
  text-align: left;
  margin: 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  width: 100%;
  font-feature-settings: "liga" 1, "clig" 1, "dlig" 1;
  position: relative;
  z-index: 1;
}

.juice-logo::before {
  content: '';
  position: absolute;
  background: #f7f780;
  width: 8.5em;
  height: 0.8em;
  opacity: 0.9;
  top: 0.1em;
  left: -0.1em;
  z-index: -1;
  border-radius: 0.1em;
}

.juice-logo::after {
  content: 'keeeivan';
  position: absolute;
  top: 0;
  left: 0;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  font-feature-settings: inherit;
  color: white;
  transform: translate(6px, 6px);
  z-index: 2;
}

.juice-logo .teal-layer {
  position: absolute;
  top: 0;
  left: 0;
  color: #b6dedb;
  transform: translate(12px, 12px);
  z-index: 3;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  font-feature-settings: inherit;
}

.text-content {
  width: 100%;
}

.main-heading {
  font-weight: 700;
  text-transform: uppercase;
  color: #2D3748;
  line-height: 1.1;
  margin: 0 0 1rem 0;
  font-family: 'Stretch Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-feature-settings: "liga" 1, "clig" 1, "dlig" 1;
}

.secondary-heading {
  font-weight: 700;
  text-transform: uppercase;
  color: #2D3748;
  line-height: 1.1;
  font-family: 'Stretch Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-feature-settings: "liga" 1, "clig" 1, "dlig" 1;
}

.images-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2rem;
}

.patch-image {
  height: auto;
  display: block;
  width: 100%;
  max-width: 200px;
}

.images-content a {
  flex: 1;
  display: flex;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.images-content a:hover {
  transform: scale(1.05);
}

/* Main Content - White Background */
.main-content {
  padding: 3rem 2rem;
  background: #ffffff;
}

.content-wrapper {
  max-width: 64rem;
  margin: 0 auto;
  width: 100%;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding: 1.5rem;
  }

  .hero-content {
    gap: 1.5rem;
  }

  .main-content {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1rem;
  }

  .hero-content {
    gap: 1rem;
  }

  .main-content {
    padding: 1.5rem 1rem;
  }

  .images-content {
    gap: 0.75rem;
  }
}
</style>
