export const state = {
    affectedStates: {
        mainActions: [
            'paymentConfirmation',
            'paymentByRequisits',
            'paymentSelfBills',
            'tabMenu',
            'paymentIsDone',
            'loginView',
        ],
    },
    loginView: {
        activated: true,
    },
    isLogined: {
        userId: '',
        userName: '',
        userToken: '',
    },
    paymentSelfBills: {
        activated: false,
        bills: [
            ['Карта', 123, 1800],
            ['Карта', 453, 900],
            ['Счет', 800, 13000],
            ['Счет', 9856, 0],
        ],
        activeTab: 'Между своими счетами',
    },
    paymentByRequisits: {
        activated: false,
        activeTab: 'По реквизитам',
    },
    paymentConfirmation: {
        activated: false,
    },
    paymentDetails: {
        paymentName: '',
        paymentForm: '',
        paymentFields: [],
    },
    tabMenu: {
        activated: false,
        tabs: [
            ['Между своими счетами', 'paymentSelfBills'],
            ['По реквизитам', 'paymentByRequisits'],
        ],
        activeTab: 'Между своими счетами',
    },
    paymentIsDone: {
        activated: false,
    },
};