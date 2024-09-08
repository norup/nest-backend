import { Module } from '@nestjs/common';
import { UsersModule } from './users/app.module';
import { AuthModule } from './auth/app.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@database/database.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeORMConfig } from '@database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [TypeORMConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
