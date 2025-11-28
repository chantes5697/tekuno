<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.title" placeholder="Título" required />
    <textarea v-model="form.description" placeholder="Descripción"></textarea>

    <select v-model="form.status" required>
      <option value="open">Open</option>
      <option value="pending">Pending</option>
      <option value="closed">Closed</option>
    </select>

    <select v-model="form.priority" required>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button type="submit" :disabled="submitting">
      {{ isEdit ? 'Actualizar' : 'Crear' }}
    </button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useTickets } from '../composables/useTickets';

const props = defineProps({
  modelValue: Object // optional existing ticket for edit
});
const emit = defineEmits(['saved','cancel']);

const { createTicket, updateTicket } = useTickets();
const isEdit = !!props.modelValue;
const submitting = ref(false);
const error = ref(null);
const form = reactive({
  title: props.modelValue?.title || '',
  description: props.modelValue?.description || '',
  status: props.modelValue?.status || 'open',
  priority: props.modelValue?.priority || 'medium',
});

async function onSubmit() {
  submitting.value = true;
  error.value = null;
  try {
    if (isEdit) {
      await updateTicket(props.modelValue.id, form);
    } else {
      await createTicket(form);
    }
    emit('saved');
  } catch (e) {
    error.value = e.response?.data?.message || 'Error';
  } finally {
    submitting.value = false;
  }
}
</script>
