const app = require("./server");

const PORT = process.env.NODE_ENV === "test" ? 3000 : 8080;

app.listen(PORT, () => {
  console.log(`Capstone Project Backend is running on http://localhost:${PORT}`);
});
