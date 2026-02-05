import { TestBed } from '@angular/core/testing';
import { UseTasksHook } from './use-tasks.hooks';
import { TasksService } from 'src/app/services/tasks.service';
import { ApiTask } from '../models/task.model';

describe('UseTasksHook', () => {
  let hook: UseTasksHook;
  let tasksServiceSpy: jasmine.SpyObj<TasksService>;

  beforeEach(() => {
    tasksServiceSpy = jasmine.createSpyObj('TasksService', [
      'getTasks',
      'getCachedTasks',
    ]);

    TestBed.configureTestingModule({
      providers: [
        UseTasksHook,
        { provide: TasksService, useValue: tasksServiceSpy },
      ],
    });

    hook = TestBed.inject(UseTasksHook);
  });

  it('debe cargar tareas desde caché cuando el modo offline está activo', async () => {
    const mockTasks: ApiTask[] = [
      {
        id: 1,
        title: 'Tarea offline',
        completed: false,
        userId: 1,
        date: new Date().toISOString(),
      },
    ];

    tasksServiceSpy.getCachedTasks.and.resolveTo(mockTasks);
    hook.offlineMode = true;

    await hook.loadTasks();

    expect(tasksServiceSpy.getCachedTasks).toHaveBeenCalled();
    expect(hook.tasks).toEqual(mockTasks);
  });
});
