import {elementsListeners} from '/scripts/listeners.js';
import {formElements} from '/scripts/htmlElements.js';
import {state} from '/scripts/state.js';

export const render =  (currentState) => {
    if (document.querySelector('.logout') === null) {
        const mainViewElement = document.querySelector('.main-view');
        const [buttonName, buttonType, specialClass] = [
            'Выйти из аккаунта',
            'button',
            'btn-link logout'
        ];
        const logoutButton = formElements.createButton(
            buttonName,
            buttonType,
            specialClass,
            );
        mainViewElement.append(logoutButton);
        elementsListeners.addLogoutButtonListener();
    }
    document.querySelector('#menu').innerHTML = '';

    document.querySelector('#form').innerHTML = '';

    const keys = Object.keys(currentState);
    for (const key of keys) {
        if (currentState[key].activated) {
            handlers[key](currentState[key], key);
        }
    }
};

const handlers = {
    loginView(elementState, methodName) {
        const logoutButton = document.querySelector('.logout');
        logoutButton.remove();
        const paymentForm = document.querySelector('#form');
        paymentForm.innerHTML = '';

        const billForm = document.createElement('form');
        billForm.setAttribute('name', methodName);

        const legendText = 'Пожалуйста, авторизуйтесь';
        billForm.append(formElements.createLegend(legendText));

        const inputFields = [
            ['Введите логин', '', 'login', 'text'],
            ['Введите пароль', '', 'password', 'password'],
        ];

        for (const inputField of inputFields) {
            const [labelName, specialClass, idName, inputType] = inputField;
            const newInputField = formElements.createInputField(
                labelName,
                specialClass,
                idName,
                inputType,
                );
            billForm.append(newInputField);
        }

        const formButtons = [
            ['Вход', 'submit', 'btn-primary btn-lg btn-login'],
        ];

        for (const buttonData of formButtons) {
            const [buttonName, buttonType, specialClass] = buttonData;
            const newButton = formElements.createButton(
                buttonName,
                buttonType,
                specialClass,
                );
            billForm.append(newButton);
        }

        paymentForm.append(billForm);

        elementsListeners.addLoginButtonListener();
    },
    tabMenu(tabState, methodName) {
        const menu = document.querySelector('#menu');
        menu.innerHTML = '';
        const menuItems = document.createElement('ul');
        menuItems.setAttribute('class','nav nav-tabs');
        for (const item of tabState.tabs) {
            const menuPoint = document.createElement('li');
            menuPoint.setAttribute('class', 'nav-item');
            const textPoint = document.createElement('a');
            textPoint.setAttribute('class', 'nav-link');
            textPoint.setAttribute('href', '#');
            if ( item[0] === tabState.activeTab ){
                textPoint.setAttribute('class', 'nav-link active');
                textPoint.setAttribute('aria-current', 'page');
            }
            textPoint.textContent = item[0];
            menuPoint.append(textPoint);
            menuItems.append(menuPoint);
        }
        menu.append(menuItems);
    },
    paymentSelfBills(paymentState, methodName) {
        formElements.createTabMenu(state.tabMenu, paymentState.activeTab);
        elementsListeners.addTabsMenuListeners();

        const paymentForm = document.querySelector('#form');

        // payment.bills - состояние получаем с сервера

        paymentForm.innerHTML = '';
        const billForm = document.createElement('form');
        billForm.setAttribute('name', methodName);

        const legendText = `Перевод ${paymentState.activeTab.toLowerCase()}`;
        billForm.append(formElements.createLegend(legendText));

        const selectorFrom = formElements.createSelectField(
            paymentState.bills,
            'Откуда (счет списания)',
            'Выберите счет списания',
            'from-bill',
            );
        billForm.append(selectorFrom);

        const selectorTo = formElements.createSelectField(
            paymentState.bills,
            'Куда (счет зачисления)',
            'Выберите счет зачисления',
            'to-bill',
            );
        billForm.append(selectorTo);

        const inputFields = [
            ['Сумма перевода', 'sum-of-transaction', 'transaction-sum', 'number'],
            ['Комментарий к переводу (не обязательно)', 'transaction-comment', 'transaction-comment', 'text'],
        ];

        for (const inputField of inputFields) {
            const [labelName, specialClass, idName, inputType] = inputField;
            const newInputField = formElements.createInputField(
                labelName,
                specialClass,
                idName,
                inputType,
                );
            billForm.append(newInputField);
        }

        const formButtons = [
            ['Далее', 'submit', 'btn-primary btn-lg forvard'],
            ['Назад', 'button', 'btn-secondary btn-lg backward'],
        ];

        for (const buttonData of formButtons) {
            const [buttonName, buttonType, specialClass] = buttonData;
            const newButton = formElements.createButton(
                buttonName,
                buttonType,
                specialClass,
                );
            billForm.append(newButton);
        }

        paymentForm.append(billForm);

        elementsListeners.addNextButtonListener();
        elementsListeners.addBackButtonListener();
    },
    paymentByRequisits(paymentState, methodName) {
        formElements.createTabMenu(state.tabMenu, paymentState.activeTab);
        elementsListeners.addTabsMenuListeners();

        const paymentForm = document.querySelector('#form');
        paymentForm.innerHTML = '';

        const billForm = document.createElement('form');
        billForm.setAttribute('name', methodName);

        const legendText = `Перевод ${paymentState.activeTab.toLowerCase()}`;
        billForm.append(formElements.createLegend(legendText));

        const inputFields = [
            ['Счет получателя', '', 'reciever-bill', 'text'],
            ['БИК банка', '', 'rbik-bank', 'text'],
            ['Ф.И.О. получателя', '', 'reciever-name', 'text'],
            ['Назначение платежа', '', 'payment-purpose', 'text'],
            ['Сумма', '', 'payment-sum', 'number'],
        ];

        for (const inputField of inputFields) {
            const [labelName, specialClass, idName, inputType] = inputField;
            const newInputField = formElements.createInputField(
                labelName,
                specialClass,
                idName,
                inputType,
                );
            billForm.append(newInputField);
        }

        const formButtons = [
            ['Далее', 'submit', 'btn-primary btn-lg forvard'],
            ['Назад', 'button', 'btn-secondary btn-lg backward'],
        ];

        for (const buttonData of formButtons) {
            const [buttonName, buttonType, specialClass] = buttonData;
            const newButton = formElements.createButton(
                buttonName,
                buttonType,
                specialClass,
                );
            billForm.append(newButton);
        }

        paymentForm.append(billForm);

        elementsListeners.addNextButtonListener();
        elementsListeners.addBackButtonListener();
    },
    paymentConfirmation(paymentState, methodName) {
        const paymentForm = document.querySelector('#form');
        paymentForm.innerHTML = '';

        const billForm = document.createElement('form');
        const legendText = state.paymentDetails.paymentName;
        billForm.append(formElements.createLegend(legendText));
        billForm.setAttribute('name', methodName);

        for (const [labelName, strValue] of state.paymentDetails.paymentFields) {
            const resultigStr = formElements.createResultingStr(labelName, strValue);
            billForm.append(resultigStr);
        }
        paymentForm.append(billForm);

        const formButtons = [
            ['Перевести', 'submit', 'btn-primary btn-lg confirm'],
            ['Вернуться', 'button', 'btn-secondary btn-lg back-to-payment'],
        ];

        for (const buttonData of formButtons) {
            const [buttonName, buttonType, specialClass] = buttonData;
            const newButton = formElements.createButton(
                buttonName,
                buttonType,
                specialClass,
                );
            billForm.append(newButton);
        }

        elementsListeners.addConfirmkButtonListener();
        elementsListeners.addBackToPaymentButtonListener();
    },
    paymentIsDone(paymentState, methodName) {
        const paymentForm = document.querySelector('#form');
        paymentForm.innerHTML = '';

        const billForm = document.createElement('form');
        const legendText = state.paymentDetails.paymentName;
        billForm.append(formElements.createLegend(legendText));
        billForm.setAttribute('name', methodName);

        for (const [labelName, strValue] of state.paymentDetails.paymentFields) {
            const resultigStr = formElements.createResultingStr(labelName, strValue);
            resultigStr.classList.add('completed');
            billForm.append(resultigStr);
        }
        paymentForm.append(billForm);

        const formButtons = [
            ['Хорошо', 'submit', 'btn-success btn-lg'],
        ];

        for (const buttonData of formButtons) {
            const [buttonName, buttonType, specialClass] = buttonData;
            const newButton = formElements.createButton(
                buttonName,
                buttonType,
                specialClass,
                );
            billForm.append(newButton);
        }

        elementsListeners.addSuccessPaymentButtonListener();
    },
};