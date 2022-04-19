<template>
     <a :key="name" :href="href" class="text-white mt-4 hover:bg-gray-500  px-3 py-2 rounded-md text-sm font-medium">{{ name }}</a>
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
