import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksService],
      imports: [ApolloTestingModule]
    });
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
