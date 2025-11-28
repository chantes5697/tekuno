<script>
import TicketList from "./components/TicketList.vue";
import CreateTicket from "./components/CreateTicket.vue";
import EditTicket from "./components/EditTicket.vue";

export default {
  components: { TicketList, CreateTicket, EditTicket },

  data() {
    return {
      currentView: "list",
      selectedTicketId: null,
      reloadKey: 0
    };
  },

  methods: {
    showList() {
      this.currentView = "list";
      this.reloadKey++;
    },
    showCreate() {
      this.currentView = "create";
    },
    showEdit(id) {
      this.selectedTicketId = id;
      this.currentView = "edit";
    }
  }
};
</script>

<template>
  <div class="container mt-4">

    <nav class="navbar bg-light p-3 rounded mb-4">
      <button class="btn btn-primary me-2" @click="showList">Tickets</button>
      <button class="btn btn-success" @click="showCreate">Crear Ticket</button>
    </nav>

    <TicketList
      v-if="currentView === 'list'"
      :key="reloadKey"
      @edit="showEdit"
      @create="showCreate"
    />

    <CreateTicket
      v-if="currentView === 'create'"
      @cancel="showList"
      @created="showList"
    />

    <EditTicket
      v-if="currentView === 'edit'"
      :ticketId="selectedTicketId"
      @cancel="showList"
      @updated="showList"
    />

  </div>
</template>
