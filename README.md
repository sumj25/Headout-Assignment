# Running Docker Container with Resource Limits and Cross-Platform Compatibility

To launch the Docker container with specific resource limits and compatibility for both x86 and ARM architectures, follow the steps below:

1. **Clone this repository:**

   ```bash
   git clone https://github.com/sumj25/Headout-Assignment
   ```

2. **Build the Docker image named "headout-assignment":**

   ```bash
   docker build -t headout-assignment .
   ```

3. **Set resource limits using the --memory and --cpus flags while running the Docker container:**

   ```bash
   docker run --memory=1500m --cpus=2 --platform=linux/arm64,linux/amd64 headout-assignment
   ```

   This command ensures that the container runs with a maximum memory limit of 1500 megabytes and utilizes 2 CPU cores. Additionally, it specifies compatibility with both ARM64 and x86 architectures.

# Performance Optimizations in the Assignment

Throughout the development of this assignment, I implemented two significant optimizations to enhance the application's efficiency.

## Transition from readFileSync to createReadStream and readline

Initially, the application used `fs.readFileSync` to read files, loading the entire file into memory. This approach proved inefficient, especially for large files, potentially leading to memory exhaustion.

To address this, I optimized the file reading process by switching to `fs.createReadStream` combined with the `readline` module. This new approach reads the file in manageable chunks, allowing processing to commence as soon as the initial chunk becomes available. The result is improved memory efficiency and enhanced performance, particularly when handling large files.

## Script for Generating Large Text Files

To thoroughly evaluate the application's performance with substantial datasets, I introduced a dedicated script (`generateTxt.js`). This script generates 31 text files, each with a size of 100 megabytes, using the `fs` and `crypto` libraries. This synthetic data generation aids in robust testing and validation of the application's scalability and resource utilization.
