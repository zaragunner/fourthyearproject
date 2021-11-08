<template>
     <a :key="name" :href="href" :class="[current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="current ? 'page' : undefined">{{ name }}</a>
</template>

<script>
export default {
    props:{
        name: String,
        href: String,
        current: Boolean,

    }
}
</script>
