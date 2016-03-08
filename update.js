//
// ELMAH - Error Logging Modules and Handlers for ASP.NET
// Copyright (c) 2004-9 Atif Aziz. All rights reserved.
//
//  Author(s):
//
//      Atif Aziz, http://www.raboof.com
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

if (typeof ELMAH === 'undefined')
    throw new Error('Invalid host?');

ELMAH.checkForUpdate = function(info) {

    function Version(major, minor, build, revision) {
        this.major = parseInt(major);
        this.minor = parseInt(minor);
        this.build = parseInt(build);
        this.revision = parseInt(revision);
    }

    Version.prototype.toString = function() {
        return [ this.major, this.minor, this.build, this.revision ].join('.');
    };
    
    Version.prototype.compareTo = function(rhs) {
        if (typeof rhs === 'string')
            return this.compareTo(Version.parse(rhs));
        if (rhs.constructor !== Version)
            throw new Error('Invalid operand');
        if (rhs == null)
            return 1;
        if (this.major != rhs.major)
            return this.major > rhs.major ? 1 : -1;
        if (this.minor != rhs.minor)
            return this.minor > rhs.minor ? 1 : -1;
        if (this.build != rhs.build)
            return this.build > rhs.build ? 1 : -1;
        if (this.revision == rhs.revision)
            return 0;
        return this.revision > rhs.revision ? 1 : -1;
    };
 
    Version.zero = new Version(0, 0, 0, 0);
    
    Version.parse = function(s) {
        if (!s) return Version.zero;
        if (s.constructor === Version) return s;
        var v = s.toString().split('.', 4).concat(0, 0, 0, 0);
        return new Version(v.shift(), v.shift(), v.shift(), v.shift());
    };

    var currentVersion = Version.parse('1.2.14706');
    if (Version.parse(info.fileVersion).compareTo(currentVersion) < 0) {
        if (confirm(
            'Your version of ELMAH is out of date. ' +
            'The latest version is ' + currentVersion + ' (RELEASE). ' + 
            'Go to downloads?')) {
            window.location.href = 'https://elmah.github.io/downloads/';
        }
    }
    else
        alert('Your version of ELMAH is up to date!');
};

if (ELMAH.info)
    ELMAH.checkForUpdate(ELMAH.info);
