# Step 1: Build the React application
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy other project files and build
COPY . .
RUN yarn build

# Step 2: Serve the React application from Nginx
FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from Step 1
COPY --from=build /app/dist /usr/share/nginx/html

# Optionally: Copy nginx configuration (if you have one)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
