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

// Create a consumer instance
const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
    await consumer.connect();

    // Subscribe to the Kafka topic
    await consumer.subscribe(
        {
            topic: 'test-topic',
            // fromBeginning: true
        }
    );

    // Consume messages
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received message: ${message.value.toString()}`);
        },
    });
};

run().catch(console.error);
