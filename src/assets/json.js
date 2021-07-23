// import heroes from "./all.json";

// var heroes = require("./all.json");
var fs = require("fs");
var path = require("path");

const heroes = JSON.parse(fs.readFileSync("./all.json", "utf8"));
// console.log("config=>", heroes);
heroes.forEach(hero => {
  hero.image = {};
  hero.image.url = hero.images.sm;
});

console.log("hero1", heroes[0]);
fs.writeFileSync("./all.json", JSON.stringify(heroes));
