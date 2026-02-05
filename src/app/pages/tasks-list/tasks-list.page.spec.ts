import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TasksListPage } from './tasks-list.page';
import { Storage } from '@ionic/storage-angular';

describe('TasksListPage', () => {
  let component: TasksListPage;
  let fixture: ComponentFixture<TasksListPage>;

  const storageMock = {
    create: jasmine.createSpy().and.resolveTo(),
    get: jasmine.createSpy().and.resolveTo(null),
    set: jasmine.createSpy().and.resolveTo(),
    remove: jasmine.createSpy().and.resolveTo(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksListPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Storage, useValue: storageMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
