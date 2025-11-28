<script>
import api from "@/api";

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
      } catch (err) {
        this.error = "No se pudo crear el ticket.";
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
      <select v-model="form.status" class="form-select">
        <option value="open">Open</option>
        <option value="pending">Pending</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <div class="mb-3">
      <label>Priority</label>
      <select v-model="form.priority" class="form-select">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <button class="btn btn-success" @click="save">Guardar</button>
    <button class="btn btn-secondary ms-2" @click="$emit('cancel')">Cancelar</button>
  </div>
</template>
