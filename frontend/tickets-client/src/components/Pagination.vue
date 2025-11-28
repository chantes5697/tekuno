<template>
  <div v-if="meta.last_page > 1" class="pagination">
    <button :disabled="meta.current_page <= 1" @click="$emit('change-page', meta.current_page - 1)">Prev</button>
    <span>Page {{ meta.current_page }} / {{ meta.last_page }}</span>
    <button :disabled="meta.current_page >= meta.last_page" @click="$emit('change-page', meta.current_page + 1)">Next</button>
  </div>
</template>

<script setup>
const props = defineProps({ meta: Object });
</script>
