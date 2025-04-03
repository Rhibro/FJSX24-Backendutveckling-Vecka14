import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// let courses = []

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

const courses = [
    { id: 1, name: 'JavaScript Grundkurs' },
    { id: 2, name: 'Backend med Express' }
  ];

app.get("/api/courses", (req, res) => {
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


app.listen(PORT, () => {
console.log(`server is running on http://localhost:${PORT}`);
})