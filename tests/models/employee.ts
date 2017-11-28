﻿import Mongoose = require("mongoose");
import {Types} from 'mongoose';
import {field, document} from '../../mongoose/decorators'; 
import {Strict} from '../../mongoose/enums/';
import {baseModel} from './baseModel';
import {topic} from './topic';
import {onetomany, manytoone, manytomany, onetoone, promisable, IPromisableFetchParam} from '../../core/decorators';
import { StorageType } from "../../core/enums/index";

@document({ name: 'employee', strict: Strict.false })
export class employee {

    @field({ primary: true, autogenerated: true })
    _id: number;
}

export default employee;