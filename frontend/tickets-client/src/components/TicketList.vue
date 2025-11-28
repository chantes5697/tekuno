<script>
import api from "@/api";

export default {
  data() {
    return {
      tickets: [],
      loading: false,
      error: null,

      // filtros
      search: "",
      status: "",
      priority: "",
    };
  },

  mounted() {
    this.loadTickets();
  },

  methods: {
    async loadTickets() {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.get("/tickets", {
          params: {
            title: this.search,
            status: this.status,
            priority: this.priority
          }
        });

        this.tickets = res.data.data;
      } catch (err) {
        this.error = "Error al cargar tickets.";
      }

      this.loading = false;
    },

    async deleteTicket(id) {
      if (!confirm("¿Eliminar este ticket?")) return;

      try {
        await api.delete(`/tickets/${id}`);
        this.loadTickets();
      } catch (err) {
        alert("No se pudo eliminar.");
      }
    }
  }
};
</script>

<template>
  <div>
    <h2 class="mb-3">Tickets</h2>

    <!-- FILTROS -->
    <div class="card p-3 mb-3">
      <div class="row">

        <div class="col-md-4 mb-2">
          <input
            v-model="search"
            @input="loadTickets"
            class="form-control"
            placeholder="Buscar por título..."
          />
        </div>

        <div class="col-md-3 mb-2">
          <select v-model="status" @change="loadTickets" class="form-select">
            <option value="">Status (todos)</option>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div class="col-md-3 mb-2">
          <select v-model="priority" @change="loadTickets" class="form-select">
            <option value="">Priority (todas)</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

      </div>
    </div>

    <!-- BOTÓN -->
    <button
      class="btn btn-success mb-3"
      @click="$emit('create')"
    >
      + Crear Ticket
    </button>

    <div v-if="loading">Cargando...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <table class="table table-striped" v-if="tickets.length && !loading">
      <thead class="table-light">
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="t in tickets" :key="t.id">
          <td>{{ t.id }}</td>
          <td>{{ t.title }}</td>
          <td>{{ t.description }}</td>
          <td>{{ t.status }}</td>
          <td>{{ t.priority }}</td>
          <td>
            <button class="btn btn-primary btn-sm me-2"
              @click="$emit('edit', t.id)">
              Editar
            </button>

            <button class="btn btn-danger btn-sm"
              @click="deleteTicket(t.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else-if="!loading">No hay tickets.</p>
  </div>
</template>
