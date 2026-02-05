import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TaskDetailPage } from './task-detail.page';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

describe('TaskDetailPage', () => {
  let component: TaskDetailPage;
  let fixture: ComponentFixture<TaskDetailPage>;

  const storageMock = {
    create: jasmine.createSpy().and.resolveTo(),
    get: jasmine.createSpy().and.resolveTo(null),
    set: jasmine.createSpy().and.resolveTo(),
    remove: jasmine.createSpy().and.resolveTo(),
  };

  const activatedRouteMock = {
    snapshot: {
      state: {
        task: {
          id: 1,
          title: 'Tarea de prueba',
          completed: false,
        }
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDetailPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Storage, useValue: storageMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });
});
