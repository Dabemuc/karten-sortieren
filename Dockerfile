# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable (optional default)
ENV PORT=3000

# Expose port (change if your app uses a different port)
EXPOSE ${PORT}

# Command to run the app
CMD ["node", "server/server.js"]
