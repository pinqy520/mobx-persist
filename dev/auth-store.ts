import { observable, action, computed } from 'mobx';
import { persist } from '../src'

const user = {
    uid: 123123,
    displayName: 'hahahaha',
    email: 'hahaha@test.com'
}

class AuthStore {
    @persist @observable loggedIn = false;
    @persist @observable user = {};

    @action checkAuth() {

        if (user !== null) {
            this.loggedIn = true;
            this.user = {
                uid: user.uid,
                name: user.displayName,
                email: user.email
            };
        }
    }

    @action login(email: string, password: string) {
        setTimeout(() => {
            this.loggedIn = true;
            this.user = {
                uid: user.uid,
                name: user.displayName,
                email: user.email
            };
        }, 500);
    }
}

export default AuthStore;