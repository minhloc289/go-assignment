FROM node:22.17.1

# Set working directory
WORKDIR /app

# Copy package.json và cài dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose cổng mặc định của Vite
EXPOSE 5173

# Chạy Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]