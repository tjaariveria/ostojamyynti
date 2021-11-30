let hbsHelpers = {
<<<<<<< HEAD
    advertType: (ilmoitus_laji) => {
=======
    advertType: function (ilmoitus_laji) {
>>>>>>> ab3ca40823a3aeb0e307beeac213304a9c49560d
        let ilmoitusLaji = "";
        if (ilmoitus_laji === 2) {
            ilmoitusLaji = "Ostetaan";
        } else {
            ilmoitusLaji = "Myydään";
        }
        return ilmoitusLaji;
    },
<<<<<<< HEAD
    selectAdvertType: (ilmoitus_laji) => {
        let ilmoitusLajiBoolean = false;
        if (ilmoitus_laji === 2) {
            ilmoitusLajiBoolean = true;
        }
        return ilmoitusLajiBoolean;
    },
=======
>>>>>>> ab3ca40823a3aeb0e307beeac213304a9c49560d
    formatDate: (ilmoitus_paivays) => {
        let dateFromDb = ilmoitus_paivays;
        let year = dateFromDb.getFullYear();
        let month = ('0' + (dateFromDb.getMonth() + 1)).slice(-2);
        let date = ('0' + dateFromDb.getDate()).slice(-2);
        return date + '.' + month + '.' + year;
    },
    getUser: (users, kayttaja) => {
        let user = "";
        users.forEach((u) => {
            if (u.kayttaja_id === kayttaja) {
                user = u.kayttaja_tunnus;
            }
        });
        return user;
    },
    reverseList: (list) => {
        let reversedList = list.reverse();
        return reversedList;
<<<<<<< HEAD
    },
    isEmpty: (searchAdvert) => {
        let isEmpyBoolean = false;
        if (searchAdvert) {
            isEmpyBoolean = true;
        }
        return isEmpyBoolean;
=======
>>>>>>> ab3ca40823a3aeb0e307beeac213304a9c49560d
    }
}

export default hbsHelpers;