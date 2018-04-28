import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { MainHttpController } from './mainHttp.controller';
import { expect } from 'chai';

describe('MainHttpController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [
        MainHttpController
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let controller: MainHttpController;
  beforeEach(() => {
    controller = module.get(MainHttpController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
