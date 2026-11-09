
import { test, expect } from '@playwright/test';
import { SimpleBooksAuth } from '../../api/SimpleClientAuth';
import { SimpleBooksClient } from '../../api/SimpleBooksClient';
import booksData from '../../test-data/booksData.json';

test.describe('Simple Books API - Negative Scenarios', () => {

  test('API_05 - Invalid book ID', async ({ request }) => {

    const api = new SimpleBooksClient(request);

    const response = await api.getBook(
      booksData.invalidBookId
    );

    expect(response.status()).toBe(404);
  });

  test('API_06 - Create order without token', async ({ request }) => {

    const response = await request.post('/orders', {
      data: {
        bookId: 1,
        customerName: booksData.customerName
      }
    });

    expect(response.status()).toBe(401);
  });

  test('API_07 - Missing required customer name', async ({ request }) => {

    const auth = new SimpleBooksAuth(request);
    const token = await auth.generateToken(booksData.clientName);

    const api = new SimpleBooksClient(request);

    const booksResponse = await api.getBooks();
    expect(booksResponse.status()).toBe(200);

    const books = await booksResponse.json();
    const availableBook = books.find(
      (book: { available: boolean }) => book.available === true
    );

    expect(availableBook).toBeDefined();

    const response = await request.post('/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        bookId: availableBook.id
        // customerName intentionally missing
      }
    });

    expect(response.status()).toBe(400);
  });
});
