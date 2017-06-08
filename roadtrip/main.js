var item = Vue.component( 'item', {
    template: `
                <div class="item col-md-3">
                    <h2>{{item.name}}</h2>
                    <img class="item-image img-responsive" v-bind:src="item.imagePath" v-on:click="buyItem(item)"/>
                    <h3>Weight: {{item.weight}} lbs</h3>
                    <button class="btn btn-success" v-on:click="buyItem(item)">Buy: $ {{item.price }}</button>
                    <button class="btn btn-danger" v-on:click="sellItem(item)">Sell: $ {{ item.price }}</button>
                </div>
              `,
    data: function ()
    {
        return {}
    },
    props: ['item'],
    computed: {

    },
    methods: {
        //check to see if not enough money
        buyItem: function ( item )
        {
            this.$emit( 'buy-item', item )
        },
        sellItem: function ( item )
        {
            this.$emit( 'sell-item', item )
        }
    }
});



var mainAppVm = new Vue( {
    el: '#app',
    data: {
        usersMoney: 100,
        maxUsersMoney: 100,
        minUserMoney:0,
        weightOfVehicle: 0,
        maxWeightOfVehicle: 500,
        minWeightOfVehicle: 0,
        validationMessage: "STARTING MESSAGE",
        isValid: true,
        purchasedItems: [],
        items: [
            {
                name: "Bazooka",
                description: "You never know when ",
                imagePath: 'http://baw-weapons.yez.dk/uploads/7/5/5/2/7552490/95044_orig.jpg',
                price: 15,
                weight: 30
            },
           
            {
                name: "Goat w/ Can",
                description: "You never know when ",
                imagePath: 'http://geek-whisperers.com/wp-content/uploads/2015/05/goat_can.jpg',
                price: 5,
                weight: 50
            },
            {
                name: "Spork",
                description: "You never know when ",
                imagePath: 'http://cdn.shopify.com/s/files/1/1365/2497/products/tumblr_lyq7rjeyjI1qzfsnio1_500_grande.gif?v=1478473486',
                price: 5,
                weight: 2
            },
            {
                name: "4 Loko w/ Bro",
                description: "You never know when ",
                imagePath: 'https://rokthespot.files.wordpress.com/2010/11/tumblr_lc5qhnotiw1qc0187o1_500.jpg',
                price: 2,
                weight: 200
            },
            {
                name: "Poop Bags",
                description: "You never know when ",
                imagePath: 'https://www.fourstarbrand.com/wp-content/uploads/2014/12/poop-bags.jpg',
                price: 10,
                weight: 1
            },
            {
                name: "Macho Man",
                description: "You never know when ",
                imagePath: 'https://uproxx.files.wordpress.com/2014/11/wlsavage1.jpg?quality=100&w=650',
                price: 5,
                weight: 250
            },
            {
                name: "Savage Pillow",
                description: "You never know when ",
                imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71UAsq6HomL._SX355_.jpg',
                price: 12,
                weight: 30
            },
            {
                name: "Fat Pug",
                description: "You never know when ",
                imagePath: 'https://pbs.twimg.com/media/BypeAXJIUAE8RKk.jpg',
                price: 5,
                weight: 80
            }
        ]
    },

    

    computed: {

    },
    methods: {

        buyItem: function (item)
        {
            this.usersMoney -= item.price;
            this.weightOfVehicle += item.weight;
            this.purchasedItems.push( item );
            this.isValidTransaction();

            
        },
        sellItem: function ( item )
        {
            this.usersMoney += item.price;
            this.weightOfVehicle -= item.weight;
            this.isValidTransaction();
        },
        isValidTransaction: function ()
        {
            if ( this.isWeightValid() && this.isMoneyValid() )
            {
                this.validationMessage = "";
                this.isValid = true;
            } else
            {
                this.isValid = false;
            }
            
        },

        //isMoneyValid: function ( )
        //{
        //    if ( this.usersMoney >= this.minUserMoney && this.usersMoney <= this.maxUsersMoney )
        //    {
        //        return true;
        //    }
        //    else
        //    {
        //        this.validationMessage = "You're broke fool!"
        //        return false;
        //    }
        //},

        isMoneyValid: function ()
        {
            if ( this.usersMoney < this.minUserMoney) 
            {
                this.validationMessage = "You're broke fool!";
                return false;
            } else if ( this.usersMoney > this.maxUsersMoney )
            {
                this.validationMessage = "You can't sell shiz you don't own fool!";
                return false;
            }
            else
            {
                return true;
            }
        },

        //isWeightValid: function ( )        {
        //    if ( this.weightOfVehicle >= this.minWeightOfVehicle && this.weightOfVehicle <= this.maxWeightOfVehicle )
        //    {
                
        //        return true;
        //    } else
        //    {
        //        this.validationMessage = "Too heavy fool!"
        //        return false;
        //    }
        //}


        isWeightValid: function ()      
        {
            if ( this.weightOfVehicle < this.minWeightOfVehicle )
            {
                this.validationMessage = "You can't have negative weight. This ain't a hot air balloon!"
                return false;
            } else if ( this.weightOfVehicle > this.maxWeightOfVehicle )
            {
                this.validationMessage = "Too heavy fool!"
                return false;
            } else
            {
                return true;
            }

        }
    }

})

