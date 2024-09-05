import { toast } from "vue3-toastify";
import $ from "jquery";

function checkElem(elem) {
    if (typeof elem === "string") {
        return document.querySelector(elem);
    } else {
        return elem;
    }
}

export function blockBtn(elem) {
    const btn = checkElem(elem);
    btn.disabled = true;
    btn.setAttribute("data-kt-indicator", "on");
}

export function unblockBtn(elem) {
    const btn = checkElem(elem);
    btn.disabled = false;
    btn.removeAttribute("data-kt-indicator");
}

let elBlockPosition = null;
export function block(target, options) {
    var el = $(target);
    elBlockPosition = el.css("position"); // save default position attribute

    options = $.extend(
        true,
        {
            opacity: 0.05,
            overlayColor: "#000000",
            type: "",
            size: "",
            state: "primary",
            centerX: true,
            centerY: true,
            message: "",
            shadow: true,
            width: "auto",
        },
        options
    );

    var version = options.type ? "spinner-" + options.type : "";
    var state = options.state ? "spinner-" + options.state : "";
    var size = options.size ? "spinner-" + options.size : "";
    var spinner =
        '<span class="spinner ' +
        version +
        " " +
        state +
        " " +
        size +
        '"></span';

    var el = $(target);
    el.css("position", "relative");
    el.append(`
    <div class="blockUI blockOverlay" style="z-index: 10; border: none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(90, 90, 90); opacity: 0.05; cursor: wait; position: absolute;"></div>
    `);
    el.append(`
    <div class="blockUI blockMsg blockElement" style="z-index: 1011; position: absolute; padding: 0px; margin: 0px; width: auto; top: 50%; left: 50%; transform: translateX(-50%); text-align: center; color: rgb(90, 90, 90); border: 0px; cursor: wait;">${spinner}</div>
    `);
}

export function unblock(target) {
    var el = $(target);
    el.find(".blockUI").remove();
    el.css("position", elBlockPosition); // restore default position attribute
}

export function currency(
    value,
    options = { style: "currency", currency: "IDR" },
    negativeBracket = false
) {
    if (!negativeBracket)
        return Intl.NumberFormat("id-ID", options).format(value);

    return Intl.NumberFormat("id-ID", options)
        .format(value)
        .replace(/-Rp\s*([\d,.]+)/, "(Rp $1)");
}

export function copyString(str) {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    toast.success("Berhasil disalin");
}

export function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formDataToObject(formData) {
    const formDataObject = {};

    formData.forEach((value, key) => {
        // Check if the key already exists in the object
        if (formDataObject.hasOwnProperty(key)) {
            // If it does, and it's not an array, convert it to an array
            if (!Array.isArray(formDataObject[key])) {
                formDataObject[key] = [formDataObject[key]];
            }
            // Push the new value to the array
            formDataObject[key].push(value);
        } else {
            // If the key doesn't exist, simply assign the value
            formDataObject[key] = value;
        }
    });

    return formDataObject;
}

export function objectToFormData(obj, form, namespace) {
    let formData = form || new FormData();
    for (let property in obj) {
        if (!obj.hasOwnProperty(property)) continue;
        let formKey = namespace ? `${namespace}[${property}]` : property;

        // If the property is an object, but not a File, recursively call objectToFormData
        if (
            typeof obj[property] === "object" &&
            !(obj[property] instanceof File)
        ) {
            objectToFormData(obj[property], formData, formKey);
        } else {
            formData.append(formKey, obj[property]);
        }
    }
    return formData;
}