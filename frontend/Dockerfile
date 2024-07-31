# Use Node.js image for development
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose port 3000 for the React development server
EXPOSE 3000

CMD ["npm", "start"]