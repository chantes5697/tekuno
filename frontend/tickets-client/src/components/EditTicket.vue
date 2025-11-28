<script>
import api from "@/api";

export default {
  props: ["ticketId"],

  data() {
    return {
      form: {
        title: "",
        description: "",
        status: "",
        priority: "",
      },
      error: null
    };
  },

  mounted() {
    this.loadTicket();
  },

  methods: {
    async loadTicket() {
      try {
        const res = await api.get(`/tickets/${this.ticketId}`);
        this.form = res.data.data;
      } catch (err) {
        this.error = "No se pudo cargar el ticket.";
      }
    },

    async update() {
      try {
        await api.put(`/tickets/${this.ticketId}`, this.form);
        this.$emit("updated");
      } catch (err) {
        this.error = "No se pudo actualizar.";
      }
    }
  }
};
</script>

<template>
  <div>
    <h2>Editar Ticket</h2>

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

    <button class="btn btn-primary" @click="update">Actualizar</button>
    <button class="btn btn-secondary ms-2" @click="$emit('cancel')">Cancelar</button>
  </div>
</template>
