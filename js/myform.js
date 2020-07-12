Vue.component('myform', {//form component whitch containes own methods and calls Vue.app methods
    props:
        ["choosen", "currentKey", "currentindex", "storage", "locale", "lang", "flag",//properties
            'change_locale', 'up', 'down', 'upvalue', 'downvalue', 'cleantable', 'switchvalue'],//methods

    template: `
    <div>
                <div id="title">
                    <img src="img/logo.png" class="title">Efectura &ndash; {{lang?locale.efectura[0]:locale.efectura[1]}} &reg;
                </div>
                <div id="holder"></div>
                <div class="infodiv">{{lang?locale.infodiv1[0]:locale.infodiv1[1]}}</div>
                <input id="myinput" type="text" v-model="choosen.key"/>
                <div class="infodiv">{{lang?locale.infodiv2[0]:locale.infodiv2[1]}}</div>
                <input id="infoinput" type="text" ref="infoinput" readonly="true"/>  
                <div class="infodiv">{{lang?locale.infodiv3[0]:locale.infodiv3[1]}}</div>        
                <textarea ref="myarea" resize="none"></textarea>
                
       
            <div id="menu">
                <div class="buttoncontainer">
                    <span class="buttonTop" @click="save">{{lang?locale.save[0]:locale.save[1]}}
                        <img src="img/save.png" :class=flag></span>
                    <span class="buttonTop" @click="add">{{lang?locale.add[0]:locale.add[1]}}
                        <img src="img/add.png" :class=flag></span>
                    <span class="buttonTop" @click="deleterow">{{lang?locale.del_row[0]:locale.del_row[1]}}
                        <img src="img/clean-one.png" :class=flag></span>
                    <span class="buttonTop" @click="clear">{{lang?locale.clear[0]:locale.clear[1]}}
                        <img src="img/clear.png" :class=flag></span>                                   
                </div>               
                <div class="buttoncontainer">
                    <span class="buttonTop" @click="up">{{lang?locale.up[0]:locale.up[1]}}
                        <img src="img/up-arrow2.png" :class=flag></span>
                    <span class="buttonTop" @click="down">{{lang?locale.down[0]:locale.down[1]}}
                        <img src="img/down-arrow2.png" :class=flag></span>
                    <span class="buttonTop" @click="upvalue">{{lang?locale.upvalue[0]:locale.upvalue[1]}}
                        <img src="img/up-arrow.png" :class=flag></span>
                    <span class="buttonTop" @click="downvalue">{{lang?locale.downvalue[0]:locale.downvalue[1]}}
                        <img src="img/down-arrow.png" :class=flag></span>
                </div>
                <div class="buttoncontainer">

            <span class="buttonTop" @click="switchvalue">{{lang?locale.switchvalue[0]:locale.switchvalue[1]}}
                <img src="img/switch.png" :class=flag></span> 
                <span class="buttonTop" @click="clean">{{lang?locale.clean[0]:locale.clean[1]}}
                <img src="img/clean-one.png" :class=flag></span>
                <span class="buttonTop" @click="cleantable">{{lang?locale.cleantable[0]:locale.cleantable[1]}}
                <img src="img/delete-table.png" :class=flag></span>               

                    <span class="buttonTop" @click='text_area_clean' >{{lang?locale.text_area_clean[0]:locale.text_area_clean[1]}}
                        <img src="img/clean.png" :class=flag></span>
             
                </div>             
                <div class="buttoncontainer">
                <span class="buttonTop" @click="import_from_json">{{lang?locale.ipmjson[0]:locale.ipmjson[1]}}
                    <img src="img/import.png" :class=flag></span>
                <span class="buttonTop" @click="export_to_json">{{lang?locale.expjson[0]:locale.expjson[1]}}
                    <img src="img/export.png" :class=flag></span>
                <span class="buttonTop" @click="import_file">{{lang?locale.impfile[0]:locale.impfile[1]}}
                    <img src="img/import.png" :class=flag></span>
                <span class="buttonTop" @click="export_file">{{lang?locale.expfile[0]:locale.expfile[1]}}
                    <img src="img/export.png" :class=flag></span>
                </div>
                <div class="buttoncontainer">
                    <span class="buttonTop" @click="import_csv">{{lang?locale.impcsv[0]:locale.impcsv[1]}}
                        <img src="img/import.png" :class=flag></span>
                    <span class="buttonTop" @click="export_csv">{{lang?locale.expcsv[0]:locale.expcsv[1]}}
                        <img src="img/export.png" :class=flag></span>               
                    <span class="buttonTop" @click='change_locale'>{{lang?locale.language[0]:locale.language[1]}}
                        <img src="img/planet.png" :class=flag>
                    </span>
                    <input ref="fileinput" type="file" name="inputnode" id="inputnode" @change="file_change"/>
                    <label class="buttonTop" for="inputnode">{{lang?locale.label[0]:locale.label[1]}}
                        <img src="img/file.png" :class=flag></label>          
                </div>
        </div>
   
    </div>`,
    methods: {
        text_area_clean: function () {
            this.$refs.myarea.value = "";
        },
        file_change: function () {
            this.$refs.infoinput.value = this.$refs.fileinput.files[0].name;
        },
        add: function (type) {
            this.$emit('add', "row")
        },
        clear: function () {
            this.$emit('clear')
        },
        clean: function () {
            this.$emit('clean')
        },
        save: function () {
            this.$emit('save')
        },
        deleterow: function () {
            this.$emit('deleterow')
        },
        export_to_json: function () {
            this.text_area_clean();
            this.$refs.myarea.value = JSON.stringify(this.storage);
        },
        export_file: function () {
            let a = JSON.stringify(this.storage);
            var blob = new Blob([a], { type: "text/plain;charset=utf-8" }); saveAs(blob, "table.json");
        },
        import_csv: function () {
            try {
                let fileinput = this.$refs.fileinput;
                let fileinfo = this.$refs.infoinput;
                let textareaa = this.$refs.myarea;
                let node = document.getElementById('inputnode');
                let reader = new FileReader();
                reader.onload = function () {
                    let temp = reader.result.split('\r\n');
                    temp = temp.map(element => {
                        return element.split(';')
                    });
                    let result = [];
                    for (let i = 1; i < temp.length - 1; i++) {
                        let obj = {};
                        obj[temp[0][0]] = (temp[i][0]);
                        obj[temp[0][1]] = (temp[i][1]);
                        result.push(obj)
                    }
                    textareaa.value = JSON.stringify(result);
                    fileinput.value = '';
                    fileinfo.value = '';

                }
                this.success();
                reader.readAsText(node.files[0])
            }
            catch (err) {
                if (err.name == "TypeError") this.error()
            }
        },
        error: function () {
            if (this.lang == true) document.getElementById('message').innerText = "Check your file!"
            else if (this.lang == false) document.getElementById('message').innerText = "Проверьте файл!"
            document.getElementById('message').style.left = window.innerWidth / 2 - (document.getElementById('message').offsetWidth) /2 + "px";
            document.getElementById('message').className = "message_error";
            setTimeout(this.undo, 3000);
        },
        success: function () {
            if (this.lang == true) document.getElementById('message').innerText = "Success!"
            else if (this.lang == false) document.getElementById('message').innerText = "Файл загружен успешно!"
            document.getElementById('message').style.left = window.innerWidth / 2 - (document.getElementById('message').offsetWidth) /2 + "px";
            document.getElementById('message').className = "message_success";
            setTimeout(this.undo, 3000);
        },
        undo: function () {
            document.getElementById('message').innerText = ""
            document.getElementById('message').className = "";
        },
        export_csv: function () {
            this.$refs.myarea.value = "";

            let data = [...this.storage];
            data = data.map(el => { return el.name + ";" + el.value + "\r\n"; });
            data.unshift("name;value" + "\r\n");
            data = data.join('');
            //console.log(data);
            var blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
            saveAs(blob, "table.csv");
        },
        import_file: function () {
            try {
                let fileinput = this.$refs.fileinput;
                let fileinfo = this.$refs.infoinput;
                let textareaa = this.$refs.myarea;

                let node = document.getElementById('inputnode');
                let reader = new FileReader();
                reader.onload = function () {
                    textareaa.value = reader.result;
                    fileinput.value = '';
                    fileinfo.value = '';

                }
                this.success();
                reader.readAsText(node.files[0]);
            }
            catch (err) {
                if (err.name == "TypeError") this.error()
            }


        },

        import_from_json: function () {
            let a; let error = false;
            try {
                a = JSON.parse(this.$refs.myarea.value);
                this.success();
            }
            catch (err) {
                this.error()
                error = true;
            }

            if (a != undefined && error == false) {
                this.$emit('importjson', a);
                this.$refs.fileinput.value = '';
                this.$refs.infoinput.value = '';
            }

            this.$refs.fileinput.value = ''; this.$refs.infoinput.value = '';
        }
    }
});