<template>
  <div :class="bem('console')" @click="handleConsoleClick">
    <div ref="outputRef" :class="bem('console__output')">
      <div
        v-for="(log, index) in consoleStore.logs"
        :key="index"
        :class="bem({
          block: 'console',
          element: 'line',
          modifiers: [log.type],
        })"
      >
        <Icon
          :name="logIcons[log.type]?.iconName || 'info'"
          :size="logIcons[log.type]?.iconSize || 20"
          :class="bem({
            block: 'console',
            element: 'log-icon',
          })"
        />
        <span v-if="log.type === 'input'">
          <pre :class="bem({ block: 'console', element: 'arg' })">{{ log.args[0] }}</pre>
        </span>
        <span v-else-if="hasStyledLog(log.args)">
          <template v-for="(part, i) in parseStyledLog(log.args)" :key="i">
            <span
              :style="part.style"
              :class="bem({ block: 'console', element: 'styled-part' })"
            >
              {{ part.text }}
            </span>
          </template>
        </span>
        <span v-else>
          <span v-for="(arg, i) in log.args" :key="i">
            <pre :class="bem({ block: 'console', element: 'arg' })">{{ formatArg(arg) }}</pre>
          </span>
        </span>
      </div>
    </div>

    <form
      :class="bem({ block: 'console', element: 'input-wrap' })"
      @submit.prevent="evaluateInput"
    >
      <Icon
        name="chevron-right"
        :size="20"
        :class="bem({ block: 'console', element: 'icon' })"
      />
      <input
        ref="inputRef"
        v-model="input"
        :class="bem({ block: 'console', element: 'input' })"
        type="text"
        autocomplete="off"
        @keydown="handleKey"
      >
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useConsoleStore } from '@/stores/console';
import Icon from '@/components/Icon/Icon.vue';
import { bem } from '@/utils/bem';

const consoleStore = useConsoleStore();

const input = ref('');
const inputHistory = ref([]);
const historyIndex = ref(-1);
const outputRef = ref(null);
const inputRef = ref(null);

const logIcons = {
  warn: {
    iconName: 'warning',
    iconSize: 15,
  },
  error: {
    iconName: 'error',
    iconSize: 13,
  },
  input: {
    iconName: 'chevron-left',
    iconSize: 20,
  },
};

const captureConsole = (method, type) => {
  // eslint-disable-next-line no-console
  const original = console[method];
  // eslint-disable-next-line no-console
  console[method] = (...args) => {
    consoleStore.addLog(type, ...args);
    original.apply(console, args);
  };
};

const evaluateInput = () => {
  const code = input.value.trim();
  if (!code) return;

  consoleStore.addLog('input', code);
  inputHistory.value.push(code);
  historyIndex.value = inputHistory.value.length;

  try {
    const result = eval(code);
    consoleStore.addLog('log', result);
  } catch (err) {
    consoleStore.addLog('error', err.message);
  }

  input.value = '';
};

const handleKey = (e) => {
  if (e.key === 'ArrowUp') {
    historyIndex.value = Math.max(0, historyIndex.value - 1);
    input.value = inputHistory.value[historyIndex.value] || '';
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    historyIndex.value = Math.min(inputHistory.value.length, historyIndex.value + 1);
    input.value = inputHistory.value[historyIndex.value] || '';
    e.preventDefault();
  }
};

const formatArg = (arg) => {
  if (typeof arg === 'undefined') return 'undefined';
  if (arg === null) return 'null';
  if (typeof arg === 'object') {
    try {
      return JSON.stringify(arg, null, 2);
    } catch {
      return '[Object]';
    }
  }
  return String(arg);
};

const hasStyledLog = (args) =>
  args.length > 1 &&
  typeof args[0] === 'string' &&
  args[0].includes('%c') &&
  typeof args[1] === 'string';

const parseStyledLog = (args) => {
  const text = args[0];
  const styles = args.slice(1);
  const parts = text.split('%c');
  const result = [];

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length === 0) continue;
    result.push({
      text: parts[i],
      style: styles[i - 1] || '',
    });
  }

  return result;
};

const handleConsoleClick = (e) => {
  if (e.target.closest('.console__output')) return;

  inputRef.value?.focus();
};

onMounted(() => {
  consoleStore.loadLogs();
  ['log', 'warn', 'error'].forEach(method => {
    captureConsole(method, method);
  });

  // eslint-disable-next-line no-console
  console.clear = () => {
    consoleStore.logs = [];
    localStorage.removeItem('console_logs');
  };

  consoleStore.loadWelcomeState();

  if (!consoleStore.welcomeShown) {
    // eslint-disable-next-line no-console
    console.log(
      '%cWelcome To The Console%c\n🥝🍏🍐🍈🥒🍊🍎🍓🍉🍍🍇🍒🍋🥭🍑🍌🍈🥝🍓🍍🍊🍒🍎🍇🍌🍉🥭🍑🍋🥒🍏🍊',
      'font-size: 24px; color: #4CAF50;',
    );
    // eslint-disable-next-line no-console
    console.warn('This is a warning. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.');
    // eslint-disable-next-line no-console
    console.error('This is an error! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.');
    consoleStore.setWelcomeShown();
  }
});

watch(() => consoleStore.logs, async() => {
  await nextTick();
  const el = outputRef.value;
  if (el) el.scrollTop = el.scrollHeight;
}, { deep: true });
</script>

<style scoped lang="scss">
.console {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  padding: 4px;
}

.console__output {
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.console__line {
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 1px;
  gap: 7px;
  margin: 2px 0;
}

.console__line--warn {
  background-color: var(--warn-bg);
  color: var(--warn-text);
  
  .icon {
    color: var(--warn-icon);
  }
}

.console__line--error {
  background-color: var(--error-bg);
  color: var(--error-text);
  
  .icon {
    color: var(--error-icon);
  }
}

.console__line--input {
  border-bottom: 1px solid var(--border-accent);
  padding: 4px 0;
}

.console__styled-part {
  white-space: pre-wrap;
  word-break: break-word;
  display: inline;
}

.console__input-wrap {
  display: flex;
  align-items: center;
  padding: 4px 0;
}

.console__input {
  background-color: transparent;
  flex: 1;
  border: none;
  color: inherit;
  font: inherit;
  outline: none;
}

.console__icon {
  color: var(--console-chevron);
}
</style>