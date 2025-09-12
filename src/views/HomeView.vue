<template>
  <div style="height: 300vh; position: relative;">
    <!-- Main Content Section -->
    <section class="home-hero" style="background-color: #5ea85e; height: 100vh; padding: 2rem 2rem; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; right: 0; z-index: 1;">
      <div style="width: 100%; max-width: 100%; margin: 0 auto; display: flex; flex-direction: column; align-items: center; flex-grow: 1; height: 100%;">

        <!-- JUICE Logo SVG -->
        <svg
          style="margin-top: 1rem; margin-bottom: 3rem; width: 100%; color: #F5F5DC;"
          display="block"
          width="100%"
          viewBox="0 0 1376 378"
          fill="none"
          shape-rendering="geometricPrecision"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M106.963 3.5895V208.615C106.963 216.769 100.348 223.383 92.1931 223.383H3.58992C1.61122 223.383 0 224.994 0 226.972V374.411C0 376.389 1.61122 378 3.58992 378H156.642C205.756 378 245.556 338.19 245.556 289.096V284.136V223.383V3.5895C245.556 1.61104 243.945 0 241.966 0H110.538C108.56 0 106.949 1.61104 106.949 3.5895H106.963Z" fill="currentcolor"></path>
          <path d="M776.131 0H644.703C642.721 0 641.113 1.60707 641.113 3.5895V374.411C641.113 376.393 642.721 378 644.703 378H776.131C778.114 378 779.721 376.393 779.721 374.411V3.5895C779.721 1.60707 778.114 0 776.131 0Z" fill="currentcolor"></path>
          <path d="M1065.04 151.042V3.5895C1065.04 1.61104 1063.42 0 1061.45 0H905.44C856.326 0 816.525 39.8096 816.525 88.9038V289.082C816.525 338.19 856.34 377.986 905.44 377.986H1061.45C1063.42 377.986 1065.04 376.375 1065.04 374.396V226.958C1065.04 224.98 1063.42 223.369 1061.45 223.369H969.888C961.733 223.369 955.119 216.755 955.119 208.601V169.371C955.119 161.217 961.733 154.603 969.888 154.603H1061.45C1063.42 154.603 1065.04 152.992 1065.04 151.013V151.042Z" fill="currentcolor"></path>
          <path d="M1376 142.393V3.5895C1376 1.61104 1374.39 0 1372.41 0H1108.07C1106.09 0 1104.48 1.61104 1104.48 3.5895V374.411C1104.48 376.389 1106.09 378 1108.07 378H1372.41C1374.39 378 1376 376.389 1376 374.411V235.621C1376 233.643 1374.39 232.032 1372.41 232.032H1248.68C1245.6 232.032 1243.09 229.53 1243.09 226.435V214.833C1243.09 211.752 1245.59 209.237 1248.68 209.237H1372.41C1374.39 209.237 1376 207.626 1376 205.647V170.629C1376 168.65 1374.39 167.039 1372.41 167.039H1248.68C1245.6 167.039 1243.09 164.538 1243.09 161.443V151.522C1243.09 148.441 1245.59 145.926 1248.68 145.926H1372.41C1374.39 145.926 1376 144.315 1376 142.336V142.393Z" fill="currentcolor"></path>
          <path d="M463.061 3.5895V208.615C463.061 216.769 456.446 223.383 448.291 223.383H438.369C430.214 223.383 423.6 216.769 423.6 208.615V3.5895C423.6 1.61104 421.989 0 420.01 0H288.582C286.603 0 284.992 1.61104 284.992 3.5895V289.096C284.992 338.205 324.806 378 373.906 378H512.712C561.826 378 601.626 338.19 601.626 289.096V284.136V223.383V3.5895C601.626 1.61104 600.015 0 598.036 0H466.608C464.63 0 463.018 1.61104 463.018 3.5895H463.061Z" fill="currentcolor"></path>
        </svg>

        <!-- Content Area -->
        <div class="content-container">
          <!-- Left Text Content -->
          <div class="text-content">
            <h1 class="main-heading">
              Lorem ipsum dolor sit amet consectetur adipiscing elit.
            </h1>

            <div class="secondary-heading">
              Sed do eiusmod tempor incididunt.
            </div>
          </div>

          <!-- Right Images Content -->
          <div class="images-content">
            <img
              src="/gh-patch.png"
              alt="GitHub Patch"
              class="patch-image"
            />
            <img
              src="/li-patch.png"
              alt="LinkedIn Patch"
              class="patch-image"
            />
          </div>
        </div>

      </div>
    </section>

  </div>

  <!-- Scroll-triggered bottom section -->
  <div
    class="bottom-section"
    :style="{
      transform: `translateY(${bottomSectionOffset}px)`,
    }"
  >
    <div class="bottom-content">
      <h2>More content coming soon...</h2>
      <p>This section reveals as you scroll down</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollY = ref(0)
const bottomSectionOffset = ref(300) // Start mostly hidden, scroll up to cover half of JUICE

const handleScroll = () => {
  scrollY.value = window.scrollY

  // Calculate how much to reveal based on scroll position
  // Start revealing after 50px of scroll, fully revealed and covering half JUICE at 600px
  const maxScroll = 600
  const minScroll = 50
  const scrollProgress = Math.max(0, Math.min(1, (scrollY.value - minScroll) / (maxScroll - minScroll)))

  // Move from 300px hidden to -200px (covering half the JUICE logo)
  bottomSectionOffset.value = 300 - (scrollProgress * 500)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial call
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.content-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2rem;
  gap: 2rem;
}

.text-content {
  flex: 1;
  max-width: 500px;
}

.main-heading {
  font-weight: 700;
  text-transform: uppercase;
  color: #2D3748;
  line-height: 1.1;
  margin-bottom: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.5rem, 4vw, 3rem);
}

.secondary-heading {
  font-weight: 700;
  text-transform: uppercase;
  color: #2D3748;
  line-height: 1.1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.5rem, 4vw, 3rem);
}

.images-content {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex-shrink: 0;
}

.patch-image {
  height: auto;
  display: block;
  width: clamp(150px, 20vw, 300px);
}

/* Mobile breakpoint */
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }

  .text-content {
    max-width: 100%;
  }

  .main-heading,
  .secondary-heading {
    font-size: clamp(1.2rem, 6vw, 2rem);
  }

  .images-content {
    width: 100%;
    justify-content: flex-start;
  }

  .patch-image {
    width: clamp(120px, 30vw, 200px);
  }
}

/* Tablet breakpoint */
@media (min-width: 769px) and (max-width: 1024px) {
  .patch-image {
    width: clamp(180px, 18vw, 250px);
  }
}

/* Large desktop breakpoint */
@media (min-width: 1400px) {
  .main-heading,
  .secondary-heading {
    font-size: clamp(2.5rem, 3vw, 4rem);
  }

  .patch-image {
    width: clamp(250px, 18vw, 350px);
  }
}

.bottom-section {
  position: fixed;
  bottom: 0;
  left: 2rem;
  right: 2rem;
  height: 70vh;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  z-index: 5;
  transition: transform 0.1s ease-out;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 12px 12px 0 0;
}

.bottom-content {
  padding: 2rem;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.bottom-content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.bottom-content p {
  font-size: 1.2rem;
  opacity: 0.8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

@media (max-width: 768px) {
  .bottom-section {
    height: 60vh;
    left: 1rem;
    right: 1rem;
  }

  .bottom-content {
    padding: 1.5rem;
  }

  .bottom-content h2 {
    font-size: 1.5rem;
  }

  .bottom-content p {
    font-size: 1rem;
  }
}
</style>
