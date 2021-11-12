module.exports = {
  ilmoitusLaji: (ilmoitus_laji) => {
    let ilmoitusLaji = "";
    if (ilmoitus_laji === 2) {
      ilmoitusLaji = "Ostetaan";
    } else {
      ilmoitusLaji = "Myydään";
    }
    return ilmoitusLaji;
  },
  kumpiIlmoitusLaji: (ilmoitus_laji) => {
    let ilmoitusLajiBoolean = false;
    if (ilmoitus_laji === 2) {
      ilmoitusLajiBoolean = true;
    } 
    return ilmoitusLajiBoolean;
  },
  findUser: (users, kayttaja) => {
    let user = "";
    users.forEach((u) => {
      if (u.kayttaja_id === kayttaja) {
        user = u.kayttaja_tunnus;
      }
    });
    return user;
  },
  editAdvert: (editAdvertBoolean) => {
    if (editAdvertBoolean === null) {
      editAdvertBoolean = "tru";
    }
    return editAdvertBoolean;
  },
  formatDate: (ilmoitus_paivays) => {
    let dateFromDb = ilmoitus_paivays;
    let year = dateFromDb.getFullYear();
    let month = ('0' + (dateFromDb.getMonth() + 1)).slice(-2);
    let date = ('0' + dateFromDb.getDate()).slice(-2);    
    return date + '.' + month + '.' + year;
  },
  reverseList: (list) => {
    let reversedList = list.reverse();
    return reversedList;
  },
  isEmpty: (searchAdvert) => {
    let isEmpyBoolean = false;
    if(searchAdvert) {
      isEmpyBoolean = true;
    }
    return isEmpyBoolean;
  },
  isAdmin: (kayttaja_taso) => {
    let isAdminBoolean = false;
    if(kayttaja_taso === "admin") {
      isAdminBoolean = true;
    }
    return isAdminBoolean;
  },
  isModerator: (kayttaja_taso) => {
    let isModeratorBoolean = false;
    if(kayttaja_taso === "mod") {
      isModeratorBoolean = true;
    }
    return isModeratorBoolean;
  }
};
