/* Copyright 2017 Mozilla
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. */

'use strict';

const { classes: Cc, interfaces: Ci, results: Cr, utils: Cu } = Components;
const { Runtime } = Cu.import('resource://qbrt/modules/Runtime.jsm', {});
const { Services } = Cu.import('resource://gre/modules/Services.jsm', {});
const screenManager = Cc["@mozilla.org/gfx/screenmanager;1"].getService(Ci.nsIScreenManager);
const left = {}, top = {}, width = {}, height = {};
screenManager.primaryScreen.GetRectDisplayPix(left, top, width, height);

const WINDOW_FEATURES = [
  'top=0',
  'left=0',
  'width=' + 500,
  'height=' + 600,
].join(',');

Services.ww.openWindow(null, 'chrome://app/content/index.html', '_blank', WINDOW_FEATURES, null);