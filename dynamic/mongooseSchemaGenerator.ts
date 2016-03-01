import Mongoose = require('mongoose');
import {Config} from "../config";
import * as Utils from "../decorators/metadata/utils";
import {Decorators} from '../constants/decorators';
import {searchUtils} from "../search/elasticSearchUtils";
var MongooseSchema = Mongoose.Schema;


export interface IMongooseSchemaOptions {
    options: Object,
    searchIndex: boolean;
}

class MongooseSchemaGenrator {
    createSchema(parsedSchema: any, mongooseOptions: IMongooseSchemaOptions): Object {
        var mongooseSchemaObj = new MongooseSchema(parsedSchema, mongooseOptions.options);
        if (mongooseOptions.searchIndex) {
            searchUtils.insertMongoosasticToSchema(mongooseSchemaObj);
        }
        return mongooseSchemaObj;
    }
}

export var schemaGenerator = new MongooseSchemaGenrator();