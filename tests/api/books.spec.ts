
import { test, expect } from '@playwright/test';
import { SimpleBooksClient } from '../../api/SimpleBooksClient';

test.describe('Simple Books API - Public Endpoints', () => {

  test('API_01 - Verify API status', async ({ request }) => {

    const api = new SimpleBooksClient(request);

    await test.step('GET API status', async () => {
      const response = await api.getStatus();

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toEqual(expect.any(Object));
    });
  });

  test('API_02 - Verify available books', async ({ request }) => {

    const api = new SimpleBooksClient(request);

    await test.step('GET all books', async () => {

      const response = await api.getBooks();

      expect(response.status()).toBe(200);

      const books = await response.json();

      expect(Array.isArray(books)).toBe(true);
      expect(books.length).toBeGreaterThan(0);

      const availableBook = books.find(
        (book: { available: boolean }) => book.available === true
      );

      expect(availableBook).toBeDefined();
    });
  });

  test('API_03 - Verify single book details', async ({ request }) => {

    const api = new SimpleBooksClient(request);

    const booksResponse = await api.getBooks();
    expect(booksResponse.status()).toBe(200);

    const books = await booksResponse.json();

    const availableBook = books.find(
      (book: { available: boolean }) => book.available === true
    );

    expect(availableBook).toBeDefined();

    await test.step('GET selected book details', async () => {

      const response = await api.getBook(availableBook.id);

      expect(response.status()).toBe(200);

      const book = await response.json();

      expect(book.id).toBe(availableBook.id);
      expect(book.available).toBe(true);
    });
  });
});
