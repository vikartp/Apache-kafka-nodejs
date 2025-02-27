const { Kafka } = require('kafkajs');

// Initialize Kafka instance
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [
    'localhost:29092', 
    'localhost:39092',
    'localhost:49092'
  ], 
});

// Create a producer instance
const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  // Send a message to the Kafka topic
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello Kafka from Node.js!' },
      { value: 'This is a message from the producer' },
      {
        value: JSON.stringify({
          name: 'John Doe',
          age: 25,
          job: 'Software Engineer',
        }),
      },
      { value: 'This is the last message' },
    ],
  });

  await producer.disconnect();
};

run().catch(console.error);
