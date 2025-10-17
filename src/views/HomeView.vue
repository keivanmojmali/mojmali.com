<template>
  <div style="display: flex; flex-direction: column;">
    <!-- Main Content Section -->
  <section class="home-hero" style="flex: 1; padding: 2rem 2rem; display: flex; flex-direction: column;">
      <div style="width: 100%; max-width: 1300px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; flex-grow: 1; height: 100%;">

        <!-- JUICE Logo Text -->
            <h1 class="juice-logo">
              keeeivan
              <span class="teal-layer">keeeivan</span>
            </h1>
       <!-- Content Area -->
        <div class="content-container">
          <!-- Left Text Content -->
          <div class="text-content">
            <h1 class="main-heading">
              senior software enginer @ unanet
            </h1>

            <div class="secondary-heading">
              broooooklyn, ny
            </div>
          </div>

          <!-- Right Images Content -->
          <div class="images-content">
          <a href="https://github.com/keivanmojmali" target="_blank">
            <img
                src="/gh-patch.png"
                alt="GitHub Patch"
                class="patch-image"
              />
          </a>
            <a href="https://www.linkedin.com/in/keivanmojmali/" target="_blank">
              <img
                src="/li-patch.png"
                alt="LinkedIn Patch"
                class="patch-image"
              />
            </a>
          </div>
        </div>

      </div>
    </section>

  </div>

</template>

<style scoped>
@font-face {
  font-family: 'Stretch Pro';
  src: url('/fonts/StretchPro.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

.juice-logo {
  font-family: 'Stretch Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(2rem, 8vw, 8rem);
  font-weight: 700;
  color: #ff8356; /* Bottom layer - orange, no offset */
  text-align: left;
  margin: clamp(0.5rem, 2vw, 1rem) 0 clamp(1.5rem, 4vw, 3rem) 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  align-self: flex-start;
  width: 100%;
  max-width: 1300px;
  font-feature-settings: "liga" 1, "clig" 1, "dlig" 1;
  position: relative;
  z-index: 1;
}

.juice-logo::before {
  content: '';
  position: absolute;
  background: #f7f780; /* Yellow background box */
  width: 8.5em; /* Scales with font size */
  height: 0.8em; /* Scales with font size */
  opacity: 0.9;
  top: 0.1em; /* Scales with font size */
  left: -0.1em; /* Scales with font size */
  z-index: -1; /* Definitely behind all text */
  border-radius: 0.1em; /* Scales with font size */
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
  color: white; /* Middle layer */
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




.content-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: clamp(1rem, 3vw, 2rem);
  gap: clamp(1rem, 3vw, 2rem);
}

.text-content {
  flex: 1;
  max-width: 600px;
}

.main-heading {
  font-weight: 700;
  text-transform: uppercase;
  color: #2D3748;
  line-height: 1.1;
  margin-bottom: clamp(1rem, 3vw, 2rem);
  font-family: 'Stretch Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.8rem, 4vw, 4rem);
  font-feature-settings: "liga" 1, "clig" 1, "dlig" 1, "ss01" 1, "ss02" 1, "ss03" 1, "ss04" 1, "ss05" 1;
}

.secondary-heading {
  font-weight: 700;
  text-transform: uppercase;
  color: #2D3748;
  line-height: 1.1;
  font-family: 'Stretch Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.8rem, 4vw, 4rem);
  font-feature-settings: "liga" 1, "clig" 1, "dlig" 1, "ss01" 1, "ss02" 1, "ss03" 1, "ss04" 1, "ss05" 1;
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
  width: clamp(120px, 18vw, 280px);
}

/* Large desktop - enhance spacing */
@media (min-width: 1400px) {
  .content-container {
    gap: 3rem;
  }

  .juice-logo {
    margin-bottom: 4rem;
  }
}

/* Tablet landscape */
@media (max-width: 1200px) {
  .content-container {
    gap: 2rem;
  }
}

/* Tablet portrait */
@media (max-width: 900px) {
  .content-container {
    gap: 2rem;
  }

  .text-content {
    max-width: 100%;
  }
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

  .images-content {
    width: 100%;
    justify-content: flex-start;
    gap: 1.5rem;
  }

  /* Reduce section padding on mobile */
  .home-hero {
    padding: 1.5rem 1.5rem !important;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .content-container {
    gap: 1.5rem;
  }

  .images-content {
    gap: 1rem;
  }

  .main-heading {
    margin-bottom: 1rem;
  }

  /* Even less padding on small mobile */
  .home-hero {
    padding: 1rem 1rem !important;
  }
}

/* iPhone and small mobile */
@media (max-width: 430px) {
  .juice-logo {
    font-size: clamp(1.8rem, 10vw, 2.5rem);
  }
}

/* Extra small mobile */
@media (max-width: 360px) {
  .juice-logo {
    font-size: 1.8rem;
  }

  .main-heading,
  .secondary-heading {
    font-size: 1.5rem;
  }
}

.images-content a {
  display: inline-block;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.images-content a:hover {
  transform: scale(1.05);
}

</style>


