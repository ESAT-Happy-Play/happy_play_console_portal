FROM node:14 AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the React app
RUN npm run build

# Start with Nginx base image
FROM nginx:alpine

# Copy React build files from build stage
COPY --from=build /app/build /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]



