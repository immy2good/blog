import express from "express";
import bodyParser from "body-parser";


const app = express()
const port = 3000

app.set('view engine', 'ejs');
let blogPosts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    // more posts...
  ];
  

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//This middleware is necessary to parse form data sent through HTTP POST requests.
app.use(bodyParser.urlencoded({ extended: true }));



// Home Route
app.get('/', (req, res) => {
    res.render('index', { blogs: blogPosts });
});

// Create Route
app.get('/create', (req, res) => {
    res.render('create');
});

// Save Route
app.post('/post', (req, res) => {
    // Add new blog post to the array or file
    const newPost = {
        id: blogPosts.length + 1, // // Simple ID assignment, might need a better approach for unique IDs
        title: req.body.title,
        content: req.body.content
    };
    blogPosts.push(newPost); // add the new post to blogPosts array (otherwise write to a file or database in)
    res.redirect('/');
});

// // Delete Route
// app.get('/delete/:id', (req, res) => {
//     // Delete the blog post with given id
//     res.redirect('/');
// });


app.listen(port, () => console.log(`Blog app listening on port ${port}!`))