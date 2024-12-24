# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if you have one)
COPY package*.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install 

# Copy the rest of the application code
COPY . .
# Build the Next.js application
RUN pnpm build
# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
