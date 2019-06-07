const insertAfter = (elem, refElem) => {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
};

const sortForm = (formNode) => {
    let formItems = Array.prototype.slice.call(formNode.querySelectorAll("input[name]"));

    formItems.sort(function(a, b) {
        if (a.name < b.name) {
            return 1;
        }
        if (a.name > b.name) {
            return -1;
        }
        return 0;
    });

    formItems.forEach((item, i) => {
        if (i > 0) {
            item.parentNode.insertBefore(item, formItems[i - 1]);
        }
    });
};

window.onload = () => {
    let crypto = document.createElement("script");

    let payForm = document.getElementsByClassName("payForm")[0];

    sortForm(payForm);

    //crypto.setAttribute("src", "https://www.gateline.net/glwidget/js/crypto-js.min.js");
    crypto.setAttribute("src", "./src/js/crypto-js.min.js");
    crypto.setAttribute("type", "text/javascript");
    payForm.parentNode.insertBefore(crypto, payForm);

    let styles = document.createElement("link");
    styles.setAttribute("rel", "stylesheet");
    //styles.setAttribute("href", "https://www.gateline.net/glwidget/css/style.css");
    styles.setAttribute("href", "./src/css/style.css");
    insertAfter(styles, crypto);

    let popupBackground = document.createElement("div");
    popupBackground.className = "popup-back";
    popupBackground.setAttribute("id", "popupBackground");
    popupBackground.innerHTML = `<div class="popup-div"><iframe frameborder="0" scrolling="no" class="popup-iframe" id="myPopup" name="myPopup"></iframe><div class="loader"></div></div>`;
    insertAfter(popupBackground, payForm);

    payForm.setAttribute("method", "POST");
    payForm.setAttribute("target", "myPopup");
    payForm.setAttribute("enctype", "multipart/form-data");
    payForm.className = "payForm";
};

function sendRequest() {
    let payForm = document.getElementsByClassName("payForm")[0];

    let iframe = document.getElementById("myPopup");

    if (payForm.querySelector("input[name=checksum]")) {
        payForm.removeChild(payForm.lastElementChild.previousElementSibling);
    }

    let popupBackground = document.getElementById("popupBackground");

    let loader = document.querySelector('.loader');

    switch (payForm.getAttribute("form-type")) {
        case "sandbox":
            payForm.action = "https://simpleapi.sandbox.gateline.net:18610/pay";
            break;
        case "prod":
            payForm.action = "https://simpleapi.gateline.net/pay";
            break;
        default:
            console.error(`WRONG FORM-TYPE! MUST BE "prod" or "sandbox"`);
            alert(`Неверно указан атрибут form-type: требуется "prod" или "sandbox"`);
    }

    let siteKey = payForm.querySelector("input[isToken]").value;

    let message = ([].reduce.call(payForm.childNodes, (res, node) => {
        return (node.innerHTML !== undefined && node.getAttribute("type") !== "submit") && !node.hasAttribute("isToken") ? `${res}${node.name}=${node.value};` : res;
    }, "")).slice(0, -1);

    let encryptedMessage = CryptoJS.HmacSHA1(message, siteKey).toString();

    let checksumNode = document.createElement("input");

    checksumNode.name = "checksum";
    checksumNode.type = "hidden";
    checksumNode.value = encryptedMessage;
    payForm.insertBefore(checksumNode, payForm.lastElementChild);

    if (payForm.action.match(/^https:\/\/simpleapi\..*gateline\.net(\:18610|)\/pay$/)) {
        popupBackground.style.display = "block";
        payForm.submit();

        loader.classList.add("loader_animate");
        iframe.onload = () => {
            loader.classList.remove("loader_animate");
        };
    }
}

function listener(event) {
    let popupBackground = document.getElementById("popupBackground");

    let iframe = document.getElementById("myPopup");

    if (event.data == "pay_fail") {
        setTimeout(function() {
            alert("Платёж завершился неуспешно");
        }, 500);
        popupBackground.style.display = "none";
        iframe.src = "";
    } else if (event.data == "pay_success") {
        setTimeout(function() {
            alert("Платёж завершился успешно");
        }, 500);
        popupBackground.style.display = "none";
        iframe.src = "";
    }
}

if (window.addEventListener) {
    window.addEventListener("message", listener);
} else {
    window.attachEvent("onmessage", listener); // IE8
}

window.onclick = function(event) {
    let popupBackground = document.getElementById("popupBackground");

    let iframe = document.getElementById("myPopup");

    if (event.target == popupBackground) {
        popupBackground.style.display = "none";
        iframe.src = "";
    }
};
