import { TestBed } from '@angular/core/testing';
import { NotificationService } from '../app/services/notification.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';



describe('ToastrService', () => {
  let service: NotificationService;
  let toastSVC: jasmine.SpyObj<ToastrService>;

  const params = {
    message: 'Test',
    title: 'Test'
  }

  beforeEach(() => {
    const spyToastSVC = jasmine.createSpyObj('ToastrService', ['success', 'warning', 'error', 'info']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-top-right'
        }),
      ],
      providers: [
        NotificationService,
        {
          provide: ToastrService,
          useValue: spyToastSVC,
        }
      ]
    });
    service = TestBed.inject(NotificationService);
    toastSVC = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call success toastr fn. with params', () => {
    service.success(params.message, params.title);
    expect(toastSVC.success).toHaveBeenCalledOnceWith(params.message, params.title);
  });
  
  it('should call error toastr fn. with params', () => {
    service.error(params.message, params.title);
    expect(toastSVC.error).toHaveBeenCalledOnceWith(params.message, params.title);
  });

  it('should call warning toastr fn. with params', () => {
    service.warning(params.message, params.title);
    expect(toastSVC.warning).toHaveBeenCalledOnceWith(params.message, params.title);
  });

  it('should call info toastr fn. with params', () => {
    service.info(params.message, params.title);
    expect(toastSVC.info).toHaveBeenCalledOnceWith(params.message, params.title);
  });
});
