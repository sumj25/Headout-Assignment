import express from "express";
import fs from "fs";
import readline from "readline";

const app = express();
const port = process.argv[2] || 8080;

// Define a route to handle GET requests to "/data"
app.get("/data", async (req, res) => {
  // Extract query parameters 'n' and 'm' from the request
  const { n, m } = req.query;

  // Check if 'n' is missing
  if (!n) {
    res.status(400).send("Missing n query parameter");
    return;
  }

  // Check if the number of files is greater than 31
  if (parseInt(m) > 31) {
    res.status(404).send("Number of files should be less than 31");
    return;
  }

  // Check if both 'n' and 'm' are missing
  if (!n && !m) {
    res.status(400).send("Missing n and m query parameters");
    return;
  }

  try {
    // Construct the file path based on the value of 'n'
    const filePath = `./txtfiles/${n}.txt`;

    // Create a readable stream for the file
    const fileStream = fs.createReadStream(filePath);

    // Create a readline interface for efficient line-by-line reading
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let lineNumber = 1;
    let fileContent = "";

    // Iterate through each line of the file
    for await (const line of rl) {
      // If 'm' is provided, capture the content of the specified line
      if (m && lineNumber === parseInt(m)) {
        fileContent = line;
        break;
      } else if (!m) {
        // If 'm' is not provided, append each line to the content
        fileContent += line + "\n";
      }
      lineNumber++;
    }

    // Send the file content as the response
    res.send(fileContent);
  } catch (error) {
    // Handle errors by sending a 500 Internal Server Error response
    res.status(500).send("Error reading file: " + error);
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
