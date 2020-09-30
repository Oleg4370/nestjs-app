FROM node:12.13.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001

#FROM node:12.13.0 AS runner
#WORKDIR /Users/oleh/projects/node-js-finances-nest
#COPY --from=builder /dist ./
#EXPOSE 3000
#CMD ["node", "main.js"]
