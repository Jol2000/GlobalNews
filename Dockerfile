# Set the base image to node
FROM node:10

MAINTAINER Jol Singh

# Make directory
RUN mkdir -p /usr/src/app

# Set the default directory where CMD will execute
WORKDIR /usr/src/app 

# Set Google credentials  
ENV GOOGLE_APPLICATION_CREDENTIALS massive-carrier-361807-b0a59d058238.json

# Set basic AWS credentials and API Key variables 
ENV AWS_ACCESS_KEY_ID ASIA5DYSEEJ4YOIMGJO4
ENV AWS_SECRET_ACCESS_KEY dic2Wcxtnjp7rtBKX46khoO5aBFl/7+VMa4YimbH
ENV AWS_SESSION_TOKEN IQoJb3JpZ2luX2VjEAgaDmFwLXNvdXRoZWFzdC0yIkcwRQIgW0b0Z2wtTYMiwzmbPye4m8ViHHh4ak0mNcQsjvKRjt4CIQCVfpHGhuI33Yz8p0nBJ/8JM9T8/KuGVyfpj7giEcmywSq5Awih//////////8BEAIaDDkwMTQ0NDI4MDk1MyIMHPsiBWP6i+6TqPHSKo0DHwA0DrvOTBRb0alCbweRv1RlxqWRqaTyp0ZGVtyz73mqrXR+MTVmN6bdGypnsUUnftlWLr5w/thZK8FL3niR0UH/vLHGsNwyudvrMOlSE2ZySc2nfytVKHvujXNylJwRJ12CNi9/07oxHKOHDcfZA7v0u0Ptn7cFP+k8Iu/3UGDRLzgBa5FM95tEpz3eDSXmZAH14JG6VKwPDGG4X4zzHAY7ObX7HQGT9Clj+DmtZVrhygHm5YHdkq80Y18V0A+gJXn1jXkewzFYPTgdBgYn+ywbuR9N67RIXeL6LnxMHmgXhL9tFxaxbNmFeGvMsjrAOsjoqTP50lwMf7TYiBMbgfCjAPVX4UsHj4qjDk/+t109MTHhq+EAqe4GEH3HrXaWsmYyW8qnA8Jmcf1QXf61fE3Fns9AxeHch5+Fi/HyGWy848XHTxJQvsyIg7TzqegtYV9I25BpdfFf1kufyDhUPo6DB6cWLO/cpkdHkDVqOobkqpRqMEodvo59owTU2a8vAoYrPSvHZcxaR49AlzCF4oCZBjqmAeTiQWyZu+rBS7RDQTcfFLeb+w7SHo/gbVZIB8aAGbpqdWsNylKQozkKiF6x3T9qdiqj4adqz4jabltRKbqmYRumonis3ZBkuvg+N95NUiKiLF9fU8Cvybb8QkBgPYWbC1bXZ/OsaS5wBN6uW5mac8WRx8PJTRhQ1DyxNj6IecLHHy/H0kRYOxlIGc3Lk5DYcdFUS91ltNBMOmBrV97kTd76i1P2HKc=

COPY package*.json ./

COPY . .

RUN export GOOGLE_APPLICATION_CREDENTIALS=GOOGLE_APPLICATION_CREDENTIALS

# Expose ports
EXPOSE 8000

# Set the default command to execute when creating a new container
CMD node app.js