const app = new Vue({
    el: "#app",
    data: {
        toSearch: "",
        textSearchMsg: "",
        showingSearchBar: false,
        addMsg: "",
        answers: ['ok', 'A stasera!', 'Ciao! Bene dai, e tu?', 'Grazie :)', 'Oggi non posso', 'Volentieri!', 'Yep'],
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                searchShow: true,
                activity: 'Ultimo accesso oggi alle 11:15',
                messages: [
                    {
                        date: '27/06/2021 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent',
                        showInfoBox: false,
                        checkType: 'double-blue',
                    },
                    {
                        date: '27/06/2021 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                        showInfoBox: false,
                        checkType: 'double-blue',
                    },
                    {
                        date: '29/06/2021 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received',
                        showInfoBox: false,
                        checkType: '',
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: false,
                searchShow: true,
                activity: 'Ultimo accesso oggi alle 10:12',
                messages: [
                    {
                        date: '20/02/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent',
                        showInfoBox: false,
                        checkType: 'double-blue',
                    },
                    {
                        date: '21/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received',
                        showInfoBox: false,
                        checkType: '',
                    },
                    {
                        date: '25/04/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent',
                        showInfoBox: false,
                        checkType: 'double-blue',
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: false,
                searchShow: true,
                activity: 'Ultimo accesso oggi alle 12:23',
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received',
                        showInfoBox: false,
                        checkType: '',
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent',
                        showInfoBox: false,
                        checkType: 'double-blue',
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received',
                        showInfoBox: false,
                        checkType: '',
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: false,
                searchShow: true,
                activity: 'Ultimo accesso oggi alle 11:19',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent',
                        showInfoBox: false,
                        checkType: 'double-blue',
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received',
                        showInfoBox: false,
                        checkType: '',
                    }
                ]
            }
        ]
    },
    methods: {

        openChat(index = 0) {
            this.contacts.map(contact => contact.visible = false);
            this.contacts[index].visible = true;
            this.contactVisible = index;
            this.textSearchMsg = "";
        },

        sendMsg() {
            this.contacts.forEach((contact, index) => {
                if (contact.visible && this.addMsg) {
                    const now = dayjs().format('DD/MM/YYYY HH:mm:ss');
                    const objMsg = {
                        date: now,
                        text: this.addMsg,
                        status: 'sent',
                        showInfoBox: false,
                        checkType: 'single',
                    }

                    let indexMsg = contact.messages.push(objMsg) - 1;
                    
                    let msgCheck = 

                    
                    setTimeout(() => {
                        this.contacts[0].messages[indexMsg].checkType = 'double';
                    }, 1000);

                    setTimeout(() => {
                        this.contacts[0].messages[indexMsg].checkType = 'double-blue';
                    }, 2000);

                    setTimeout(() => {
                        contact.activity = "Sta scrivendo..."
                    }, 3000);
                    
                    setTimeout(() => {

                        const objMsgBack = {
                            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                            text: this.answers[Math.floor(Math.random() * this.answers.length)],
                            status: 'received',
                            showInfoBox: false
                        }

                        contact.messages.push(objMsgBack);
                        contact.activity = "Ultimo accesso oggi alle " + dayjs().format('HH:mm');

                    }, 5000);

                    this.addMsg = "";
                }
            });  
        },

        filterSearch() {
            this.contacts.forEach(contact => contact.searchShow = contact.name.toLowerCase().includes(this.toSearch.toLowerCase()));
        },

        showInfo(index, msgIndex) {
            this.contacts.forEach((contact, i) => {
                contact.messages.forEach((message, iM) => {
                    if(i == index && iM == msgIndex) message.showInfoBox = !message.showInfoBox;
                    else message.showInfoBox = false;
                })
            });
        },

        deleteMsg(index, msgIndex) {
            /* this.contacts[index].messages.splice(msgIndex, 1); */
            this.$delete(this.contacts[index].messages, msgIndex);           
        },

        getTime (index, msgIndex = this.contacts[index].messages.length - 1) {
            dayjs.extend(window.dayjs_plugin_customParseFormat);
            const msgDate = dayjs(this.contacts[index].messages[msgIndex].date, 'DD/MM/YYYY HH:mm:ss');
            const now = dayjs();
            if (Math.abs(msgDate.diff(now, 'day')) > 1) return dayjs(msgDate).format('DD/MM/YYYY');
            else if (Math.abs(msgDate.diff(now, 'day')) == 1) return "ieri alle " + dayjs(msgDate).format('HH:mm');
            else return "oggi alle " + dayjs(msgDate).format('HH:mm');
        },
        
        firstMsg(index, msgIndex) {
            if (msgIndex == 0) return "isFirst";
            else if (msgIndex > 0) {
                if(this.contacts[index].messages[msgIndex].status != this.contacts[index].messages[msgIndex - 1].status) return "isFirst";
            }
        },

        showSearchBar() {
            this.showingSearchBar = !this.showingSearchBar;
        },

        newDay(index, msgIndex) { 

            dayjs.extend(window.dayjs_plugin_customParseFormat);
            const msgDate = dayjs(this.contacts[index].messages[msgIndex].date, 'DD/MM/YYYY');
            const now = dayjs();

            if (msgIndex == 0) {
                if (Math.abs(msgDate.diff(now, 'day')) > 1) return dayjs(msgDate).format('DD MMMM YYYY');
                else if (Math.abs(msgDate.diff(now, 'day')) == 1) return "Ieri";
                else return "oggi";
            }

            let msgAfterDate = dayjs(this.contacts[index].messages[msgIndex - 1].date, 'DD/MM/YYYY');
            
            const nGiorni = Math.abs(msgDate.diff(msgAfterDate, 'day'));

            if (nGiorni == 0) return false;
            else {
                if (Math.abs(msgDate.diff(now, 'day')) > 1) return dayjs(msgDate).format('DD MMMM YYYY');
                else if (Math.abs(msgDate.diff(now, 'day')) == 1) return "Ieri";
                else return "Oggi";
            }

        }
           
            

        
    },
    
});