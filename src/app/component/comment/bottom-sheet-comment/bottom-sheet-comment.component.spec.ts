import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetCommentComponent } from './bottom-sheet-comment.component';

describe('BottomSheetCommentComponent', () => {
  let component: BottomSheetCommentComponent;
  let fixture: ComponentFixture<BottomSheetCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomSheetCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
