### Q1. What is the difference between var, let, and const?

##### Answer:
var is a function scoped or global if declared outside a function.On the other hand const and let are block scoped and can not be accessed from outside of the block.
var can be re-declared and re-assigned.let can not be re-declared but can be re-assigned. And const can not be re-declared or re-assigned.var can be accessed before initializing but const and let can not be accessed before initializing.var is hoisted with undefined and const, let are also hoisted but it goes to temporal dead zone. For const, non-primitive variable such as object ,array can be modified because here const fixes the reference value

### Q2. What is the difference between map(), forEach(), and filter()?

##### Answer:
map() iterates through every element of an array and performs something on each element and then it returns a new array of those modified element.So the length of the returned array is same as the original array.

forEach() iterates through all the elements of an array like map() but it does not return anything.if we do not need to return anything but want to perform something to each element forEach() can be used.

filter() filters the element by checking a condition and returns a new array with those elements that satisfies the condition.So the length of the returned array may or may not same depending on the condition that satisfies all the element or not.

### Q3. What are arrow functions in ES6?

##### Answer:
Arrow function is the modern way to write a function in ES6. Arrow function has shorter and cleaner syntax.It does not require the keyword function to declare a function.Moreover if the function body contain only one expression then there is no need for the parenthesis and return as well.Arrow function does not have arguments object to access all the parameter.Arrow function is much more useful for anonymous functions.

### Q4. How does destructuring assignment work in ES6?

##### Answer:
Destructuring assignment in ES6 is the way to extract values from array or objects and assign them into variables.Destructuring works on both array and object. 

For array value can be extracted based on their position in the array.
For Example:
const numbers =[1,2,3];
const[a,b,c]=numbers;
so here a=1, b=2, c=3.

For object value can be extracted based on the property names.
For Example:
const person = { name: 'Asif', age: 25, salary: 30000 };
const { name, age, salary } = person;
so here name='Asif, age=25, salary=30000.

also we can change the variable name like this.
const { name: fullName, age: years, salary: income } = person;

For both array and object we can also set default value for the variables.

### Q5. Explain template literals in ES6. How are they different from string concatenation?

##### Answer:
Template literals are the modern way work with strings in ES6. We use backticks (``) instead of " " or ''.
It makes easier to write multiline strings and doesn't need any concatenation.We can also pass variable or expression using ${}.

In string concatenation we could not pass the variables or expression into the string directly.It gets messy when used it with variables or expression and writing multiline string.

So template literals are much more easier to write also cleaner and readable than string concatenation.
