FROM node:18.16.0

COPY material-kit-react /home/material-kit-react
WORKDIR /home/material-kit-react
RUN npm install
VOLUME "/home/ubuntu/data/react/data"

EXPOSE 3000

CMD ["npm", "start"]