'use strict';

const DataTypes = require('../src/DataTypes');
const LibertyModel = require('./LibertyModel');
const models = require('./');
const WikitextParser = require('../src/LibertyParser/src/Parser/WikitextParser');

class DiscussionComment extends LibertyModel {
  static getAttributes() {
    return {
      /**
       * Primary key.
       *
       * @property id
       * @type Number
       */
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      topicId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      wikitext: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
      },
      ipAddress: DataTypes.ipAddress(),
      status: {
        type: DataTypes.ENUM('PUBLIC', 'HIDDEN'),
        allowNull: false,
        defaultValue: 'PUBLIC',
      },
    };
  }
  static getOptions() {
    return {
      paranoid: true,
    };
  }
  /**
   * Describes associations.
   * @method associate
   * @static
   */
  static associate() {
    this.belongsTo(models.DiscussionTopic, {
      as: 'topic',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    this.belongsTo(models.User, {
      as: 'author',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }

  async parseRender() {
    const parser = new WikitextParser();
    const renderResult = await parser.parseRender({ wikitext: this.wikitext });
    return renderResult;
  }
}

module.exports = DiscussionComment;