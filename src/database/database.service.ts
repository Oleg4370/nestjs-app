import { Injectable } from '@nestjs/common';
import {find, reject} from 'lodash';
import { database } from './database';

export interface DatabaseInterface {
  findAll(selector: string): Promise<[any]>;
  add(selector: string, data: {}): Promise<any>;
  find(selector: string, query: object): Promise<any>;
  remove(selector: string, query: object): Promise<any>;
}
const getDB = () => database;

@Injectable()
export class DatabaseService implements DatabaseInterface {
  db: any;
  constructor() {
    this.db = getDB();
  }

  async findAll(selector: string): Promise<[any]> {
    try {
      const neededArray = await this.db[selector];
      return neededArray;
    } catch (e) {
      throw new Error(e);
    }
  }

  async add(selector: string, data: {}): Promise<any> {
    try {
      await this.db[selector].push(data);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async find(selector: string, query: any): Promise<any> {
    try {
      const neededArray = await this.findAll(selector);
      return find(neededArray, query) || {};
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(selector: string, query: object): Promise<any> {
    try {
      const neededArray = await this.findAll(selector);
      const updatedData = reject(neededArray, query);

      this.db[selector] = updatedData;
      return query;
    } catch (e) {
      throw new Error(e);
    }
  }
}
