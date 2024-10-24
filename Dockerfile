# Stage 1: Build Stage
# Use an official Node.js runtime as the base image for building the app
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Stage 2: Production Image
# Use a smaller Node.js runtime for production
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Expose the application on port 3000
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
