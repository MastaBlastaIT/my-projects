function SendRequest() {
    let siteUID = 'input_site_uid';

    let siteKey = 'input_site_password';

    let formData = document.getElementById('myForm');
    formData.action = 'https://simpleapi.sandbox.gateline.net:18610/pay';
    //formData.action = 'https://simpleapi.dev.gateline.net/pay';

    let message = ([].reduce.call(formData.childNodes, (res, node) => {
        return (node.innerHTML !== undefined) ? `${res}${node.name}=${node.value};` : res;
    }, '')).concat(`site=${siteUID}`);

    let encryptedMessage = CryptoJS.HmacSHA1(message, siteKey).toString();

    let siteNode = document.createElement('input');

    siteNode.name = 'site';
    siteNode.type = 'hidden';
    siteNode.value = siteUID;
    let checksumNode = document.createElement('input');

    checksumNode.name = 'checksum';
    checksumNode.type = 'hidden';
    checksumNode.value = encryptedMessage;
    formData.appendChild(siteNode);
    formData.appendChild(checksumNode);
    formData.submit();
}
