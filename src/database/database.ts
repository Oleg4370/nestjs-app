import { hashSync } from 'bcryptjs';

export const database = {
  operations: [
    {operation: 'buy', categoryId: 1, sum: 11, currency: 'UAH'},
    {operation: 'buy', categoryId: 2, sum: 22, currency: 'USD'},
    {operation: 'buy', categoryId: 3, sum: 33, currency: 'EUR'}
  ],
  users: [
    {login: 'testUser', id: '111', hash: hashSync('12345', 10)},
    {login: 'testAdmin', id: '222', hash: hashSync('123456789', 10)}
  ],
  refreshTokens: [
    { refreshToken: '1234567890', login: 'testUser' }
  ]
}
