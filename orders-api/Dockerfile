# node version
FROM node:23

WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy files to workspace
COPY . .

# Listen port
EXPOSE 3002

# Start
CMD ["npm", "start"]