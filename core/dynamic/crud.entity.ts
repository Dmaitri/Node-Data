
import {field, document} from '../../mongoose/decorators';
import { jsonignore } from '../decorators';
import {DynamicRepository} from './dynamic-repository';
import {Types} from 'mongoose';
import * as Enumerable from 'linq';
import {repoFromModel} from "./model-entity";
import {MetaUtils} from "../metadata/utils";
import { Decorators} from '../constants/decorators';
import {transient} from "nodedata/core/decorators/transient";
 
export class CrudEntity {
    @field({ primary: true, autogenerated: true })
    _id: Types.ObjectId;        


    @field()
    @transient()
    __dbEntity: any;

    constructor() {   
        ["put", "post", "delete", "patch"].forEach((prop) => {
            Object.defineProperty((<any>this).__proto__, prop, {
                writable: false,
                value: CrudEntity.prototype[prop]
            });
        });
    }

    private getCaller(trace: any):string {
        for (let i = 2; i < trace.length; i++) {
            if (trace[i].getTypeName()
                && trace[i].getTypeName() != null
                && trace[i].getTypeName() != "wrappedPromise") {
                return trace[i].getTypeName();
            }
        }
        return undefined;
    }

    getRepo(): DynamicRepository {
        return this.getRepository();
    }

    private getRepository(): DynamicRepository {

        let stack = require('stack-trace');
        let trace = stack.get();
        let caller = this.getCaller(trace);
        if (!caller)
            return undefined;


        // target.constructor.name

        let cachedModels = MetaUtils.getMetaDataFromName(caller);
        MetaUtils.getMetaDataFromName(caller);
        if (cachedModels && cachedModels.length) {
            return undefined;
        }

        if (this.constructor && this.constructor.name) {
            let c = repoFromModel;
            var meta = MetaUtils.getMetaData(this.constructor, Decorators.DOCUMENT);
            if (meta && meta[0]) {
                return repoFromModel[meta[0].params.name];
            }

        }
        return undefined;
    }
    put(): Q.Promise<any> {


        if (!this.getRepository()) {
            return Q.reject("repository not found")
        }
        return this.getRepository().put(this._id, this);
    }
    post(): Q.Promise<any>{
        if (!this.getRepository()) {
            return Q.reject("repository not found")
            }
        return this.getRepository().post(this);
    }
    delete() {
        if (!this.getRepository()) {
            return Q.reject("repository not found")
        }
        return this.getRepository().delete(this._id);
    }
    patch() {
        if (!this.getRepository()) {
            return Q.reject("repository not found")
        }
        return this.getRepository().patch(this._id, this);
    }
}

 export const put: () => Q.Promise < any > =  () => {
    if (!this.getRepository()) {
        return Q.reject("repository not found")
    }
    return this.getRepository().put(this._id, this);
};

export default CrudEntity;
