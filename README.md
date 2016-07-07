# lets-get-functional

An exercise in problem solving in the functional idiom.

## Setup

0. If you haven't release your lodown library to `npm` (node package manager), follow the steps in this video to do so:
    
    [publishing-npm-packages](https://docs.npmjs.com/getting-started/publishing-npm-packages)
    

1. Install your lodown library by running the command and replacing `<my-user-name>` :
    
        npm install --save lodown-<my-user-name>

## Solve

Code and test your solutions in `index.js`. Customer data is available to you in the Array, `customers`. Utilizing your lodown library, write functions that take the Array of customers and return the following:

1. number of males.
2. number of females
2. oldest customer, youngest customer
3. average balance
4. how many customer's names begin with some letter
5. how many customer's friend's names begin with some letter
6. how many customers are friends
7. users have tags associated with them: find the top 3 most common tags
8. create a summary of genders, the output should be:
    
```javascript
{
    male: 3,
    female: 4,
    transgender: 1
}
```

Remember, in the node.js environment, you can both `console.log()` or use the dubugger to step through your code and inspect your work.