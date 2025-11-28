<script>
import api from "../api";

export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        status: "open",
        priority: "medium",
      },
      error: null
    };
  },

  methods: {
    async save() {
      try {
        await api.post("/tickets", this.form);
        this.$emit("created");
      } catch (e) {
        this.error = "Error al crear el ticket";
      }
    }
  }
};
</script>

<template>
  <div>
    <h2>Crear Ticket</h2>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="mb-3">
      <label>Título</label>
      <input v-model="form.title" class="form-control" />
    </div>

    <div class="mb-3">
      <label>Descripción</label>
      <textarea v-model="form.description" class="form-control"></textarea>
    </div>

    <div class="mb-3">
      <label>Status</label>
      <select v-model="form.status" class="form-control">
        <option value="open">Open</option>
        <option value="pending">Pending</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <div class="mb-3">
      <label>Prioridad</label>
      <select v-model="form.priority" class="form-control">
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
    </div>

    <button class="btn btn-success" @click="save">Guardar</button>
    <button class="btn btn-secondary ms-2" @click="$emit('cancel')">Cancelar</button>
  </div>
</template>
