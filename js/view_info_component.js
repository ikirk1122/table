Vue.component('view_component', {
    props: ["choosen_one", "index", "currentindex","choosenclass","choosenclassapply"],
    template: `
<div v-on:click="row" :class=thisclass >    
    <div class="content num">{{index+1}})</div>
    <div class="content" 
    v-for="(value, key) in choosen_one" 
    v-on:click="userChange(index,key)">{{choosen_one[key]}}</div>
 </div>`,
 data: function(){
     return{
         thisclass: this.choosenclass
     }
 },
 watch: {
            currentindex: function (i) {//wathes the change on choosen row and changes css back/color
                if (this.currentindex == this.index) {this.thisclass = "item choosenitem"; return}
                    if (this.currentindex != this.index) { this.thisclass = "item"; return}
            }           
        },
    methods: {
        userChange: function(index, key){
            let temp = [index, key]
            this.$emit('userchange', temp, index);
                    },
    row: function(key){
        this.$emit('row', this.index);
    }
    }
});

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