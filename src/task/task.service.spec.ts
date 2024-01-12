// src/task/task.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  describe('createTask', () => {
    it('should create a new task', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'This is a test task',
      };

      const createdTask = service.createTask(createTaskDto);

      expect(createdTask.id).toBeTruthy(); // Check if ID is generated
      expect(createdTask.title).toEqual(createTaskDto.title);
      expect(createdTask.description).toEqual(createTaskDto.description);
      expect(createdTask.completed).toBe(false); // Default value
    });
  });
});
