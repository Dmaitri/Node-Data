/// <reference path="../datatypes/mongoose.ts" />

import * as TM from './teachermodel';
import * as SM from './studentmodel';
import {onetomany, manytoone, manytomany} from '../decorators/association';
import {document} from '../decorators/document';
import {field} from '../decorators/field';
import {Types} from 'mongoose';
import {Strict} from '../enums/document-strict';

@document({ name: 'courses', strict: Strict.throw })
export class CourseModel {
    @field({ primary: true, autogenerated: true })
    _id: Types.ObjectId;

    @field()
    name: String;

    //@onetomany({ rel: 'teachers', biDirectional: true, itemType: TM, persist: true })
    //teachers: Array<TM.TeacherModel>;

    //@manytomany({rel: 'students', biDirectional: false, itemType: SM, persist: true})
    //students: Array<SM.StudentModel>;
}

export default CourseModel;