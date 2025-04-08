import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// home page text
app.get("/", (req, res) => {
    res.send("Today is Thursday!");
});

// shows api is working
app.get("/api", (req, res) => {
    res.json({message: "API is working", status: 200});
});

app.get("/api/name", (req, res) => {
    res.json({name: "Rhiannon"});
})

// new route to greet a user
app.get("/api/greet/:name", (req, res) => {
    const userName = req.params.name; // get the name from the URL (T.ex you would write in the URL /api/greet/Rhiannon)
    res.json({message: `Hello ${userName}!`});
});

app.post("/api/validate-name", (req, res) => {
    const name = req.body.name; // get the name from the request body

    if (!name || name.length < 3) {
        //if name is missing or shorter than 3 characters
        return res.status(400).json({error: "Name must be at least 3 characters long"});
    }

    //if name is valid
    res.status(200).json({message: `Hej ${name}!`});

})

const courses = [
    { id: 1, name: 'JavaScript Grundkurs' },
    { id: 2, name: 'Backend med Express' },
    { id: 3, name: 'React med Hooks' }
  ];

app.get("/api/courses", (req, res) => {
    const search = req.query.search; // get the 'search' query from the URL

    if (search) {
        // filter course where the name includes the search term
        const filteredCourses = courses.filter(course => 
            course.name.toLowerCase().includes(search.toLowerCase())
        );
        return res.json(filteredCourses);
    }
        // if no search query, return all courses
      res.json(courses);
});

// route to add a new course
app.post("/api/add", (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({error: "title and description is required"});
    }

    const newCourse = {title, description};
    courses.push(newCourse);

    res.json(courses); // returns the updated list of courses 
});

app.delete("/api/courses/:id", (req, res) => {
    const courseId = parseInt(req.params.id); // convert ID to a number
    const index = courses.findIndex(course => course.id === courseId); // find index of the course 

    if (index !== -1) {
        courses.splice(index, 1); // remove the course from the array
        res.json(courses); // return the updated list of courses
    }else{
        res.status(404).json({ error: "Course not found"}); // handle case where the course ID does not exist
    }
});

app.put("/api/courses/:id", (req, res) => {
    const courseId = parseInt(req.params.id); // extract id form URL
    const {name} = req.body; // get updated name from request body

    const course = courses.find(c => c.id === courseId); // find the course

    if(!course) {
        return res.status(404).json({error: "Course not found"}); // course not found
    }

    if(!name) {
        return res.status(400).json({error: "Name is required"}); // validate input
    }

    course.name = name; // update course name 
    res.json(courses); // return updated courses list
});


app.listen(PORT, () => {
console.log(`server is running on http://localhost:${PORT}`);
})