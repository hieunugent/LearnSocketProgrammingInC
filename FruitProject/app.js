//jshint esversion:6

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitDB",{ useNewUrlParser: true });
const fruitSchema = new mongoose.Schema({
  name: {type:String, minlength:2, maxlength:20},
  rating: {
  type:Number,require:[true, "Please check your data entry no name specify"]
  },
  review: String
});
const Fruit = mongoose.model("Fruit", fruitSchema);

const pineapple = new Fruit({
  name : "Pineapple",
  rating: 10,
  review: "Great fruit"
});
//pineapple.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});
const Person = mongoose.model("Person", personSchema);
const person = new Person({
  name: "Amy",
  age: 20,
  favouriteFruit:pineapple
});
//person.save();
// Person.deleteMany({name:"Join"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("successfuly delete!!");
//   }
// })

Person.updateOne({name:"Join"}, {favouriteFruit: pineapple}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("successfuly update ");
  }
});
Person.find(function(err, person){
  if(err){
    console.log(err);
  }else{
    console.log("here is the information of people you have ");
    person.forEach(function(person){
      console.log(person);
    });

  }
});

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
    fruits.forEach(function(fruit){
    console.log(fruit.name);
    mongoose.connection.close();
    })

  }
});
