// document refers to the whole tree of elements at the top top level
console.log(document);

// access nested elements
console.log(document.body); // ✅
console.log(document.body.div); // ❌

console.clear();

// Selectors

// through its #id
// selects ONE element
const todoList = document.getElementById("todo-list");

// through their type
// selects ALL elements
// returns an HTMLCollection, not an array ⚠️
const allListItems = document.getElementsByTagName("li");

// we can use the selectors on other elements, not just `document`, they will select starting from that node
const todoListItems = todoList.getElementsByTagName("li");

// we can access elements in an HTMLCollection through their [index]
const firstListItem = todoListItems[0];

// we can access and manipulate properties of DOM elements
firstListItem.innerText = "repair bike tyre";

// make all the list items innerText upperCase

// transform an HTMLCollection into an array
// Array.from(todoListItems) -> [li,li, li]
// [...todoListItems] -> [li, li, li]

// for (let i = 0; i < todoListItems.length; i += 1) {
//   todoListItems[i].innerText = todoListItems[i].innerText.toUpperCase();
// }

[...todoListItems].forEach(function(item) {
  item.innerText = item.innerText.toUpperCase();
});

// through their type
// returns an HTML collection with all elements with a given class

console.log(document.getElementsByClassName("container"));
// HTMLCollection [div.container]
