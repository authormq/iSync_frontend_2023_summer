<template>
  <svg 
    t="1692794438057" 
    viewBox="0 0 1024 1024" 
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    p-id="1015" 
    style="display: inline-block"
    :width="size" 
    :height="size"
  >
    <path 
      d="M190.688 190.688a31.968 31.968 0 0 1 45.248 0l276.032 276.032 276.032-276.032a31.968 31.968 0 1 1 45.248 45.248l-276.032 276.032 276.032 276.032a32 32 0 0 1-45.248 45.248l-276.032-276.032-276.032 276.032a32 32 0 0 1-45.248-45.248l276.032-276.032-276.032-276.032a31.968 31.968 0 0 1 0-45.248z" 
      p-id="1016"
      :fill="color"
    >
    </path>
  </svg>
</template>

<script>
export default {
  name: 'CloseIcon',
  props: {
    size: { type: String, default: '20px' },
    color: { type: String, default: 'grey' }
  }
}
</script>