<template>
  <div class="box-model">
    <div
      class="margin"
      :class="{ dimmed: hover && hover !== 'margin' }"
      @mouseover="hover = 'margin'"
      @mouseleave="hover = ''"
    >
      <span class="label top">10</span>
      <span class="label left">10</span>
      <span class="label right">10</span>
      <span class="label bottom">16</span>
      <div
        class="border"
        :class="{ dimmed: hover && hover !== 'border' }"
        @mouseover="hover = 'border'"
        @mouseleave="hover = ''"
      >
        <span class="label">border</span>
        <div
          class="padding"
          :class="{ dimmed: hover && hover !== 'padding' }"
          @mouseover="hover = 'padding'"
          @mouseleave="hover = ''"
        >
          <span class="label">padding</span>
          <div
            class="content"
            :class="{ dimmed: hover && hover !== 'content' }"
            @mouseover="hover = 'content'"
            @mouseleave="hover = ''"
          >
            914×24
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const hover = ref('');
</script>

<style scoped>
.box-model {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  font-family: sans-serif;
  user-select: none;
}

/* Section styles */
.margin {
  position: relative;
  background-color: #f8d4a6;
  padding: 16px;
  outline: 1px dashed #000;
  transition: box-shadow 0.2s ease, background-color 0.2s ease;
  color: #000;
}
.margin:hover {
  box-shadow: 0 0 0 2px #d98b00;
}

.border {
  position: relative;
  background-color: #f9e8a6;
  padding: 10px;
  outline: 1px solid #000;
  transition: box-shadow 0.2s ease, background-color 0.2s ease;
  color: #000;
}
.border:hover {
  box-shadow: 0 0 0 2px #e5c000;
}

.padding {
  position: relative;
  background-color: #cfe6a4;
  padding: 12px;
  outline: 1px dashed #000;
  transition: box-shadow 0.2s ease, background-color 0.2s ease;
  color: #000;
}
.padding:hover {
  box-shadow: 0 0 0 2px #8aa64b;
}

.content {
  background-color: #add8e6;
  text-align: center;
  padding: 5px;
  border: 1px solid #333;
  font-size: 14px;
  transition: box-shadow 0.2s ease, background-color 0.2s ease;
  color: #000;
}
.content:hover {
  box-shadow: 0 0 0 2px #5090c0;
}

/* Label styling */
.label {
  position: absolute;
  font-size: 12px;
  color: #333;
}
.label.top    { top: -16px; left: 50%; transform: translateX(-50%); }
.label.bottom { bottom: -16px; left: 50%; transform: translateX(-50%); }
.label.left   { top: 50%; left: -16px; transform: translateY(-50%); }
.label.right  { top: 50%; right: -16px; transform: translateY(-50%); }
.label:not(.top):not(.bottom):not(.left):not(.right) {
  top: 4px;
  left: 4px;
  font-weight: bold;
}

/* Dimmed background for non-hovered sections */
.dimmed {
  background-color: #fff !important;
  color: #000 !important;
}
</style>
