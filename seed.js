const moongose = require('mongoose');
const Product = require('./Models/Product');

const products = [
    {
        name: "iphone 13",
        desc:"The most advanced phone in the world",
        price: 90000,
        img : "https://images.unsplash.com/photo-1640437830863-8f7f38327319?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lJTIwMTN8ZW58MHx8MHx8fDA%3D"
    },
    {
        name: "iwatch",
        img : "https://images.unsplash.com/photo-1558126319-c9feecbf57ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXdhdGNofGVufDB8fDB8fHww",
        price: 65000,
        desc:"tumhari aukaat se bahar wali cheez"
    },
    {
        name: "macbook pro 2",
        img : "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
        price: 100000,
        desc:"kuch cheeze sirf dekhne k liye hi hote hai"
    },
    {
        name: "samsung 23 ultra",
        img : "https://images.unsplash.com/photo-1678958274412-563119ec18ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Ftc3VuZyUyMGdhbGF4eSUyMHMyMyUyMHVsdHJhfGVufDB8fDB8fHww",
        price: 110000,
        desc:"just looking like a wow"
    },
    {
        name: "sexdoll",
        img : "https://images.unsplash.com/photo-1563475454428-db1b68095419?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvbGx8ZW58MHx8MHx8fDA%3D",
        price: 80000,
        desc:'ek baar kharido or puri zindagi maze'
    }
]

function SeedDB(){
    Product.insertMany(products);
    console.log("seeded success");

}
module.exports = SeedDB;