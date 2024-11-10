import {inject, Injectable} from '@angular/core';
import {Author, Book} from '../model/book';
import {Apollo, gql} from "apollo-angular";
import {Observable} from "rxjs";
import {ApolloQueryResult, FetchResult} from "@apollo/client/core";

const GET_BOOKS= gql`
  query($bookNumber: Int!) {
    bookByNumber(bookNumber: $bookNumber) {
      bookId
      bookNumber
      category
      title
      cost
      description
      authors {
        firstName
        lastName
      }
    }
  }
`;

const ADD_BOOK = gql`
  mutation newBook($bookNumber: Int!,
    $category: String!,
    $title: String!,
    $cost: Float!,
    $year: String,
    $description: String){
    newBook(createBookInput: {bookNumber: $bookNumber,
      category: $category,
      title: $title,
      cost: $cost,
      year: $year,
      description: $description}) {
      bookId
    }
  }
`;

const ADD_AUTHOR = gql`
  mutation newAuthor($bookNumber: Int!,
    $firstName: String!,
    $lastName: String!){
    newAuthor(createAuthorInput: {bookNumber: $bookNumber,
      firstName: $firstName,
      lastName: $lastName}) {
      firstName
      lastName
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apollo: Apollo = inject(Apollo);

  public getBook(bookNumber: number): Observable<ApolloQueryResult<any>> {
    return this.apollo
    .query<any>({
      query: GET_BOOKS,
      variables: {
        bookNumber
      }
    });
  }

  public addBook(b: Book): Observable<FetchResult<unknown>> {
    return this.apollo.mutate({
        mutation: ADD_BOOK,
        variables: {
          bookNumber: b.bookNumber,
          category: b.category,
          title: b.title,
          cost: b.cost,
          year: b.year,
          description: b.description
        }
      }
    );
  }

  addAuthor(author: Author): Observable<FetchResult<unknown>> {
    return this.apollo.mutate({
        mutation: ADD_AUTHOR,
        variables: {
          bookNumber: author.bookNumber,
          firstName: author.firstName,
          lastName: author.lastName
        }
      }
    );
  }
}
