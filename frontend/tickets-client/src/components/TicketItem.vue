<template>
  <div class="ticket">
    <h3>{{ ticket.title }}</h3>
    <p>{{ ticket.description }}</p>
    <small>Status: {{ ticket.status }} • Priority: {{ ticket.priority }}</small>
    <div class="actions">
      <button @click="edit">Editar</button>
      <button @click="remove">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTickets } from '../composables/useTickets';
const props = defineProps({ ticket: Object });
const emit = defineEmits(['deleted','edited']);
const { deleteTicket } = useTickets();

async function remove() {
  if (!confirm('Eliminar ticket?')) return;
  try {
    await deleteTicket(props.ticket.id);
    emit('deleted', props.ticket.id);
  } catch (e) {
    alert('Error al eliminar');
  }
}

function edit() {
  
  emit('edited', props.ticket);
}
</script>
