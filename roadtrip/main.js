var item = Vue.component( 'item', {
    template: `
                <div class="col-md-3">
                    <h2>{{item.name}}</h2>
                    <img class="img-responsive" v-bind:src="item.imagePath"/>
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
        weightOfVehicle: 0,
        maxWeightOfVehicle: 500,
        minWeightOfVehicle: 0,
        validationMessage:"",
        items: [
            {
                name: "Bazooka",
                description: "You never know when ",
                imagePath: 'http://baw-weapons.yez.dk/uploads/7/5/5/2/7552490/95044_orig.jpg',
                price: 15,
                weight: 30
            },
            {
                name: "Spork",
                description: "You never know when ",
                imagePath: 'http://cdn.shopify.com/s/files/1/1365/2497/products/tumblr_lyq7rjeyjI1qzfsnio1_500_grande.gif?v=1478473486',
                price: 50,
                weight: 2
            },
            {
                name: "Goat with Can",
                description: "You never know when ",
                imagePath: 'http://geek-whisperers.com/wp-content/uploads/2015/05/goat_can.jpg',
                price: 5,
                weight: 50
            },
            {
                name: "Pallet of Four Loko with Spirit Guide",
                description: "You never know when ",
                imagePath: 'https://rokthespot.files.wordpress.com/2010/11/tumblr_lc5qhnotiw1qc0187o1_500.jpg',
                price: 5,
                weight: 50
            }
        ]
    },

    computed: {

    },
    methods: {

        buyItem: function (item)
        {
            this.isValidPurchase( item );
            this.usersMoney -= item.price;
            this.weightOfVehicle += item.weight;
        },
        sellItem: function ( item )
        {
            this.isValidSale( item );
            this.usersMoney += item.price;
            this.weightOfVehicle -= item.weight;
        },
        isValidPurchase: function ( item )
        {
            var isPurchaseValid = true;
            if ( this.isOverWeight( item.weight ) )
            {
                isPurchaseValid = false;
            }
            return isPurchaseValid;
        },
        isValidSale: function ( item )
        {
            var isValidSale = true;
            if ( this.isUnderWeight( item.weight ) )
            {
                isValidSale = false;
            }
        },
        isOverWeight: function ( weight )
        {
            if ( this.weightOfVehicle + weight > this.maxWeightOfVehicle )
            {
                this.validationMessage = "over weight limit";
                console.log( "over weight limit" );
                return true;
            } else
            {
                this.validationMessage = "";
                return false;
            }
        },
        isUnderWeight: function ( weight )
        {
            if ( this.weightOfVehicle - weight < this.minWeightOfVehicle )
            {
                console.log( "under weight limit" );
                return true;
            } else
            {
                return false;
            }
        }
    }

})

