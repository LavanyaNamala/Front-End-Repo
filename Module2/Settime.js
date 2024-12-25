// Step 1: Declare a global variable 'age' and assign a value
let age = 25; // You can set any value for age

// Step 2: Create a function displayAge that logs the value of age
function displayAge() {
    console.log("Age in global context: " + age);
}

// Step 3: Create a second function changeAge that updates the value of age
function changeAge(newAge) {
    age = newAge;
    console.log("Updated age inside function: " + age);
}

// Step 4: Call displayAge and changeAge to see how the value of age is updated
displayAge();  // This will show the value of age in the global context
changeAge(30); // This will change the value of age
displayAge();  // This will show the updated value of age
