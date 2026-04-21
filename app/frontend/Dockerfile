# Lightweight development image for the Next.js frontend.
FROM node:20-alpine

WORKDIR /workspace

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]
