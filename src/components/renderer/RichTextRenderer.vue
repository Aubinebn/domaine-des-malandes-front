<script setup>
const props = defineProps({
    content: Array
})

function getComponent(type) {
    switch (type) {
        case 'paragraph':
            return Paragraph
        case 'heading':
            return Heading
        default:
            return Paragraph
    }
}

const Paragraph = {
    props: ['block'],
    template: `
    <p>
      <span v-for="(child, i) in block.children" :key="i">
        <strong v-if="child.bold">{{ child.text }}</strong>
        <em v-else-if="child.italic">{{ child.text }}</em>
        <span v-else>{{ child.text }}</span>
      </span>
    </p>
  `
}

const Heading = {
    props: ['block'],
    template: `
    <component :is="'h' + (block.level || 2)">
      <span v-for="(child, i) in block.children" :key="i">
        <strong v-if="child.bold">{{ child.text }}</strong>
        <em v-else-if="child.italic">{{ child.text }}</em>
        <span v-else>{{ child.text }}</span>
      </span>
    </component>
  `
}
</script>

<template>
    <div v-if="content">

        <component v-for="(block, index) in content" 
            :key="index" 
            :is="getComponent(block.type)" 
            :block="block"
        />

    </div>
</template>
