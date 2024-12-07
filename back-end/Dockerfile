# Sử dụng Node.js phiên bản 20 làm base image
FROM node:20-alpine
WORKDIR /usr/src/auth-service

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 80

# Khởi động ứng dụng
CMD ["npm", "start"]