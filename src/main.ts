import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/global-exception.filter';
import { Config, IConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<IConfig>);
  const port = config.get(Config.Port);

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(port);

  console.log(`Running on port ${port}`);
}
bootstrap();
