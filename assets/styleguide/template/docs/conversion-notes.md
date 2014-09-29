Style Conversion Guide
============

Mixins
------------

From: base/helpers/baseHelpers.scss <br/>To: __base/mixins.scss__



Header
------------

From: base/typography/headers.scss <br/>To: __standard/header.scss__

Old Selector          | New Selector                 | Extends
--------------------- | ---------------------------- | ------------
h1                    | .header                      | h1
h1.large              | .header.header-large         |
h2                    | .header-alt                  | h2
h2.large              | .header-alt.header-large     |
h2.subhead            | .header-sub                  | h3
h2.subhead-large      | .header-sub.header-large     |
h2.subhead-solution   | .header-solution             |



Paragraph 
------------

From: base/typography/baseType.scss <br/>To: __standard/paragraph.scss__

Old Selector | New Selector                  | Extends
------------ | ----------------------------- | -----------
p            | .paragraph                    | p
p.medium     | .paragraph.paragraph-medium   |
p.small      | .paragraph.paragraph-small    |



Link
------------

From: base/typography/links.scss <br/>To: __standard/link.scss__

Old Selector | New Selector | Extends
------------ | -------------| -----------
a            | .link        | a


Address
------------

From: base/typography/address.scss <br/>To: __standard/address.scss__

Old Selector     | New Selector         | Extends
---------------- | -------------------- | -----------
address          | .address             | address
address strong   | .address-name        |         
address small    | .address-location    |             
address abbr     | .address-attr        |



Table
------------

From: base/tables/tables.scss <br/>To: __standard/table.scss__

Old Selector       | New Selector     | Extends
------------------ | ---------------- | -----------
table              |  .table          | table
table.default      |  NA              |
table.left-ledger  |  NA              |
th                 |  .table-header   | th
td                 |  .table-cell     | td





Button
------------

From: base/buttons/buttons.scss <br/>To: __standard/button.scss__

Old Selector       | New Selector               | Extends
------------------ | -------------------------- | -----------
button             | .button                    | button
button.inactive    | .button.button-disabled    | 
button.secondary   | .button.button-alt         | 
button.outline     | .button.button-outline     | 
button.ctc         | .button.button-ctc         | 
button.teal        | .button.button-teal        | 
button.sized       | .button.button-sized       | 



Inputs
------------

From: base/forms/forms.scss <br/>To: __standard/input.scss__

Old Selector          | New Selector               | Extends
------------------    | -------------------------- | ------------
input                 | .input                     | input
input[type=text]      | .input.input-text          | 
input[type=password]  | .input.input-password      | 
textarea              | .input.input-textarea      | textarea 
input[type=text]      | .input.input-file          | 



Radio
------------

From: base/forms/forms.scss <br/>To: __standard/radio.scss__

Old Selector          | New Selector               | Extends
------------------    | -------------------------- | ------------
.radio                | .radio                     | 
.radio > input        | .radio-input               | 
.radio > label        | .radio-label               | 



Checkboxes
------------

From: base/forms/forms.scss <br/>To: __standard/checkbox.scss__

Old Selector          | New Selector               | Extends
------------------    | -------------------------- | ------------
.chex                 | .checkbox                  | 
.chex > input         | .checkbox-input            | 
.chex > label         | .checkbox-label            | 


<!-- //helpers
@import "base/helpers/baseHelpers";

//typography
@import "base/typography/baseType";
@import "base/typography/headers";
@import "base/typography/lists";
@import "base/typography/address";
@import "base/typography/links";

//buttons
@import "base/buttons/buttons";

//tables
@import "base/tables/tables";

//forms
@import "base/forms/forms"; -->
































