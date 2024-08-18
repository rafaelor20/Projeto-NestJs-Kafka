import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments/payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'payments-consumer',
      },
    },
  });
  await app.startAllMicroservices(); // inicia o módulo de consumo
  await app.listen(3001); // não esqueça de alterar a porta
}
bootstrap();
