import { Optional } from "sequelize"

export type BookAttributes = {
  id: number,
  name: string,
  author: string,
  edition: number,
  assigned: boolean,
  createdAt: Date,
  updatedAt: Date
}

export type BookCreationAttributes = Optional<BookAttributes, 'id' | 'createdAt' | 'updatedAt'>;

