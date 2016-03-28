import {document} from '../../mongoose/decorators/document'; 
import {field} from '../../mongoose/decorators/field'; 
import {IUser} from './user.ts';
import {Types} from 'mongoose';
import {Strict} from '../../mongoose/enums/document-strict';

@document({ name: 'persons', strict: Strict.true })
export class PersonModel {
    @field({ primary: true, autogenerated: true })
    _id: Types.ObjectId;

    @field({searchIndex : true})
    name: string;

    @field()
    email: string;

    @field({searchIndex : true})
    age: number;

    @field()
    lastname: string;

    _links: any;
    
    constructor(userDto: IUser) {
        this._links = {};
        this._id = <any>userDto._id;
        this.name = userDto.name;
    }
}

export default PersonModel;