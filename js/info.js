Vue.component('information', {//componenet just to inform about keys in front of main table
    props: ["storage", 'sort'],
    template: `
    <div class="item">
    <div class="info num">№</div>
    <div title="Sort" class="info" v-for="(value, key) in storage" @click="sort(key)">{{key | uppercase}} &uArr; &dArr;</div>
 </div>`,
    methods: {
    },
    filters: {//'uppercases' keys
        uppercase(value) {
            return value.toUpperCase();
        },

    }
});