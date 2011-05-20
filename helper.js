/**
  @license
  Copyright 2011 Google Inc. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/**
 * @fileoverview Helper functions to reduce the amount of code directly typed
 * in the demo page.
 * @author battlehorse@google.com (Riccardo Govoni)
 */


/**
 * Global reference to an instance of the Editor class.
 * @type {Editor}
 */
var editor;


/**
 * Prepares the demo editor, loads all the necessary libraries,
 * loads the data to populate the demo and invokes a callback afterward.
 *
 * @param {Window} win The window containing the demo contents.
 * @param {Document} doc The document containing the demo contents.
 * @param {Function} callback The callback to invoke upon completion.
 */
function prepareDemo(win, doc, callback) {
  var jq = win.jQuery;
  var code = CodeMirror(doc.getElementById('code'), {
    mode: 'javascript',
    onKeyEvent: function(unused_code, evt) {
      if (evt.type == 'keydown' && evt.ctrlKey && (evt.keyCode == 98 || evt.keyCode == 66)) {
        // Ctrl-b pressed. Execute the current contents.
        jq('#execute').click();
        return true;
      }
    }
  });

  editor = new Editor(code, win, doc);

  jq('#execute').button().click(function() {
    jq('#errors').empty().hide();
    try {
      eval(code.getValue());
    } catch(err) {
      jq('#errors').html(String(err)).show();
    }
  });
  jq('#toggleSections').buttonset();
  jq('#toggleSectionCode').click(function() {
    jq('#demoArea').hide();
    jq('#codeArea').show().css('right', 0);
  });
  jq('#toggleSectionBoth').click(function() {
    jq('#codeArea').show().css('right', '450px');
    jq('#demoArea').show().css('left', '450px');
  });
  jq('#toggleSectionDemo').click(function() {
    jq('#codeArea').hide();
    jq('#demoArea').show().css('left', 0);
  });

  callback(editor, win, doc);
}


/**
 * Inject a stylesheet in a document.
 * @param {Document} doc The document where to inject the stylesheets.
 * @param {string} stylesheet The URL of the stylesheet to load.
 */
function injectStyle(doc, stylesheet) {
  var head = doc.getElementsByTagName('head')[0];
  var link = doc.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.href = stylesheet;
  head.appendChild(link);
}


/**
 * Injects an additional library in the page (identified by srcFile) and invokes
 * a callback once injection completes.
 *
 * @param {Document} doc the Document where to inject the library.
 * @param {string} srcFile the library to load.
 * @param {Function} callback Function to invoke once the library has been
 *     loaded.
 */
function loadLibrary(doc, srcFile, callback) {
  var script = doc.createElement("script");
  script.src = srcFile;
  script.type = "text/javascript";
  script.executed = false;
  var head = doc.getElementsByTagName('head')[0];
  head.appendChild(script);
  script.onreadystatechange = function() {
    if (script.readyState == 'loaded' || script.readyState == 'complete') {
      if (!script.executed) {
        callback();
      }
    }
  };
  script.onload = function() {
    if (!script.executed) {
      script.executed = true;
      callback();
    }
  };
}


/**
 * Inject multiple additional libraries in the page, in the requested
 * order.
 *
 * @param {Document} doc the Document where to inject the libraries.
 * @param {Array.<string>} srcFiles The libraries to inject.
 * @param {Function} callback Function to invoke once all the libraries
 *     have been loaded.
 * @param {number} opt_count Counter to keep track of the libraries
 *     loaded so far.
 */
function loadLibraries(doc, srcFiles, callback, opt_count) {
  opt_count = opt_count || 0;
  if (opt_count == srcFiles.length) {
    callback();
  } else {
    loadLibrary(doc, srcFiles[opt_count], function() {
      loadLibraries(doc, srcFiles, callback, opt_count+1);
    });
  }
}


/**
 * Samples manager for the live Editor slide.
 * @constructor
 */
var Editor = function(code, win, doc) {
  this.code_ = code;
  this.win_ = win;
  this.$_ = this.win_.jQuery;
  this.doc_ = doc;

  this.shortcuts_ = {};
};

Editor.prototype.addShortCut = function(name, code, content) {
  var self = this;
  this.$_('<a />', {'href': '#'}).html(name).click(function() {
    if (typeof(code) != 'string') {
      code = self.$_(code).text();
    }
    self.code_.setValue(code);
    self.$_('#content').empty();
    if (content) {
      self.$_('#content').html(content.cloneNode(true));
    }
    self.$_('#execute').click();
    return false;
  }).appendTo(this.$_('#shortcuts'));
};

Editor.prototype.addShortCutFromFile = function(htmlFile) {
  var iframe = this.doc_.createElement('IFRAME');
  iframe.style.display = 'none';
  iframe.src = htmlFile;
  this.doc_.body.appendChild(iframe);
};
