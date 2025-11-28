<script>
import api from "../api";

export default {
  data() {
    return {
      tickets: [],
      loading: false,
      error: null,
    };
  },

  async mounted() {
    this.loadTickets();
  },

  methods: {
    async loadTickets() {
      try {
        this.loading = true;
        const res = await api.get("/tickets");
        this.tickets = res.data.data; // si usas Resource
      } catch (e) {
        this.error = "Error cargando tickets";
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>

<template>
  <div>
    <h2 class="mb-3">Lista de Tickets</h2>

    <button class="btn btn-success mb-3" @click="$emit('create')">
      Crear Ticket
    </button>

    <div v-if="loading">Cargando...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <table class="table table-bordered" v-if="!loading && tickets.length">
      <thead>
        <tr>
          <th>Título</th>
          <th>Estado</th>
          <th>Prioridad</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.status }}</td>
          <td>{{ ticket.priority }}</td>
          <td>
            <button class="btn btn-primary btn-sm"
              @click="$emit('edit', ticket.id)">
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else-if="!loading">No hay tickets.</p>
  </div>
</template>
