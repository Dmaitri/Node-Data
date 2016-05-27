﻿import {onetomany, manytoone, manytomany} from '../core/decorators';
import {column, entity} from '../sequelizeimp/decorators';
import {Strict} from '../sequelizeimp/enums';
import * as Sequelize from "sequelize";
import {BlogPostSqlModel} from "./blogPostSqlModel";

@entity({ tableName: 'tbl_blog1', timestamps: false, freezeTableName: true })
export class BlogSqlModel {
    @column({name:"id", type: Sequelize.INTEGER, allowNull:false, primaryKey: true })
    _id: number;

    @column({ name: "name", type: Sequelize.STRING(128), allowNull: false })
    name: string;

    @onetomany({ rel: 'tbl_blog_post', itemType: BlogPostSqlModel, embedded: false, persist: true, eagerLoading: false })
    blogPosts: Array<BlogPostSqlModel>;
}

export default BlogSqlModel;