import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadTestComponent } from './image-upload-test.component';

describe('ImageUploadTestComponent', () => {
  let component: ImageUploadTestComponent;
  let fixture: ComponentFixture<ImageUploadTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
