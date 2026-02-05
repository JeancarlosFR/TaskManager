import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { TaskCreatePage } from './task-create.page';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';

describe('TaskCreatePage', () => {
  let component: TaskCreatePage;
  let fixture: ComponentFixture<TaskCreatePage>;

  const tasksServiceSpy = jasmine.createSpyObj('TasksService', ['createTask']);

  const navControllerMock = {
    navigateBack: jasmine.createSpy(),
    navigateForward: jasmine.createSpy(),
    navigateRoot: jasmine.createSpy(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCreatePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TasksService, useValue: tasksServiceSpy },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
        { provide: NavController, useValue: navControllerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
