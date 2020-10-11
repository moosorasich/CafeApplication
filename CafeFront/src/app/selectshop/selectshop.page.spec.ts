import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectshopPage } from './selectshop.page';

describe('SelectshopPage', () => {
  let component: SelectshopPage;
  let fixture: ComponentFixture<SelectshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectshopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
