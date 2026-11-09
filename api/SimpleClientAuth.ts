
import {
  APIRequestContext,
  expect
} from '@playwright/test';

import { randomUUID } from 'node:crypto';

export class SimpleBooksAuth {

  constructor(
    private readonly request: APIRequestContext
  ) {}

  async generateToken(clientName: string): Promise<string> {

    // Generate a unique email for each registration
    const email = `ejada-${randomUUID()}@example.com`;

    const response = await this.request.post('/api-clients/', {
      data: {
        clientName,
        clientEmail: email
      }
    });

    expect(
      response.status(),
      'API client registration should succeed'
    ).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.accessToken).toEqual(
      expect.any(String)
    );

    expect(responseBody.accessToken.length).toBeGreaterThan(0);

    return responseBody.accessToken;
  }
}
