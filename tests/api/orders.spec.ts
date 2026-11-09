
import { test, expect } from '@playwright/test';
import { SimpleBooksAuth } from '../../api/SimpleClientAuth';
import { SimpleBooksClient } from '../../api/SimpleBooksClient';
import booksData from '../../test-data/booksData.json';

test.describe('Simple Books API - Order Management', () => {

  test('API_04 - Complete Order CRUD Workflow', async ({ request }) => {

    const auth = new SimpleBooksAuth(request);
    const publicApi = new SimpleBooksClient(request);

    let token = '';
    let bookId = 0;
    let orderId = '';

    // STEP 1 - Generate authentication token
    await test.step('Register API client and generate token', async () => {

      token = await auth.generateToken(booksData.clientName);

      expect(token.length).toBeGreaterThan(0);
    });

    const api = new SimpleBooksClient(request, token);

    // STEP 2 - Find an available book
    await test.step('Retrieve an available book', async () => {

      const response = await publicApi.getBooks();

      expect(response.status()).toBe(200);

      const books = await response.json();

      const availableBook = books.find(
        (book: { available: boolean }) => book.available === true
      );

      expect(availableBook).toBeDefined();

      bookId = availableBook.id;
    });

    try {

      // STEP 3 - Create order
      await test.step('POST - Create book order', async () => {

        const response = await api.createOrder(
          bookId,
          booksData.customerName
        );

        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body.orderId).toEqual(expect.any(String));
        expect(body.orderId.length).toBeGreaterThan(0);

        orderId = body.orderId;
      });

      // STEP 4 - Verify created order
      await test.step('GET - Verify created order', async () => {

        const response = await api.getOrder(orderId);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.id).toBe(orderId);
        expect(body.bookId).toBe(bookId);
        expect(body.customerName).toBe(booksData.customerName);
      });

      // STEP 5 - Update order
      await test.step('PATCH - Update customer name', async () => {

        const response = await api.updateOrder(
          orderId,
          booksData.updatedCustomerName
        );

        expect(response.status()).toBe(204);
      });

      // STEP 6 - Verify updated order
      await test.step('GET - Verify updated customer name', async () => {

        const response = await api.getOrder(orderId);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.customerName).toBe(
          booksData.updatedCustomerName
        );
      });

      // STEP 7 - Delete order
      await test.step('DELETE - Remove book order', async () => {

        const response = await api.deleteOrder(orderId);

        expect(response.status()).toBe(204);

        // The order is now deleted.
        orderId = '';
      });

    } finally {

      // Cleanup if an earlier assertion failed.
      if (orderId) {
        const cleanupResponse = await api.deleteOrder(orderId);

        if (cleanupResponse.status() !== 204 &&
            cleanupResponse.status() !== 404) {
          console.warn(
            `Order cleanup returned ${cleanupResponse.status()}`
          );
        }
      }
    }
  });
});
