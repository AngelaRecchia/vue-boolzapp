const app = new Vue({
    el: "#app",
    data: {
        toSearch: "",
        addMsg: "",
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                searchShow: true,
                ultimoAccesso: '11:15',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent',
                        showInfoBox: false
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                        showInfoBox: false
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received',
                        showInfoBox: false
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: false,
                searchShow: true,
                ultimoAccesso: '10:12',
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent',
                        showInfoBox: false
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received',
                        showInfoBox: false
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent',
                        showInfoBox: false
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: false,
                searchShow: true,
                ultimoAccesso: '12:23',
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received',
                        showInfoBox: false
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent',
                        showInfoBox: false
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received',
                        showInfoBox: false
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: false,
                searchShow: true,
                ultimoAccesso: '11:19',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent',
                        showInfoBox: false
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received',
                        showInfoBox: false
                    }
                ]
            }
        ]
    },
    methods: {
        openChat(index) {
            this.contacts.map(contact => contact.visible = false);
            this.contacts[index].visible = true;
        },

        sendMsg() {
            this.contacts.forEach(contact => {
                if (contact.visible && this.addMsg) {
                    const now = dayjs().format('DD/MM/YYYY HH:mm:ss');
                    const objMsg = {
                        date: now,
                        text: this.addMsg,
                        status: 'sent',
                        showInfoBox: false
                    }

                    contact.messages.push(objMsg);

                    setTimeout(() => {

                        const objMsgBack = {
                            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                            text: "ok",
                            status: 'received',
                            showInfoBox: false
                        }

                        contact.messages.push(objMsgBack);

                    }, 1000);

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
            
        }

    }
});