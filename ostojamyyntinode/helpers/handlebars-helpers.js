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
      console.log("if");
      editAdvertBoolean = "tru";
    }
    return editAdvertBoolean;
  },
};
