# Atividade Vue.js: catálogo de componentes

## Como rodar
```bash
npm install
npm run dev
```
No GitHub Codespaces, abra a porta 5173 quando o aviso aparecer.

## Estrutura
```
src/
  main.js                      cria o app e registra o serviço $toast
  App.vue                      componente principal, orquestra os demais
  style.css                    variáveis de cor e estilos base
  services/toast.js            serviço global de notificações
  components/
    Accordion.vue              props: items | data: openIndex
    Pagination.vue             props: totalPages, currentPage | $emit: change
    ProgressBar.vue            props: value, label, showValue
    Tabs.vue                   props: tabs | data: active
    DropdownMenu.vue           props: options, selected | $emit: select
    ToastContainer.vue         exibe as notificações do serviço
```

## Conceitos cobrados
- Props: todos os componentes recebem dados do App.vue
- data e computed: `openIndex`, `active`, `open`, `filtered`, `totalPages`
- Eventos: `@click` e `$emit` (`change`, `select`)
- Lifecycle hooks: `created` e `beforeUnmount` (App.vue), `mounted` e `beforeUnmount` (DropdownMenu.vue)
# vue_elton
