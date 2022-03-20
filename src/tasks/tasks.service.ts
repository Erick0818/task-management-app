import { Get, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task{
        return this.tasks.find((task) => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const{ title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }

    deleteTaskById(id: string): void{
        this.tasks = this.tasks.filter((task) => task.id !== id); //iterates through all tasks and keep the ones that don't match id.
    }

    updateTaskStatus(id: string, status:TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
