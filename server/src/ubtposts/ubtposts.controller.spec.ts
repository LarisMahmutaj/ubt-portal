import { Test, TestingModule } from '@nestjs/testing';
import { UbtpostsController } from './ubtposts.controller';

describe('Ubtposts Controller', () => {
  let controller: UbtpostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UbtpostsController],
    }).compile();

    controller = module.get<UbtpostsController>(UbtpostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
