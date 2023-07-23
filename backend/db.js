const mongoose = require('mongoose');


const mongoURI ='mongodb+srv://Nimesh:mern123@cluster0.8kranep.mongodb.net/gofoodmern?retryWrites=true&w=majority'
// const mongoURI = 'mongodb://Nimesh:mern123@ac-sdsvqgb-shard-00-00.8kranep.mongodb.net:27017,ac-sdsvqgb-shard-00-01.8kranep.mongodb.net:27017,ac-sdsvqgb-shard-00-02.8kranep.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-txnuux-shard-0&authSource=admin&retryWrites=true&w=majority';
// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb+srv://Nimesh:mern123@cluster0.8kranep.mongodb.net/gofoodmern?retryWrites=true&w=majority');
// }

// var datab = mongoose.connection;

// datab.on('error',console.error.bind(console,'connection error:'));

// datab.once('open',function(){
//     console.log("We're connected bro!!");
    
//     const fetched_data = mongoose.connection.db.collection("food_items");
//     fetched_data.find({}).toArray(function(err,data){
//       if(err)
//         console.log(err);
//       else
//       console.log(data);
//     });

//   }); 

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected!');

    const fetched_data = mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray() 
    global.food_items=data;
    // console.log(food_items.length);

    const fetched_catData = mongoose.connection.db.collection("foodCategory");
    const catData = await fetched_catData.find({}).toArray();
    global.foodCategory = catData;
    // console.log(foodCategory.length);
    

  } catch (error) {
    console.log('err: ', error);
  }
};



module.exports=mongoDB;
