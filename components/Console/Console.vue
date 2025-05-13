<template>
  <div class="console">
    <div class="console__output">
      <div
        v-for="(log, index) in logs"
        :key="index"
        :class="['console__line', `console__line--${log.type}`]"
      >
        {{ log.message }}
      </div>
    </div>
    <form @submit.prevent="evaluateInput" class="console__input-wrap">
      <span>&gt;</span>
      <input
        v-model="input"
        class="console__input"
        type="text"
        autocomplete="off"
        placeholder="Type JS here..."
      />
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const logs = ref([])
const input = ref('')

function addLog(type, message) {
  logs.value.push({ type, message })
}

function captureConsole(method, type) {
  const original = console[method]
  console[method] = function (...args) {
    addLog(type, args.join(' '))
    original.apply(console, args)
  }
}

function evaluateInput() {
  const code = input.value.trim()
  if (!code) return

  addLog('input', code)

  try {
    const result = eval(code)
    addLog('log', typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result))
  } catch (err) {
    addLog('error', err.message)
  }

  input.value = ''
}

onMounted(() => {
  captureConsole('log', 'log')
  captureConsole('warn', 'warn')
  captureConsole('error', 'error')
})
</script>

<style scoped lang="scss">
// TODO:
</style>
