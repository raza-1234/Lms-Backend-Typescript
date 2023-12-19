'use strict';
import { Model } from "sequelize"
import {BookAttributes, BookCreationAttributes} from "../Types/BooksModelType"

module.exports = (sequelize:any, DataTypes:any) => {
  class books extends Model<BookAttributes, BookCreationAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({students}:any) {
      // define association here
      this.hasMany(students , {foreignKey : "bookId", as : "studentDetail"})

    }

    toJSON(){
      return {...this.get(), createdAt: undefined, updatedAt: undefined}
    }
  }
  books.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull : false
    },
    author: {
      type: DataTypes.STRING,
      allowNull : false
    },
    edition: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    assigned : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }

  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};