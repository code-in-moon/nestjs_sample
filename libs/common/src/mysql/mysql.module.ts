import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypeormOptions } from '@database'
// import { TypeormOptions } from '@common/mysql/config';
import { TypeormOptions } from '@app/common';

@Module({})
export class MysqlModule {
  static register(): DynamicModule {
    return {
      module: MysqlModule,
      imports: [
        TypeOrmModule.forRootAsync({ useClass: TypeormOptions, imports: [] }),
      ],
      providers: [],
      exports: [],
    };
  }
}
