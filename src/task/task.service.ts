// src/task/task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  private tasks = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: uuidv4(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: false,
      timestamp: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updateTaskDto };
      return this.tasks[index];
    }
    throw new NotFoundException(`Task with ID '${id}' not found`);
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    return { message: 'Task deleted successfully' };
  }
}

  