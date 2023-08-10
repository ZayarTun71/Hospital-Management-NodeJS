const app = require("./src/routes/index");


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`);
});
