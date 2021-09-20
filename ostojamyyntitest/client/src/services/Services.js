import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/ilmoitukset");
  }

  getKayttajat() {
    return http.get(`/kayttajat`);
  }

  getIlmoitukset() {
    return http.get(`/ilmoitukset`);
  }

  create(data) {
    console.log("data servicesta: " + data);
    return http.post("/ilmoitukset", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new DataService();