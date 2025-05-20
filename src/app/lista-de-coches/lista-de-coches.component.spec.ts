import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeCochesComponent } from './lista-de-coches.component';

describe('ListaDeCochesComponent', () => {
  let component: ListaDeCochesComponent;
  let fixture: ComponentFixture<ListaDeCochesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDeCochesComponent]
    });
    fixture = TestBed.createComponent(ListaDeCochesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
