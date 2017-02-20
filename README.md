# Algolia Solutions Team Hiring Assignment - Marc Wong

My take on the hiring assignment, built with React. 

I had a lot of fun working on the assignment and definitely learned a lot. I am looking forward to getting some feedback and seeing what things I can improve upon.


## Customer Question Answers
The answers to the customer questions can be found in `customer-questions.txt`



## Data Manipulation & Import
I converted the .csv into .json, merged the .json files, and imported the data to Algolia with a couple node scripts: `csv-to-json.js` and `import-algolia.js`. They can be found in `assets/js/ex`.

(The admin key has been removed from `import-algolia.js`. But you can still find it by looking through the commit history... D'oh! This won't happen again!)

There is an npm script that runs both scripts in package.json: `npm run convert-csv`


## Future Features to Add
Unfortunately, I ran out of time to implement/look into these ideas. Here are some things I would have liked to include:
- A favorites/bookmarking feature
- Adding search for facets
- Button to expand the number of food type facets available in the filters sidebar
- A dropdown where the user could choose what to Sort By
- Look into advanced syntax
