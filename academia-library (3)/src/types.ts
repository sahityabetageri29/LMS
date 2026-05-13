/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'Available' | 'Borrowed' | 'Reserved';
  year: number;
  cover: string;
  addedAt: string;
  borrowCount: number;
}

export type UserRole = 'Student' | 'Employee' | 'Admin';

export interface User {
  name: string;
  phone: string;
  semester: string;
  role: UserRole;
}
