import fs from "fs";
import crypto from "crypto";

// Function to generate random text of a specified size in bytes
const generateRandomText = (sizeInBytes) => {
  const randomText = crypto.randomBytes(sizeInBytes).toString("hex");
  return randomText;
};

// Function to create a file with random text and specified line length
const createFile = (filePath, fileSizeInBytes, lineLength) => {
  // Generate random text
  const randomText = generateRandomText(fileSizeInBytes);

  // Split the text into lines based on the specified line length
  const lines = [];
  for (let i = 0; i < randomText.length; i += lineLength) {
    lines.push(randomText.slice(i, i + lineLength));
  }

  // Join lines with newline characters
  const formattedText = lines.join("\n");

  // Write the formatted text to the specified file path
  fs.writeFile(filePath, formattedText, (err) => {
    if (err) {
      console.error(`Error creating file: ${err}`);
    }
  });
};

// Set constants for file size and line length
const fileSizeInBytes = 100 * 1024 * 1024; // 100MB
const lineLength = 80;

// Create 30 files with random text
for (let i = 0; i <= 30; i++) {
  // Generate file path
  const filePath = `./txtfiles/${i + 1}.txt`;

  // Create file with random text and specified line length
  createFile(filePath, fileSizeInBytes, lineLength);
}
