/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready


document.addEventListener('deviceready', onDeviceReady, false);
// App.addListener('appUrlOpen', (event) => {
//     // Example url: https://beerswift.app/tabs/tab2
//     // slug = /tabs/tab2
//     let history = useNavigate();
//     const slug1=event.url.split("/competition/:sportid/:categoryid/:competitionid").pop()
//     const slug2=event.url.split("/competition/:id").pop()
//     const slug = event.url.split('/match/:id').pop();
//     const slug3 = event.url.split('/match/live/:id').pop();
//     if (slug) {
//         history(slug)
//     }
//     else if(slug1){
//         history(slug1)
//     }
//     else if(slug2){
//         history(slug2)
//     }
//     else if(slug3){
//         history(slug3)
//     }
//     // If no match, do nothing - let regular routing
//     // logic take over
// });
function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
