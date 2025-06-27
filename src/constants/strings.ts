export const STRINGS = {
  // Form labels and placeholders
  FORM: {
    TITLE_PLACEHOLDER: 'Título',
    STATUS_PLACEHOLDER: 'Status',
    RESPONSIBLE_PLACEHOLDER: 'Responsável',
    SAVE_BUTTON: 'Salvar',
    UPDATE_BUTTON: 'Atualizar',
    CANCEL_BUTTON: 'Cancelar',
  },

  // Status options
  STATUS: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    PENDING_LABEL: 'Pendente',
    COMPLETED_LABEL: 'Concluída',
  },

  // Task card labels
  TASK: {
    STATUS_LABEL: 'Status:',
    RESPONSIBLE_LABEL: 'Responsável:',
    EDIT_BUTTON: 'Editar',
    DELETE_BUTTON: 'Excluir',
  },

  // Filter labels
  FILTERS: {
    ALL: 'Todos',
    PENDING: 'Pendentes',
    COMPLETED: 'Concluídas',
    BY_STATUS: 'Filtrar por Status',
    BY_RESPONSIBLE: 'Filtrar por Responsável',
    SEARCH_PLACEHOLDER: 'Buscar por nome do responsável...',
    SEARCH_LABEL: 'Buscar por Responsável',
    FILTERS_TITLE: 'Filtros',
    STATUS_TITLE: 'Status',
    RESPONSIBLE_TITLE: 'Responsável',
    CLEAR_BUTTON: 'Limpar',
    APPLY_BUTTON: 'Filtrar',
    ALL_FILTERS: 'Todos os filtros',
  },

  // Navigation
  NAVIGATION: {
    HOME: 'Início',
    TASK_FORM: 'Formulário de Tarefa',
  },

  // Home screen
  HOME: {
    TITLE: 'Gerenciador de Tarefas',
    SUBTITLE: 'Gerencie suas tarefas de forma eficiente e organizada',
    HERO_TITLE: 'Modernize sua produtividade',
    HERO_DESCRIPTION: 'Ajudamos você a organizar tarefas com automação inteligente, garantindo mais controle, eficiência e precisão na gestão.',
    LOADING_TEXT: 'Carregando suas tarefas...',
    TOTAL_TASKS: 'Total de Tarefas',
    PENDING_TASKS: 'Pendentes',
    COMPLETED_TASKS: 'Concluídas',
    FILTERS_SECTION: 'Filtros',
    TASKS_SECTION: 'Suas Tarefas',
    NO_TASKS_FOUND: 'Nenhuma tarefa encontrada',
    EMPTY_STATE_FIRST_TASK: 'Comece criando sua primeira tarefa para organizar melhor seu dia',
    EMPTY_STATE_ADJUST_FILTERS: 'Tente ajustar seus filtros para ver mais tarefas',
  },

  // Network status
  NETWORK: {
    ONLINE: 'Online',
    OFFLINE: 'Offline',
    SYNC_BUTTON: 'Sincronizar',
    SYNCING: 'Sincronizando...',
    PENDING_TASKS: 'Tarefas pendentes',
    NO_CONNECTION: 'Sem conexão',
    NO_CONNECTION_MESSAGE: 'Você precisa estar conectado à internet para sincronizar as tarefas.',
    SYNC_CONFIRMATION: 'Sincronizar',
    SYNC_CONFIRMATION_MESSAGE: 'Deseja sincronizar as tarefas offline?',
    SYNC_CANCEL: 'Cancelar',
    SYNC_CONFIRM: 'Sincronizar',
  },

  // Messages
  MESSAGES: {
    EMPTY_TASKS: 'Nenhuma tarefa encontrada. Crie sua primeira tarefa!',
    LOADING: 'Carregando...',
    ERROR_LOADING: 'Erro ao carregar tarefas',
    ERROR_SAVING: 'Erro ao salvar tarefa',
    SUCCESS_SAVING: 'Tarefa salva com sucesso',
    DELETE_CONFIRMATION: 'Tem certeza que deseja excluir esta tarefa?',
    TASK_DELETED: 'Tarefa excluída com sucesso',
  },

  // Validation messages
  VALIDATION: {
    TITLE_REQUIRED: 'Título é obrigatório',
    RESPONSIBLE_REQUIRED: 'Responsável é obrigatório',
    INVALID_STATUS: 'Status inválido',
  },

  // Alert messages
  ALERT: {
    DELETE_TASK_TITLE: 'Excluir Tarefa',
    DELETE_TASK_MESSAGE: 'Tem certeza que deseja excluir "{title}"?',
    CANCEL: 'Cancelar',
    DELETE: 'Excluir',
  },
} as const 