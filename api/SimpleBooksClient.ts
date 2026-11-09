
import {
  APIRequestContext,
  APIResponse
} from '@playwright/test';

export class SimpleBooksClient {

  constructor(
    private readonly request: APIRequestContext,
    private readonly token?: string
  ) {}

  // Public API: Check status
  async getStatus(): Promise<APIResponse> {
    return await this.request.get('/status');
  }

  // Public API: Get all books
  async getBooks(): Promise<APIResponse> {
    return await this.request.get('/books');
  }

  // Public API: Get a single book
  async getBook(bookId: number): Promise<APIResponse> {
    return await this.request.get(`/books/${bookId}`);
  }

  // Generate authentication headers
  private authHeaders(): Record<string, string> {

    if (!this.token) {
      throw new Error('Access token is required');
    }

    return {
      Authorization: `Bearer ${this.token}`
    };
  }

  // Protected API: Create order
  async createOrder(
    bookId: number,
    customerName: string
  ): Promise<APIResponse> {

    return await this.request.post('/orders', {
      headers: this.authHeaders(),
      data: {
        bookId,
        customerName
      }
    });
  }

  // Protected API: Get all orders
  async getOrders(): Promise<APIResponse> {
    return await this.request.get('/orders', {
      headers: this.authHeaders()
    });
  }

  // Protected API: Get one order
  async getOrder(orderId: string): Promise<APIResponse> {
    return await this.request.get(`/orders/${orderId}`, {
      headers: this.authHeaders()
    });
  }

  // Protected API: Update order
  async updateOrder(
    orderId: string,
    customerName: string
  ): Promise<APIResponse> {

    return await this.request.patch(`/orders/${orderId}`, {
      headers: this.authHeaders(),
      data: {
        customerName
      }
    });
  }

  // Protected API: Delete order
  async deleteOrder(orderId: string): Promise<APIResponse> {
    return await this.request.delete(`/orders/${orderId}`, {
      headers: this.authHeaders()
    });
  }
}
