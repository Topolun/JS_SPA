import {state} from '/scripts/state.js';
import {render} from '/scripts/render.js';
import {formElements} from '/scripts/htmlElements.js';

export const elementsListeners = {
    addTabsMenuListeners() {
        // eslint-disable-next-line no-unused-vars
        for (const [indexItem, ...rest] of state.tabMenu.tabs.entries()) {  
            const tabItem = document.querySelector(`#tab-id-${indexItem}`);
            tabItem.addEventListener('click', (event) => {
                event.preventDefault();
                for (const i of state.tabMenu.tabs) {
                    const [nameOfTab, stateOfTab] = i;
                    if (nameOfTab === tabItem.textContent) {
                        state[stateOfTab].activated = true;
                    } else { 
                        state[stateOfTab].activated = false;
                    }
                }
                render(state);
            });
        }
    },
    addNextButtonListener() { 
        const tabItem = document.querySelector('.forvard');
        tabItem.addEventListener('click', (event) => {
            event.preventDefault();

            const legendInfo = document.querySelector('legend');
            state.paymentDetails.paymentName = legendInfo.textContent;

            const formItem = document.forms[0];
            state.paymentDetails.paymentForm = formItem.getAttribute('name');

            state.paymentDetails.paymentFields = [];

            for (const i of formItem.querySelectorAll('label')) {
                state.paymentDetails.paymentFields.push([i.textContent, i.nextSibling.value]);
            }

            const previousForm = 'paymentConfirmation';
            const affectedStates = [
                'paymentConfirmation',
                'paymentByRequisits',
                'paymentSelfBills',
                'tabMenu',
                'paymentIsDone',
            ];

            for (const stateItem of affectedStates) {
                if (stateItem === previousForm) {
                    state[stateItem].activated = true;
                } else {  state[stateItem].activated = false; }
            }

            render(state);
        });
    },
    addBackButtonListener() {
        const tabItem = document.querySelector('.backward');
        tabItem.addEventListener('click', (event) => {
            event.preventDefault();
            const alertText = 'Возвращает на основной экран приложения (еще не определен). <strong>На остальных экранах все кнопки работают</strong>';
                const alertButton = formElements.createAlerMessageWithCloseButton(
                    alertText
                );
                document.querySelector('#menu').append(alertButton);
                elementsListeners.closeAlertMesage();
        });
    },
    addConfirmkButtonListener() {
        const ConfirmkButton = document.querySelector('.confirm');
        ConfirmkButton.addEventListener('click', (event) => {
            event.preventDefault();
            // отправка данных на сервер
            
            const previousForm = 'paymentIsDone';
            const affectedStates = [
                'paymentConfirmation',
                'paymentByRequisits',
                'paymentSelfBills',
                'tabMenu',
                'paymentIsDone',
            ];

            for (const stateItem of affectedStates) {
                if (stateItem === previousForm) {
                    state[stateItem].activated = true;
                } else {  state[stateItem].activated = false; }
            }

            render(state);
            // очистка данных о платеже из состояния
        });
    },
    addBackToPaymentButtonListener() {
        const BackToPaymentButton = document.querySelector('.back-to-payment');
        BackToPaymentButton.addEventListener('click', (event) => {
            event.preventDefault();

            const previousForm = state.paymentDetails.paymentForm;
            const affectedStates = [
                'paymentConfirmation',
                'paymentByRequisits',
                'paymentSelfBills',
                'tabMenu',
                'paymentIsDone',
            ];

            for (const stateItem of affectedStates) {
                if (stateItem === previousForm) {
                    state[stateItem].activated = true;
                } else {  state[stateItem].activated = false; }
            }

            render(state);

            const formItem = document.forms[0];
            state.paymentDetails.paymentForm = formItem.getAttribute('name');
            
            for (const i of formItem.querySelectorAll('label')) {
                for (const [formFieldName, formFieldValue] of state.paymentDetails.paymentFields) {
                    if (i.textContent === formFieldName) {
                        i.nextSibling.value = formFieldValue;
                    }
                }
            }
        });
    },
    addSuccessPaymentButtonListener() {
        const SuccessPaymentButton = document.querySelector('.btn-success');
        SuccessPaymentButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            const previousForm = 'paymentSelfBills';
            const affectedStates = [
                'paymentConfirmation',
                'paymentByRequisits',
                'paymentSelfBills',
                'tabMenu',
                'paymentIsDone',
            ];

            for (const stateItem of affectedStates) {
                if (stateItem === previousForm) {
                    state[stateItem].activated = true;
                } else {  state[stateItem].activated = false; }
            }

            render(state);
        });
    },
    addLoginButtonListener() {
        const SuccessPaymentButton = document.querySelector('.btn-login');
        SuccessPaymentButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            const loginValue = document.querySelector('#login').value;
            const passwordValue = document.querySelector('#password').value;

            // Отправляем запрос на сервер

            const user = {
                login: loginValue,
                password: passwordValue,
            };
            /*
            let authRequest = new Promise((resolve, reject) => {
                fetch('https://reqres.in/api/register', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(user)
                  })
                    .then(data => {

                        if (data.ok) {
                            resolve(data.json());
                        } else {
                            reject(new Error(data.status));
                        }
                    })
                }
            )
            */
            let authRequest = new Promise((resolve, reject) => {
                if (user['login'].length > 0) {
                    const someResponse = {
                        userId: 150,
                        userName: 'Lucky man',
                        userToken: 's55f1gte657rt'
                    };
                    resolve(someResponse);
                } else {
                    reject(new Error('Введите любое имя пользователя'));
                }
            });

            authRequest.then(value => {
                Object.assign(state.isLogined, value);
                
                const activeForm = 'paymentSelfBills';
                const affectedStates = state.affectedStates.mainActions;

                for (const stateItem of affectedStates) {
                    if (stateItem === activeForm) {
                        state[stateItem].activated = true;
                    } else {  state[stateItem].activated = false; }
                }
                render(state);
            // eslint-disable-next-line no-unused-vars
            }).catch(error => {
                const alertText = '<strong>Введите имя пользователя!</strong> На данный момент подойдет любой логин, <strong>пароль не обязателен</strong>).';
                const alertButton = formElements.createAlerMessageWithCloseButton(
                    alertText
                );
                document.querySelector('#menu').append(alertButton);
                elementsListeners.closeAlertMesage();
            });
        });
    },
    closeAlertMesage() {
        const alertButton = document.querySelector('.alert-dismissible');
        alertButton.addEventListener('click', (event) => {
            event.preventDefault();
            alertButton.remove();
        });
    },
    addLogoutButtonListener() {
        const logoutButton = document.querySelector('.logout');
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            const activeForm = 'loginView';
            const affectedStates = state.affectedStates.mainActions;

            for (const stateItem of affectedStates) {
                if (stateItem === activeForm) {
                    state[stateItem].activated = true;
                } else {  state[stateItem].activated = false; }
            }

            state.isLogined.userId = '';
            state.isLogined.userName = '';
            state.isLogined.userToken = '';

            render(state);
        });
    },
};