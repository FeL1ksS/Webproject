Vue.use(VueMaterial);
var OrdersList = new Vue({
    el: "#Orders",
    data: {
        ListOrders: [],
        totalprice: 0,
        indexLastItem: "",
        removedItem: {},
        snackMessage: ""
    },
    methods: {        
        showSnackBar(Message,btn) {
          this.snackMessage = Message;    
          this.$refs.snackbar.open();
        },
        LocalOrders(){
            if (window.localStorage.Orders){
                this.ListOrders = Local.Get("Orders");
            }
            else {
                return 
            }
        }, 
        totalPrice: function(){
            this.totalprice = 0;
            let price = 0;
            for (var i = 0; i < this.ListOrders.length; i++) {
                console.log(this.ListOrders[i].Price_dish);
                price += parseInt(this.ListOrders[i].Price_dish * 100)/100;
            }
            
            this.totalprice = price.toFixed(2);
        },
        removeOrd: function (item) {
        this.indexLastItem = this.ListOrders.indexOf(item);
            this.removedItem = item; //Копия удаляемого элемента  
            this.ListOrders.splice(this.indexLastItem, 1); //Удаление элемента
            //Перезапись списка избранного
            Local.Set("Orders",this.ListOrders); 
            this.showSnackBar("Запись удалена"); //Оповещение
            this.totalPrice();
        },
        returnRemoveOrd: function(){ //Возвращает последний удаленный элемент
            
            this.ListOrders.splice(this.indexLastItem,-1,this.removedItem);
            Local.Set("Orders",this.ListOrders);
            this.$refs.snackbar.close();
            this.totalPrice();
        },
        
        deleteOrd: function(){
            this.ListOrders = [];
            Local.Remove("Orders");
            this.totalprice = 0;
        }
    },
    created: function(){
        this.LocalOrders();
        this.totalPrice();
    }

});