FROM node:20
WORKDIR /app-pix-message
EXPOSE 3000
COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]