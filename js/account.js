Vue.use(VueMaterial);
var Account = new Vue({
    el: "#Account",
    data: {
        accListFavorite: [],
        indexLastItem: "",
        removedItem: {},
        snackMessage: ""
    },
    methods: {        
        showSnackBar(Message,btn) {
          this.snackMessage = Message;    
          this.$refs.snackbar.open();
        },
        accFavorite(){
            if (window.localStorage.Favorite){
                this.accListFavorite = Local.Get("Favorite");
            }
            else {
                return 
            }
        },   
        removeFav: function (item) {
        this.indexLastItem = this.accListFavorite.indexOf(item);
//            console.log(this.indexLastItem);
            this.removedItem = item; //Копия удаляемого элемента 
            
            this.accListFavorite.splice(this.indexLastItem, 1); //Удаление элемента
            
            //Перезапись списка избранного
            Local.Set("Favorite",this.accListFavorite);
            
//            window.localStorage.setItem("Favorite", JSON.stringify(this.accListFavorite)); 
            
            this.showSnackBar("Запись удалена"); //Оповещение
        },
        returnRemoveFav: function(){ //Возвращает последний удаленный элемент
            
            this.accListFavorite.splice(this.indexLastItem,-1,this.removedItem);
            Local.Set("Favorite",this.accListFavorite);
//            window.localStorage.setItem("Favorite", JSON.stringify(this.accListFavorite));
            this.$refs.snackbar.close();
        },
        deleteFav: function(){
            this.accListFavorite = [];
            Local.Remove("Favorite");
//            window.localStorage.setItem("Favorite", null);
        },
        LoginOut: function(){
            Local.Remove("Account");    
//            window.localStorage.setItem("Account", null);
//            window.location = "authorization.html";
            window.location = "index.html";
        }
    },
    created: function(){
//        let Local = new LocalStore();
        this.accFavorite();
    }

});