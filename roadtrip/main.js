var item = Vue.component( 'item', {
    template: `
                <div class="col-md-4">
                    <h2>{{item.name}}</h2>
                    <img class="img-responsive" v-bind:src="item.imagePath"/>
                    <h3>Weight: {{item.weight}} lbs</h3>
                    <button class="btn btn-success" v-on:click="buyItem(item)">Buy - {{item.price }}</button>
                    <button class="btn btn-danger" v-on:click="sellItem(item)">Sell - {{ item.price }}</button>
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
        items: [
            {
                name: "Bazooka",
                description: "You never know when ",
                imagePath: 'http://baw-weapons.yez.dk/uploads/7/5/5/2/7552490/95044_orig.jpg',
                price: 15,
                weight: 30
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
                console.log( "over weight limit" );
                return true;
            } else
            {
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

