import { ref, reactive, computed } from 'vue';
import api from '../api/axios';

export function useTickets() {
  const items = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const meta = reactive({ current_page: 1, last_page: 1, per_page: 10, total: 0 });

  const filters = reactive({
    status: '',
    priority: '',
    title: '',
    page: 1,
    per_page: 10,
    
  });

  async function fetchTickets() {
    loading.value = true;
    error.value = null;
    try {
      const params = {
        status: filters.status || undefined,
        priority: filters.priority || undefined,
        q: filters.q || undefined,
        page: filters.page,
        per_page: filters.per_page,
        
      };
      const resp = await api.get('/tickets', { params });
      
      items.value = resp.data.data || resp.data; 
      if (resp.data.meta) {
        meta.current_page = resp.data.meta.current_page;
        meta.last_page = resp.data.meta.last_page;
        meta.per_page = resp.data.meta.per_page;
        meta.total = resp.data.meta.total;
      } else if (resp.data.length !== undefined) {
       
      }
    } catch (err) {
      error.value = err.response?.data || err.message;
    } finally {
      loading.value = false;
    }
  }

  async function createTicket(payload) {
    return api.post('/tickets', payload);
  }

  async function updateTicket(id, payload) {
    return api.put(`/tickets/${id}`, payload);
  }

  async function deleteTicket(id) {
    return api.delete(`/tickets/${id}`);
  }

  function setPage(p) {
    filters.page = p;
  }

  function setPerPage(n) {
    filters.per_page = n;
  }

  return {
    items, loading, error, meta, filters,
    fetchTickets, createTicket, updateTicket, deleteTicket, setPage, setPerPage
  };
}
