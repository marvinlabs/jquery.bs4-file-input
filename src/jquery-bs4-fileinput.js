(function ($) {
    "use strict";

    const defaults = {
    };

    let nameElement = null;
    let labelElement = null;
    let inputElement = null;
    let placeholder = null;
    let options = {};

    const methods = {
        init: function (settings) {
            if ($(this).attr("type") !== "file") {
                console.log("The fileInput plugin must be call on the input[type=file] element itself");
                return;
            }

            options = $.extend({}, defaults, settings);

            inputElement = $(this);
            labelElement = inputElement.siblings("label");
            placeholder = labelElement.html();
            nameElement = createNameElement();

            $(this).on("change", onFileChanged);
        },
    };

    const onFileChanged = function (event) {
        const input = inputElement.get(0);
        let fileName = _.isObject(input.files) && _.isObject(input.files[0]) && _.isString(input.files[0].name)
                ? input.files[0].name
                : inputElement.val();

        if (_.isNull(fileName) || fileName === "") {
            labelElement.html(placeholder);
            nameElement.attr("data-content", "");
        }
        else {
            labelElement.html("");
            nameElement.attr("data-content", fileName);
        }
    };

    const createNameElement = function () {
        let element = $("<div />")
                .addClass("custom-file-control custom-file-name")
                .attr("data-content", "");
        inputElement.parent().append(element);

        return element;
    };

    $.fn.fileInput = function (methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + methodOrOptions + " does not exist on jQuery.fileInput");
        }
    };
}(jQuery));
