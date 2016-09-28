/*
 * Copyright 2014 Telefonica Investigación y Desarrollo, S.A.U
 *
 * This file is part of lightweightM2M-iotagent
 *
 * lightweightM2M-iotagent is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * lightweightM2M-iotagent is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with lightweightM2M-iotagent.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[contacto@tid.es]
 */
'use strict';

var iotAgentLib = require('iotagent-node-lib'),
    commonLwm2m = require('./commonLwm2m'),
    logger = require('logops'),
    async = require('async'),
    apply = async.apply,
    context = {
        op: 'IOTAgent.LWM2MHandlers'
    };

/**
 * Handles an update registration request coming from a LWM2M Device.
 *
 * @param {Object} device       LWM2M Device object.
 * @param {String} payload      New payload indicating the supported objects.
 */
function updateRegistration(device, payload, callback) {
    logger.debug(context, 'Handling update registration of the device');

    async.waterfall([
        apply(iotAgentLib.getDevice, device.name),
        apply(commonLwm2m.observeActiveAttributes, payload)
    ], callback);
}

exports.handler = updateRegistration;
