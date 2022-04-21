export const formElements = {
    createSelectField(selectionOptions, labelName, defaultText, specialClass) {
        const newSelectField = document.createElement('div');
        newSelectField.setAttribute('class','mb-3');
        const labelField = document.createElement('label');
        labelField.setAttribute('class','form-label');
        labelField.setAttribute('for', specialClass);
        labelField.textContent = labelName;
        const selectField = document.createElement('select');
        selectField.setAttribute('class',`form-select ${specialClass}`);
        selectField.setAttribute('aria-label','Default select example');
        const defaultOptionField = document.createElement('option');
        defaultOptionField.setAttribute('selected', true);
        defaultOptionField.textContent = defaultText;
        selectField.append(defaultOptionField);
        for (const option of selectionOptions) {
            const optionField = document.createElement('option');
            const [typeOfItem, name, sum] = option;
            optionField.textContent = `${typeOfItem} №${name} средства: ${sum}`;
            selectField.append(optionField);
        }
        newSelectField.append(labelField, selectField);
        return newSelectField;
    },
    createInputField(labelName, specialClass, idName, inputType) {
        const newInputField = document.createElement('div');
        newInputField.setAttribute('class','mb-3');
        const labelField = document.createElement('label');
        labelField.setAttribute('class','form-label');
        labelField.setAttribute('for', specialClass);
        labelField.textContent = labelName;
        const inputField = document.createElement('input');
        inputField.setAttribute('class',`form-control ${specialClass}`);
        inputField.setAttribute('type', inputType);
        inputField.setAttribute('id', idName);
        newInputField.append(labelField, inputField);
        return newInputField;
    },
    createButton(buttonName, buttonType, specialClass) {
        const newButton = document.createElement('button');
        newButton.setAttribute('type', buttonType);
        newButton.setAttribute('class',`btn ${specialClass}`);
        newButton.textContent = buttonName;
        return newButton;
    },
    createTabMenu(tabState, activeTab) {
        const menu = document.querySelector('#menu');
        menu.innerHTML = '';
        const menuItems = document.createElement('ul');
        menuItems.setAttribute('class','nav nav-tabs');
        for (const [itemIndex, item] of tabState.tabs.entries()) {
            const menuPoint = document.createElement('li');
            menuPoint.setAttribute('class', 'nav-item');
            const textPoint = document.createElement('a');
            textPoint.setAttribute('class', 'nav-link');
            textPoint.setAttribute('id', `tab-id-${itemIndex}`);
            textPoint.setAttribute('href', '#');
            if ( item[0] === activeTab ){
                textPoint.setAttribute('class', 'nav-link active');
                textPoint.setAttribute('aria-current', 'page');
            }
            textPoint.textContent = item[0];
            menuPoint.append(textPoint);
            menuItems.append(menuPoint);
        }
        menu.append(menuItems);
    },
    createLegend(legendText) {
        const legendItem = document.createElement('legend');
        legendItem.textContent = legendText;
        return legendItem;
    },
    createResultingStr(strName, strValue) {
        const newInputField = document.createElement('div');
        newInputField.setAttribute('class','mb-3');

        const labelField = document.createElement('label');
        labelField.setAttribute('class','form-label');
        labelField.textContent = strName;
        newInputField.append(labelField);

        const spanField = document.createElement('span');
        spanField.setAttribute('class','input-group-text');
        spanField.textContent = strValue;
        newInputField.append(spanField);

        return newInputField;
    },
    createAlerMessageWithCloseButton (alertText) {
        const newAlert = document.createElement('div');
        newAlert.setAttribute('class','alert alert-warning alert-dismissible fade show');
        newAlert.setAttribute('role','alert');
        newAlert.innerHTML = alertText;
        const closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.setAttribute('class', 'btn-close');
        closeButton.setAttribute('data-bs-dismiss', 'alert');
        closeButton.setAttribute('aria-label', 'Close');
        newAlert.append(closeButton);
        return newAlert;
    },
};