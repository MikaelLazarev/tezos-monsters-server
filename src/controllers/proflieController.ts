/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {
    ProfileServiceI,
} from '../core/profile';
import {
    SocketController,
    socketListeners,
    SocketWithToken,
} from './socketRouter';
import {SocketUpdate} from '../core/operations';
import {Inject, Service} from "typedi";
import {ProfileService} from "../services/profileService";

@Service("profiles.controller")
export class ProfilesController implements SocketController {

    @Inject("profiles.service")
    private _service: ProfileService;
    private _namespace = 'profile';


    get namespace(): string {
        return this._namespace;
    }

    getListeners(socket: SocketWithToken, userId: string): socketListeners {
        return {

            retrieve: async (data: string, opHash: string) => {
                try {
                    const result = await this._service.retrieve(userId);
                    console.log(result);
                    socket.emit(this._namespace + ':updateDetails', result);
                    socket.ok(opHash);
                } catch (e) {
                    console.log(e);
                    socket.failure(opHash, e);
                }
            },

            // update: async (dto: ProfileUpdateDTO, opHash: string) => {
            //     console.log(dto);
            //     try {
            //         const result = await this._service.update(userId, dto);
            //         socket.emit(this._namespace + ':updateDetails', result);
            //         socket.ok(opHash);
            //     } catch (e) {
            //         console.log(e);
            //         socket.failure(opHash, e);
            //     }
            // },


        };
    }

    update(): SocketUpdate[] {
        return this._service.getUpdateQueue();
    }
}
