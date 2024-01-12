# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app will run on
EXPOSE 4000

# Define environment variables
# Define environment variables
ENV MAIL_PASS=$MAIL_PASS
ENV MAIL_HOST=smtp.gmail.com
ENV MAIL_USER=dev.med360@gmail.com
ENV JWT_SECRET=niladri
ENV FOLDER_NAME=med360
ENV RAZORPAY_KEY=$RAZORPAY_KEY
ENV RAZORPAY_SECRET=$RAZORPAY_SECRET
ENV CLOUD_NAME=dvbnkndyc
ENV API_KEY=$API_KEY
ENV API_SECRET=$API_SECRET
ENV MONGODB_URL=$MONGODB_URL
ENV PORT=4000

# Command to run your application
CMD ["npm", "start"]
