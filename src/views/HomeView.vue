<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false,
    timeZone: 'America/New_York'
  })
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<template>
  <section class="px-8 max-md:px-4 home-hero relative min-h-[95vh] overflow-clip max-sm:min-h-[calc(100svh-68px)] h-full flex flex-col bg-green-600">
    <div class="w-full max-w-full mx-auto flex flex-col items-center flex-grow h-full">
      <!-- Logo SVG -->
      <svg 
        class="mt-4 mb-12 w-full text-amber-100 max-md:mb-6 max-md:mt-3" 
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

      <div class="grid grid-cols-12 gap-6 w-full max-md:flex flex-col justify-between mb-10 max-md:mb-4">
        <div class="col-span-4 max-md:max-w-[24rem] max-sm:col-span-9 max-xs:col-span-12">
          <h1 class="text-4xl font-bold uppercase mb-6 max-md:mb-4 max-sm:max-w-64 text-amber-100">
            Lorem ipsum dolor sit amet consectetur.
          </h1>
          <div class="text-4xl font-bold uppercase max-sm:max-w-56 text-amber-100">
            Sed do eiusmod tempor.
          </div>
        </div>
        <div class="col-start-11 col-span-2 font-mono text-xs uppercase text-right max-lg:col-start-10 max-lg:col-span-3 max-md:hidden text-amber-100">
          Lorem ipsum dolor sit amet consectetur adipiscing elit
        </div>
      </div>

      <div class="w-full flex justify-between mt-auto pb-10 font-mono text-xs uppercase max-sm:pb-4 text-amber-100">
        <div>
          PHONE:<br>
          555-123-4567
        </div>
        <div class="text-right" aria-label="Contact Information">
          NEW YORK:<br>
          <span>{{ currentTime }}</span>
        </div>
      </div>

      <div class="fixed-animation fixed bottom-0 w-full h-[100svh] flex flex-col justify-end items-center max-md:pb-8 max-sm:pointer-events-none pointer-events-none">
        <div class="ball block relative mt-auto z-10 w-full max-h-[40vh] max-w-[90%] bottom-[-5.5%] max-sm:h-[40svh] max-sm:w-[40svh] max-sm:bottom-[-18%] max-sm:right-[-17%] transform translate-y-[-150vh] scale-[1.2]">
          <!-- Placeholder for interactive ball animation -->
          <div class="w-full h-full bg-amber-100 rounded-full flex items-center justify-center">
            <div class="text-green-600 font-mono text-sm">Interactive Element</div>
          </div>
        </div>
        
        <!-- Placeholder hand image -->
        <div class="custom-width hand block relative w-full max-w-[35%] max-h-[35vh] bottom-[-5%] pointer-events-none max-sm:bottom-[-12%] max-sm:right-[-17%] transform translate-y-[110%]">
          <div class="w-32 h-32 bg-amber-100 rounded-lg flex items-center justify-center">
            <span class="text-green-600 font-mono text-xs">Hand Image</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
