import * as configUtil from './core/utils';
import Q = require('q');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
import {service} from './di/decorators/service';
import {UserDetails} from './security/auth/user-details';
import {User} from './security/auth/user';

import {inject, injectbyname} from './di/decorators/inject';
import UserRepository from './tests/repositories/userRepository';
import {UserDetailService} from './security/auth/user-detail-service';
var userRepo: any;

@service({ 'singleton': true, 'serviceName': 'UserDetailService' })
export class CurrentUserDetailService implements UserDetailService {

    @inject()
    userRepo: UserRepository;

    loadUserByUsername(userName: string): Q.Promise<any> {
        var usr: any;
        var userDetail: UserDetails;
        return this.userRepo.findByField("name", userName).then((user) => {
            usr = user;
            if (user == null || user == undefined) {
                return null;
            }
            userDetail = new User(user.name, user.password, user);
            return userDetail;
        });
    };

    getNewUser(requestBody: any): Q.Promise<any> {
        var userDetail: UserDetails;
        var user = requestBody.user;
        return this.userRepo.findByField("name", user.name).then((foundUser) => {
            if (foundUser == null || foundUser == undefined) {
                userDetail = new User(user.name, user.password, user);
                return userDetail;
            }
            return null;
        });
    };

    loadUserById(id: any): Q.Promise<any> {
            var usr: any;
            var userDetail: UserDetails;
            var _id: string = id; 
            return this.userRepo.findOne(_id).then((user) => {
                usr = user;
                if (user == null || user == undefined) {
                    throw 'user doesnot exist';
                }
                userDetail = new User(user.name, user.password, user);
                return userDetail;
            });
    };
    loadUserByField(field: any, value: any): Q.Promise<any> {
            var usr: any;
            var userDetail: UserDetails;
            return this.userRepo.findByField(field, value).then((user) => {
                usr = user;
                if (user == null || user == undefined) {
                    throw 'user doesnot exist';
                }
                userDetail = new User(user.name, user.password, user);
                return userDetail;
            });
    };

    createNewUser(userObject): Q.Promise<any> {
            var usr: any;
            var userDetail: UserDetails;
            return this.userRepo.post(userObject).then((user) => {
                usr = user;
                if (user == null || user == undefined) {
                    throw 'user doesnot exist';
                }
                userDetail = new User(user.name, user.password, user);
                return userDetail;
            });
    };

    updateExistingUser(id, userObject): Q.Promise<any> {
        var usr: any;
        var userDetail: UserDetails;
        return this.userRepo.put(id, userObject).then((user) => {
            usr = user;
            if (user == null || user == undefined) {
                throw 'user doesnot exist';
            }
            userDetail = new User(user.name, user.password, user);
            return userDetail;
        });
    }
}