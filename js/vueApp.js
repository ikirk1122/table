new Vue({
    el: "#myExel",
    data: {
        locale: {
            save:['Save changes',"Сохранить"],
            language:['Switch language',"Поменять язык"],
            ipmjson:['Import',"Импортировать"],
            expjson:['Export',"Экспортировать"],
            add:['Add row',"Добавить строку"],
            del_row:['Delete row',"Удалить строку"],
            clear:['Reset choosen',"Снять выделение"],
            clean:['Empty value',"Очистить ячейку"],
            cleantable:['Empty table',"Очистить таблицу"],
            swithvalue:['Swith colum',"Поменять столбец"],
            up:['Move whole row up',"Строку вверх"],
            down:['Move whole row down',"Строку вниз"],
            impfile:['Import JSON file',"Импорт JSON файл"],
            expfile:['Export JSON file',"Экспорт JSON файл"],
            impcsv:['Import CSV file',"Импорт CSV файл"],
            expcsv:['Export CSV file',"Экспорт CSV файл"],
            jsonwarn:['!!!',"!!!"],
            upvalue:['Move value up',"Сместить вверх"],
            downvalue:['Move value down',"Сместить вниз"],
            label:['Choose a file',"Выберете файл"],
            text_area_clean:['Clean buffer',"Очистить буфер"],
            efectura:['table editor',"редактор таблиц"]


        },
        choosenclass: "item",
        choosenclassapply: "item choosenitem",
        lang: true,
        flag: "flag",
        storagecopy: undefined,
        storage:[
            {name:"John",value:"nice guy"},
            {name:"Helen",value:"just Helen"},
            {name:"Bill",value:"Gates"},
            {name:"Joe",value:"age - 35"},
            {name:"Arnold",value:"...the Terminator"},
            {name:"Jane",value:"Smith"}
    
        ],
        choosen:{key:""},
        currentindex: undefined,
        currentKey: undefined,
        currentRow: undefined,
        sortdirection: true
    },

    methods:{
        choose: function(temp,index){//choose value
            this.choosen = {key: this.storage[temp[0]][temp[1]]};
            this.currentindex = temp[0];
            this.currentKey = temp[1];
            this.currentRow = index;
            if (this.currentRow==this.currentindex) this.choosenclass="item choosenitem"
        },
        add: function(type){//adds row
                let newObj={};
        for (let key in this.storage[0]){
        newObj[key]=""
        };
            this.storage.push(newObj);
            
        },
        save: function(){//apply changes
            if (this.currentKey!=undefined && this.currentindex!=undefined)
        this.storage[this.currentindex][this.currentKey] = this.choosen.key;           
        },
        clear: function(){//resets value selector
        this.currentindex =undefined;
        this.currentKey = undefined;
        this.currentRow = undefined;
        this.choosen.key = '';         
        },
        clean: function(){//resets value
            if (this.currentKey!=undefined && this.currentindex!=undefined)
        this.storage[this.currentindex][this.currentKey] = '';       
        },
        row: function(row){//memorizes choosen row
        this.currentRow = row;     
        },
        deleterow: function(){//deletes choosen row
            if (this.currentRow==0 && this.storage.length==1){
                for (let i in this.storage[0]){
                    this.storage[0][i]='';
                };
            }
            else if (this.currentRow==0 && this.storage.length>=2){
                
                    this.storage.shift();
                
            }
            else if (this.currentRow != undefined){
                this.storage.splice((this.currentRow),1);}
                this.currentindex =undefined;
                this.currentKey = undefined;
                this.choosen.key = '';
                this.currentRow = undefined
        },
        importjson: function(a){
            this.storage = a;
        },
        change_locale: function(){//changes language
            this.lang = !this.lang;
        },
            up: function(){//moves whole row up
            if (this.currentindex!=0 && this.currentindex!=undefined)
            {let a =[...this.storage];//copy of storage
            let b = a[this.currentindex];
            let c = a[this.currentindex-1];
            a[this.currentindex-1] = b;
            a[this.currentindex] = c;
            this.currentindex--;
            this.storage = a;}
            },

            cleantable: function(){
                this.storage=[{name:'',value:""}];
                this.clear();
            },
            switchvalue: function(){//moves value up
            if (this.currentKey!=undefined && this.currentindex!=undefined)
            {
                let a =[...this.storage];//copy of storage 
                
switch (this.currentKey){
    case 'name':
        {
            let temp = a[this.currentindex]['value']
        let curr = a[this.currentindex][this.currentKey]
        a[this.currentindex]['value'] = curr;
        a[this.currentindex]['name'] = temp;
        this.currentKey='value'
        break
        }
    case 'value':
        {
            let temp = a[this.currentindex]['name']
                    let curr = a[this.currentindex][this.currentKey]
                    a[this.currentindex]['name'] = curr;
                    a[this.currentindex]['value'] = temp;
                    this.currentKey='name'
                    break
        }
}


            this.storage = a;}
            },

            upvalue: function(){//moves value up
            if (this.currentindex!=0 && this.currentindex!=undefined)
            {let a =[...this.storage];//copy of storage
            let b = a[this.currentindex][this.currentKey];
            let c = a[this.currentindex-1][this.currentKey];
            a[this.currentindex-1][this.currentKey] = b;
            a[this.currentindex][this.currentKey] = c;
            this.currentindex--;
            this.storage = a;}
            },

            down: function(){//moves whole row down
            if (this.currentindex!=this.storage.length-1 && this.currentindex!=undefined)
            {let a =[...this.storage];//copy of storage
            let b = a[this.currentindex];
            let c = a[this.currentindex+1];
            a[this.currentindex+1] = b;
            a[this.currentindex] = c;
            this.currentindex++;
            this.storage = a;}
            },

            downvalue: function(){//moves value down
            if (this.currentindex!=this.storage.length-1 && this.currentindex!=undefined)
            {let a =[...this.storage];//copy of storage
            let b = a[this.currentindex][this.currentKey];
            let c = a[this.currentindex+1][this.currentKey];
            a[this.currentindex+1][this.currentKey] = b;
            a[this.currentindex][this.currentKey] = c;
            this.currentindex++;
            this.storage = a;}
            },
        sort: function(key){//sorts keys values from a to b, and b to a
            let m =[...this.storage];//copy of storage
            this.storagecopy = [...m];

function compare_name_ab(a,b) {
  if ( a.name<b.name )  return -1;
  if ( a.name>b.name )  return 1;
  return 0;
}
function compare_name_ba(a,b) {
  if ( a.name<b.name )  return 1;
  if ( a.name>b.name )  return -1;
  return 0;
}
function compare_value_ab(a,b) {
  if ( a.value<b.value )  return -1;
  if ( a.value>b.value )  return 1;
  return 0;
}
function compare_value_ba(a,b) {
  if ( a.value<b.value )  return 1;
  if ( a.value>b.value )  return -1;
  return 0;
}
if (key=="name" && this.sortdirection==true) {m.sort(compare_name_ab); this.sortdirection=false}
else if (key=="name" && this.sortdirection==false) {m.sort(compare_name_ba); this.sortdirection=true}
else if (key=="value" && this.sortdirection==true) {m.sort(compare_value_ab); this.sortdirection=false}
else if (key=="value" && this.sortdirection==false) {m.sort(compare_value_ba); this.sortdirection=true};

this.storage = m;
        }    
    }  
});