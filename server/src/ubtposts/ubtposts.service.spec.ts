import { Test, TestingModule } from '@nestjs/testing';
import { UbtpostsService } from './ubtposts.service';

describe('UbtpostsService', () => {
  let service: UbtpostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UbtpostsService],
    }).compile();

    service = module.get<UbtpostsService>(UbtpostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
