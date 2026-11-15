<script>
import Accordion from './components/Accordion.vue'
import Pagination from './components/Pagination.vue'
import ProgressBar from './components/ProgressBar.vue'
import Tabs from './components/Tabs.vue'
import DropdownMenu from './components/DropdownMenu.vue'
import ToastContainer from './components/ToastContainer.vue'

export default {
  name: 'App',
  components: { Accordion, Pagination, ProgressBar, Tabs, DropdownMenu, ToastContainer },
  data() {
    return {
      products: [],
      category: 'all',
      page: 1,
      perPage: 4,
      progress: 0,
      uploading: false,
      timer: null,
      language: 'pt-BR',
      languages: [
        { label: 'Português', value: 'pt-BR' },
        { label: 'English', value: 'en' },
        { label: 'Español', value: 'es' }
      ],
      categories: [
        { label: 'Todas as categorias', value: 'all' },
        { label: 'Áudio', value: 'audio' },
        { label: 'Livros', value: 'livros' },
        { label: 'Casa', value: 'casa' }
      ],
      faq: [
        { title: 'Como faço para trocar um produto?', content: 'Você tem 30 dias após o recebimento. Acesse Meus pedidos, escolha o item e selecione Solicitar troca.' },
        { title: 'Quais formas de pagamento são aceitas?', content: 'Cartão de crédito em até 6 vezes sem juros, Pix e boleto bancário com 5% de desconto.' },
        { title: 'Quanto tempo leva a entrega?', content: 'Capitais recebem em até 3 dias úteis. As demais cidades, em até 8 dias úteis.' },
        { title: 'Como acompanho meu pedido?', content: 'O código de rastreio chega por e-mail assim que o pedido sai do estoque.' }
      ],
      profileTabs: [
        { title: 'Perfil', content: 'Maria Souza, estudante de Engenharia de Software. Membro desde março de 2024.' },
        { title: 'Pedidos', content: 'Você tem 3 pedidos: 1 em transporte, 1 entregue e 1 aguardando pagamento.' },
        { title: 'Configurações', content: 'Receber avisos por e-mail: ativado. Autenticação em duas etapas: desativada.' }
      ]
    }
  },
  computed: {
    filtered() {
      if (this.category === 'all') return this.products
      return this.products.filter((p) => p.category === this.category)
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filtered.length / this.perPage))
    },
    visibleProducts() {
      const start = (this.page - 1) * this.perPage
      return this.filtered.slice(start, start + this.perPage)
    }
  },
  created() {
    const catalog = [
      ['Fone Bluetooth', 'audio', 189.9], ['Caixa de som portátil', 'audio', 249],
      ['Microfone USB', 'audio', 329.5], ['Headset gamer', 'audio', 279],
      ['Romance policial', 'livros', 54.9], ['Guia de Vue 3', 'livros', 89],
      ['Contos brasileiros', 'livros', 39.9], ['Atlas ilustrado', 'livros', 129],
      ['Luminária de mesa', 'casa', 99.9], ['Jogo de xícaras', 'casa', 72],
      ['Organizador de cabos', 'casa', 34.5], ['Manta de algodão', 'casa', 118],
      ['Relógio de parede', 'casa', 86.9], ['Suporte para notebook', 'casa', 145]
    ]
    this.products = catalog.map(([name, category, price], i) => ({ id: i + 1, name, category, price }))
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    money(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    },
    categoryName(value) {
      return this.categories.find((c) => c.value === value).label
    },
    onCategory(option) {
      this.category = option.value
      this.page = 1
    },
    onLanguage(option) {
      this.language = option.value
      this.$toast.info(`Idioma alterado para ${option.label}.`)
    },
    startUpload() {
      if (this.uploading) return
      this.progress = 0
      this.uploading = true
      this.timer = setInterval(() => {
        this.progress = Math.min(100, this.progress + Math.ceil(Math.random() * 12))
        if (this.progress >= 100) {
          clearInterval(this.timer)
          this.uploading = false
          this.$toast.success('Arquivo enviado com sucesso.')
        }
      }, 300)
    },
    failUpload() {
      clearInterval(this.timer)
      this.uploading = false
      this.$toast.error('Falha no envio. Verifique sua conexão e tente novamente.')
    }
  }
}
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>Elton vue.js</h1>
        <p>Seis componentes Vue.js funcionando juntos em uma loja de exemplo.</p>
      </div>
      <DropdownMenu label="Idioma" :options="languages" :selected="language" @select="onLanguage" />
    </header>

    <main class="grid">
      <section class="panel span-2">
        <h2>Produtos</h2>
        <p class="lead">Filtre por categoria e navegue pelas páginas.</p>
        <div class="toolbar">
          <DropdownMenu label="Categoria" :options="categories" :selected="category" @select="onCategory" />
          <span class="muted">{{ filtered.length }} produtos, página {{ page }} de {{ totalPages }}</span>
        </div>
        <ul class="products">
          <li v-for="p in visibleProducts" :key="p.id">
            <strong>{{ p.name }}</strong>
            <span class="muted">{{ categoryName(p.category) }}</span>
            <span class="price">{{ money(p.price) }}</span>
          </li>
        </ul>
        <Pagination :total-pages="totalPages" :current-page="page" @change="page = $event" />
      </section>

      <section class="panel">
        <h2>Envio de arquivo</h2>
        <p class="lead">Simule um upload e acompanhe o progresso.</p>
        <ProgressBar :value="progress" label="relatorio-final.pdf" />
        <div class="btn-row">
          <button class="btn" :disabled="uploading" @click="startUpload">Enviar arquivo</button>
          <button class="btn secondary" :disabled="!uploading" @click="failUpload">Simular falha</button>
        </div>
      </section>

      <section class="panel">
        <h2>Minha conta</h2>
        <p class="lead">Dados do usuário organizados em abas.</p>
        <Tabs :tabs="profileTabs" />
      </section>

      <section class="panel">
        <h2>Perguntas frequentes</h2>
        <p class="lead">Toque em uma pergunta para ver a resposta.</p>
        <Accordion :items="faq" />
      </section>

      <section class="panel">
        <h2>Notificações</h2>
        <p class="lead">Mensagens temporárias de retorno ao usuário.</p>
        <div class="btn-row">
          <button class="btn" @click="$toast.success('Perfil salvo com sucesso.')">Salvar perfil</button>
          <button class="btn danger" @click="$toast.error('Não foi possível salvar. Tente novamente.')">Gerar erro</button>
          <button class="btn secondary" @click="$toast.info('Seu pedido saiu para entrega.')">Ver aviso</button>
        </div>
      </section>
    </main>

    <ToastContainer />
  </div>
</template>
