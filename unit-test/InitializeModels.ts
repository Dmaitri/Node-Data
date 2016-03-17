﻿require('reflect-metadata/reflect');
import * as models from './models/testModels';
import {Decorators} from '../constants';
import {DecoratorType} from '../enums/decorator-type';
import {Strict} from '../enums';
import * as utils from '../decorators/metadata/utils';

export function initializeModels1() {
    var obj1 = new models.student();
    var obj2 = new models.subject();
    var obj3 = new models.teacher();
    var obj4 = new models.division();
}

export function initializeModels() {
    utils.addMetaData(models.student.prototype, Decorators.DOCUMENT, DecoratorType.CLASS, { name: models.student.name, strict: Strict.true });
    utils.addMetaData(models.student.prototype, Decorators.FIELD, DecoratorType.PROPERTY, { primary: true, autogenerated: true }, '_id');
    utils.addMetaData(models.student.prototype, Decorators.FIELD, DecoratorType.PROPERTY, null, 'name');
    utils.addMetaData(models.student.prototype, Decorators.ONETOMANY, DecoratorType.PROPERTY, { rel: models.subject.name, itemType: models.subject, embedded: true }, 'subjects');
    utils.addMetaData(models.student.prototype, Decorators.FIELD, DecoratorType.PROPERTY, null, 'addresses');

    utils.addMetaData(models.subject, Decorators.DOCUMENT, DecoratorType.CLASS, { name: models.subject.name, strict: Strict.true });
    utils.addMetaData(models.subject, Decorators.FIELD, DecoratorType.PROPERTY, { primary: true, autogenerated: true }, '_id');
    utils.addMetaData(models.subject, Decorators.FIELD, DecoratorType.PROPERTY, null, 'name');

    utils.addMetaData(models.teacher, Decorators.DOCUMENT, DecoratorType.CLASS, { name: models.teacher.name, strict: Strict.true });
    utils.addMetaData(models.teacher, Decorators.FIELD, DecoratorType.PROPERTY, { primary: true, autogenerated: true }, '_id');
    utils.addMetaData(models.teacher, Decorators.FIELD, DecoratorType.PROPERTY, null, 'name');

    utils.addMetaData(models.division, Decorators.DOCUMENT, DecoratorType.CLASS, { name: models.division.name, strict: Strict.true });
    utils.addMetaData(models.division, Decorators.FIELD, DecoratorType.PROPERTY, { primary: true, autogenerated: true }, '_id');
    utils.addMetaData(models.division, Decorators.FIELD, DecoratorType.PROPERTY, null, 'name');
    utils.addMetaData(models.division, Decorators.ONETOMANY, DecoratorType.PROPERTY, { rel: models.student.name, itemType: models.student, embedded: true }, 'students');
};